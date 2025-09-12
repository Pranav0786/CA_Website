import React, { useState } from "react";
import { db } from "../../../firebase";

const AuditPage = () => {
  const [activeTab, setActiveTab] = useState("audit-checklist");
  const [auditTasks, setAuditTasks] = useState([]);
  const [reportDetails, setReportDetails] = useState({
    title: "",
    remarks: "",
    startDate: "",
    endDate: "",
  });
  const [riskAssessment, setRiskAssessment] = useState([]);

  const [taskDescription, setTaskDescription] = useState("");
  const [taskDueDate, setTaskDueDate] = useState("");
  const [riskDescription, setRiskDescription] = useState("");
  const [riskMitigation, setRiskMitigation] = useState("");

  const handleAddTask = async () => {
    if (!taskDescription || !taskDueDate) return alert("Fill all task fields!");
    const newTask = { description: taskDescription, dueDate: taskDueDate, priority: "High" };
    setAuditTasks((prev) => [...prev, newTask]);
    setTaskDescription(""); setTaskDueDate("");
    try { await db.collection("auditTasks").add(newTask); } 
    catch (error) { console.error("Error adding task: ", error); }
  };

  const handleChangeTab = (tab) => setActiveTab(tab);

  const handleSubmitReport = async () => {
    try { await db.collection("auditReports").add(reportDetails); } 
    catch (error) { console.error("Error saving report: ", error); }
  };

  const handleAddRisk = async () => {
    if (!riskDescription || !riskMitigation) return alert("Fill all risk fields!");
    const newRisk = { description: riskDescription, category: "Financial", mitigation: riskMitigation, status: "Ongoing" };
    setRiskAssessment((prev) => [...prev, newRisk]);
    setRiskDescription(""); setRiskMitigation("");
    try { await db.collection("riskAssessments").add(newRisk); } 
    catch (error) { console.error("Error adding risk: ", error); }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 rounded-xl shadow-lg">

      {/* Tabs Navigation */}
      <div className="flex justify-center gap-6 mb-8">
        <button
          className={`px-6 py-3 text-xl font-semibold rounded-lg ${
            activeTab === "audit-checklist"
              ? "bg-violet-950 text-white"
              : "bg-violet-300 text-gray-700"
          }`}
          onClick={() => handleChangeTab("audit-checklist")}
        >
          Audit Checklist
        </button>
        <button
          className={`px-6 py-3 text-xl font-semibold rounded-lg ${
            activeTab === "report-templates"
              ? "bg-violet-950 text-white"
              : "bg-violet-300 text-gray-700"
          }`}
          onClick={() => handleChangeTab("report-templates")}
        >
          Report Templates
        </button>
        <button
          className={`px-6 py-3 text-xl font-semibold rounded-lg ${
            activeTab === "risk-assessment"
              ? "bg-violet-950 text-white"
              : "bg-violet-300 text-gray-700"
          }`}
          onClick={() => handleChangeTab("risk-assessment")}
        >
          Risk Assessment
        </button>
      </div>

      {/* Audit Checklist Tab */}
      {activeTab === "audit-checklist" && (
        <section className="bg-white/10 backdrop-blur-xl p-8 rounded-xl shadow-md border border-white/10 mb-8 text-white">
          <h2 className="text-2xl font-bold mb-6">Audit Checklist</h2>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Task Description"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              className="w-full p-4 mb-4 border border-white/20 bg-transparent rounded-lg"
            />
            <input
              type="date"
              value={taskDueDate}
              onChange={(e) => setTaskDueDate(e.target.value)}
              className="w-full p-4 mb-4 border border-white/20 bg-transparent rounded-lg"
            />
            <button
              onClick={handleAddTask}
              className="w-full py-3 bg-violet-950 text-white rounded-lg font-semibold hover:bg-violet-600"
            >
              Add Task
            </button>
          </div>

          <h3 className="text-xl font-semibold mb-4">Task List</h3>
          <ul>
            {auditTasks.map((task, index) => (
              <li
                key={index}
                className="p-4 mb-4 bg-white/10 border border-white/10 rounded-lg"
              >
                <p>{task.description} - {task.priority} - Due: {task.dueDate}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Report Templates Tab */}
      {activeTab === "report-templates" && (
        <section className="bg-white/10 backdrop-blur-xl p-8 rounded-xl shadow-md border border-white/10 mb-8 text-white">
          <h2 className="text-2xl font-bold mb-6">Report Templates</h2>
          <input
            type="text"
            placeholder="Report Title"
            value={reportDetails.title}
            onChange={(e) => setReportDetails({ ...reportDetails, title: e.target.value })}
            className="w-full p-4 mb-4 border border-white/20 bg-transparent rounded-lg"
          />
          <textarea
            placeholder="Remarks"
            value={reportDetails.remarks}
            onChange={(e) => setReportDetails({ ...reportDetails, remarks: e.target.value })}
            className="w-full p-4 mb-4 border border-white/20 bg-transparent rounded-lg"
          />
          <div className="flex gap-4 mb-4">
            <input
              type="date"
              value={reportDetails.startDate}
              onChange={(e) => setReportDetails({ ...reportDetails, startDate: e.target.value })}
              className="w-1/2 p-4 border border-white/20 bg-transparent rounded-lg"
            />
            <input
              type="date"
              value={reportDetails.endDate}
              onChange={(e) => setReportDetails({ ...reportDetails, endDate: e.target.value })}
              className="w-1/2 p-4 border border-white/20 bg-transparent rounded-lg"
            />
          </div>
          <button
            onClick={handleSubmitReport}
            className="w-full py-3 bg-violet-950 text-white rounded-lg font-semibold hover:bg-violet-600"
          >
            Generate Report
          </button>
        </section>
      )}

      {/* Risk Assessment Tab */}
      {activeTab === "risk-assessment" && (
        <section className="bg-white/10 backdrop-blur-xl p-8 rounded-xl shadow-md border border-white/10 mb-8 text-white">
          <h2 className="text-2xl font-bold mb-6">Risk Assessment</h2>
          <input
            type="text"
            placeholder="Risk Description"
            value={riskDescription}
            onChange={(e) => setRiskDescription(e.target.value)}
            className="w-full p-4 mb-4 border border-white/20 bg-transparent rounded-lg"
          />
          <textarea
            placeholder="Risk Mitigation Plan"
            value={riskMitigation}
            onChange={(e) => setRiskMitigation(e.target.value)}
            className="w-full p-4 mb-4 border border-white/20 bg-transparent rounded-lg"
          />
          <button
            onClick={handleAddRisk}
            className="w-full py-3 bg-violet-950 text-white rounded-lg font-semibold hover:bg-violet-600"
          >
            Add Risk
          </button>

          <h3 className="text-xl font-semibold mt-6 mb-4">Risk List</h3>
          <ul>
            {riskAssessment.map((risk, index) => (
              <li
                key={index}
                className="p-4 mb-4 bg-white/10 border border-white/10 rounded-lg"
              >
                {risk.description} - {risk.category} - Mitigation: {risk.mitigation}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default AuditPage;
