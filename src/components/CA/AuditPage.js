import React, { useState } from "react";
import { db } from "../../firebase";
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
    <div style={containerStyle}>
      <Navbar/>
      <h1 style={headerStyle}>Audit Dashboard</h1>

      <div style={{ marginBottom: "32px" }}>
        <button
          style={tabButtonStyle(activeTab === "audit-checklist")}
          onClick={() => handleChangeTab("audit-checklist")}
        >
          Audit Checklist
        </button>
        <button
          style={tabButtonStyle(activeTab === "report-templates")}
          onClick={() => handleChangeTab("report-templates")}
        >
          Report Templates
        </button>
        <button
          style={tabButtonStyle(activeTab === "risk-assessment")}
          onClick={() => handleChangeTab("risk-assessment")}
        >
          Risk Assessment
        </button>
      </div>

      {/* Audit Checklist Tab */}
      {activeTab === "audit-checklist" && (
        <section style={tabContentStyle}>
          <h2 style={headerStyle}>Audit Checklist</h2>
          <div>
            <input
              type="text"
              placeholder="Task Description"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              style={inputStyle}
            />
            <select style={inputStyle}>
              <option value="High">High</option>
              <option value="Low">Low</option>
            </select>
            <input
              type="date"
              value={taskDueDate}
              onChange={(e) => setTaskDueDate(e.target.value)}
              style={inputStyle}
            />
            <button style={buttonStyle} onClick={handleAddTask}>
              Add Task
            </button>
          </div>

          <div>
            <h3>Task List</h3>
            <ul style={{ listStyleType: "none", paddingLeft: "0" }}>
              {auditTasks.map((task, index) => (
                <li key={index} style={taskItemStyle}>
                  <p>{task.description} - {task.priority} - Due: {task.dueDate}</p>
                  <div>
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
        <section style={tabContentStyle}>
          <h2 style={headerStyle}>Report Templates</h2>
          <div>
            <select style={inputStyle}>
              <option value="summary-report">Summary Report</option>
              <option value="detailed-report">Detailed Report</option>
            </select>
            <input
              type="text"
              placeholder="Report Title"
              value={reportDetails.title}
              onChange={(e) => setReportDetails({ ...reportDetails, title: e.target.value })}
              style={inputStyle}
            />
            <textarea
              placeholder="Remarks"
              value={reportDetails.remarks}
              onChange={(e) => setReportDetails({ ...reportDetails, remarks: e.target.value })}
              style={inputStyle}
            />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <label style={labelStyle}>Start Date:</label>
                <input
                  type="date"
                  value={reportDetails.startDate}
                  onChange={(e) => setReportDetails({ ...reportDetails, startDate: e.target.value })}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>End Date:</label>
                <input
                  type="date"
                  value={reportDetails.endDate}
                  onChange={(e) => setReportDetails({ ...reportDetails, endDate: e.target.value })}
                  style={inputStyle}
                />
              </div>
            </div>
            <button style={buttonStyle} onClick={handleSubmitReport}>
              Generate Report
            </button>
          </div>
        </section>
      )}

      {/* Risk Assessment Tab */}
      {activeTab === "risk-assessment" && (
        <section style={tabContentStyle}>
          <h2 style={headerStyle}>Risk Assessment</h2>
          <div>
            <input
              type="text"
              placeholder="Risk Description"
              value={riskDescription}
              onChange={(e) => setRiskDescription(e.target.value)}
              style={inputStyle}
            />
            <select style={inputStyle}>
              <option value="financial">Financial</option>
              <option value="compliance">Compliance</option>
              <option value="operational">Operational</option>
            </select>
            <textarea
              placeholder="Risk Mitigation Plan"
              value={riskMitigation}
              onChange={(e) => setRiskMitigation(e.target.value)}
              style={inputStyle}
            />
            <button style={buttonStyle} onClick={handleAddRisk}>
              Add Risk
            </button>
          </div>

          <div>
            <h3>Risk List</h3>
            <ul style={{ listStyleType: "none", paddingLeft: "0" }}>
              {riskAssessment.map((risk, index) => (
                <li key={index} style={taskItemStyle}>
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

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  margin: "20px",
};

const headerStyle = {
  fontSize: "32px",
  fontWeight: "bold",
  marginBottom: "16px",
};

const tabButtonStyle = (isActive) => ({
  padding: "10px 20px",
  margin: "0 10px",
  backgroundColor: isActive ? "#ff7f50" : "#ccc",
  color: "white",
  border: "none",
  cursor: "pointer",
  borderRadius: "5px",
});

const tabContentStyle = {
  padding: "20px",
  backgroundColor: "#f9f9f9",
  borderRadius: "8px",
  width: "100%",
  maxWidth: "800px",
};

const inputStyle = {
  padding: "10px",
  fontSize: "16px",
  margin: "8px 0",
  width: "100%",
  maxWidth: "300px",
  border: "1px solid #ccc",
  borderRadius: "5px",
};

const labelStyle = {
  fontSize: "16px",
  fontWeight: "600",
  marginBottom: "8px",
  display: "block",
};

const buttonStyle = {
  padding: "12px 24px",
  backgroundColor: "#ff7f50",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  marginTop: "12px",
};

const taskItemStyle = {
  padding: "12px",
  marginBottom: "8px",
  border: "1px solid #ccc",
  borderRadius: "5px",
  backgroundColor: "#fff",
};

export default AuditPage;
