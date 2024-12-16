import React from "react";
import { useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Navbar = ({ items, onLogout }) => {
  const navigate = useNavigate();

  return (
    <nav className="bg-orange-500 p-4 shadow-md">
      <ul className="flex justify-around items-center space-x-4 flex-wrap">
        {items.map((item, index) => (
          <li
            key={index}
            className="text-white text-lg font-medium flex items-center gap-2 cursor-pointer p-2 rounded-md transition-all duration-300 transform hover:bg-orange-600 hover:scale-105"
            onClick={() => navigate(item.path)}
          >
            <i className={`fas ${item.icon} text-xl`}></i> {item.label}
          </li>
        ))}
        {onLogout && (
          <li
            className="text-white text-lg font-medium flex items-center gap-2 cursor-pointer p-2 rounded-md transition-all duration-300 transform hover:bg-orange-600 hover:scale-105"
            onClick={onLogout}
          >
            <i className="fas fa-sign-out-alt text-xl"></i> Logout
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
