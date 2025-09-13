import React, { useEffect, useState } from "react";
import { db, auth } from "../../../firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  updateDoc,
} from "firebase/firestore";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [reports, setReports] = useState([]);
  const [risks, setRisks] = useState([]);
  const [taxData, setTaxData] = useState([]);
  const [regulatoryData, setRegulatoryData] = useState([]);
  const [selectedTaxId, setSelectedTaxId] = useState(""); 

  const user = auth.currentUser;

  // Fetch Tasks, Reports, Risks
  useEffect(() => {
    if (!user) return;

    const unsubscribeTasks = onSnapshot(
      query(collection(db, "CAtask"), where("caId", "==", user.uid)),
      (snapshot) => setTasks(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
    );

    const unsubscribeReports = onSnapshot(
      query(collection(db, "reporttemplate"), where("caId", "==", user.uid)),
      (snapshot) => setReports(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
    );

    const unsubscribeRisks = onSnapshot(
      query(collection(db, "riskassess"), where("caId", "==", user.uid)),
      (snapshot) => setRisks(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
    );

    return () => {
      unsubscribeTasks();
      unsubscribeReports();
      unsubscribeRisks();
    };
  }, [user]);

  const [filterDate, setFilterDate] = useState(""); // store selected date

// Filtered updates based on date
const filteredUpdates = filterDate
  ? regulatoryData.filter(
      (update) => new Date(update.timestamp?.toDate() || update.timestamp) >= new Date(filterDate)
    )
  : regulatoryData;

  // Fetch Tax and Regulatory Updates
  useEffect(() => {
    if (!user) return;

    const unsubscribeTax = onSnapshot(
      query(collection(db, "tax-details"), where("caId", "==", user.uid)),
      (snapshot) => setTaxData(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
    );

    const unsubscribeReg = onSnapshot(
      query(collection(db, "regulatory-updates"), where("caId", "==", user.uid)),
      (snapshot) => setRegulatoryData(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
    );

    return () => {
      unsubscribeTax();
      unsubscribeReg();
    };
  }, [user]);

  const handleTaskChange = async (taskId, field, value) => {
    try {
      await updateDoc(doc(db, "CAtask", taskId), { [field]: value });
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const taskStatusData = [
    { status: "Pending", count: tasks.filter((t) => t.status === "Pending").length },
    { status: "Complete", count: tasks.filter((t) => t.status === "Complete").length },
    { status: "Incomplete", count: tasks.filter((t) => t.status === "Incomplete").length },
  ];

  const taskPriorityData = [
    { priority: "High", count: tasks.filter((t) => t.priority === "High").length },
    { priority: "Medium", count: tasks.filter((t) => t.priority === "Medium").length },
    { priority: "Low", count: tasks.filter((t) => t.priority === "Low").length },
  ];

  // Regulatory Update Component
  const RegulatoryUpdateItem = ({ update }) => {
    const [expanded, setExpanded] = useState(false);
    const toggleExpanded = () => setExpanded(!expanded);
    const shortText = update.updateText.slice(0, 150);

    return (
      <li className="p-3 border border-white/20 rounded-lg bg-white/5">
        <p className="font-semibold">
          {expanded ? update.updateText : `${shortText}${update.updateText.length > 150 ? "..." : ""}`}
        </p>
        {update.updateText.length > 150 && (
          <button onClick={toggleExpanded} className="text-blue-400 underline mt-1">
            {expanded ? "Read Less" : "Read More"}
          </button>
        )}
        {update.resourceLink && (
          <p>
            <a href={update.resourceLink} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">
              Resource Link
            </a>
          </p>
        )}
      </li>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-2xl p-6 text-white">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl mb-8 shadow-lg">
        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
          CA Hub
        </h1>
        <p className="text-sm text-gray-300">Overview of Your Audits,Taxation and Accounting</p>
      </div>

      {/* KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          { label: "Active Tasks", value: tasks.length, color: "text-blue-400" },
          { label: "Reports Created", value: reports.length, color: "text-green-400" },
          { label: "Risks Logged", value: risks.length, color: "text-red-400" },
        ].map((kpi, i) => (
          <div key={i} className="p-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-lg text-center hover:scale-105 transition-transform">
            <p className="text-sm text-gray-300">{kpi.label}</p>
            <p className={`text-3xl font-bold mt-2 ${kpi.color}`}>{kpi.value}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="p-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-lg">
          <h2 className="text-sm font-semibold text-violet-300 mb-4">Tasks by Status</h2>
          <ResponsiveContainer width="80%" height={250}>
            <BarChart data={taskStatusData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="status" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Bar dataKey="count" fill="#8b5cf6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="p-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-lg">
          <h2 className="text-lg font-semibold text-violet-300 mb-4">Tasks by Priority</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={taskPriorityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="priority" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="count" stroke="#fbbf24" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tasks Table */}
      <div className="mb-8 p-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-lg">
        <h2 className="text-lg font-semibold text-violet-300 mb-4">Your Audit Tasks</h2>
        {tasks.length === 0 ? (
          <p className="text-gray-400">No tasks added yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-white/10 text-sm text-gray-200">
              <thead className="bg-white/10">
                <tr>
                  <th className="border px-4 py-2 border-white/10">Description</th>
                  <th className="border px-4 py-2 border-white/10">Priority</th>
                  <th className="border px-4 py-2 border-white/10">Due Date</th>
                  <th className="border px-4 py-2 border-white/10">Status</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task.id} className="hover:bg-white/5">
                    <td className="border px-4 py-2 border-white/10">{task.description}</td>
                    <td className="border px-4 py-2 border-white/10">
                      <select
                        value={task.priority}
                        onChange={async (e) => {
                          const newPriority = e.target.value;
                          setTasks((prev) =>
                            prev.map((t) => (t.id === task.id ? { ...t, priority: newPriority } : t))
                          );
                          await handleTaskChange(task.id, "priority", newPriority);
                        }}
                        className="px-2 py-1 rounded bg-white/10 border border-white/20 text-white"
                      >
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </select>
                    </td>
                    <td className="border px-4 py-2 border-white/10">{task.dueDate}</td>
                    <td className="border px-4 py-2 border-white/10">
                      <select
                        value={task.status || "Pending"}
                        onChange={async (e) => {
                          const newStatus = e.target.value;
                          setTasks((prev) =>
                            prev.map((t) => (t.id === task.id ? { ...t, status: newStatus } : t))
                          );
                          await handleTaskChange(task.id, "status", newStatus);
                        }}
                        className="px-2 py-1 rounded bg-white/10 border border-white/20 text-white"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Complete">Complete</option>
                        <option value="Incomplete">Incomplete</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Reports & Risks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-lg">
          <h2 className="text-lg font-semibold text-violet-300 mb-4">Your Reports</h2>
          {reports.length === 0 ? (
            <p className="text-gray-400">No reports generated yet.</p>
          ) : (
            <ul className="space-y-3">
              {reports.map((report) => (
                <li key={report.id} className="p-3 border border-white/20 rounded-lg bg-white/5 hover:bg-white/10 transition">
                  <p className="font-semibold text-blue-300">{report.title}</p>
                  <p className="text-sm text-gray-300">{report.remarks}</p>
                  <p className="text-xs text-gray-400">From: {report.startDate} To: {report.endDate}</p>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="p-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-lg">
          <h2 className="text-lg font-semibold text-violet-300 mb-4">Your Risk Assessments</h2>
          {risks.length === 0 ? (
            <p className="text-gray-400">No risks logged yet.</p>
          ) : (
            <ul className="space-y-3">
              {risks.map((risk) => (
                <li key={risk.id} className="p-3 border border-white/20 rounded-lg bg-white/5 hover:bg-white/10 transition">
                  <p className="font-semibold text-red-300">{risk.description}</p>
                  <p className="text-sm text-gray-300">Category: {risk.category}</p>
                  <p className="text-xs text-gray-400">Mitigation: {risk.mitigation}</p>
                </li>
              ))}
            </ul>
          )}
        </div>

   {/* Tax Details Dropdown & Pie Chart */}
<div className="p-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-lg mb-6">
  <h2 className="text-lg font-semibold text-violet-300 mb-4">Tax Overview</h2>
  {taxData.length === 0 ? (
    <p className="text-gray-400">No tax records found.</p>
  ) : (
    <>
      {/* Sort taxData by createdAt descending (recent first) */}
      {(() => {
        taxData.sort((a, b) => (b.createdAt?.toDate?.() || 0) - (a.createdAt?.toDate?.() || 0));
      })()}

      {/* Dropdown to select tax record */}
      <select
        className="mb-4 px-3 py-2 rounded bg-white/10 border border-white/20 text-black w-full"
        value={selectedTaxId || ""}
        onChange={(e) => setSelectedTaxId(e.target.value)}
      >
        <option value="">Select Tax Record</option>
        {taxData.map((tax) => (
          <option key={tax.id} value={tax.id}>
            {tax.clientName || "Client"} - {tax.month || "Month"} {tax.year || ""} 
            {tax.createdAt ? ` (${tax.createdAt.toDate().toLocaleDateString()})` : ""}
          </option>
        ))}
      </select>

      {/* Show Pie Chart for selected record */}
      {selectedTaxId && (() => {
        const tax = taxData.find((t) => t.id === selectedTaxId);
        if (!tax) return null;

        const profit = (tax.income || 0) - (tax.deductions || 0) - (tax.exemptions || 0);
        const pieData = [
          { name: "Income", value: tax.income || 0 },
          { name: "Deductions", value: tax.deductions || 0 },
          { name: "Exemptions", value: tax.exemptions || 0 },
        ];
        const COLORS = ["#34d399", "#f87171", "#60a5fa"];

        return (
          <div>
            <h3 className={`font-semibold text-lg ${profit >= 0 ? "text-green-400" : "text-red-400"}`}>
              Profit / Loss: ₹{profit}
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `₹${value}`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        );
      })()}
    </>
  )}
</div>


        {/* Regulatory Updates */}
        {/* Regulatory Updates */}
<div className="p-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-lg">
  <h2 className="text-lg font-semibold text-violet-300 mb-4">Regulatory Updates</h2>

  {/* Date Filter */}
  <div className="mb-4">
    <label className="text-gray-300 mr-2">Show updates from:</label>
    <input
      type="date"
      value={filterDate}
      onChange={(e) => setFilterDate(e.target.value)}
      className="p-2 rounded bg-white/5 text-white border border-white/20"
    />
  </div>

  {filteredUpdates.length === 0 ? (
    <p className="text-gray-400">No updates found.</p>
  ) : (
    <ul className="space-y-3">
      {filteredUpdates.map((update) => (
        <RegulatoryUpdateItem key={update.id} update={update} />
      ))}
    </ul>
  )}
</div>

      </div>
    </div>
  );
};

export default Dashboard;
