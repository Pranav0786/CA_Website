"use client"

import { useEffect, useRef } from "react"
import VanillaTilt from "vanilla-tilt"

const GlassClock = () => {
  const hrRef = useRef()
  const mnRef = useRef()
  const scRef = useRef()
  const clockRef = useRef()

  // Clock rotation logic
  useEffect(() => {
    const updateClock = () => {
      const now = new Date()
      const hh = now.getHours() * 30
      const mm = now.getMinutes() * 6
      const ss = now.getSeconds() * 6

      if (hrRef.current) hrRef.current.style.transform = `rotateZ(${hh + mm / 12}deg)`
      if (mnRef.current) mnRef.current.style.transform = `rotateZ(${mm}deg)`
      if (scRef.current) scRef.current.style.transform = `rotateZ(${ss}deg)`
    }

    const interval = setInterval(updateClock, 1000)
    return () => clearInterval(interval)
  }, [])

  // VanillaTilt effect
  useEffect(() => {
    if (clockRef.current) {
      VanillaTilt.init(clockRef.current, {
        max: 25,
        speed: 400,
        glare: true,
        "max-glare": 0.6,
        scale: 1.02,
      })
    }
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 ">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 animate-pulse"></div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Clock Container */}
      <div
        ref={clockRef}
        className="relative w-96 h-96 rounded-full 
        bg-gradient-to-br from-white/20 via-white/10 to-white/5
        backdrop-blur-3xl border-2 border-white/30
        shadow-[0_0_60px_rgba(139,92,246,0.8),0_0_120px_rgba(236,72,153,0.4),inset_0_0_60px_rgba(255,255,255,0.1)]
        flex items-center justify-center
        before:absolute before:inset-0 before:rounded-full 
        before:bg-gradient-to-br before:from-white/10 before:to-transparent before:blur-xl
        after:absolute after:inset-2 after:rounded-full 
        after:bg-gradient-to-tl after:from-transparent after:to-white/5
        transition-all duration-300 hover:shadow-[0_0_80px_rgba(139,92,246,1),0_0_160px_rgba(236,72,153,0.6)]"
      >
        <div
          className="absolute w-6 h-6 bg-gradient-to-br from-white via-purple-300 to-pink-400 rounded-full z-20 
        shadow-[0_0_20px_rgba(139,92,246,0.8)] border border-white/50
        before:absolute before:inset-0.5 before:rounded-full before:bg-gradient-to-br before:from-white/80 before:to-transparent"
        ></div>

        <div className="absolute w-48 h-48 flex justify-center">
          <div
            ref={hrRef}
            className="absolute w-3 h-24 bg-gradient-to-b from-white via-purple-300 to-purple-500 rounded-full origin-bottom 
            shadow-[0_0_15px_rgba(139,92,246,0.6)] border border-white/30
            before:absolute before:inset-0.5 before:rounded-full before:bg-gradient-to-b before:from-white/60 before:to-transparent"
          ></div>
        </div>

        <div className="absolute w-60 h-60 flex justify-center">
          <div
            ref={mnRef}
            className="absolute w-2 h-32 bg-gradient-to-b from-white via-blue-200 to-blue-400 rounded-full origin-bottom 
            shadow-[0_0_12px_rgba(59,130,246,0.6)] border border-white/40
            before:absolute before:inset-0.5 before:rounded-full before:bg-gradient-to-b before:from-white/70 before:to-transparent"
          ></div>
        </div>

        <div className="absolute w-72 h-72 flex justify-center">
          <div
            ref={scRef}
            className="absolute w-0.5 h-40 bg-gradient-to-b from-pink-300 via-pink-400 to-red-500 rounded-full origin-bottom 
            shadow-[0_0_10px_rgba(236,72,153,0.8)] animate-pulse"
          ></div>
        </div>

        {[...Array(12)].map((_, i) => {
          const rotate = i * 30
          const isMainHour = i % 3 === 0
          return (
            <div
              key={i}
              className={`absolute rounded-full shadow-sm ${
                isMainHour
                  ? "w-2 h-8 bg-gradient-to-b from-white via-purple-300 to-purple-400 shadow-[0_0_8px_rgba(139,92,246,0.6)]"
                  : "w-1 h-4 bg-gradient-to-b from-white/80 to-purple-300/60 shadow-[0_0_4px_rgba(139,92,246,0.4)]"
              }`}
              style={{
                transform: `rotate(${rotate}deg) translateY(-170px)`,
              }}
            ></div>
          )
        })}

        <div className="absolute inset-8 rounded-full border border-white/20 shadow-inner"></div>

        <div className="absolute -inset-4 rounded-full border border-purple-400/30 shadow-[0_0_40px_rgba(139,92,246,0.3)] animate-pulse"></div>
      </div>

      <div className="mt-8 text-center">
        <h2 className="text-2xl font-light text-white/90 tracking-wider">Glass Clock</h2>
        <p className="text-sm text-white/60 mt-2">Elegant • Timeless • Beautiful</p>
      </div>
    </div>
  )
}

export default GlassClock
