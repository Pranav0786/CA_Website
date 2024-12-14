import React from "react";
import { useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./Navbar.css"; // Styles for the navbar

const Navbar = ({ items, onLogout }) => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <ul>
        {items.map((item, index) => (
          <li key={index} onClick={() => navigate(item.path)}>
            <i className={`fas ${item.icon}`}></i> {item.label}
          </li>
        ))}
        {onLogout && (
          <li onClick={onLogout}>
            <i className="fas fa-sign-out-alt"></i> Logout
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
