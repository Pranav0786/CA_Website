import React from "react";
import { useNavigate } from "react-router-dom";
import caImage from "../../assets/ca.png";
import Navbar from "./Navbar"; // Adjust path as necessary
import "./CA.css";

const CA = () => {
  return (
    <div className="ca-container">
      <Navbar /> {/* Use the Navbar component here */}
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
