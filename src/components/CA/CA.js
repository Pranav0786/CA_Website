import React from "react";
import caImage from "../../assets/ca.png";
import Navbar from "./AllWorkPages/Navbar"; // Adjust path if needed

const CA = () => {
  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-[#082567] to-indigo-800 font-sans">
      <Navbar />

      <div className="flex flex-col lg:flex-row justify-between items-center p-10 h-full">
        {/* Glassy Content Box */}
        <div className="w-full lg:w-3/4 text-center lg:text-left 
          bg-black/40 backdrop-blur-xl border border-purple-500/60 
          rounded-2xl shadow-2xl p-8">
          
          <h1 className="text-4xl font-extrabold text-white mb-4 drop-shadow-md">
            Welcome to World of <span className="text-purple-400">CA HUB</span>
          </h1>
          
          <p className="text-lg text-gray-200 leading-relaxed">
            <b className="text-purple-300">Manage your audits, accounting, and taxation efficiently</b> 
            {" "}with our platform. <br /> <br />
            Streamlining Financial Success with Precision and Expertise, 
            where numbers meet innovation, and accounting transforms into opportunity. 
            We specialize in delivering tailored solutions for accounting, taxation, 
            and audits, designed to empower businesses and individuals to achieve 
            their financial goals effortlessly.
          </p>
        </div>

        {/* Glassy Image Card */}
        <div className="w-full lg:w-1/2 flex justify-center items-center mt-10 lg:mt-0">
          <div className="bg-black/40 backdrop-blur-xl p-4 rounded-2xl 
            border border-purple-500/60 shadow-2xl hover:scale-105 transition duration-300">
            <img
              src={caImage}
              alt="Chartered Accountant"
              className="max-w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CA;
