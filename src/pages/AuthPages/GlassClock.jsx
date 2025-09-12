import React, { useEffect, useRef } from "react";
import VanillaTilt from "vanilla-tilt";

const GlassClock = () => {
  const hrRef = useRef();
  const mnRef = useRef();
  const scRef = useRef();
  const clockRef = useRef();

  // Clock rotation logic
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hh = now.getHours() * 30;
      const mm = now.getMinutes() * 6;
      const ss = now.getSeconds() * 6;

      if (hrRef.current) hrRef.current.style.transform = `rotateZ(${hh + mm / 12}deg)`;
      if (mnRef.current) mnRef.current.style.transform = `rotateZ(${mm}deg)`;
      if (scRef.current) scRef.current.style.transform = `rotateZ(${ss}deg)`;
    };

    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // VanillaTilt effect
  useEffect(() => {
    if (clockRef.current) {
      VanillaTilt.init(clockRef.current, {
        max: 20,
        speed: 500,
        glare: true,
        "max-glare": 0.4,
      });
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-6">
      {/* Clock Container */}
      <div
        ref={clockRef}
        className="relative w-96 h-96 rounded-full 
        bg-gradient-to-br from-white/10 via-white/5 to-transparent 
        backdrop-blur-2xl border-4 border-purple-400/60 
        shadow-[0_0_40px_rgba(139,92,246,0.5)] flex items-center justify-center"
      >
        {/* Center dot */}
        <div className="absolute w-5 h-5 bg-purple-400 rounded-full z-20 shadow-md"></div>

        {/* Hour hand */}
        <div className="absolute w-48 h-48 flex justify-center">
          <div
            ref={hrRef}
            className="absolute w-2 h-24 bg-gradient-to-b from-purple-500 to-pink-500 rounded-md origin-bottom shadow-md"
          ></div>
        </div>

        {/* Minute hand */}
        <div className="absolute w-60 h-60 flex justify-center">
          <div
            ref={mnRef}
            className="absolute w-1.5 h-32 bg-gradient-to-b from-white to-gray-300 rounded-md origin-bottom shadow-md"
          ></div>
        </div>

        {/* Second hand */}
        <div className="absolute w-72 h-72 flex justify-center">
          <div
            ref={scRef}
            className="absolute w-0.5 h-40 bg-gradient-to-b from-blue-400 to-blue-600 rounded-md origin-bottom shadow-md"
          ></div>
        </div>

        {/* Indicators */}
        {[...Array(12)].map((_, i) => {
          const rotate = i * 30;
          return (
            <div
              key={i}
              className="absolute w-1.5 h-6 bg-purple-400/70 rounded-md shadow-sm"
              style={{
                transform: `rotate(${rotate}deg) translateY(-170px)`,
              }}
            ></div>
          );
        })}
      </div>

     
    
    </div>
  );
};

export default GlassClock;
