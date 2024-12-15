import React from "react";
import { useNavigate } from "react-router-dom";
import caImage from "../assets/ca.png"; 
import "./CA.css"; 
import "@fortawesome/fontawesome-free/css/all.min.css"; 

const CA = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login"); 
  };

  return (
    <div className="ca-container">
      <nav className="navbar">
        <ul>
          <li onClick={() => navigate("/accounting")}>
            <i className="fas fa-calculator"></i> Accounting
          </li>
          <li onClick={() => navigate("/taxation")}>
            <i className="fas fa-receipt"></i> Taxation
          </li>
          <li onClick={() => navigate("/audits")}>
            <i className="fas fa-file-signature"></i> Audits
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
           <b>Manage your audits, accounting, and taxation efficiently with our
           platform.</b> 
            Streamlining Financial Success with Precision and Expertise,
            where numbers meet innovation, and accounting transforms into opportunity. We specialize in delivering tailored solutions for accounting, taxation, and audits, designed to empower businesses and individuals to achieve their financial goals effortlessly.
          </p>
        </div>
        <div className="image-section">
          <img src={caImage} alt="Chartered Accountant" />
        </div>
      </div>
    </div>
  );
};

export default CA;
