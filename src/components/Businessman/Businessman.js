import React from "react";
import { useNavigate } from "react-router-dom";
import businessmanImage from "../../assets/businessman.png";
import Navbar from "./Navbar";

const Businessman = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  const navItems = [
    { path: "/accountingDetails", icon: "fa-calculator", label: "Accounting" },
    { path: "/taxationDetails", icon: "fa-receipt", label: "Taxation" },
    { path: "/analyticsDetails", icon: "fa-chart-line", label: "Business Analytics" },
    { path: "/clientsDeatils", icon: "fa-users", label: "Client & Vendor Management" },
    { path: "/documents", icon: "fa-folder", label: "Document Management" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      <Navbar items={navItems} onLogout={handleLogout} />
      <div className="flex flex-col lg:flex-row justify-between items-center p-10 space-y-8 lg:space-y-0">
        <div className="w-full lg:w-1/2 text-center lg:text-left px-4">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
            Welcome to World of CA HUB
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            <b>Enhance your business efficiency with our analytics, client management, and documentation tools.</b>
            Empowering Business Growth with Financial Excellence. We understand that every successful business is built on strong financial foundations. Our team of expert chartered accountants is here to provide you with the tools, insights, and support you need to optimize your finances, reduce risks, and drive your business forward with confidence.
          </p>
        </div>
        <div className="w-full lg:w-1/2 flex justify-center items-center">
          <img
            src={businessmanImage}
            alt="Businessman"
            className="max-w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Businessman;
