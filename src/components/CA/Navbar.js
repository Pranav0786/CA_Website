import React from "react";
import { useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./Navbar.css"; // Optional: Add specific styles for Navbar if needed

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
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
  );
};

export default Navbar;
