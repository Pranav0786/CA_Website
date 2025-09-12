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
import lineChartVideo from '../assets/0_Financial_Data_Stock_Market_3840x2160.mp4';
import businessVideo from "../assets/573278_Business_Stock_3840x2160.mp4";

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

  // Rotating Quotes
const quotes = [
  "A good accountant is a business’s best investment.",
  "Behind every successful business is a great CA.",
  "Finance is the art of passing money from hand to hand until it finally disappears.",
  "Accounting is the language of business.",
  "In the world of business, trust is built on transparency and numbers."
];

const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
const currentQuote = quotes[currentQuoteIndex];

useEffect(() => {
  const interval = setInterval(() => {
    setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
  }, 3000); // 3 seconds
  return () => clearInterval(interval);
}, [quotes.length]);


  return (
    <div className="w-full text-white font-sans relative scroll-smooth">
      {/* Navbar */}
      <Navbar />
<section
  id="hero"
  className="relative min-h-screen flex flex-col justify-center items-center px-6 text-white overflow-hidden pt-24"
>
  {/* Background Video */}
  <video
    src={lineChartVideo}
    autoPlay
    loop
    muted
    playsInline
    className="absolute inset-0 w-full h-full object-cover z-0"
  />

  {/* Dark overlay */}

   {/* Dark overlay */}
  <div className="absolute inset-0 bg-black/60 z-10"></div>

  {/* Centered Content */}
<div className="relative z-20 max-w-4xl mx-auto flex flex-col items-center space-y-6">
  <motion.h1
    initial={{ opacity: 0, y: -40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="text-4xl md:text-5xl font-extrabold leading-tight"
  >
    Welcome to <span className="text-cyan-400">CA Hub</span>
  </motion.h1>

    {/* ✅ Rotating Quotes */}
  <motion.p
    key={currentQuote} // ensures animation runs when quote changes
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.8 }}
    className="italic bold text-lg text-red-500 text-center max-w-2xl"
  >
    "{currentQuote}"
  </motion.p>

  <motion.p
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}
    className="text-gray-200 text-lg md:text-xl leading-relaxed"
  >
    Your one-stop platform for{" "}
    <span className="text-yellow-400 font-semibold">Accounting</span>,{" "}
    <span className="text-pink-400 font-semibold">Taxation</span>,{" "}
    <span className="text-cyan-300 font-semibold">Audit</span>, and{" "}
    <span className="text-green-400 font-semibold">Business Advisory</span>.
    <br className="hidden md:block" />
    At CA Hub, we blend financial expertise with modern technology to simplify
    complex processes, ensure compliance, and empower businesses with
    real-time insights.
  </motion.p>



  <div className="flex space-x-4 pt-4">
    <button className="px-6 py-3 bg-cyan-400 hover:bg-cyan-500 text-black font-semibold rounded-lg transition">
      Explore Services
    </button>
    <button className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition">
      Contact Us
    </button>
  </div>
</div>

</section>



{/* About Section */}
{/* About Section */}
<section
  id="about"
  className="relative px-6 py-16 border-2 border-transparent rounded-3xl
  before:absolute before:inset-0 before:rounded-3xl 
  before:border-2 before:border-cyan-400 
  before:shadow-[0_0_25px_rgba(34,211,238,0.9),0_0_50px_rgba(34,211,238,0.6)] 
  before:animate-pulse before:pointer-events-none"
>
  <div className="absolute inset-0 bg-black/60 backdrop-blur-md rounded-3xl"></div>

  <div className="relative z-10 max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
    {/* Left Content */}
    <div className="text-center md:text-left space-y-6">
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-2xl md:text-3xl font-bold text-cyan-400"
      >
        About Us
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-lg text-gray-200 max-w-4xl leading-relaxed"
      >
        At <span className="text-cyan-400 font-semibold">CA Portal</span>, we combine 
        <span className="text-yellow-400"> financial expertise</span> with 
        <span className="text-pink-400"> modern technology</span> to deliver seamless 
        accounting, taxation, and audit solutions.  
        <br className="hidden md:block" />
        Our mission is to simplify complex financial processes, empower businesses with 
        real-time insights, and ensure <span className="text-cyan-300">complete transparency</span> 
        in every transaction.
      </motion.p>

      {/* Decorative Line */}
      <div className="mt-6 w-32 h-[2px] bg-gradient-to-r from-cyan-400 via-blue-500 to-pink-500 rounded-full"></div>
    </div>

    {/* Right Side Video */}
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
      className="flex justify-center md:justify-end"
    >
      <video
        src={businessVideo}
        autoPlay
        loop
        muted
        playsInline
        className="w-full max-w-md md:max-w-lg lg:max-w-xl rounded-3xl shadow-2xl object-cover"
      />
    </motion.div>
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
          className="text-2xl md:text-3xl font-bold text-cyan-400 mb-10 relative z-10"
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
                className="w-full h-full object-cover rounded-xl transition-transform duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 via-black/30 to-cyan-500/20 
              opacity-0 group-hover:opacity-100 transition duration-500"></div>

              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-500">
                <h3 className="text-2xl font-extrabold text-yellow-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.9)] group-hover:animate-pulse">
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
        className="text-2xl md:text-3xl font-bold text-cyan-400 mb-15"
      >
        Contact Us
      </motion.h2>
      <p className="text-lg text-gray-200 max-w-lg">
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
