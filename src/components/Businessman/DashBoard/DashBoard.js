import React, { useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  Home,
  FileText,
  BarChart3,
  Users,
  FolderOpen,
  User,
  DollarSign,
} from "lucide-react";

const BusinessDashboard = () => {
  const [activeMenu, setActiveMenu] = useState("Accounting");

  const menus = [
    { name: "Accounting", icon: DollarSign },
    { name: "Taxation", icon: FileText },
    { name: "Business Analytics", icon: BarChart3 },
    { name: "Client & Vendor Management", icon: Users },
    { name: "Document Management", icon: FolderOpen },
    { name: "Profile", icon: User },
  ];

  const sampleData = [
    { label: "Jan", value: 40 },
    { label: "Feb", value: 55 },
    { label: "Mar", value: 30 },
    { label: "Apr", value: 80 },
  ];

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-white/10 backdrop-blur-xl border-r border-white/20 p-6 flex flex-col">
        <h1 className="text-2xl font-extrabold text-violet-400 mb-10">
          Biz Hub
        </h1>

        <nav className="space-y-4 flex-1">
          {menus.map((menu) => {
            const Icon = menu.icon;
            return (
              <button
                key={menu.name}
                onClick={() => setActiveMenu(menu.name)}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                  activeMenu === menu.name
                    ? "bg-violet-500/30 text-violet-300"
                    : "hover:bg-white/10 text-gray-300"
                }`}
              >
                <Icon size={20} />
                <span>{menu.name}</span>
              </button>
            );
          })}
        </nav>

        {/* Profile Section at Bottom */}
        <div className="mt-auto pt-6 border-t border-white/20">
          <p className="text-sm text-gray-400">Logged in as</p>
          <p className="font-semibold text-violet-300">John Doe</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl mb-8 shadow-lg">
          <h2 className="text-3xl font-extrabold bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
            {activeMenu}
          </h2>
          <p className="text-sm text-gray-300">
            Overview of {activeMenu} insights
          </p>
        </div>

        {/* KPI Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            { label: "Revenue", value: "₹1.2M", color: "text-green-400" },
            { label: "Expenses", value: "₹850K", color: "text-red-400" },
            { label: "Profit", value: "₹350K", color: "text-blue-400" },
          ].map((kpi, i) => (
            <div
              key={i}
              className="p-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-lg text-center hover:scale-105 transition-transform"
            >
              <p className="text-sm text-gray-300">{kpi.label}</p>
              <p className={`text-3xl font-bold mt-2 ${kpi.color}`}>
                {kpi.value}
              </p>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-lg">
            <h2 className="text-sm font-semibold text-violet-300 mb-4">
              Revenue Trend
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={sampleData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="label" stroke="#ccc" />
                <YAxis stroke="#ccc" />
                <Tooltip />
                <Bar dataKey="value" fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="p-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-lg">
            <h2 className="text-lg font-semibold text-violet-300 mb-4">
              Profit Analytics
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={sampleData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="label" stroke="#ccc" />
                <YAxis stroke="#ccc" />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#fbbf24"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BusinessDashboard;
