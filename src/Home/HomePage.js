import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaWhatsapp,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import auditImg from "../assets/financial_auditing.jpg";
import taxationImg from "../assets/taxation_concept.jpg";
import accountingImg from "../assets/accounting_profession.jpg";
import clientImg from "../assets/client_management.jpg";
import documentImg from "../assets/document_management_system.jpg";
import analyticsImg from "../assets/business_analytics_visualization.jpg";

// Hero background images
import hero1 from "../assets/image1.png";
import hero2 from "../assets/image2.png";
import hero3 from "../assets/image3.png";
import hero4 from "../assets/image4.png";
import hero5 from "../assets/image5.png";
import hero6 from "../assets/image6.png";

import { FaArrowUp } from "react-icons/fa";  // ✅ only keep this


const Home = () => {
  const services = [
    { title: "Audit", img: auditImg },
    { title: "Taxation", img: taxationImg },
    { title: "Accounting", img: accountingImg },
    { title: "Client Management", img: clientImg },
    { title: "Document Management", img: documentImg },
    { title: "Business Analytics", img: analyticsImg },
  ];

  // Images for hero slider
  const heroImages = [hero1, hero2, hero3, hero4, hero5, hero6];
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

   const [percentage, setPercentage] = useState(0);

  // Animate percentage counter
  useEffect(() => {
    let start = 0;
    const end = 3.9; // target percentage
    const duration = 2000; // 2 seconds
    const increment = end / (duration / 30);

    const counter = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(counter);
      }
      setPercentage(start.toFixed(1)); // show 1 decimal place
    }, 30);

    return () => clearInterval(counter);
  }, []);

  return (
    <div className="w-full text-white font-sans relative scroll-smooth">
      {/* Navbar */}
      <Navbar />

 <section className="relative min-h-screen flex flex-col justify-center items-center px-6 bg-[#0d0d16] text-white">
  <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
    {/* Left Content */}
    <div className="flex flex-col items-start space-y-6">
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-6xl font-bold leading-tight"
      >
        The Future of Money, <br />
        <span className="text-cyan-400">Wrapped in Security</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-gray-300 text-lg md:text-xl max-w-xl"
      >
        ApexPay blends real-time market insights with military-grade
        security — so you can trade, track, and spend with total confidence.
      </motion.p>

      <div className="flex space-x-4">
        <button className="px-6 py-3 bg-cyan-400 hover:bg-cyan-500 text-black font-semibold rounded-lg transition">
          Get Started
        </button>
        <button className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition">
          Talk to Human
        </button>
      </div>
    </div>

    {/* Right Side Graphic */}
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
      className="flex justify-center"
    >
      <div className="w-60 h-60 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-2xl shadow-2xl relative flex flex-col items-center justify-center text-black">
        <FaArrowUp className="text-3xl text-white" />
        <p className="text-3xl font-bold text-white mt-2">
          +{percentage}%
        </p>
      </div>
    </motion.div>
  </div>

  {/* Stats Section */}
  <div className="mt-16 w-full max-w-5xl grid md:grid-cols-4 gap-6 text-center">
    <div>
      <p className="text-blue-400 text-2xl font-bold">100M</p>
      <p className="text-gray-400">Total Supply</p>
    </div>
    <div>
      <p className="text-pink-400 text-2xl font-bold">16M</p>
      <p className="text-gray-400">Pre-ICO</p>
    </div>
    <div>
      <p className="text-red-400 text-2xl font-bold">64%</p>
      <p className="text-gray-400">Token Sale</p>
    </div>
    <div>
      <p className="text-cyan-400 text-2xl font-bold">37.24%</p>
      <p className="text-gray-400">Hidden Cap</p>
    </div>
  </div>

  {/* Progress Bars */}
  <div className="mt-10 w-full max-w-5xl space-y-4">
    <div>
      <p className="text-gray-400 mb-1">One Day</p>
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: "50%" }}
        transition={{ duration: 1.5 }}
        className="h-2 bg-pink-500 rounded-full"
      />
      <div className="w-full h-2 bg-gray-700 rounded-full absolute -z-10"></div>
    </div>
    <div>
      <p className="text-gray-400 mb-1">One Week</p>
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: "75%" }}
        transition={{ duration: 1.5 }}
        className="h-2 bg-cyan-400 rounded-full"
      />
      <div className="w-full h-2 bg-gray-700 rounded-full absolute -z-10"></div>
    </div>
  </div>
</section>

      {/* Services Section */}
      <section
        id="services"
        className="relative flex flex-col items-center justify-center px-6 py-16 text-center 
        border-2 border-transparent rounded-3xl
        before:absolute before:inset-0 before:rounded-3xl 
        before:border-2 before:border-blue-500 
        before:shadow-[0_0_25px_rgba(59,130,246,0.9),0_0_50px_rgba(59,130,246,0.6)] 
        before:animate-pulse before:pointer-events-none"
      >
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold text-cyan-400 mb-10 relative z-10"
        >
          Our Services
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl relative z-10">
          {services.map((service, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.08 }}
              className="relative w-72 h-72 rounded-2xl overflow-hidden shadow-xl cursor-pointer 
              bg-white/10 backdrop-blur-md border border-transparent 
              transition-all duration-500 group"
            >
              <img
                src={service.img}
                alt={service.title}
                className="w-full h-full object-cover rounded-2xl transition-transform duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 via-black/30 to-cyan-500/20 
              opacity-0 group-hover:opacity-100 transition duration-500"></div>

              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-500">
                <h3 className="text-2xl font-extrabold text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.9)] group-hover:animate-pulse">
                  {service.title}
                </h3>
              </div>

              <div className="absolute inset-0 rounded-2xl border-2 border-transparent 
              group-hover:border-cyan-400 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.8),0_0_40px_rgba(34,211,238,0.6)] 
              transition duration-500"></div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
<section
  id="contact"
  className="relative px-6 py-16 text-center border-2 border-transparent rounded-3xl 
  before:absolute before:inset-0 before:rounded-3xl 
  before:border-2 before:border-blue-500 
  before:shadow-[0_0_25px_rgba(59,130,246,0.9),0_0_50px_rgba(59,130,246,0.6)] 
  before:animate-pulse before:pointer-events-none"
>
  <div className="absolute inset-0 bg-black/60 backdrop-blur-md rounded-3xl"></div>

  <div className="relative z-10 max-w-6xl mx-auto flex flex-col md:flex-row items-start justify-between gap-6">
    {/* Left - Social Links */}
    <div className="flex flex-col items-center md:items-start gap-6 text-white md:w-1/2">
      <motion.h2
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-5xl font-bold text-cyan-400 mb-4"
      >
        Contact Us
      </motion.h2>
      <p className="text-lg text-gray-200 max-w-md">
        Stay connected with us through our social platforms or drop us a
        message. We’d love to hear from you!
      </p>

      <div className="flex space-x-6 text-3xl">
        <a href="https://facebook.com" className="hover:text-blue-400 transition duration-300">
          <FaFacebook />
        </a>
        <a href="https://instagram.com" className="hover:text-pink-400 transition duration-300">
          <FaInstagram />
        </a>
        <a href="mailto:example@mail.com" className="hover:text-red-400 transition duration-300">
          <MdEmail />
        </a>
        <a href="https://twitter.com" className="hover:text-sky-400 transition duration-300">
          <FaTwitter />
        </a>
        <a href="https://wa.me/1234567890" className="hover:text-green-400 transition duration-300">
          <FaWhatsapp />
        </a>
        <a href="https://linkedin.com" className="hover:text-blue-400 transition duration-300">
          <FaLinkedin />
        </a>
      </div>
    </div>

    {/* Right - Feedback Form */}
    <form className="w-full md:w-1/2 bg-white/10 backdrop-blur-md rounded-2xl p-6 
    border-2 border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.8)]">
      <input
        type="text"
        placeholder="Your Name"
        className="w-full px-4 py-3 mb-4 rounded-lg bg-white/10 text-white placeholder-gray-300 focus:outline-none"
      />
      <input
        type="email"
        placeholder="Your Email"
        className="w-full px-4 py-3 mb-4 rounded-lg bg-white/10 text-white placeholder-gray-300 focus:outline-none"
      />
      <textarea
        rows="4"
        placeholder="Your Message"
        className="w-full px-4 py-3 mb-4 rounded-lg bg-white/10 text-white placeholder-gray-300 focus:outline-none"
      ></textarea>
      <button className="w-full px-6 py-3 bg-cyan-400 hover:bg-cyan-500 text-black font-semibold rounded-lg shadow-lg transition duration-300">
        Send Message
      </button>
    </form>
  </div>
</section>

    </div>
  );
};

export default Home;
