"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { AnimationProps } from "./types"

/**
 * StarfireAnimation - GRAND ART CINEMA EDITION
 * - Phases 1 & 2: Original Silhouette & Combat (Preserved)
 * - Phase 3+: 3D Earth, Volumetric Meteor with Star Trail, Precision Impact
 * Timeline: ~6.0s
 */
export const StarfireAnimation = ({ w, h, animationKey }: AnimationProps) => {
  const isMobile = w < 768
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.1 } },
    exit: { opacity: 0, transition: { duration: 0.5 } }
  }

  // TIMING CONSTANTS
  const T = {
    PHASE1_SILHOUETTE: 0,
    PHASE2_COMBAT: 0.8,
    PHASE3_SPACE: 1.8,
    PHASE4_ENTRY: 2.5,
    PHASE5_IMPACT: 3.5, // Delayed slightly for impact
    PHASE6_REVEAL: 4.2,
    PHASE7_TEXT: 4.8,
  }

  return (
    <motion.div
      key={`starfire-${animationKey}`}
      className="fixed inset-0 z-[9000] pointer-events-none overflow-hidden bg-black"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* ==================================================================================
          PHASE 1: THE SILHOUETTE (ORIGINAL)
         ================================================================================== */}
      <motion.div
        className="absolute inset-0 opacity-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 0.5 }}
      >
        <svg width="100%" height="100%">
          <filter id="mist-turbulence">
            <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="30" />
          </filter>
          <rect width="100%" height="100%" fill="#00ff00" filter="url(#mist-turbulence)" opacity="0.2" />
        </svg>
      </motion.div>

      {/* Floating Embers */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={`ember-${i}`}
          className="absolute bg-[#00ff00] rounded-full blur-[1px]"
          style={{
            width: Math.random() * 3 + "px",
            height: Math.random() * 3 + "px",
            left: Math.random() * 100 + "%",
            top: "100%"
          }}
          animate={{
            y: -h,
            opacity: [0, 1, 0],
            x: (Math.random() - 0.5) * 100
          }}
          transition={{ duration: Math.random() * 1.5 + 0.5, repeat: Infinity, ease: "linear" }}
        />
      ))}

      {/* Pulsating Eyes */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: [0, 1, 0], scale: 1 }}
        transition={{ duration: 0.8, times: [0, 0.5, 1] }}
      >
        <div className="flex gap-12">
          <motion.div
            className="w-10 h-4 bg-[#00ff00] shadow-[0_0_30px_#00ff00] rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.2, repeat: Infinity }}
          />
          <motion.div
            className="w-10 h-4 bg-[#00ff00] shadow-[0_0_30px_#00ff00] rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.2, repeat: Infinity }}
          />
        </div>
      </motion.div>

      {/* ==================================================================================
          PHASE 2: COMBAT FLASHES (ORIGINAL)
         ================================================================================== */}
      <motion.div
        className="absolute top-[30%] left-[20%]"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0], scale: [1, 1.05, 1.05, 1.1] }}
        transition={{ duration: 0.3, delay: T.PHASE2_COMBAT, times: [0, 0.1, 0.8, 1] }}
      >
        <div className="relative w-[300px] h-[300px]">
          <Image src="/images/intro/starfire.png" alt="Combat 1" fill className="object-contain brightness-0 invert drop-shadow-[0_0_20px_#ff00cc]" />
        </div>
      </motion.div>

      <motion.div
        className="absolute top-[40%] right-[20%]"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0], scale: [1, 1.05, 1.05, 1.1] }}
        transition={{ duration: 0.3, delay: T.PHASE2_COMBAT + 0.3, times: [0, 0.1, 0.8, 1] }}
      >
        <div className="relative w-[300px] h-[300px] scale-x-[-1]">
          <Image src="/images/intro/starfire.png" alt="Combat 2" fill className="object-contain brightness-0 invert drop-shadow-[0_0_20px_#00ff00]" />
        </div>
      </motion.div>

      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0], scale: [1, 1.05, 1.05, 1.1] }}
        transition={{ duration: 0.3, delay: T.PHASE2_COMBAT + 0.6, times: [0, 0.1, 0.8, 1] }}
      >
        <div className="relative w-[400px] h-[400px]">
          <Image src="/images/intro/starfire.png" alt="Combat 3" fill className="object-contain brightness-0 invert drop-shadow-[0_0_30px_#ffaa00]" />
        </div>
      </motion.div>

      {/* ==================================================================================
          PHASE 3: ORBITAL DESCENT (GRAND ART)
          3D Earth Model + Volumetric Meteor + Star Trail
         ================================================================================== */}

      {/* Flash to Space */}
      <motion.div
        className="absolute inset-0 bg-white z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.3, delay: T.PHASE3_SPACE }}
      />

      {/* SPACE CONTAINER */}
      <motion.div
        className="absolute inset-0 bg-black z-10 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.1, delay: T.PHASE3_SPACE + 0.1 }}
      >
        {/* Starfield */}
        <motion.div className="absolute inset-0" animate={{ scale: 1.05 }} transition={{ duration: 5, ease: "linear" }}>
          {Array.from({ length: isMobile ? 75 : 150 }).map((_, i) => (
            <div
              key={`star-${i}`}
              className="absolute bg-white rounded-full opacity-80"
              style={{
                width: Math.random() * 2 + 0.5,
                height: Math.random() * 2 + 0.5,
                left: Math.random() * 100 + "%",
                top: Math.random() * 100 + "%"
              }}
            />
          ))}
        </motion.div>

        {/* 3D EARTH MODEL (ENHANCED) */}
        <motion.div
          className="absolute -bottom-[85%] -left-[20%] w-[140%] h-[140%] rounded-[50%]"
          style={{
            // Complex gradient to simulate day/night terminator and atmosphere
            background: "radial-gradient(circle at 50% 0%, #1a4b8c 0%, #001845 30%, #000000 70%)",
            boxShadow: "inset 0 10px 100px rgba(100, 200, 255, 0.3), 0 -20px 100px rgba(0, 100, 255, 0.1), 0 0 100px rgba(0, 100, 255, 0.1)"
          }}
          initial={{ rotate: -2 }}
          animate={{ rotate: 0 }}
          transition={{ duration: 3, ease: "linear" }}
        >
          {/* Atmosphere Glow Layer */}
          <div className="absolute -top-[5%] left-0 w-full h-[20%] bg-gradient-to-b from-[#4da6ff30] to-transparent blur-3xl" />

          {/* Cloud Layer (SVG Noise) */}
          <div className="absolute inset-0 opacity-30 mix-blend-overlay">
            <svg width="100%" height="100%">
              <filter id="cloud-noise">
                <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="4" />
              </filter>
              <rect width="100%" height="100%" filter="url(#cloud-noise)" fill="white" />
            </svg>
          </div>
        </motion.div>

        {/* THE METEOR (VOLUMETRIC COMET + STAR TRAIL) */}
        <motion.div
          className="absolute top-0 left-1/2"
          initial={{ x: -400, y: -400, opacity: 0 }}
          animate={{ x: w * 0.2, y: h * 0.7, opacity: 1 }} // Aiming for the horizon (h * 0.7 is roughly the top of the earth curve)
          transition={{ duration: 1.6, delay: T.PHASE3_SPACE + 0.2, ease: "easeIn" }}
          style={{ rotate: 45 }}
        >
          {/* Core Head */}
          <div className="relative z-20 w-8 h-8 bg-white rounded-full shadow-[0_0_40px_15px_rgba(255,200,100,0.9)] blur-[1px]" />

          {/* Volumetric Tail (Multi-layered) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-[600px] origin-top transform -rotate-180">
            {/* Inner Core */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-full bg-gradient-to-b from-white via-yellow-300 to-transparent blur-sm" />
            {/* Outer Plasma */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-[500px] bg-gradient-to-b from-orange-500/80 via-red-600/40 to-transparent blur-xl" />

            {/* STAR TRAIL (Sparkles) */}
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={`star-trail-${i}`}
                className="absolute bg-white rounded-full shadow-[0_0_5px_white]"
                style={{
                  width: Math.random() * 4 + 2,
                  height: Math.random() * 4 + 2,
                  left: "50%", top: i * 20
                }}
                animate={{
                  x: (Math.random() - 0.5) * 60,
                  opacity: [1, 0],
                  scale: [1, 0]
                }}
                transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.05 }}
              />
            ))}

            {/* Turbulent Particles */}
            {Array.from({ length: isMobile ? 20 : 40 }).map((_, i) => (
              <motion.div
                key={`tail-p-${i}`}
                className="absolute bg-orange-400 rounded-full blur-md"
                style={{
                  width: Math.random() * 10 + 5,
                  height: Math.random() * 40 + 20,
                  left: "50%", top: i * 10
                }}
                animate={{
                  x: (Math.random() - 0.5) * 40,
                  opacity: [0.6, 0],
                  scale: [1, 0.5]
                }}
                transition={{ duration: 0.3, repeat: Infinity, delay: i * 0.02 }}
              />
            ))}
          </div>
        </motion.div>

      </motion.div>

      {/* ==================================================================================
          PHASE 4: IMPACT (GRAND ART)
          Precise collision with Earth horizon
         ================================================================================== */}

      {/* Impact Flash */}
      <motion.div
        className="absolute inset-0 bg-white z-[60]"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.2, delay: T.PHASE5_IMPACT }}
      />

      {/* Screen Shake */}
      <motion.div
        className="absolute inset-0 z-[40]"
        animate={{ x: [-20, 20, -15, 15, -10, 10, 0], y: [-20, 20, -15, 15, -10, 10, 0] }}
        transition={{ duration: 0.6, delay: T.PHASE5_IMPACT }}
      >
        {/* Background Crater Glow */}
        <motion.div
          className="absolute inset-0 bg-gradient-radial from-[#4a0404] via-black to-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.1, delay: T.PHASE5_IMPACT + 0.1 }}
        />

        {/* Shockwave Ring */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-[60px] border-orange-500/50"
          initial={{ width: 0, height: 0, opacity: 1 }}
          animate={{ width: "250vmax", height: "250vmax", opacity: 0, borderWidth: 0 }}
          transition={{ duration: 0.8, delay: T.PHASE5_IMPACT, ease: "easeOut" }}
        />

        {/* Ejecta (Debris flying out) */}
        <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full overflow-visible">
          {Array.from({ length: 16 }).map((_, i) => (
            <motion.line
              key={`ejecta-${i}`}
              x1="0" y1="0" x2="0" y2="-150"
              stroke="orange" strokeWidth="4" strokeLinecap="round"
              transform={`rotate(${i * 22.5})`}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: [0, 1, 0], strokeWidth: [4, 0] }}
              transition={{ duration: 0.6, delay: T.PHASE5_IMPACT }}
            />
          ))}
        </svg>
      </motion.div>

      {/* ==================================================================================
          PHASE 5: THE REVEAL (GRAND ART)
          Cinematic lighting, particles, sleek text.
         ================================================================================== */}

      <motion.div
        className="absolute inset-0 z-[50] flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: T.PHASE6_REVEAL }}
      >
        {/* Rising Smoke/Steam */}
        <div className="absolute inset-0 bg-gradient-to-t from-orange-900/60 via-transparent to-transparent" />

        {/* Character */}
        <motion.div
          className="relative w-[600px] h-[600px]"
          initial={{ y: 50, scale: 0.95 }}
          animate={{ y: 0, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          {/* Backlight (Rim Light) */}
          <div className="absolute inset-0 bg-orange-500 blur-3xl opacity-40 scale-90" />

          <Image
            src="/images/intro/starfire.png"
            alt="Starfire"
            fill
            className="object-contain drop-shadow-[0_0_50px_rgba(255,100,0,0.6)]"
          />

          {/* Floating Embers */}
          {Array.from({ length: isMobile ? 12 : 25 }).map((_, i) => (
            <motion.div
              key={`ember-${i}`}
              className="absolute bg-yellow-400 rounded-full blur-[1px]"
              style={{
                width: Math.random() * 4 + 1,
                height: Math.random() * 4 + 1,
                left: Math.random() * 100 + "%",
                top: Math.random() * 100 + "%"
              }}
              animate={{ y: -400, opacity: [0, 1, 0], x: (Math.random() - 0.5) * 50 }}
              transition={{ duration: 3, delay: Math.random(), repeat: Infinity }}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* ==================================================================================
          PHASE 6: TITLE CARD (GRAND ART)
         ================================================================================== */}
      <motion.div
        className="absolute bottom-[15%] left-0 w-full text-center z-[60]"
        initial={{ opacity: 0, letterSpacing: "0.2em", scale: 0.9 }}
        animate={{ opacity: 1, letterSpacing: "0.5em", scale: 1 }}
        transition={{ duration: 1.2, delay: T.PHASE7_TEXT, ease: "easeOut" }}
      >
        <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-yellow-100 via-orange-500 to-red-800 drop-shadow-[0_4px_15px_rgba(0,0,0,0.9)]"
          style={{ fontFamily: "'Cinzel', serif", textShadow: "0 0 40px rgba(255,100,0,0.5)" }}>
          KORIAND'R
        </h1>
        <motion.div
          className="w-48 h-[2px] bg-gradient-to-r from-transparent via-orange-500 to-transparent mx-auto mt-4"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 300, opacity: 1 }}
          transition={{ duration: 1, delay: T.PHASE7_TEXT + 0.5 }}
        />
      </motion.div>

    </motion.div>
  )
}
