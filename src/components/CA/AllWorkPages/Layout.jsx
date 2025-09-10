// Layout.js
import React, { useState } from "react";
import Navbar from "./Navbar";
import Accounting from "./AccountingPage";
import Taxation from "./TaxationPage";
import Audits from "./AuditPage";

const Layout = () => {
  const [activeComponent, setActiveComponent] = useState("accounting");

  const renderComponent = () => {
    switch (activeComponent) {
      case "accounting":
        return <Accounting />;
      case "taxation":
        return <Taxation />;
      case "audits":
        return <Audits />;
      default:
        return <Accounting />;
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 font-sans">
      <Navbar setActiveComponent={setActiveComponent} />
      <div className="flex-1 p-6 overflow-y-auto">{renderComponent()}</div>
    </div>
  );
};

export default Layout;
