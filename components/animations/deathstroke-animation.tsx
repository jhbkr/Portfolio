"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { AnimationProps } from "./types"

/**
 * DeathstrokeAnimation - Revamped
 * A high-impact, sniper-focused animation with realistic glass shattering.
 */
export const DeathstrokeAnimation = ({ w, h, animationKey }: AnimationProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.1 } },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  }

  // COMPRESSED TIMING (Total 6s)
  const TIMING = {
    SCOPE_IN: 0.5,
    TARGET_LOCK: 2.0,
    SHOT: 2.8,
    IMPACT: 2.9,
    SHATTER: 3.5,
    REVEAL: 4.2,
    TEXT: 4.8,
    TOTAL: 6.0
  };

  return (
    <motion.div
      key={`deathstroke-${animationKey}`}
      className="fixed inset-0 z-[9000] pointer-events-none overflow-hidden bg-black"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* --- PHASE 1: THE SNIPER SCOPE (0s - 2.8s) --- */}
      <motion.div
        className="absolute inset-0 z-20 flex items-center justify-center"
        initial={{ opacity: 0, scale: 1.2 }}
        animate={{ opacity: [0, 1, 1, 0], scale: 1 }}
        transition={{ duration: TIMING.SHOT, times: [0, 0.2, 0.9, 1] }}
      >
        {/* Vignette / Scope Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_25%,black_60%)]" />

        {/* Scope Crosshair - Drifting */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ x: [0, -20, 15, 0], y: [0, 10, -10, 0] }}
          transition={{ duration: 3, ease: "easeInOut" }}
        >
          <svg width="100%" height="100%" viewBox="0 0 100 100">
            <line x1="0" y1="50" x2="100" y2="50" stroke="#00ff00" strokeWidth="0.1" opacity="0.6" />
            <line x1="50" y1="0" x2="50" y2="100" stroke="#00ff00" strokeWidth="0.1" opacity="0.6" />
            {/* Range finders */}
            <circle cx="50" cy="50" r="20" stroke="#00ff00" strokeWidth="0.1" fill="none" opacity="0.4" />
            <circle cx="50" cy="50" r="0.5" fill="red" className="animate-pulse" />

            {/* Tactical Grid */}
            {Array.from({ length: 10 }).map((_, i) => (
              <line
                key={`h-grid-${i}`}
                x1="30" y1={45 + i} x2="70" y2={45 + i}
                stroke="#00ff00" strokeWidth="0.02" opacity="0.2"
              />
            ))}
            {Array.from({ length: 10 }).map((_, i) => (
              <line
                key={`v-grid-${i}`}
                x1={45 + i} y1="30" x2={45 + i} y2="70"
                stroke="#00ff00" strokeWidth="0.02" opacity="0.2"
              />
            ))}
          </svg>
        </motion.div>

        {/* HUD Elements - Cinematic Data */}
        <div className="absolute top-[30%] right-[25%] text-[#00ff00] font-mono text-xs tracking-widest opacity-80 flex flex-col gap-1">
          <motion.div animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 0.5, repeat: Infinity }}>
            WIND: 2.4 E
          </motion.div>
          <div>ELEV: -12.5</div>
          <div className="flex gap-2">
            <span>DIST:</span>
            <motion.span
              animate={{ opacity: 1 }}
              transition={{ duration: 2 }}
            >
              <CountUp start={800} end={842} duration={2} />m
            </motion.span>
          </div>
          <div className="text-[10px] opacity-60">
            LAT: 34.0522 N<br />
            LON: 118.2437 W
          </div>
        </div>

        {/* Scrolling Binary/Data Stream (Left Side) */}
        <div className="absolute top-[35%] left-[25%] text-[#00ff00] font-mono text-[10px] opacity-60 w-24 overflow-hidden h-32">
          {Array.from({ length: 10 }).map((_, i) => (
            <motion.div
              key={`data-row-${i}`}
              animate={{ y: [0, -100] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: i * 0.2 }}
            >
              {Math.random().toString(2).substring(2, 14)}
            </motion.div>
          ))}
        </div>

        {/* TARGET LOCKED - Flashing */}
        <motion.div
          className="absolute top-[40%] left-1/2 -translate-x-1/2 text-red-600 font-mono text-lg font-bold border border-red-600 px-3 py-1 bg-red-900/20"
          initial={{ opacity: 0, scale: 2 }}
          animate={{ opacity: [0, 1, 0, 1, 0], scale: 1 }}
          transition={{ delay: TIMING.TARGET_LOCK, duration: 0.8, times: [0, 0.2, 0.4, 0.6, 1] }}
        >
          TARGET LOCKED
        </motion.div>
      </motion.div>

      {/* --- PHASE 2: THE SHOT & IMPACT (2.8s - 3.5s) --- */}

      {/* Muzzle Flash (Instant whiteout) */}
      <motion.div
        className="absolute inset-0 bg-white z-50 mix-blend-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ delay: TIMING.SHOT, duration: 0.1 }}
      />

      {/* Bullet Trail (Glowing streak) */}
      <motion.div
        className="absolute top-1/2 left-1/2 h-2 bg-gradient-to-r from-transparent via-orange-500 to-white z-40"
        style={{ width: "100%", originX: 0, rotate: -15, x: "-50%", y: "-50%" }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: [1, 0] }}
        transition={{ delay: TIMING.SHOT, duration: 0.15 }}
      />

      {/* IMPACT POINT - Spiderweb Crack */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: TIMING.IMPACT, duration: 0.1 }}
      >
        {/* The Hole */}
        <div className="w-16 h-16 bg-black rounded-full border-4 border-white/80 shadow-[0_0_50px_rgba(0,0,0,1)]" />

        {/* Cracks SVG */}
        <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] overflow-visible pointer-events-none">
          <defs>
            <filter id="crack-glow">
              <feGaussianBlur stdDeviation="1" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {/* Radiating Cracks */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
            <motion.path
              key={`crack-${i}`}
              d={`M 400 400 L ${400 + Math.cos(angle * Math.PI / 180) * 350} ${400 + Math.sin(angle * Math.PI / 180) * 350}`}
              stroke="white"
              strokeWidth={2 + Math.random() * 2}
              fill="none"
              filter="url(#crack-glow)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: TIMING.IMPACT, duration: 0.1 }}
            />
          ))}
          {/* Concentric Cracks */}
          {[100, 200, 300].map((r, i) => (
            <motion.circle
              key={`ring-${i}`}
              cx="400"
              cy="400"
              r={r}
              stroke="white"
              strokeWidth="1"
              fill="none"
              strokeDasharray="10, 20"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: TIMING.IMPACT + 0.05, duration: 0.2 }}
            />
          ))}
        </svg>
      </motion.div>

      {/* --- PHASE 3: THE SHATTER (3.5s+) --- */}

      {/* Glass Shards Explosion */}
      <div className="absolute inset-0 z-40 pointer-events-none overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => {
          const angle = (i * 18) * (Math.PI / 180);
          const dist = 300 + Math.random() * 300;
          return (
            <motion.div
              key={`shard-${i}`}
              className="absolute top-1/2 left-1/2 bg-gradient-to-br from-white/90 to-white/40 backdrop-blur-sm"
              style={{
                width: Math.random() * 60 + 20,
                height: Math.random() * 60 + 20,
                clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)", // Diamond shard
                boxShadow: "0 0 10px rgba(255,255,255,0.5)"
              }}
              initial={{ x: 0, y: 0, scale: 0, opacity: 0, rotate: 0 }}
              animate={{
                x: Math.cos(angle) * dist,
                y: Math.sin(angle) * dist,
                rotate: Math.random() * 720,
                scale: [0, 1.5, 1],
                opacity: [0, 1, 0]
              }}
              transition={{
                delay: TIMING.SHATTER,
                duration: 1.5,
                ease: "easeOut"
              }}
            />
          );
        })}
      </div>

      {/* --- PHASE 4: REVEAL DEATHSTROKE (4.2s+) --- */}
      <motion.div
        className="absolute inset-0 z-10 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: TIMING.REVEAL, duration: 0.5 }}
      >
        {/* Background Smoke/Atmosphere */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-orange-950/30 to-black" />

        {/* Character Image */}
        <div className="relative w-[500px] h-[500px]">
          <Image
            src="/images/intro/deathstroke.png"
            alt="Deathstroke"
            fill
            className="object-contain drop-shadow-[0_0_50px_rgba(255,69,0,0.6)]"
          />
          {/* Glowing Eye Flare */}
          <motion.div
            className="absolute top-[32%] right-[36%] w-4 h-4 bg-orange-500 rounded-full blur-[2px]"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.5, 1], opacity: 1 }}
            transition={{ delay: TIMING.REVEAL + 0.2, duration: 0.4 }}
          >
            <div className="absolute inset-0 bg-orange-400 blur-md animate-pulse" />
          </motion.div>
        </div>
      </motion.div>

      {/* --- PHASE 5: TEXT (4.8s+) --- */}
      <motion.div
        className="absolute bottom-[15%] left-1/2 -translate-x-1/2 z-50"
        initial={{ opacity: 0, y: 20, letterSpacing: "0.5em" }}
        animate={{ opacity: 1, y: 0, letterSpacing: "0.8em" }}
        transition={{ delay: TIMING.TEXT, duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-orange-500 to-red-600 drop-shadow-[0_0_15px_rgba(255,69,0,0.8)]">
          TERMINATED
        </h1>
      </motion.div>

    </motion.div>
  )
}

// Simple CountUp component for the distance
const CountUp = ({ start, end, duration }: { start: number, end: number, duration: number }) => {
  const [count, setCount] = React.useState(start);

  React.useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const update = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * (end - start) + start));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(update);
      }
    };

    animationFrame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationFrame);
  }, [start, end, duration]);

  return <>{count}</>;
}

import React from "react"
