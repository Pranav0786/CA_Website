// Navbar.js
import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Navbar = ({ setActiveComponent }) => {
  return (
    <nav className="bg-orange-500 p-4 shadow-md">
      <ul className="flex justify-around items-center">
        <li
          className="text-white text-lg font-medium flex items-center gap-2 p-2 rounded-lg cursor-pointer transition duration-300 ease-in-out hover:bg-orange-600 hover:scale-105"
          onClick={() => setActiveComponent("accounting")}
        >
          <i className="fas fa-calculator text-xl"></i> Accounting
        </li>
        <li
          className="text-white text-lg font-medium flex items-center gap-2 p-2 rounded-lg cursor-pointer transition duration-300 ease-in-out hover:bg-orange-600 hover:scale-105"
          onClick={() => setActiveComponent("taxation")}
        >
          <i className="fas fa-receipt text-xl"></i> Taxation
        </li>
        <li
          className="text-white text-lg font-medium flex items-center gap-2 p-2 rounded-lg cursor-pointer transition duration-300 ease-in-out hover:bg-orange-600 hover:scale-105"
          onClick={() => setActiveComponent("audits")}
        >
          <i className="fas fa-file-signature text-xl"></i> Audits
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
