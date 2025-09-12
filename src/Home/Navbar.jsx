import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-scroll";   // for smooth scroll
import caLogo from "../assets/image.png"; // your CA logo

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // If not on Home page, go to "/" first then scroll to section
  const handleScroll = (id) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-blue-400/30 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleScroll("hero")}>
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-blue-400 shadow-lg">
            <img src={caLogo} alt="CA Logo" className="w-full h-full object-cover" />
          </div>
          <span className="text-2xl font-extrabold text-white tracking-wide">
            CA Portal
          </span>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center space-x-10 text-white font-medium text-lg">
          {["Hero", "About", "Services", "Contact"].map((item) => (
            <li key={item} className="relative cursor-pointer group">
              {location.pathname === "/" ? (
                <Link to={item.toLowerCase()} smooth={true} duration={500} offset={-70}>
                  {item}
                </Link>
              ) : (
                <span onClick={() => handleScroll(item.toLowerCase())}>{item}</span>
              )}
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-400 group-hover:w-full transition-all duration-300"></span>
            </li>
          ))}
          <li>
            <button
              onClick={() => navigate("/login")}
              className="px-5 py-2 rounded-full bg-blue-500/20 border border-blue-400 text-white font-semibold hover:bg-blue-500/30 hover:shadow-[0_0_15px_rgba(0,150,255,0.6)] transition duration-300"
            >
              Sign In
            </button>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white text-3xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden flex flex-col items-center space-y-6 py-6 bg-black/90 backdrop-blur-md text-white font-medium text-lg shadow-xl">
          {["Hero", "About", "Services", "Contact"].map((item) => (
            <li
              key={item}
              className="hover:text-blue-300 transition duration-300 cursor-pointer"
              onClick={() => {
                setIsOpen(false);
                handleScroll(item.toLowerCase());
              }}
            >
              {item}
            </li>
          ))}
          <li>
            <button
              onClick={() => {
                setIsOpen(false);
                navigate("/login");
              }}
              className="px-5 py-2 rounded-full bg-blue-500/20 border border-blue-400 text-white font-semibold hover:bg-blue-500/30 hover:shadow-[0_0_15px_rgba(0,150,255,0.6)] transition duration-300"
            >
              Sign In
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
