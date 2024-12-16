import React from "react";
import { useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <nav className="bg-orange-500 p-4 shadow-md">
      <ul className="flex justify-around items-center m-0 p-0">
        <li 
          className="text-white text-lg font-medium flex items-center gap-2 p-2 rounded-lg cursor-pointer transition duration-300 ease-in-out transform hover:bg-orange-600 hover:scale-105"
          onClick={() => navigate("/accounting")}
        >
          <i className="fas fa-calculator text-xl"></i> Accounting
        </li>
        <li 
          className="text-white text-lg font-medium flex items-center gap-2 p-2 rounded-lg cursor-pointer transition duration-300 ease-in-out transform hover:bg-orange-600 hover:scale-105"
          onClick={() => navigate("/taxation")}
        >
          <i className="fas fa-receipt text-xl"></i> Taxation
        </li>
        <li 
          className="text-white text-lg font-medium flex items-center gap-2 p-2 rounded-lg cursor-pointer transition duration-300 ease-in-out transform hover:bg-orange-600 hover:scale-105"
          onClick={() => navigate("/audits")}
        >
          <i className="fas fa-file-signature text-xl"></i> Audits
        </li>
        <li 
          className="text-white text-lg font-medium flex items-center gap-2 p-2 rounded-lg cursor-pointer transition duration-300 ease-in-out transform hover:bg-orange-600 hover:scale-105"
          onClick={handleLogout}
        >
          <i className="fas fa-sign-out-alt text-xl"></i> Logout
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
