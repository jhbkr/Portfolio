"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Aperture } from "lucide-react"
import { AnimationProps } from "./types"

/**
 * CyborgAnimation
 */
export const CyborgAnimation = ({ w, h, animationKey }: AnimationProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.1 } },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  }

  return (
    <motion.div
      key={`cyborg-${animationKey}`}
      className="fixed inset-0 z-[9000] pointer-events-none overflow-hidden bg-slate-950"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Phase 1: Interface Dense & Scanline (0 - 1.5s) */}
      {Array.from({ length: 35 }).map(
        (
          _,
          i, // Denser grid
        ) => (
          <motion.div
            key={`cy-hgrid-adv-${i}`}
            className="absolute h-[1px] bg-cyan-400/35 w-full"
            style={{ top: `${(i / 34) * 100}%` }}
            initial={{ scaleX: 0, originX: Math.random() > 0.5 ? 0 : 1 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.04 + i * 0.012, ease: "easeInOut" }}
          />
        ),
      )}
      {Array.from({ length: 50 }).map(
        (
          _,
          i, // Denser grid
        ) => (
          <motion.div
            key={`cy-vgrid-adv-${i}`}
            className="absolute w-[1px] bg-cyan-400/35 h-full"
            style={{ left: `${(i / 49) * 100}%` }}
            initial={{ scaleY: 0, originY: Math.random() > 0.5 ? 0 : 1 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.6, delay: 0.04 + i * 0.008, ease: "easeInOut" }}
          />
        ),
      )}
      <motion.div // Scanline with mix-blend-mode
        className="absolute top-0 left-0 w-full h-12 bg-cyan-200/60"
        style={{ filter: "blur(10px)", mixBlendMode: "screen" }}
        initial={{ y: "-100%" }}
        animate={{ y: "100vh" }}
        transition={{ duration: 0.8, delay: 0.3, ease: "linear", repeat: 2, repeatType: "loop" }}
      />

      {/* Phase 2: Activation & Detailed Eye (1.2s - 2.5s) */}
      {Array.from({ length: 60 }).map(
        (
          _,
          i, // Data streaks
        ) => (
          <motion.div
            key={`cy-data-beam-${i}`}
            className="absolute rounded bg-sky-300"
            style={{
              width: `${0.5 + Math.random()}px`,
              height: `${15 + Math.random() * 25}px`,
              left: `${Math.random() * 100}vw`,
            }}
            initial={{ opacity: 0, y: `${Math.random() * 100}vh` }}
            animate={{ opacity: [0, 0.8, 0], y: `${Math.random() * 100 - 50}vh` }}
            transition={{
              duration: 0.4 + Math.random() * 0.4,
              delay: 1.2 + Math.random() * 1.0,
              repeat: 1,
              repeatType: "loop",
            }}
          />
        ),
      )}
      <motion.div // Larger, detailed red eye
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 rounded-full bg-red-700 border-2 border-red-500"
        style={{ boxShadow: "0 0 80px 40px rgba(255,0,0,0.8), inset 0 0 25px 12px rgba(130,0,0,0.9)" }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1.15, opacity: 1 }}
        transition={{ duration: 0.4, delay: 1.5, type: "spring", stiffness: 180 }}
      >
        <motion.div className="w-1/3 h-1/3 bg-red-400 rounded-full absolute top-1/3 left-1/3 animate-pulse" />
      </motion.div>

      {/* Phase 3: Distinct Cannons & Wide Waves (2.2s - 4.0s) */}
      <motion.div // Distinct Arm
        className="absolute top-[calc(50%-7rem)] left-[5%] w-[35%] h-28 bg-slate-700 rounded-xl -translate-y-1/2 border-4 border-slate-600 shadow-xl"
        initial={{ x: "-100%", opacity: 0 }}
        animate={{ x: "0%", opacity: 1 }}
        transition={{ duration: 0.4, delay: 2.2 }}
      >
        <motion.div // Distinct Sonic Cannon
          className="absolute right-[-40px] top-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-sky-600 border-4 border-sky-300 flex items-center justify-center shadow-2xl shadow-sky-500/60"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: 2.4 }}
        >
          <Aperture width={90} height={90} className="text-sky-100 animate-spin-slow" />
        </motion.div>
      </motion.div>
      {Array.from({ length: 6 }).map(
        (
          _,
          i, // Wider sonic waves
        ) => (
          <motion.div
            key={`cy-wide-sonic-${i}`}
            className="absolute top-1/2 left-[calc(5%+17.5%)] -translate-y-1/2 rounded-full border-2 border-sky-200/90" // Adjusted origin
            initial={{ width: 0, height: 0, opacity: 0 }}
            animate={{ width: `${(i + 1) * 35}vw`, height: `${(i + 1) * 35}vw`, opacity: [0, 0.9, 0] }}
            transition={{ duration: 0.7, delay: 2.7 + i * 0.08, ease: "easeOut" }}
          />
        ),
      )}

      {/* Phase 4: "BOOYAH!" Impact (3.8s - 4.5s) */}
      <motion.div
        className="absolute bottom-[12%] left-1/2 -translate-x-1/2 text-8xl md:text-[120px] font-black text-sky-50" // Larger text
        style={{
          fontFamily: "'Press Start 2P', cursive",
          textShadow: "6px 6px #00A8E8, 12px 12px #0077B6, 0 0 25px #00FFFF",
        }} // More marked shadow
        initial={{ opacity: 0, y: 150, scale: 0.3, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.6, delay: 3.8, type: "spring", damping: 8, stiffness: 100 }}
      />
    </motion.div>
  )
}
