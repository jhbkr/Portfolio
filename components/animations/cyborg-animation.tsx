"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Aperture } from "lucide-react"
import { AnimationProps } from "./types"

/**
 * CyborgAnimation - ENHANCED
 * Tech Interface, HUD, Sonic Cannon, Victor Stone Reveal
 */
export const CyborgAnimation = ({ w, h, animationKey }: AnimationProps) => {
  const isMobile = w < 768

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
      {Array.from({ length: 35 }).map((_, i) => (
        <motion.div
          key={`cy-hgrid-adv-${i}`}
          className="absolute h-[1px] bg-cyan-400/35 w-full"
          style={{ top: `${(i / 34) * 100}%` }}
          initial={{ scaleX: 0, originX: Math.random() > 0.5 ? 0 : 1 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.04 + i * 0.012, ease: "easeInOut" }}
        />
      ))}
      {Array.from({ length: 50 }).map((_, i) => (
        <motion.div
          key={`cy-vgrid-adv-${i}`}
          className="absolute w-[1px] bg-cyan-400/35 h-full"
          style={{ left: `${(i / 49) * 100}%` }}
          initial={{ scaleY: 0, originY: Math.random() > 0.5 ? 0 : 1 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.6, delay: 0.04 + i * 0.008, ease: "easeInOut" }}
        />
      ))}

      {/* Scanner (Keep - User's favorite!) */}
      <motion.div
        className="absolute top-0 left-0 w-full h-12 bg-cyan-200/60"
        style={{ filter: "blur(10px)", mixBlendMode: "screen" }}
        initial={{ y: "-100%" }}
        animate={{ y: "100vh" }}
        transition={{ duration: 0.8, delay: 0.3, ease: "linear", repeat: 2, repeatType: "loop" }}
      />

      {/* HUD/Targeting System (NEW) */}
      {/* Corner Brackets */}
      <motion.div
        className="absolute top-4 left-4 md:top-8 md:left-8 w-12 h-12 md:w-20 md:h-20 border-t-2 md:border-t-4 border-l-2 md:border-l-4 border-cyan-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.3 }}
      />
      <motion.div
        className="absolute top-4 right-4 md:top-8 md:right-8 w-12 h-12 md:w-20 md:h-20 border-t-2 md:border-t-4 border-r-2 md:border-r-4 border-cyan-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.3 }}
      />
      <motion.div
        className="absolute bottom-4 left-4 md:bottom-8 md:left-8 w-12 h-12 md:w-20 md:h-20 border-b-2 md:border-b-4 border-l-2 md:border-l-4 border-cyan-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.3 }}
      />
      <motion.div
        className="absolute bottom-4 right-4 md:bottom-8 md:right-8 w-12 h-12 md:w-20 md:h-20 border-b-2 md:border-b-4 border-r-2 md:border-r-4 border-cyan-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.3 }}
      />

      {/* Enhanced System Readouts with animated values */}
      <motion.div
        className="absolute top-12 left-32 text-cyan-400 font-mono text-xs"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.3 }}
      >
        <div>SYSTEM: <span className="text-green-400">ONLINE</span></div>
        <motion.div
          className="mt-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          POWER: <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            100%
          </motion.span>
        </motion.div>
        <div className="mt-1 text-[8px] opacity-60">v2.0.47-STONE</div>
      </motion.div>

      {/* Rotating Radar HUD Element (Creative) */}
      <motion.div
        className="absolute top-12 left-[45%] md:top-16 w-16 h-16 md:w-24 md:h-24"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.6, scale: 1, rotate: 360 }}
        transition={{
          opacity: { delay: 0.8, duration: 0.5 },
          scale: { delay: 0.8, duration: 0.5 },
          rotate: { duration: 8, repeat: Infinity, ease: "linear" }
        }}
      >
        <div className="relative w-full h-full border-2 border-cyan-400/40 rounded-full">
          <div className="absolute top-1/2 left-1/2 w-full h-[2px] bg-gradient-to-r from-cyan-400 to-transparent" style={{ transformOrigin: 'left center' }} />
          <div className="absolute top-1/2 left-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1/2 bg-cyan-400 rounded-full" />
        </div>
      </motion.div>
      <motion.div
        className="absolute top-12 right-32 text-cyan-400 font-mono text-xs text-right"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.3 }}
      >
        <div>TARGET: LOCKED</div>
      </motion.div>

      {/* Phase 2: Activation & Detailed Eye (1.2s - 2.5s) */}
      {Array.from({ length: isMobile ? 30 : 60 }).map((_, i) => (
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
      ))}

      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 rounded-full bg-red-700 border-2 border-red-500"
        style={{ boxShadow: "0 0 80px 40px rgba(255,0,0,0.8), inset 0 0 25px 12px rgba(130,0,0,0.9)" }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1.15, opacity: 1 }}
        transition={{ duration: 0.4, delay: 1.5, type: "spring", stiffness: 180 }}
      >
        <motion.div className="w-1/3 h-1/3 bg-red-400 rounded-full absolute top-1/3 left-1/3 animate-pulse" />
      </motion.div>

      {/* Phase 3: Enhanced Sonic Cannon & Waves (2.2s - 4.0s) */}
      <motion.div
        className="absolute top-[calc(50%-7rem)] left-[5%] w-[35%] h-28 bg-slate-700 rounded-xl -translate-y-1/2 border-4 border-slate-600 shadow-xl"
        initial={{ x: "-100%", opacity: 0 }}
        animate={{ x: "0%", opacity: 1 }}
        transition={{ duration: 0.4, delay: 2.2 }}
      >
        {/* Electric Arcs (Enhanced) */}
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={`arc-${i}`}
            className="absolute right-[-20px] top-1/2 w-1 h-16 bg-cyan-300 rounded-full shadow-[0_0_10px_#00FFFF]"
            style={{
              rotate: `${(i - 2) * 15}deg`,
              transformOrigin: "left center",
            }}
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: [0, 1, 0], scaleY: [0, 1, 0] }}
            transition={{
              delay: 2.5 + i * 0.05,
              duration: 0.3,
              repeat: 2,
              repeatType: "loop"
            }}
          />
        ))}

        <motion.div
          className="absolute right-[-40px] top-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-sky-600 border-4 border-sky-300 flex items-center justify-center shadow-2xl shadow-sky-500/60"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: 2.4 }}
        >
          {/* Charging indicator */}
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-cyan-200"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: [0.5, 1.2], opacity: [0, 1, 0] }}
            transition={{ delay: 2.6, duration: 0.4, repeat: 2 }}
          />
          <Aperture width={90} height={90} className="text-sky-100 animate-spin-slow" />
        </motion.div>
      </motion.div>

      {/* Sonic Waves with Screen Shake Effect */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={`cy-wide-sonic-${i}`}
          className="absolute top-1/2 left-[calc(5%+17.5%)] -translate-y-1/2 rounded-full border-2 border-sky-200/90"
          initial={{ width: 0, height: 0, opacity: 0 }}
          animate={{ width: `${(i + 1) * 35}vw`, height: `${(i + 1) * 35}vw`, opacity: [0, 0.9, 0] }}
          transition={{ duration: 0.7, delay: 2.7 + i * 0.08, ease: "easeOut" }}
        />
      ))}

      {/* Screen Shake + Glitch (Enhanced) */}
      <motion.div
        className="absolute inset-0 bg-cyan-400/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.3, 0], x: [-2, 2, -1, 1, 0] }}
        transition={{ delay: 2.7, duration: 0.3 }}
      />

      {/* Hexagonal Particle System (Creative) */}
      {Array.from({ length: isMobile ? 15 : 30 }).map((_, i) => {
        const angle = (i / 30) * Math.PI * 2;
        const radius = 200 + Math.random() * 300;
        return (
          <motion.div
            key={`hex-${i}`}
            className="absolute"
            style={{
              left: '50%',
              top: '50%',
              width: 20,
              height: 20,
            }}
            initial={{
              x: Math.cos(angle) * 50,
              y: Math.sin(angle) * 50,
              opacity: 0,
              scale: 0
            }}
            animate={{
              x: Math.cos(angle) * radius,
              y: Math.sin(angle) * radius,
              opacity: [0, 0.8, 0],
              scale: [0, 1, 0],
              rotate: [0, 360]
            }}
            transition={{
              delay: 1.5 + i * 0.05,
              duration: 2,
              ease: "easeOut"
            }}
          >
            <div className="w-full h-full border-2 border-cyan-400" style={{ clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)' }} />
          </motion.div>
        );
      })}

      {/* Phase 4: Victor Stone Reveal with Digital Reconstruction (4.0s - 7.0s) */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 4.0, duration: 1.5 }}
      >
        <div className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px]">
          {/* Energy Pulse Rings emanating from character */}
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={`pulse-${i}`}
              className="absolute inset-0 border-2 border-cyan-400/40 rounded-full"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 2], opacity: [0.6, 0] }}
              transition={{
                delay: 4.5 + i * 0.4,
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: 0.8
              }}
            />
          ))}
          {/* Tech glow behind image */}
          <div className="absolute inset-0 bg-radial-gradient from-cyan-500/30 to-transparent blur-3xl animate-pulse" />

          {/* De-pixelation effect */}
          <motion.div
            className="absolute inset-0"
            initial={{ filter: "blur(20px)" }}
            animate={{ filter: "blur(0px)" }}
            transition={{ delay: 4.2, duration: 1 }}
          >
            <Image
              src="/images/intro/cyborg.png"
              alt="Cyborg"
              fill
              className="object-contain drop-shadow-[0_0_40px_rgba(6,182,212,0.6)]"
              priority
            />
          </motion.div>

          {/* Holographic Scan Lines (Creative addition) */}
          {Array.from({ length: 10 }).map((_, i) => (
            <motion.div
              key={`holo-line-${i}`}
              className="absolute w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
              style={{ top: `${i * 10}%` }}
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: [0, 0.6, 0], scaleX: [0, 1, 0] }}
              transition={{
                delay: 4.3 + i * 0.1,
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3
              }}
            />
          ))}

          {/* Circuit Board Pattern Overlay */}
          <motion.div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(90deg, cyan 1px, transparent 1px),
                linear-gradient(0deg, cyan 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.2, 0.1] }}
            transition={{ delay: 4.5, duration: 1 }}
          />
        </div>
      </motion.div>

      {/* "VICTOR STONE" Text with Typing Effect (Enhanced) */}
      <motion.div
        className="absolute bottom-[10%] w-full text-center z-50"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 4.5, duration: 0.5 }}
      >
        <div className="flex justify-center gap-1">
          {"VICTOR STONE".split("").map((char, i) => (
            <motion.span
              key={i}
              className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-200 inline-block"
              style={{
                fontFamily: "Impact, sans-serif",
                textShadow: "0 0 20px rgba(6,182,212,0.8)"
              }}
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)"
              }}
              transition={{
                delay: 4.7 + i * 0.05,
                duration: 0.3,
                type: "spring",
                stiffness: 200
              }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </div>

        {/* Glitch overlay on text */}
        <motion.div
          className="absolute inset-0 text-4xl md:text-6xl font-black text-red-500 mix-blend-screen"
          style={{
            fontFamily: "Impact, sans-serif",
            letterSpacing: "0.2em"
          }}
          initial={{ opacity: 0, x: 0 }}
          animate={{
            opacity: [0, 0.5, 0],
            x: [-2, 2, -2, 0]
          }}
          transition={{
            delay: 5.5,
            duration: 0.2,
            repeat: 2,
            repeatDelay: 0.5
          }}
        >
          VICTOR STONE
        </motion.div>

        <motion.p
          className="text-cyan-400 tracking-[0.3em] text-xs mt-2 uppercase font-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.70 }}
          transition={{ delay: 5.8, duration: 0.5 }}
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.7] }}
            transition={{ delay: 5.8, duration: 1 }}
          >
            SYSTEM: FULLY OPERATIONAL
          </motion.span>
        </motion.p>
      </motion.div>

      {/* Matrix-Style Code Rain (Creative addition) */}
      {Array.from({ length: isMobile ? 8 : 15 }).map((_, i) => (
        <motion.div
          key={`code-rain-${i}`}
          className="absolute top-0 text-cyan-300 font-mono text-xs opacity-40"
          style={{ left: `${(i / 15) * 100}%` }}
          initial={{ y: -100 }}
          animate={{ y: h + 100 }}
          transition={{
            duration: 3 + Math.random() * 2,
            delay: 1 + Math.random() * 2,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {Array.from({ length: 20 }).map((_, j) => (
            <div key={j}>{Math.random() > 0.5 ? '1' : '0'}</div>
          ))}
        </motion.div>
      ))}

      {/* Floating Data Visualizations (Creative addition) */}
      {Array.from({ length: 4 }).map((_, i) => (
        <motion.div
          key={`data-viz-${i}`}
          className="absolute border-2 border-cyan-400/40 rounded p-2"
          style={{
            top: `${20 + i * 20}%`,
            right: isMobile ? '2%' : '5%',
            width: isMobile ? '80px' : '120px',
            height: isMobile ? '40px' : '60px'
          }}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2 + i * 0.3, duration: 0.5 }}
        >
          <div className="text-cyan-400 text-[8px] font-mono mb-1">
            {['CORE TEMP', 'POWER LVL', 'SYNC RATE', 'CPU LOAD'][i]}
          </div>
          <motion.div
            className="h-4 bg-cyan-400/30 rounded-sm"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: [0, 0.7 + Math.random() * 0.3] }}
            transition={{ delay: 2.2 + i * 0.3, duration: 0.8 }}
            style={{ transformOrigin: 'left' }}
          />
          <div className="text-cyan-300 text-[10px] font-bold mt-1">
            {[98, 100, 87, 56][i]}%
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}
