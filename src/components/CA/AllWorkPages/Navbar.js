import React from "react";
import { useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Navbar = ({ setActiveComponent }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <nav className="bg-orange-500 p-4 shadow-md">
      <ul className="flex justify-around items-center">
        <li
          className="text-white text-lg font-medium flex items-center gap-2 p-2 cursor-pointer hover:bg-orange-600 hover:scale-105 rounded-lg"
          onClick={() => setActiveComponent("dashboard")}
        >
          <i className="fas fa-tachometer-alt text-xl"></i> Dashboard
        </li>
        <li
          className="text-white text-lg font-medium flex items-center gap-2 p-2 cursor-pointer hover:bg-orange-600 hover:scale-105 rounded-lg"
          onClick={() => setActiveComponent("accounting")}
        >
          <i className="fas fa-calculator text-xl"></i> Accounting
        </li>
        <li
          className="text-white text-lg font-medium flex items-center gap-2 p-2 cursor-pointer hover:bg-orange-600 hover:scale-105 rounded-lg"
          onClick={() => setActiveComponent("taxation")}
        >
          <i className="fas fa-receipt text-xl"></i> Taxation
        </li>
        <li
          className="text-white text-lg font-medium flex items-center gap-2 p-2 cursor-pointer hover:bg-orange-600 hover:scale-105 rounded-lg"
          onClick={() => setActiveComponent("audits")}
        >
          <i className="fas fa-file-signature text-xl"></i> Audits
        </li>
        <li
          className="text-white text-lg font-medium flex items-center gap-2 p-2 cursor-pointer hover:bg-red-600 hover:scale-105 rounded-lg"
          onClick={handleLogout}
        >
          <i className="fas fa-sign-out-alt text-xl"></i> Logout
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
