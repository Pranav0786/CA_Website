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



import { FaArrowUp } from "react-icons/fa";  //  only keep this
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
  className="relative min-h-screen flex flex-col justify-center items-center rounded-3xl px-6 text-white overflow-hidden pt-24"
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

  {/* Dark overlay + gradient */}
  <div className="absolute inset-0 bg-black/40 z-10"></div>
  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black z-10"></div>

  {/* Floating glowing circles for glamour */}
  <div className="absolute top-20 left-20 w-40 h-40 bg-cyan-400/20 rounded-full blur-3xl animate-pulse z-0"></div>
  <div className="absolute bottom-20 right-20 w-52 h-52 bg-pink-500/20 rounded-full blur-3xl animate-bounce z-0"></div>

  {/* Centered Content */}
  <div className="relative z-20 max-w-5xl mx-auto flex flex-col items-center space-y-8 text-center">
    {/* Title */}
    <motion.h1
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-4xl md:text-6xl font-extrabold leading-tight"
    >
      Welcome to{" "}
      <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
        CA Hub
      </span>
    </motion.h1>

    {/* Animated tagline */}
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8, duration: 1 }}
      className="text-lg md:text-2xl text-yellow-300 font-semibold"
    >
      Empowering Businesses with{" "}
      <span className="text-pink-400">Finance + Technology</span>
    </motion.p>

    {/* Rotating Quotes */}
    <motion.p
      key={currentQuote}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.8 }}
      className="italic text-lg text-red-400 max-w-2xl"
    >
      "{currentQuote}"
    </motion.p>

    {/* Description */}
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="text-gray-200 text-lg md:text-xl leading-relaxed max-w-3xl"
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

    {/* CTA Buttons */}
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.2, duration: 0.8 }}
      className="flex gap-6 mt-6"
    >
      <button className="px-8 py-3 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold shadow-lg hover:shadow-cyan-500/50 transition-all duration-300">
        Get Started
      </button>
      <button className="px-8 py-3 rounded-full border border-cyan-400 text-cyan-300 font-semibold hover:bg-cyan-500/20 transition-all duration-300">
        Explore Services
      </button>
    </motion.div>

    {/* Stats */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12 text-center">
      {[
        { label: "Clients", value: "500+" },
        { label: "Audits", value: "1200+" },
        { label: "Tax Filings", value: "3000+" },
        { label: "Years Exp.", value: "10+" },
      ].map((stat, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 + i * 0.2 }}
          className="flex flex-col"
        >
          <span className="text-3xl font-extrabold text-cyan-400">{stat.value}</span>
          <span className="text-gray-300">{stat.label}</span>
        </motion.div>
      ))}
    </div>
  </div>

  
</section>

{/* About Section */}
<section
  id="about"
  className="relative px-6 py-20 border-2 border-transparent rounded-3xl
  overflow-hidden"
>
  {/* Animated Background Glow */}
  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 blur-3xl animate-pulse rounded-3xl"></div>
  <div className="absolute inset-0 bg-black/70 backdrop-blur-xl rounded-3xl"></div>

  {/* Decorative Floating Circles */}
  <div className="absolute w-32 h-32 bg-cyan-500/20 rounded-full blur-2xl animate-bounce top-10 left-10"></div>
  <div className="absolute w-40 h-40 bg-pink-500/20 rounded-full blur-2xl animate-pulse bottom-10 right-10"></div>

  <div className="relative z-10 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
    {/* Left Content */}
    <div className="text-center md:text-left space-y-8">
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-3xl md:text-4xl font-extrabold 
        text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500"
      >
        About Us
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-lg text-gray-200 max-w-4xl leading-relaxed"
      >
        At <span className="text-cyan-400 font-semibold animate-pulse">CA Portal</span>, 
        we combine <span className="text-yellow-400">financial expertise</span> with 
        <span className="text-pink-400"> modern technology</span> to deliver seamless 
        accounting, taxation, and audit solutions.  
        <br className="hidden md:block" />
        Our mission is to simplify complex financial processes, empower businesses with 
        <span className="bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent font-bold animate-gradient-x"> real-time insights</span>, 
        and ensure <span className="text-cyan-300">complete transparency</span> in every transaction.
      </motion.p>

      {/* Decorative Line Animation */}
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: "8rem" }}
        transition={{ duration: 1 }}
        className="h-[3px] bg-gradient-to-r from-cyan-400 via-blue-500 to-pink-500 rounded-full"
      ></motion.div>
    </div>

    {/* Right Side Video */}
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
      whileHover={{ scale: 1.05, rotate: 1 }}
      className="flex justify-center md:justify-end relative group"
    >
      <video
        src={businessVideo}
        autoPlay
        loop
        muted
        playsInline
        className="w-full max-w-md md:max-w-lg lg:max-w-xl rounded-3xl shadow-2xl object-cover 
        border-2 border-transparent group-hover:border-cyan-400 transition-all duration-500"
      />
      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-3xl border-2 border-transparent 
      group-hover:border-cyan-400 group-hover:shadow-[0_0_30px_rgba(34,211,238,0.9),0_0_60px_rgba(236,72,153,0.6)] transition duration-700"></div>
    </motion.div>
  </div>
</section>


  {/* Services Section */}
<section
  id="services"
  className="relative flex flex-col items-center justify-center px-6 py-20 text-center
  bg-gradient-to-br from-gray-900 via-black to-gray-800
  border-2 border-transparent rounded-3xl overflow-hidden"
>
  {/* Animated Background Gradient Glow */}
  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-blue-500/10 blur-3xl animate-pulse"></div>

  <motion.h2
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text 
    bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-500 mb-14 relative z-10"
  >
    🚀 Our Services
  </motion.h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-6xl relative z-10">
    {services.map((service, index) => (
      <motion.div
        key={index}
        whileHover={{ scale: 1.05, rotate: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-2xl shadow-xl cursor-pointer
        bg-white/5 backdrop-blur-lg border border-white/20
        transition-all duration-700 group overflow-hidden mx-auto"
      >
        {/* Background Image */}
        <img
          src={service.img}
          alt={service.title}
          className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-70 transition duration-700 rounded-2xl"
        />

        {/* Overlay Glow */}
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/30 via-violet-500/30 to-blue-600/30 opacity-0 group-hover:opacity-100 transition duration-500"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full p-4">
          <h3 className="text-xl sm:text-2xl font-bold text-yellow-400 drop-shadow group-hover:animate-pulse text-center">
            {service.title}
          </h3>

          <p className="mt-2 text-gray-300 text-sm sm:text-base leading-relaxed text-center">
            {service.description || "We provide top-notch solutions tailored to your needs."}
          </p>
        </div>

        {/* Border Glow */}
        <div className="absolute inset-0 rounded-2xl border-2 border-transparent 
        group-hover:border-cyan-400 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.9),0_0_40px_rgba(34,211,238,0.7)] 
        transition duration-700"></div>
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
