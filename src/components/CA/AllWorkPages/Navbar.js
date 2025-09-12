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
    <nav className="bg-gradient-to-r from-black/60 via-gray-900/40 to-black/60 backdrop-blur-xl border-b border-white/10 p-4 shadow-lg sticky top-0 z-50 rounded-b-2xl">
      <ul className="flex justify-around items-center">
        <li
          className="text-violet-400 text-lg font-medium flex items-center gap-2 p-2 cursor-pointer hover:bg-white/10 hover:text-violet-300 rounded-lg transition-all"
          onClick={() => setActiveComponent("dashboard")}
        >
          <i className="fas fa-tachometer-alt text-xl"></i> Dashboard
        </li>
        <li
          className="text-violet-400 text-lg font-medium flex items-center gap-2 p-2 cursor-pointer hover:bg-white/10 hover:text-violet-300 rounded-lg transition-all"
          onClick={() => setActiveComponent("accounting")}
        >
          <i className="fas fa-calculator text-xl"></i> Accounting
        </li>
        <li
          className="text-violet-400 text-lg font-medium flex items-center gap-2 p-2 cursor-pointer hover:bg-white/10 hover:text-violet-300 rounded-lg transition-all"
          onClick={() => setActiveComponent("taxation")}
        >
          <i className="fas fa-receipt text-xl"></i> Taxation
        </li>
        <li
          className="text-violet-400 text-lg font-medium flex items-center gap-2 p-2 cursor-pointer hover:bg-white/10 hover:text-violet-300 rounded-lg transition-all"
          onClick={() => setActiveComponent("audits")}
        >
          <i className="fas fa-file-signature text-xl"></i> Audits
        </li>
        <li
          className="text-red-400 text-lg font-medium flex items-center gap-2 p-2 cursor-pointer hover:bg-white/10 hover:text-red-300 rounded-lg transition-all"
          onClick={handleLogout}
        >
          <i className="fas fa-sign-out-alt text-xl"></i> Logout
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
