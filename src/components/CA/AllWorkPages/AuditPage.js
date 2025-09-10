import React, { useState } from "react";
import { db } from "../../../firebase";
import Navbar from "./Navbar";

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
    const newTask = {
      description: taskDescription,
      dueDate: taskDueDate,
      priority: "High",
    };
    setAuditTasks((prevTasks) => [...prevTasks, newTask]);
    setTaskDescription("");
    setTaskDueDate("");

    try {
      await db.collection("auditTasks").add(newTask);
    } catch (error) {
      console.error("Error adding task to Firestore: ", error);
    }
  };

  const handleChangeTab = (tab) => {
    setActiveTab(tab);
  };

  const handleSubmitReport = async () => {
    try {
      await db.collection("auditReports").add(reportDetails);
    } catch (error) {
      console.error("Error saving report to Firestore: ", error);
    }
  };

  const handleAddRisk = async () => {
    const newRisk = {
      description: riskDescription,
      category: "Financial",
      mitigation: riskMitigation,
      status: "Ongoing",
    };
    setRiskAssessment((prevRisk) => [...prevRisk, newRisk]);
    setRiskDescription("");
    setRiskMitigation("");
    try {
      await db.collection("riskAssessments").add(newRisk);
    } catch (error) {
      console.error("Error adding risk to Firestore: ", error);
    }
  };

  return (
    <div className="flex flex-col items-center p-5">
      <Navbar />
      <h1 className="text-4xl font-extrabold mb-8">Audit Dashboard</h1>

      <div className="mb-8">
        <button
          className={`px-6 py-3 mx-3 text-lg font-semibold rounded-lg ${activeTab === "audit-checklist" ? "bg-orange-500 text-white" : "bg-gray-300"}`}
          onClick={() => handleChangeTab("audit-checklist")}
        >
          Audit Checklist
        </button>
        <button
          className={`px-6 py-3 mx-3 text-lg font-semibold rounded-lg ${activeTab === "report-templates" ? "bg-orange-500 text-white" : "bg-gray-300"}`}
          onClick={() => handleChangeTab("report-templates")}
        >
          Report Templates
        </button>
        <button
          className={`px-6 py-3 mx-3 text-lg font-semibold rounded-lg ${activeTab === "risk-assessment" ? "bg-orange-500 text-white" : "bg-gray-300"}`}
          onClick={() => handleChangeTab("risk-assessment")}
        >
          Risk Assessment
        </button>
      </div>

      {/* Audit Checklist Tab */}
      {activeTab === "audit-checklist" && (
        <section className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full">
          <h2 className="text-2xl font-bold mb-6">Audit Checklist</h2>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Task Description"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg mb-4"
            />
            <select className="w-full p-4 border border-gray-300 rounded-lg mb-4">
              <option value="High">High</option>
              <option value="Low">Low</option>
            </select>
            <input
              type="date"
              value={taskDueDate}
              onChange={(e) => setTaskDueDate(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg mb-4"
            />
            <button
              className="w-full py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600"
              onClick={handleAddTask}
            >
              Add Task
            </button>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Task List</h3>
            <ul className="list-none p-0">
              {auditTasks.map((task, index) => (
                <li key={index} className="p-4 mb-4 border border-gray-300 rounded-lg bg-white">
                  <p>{task.description} - {task.priority} - Due: {task.dueDate}</p>
                  <div className="flex gap-4 mt-2">
                    <input type="checkbox" /> Pending
                    <input type="checkbox" /> In-Progress
                    <input type="checkbox" /> Completed
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Report Templates Tab */}
      {activeTab === "report-templates" && (
        <section className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full">
          <h2 className="text-2xl font-bold mb-6">Report Templates</h2>
          <div className="mb-4">
            <select className="w-full p-4 border border-gray-300 rounded-lg mb-4">
              <option value="summary-report">Summary Report</option>
              <option value="detailed-report">Detailed Report</option>
            </select>
            <input
              type="text"
              placeholder="Report Title"
              value={reportDetails.title}
              onChange={(e) => setReportDetails({ ...reportDetails, title: e.target.value })}
              className="w-full p-4 border border-gray-300 rounded-lg mb-4"
            />
            <textarea
              placeholder="Remarks"
              value={reportDetails.remarks}
              onChange={(e) => setReportDetails({ ...reportDetails, remarks: e.target.value })}
              className="w-full p-4 border border-gray-300 rounded-lg mb-4"
            />
            <div className="flex gap-4 mb-4">
              <div className="w-1/2">
                <label className="block text-lg font-medium mb-2">Start Date:</label>
                <input
                  type="date"
                  value={reportDetails.startDate}
                  onChange={(e) => setReportDetails({ ...reportDetails, startDate: e.target.value })}
                  className="w-full p-4 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="w-1/2">
                <label className="block text-lg font-medium mb-2">End Date:</label>
                <input
                  type="date"
                  value={reportDetails.endDate}
                  onChange={(e) => setReportDetails({ ...reportDetails, endDate: e.target.value })}
                  className="w-full p-4 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
            <button
              className="w-full py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600"
              onClick={handleSubmitReport}
            >
              Generate Report
            </button>
          </div>
        </section>
      )}

      {/* Risk Assessment Tab */}
      {activeTab === "risk-assessment" && (
        <section className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full">
          <h2 className="text-2xl font-bold mb-6">Risk Assessment</h2>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Risk Description"
              value={riskDescription}
              onChange={(e) => setRiskDescription(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg mb-4"
            />
            <select className="w-full p-4 border border-gray-300 rounded-lg mb-4">
              <option value="financial">Financial</option>
              <option value="compliance">Compliance</option>
              <option value="operational">Operational</option>
            </select>
            <textarea
              placeholder="Risk Mitigation Plan"
              value={riskMitigation}
              onChange={(e) => setRiskMitigation(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg mb-4"
            />
            <button
              className="w-full py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600"
              onClick={handleAddRisk}
            >
              Add Risk
            </button>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Risk List</h3>
            <ul className="list-none p-0">
              {riskAssessment.map((risk, index) => (
                <li key={index} className="p-4 mb-4 border border-gray-300 rounded-lg bg-white">
                  <p>{risk.description} - {risk.category} - Mitigation: {risk.mitigation}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </div>
  );
};

export default AuditPage;
