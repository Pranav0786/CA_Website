import React from "react";
import { useNavigate } from "react-router-dom";
import caImage from "../../assets/ca.png";
import Navbar from "./Navbar"; // Adjust path as necessary

const CA = () => {
  return (
    <div className="h-screen flex flex-col bg-gray-50 font-sans">
      <Navbar /> {/* Use the Navbar component here */}
      <div className="flex flex-col lg:flex-row justify-between items-center p-10">
        <div className="w-full lg:w-3/4 text-center lg:text-left">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
            Welcome to World of CA HUB
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            <b>Manage your audits, accounting, and taxation efficiently with our platform.</b> 
            Streamlining Financial Success with Precision and Expertise, where numbers meet innovation, 
            and accounting transforms into opportunity. We specialize in delivering tailored solutions for accounting, 
            taxation, and audits, designed to empower businesses and individuals to achieve their financial goals effortlessly.
          </p>
        </div>
        <div className="w-full lg:w-1/2 flex justify-center items-center mt-10 lg:mt-0">
          <img 
            src={caImage} 
            alt="Chartered Accountant" 
            className="max-w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default CA;
