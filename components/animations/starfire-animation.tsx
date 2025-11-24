"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { AnimationProps } from "./types"

/**
 * StarfireAnimation - Compressed Timeline (Total ~5.5s)
 */
export const StarfireAnimation = ({ w, h, animationKey }: AnimationProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.1 } },
    exit: { opacity: 0, transition: { duration: 0.3 } }
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
      {/* --- PHASE 1: THE SILHOUETTE (0s - 0.8s) --- */}

      {/* Energy Mist (SVG Turbulence) */}
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

      {/* --- PHASE 2: COMBAT FLASHES (0.8s - 1.8s) --- */}

      {/* Flash 1: Charging (Left) */}
      <motion.div
        className="absolute top-[30%] left-[20%]"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0], scale: [1, 1.05, 1.05, 1.1] }}
        transition={{ duration: 0.3, delay: 0.8, times: [0, 0.1, 0.8, 1] }}
      >
        <div className="relative w-[300px] h-[300px]">
          <Image
            src="/images/intro/starfire.png"
            alt="Starfire Combat 1"
            fill
            className="object-contain brightness-0 invert drop-shadow-[0_0_20px_#ff00cc]"
          />
        </div>
      </motion.div>

      {/* Flash 2: Flying Punch (Right) */}
      <motion.div
        className="absolute top-[40%] right-[20%]"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0], scale: [1, 1.05, 1.05, 1.1] }}
        transition={{ duration: 0.3, delay: 1.1, times: [0, 0.1, 0.8, 1] }}
      >
        <div className="relative w-[300px] h-[300px]">
          <Image
            src="/images/intro/starfire.png"
            alt="Starfire Combat 2"
            fill
            className="object-contain brightness-0 invert drop-shadow-[0_0_20px_#00ff00]"
            style={{ transform: "scaleX(-1)" }}
          />
        </div>
      </motion.div>

      {/* Flash 3: Energy Shield (Center) */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0], scale: [1, 1.05, 1.05, 1.1] }}
        transition={{ duration: 0.3, delay: 1.4, times: [0, 0.1, 0.8, 1] }}
      >
        <div className="relative w-[400px] h-[400px]">
          <Image
            src="/images/intro/starfire.png"
            alt="Starfire Combat 3"
            fill
            className="object-contain brightness-0 invert drop-shadow-[0_0_30px_#ffaa00]"
          />
        </div>
      </motion.div>

      {/* --- PHASE 3: COSMIC ASCENSION (1.8s - 3.0s) --- */}

      {/* Flash to Black Transition */}
      <motion.div
        className="absolute inset-0 bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.3, delay: 1.8 }}
        style={{ zIndex: 45 }}
      />

      {/* SPACE VIEW - Deep Space Background */}
      <motion.div
        className="absolute inset-0 bg-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 1.9 }}
        style={{ zIndex: 10 }}
      >
        {/* Distant Stars */}
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute bg-white rounded-full"
            style={{
              width: Math.random() * 2 + 1,
              height: Math.random() * 2 + 1,
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%"
            }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: Math.random() * 2 + 1, repeat: Infinity }}
          />
        ))}
      </motion.div>

      {/* EARTH - Photorealistic 3D Sphere */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        initial={{ scale: 0.5, opacity: 0, rotateY: 180 }}
        animate={{ scale: 1, opacity: 1, rotateY: 360 }}
        transition={{ duration: 1.0, delay: 2.0, ease: "easeOut" }}
        style={{ zIndex: 20 }}
      >
        <div className="relative w-[600px] h-[600px]">
          {/* Earth Base */}
          <div className="absolute inset-0 rounded-full bg-gradient-radial from-[#0077be] via-[#004d7a] to-[#002244]" />
          {/* Atmospheric Glow */}
          <div className="absolute inset-[-10px] rounded-full bg-gradient-radial from-transparent via-[#0088ff]/30 to-[#0088ff]/60 blur-xl" />
        </div>
      </motion.div>

      {/* ENTRY TRAIL - Pink/Orange */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -200 }}
        animate={{ opacity: [0, 1, 1], y: h * 0.3 }}
        transition={{ duration: 0.8, delay: 2.2, ease: "easeIn" }}
        style={{ zIndex: 30 }}
      >
        {/* Plasma Trail Core */}
        <div className="relative w-32">
          <motion.div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[800px]"
            style={{
              background: "linear-gradient(to bottom, white 0%, #ff6600 30%, #ff00cc 70%, transparent 100%)",
              filter: "blur(8px)"
            }}
          />
        </div>
      </motion.div>

      {/* --- PHASE 4: ROYAL IMPACT & REVEAL (3.0s - 5.5s) --- */}

      {/* Transition to Ground View */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-orange-600/40 via-pink-500/20 to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0.6] }}
        transition={{ duration: 0.4, delay: 3.0 }}
        style={{ zIndex: 50 }}
      />

      {/* Screen Shake on Impact */}
      <motion.div
        className="absolute inset-0"
        animate={{ x: [-30, 30, -20, 20, -10, 10, 0], y: [-20, 20, -15, 15, -8, 8, 0] }}
        transition={{ duration: 0.4, delay: 3.2 }}
        style={{ zIndex: 60 }}
      >
        {/* Impact Flash */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.2, delay: 3.2 }}
          style={{ zIndex: 70 }}
        >
          <div className="absolute inset-0 bg-white" />
        </motion.div>

        {/* Crater Formation */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.4, duration: 0.3 }}
          style={{ zIndex: 70 }}
        >
          {/* Crater Base */}
          <div
            className="relative w-[700px] h-[250px] rounded-[50%] bg-gradient-radial from-yellow-600 via-orange-700 to-gray-900 border-4 border-orange-500/50"
            style={{ transform: "rotateX(70deg)", transformStyle: "preserve-3d" }}
          >
            {/* Magma Glow */}
            <motion.div
              className="absolute inset-[20%] rounded-[50%] bg-gradient-radial from-yellow-300 via-orange-500 to-red-600"
              animate={{ opacity: [0.8, 1, 0.8], scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{ boxShadow: "0 0 60px 20px rgba(255,170,0,0.8)" }}
            />
          </div>
        </motion.div>

        {/* Rising Starfire from Crater */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          initial={{ y: 300, opacity: 0, scale: 0.7 }}
          animate={{ y: -50, opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 3.6, ease: "easeOut" }}
          style={{ zIndex: 90 }}
        >
          <div className="relative w-[500px] h-[500px]">
            {/* Levitation */}
            <motion.div
              animate={{ y: [-20, 20, -20] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src="/images/intro/starfire.png"
                alt="Starfire Princess"
                fill
                className="object-contain drop-shadow-[0_0_80px_rgba(255,170,0,1)]"
                priority
              />

              {/* ROYAL CROWN OF FIRE */}
              <motion.svg
                className="absolute top-[5%] left-1/2 -translate-x-1/2 w-[300px] h-[100px]"
                viewBox="0 0 300 100"
                style={{ zIndex: 100 }}
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 4.0 }}
              >
                <defs>
                  <linearGradient id="flame-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#ffaa00" />
                    <stop offset="50%" stopColor="#ff6600" />
                    <stop offset="100%" stopColor="#ff0099" />
                  </linearGradient>
                </defs>
                {/* 7 Flame Points */}
                {[0, 1, 2, 3, 4, 5, 6].map(i => (
                  <motion.path
                    key={`flame-point-${i}`}
                    d={`M ${50 + i * 35} 80 Q ${50 + i * 35} 40 ${42 + i * 35} 20 L ${50 + i * 35} 15 L ${58 + i * 35} 20 Q ${50 + i * 35} 40 ${50 + i * 35} 80 Z`}
                    fill="url(#flame-gradient)"
                    animate={{ scaleY: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 0.8 + Math.random() * 0.4, repeat: Infinity, delay: i * 0.1 }}
                  />
                ))}
              </motion.svg>

              {/* Multi-Layered Energy Aura */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  width: 550,
                  height: 550,
                  background: `radial-gradient(circle, rgba(255,170,0,0.4) 0%, transparent 70%)`,
                  filter: `blur(40px)`,
                  zIndex: -1
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: [0, 1, 0.8], scale: [0.8, 1.1, 1] }}
                transition={{ duration: 1.0, delay: 3.8, repeat: Infinity, repeatType: "reverse" }}
              />
            </motion.div>
          </div>
        </motion.div>

        {/* ROYAL DECLARATION - Text Reveal */}
        <motion.div
          className="absolute bottom-[15%] left-1/2 -translate-x-1/2 text-center"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 4.2 }}
          style={{ zIndex: 110 }}
        >
          {/* Main Title */}
          <motion.div
            className="text-7xl font-bold tracking-[0.5em] mb-4"
            style={{
              background: "linear-gradient(135deg, #ffaa00 0%, #ff6600 50%, #ffaa00 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 0 40px rgba(255,170,0,0.8), 0 0 80px rgba(255,102,0,0.4)",
              fontFamily: "'Cinzel', serif"
            }}
          >
            KORIAND'R
          </motion.div>
        </motion.div>

        {/* Final Energy Burst */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-8 border-pink-400 rounded-full mix-blend-screen"
          initial={{ width: 0, height: 0, opacity: 0 }}
          animate={{ width: "200vmax", height: "200vmax", opacity: [0, 0.8, 0] }}
          transition={{ duration: 1.5, delay: 4.8, ease: "easeOut" }}
          style={{ zIndex: 95 }}
        />
      </motion.div>
    </motion.div>
  )
}
