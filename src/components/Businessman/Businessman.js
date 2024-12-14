import React from "react";
import { useNavigate } from "react-router-dom";
import businessmanImage from "../../assets/businessman.png";
import Navbar from "./Navbar"; 
import "./Businessman.css";

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
    <div className="businessman-container">
      <Navbar items={navItems} onLogout={handleLogout} />
      <div className="content">
        <div className="text-section">
          <h1>Welcome to World of CA HUB</h1>
          <p>
            <b>Enhance your business efficiency with our analytics, client
            management, and documentation tools.</b>
            Empowering Business Growth with Financial Excellence.
            We understand that every successful business is built on strong financial foundations. Our team of expert chartered accountants is here to provide you with the tools, insights, and support you need to optimize your finances, reduce risks, and drive your business forward with confidence.
          </p>
        </div>
        <div className="image-section">
          <img src={businessmanImage} alt="Businessman" />
        </div>
      </div>
    </div>
  );
};

export default Businessman;
