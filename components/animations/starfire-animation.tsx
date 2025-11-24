"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { AnimationProps } from "./types"

/**
 * StarfireAnimation
 */
export const StarfireAnimation = ({ w, h, animationKey }: AnimationProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.1 } },
    exit: { opacity: 0, transition: { duration: 0.3, delay: 2.2 } }
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
  {/* --- PHASE 1: THE SILHOUETTE (ENHANCED) --- */}

  {/* Energy Mist (SVG Turbulence) */}
  <motion.div
    className="absolute inset-0 opacity-30"
    initial={{ opacity: 0 }}
    animate={{ opacity: 0.3 }}
    transition={{ duration: 1 }}
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
      transition={{ duration: Math.random() * 2 + 1, repeat: Infinity, ease: "linear" }}
    />
  ))}

  {/* Pulsating Eyes */}
  <motion.div
    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: [0, 1, 0], scale: 1 }}
    transition={{ duration: 1.2, times: [0, 0.5, 1] }}
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

  {/* --- PHASE 2: COMBAT FLASHES (FREEZE FRAMES) --- */}

  {/* Background Starbolt Trails */}
  {Array.from({ length: 5 }).map((_, i) => (
    <motion.div
      key={`trail-${i}`}
      className="absolute h-2 bg-gradient-to-r from-transparent via-[#ff00cc] to-transparent"
      style={{
        width: "100%",
        top: Math.random() * 100 + "%",
        opacity: 0.5
      }}
      initial={{ x: "-100%" }}
      animate={{ x: "100%" }}
      transition={{ duration: 0.2, delay: 1.2 + Math.random(), repeat: Infinity }}
    />
  ))}

  {/* Flash 1: Charging (Left) + Freeze */}
  <motion.div
    className="absolute top-[30%] left-[20%]"
    initial={{ opacity: 0 }}
    animate={{ opacity: [0, 1, 1, 0], scale: [1, 1.05, 1.05, 1.1] }}
    transition={{ duration: 0.4, delay: 1.2, times: [0, 0.1, 0.8, 1] }}
  >
    <div className="relative w-[300px] h-[300px]">
      <Image
        src="/images/intro/starfire.png"
        alt="Starfire Combat 1"
        fill
        className="object-contain brightness-0 invert drop-shadow-[0_0_20px_#ff00cc]"
      />
      {/* Shockwave Ring */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-4 border-[#ff00cc] rounded-full"
        initial={{ width: 0, height: 0, opacity: 1 }}
        animate={{ width: 500, height: 500, opacity: 0 }}
        transition={{ duration: 0.4 }}
      />
    </div>
  </motion.div>

  {/* Flash 2: Flying Punch (Right) + Freeze */}
  <motion.div
    className="absolute top-[40%] right-[20%]"
    initial={{ opacity: 0 }}
    animate={{ opacity: [0, 1, 1, 0], scale: [1, 1.05, 1.05, 1.1] }}
    transition={{ duration: 0.4, delay: 1.7, times: [0, 0.1, 0.8, 1] }}
  >
    <div className="relative w-[300px] h-[300px]">
      <Image
        src="/images/intro/starfire.png"
        alt="Starfire Combat 2"
        fill
        className="object-contain brightness-0 invert drop-shadow-[0_0_20px_#00ff00]"
        style={{ transform: "scaleX(-1)" }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-4 border-[#00ff00] rounded-full"
        initial={{ width: 0, height: 0, opacity: 1 }}
        animate={{ width: 500, height: 500, opacity: 0 }}
        transition={{ duration: 0.4 }}
      />
    </div>
  </motion.div>

  {/* Flash 3: Energy Shield (Center) + Freeze */}
  <motion.div
    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
    initial={{ opacity: 0 }}
    animate={{ opacity: [0, 1, 1, 0], scale: [1, 1.05, 1.05, 1.1] }}
    transition={{ duration: 0.4, delay: 2.2, times: [0, 0.1, 0.8, 1] }}
  >
    <div className="relative w-[400px] h-[400px]">
      <Image
        src="/images/intro/starfire.png"
        alt="Starfire Combat 3"
        fill
        className="object-contain brightness-0 invert drop-shadow-[0_0_30px_#ffaa00]"
      />
      <div className="absolute inset-0 border-8 border-[#ffaa00] rounded-full blur-md opacity-50 animate-pulse" />
    </div>
  </motion.div>

  {/* --- PHASE 3: THE STARBOLT BLAST (VORTEX) --- */}

  {/* Vortex Implosion */}
  <motion.div
    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-white"
    initial={{ width: "100vmax", height: "100vmax", opacity: 0 }}
    animate={{ width: 0, height: 0, opacity: [0, 1, 0] }}
    transition={{ duration: 0.4, delay: 2.6, ease: "circIn" }}
    style={{ zIndex: 49 }}
  />

  {/* Organic Energy Ball */}
  <motion.div
    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white mix-blend-screen"
    initial={{ width: 0, height: 0, opacity: 0 }}
    animate={{ width: "250vmax", height: "250vmax", opacity: 1 }}
    transition={{ duration: 0.6, delay: 3.0, ease: "circIn" }}
    style={{ zIndex: 50 }}
  >
    {/* Chromatic Aberration Layers */}
    <motion.div className="absolute inset-0 rounded-full bg-[#ff00cc] mix-blend-screen" style={{ left: -10 }} />
    <motion.div className="absolute inset-0 rounded-full bg-[#00ff00] mix-blend-screen" style={{ left: 10 }} />
  </motion.div>

  {/* Internal Lightning */}
  <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 51 }}>
    <motion.path
      d={`M ${w / 2} ${h / 2} L ${w / 2 - 100} ${h / 2 - 200} L ${w / 2 + 200} ${h / 2 - 300}`}
      stroke="white" strokeWidth="5" fill="none"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: [0, 1, 0] }}
      transition={{ duration: 0.2, delay: 3.2 }}
    />
    <motion.path
      d={`M ${w / 2} ${h / 2} L ${w / 2 + 100} ${h / 2 + 200} L ${w / 2 - 200} ${h / 2 + 300}`}
      stroke="white" strokeWidth="5" fill="none"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: [0, 1, 0] }}
      transition={{ duration: 0.2, delay: 3.3 }}
    />
  </svg>

  {/* --- PHASE 4: THE METEOR LANDING (CINEMATIC) --- */}

  {/* Screen Shake on Impact */}
  <motion.div
    className="absolute inset-0"
    animate={{ x: [-20, 20, -10, 10, 0], y: [-10, 10, -5, 5, 0] }}
    transition={{ duration: 0.5, delay: 3.6 }}
    style={{ zIndex: 60 }}
  >
    {/* Meteor Descent (Combustion) */}
    <motion.div
      className="absolute left-1/2 -translate-x-1/2 w-32 h-[600px] bg-gradient-to-t from-white via-[#ffaa00] to-transparent blur-md"
      style={{ transformOrigin: "bottom" }}
      initial={{ y: -h, opacity: 0, scaleY: 2 }}
      animate={{ y: h / 2, opacity: [0, 1, 0], scaleY: 1 }}
      transition={{ duration: 0.3, delay: 3.4, ease: "easeIn" }}
    >
      {/* Heat Distortion */}
      <div className="absolute inset-0 bg-[#ff00cc]/20 mix-blend-overlay blur-xl" />
    </motion.div>

    {/* Impact Flash (Whiteout) */}
    <motion.div
      className="absolute inset-0 bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0] }}
      transition={{ duration: 0.15, delay: 3.6 }}
      style={{ zIndex: 70 }}
    />

    {/* Impact Crater & Shockwaves */}
    <motion.div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 3.6, duration: 0.1 }}
    >
      {/* Ground Cracks (SVG) */}
      <svg width="800" height="800" viewBox="0 0 800 800" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible">
        <defs>
          <filter id="glow-cracks">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {[0, 60, 120, 180, 240, 300].map((angle, i) => (
          <motion.path
            key={`crack-${i}`}
            d={`M 400 400 L ${400 + Math.cos(angle * Math.PI / 180) * 300} ${400 + Math.sin(angle * Math.PI / 180) * 300}`}
            stroke="#ffaa00"
            strokeWidth="4"
            fill="none"
            filter="url(#glow-cracks)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0, 1, 0] }}
            transition={{ duration: 0.5, delay: 3.6 }}
            style={{ transformOrigin: "center", rotate: angle + Math.random() * 20 }}
          />
        ))}
      </svg>

      {/* Main Crater Glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] bg-[#ffaa00] rounded-[100%] blur-xl mix-blend-screen"
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.5, 1] }}
        transition={{ duration: 0.4, delay: 3.6 }}
      />

      {/* Multiple Shockwaves */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-[10px] border-white rounded-[100%]"
        style={{ width: 100, height: 30 }}
        initial={{ opacity: 1, scale: 0 }}
        animate={{ opacity: 0, scale: 20 }}
        transition={{ duration: 0.6, delay: 3.6, ease: "easeOut" }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-[20px] border-[#ff00cc]/30 rounded-[100%] blur-md"
        style={{ width: 100, height: 30 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: [0, 0.5, 0], scale: 15 }}
        transition={{ duration: 1.0, delay: 3.7, ease: "easeOut" }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-[5px] border-[#ffaa00] rounded-[100%]"
        style={{ width: 100, height: 30 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: [0, 1, 0], scale: 10 }}
        transition={{ duration: 1.5, delay: 3.8, ease: "easeOut" }}
      />
    </motion.div>

    {/* Rising Starfire (Slow Reveal) */}
    <motion.div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      initial={{ y: 200, opacity: 0, scale: 0.8 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{ duration: 2.5, delay: 3.8, ease: "easeOut" }}
    >
      {/* 3D Debris */}
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={`debris-3d-${i}`}
          className="absolute bg-[#332200] border border-[#ffaa00]"
          style={{
            width: Math.random() * 20 + 10,
            height: Math.random() * 20 + 10,
            left: "50%",
            top: "50%",
            borderRadius: "4px",
            zIndex: 10
          }}
          initial={{ scale: 0 }}
          animate={{
            x: (Math.random() - 0.5) * 600,
            y: (Math.random() - 0.5) * 400 - 100,
            rotateX: Math.random() * 360,
            rotateY: Math.random() * 360,
            opacity: [1, 1, 0],
            scale: [0, 1, 0]
          }}
          transition={{ duration: 1.5, delay: 3.6, ease: "easeOut" }}
        />
      ))}

      {/* Energy Wings (Cinematic) */}
      <svg className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] overflow-visible" style={{ zIndex: -1 }}>
        <defs>
          <linearGradient id="wing-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="#ff00cc" stopOpacity="0.6" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <filter id="wing-blur">
            <feGaussianBlur stdDeviation="5" />
          </filter>
        </defs>
        {/* Left Wing */}
        <motion.path
          d="M 300 300 Q 100 100 0 200 Q 100 400 300 350 Z"
          fill="url(#wing-gradient)"
          filter="url(#wing-blur)"
          initial={{ scale: 0, opacity: 0, rotate: -20 }}
          animate={{ scale: 1, opacity: [0, 0.8, 0], rotate: 0 }}
          transition={{ duration: 2, delay: 4.0, ease: "easeOut" }}
        />
        {/* Right Wing */}
        <motion.path
          d="M 300 300 Q 500 100 600 200 Q 500 400 300 350 Z"
          fill="url(#wing-gradient)"
          filter="url(#wing-blur)"
          initial={{ scale: 0, opacity: 0, rotate: 20 }}
          animate={{ scale: 1, opacity: [0, 0.8, 0], rotate: 0 }}
          transition={{ duration: 2, delay: 4.0, ease: "easeOut" }}
        />
      </svg>

      {/* Levitation Platform */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[200px] h-[60px] border-2 border-[#ffaa00] rounded-[100%]"
        animate={{ rotate: 360, scale: [1, 1.2, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        style={{ transform: "rotateX(60deg)" }}
      />

      <div className="relative w-[500px] h-[500px]">
        <motion.div
          animate={{ y: [-15, 15, -15] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Silhouette Reveal Effect */}
          <motion.div
            initial={{ filter: "brightness(0)" }}
            animate={{ filter: "brightness(1)" }}
            transition={{ duration: 2, delay: 4.0 }}
          >
            <Image
              src="/images/intro/starfire.png"
              alt="Starfire Teen Titans"
              fill
              className="object-contain drop-shadow-[0_0_60px_rgba(255,170,0,0.9)]"
              priority
            />
          </motion.div>

          {/* Flaming Hair Particles */}
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={`hair-fire-${i}`}
              className="absolute bg-[#ff5500] rounded-full blur-sm"
              style={{
                width: Math.random() * 10 + 5,
                height: Math.random() * 10 + 5,
                left: "50%",
                top: "10%",
                zIndex: -1
              }}
              animate={{
                y: -Math.random() * 100 - 20,
                x: (Math.random() - 0.5) * 100,
                opacity: [0.8, 0],
                scale: [1, 0]
              }}
              transition={{ duration: 0.8 + Math.random(), repeat: Infinity, ease: "easeOut" }}
            />
          ))}

          {/* Glowing Eyes (Ignite First) */}
          <motion.div
            className="absolute top-[28%] left-[45%] w-[10%] h-[3%] bg-[#00ff00] blur-sm mix-blend-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.8] }}
            transition={{ duration: 0.5, delay: 3.8, repeat: Infinity, repeatDelay: 0.1 }}
          />

          {/* Energy Hands (Ignite First) */}
          <motion.div
            className="absolute top-[60%] left-[20%] w-12 h-12 bg-[#00ff00] rounded-full blur-xl mix-blend-screen animate-pulse"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 3.9 }}
          />
          <motion.div
            className="absolute top-[60%] right-[20%] w-12 h-12 bg-[#00ff00] rounded-full blur-xl mix-blend-screen animate-pulse"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 3.9 }}
          />
        </motion.div>
      </div>
    </motion.div>
  </motion.div>

</motion.div>
  )
}
