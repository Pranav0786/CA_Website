import React, { useState } from "react";
import Navbar from "./Navbar";
import Dashboard from "../DashBoard/Dashboard";
import Accounting from "./AccountingPage";
import Taxation from "./TaxationPage";
import Audits from "./AuditPage";

const Layout = () => {
  const [activeComponent, setActiveComponent] = useState("dashboard");

  const renderComponent = () => {
    switch (activeComponent) {
      case "dashboard":
        return <Dashboard />;
      case "accounting":
        return <Accounting />;
      case "taxation":
        return <Taxation />;
      case "audits":
        return <Audits />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="h-screen flex font-sans">
      {/* Left Sidebar */}
      <Navbar setActiveComponent={setActiveComponent} />

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">{renderComponent()}</div>
    </div>
  );
};

export default Layout;
