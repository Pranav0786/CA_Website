import React, { useState } from "react";

const Navbar = ({ items, onLogout, brand = "Brand" }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-xl border-b border-white/10 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand */}
          <div className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            {brand}
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-2">
            {items.map((item, index) => (
              <a
                key={index}
                href={item.path}
                className="relative flex items-center gap-2 px-4 py-2 text-sm font-medium text-white/90 rounded-lg border border-transparent hover:border-white/20 hover:bg-white/10 transition-all duration-300"
              >
                <i className={`fas ${item.icon} text-sm transition-transform group-hover:scale-110`} />
                <span>{item.label}</span>
              </a>
            ))}
            {onLogout && (
              <button
                onClick={onLogout}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-400 rounded-lg border border-transparent hover:bg-red-500/20 hover:border-red-500/40 transition-all duration-300"
              >
                <i className="fas fa-sign-out-alt text-sm" />
                Logout
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-white/90 border border-white/10 rounded-lg hover:bg-white/10 transition-all"
            >
              <div className="w-5 h-5 flex flex-col justify-between">
                <span
                  className={`h-0.5 w-full bg-current transition-transform ${
                    isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
                  }`}
                />
                <span
                  className={`h-0.5 w-full bg-current transition-opacity ${
                    isMobileMenuOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`h-0.5 w-full bg-current transition-transform ${
                    isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pt-2 pb-4 space-y-2 bg-black/40 backdrop-blur-2xl border-t border-white/10">
          {items.map((item, index) => (
            <a
              key={index}
              href={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-2 rounded-lg text-white/90 hover:bg-white/10 hover:border-white/20 border border-transparent transition-all"
            >
              <i className={`fas ${item.icon} text-base`} />
              <span>{item.label}</span>
            </a>
          ))}
          {onLogout && (
            <button
              onClick={() => {
                onLogout();
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center gap-3 px-4 py-2 rounded-lg text-red-400 hover:bg-red-500/20 hover:border-red-500/40 border border-transparent transition-all w-full text-left"
            >
              <i className="fas fa-sign-out-alt text-base" />
              <span>Logout</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
