import React from "react";
import { useNavigate } from "react-router-dom";
import businessmanImage from "../assets/businessman.png"; 
import "./Businessman.css"; 
import "@fortawesome/fontawesome-free/css/all.min.css"; 

const Businessman = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login"); 
  };

  return (
    <div className="businessman-container">
      <nav className="navbar">
        <ul>
          <li onClick={() => navigate("/accounting")}>
            <i className="fas fa-calculator"></i> Accounting
          </li>
          <li onClick={() => navigate("/taxation")}>
            <i className="fas fa-receipt"></i> Taxation
          </li>
          <li onClick={() => navigate("/analytics")}>
            <i className="fas fa-chart-line"></i> Business Analytics
          </li>
          <li onClick={() => navigate("/clients")}>
            <i className="fas fa-users"></i> Client & Vendor Management
          </li>
          <li onClick={() => navigate("/documents")}>
            <i className="fas fa-folder"></i> Document Management
          </li>
          <li onClick={handleLogout}>
            <i className="fas fa-sign-out-alt"></i> Logout
          </li>
        </ul>
      </nav>
      <div className="content">
        <div className="text-section">
          <h1>Welcome to World of CA HUB</h1>
          <p>
            <b>Enhance your business efficiency with our analytics, client
            management, and documentation tools.</b>
            Empowering Business Growth with Financial Excellence.
            we understand that every successful business is built on strong financial foundations. Our team of expert chartered accountants is here to provide you with the tools, insights, and support you need to optimize your finances, reduce risks, and drive your business forward with confidence.
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
