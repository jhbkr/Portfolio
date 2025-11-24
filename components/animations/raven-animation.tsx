"use client"

import { motion } from "framer-motion"
import { useEffect, useState, useMemo } from "react"
import Image from "next/image"
import { AnimationProps } from "./types"

/**
 * RavenAnimation - TRUE KUROGIRI STYLE (FINAL POLISH - TRIGON FORM)
 * Style: Black Mist Ring, Trigon Eyes (4), Void, Cinematic
 */

// Générateur aléatoire stable
const seededRandom = (seed: number) => {
  return () => {
    seed = (seed * 9301 + 49297) % 233280
    return seed / 233280
  }
}

export const RavenAnimation = ({ w, h, animationKey }: AnimationProps) => {
  const [phase, setPhase] = useState(0)
  const rng = useMemo(() => seededRandom(
    typeof animationKey === "number" ? animationKey :
      String(animationKey).split("").reduce((acc, c) => acc + c.charCodeAt(0), 0)
  ), [animationKey])

  // Séquenceur (Total: ~9s)
  useEffect(() => {
    let mounted = true
    const sequence = async () => {
      if (!mounted) return
      setPhase(1) // Fracture / Darkness (0s)
      await new Promise(r => setTimeout(r, 1000))
      if (!mounted) return
      setPhase(2) // Mantra Echo (1s)
      await new Promise(r => setTimeout(r, 2500))
      if (!mounted) return
      setPhase(3) // Kurogiri Vortex (3.5s)
      await new Promise(r => setTimeout(r, 2500)) // Extended Vortex
      if (!mounted) return
      setPhase(4) // Reveal (6s -> 9s)
    }
    sequence()
    return () => { mounted = false }
  }, [animationKey])

  // --- GÉNÉRATION DES PARTICULES & ÉLÉMENTS ---

  // Responsive particle counts
  const isMobile = typeof window !== 'undefined' && w < 768

  // Particules de "Void Dust" (poussière du vide)
  const voidDust = useMemo(() =>
    Array.from({ length: isMobile ? 20 : 40 }).map((_, i) => ({
      id: i,
      x: rng() * 100,
      y: rng() * 100,
      size: rng() * 2 + 1,
      duration: rng() * 4 + 3,
      delay: rng() * 2
    })),
    [rng]
  )

  // Couches de Brume (Mist Rings) - Donut Shape
  const mistRings = useMemo(() => [
    { size: 700, duration: 20, delay: 0, color: "#000000", direction: 1 },
    { size: 600, duration: 15, delay: 1, color: "#4C1D95", direction: -1 }, // Boosted Violet (Vibrant)
    { size: 550, duration: 12, delay: 0.5, color: "#000000", direction: 1 },
  ], [])

  return (
    <motion.div
      key={`raven-${animationKey}`}
      className="fixed inset-0 z-[9000] pointer-events-none overflow-hidden bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* --- FILTRES SVG AVANCÉS (TRUE KUROGIRI) --- */}
      <svg width="0" height="0" className="absolute">
        <defs>
          {/* Brume Noire (Alpha Turbulence) */}
          <filter id="kurogiri-mist">
            {/* Bruit Fractal */}
            <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="4" result="noise" />
            {/* Displacement Map pour tordre la forme */}
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="40" xChannelSelector="R" yChannelSelector="G" />
            {/* Flou pour adoucir */}
            <feGaussianBlur stdDeviation="8" />
          </filter>

          {/* Distorsion de Fond (Warp) */}
          <filter id="warp-gate">
            <feTurbulence type="turbulence" baseFrequency="0.05" numOctaves="2" result="turbulence" />
            <feDisplacementMap in2="turbulence" in="SourceGraphic" scale="20" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      {/* --- FOND ATMOSPHÉRIQUE (Void) --- */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-radial from-[#2E1065] via-black to-black opacity-90" />
      </div>

      {/* Poussière du Vide */}
      {voidDust.map((p) => (
        <motion.div
          key={`dust-${p.id}`}
          className="absolute rounded-full bg-[#6D28D9]"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            filter: "blur(1px)",
            opacity: 0.3
          }}
          animate={{
            y: [0, -40, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* --- PHASE 1: DARKNESS FALLS (0s - 1s) --- */}
      {phase >= 1 && (
        <motion.div
          className="absolute inset-0 bg-black z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      )}

      {/* --- PHASE 2: MANTRA ECHO (1s - 3.5s) --- */}
      {phase >= 2 && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none mix-blend-screen">
          {/* AZARATH */}
          <motion.h1
            className="text-4xl md:text-8xl font-black tracking-[0.2em] text-[#2E1065] opacity-0"
            style={{ fontFamily: "Impact, sans-serif", filter: "blur(2px)" }}
            animate={{ opacity: [0, 0.5, 0], scale: [1.1, 1], filter: ["blur(8px)", "blur(2px)", "blur(8px)"] }}
            transition={{ duration: 2, times: [0, 0.2, 1] }}
          >
            AZARATH
          </motion.h1>

          {/* METRION */}
          <motion.h1
            className="text-4xl md:text-8xl font-black tracking-[0.2em] text-[#4C1D95] opacity-0 absolute"
            style={{ fontFamily: "Impact, sans-serif", filter: "blur(2px)" }}
            animate={{ opacity: [0, 0.6, 0], scale: [1.1, 1], filter: ["blur(8px)", "blur(2px)", "blur(8px)"] }}
            transition={{ delay: 0.8, duration: 2, times: [0, 0.2, 1] }}
          >
            METRION
          </motion.h1>

          {/* ZINTHOS (Impact) */}
          <motion.h1
            className="text-6xl md:text-[10rem] font-black tracking-tighter text-white absolute z-30"
            style={{
              fontFamily: "Impact, sans-serif",
              textShadow: "0 0 20px #4C1D95",
              filter: "url(#warp-gate)"
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: [0.8, 1.2, 3], opacity: [0, 1, 0] }}
            transition={{ delay: 1.6, duration: 1.2, ease: "circIn" }}
          >
            ZINTHOS
          </motion.h1>
        </div>
      )}

      {/* --- PHASE 3: KUROGIRI VORTEX (3.5s - 6s) --- */}
      {phase >= 3 && (
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-full h-full flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* The Black Mist Portal */}
          <div className="relative w-[800px] h-[800px] flex items-center justify-center">
            {/* Background Warp Distortion */}
            <motion.div
              className="absolute inset-0 bg-black rounded-full opacity-60"
              style={{ filter: "url(#warp-gate)" }}
              animate={{ scale: [0, 1.5] }}
              transition={{ duration: 2, ease: "easeOut" }}
            />

            {/* Mist Rings (Black Smoke Rings) */}
            {mistRings.map((ring, i) => (
              <motion.div
                key={`mist-ring-${i}`}
                className="absolute rounded-full"
                style={{
                  width: ring.size,
                  height: ring.size,
                  background: `radial-gradient(circle, transparent 35%, ${ring.color} 55%, transparent 75%)`, // Donut shape
                  filter: "url(#kurogiri-mist)",
                  opacity: 0.9
                }}
                animate={{
                  rotate: [0, 360 * ring.direction],
                  scale: [0.9, 1.1, 0.9],
                }}
                transition={{
                  rotate: { duration: ring.duration, repeat: Infinity, ease: "linear" },
                  scale: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: ring.delay }
                }}
              />
            ))}

            {/* Center Void (The Eye of the Storm) - The Anchor */}
            <motion.div
              className="absolute w-32 h-32 bg-black rounded-full shadow-[0_0_80px_#2E1065] z-10"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1] }}
              transition={{ duration: 0.5 }}
            />

            {/* TRIGON EYES (4 Eyes - Inside the Vortex) */}
            <div className="absolute w-24 h-20 flex flex-col justify-center items-center gap-2 z-20">
              {/* Upper Pair (Smaller, Angled Down) */}
              <div className="flex justify-between w-full px-2">
                <motion.div
                  className="w-8 h-2 bg-[#EF4444] rounded-[100%]"
                  style={{
                    boxShadow: "0 0 10px #EF4444",
                    clipPath: "polygon(0 0, 100% 0, 50% 100%)", // Triangle down
                    rotate: 15
                  }}
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={{ scaleY: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
                  transition={{ delay: 0.5, duration: 2, times: [0, 0.2, 0.8, 1] }}
                />
                <motion.div
                  className="w-8 h-2 bg-[#EF4444] rounded-[100%]"
                  style={{
                    boxShadow: "0 0 10px #EF4444",
                    clipPath: "polygon(0 0, 100% 0, 50% 100%)", // Triangle down
                    rotate: -15
                  }}
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={{ scaleY: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
                  transition={{ delay: 0.5, duration: 2, times: [0, 0.2, 0.8, 1] }}
                />
              </div>

              {/* Lower Pair (Larger, Angled Up) */}
              <div className="flex justify-between w-full">
                <motion.div
                  className="w-10 h-3 bg-[#EF4444] rounded-[100%]"
                  style={{
                    boxShadow: "0 0 15px #EF4444",
                    clipPath: "polygon(0 100%, 100% 100%, 50% 0%)", // Triangle up
                    rotate: -10
                  }}
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={{ scaleY: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
                  transition={{ delay: 0.5, duration: 2, times: [0, 0.2, 0.8, 1] }}
                />
                <motion.div
                  className="w-10 h-3 bg-[#EF4444] rounded-[100%]"
                  style={{
                    boxShadow: "0 0 15px #EF4444",
                    clipPath: "polygon(0 100%, 100% 100%, 50% 0%)", // Triangle up
                    rotate: 10
                  }}
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={{ scaleY: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
                  transition={{ delay: 0.5, duration: 2, times: [0, 0.2, 0.8, 1] }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* --- PHASE 4: REVEAL (6s+) --- */}
      {phase >= 4 && (
        <>
          {/* Raven Emerging from the Mist */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40"
            initial={{ opacity: 0, scale: 0.5, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 2, ease: "easeOut" }}
          >
            <div className="relative w-[300px] h-[300px] md:w-[600px] md:h-[600px]">
              {/* Dark Aura behind Raven */}
              <div className="absolute inset-0 bg-radial-gradient from-[#2E1065] to-transparent blur-3xl opacity-80 animate-pulse" />

              <Image
                src="/images/intro/raven.png"
                alt="Raven"
                fill
                className="object-contain drop-shadow-[0_0_60px_rgba(46,16,101,0.9)]"
                priority
              />

              {/* Glowing Eyes (White/Purple) */}
              <motion.div
                className="absolute top-[32%] left-1/2 -translate-x-1/2 w-16 h-4 flex justify-center gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
              >
                <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_15px_#fff]" />
                <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_15px_#fff]" />
              </motion.div>
            </div>
          </motion.div>

          {/* Final Title */}
          <motion.div
            className="absolute bottom-[10%] w-full text-center z-50"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 1.5 }}
          >
            <h1 className="text-5xl md:text-7xl font-black tracking-[0.1em] text-transparent bg-clip-text bg-gradient-to-b from-white to-[#4C1D95]"
              style={{
                fontFamily: "Cinzel, serif",
                textShadow: "0 10px 40px rgba(0,0,0,0.9)"
              }}
            >
              RACHEL ROTH
            </h1>
            <p className="text-[#8B5CF6] tracking-[0.3em] md:tracking-[0.5em] text-xs md:text-sm mt-2 uppercase opacity-60">Daughter of Darkness</p>
          </motion.div>
        </>
      )}
    </motion.div>
  )
}
