"use client"

import { useTheme } from "@/components/theme-provider"
import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "framer-motion"
import {
  Zap,
  Flame,
  Target,
  Bomb,
  Aperture,
  PawPrint,
  Bird,
  Fish,
  Cat,
  Sparkles,
  Wind,
  Triangle,
  Square,
  Circle,
  Feather,
  Moon,
  Leaf,
} from "lucide-react"
import Image from "next/image"

const ANIMATION_DURATION = 2500 // 2.5 secondes

const getRandomPosition = (containerWidth: number, containerHeight: number, margin = 0) => ({
  x: Math.random() * (containerWidth - margin * 2) + margin - containerWidth / 2,
  y: Math.random() * (containerHeight - margin * 2) + margin - containerHeight / 2,
})

const imagesToPreload = [
  "/images/intro/gotham-skyline.png",
  "/images/intro/robin-acrobatic-pose.png",
  "/images/intro/starfire.png",
  "/images/intro/raven.png",
  "/images/intro/deathstroke.png",
]

// Beast Boy animal sequence
const beastBoyAnimals = [
  { id: "monkey", icon: PawPrint, color: "#A0522D", emoji: "🐒", duration: 800 },
  { id: "bird", icon: Bird, color: "#1E90FF", emoji: "🦅", duration: 700 },
  { id: "fish", icon: Fish, color: "#00CED1", emoji: "🐠", duration: 600 },
  { id: "cat", icon: Cat, color: "#FFA500", emoji: "🐅", duration: 700 },
  { id: "t-rex", icon: PawPrint, color: "#228B22", emoji: "🦖", duration: 900 }, // PawPrint as placeholder for T-Rex
]

export default function ThemeChangeAnimator() {
  const { theme } = useTheme()
  const [activeAnimation, setActiveAnimation] = useState<string | null>(null)
  const [animationKey, setAnimationKey] = useState(0)
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
  const [currentBeastBoyAnimalIndex, setCurrentBeastBoyAnimalIndex] = useState(0)
  const [lastPath, setLastPath] = useState<string | null>(null)


  // --- Hooks pour Beast Boy (toujours au même niveau) ---
  const [bbPhase, setBBPhase] = useState(0)
  const [bbAdnStep, setBBAdnStep] = useState(0)
  useEffect(() => {
    if (activeAnimation === "beastboy") {
      setBBPhase(0)
      setBBAdnStep(0)
      const t1 = setTimeout(() => setBBPhase(1), 1000)
      const t2 = setTimeout(() => setBBPhase(2), 1800)
      const t3 = setTimeout(() => setBBPhase(3), 2500)
      return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); }
    }
  }, [animationKey, activeAnimation])
  useEffect(() => {
    if (activeAnimation === "beastboy" && bbPhase === 0) {
      const helixLength = 4 * 32
      const interval = setInterval(() => setBBAdnStep((s) => (s + 1) % helixLength), 60)
      return () => clearInterval(interval)
    }
  }, [bbPhase, activeAnimation])

  useEffect(() => {
    imagesToPreload.forEach((src) => {
      const img = new window.Image()
      img.src = src
      img.crossOrigin = "anonymous" // For canvas if needed later
    })

    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }

    // Fonction pour réinitialiser les animations (touche 'R')
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'r' || e.key === 'R') {
        // Réinitialiser les animations et le chemin
        setActiveAnimation(null)
        setAnimationKey(0)
        setLastPath(null)
      }
    }

    window.addEventListener("resize", handleResize)
    window.addEventListener("keydown", handleKeyPress)
    handleResize()

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("keydown", handleKeyPress)
    }
  }, [])

  useEffect(() => {
    if (!theme || theme === "light" || theme === "dark" || theme === "system") {
      setActiveAnimation(null)
      return
    }

    const currentPath = typeof window !== 'undefined' ? window.location.pathname : null

    // Si on est sur la page freelance, ne pas déclencher d'animation
    if (currentPath === '/freelance') {
      setLastPath(currentPath)
      return
    }

    // Si on vient de freelance vers portfolio, déclencher l'animation
    const isComingFromFreelance = lastPath === '/freelance' && currentPath === '/'

    // Sur le portfolio, déclencher l'animation normalement (sauf si on vient de freelance)
    if (currentPath === '/' && !isComingFromFreelance) {
      setAnimationKey((prevKey) => prevKey + 1)
      setActiveAnimation(theme)

      if (theme === "beastboy") {
        setCurrentBeastBoyAnimalIndex(0) // Reset for Beast Boy
      }

      const timer = setTimeout(() => {
        setActiveAnimation(null)
      }, ANIMATION_DURATION)

      return () => {
        clearTimeout(timer)
      }
    }

    // Si on vient de freelance vers portfolio, déclencher l'animation
    if (isComingFromFreelance) {
      setAnimationKey((prevKey) => prevKey + 1)
      setActiveAnimation(theme)

      if (theme === "beastboy") {
        setCurrentBeastBoyAnimalIndex(0) // Reset for Beast Boy
      }

      const timer = setTimeout(() => {
        setActiveAnimation(null)
      }, ANIMATION_DURATION)

      return () => {
        clearTimeout(timer)
      }
    }

    setLastPath(currentPath)
  }, [theme, lastPath])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.1 } },
    exit: { opacity: 0, transition: { duration: 0.3, delay: (ANIMATION_DURATION - 300) / 1000 } },
  }

  const renderAnimation = () => {
    if (!activeAnimation || windowSize.width === 0) return null
    const { width: w, height: h } = windowSize

    switch (activeAnimation) {
      case "robin":
        // PHASE 1: THE EYES (REFINED SVG) (0s - 1.0s)
        // PHASE 2: THE FLASH STEP (GOD SPEED) (1.0s - 2.2s)
        // PHASE 3: THE TAKEDOWN (SHATTER) (2.2s - 2.8s)
        // PHASE 4: THE VIGILANTE REVEAL (2.8s - 4.0s)

        return (
          <motion.div
            key={`robin-${animationKey}`}
            className="fixed inset-0 z-[9000] pointer-events-none overflow-hidden bg-black"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* --- PHASE 1: THE EYES (REFINED SVG) --- */}

            {/* Diagonal Slice Background */}
            <motion.div
              className="absolute inset-0 bg-[#050505]"
              style={{
                clipPath: "polygon(0 0, 100% 0, 100% 30%, 0 70%)",
                zIndex: 10
              }}
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 0.3, ease: "circOut" }}
            >
              {/* Heavy Rain in the slice (Parallax Layer 1) */}
              {Array.from({ length: 60 }).map((_, i) => (
                <motion.div
                  key={`noir-rain-${i}`}
                  className="absolute bg-white/30"
                  style={{
                    width: "1px",
                    height: `${30 + Math.random() * 50}px`,
                    left: `${Math.random() * 100}vw`,
                    top: `${Math.random() * 100}vh`,
                    transform: "rotate(20deg)"
                  }}
                  animate={{ y: [0, h] }}
                  transition={{
                    duration: 0.2 + Math.random() * 0.1,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              ))}
            </motion.div>

            {/* SVG Mask Eyes */}
            <motion.div
              className="absolute top-[25%] left-[35%]"
              style={{ zIndex: 11, transform: "translate(-50%, -50%) rotate(-10deg)" }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: [0, 1, 0], scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3, times: [0, 0.2, 1] }}
            >
              <svg width="200" height="100" viewBox="0 0 200 100">
                <defs>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                {/* Left Eye */}
                <motion.path
                  d="M 10 40 L 80 50 L 20 70 Z"
                  fill="white"
                  filter="url(#glow)"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.1, delay: 0.3 }}
                />
                {/* Right Eye */}
                <motion.path
                  d="M 190 40 L 120 50 L 180 70 Z"
                  fill="white"
                  filter="url(#glow)"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.1, delay: 0.3 }}
                />
              </svg>
            </motion.div>

            {/* --- PHASE 2: THE FLASH STEP (GOD SPEED) --- */}

            {/* Lightning Bolt SVG */}
            <motion.svg
              className="absolute inset-0 w-full h-full"
              style={{ zIndex: 19 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0, 1, 0] }}
              transition={{ duration: 0.4, delay: 1.2, times: [0, 0.1, 0.3, 0.4, 1] }}
            >
              <motion.path
                d={`M ${w * 0.4} 0 L ${w * 0.5} ${h * 0.3} L ${w * 0.45} ${h * 0.5} L ${w * 0.6} ${h * 0.8} L ${w * 0.5} ${h}`}
                stroke="white"
                strokeWidth="4"
                fill="none"
                filter="url(#glow)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.2, delay: 1.2 }}
              />
            </motion.svg>

            {/* Flash Step Trails (Afterimages) */}
            {[
              { delay: 1.2, x: "20%", y: "30%", scale: 0.8, rotate: 10 },
              { delay: 1.5, x: "80%", y: "20%", scale: 0.6, rotate: -5 },
              { delay: 1.8, x: "50%", y: "60%", scale: 1.0, rotate: 0 }
            ].map((flash, i) => (
              <motion.div
                key={`hunt-flash-${i}`}
                className="absolute inset-0"
                style={{ zIndex: 20 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.25, delay: flash.delay }}
              >
                {/* Flash Background */}
                <div className="absolute inset-0 bg-[#1a1c29]" />

                {/* Ghost Trails */}
                {[1, 2, 3].map((ghost) => (
                  <div
                    key={`ghost-${i}-${ghost}`}
                    className="absolute w-[400px] h-[400px]"
                    style={{
                      left: flash.x,
                      top: flash.y,
                      transform: `translate(-50%, -50%) scale(${flash.scale}) rotate(${flash.rotate}deg) translate(${ghost * 20}px, ${ghost * 10}px)`,
                      opacity: 0.3 / ghost,
                      filter: "blur(4px)"
                    }}
                  >
                    <Image
                      src="/images/intro/robin-acrobatic-pose.png"
                      alt="Shadow"
                      fill
                      className="object-contain brightness-0 invert"
                    />
                  </div>
                ))}

                {/* Main Silhouette */}
                <div
                  className="absolute w-[400px] h-[400px]"
                  style={{
                    left: flash.x,
                    top: flash.y,
                    transform: `translate(-50%, -50%) scale(${flash.scale}) rotate(${flash.rotate}deg)`
                  }}
                >
                  <Image
                    src="/images/intro/robin-acrobatic-pose.png"
                    alt="Shadow"
                    fill
                    className="object-contain brightness-0"
                  />
                </div>
              </motion.div>
            ))}

            {/* --- PHASE 3: THE TAKEDOWN (SHATTER) --- */}

            {/* Realistic Glass Shatter SVG */}
            <motion.div
              className="absolute inset-0"
              style={{ zIndex: 30 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.4, delay: 2.2 }}
            >
              {/* Chromatic Aberration Layers */}
              {["red", "blue", "green"].map((color, i) => (
                <motion.svg
                  key={`shatter-${color}`}
                  className="absolute inset-0 w-full h-full"
                  style={{
                    mixBlendMode: "screen",
                    x: i * 5 - 10,
                    y: i * 5 - 10
                  }}
                >
                  <path d={`M 0 0 L ${w} ${h}`} stroke={color} strokeWidth="2" />
                  <path d={`M ${w} 0 L 0 ${h}`} stroke={color} strokeWidth="2" />
                  <path d={`M ${w / 2} 0 L ${w / 2} ${h}`} stroke={color} strokeWidth="2" />
                  <path d={`M 0 ${h / 2} L ${w} ${h / 2}`} stroke={color} strokeWidth="2" />
                  {/* Spiderweb center */}
                  <circle cx={w / 2} cy={h / 2} r="50" fill="none" stroke={color} strokeWidth="2" />
                  <circle cx={w / 2} cy={h / 2} r="100" fill="none" stroke={color} strokeWidth="2" />
                  <circle cx={w / 2} cy={h / 2} r="150" fill="none" stroke={color} strokeWidth="2" />
                </motion.svg>
              ))}
              <div className="absolute inset-0 bg-white/80 mix-blend-overlay" />
            </motion.div>

            {/* --- PHASE 4: THE VIGILANTE REVEAL --- */}

            {/* Spotlight Beam */}
            <motion.div
              className="absolute top-0 left-1/2 w-[300px] h-[150vh] bg-gradient-to-b from-white/20 via-white/5 to-transparent blur-2xl"
              style={{
                zIndex: 35,
                transform: "translateX(-50%) rotate(-15deg)",
                transformOrigin: "top center"
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.8] }}
              transition={{ duration: 0.5, delay: 2.8 }}
            />

            {/* Parallax Rain (3 Layers) */}
            {[
              { count: 40, speed: 0.5, size: 20, z: 36, opacity: 0.2 }, // Back
              { count: 60, speed: 0.3, size: 40, z: 37, opacity: 0.4 }, // Mid
              { count: 30, speed: 0.1, size: 60, z: 42, opacity: 0.6 }  // Fore (in front of Robin)
            ].map((layer, idx) => (
              <motion.div
                key={`rain-layer-${idx}`}
                className="absolute inset-0"
                style={{ zIndex: layer.z }}
                initial={{ opacity: 0 }}
                animate={{ opacity: layer.opacity }}
                transition={{ delay: 2.8 }}
              >
                {Array.from({ length: layer.count }).map((_, i) => (
                  <motion.div
                    key={`rain-${idx}-${i}`}
                    className="absolute bg-white"
                    style={{
                      width: "2px",
                      height: `${layer.size + Math.random() * 20}px`,
                      left: `${Math.random() * 100}vw`,
                      top: `${Math.random() * 100}vh`,
                      transform: "rotate(15deg)"
                    }}
                    animate={{ y: [0, h] }}
                    transition={{
                      duration: layer.speed + Math.random() * 0.1,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                ))}
              </motion.div>
            ))}

            {/* Robin Reveal */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ zIndex: 40 }}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, delay: 2.8, ease: "easeOut" }}
            >
              <div className="relative w-[400px] h-[400px]">
                <Image
                  src="/images/intro/robin.png"
                  alt="Robin Teen Titans"
                  fill
                  className="object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
                  priority
                />
                {/* Dark Overlay on Robin for mood */}
                <div className="absolute inset-0 bg-black/20 mix-blend-multiply rounded-full" />
              </div>
            </motion.div>

            {/* Floating Debris/Particles */}
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={`debris-${i}`}
                className="absolute bg-gray-400 rounded-full"
                style={{
                  width: Math.random() * 4 + "px",
                  height: Math.random() * 4 + "px",
                  zIndex: 41,
                  left: "50%",
                  top: "50%"
                }}
                initial={{ x: 0, y: 0, opacity: 0 }}
                animate={{
                  x: (Math.random() - 0.5) * 300,
                  y: (Math.random() - 0.5) * 300,
                  opacity: [0, 1, 0]
                }}
                transition={{ duration: 2, delay: 2.8, ease: "easeOut" }}
              />
            ))}

          </motion.div>
        )
      case "starfire":
        // PHASE 1: THE SILHOUETTE (ENHANCED) (0s - 1.2s)
        // PHASE 2: COMBAT FLASHES (FREEZE FRAMES) (1.2s - 2.8s)
        // PHASE 3: THE STARBOLT BLAST (VORTEX) (2.8s - 3.4s)
        // PHASE 4: THE METEOR LANDING (CINEMATIC) (3.4s - 6.0s)

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
      case "beastboy": {
        // --- ADN + Métamorphose immersive ---
        // Paramètres ADN
        const helixTurns = 4;
        const helixPoints = 32;
        const helixLength = helixTurns * helixPoints;
        const helixRadius = w * 0.11;
        const helixHeight = h * 0.45;
        const basePairs = ["A", "T", "C", "G"];
        const animalEmojis = ["🐒", "🦅", "🐠", "🐅", "🦖"];
        // Utiliser les hooks globaux
        const phase = bbPhase;
        const adnStep = bbAdnStep;
        // Génération des points de l'hélice
        // Effet hélice qui s'enroule sur elle-même : rayon diminue, angle spiralé
        const spiralTightness = 2 + Math.sin(Date.now() / 700) * 0.7; // Animation douce
        const helix = Array.from({ length: helixLength }).map((_, i) => {
          const progress = i / helixLength;
          // Rayon qui diminue (de helixRadius à 0.3*helixRadius)
          const dynamicRadius = helixRadius * (1 - 0.7 * progress);
          // Angle spiralé pour effet d'enroulement
          const t = Math.PI * 2 * helixTurns * progress + Math.PI * 2 * progress * spiralTightness;
          const x = w / 2 + Math.sin(t) * dynamicRadius;
          const y = h / 2 + (progress - 0.5) * helixHeight;
          const z = Math.cos(t) * dynamicRadius;
          return { x, y, z, t, i };
        });
        // Bases animées
        const bases = helix.map((pt, i) => {
          // Phase 0: bases classiques, Phase 1: morph vers animal
          let char = basePairs[(i + adnStep) % 4];
          let color = ["#A3E635", "#4ADE80", "#FACC15", "#34D399"][i % 4];
          let fontSize = w * 0.018;
          let opacity = 0.7;
          if (phase >= 1 && i % Math.floor(helixLength / animalEmojis.length) === 0) {
            char = animalEmojis[Math.floor(i / Math.floor(helixLength / animalEmojis.length))];
            color = "#22c55e";
            fontSize = w * 0.032;
            opacity = 1;
          }
          return { ...pt, char, color, fontSize, opacity };
        });
        // Animal central
        const animalIdx = Math.floor((adnStep / helixLength) * animalEmojis.length) % animalEmojis.length;
        const centralAnimal = animalEmojis[animalIdx];
        return (
          <motion.div
            key={`beastboy-${animationKey}`}
            className="fixed inset-0 z-[9000] pointer-events-none overflow-hidden bg-gradient-to-br from-green-900 via-lime-900 to-emerald-900"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Brume mouvante jungle */}
            {Array.from({ length: 3 }).map((_, i) => (
              <motion.div
                key={`bb-fog-${i}`}
                className="absolute rounded-full"
                style={{
                  width: `${w * (0.7 + i * 0.2)}px`,
                  height: `${h * (0.18 + i * 0.09)}px`,
                  left: `${10 + i * 30}%`,
                  top: `${18 + i * 18}%`,
                  background: `radial-gradient(circle, #a3e63533 60%, #22c55e22 100%)`,
                  opacity: 0.18 + i * 0.09,
                  filter: `blur(${32 + i * 10}px)`,
                  zIndex: 2,
                }}
                initial={{ x: -w * 0.1 * (i % 2 === 0 ? 1 : -1) }}
                animate={{ x: w * 0.1 * (i % 2 === 0 ? 1 : -1) }}
                transition={{ duration: 18 + i * 2, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
              />
            ))}
            {/* Hélice d'ADN animée - version améliorée */}
            <motion.svg
              width={w}
              height={h}
              className="absolute inset-0"
              style={{ zIndex: 10, pointerEvents: "none" }}
              initial={{ opacity: 0, scale: 0.7, rotateY: 0 }}
              animate={{ opacity: 1, scale: 1, rotateY: 360 }}
              transition={{ duration: 6, ease: "linear", repeat: Infinity }}
            >
              {/* Brin principal uniquement */}
              <polyline
                points={helix.map((p) => `${p.x},${p.y}`).join(" ")}
                fill="none"
                stroke="#22c55e"
                strokeWidth={6}
                opacity="0.22"
                filter="url(#bb-glow)"
              />
              {/* Bases réduites - seulement 1 sur 4 pour moins de bruit */}
              {bases.filter((_, i) => i % 4 === 0).map((b, i) => (
                <motion.text
                  key={`bb-base-${i}`}
                  x={b.x}
                  y={b.y}
                  textAnchor="middle"
                  fontSize={b.fontSize}
                  fill={b.color}
                  opacity={b.opacity}
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: b.opacity, scale: [0.7, 1.1, 1] }}
                  transition={{ duration: 1.2, delay: 0.1 + (i % 4) * 0.12, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
                  style={{ fontFamily: "monospace", letterSpacing: "0.1em", filter: "drop-shadow(0 0 8px #bef264)" }}
                >
                  {b.char}
                </motion.text>
              ))}
              <defs>
                <filter id="bb-glow">
                  <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
            </motion.svg>

            {/* Effets Beast Boy - Particules de nature */}
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={`bb-nature-particle-${i}`}
                className="absolute"
                style={{
                  left: `${20 + i * 10}%`,
                  top: `${30 + i * 8}%`,
                  fontSize: w * 0.025,
                  zIndex: 15,
                  filter: "drop-shadow(0 0 8px #bef264)",
                }}
                initial={{ opacity: 0, scale: 0.5, y: 0 }}
                animate={{
                  opacity: [0, 1, 0.7, 0],
                  scale: [0.5, 1.2, 0.8, 0.5],
                  y: [0, -40, -20, 0],
                  x: [0, Math.sin(i) * 20, 0]
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  delay: i * 0.3,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut"
                }}
              >
                {["🍃", "🌿", "🌱", "🌺", "🌻", "🌼", "🌷", "🌸"][i % 8]}
              </motion.div>
            ))}

            {/* Effets de transformation - Silhouettes d'animaux flottantes */}
            {phase >= 1 && Array.from({ length: 3 }).map((_, i) => (
              <motion.div
                key={`bb-transform-silhouette-${i}`}
                className="absolute"
                style={{
                  left: `${15 + i * 25}%`,
                  top: `${20 + i * 15}%`,
                  fontSize: w * 0.08,
                  zIndex: 20,
                  filter: "drop-shadow(0 0 15px #22c55e) blur(1px)",
                  opacity: 0.4,
                }}
                initial={{ opacity: 0, scale: 0.3, rotate: 0 }}
                animate={{
                  opacity: [0, 0.4, 0.2, 0],
                  scale: [0.3, 1.1, 0.8, 0.3],
                  rotate: [0, 15, -15, 0]
                }}
                transition={{
                  duration: 2.5,
                  delay: i * 0.8,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut"
                }}
              >
                {["🐒", "🦅", "🐅"][i]}
              </motion.div>
            ))}

            {/* Ondes de transformation - Effet de métamorphose */}
            {phase >= 1 && Array.from({ length: 4 }).map((_, i) => (
              <motion.div
                key={`bb-transform-wave-${i}`}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-green-400"
                style={{ zIndex: 25 }}
                initial={{ width: 0, height: 0, opacity: 0 }}
                animate={{
                  width: `${200 + i * 80}px`,
                  height: `${200 + i * 80}px`,
                  opacity: [0, 0.3, 0]
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.3,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeOut"
                }}
              />
            ))}

            {/* Animaux qui s'échappent de l'ADN - SUPPRIMÉ pour plus de clarté */}
            {/* Animal central morphing - version épurée */}
            {phase >= 1 && (
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{ zIndex: 40, fontSize: w * 0.13, filter: "drop-shadow(0 0 32px #bef264)" }}
                initial={{ opacity: 0, scale: 0.7, filter: "blur(18px)" }}
                animate={{ opacity: [0, 1, 1], scale: [0.7, 1.1, 1], filter: ["blur(18px)", "blur(0px)", "blur(0px)"] }}
                transition={{ duration: 1.1, delay: 0.2, times: [0, 0.5, 1], ease: "easeOut" }}
              >
                {centralAnimal}
              </motion.div>
            )}
            {/* Explosion de vie */}
            {phase === 2 && (
              <>
                <motion.div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{ zIndex: 50 }}
                  initial={{ opacity: 0, scale: 0.2 }}
                  animate={{ opacity: [0, 0.7, 0.3, 0], scale: [0.2, 1.5, 2.2, 2.8], filter: ["blur(0px)", "blur(8px)", "blur(16px)", "blur(24px)"] }}
                  transition={{ duration: 0.8, times: [0, 0.2, 0.7, 1], ease: "easeOut" }}
                >
                  <div
                    style={{
                      width: "420px",
                      height: "420px",
                      borderRadius: "50%",
                      background:
                        "radial-gradient(circle, #a3e635 10%, #bef264 28%, #4ade80 48%, #22c55e 68%, rgba(34,197,94,0.7) 82%, transparent 95%)",
                      filter: "blur(18px) contrast(1.6)",
                      boxShadow: "0 0 120px 60px #bef264, 0 0 180px 90px #a3e635",
                    }}
                  />
                  {/* Particules d'éclat */}
                  {Array.from({ length: 18 }).map((_, i) => (
                    <motion.div
                      key={`bb-explosion-particle-${i}`}
                      className="absolute"
                      style={{
                        left: "50%",
                        top: "50%",
                        width: "18px",
                        height: "18px",
                        borderRadius: "50%",
                        background: i % 2 === 0 ? "#bef264" : "#a3e635",
                        filter: "blur(2px)",
                        zIndex: 51,
                      }}
                      initial={{ x: 0, y: 0, scale: 0.5, opacity: 1 }}
                      animate={{
                        x: Math.cos((i / 18) * 2 * Math.PI) * 180,
                        y: Math.sin((i / 18) * 2 * Math.PI) * 180,
                        scale: [0.5, 1.2, 0.2],
                        opacity: [1, 1, 0],
                      }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                  ))}
                </motion.div>
              </>
            )}
            {/* Stabilisation : feuilles et empreintes - SUPPRIMÉ pour plus de clarté */}

            {/* Apparition de Beast Boy - Phase finale */}
            {phase === 3 && (
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                initial={{ opacity: 0, scale: 0.7, filter: "blur(18px)" }}
                animate={{ opacity: [0, 1, 1], scale: [0.7, 1.1, 1], filter: ["blur(18px)", "blur(0px)", "blur(0px)"] }}
                transition={{ duration: 1.5, delay: 0.5, times: [0, 0.5, 1], ease: "easeInOut" }}
                style={{ zIndex: 60 }}
              >
                <motion.div
                  initial={{ opacity: 1, scale: 1, rotate: 0 }}
                  animate={{
                    opacity: 1,
                    scale: [1, 1.025, 1],
                    rotate: [0, 2, -2, 0],
                  }}
                  transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <Image
                    src="/images/intro/beastboy.png"
                    alt="Beast Boy Teen Titans"
                    width={340}
                    height={340}
                    style={{
                      objectFit: "contain",
                      borderRadius: "50%",
                      boxShadow: "0 0 60px 10px #22c55e, 0 0 120px 30px #bef264"
                    }}
                    priority
                  />
                </motion.div>
                {/* Particules de nature autour de l'image */}
                {Array.from({ length: 6 }).map((_, i) => (
                  <motion.div
                    key={`bb-final-particle-${i}`}
                    className="absolute rounded-full"
                    style={{
                      width: `${3 + Math.random() * 4}px`,
                      height: `${3 + Math.random() * 4}px`,
                      left: `calc(50% + ${Math.cos((i / 6) * 2 * Math.PI) * 100 + (Math.random() - 0.5) * 20}px)`,
                      top: `calc(50% + ${Math.sin((i / 6) * 2 * Math.PI) * 100 + (Math.random() - 0.5) * 20}px)`,
                      background: "#22c55e",
                      boxShadow: "0 0 6px 2px #bef264, 0 0 12px 4px #22c55e",
                      opacity: 0.6,
                      filter: "blur(1px)",
                      zIndex: 61,
                    }}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: [0, 0.6, 0.3, 0], scale: [0.5, 1.1, 0.8, 0.5] }}
                    transition={{ duration: 2.5 + Math.random(), delay: 1.0 + Math.random(), repeat: Number.POSITIVE_INFINITY, repeatType: "mirror" }}
                  />
                ))}
              </motion.div>
            )}
          </motion.div>
        );
      }
      case "raven":
        // PHASE 1: Cercle d'incantation runique ultra détaillé, stylé, animé, moins lumineux
        // PHASE 2: Incantation phrase
        // PHASE 3: Explosion magique moins lumineuse
        // PHASE 4: Corbeaux burst
        // PHASE 5: Apparition de Raven (image bien visible)
        return (
          <motion.div
            key={`raven-${animationKey}`}
            className="fixed inset-0 z-[9000] pointer-events-none overflow-hidden bg-gradient-to-bl from-indigo-950 via-black to-purple-950"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* PHASE 1: Cercle runique stylé, animé, détaillé */}
            <motion.svg
              width={w}
              height={h}
              className="absolute inset-0"
              style={{ zIndex: 10, pointerEvents: "none" }}
              initial={{ opacity: 0, scale: 0.7, rotate: 0 }}
              animate={{ opacity: 1, scale: 1, rotate: 360 }}
              transition={{ duration: 1.8, ease: "easeInOut" }}
            >
              {/* Cercles principaux */}
              <motion.circle
                cx={w / 2}
                cy={h / 2}
                r={w * 0.18}
                fill="none"
                stroke="#a084e8"
                strokeWidth="5"
                opacity="0.7"
                filter="url(#glow1)"
                animate={{
                  scale: [1, 1.04, 1],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />
              <motion.circle
                cx={w / 2}
                cy={h / 2}
                r={w * 0.13}
                fill="none"
                stroke="#fff"
                strokeWidth="2.2"
                strokeDasharray="8 8"
                opacity="0.5"
                filter="url(#glow2)"
                animate={{
                  scale: [1, 0.97, 1],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              />
              <circle cx={w / 2} cy={h / 2} r={w * 0.09} fill="none" stroke="#a084e8" strokeWidth="1.2" opacity="0.3" />
              {/* Petits points internes */}
              {Array.from({ length: 8 }).map((_, i) => (
                <circle
                  key={`raven-dot-int-${i}`}
                  cx={w / 2 + Math.cos((i / 8) * 2 * Math.PI) * w * 0.07}
                  cy={h / 2 + Math.sin((i / 8) * 2 * Math.PI) * w * 0.07}
                  r={w * 0.004}
                  fill="#a084e8"
                  opacity="0.5"
                />
              ))}
              {/* Croix et losanges internes */}
              {Array.from({ length: 4 }).map((_, i) => {
                const angle = (i / 4) * 2 * Math.PI;
                return (
                  <g key={`raven-cross-${i}`}> {/* Croix */}
                    <rect x={w / 2 - 1.5} y={h / 2 - w * 0.11} width={3} height={w * 0.022} fill="#fff" opacity="0.4" transform={`rotate(${angle * 180 / Math.PI},${w / 2},${h / 2})`} />
                    <rect x={w / 2 - 1.5} y={h / 2 + w * 0.09} width={3} height={w * 0.022} fill="#fff" opacity="0.4" transform={`rotate(${angle * 180 / Math.PI},${w / 2},${h / 2})`} />
                  </g>
                )
              })}
              {/* Triangles mystiques (rotation animée) */}
              {Array.from({ length: 6 }).map((_, i) => {
                const angle = (i / 6) * 2 * Math.PI;
                const r1 = w * 0.13, r2 = w * 0.18;
                const x1 = w / 2 + Math.cos(angle - Math.PI / 36) * r1;
                const y1 = h / 2 + Math.sin(angle - Math.PI / 36) * r1;
                const x2 = w / 2 + Math.cos(angle + Math.PI / 36) * r1;
                const y2 = h / 2 + Math.sin(angle + Math.PI / 36) * r1;
                const x3 = w / 2 + Math.cos(angle) * r2;
                const y3 = h / 2 + Math.sin(angle) * r2;
                return (
                  <motion.polygon
                    key={`raven-tri-${i}`}
                    points={`${x1},${y1} ${x2},${y2} ${x3},${y3}`}
                    fill="#a084e8"
                    opacity="0.13"
                    filter="url(#glow1)"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 8 + i, repeat: Infinity, ease: "linear" }}
                  />
                )
              })}
              {/* Arcs stylisés (distorsion animée) */}
              {Array.from({ length: 4 }).map((_, i) => (
                <motion.path
                  key={`raven-arc-${i}`}
                  d={`M ${w / 2 + Math.cos((i / 4) * 2 * Math.PI) * w * 0.09} ${h / 2 + Math.sin((i / 4) * 2 * Math.PI) * w * 0.09}
                      A ${w * 0.09} ${w * 0.09} 0 0 1 ${w / 2 + Math.cos(((i + 0.5) / 4) * 2 * Math.PI) * w * 0.09} ${h / 2 + Math.sin(((i + 0.5) / 4) * 2 * Math.PI) * w * 0.09}`}
                  stroke="#fff"
                  strokeWidth="1.1"
                  fill="none"
                  opacity="0.3"
                  filter="url(#glow2)"
                  animate={{
                    scale: [1, 1.04, 1],
                  }}
                  transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut" }}
                />
              ))}
              {/* Glyphes runiques animés (oscillation, glow pulsant, distorsion) */}
              {Array.from({ length: 18 }).map((_, i) => (
                <motion.text
                  key={`raven-glyph-${i}`}
                  x={w / 2 + Math.cos((i / 18) * 2 * Math.PI) * w * 0.18}
                  y={h / 2 + Math.sin((i / 18) * 2 * Math.PI) * w * 0.18}
                  textAnchor="middle"
                  fontSize={w * 0.018}
                  fill="#fff"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 0.85,
                    scale: [1, 1.13, 1],
                    filter: [
                      "drop-shadow(0 0 8px #a084e8)",
                      "drop-shadow(0 0 16px #fff)",
                      "drop-shadow(0 0 8px #a084e8)"
                    ],
                  }}
                  transition={{ duration: 1.5 + i * 0.05, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
                  style={{ fontFamily: "monospace", letterSpacing: "0.1em" }}
                >
                  {String.fromCharCode(0x16A0 + i * 2)}
                </motion.text>
              ))}
              {/* Définitions de glow */}
              <defs>
                <filter id="glow1">
                  <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="glow2">
                  <feGaussianBlur stdDeviation="1.2" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
            </motion.svg>

            {/* Particules magiques autour du cercle */}
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={`raven-magic-particle-${i}`}
                className="absolute rounded-full"
                style={{
                  width: `${2 + Math.random() * 3}px`,
                  height: `${2 + Math.random() * 3}px`,
                  left: `${w / 2 + Math.cos((i / 12) * 2 * Math.PI) * w * 0.18 + (Math.random() - 0.5) * w * 0.03}px`,
                  top: `${h / 2 + Math.sin((i / 12) * 2 * Math.PI) * w * 0.18 + (Math.random() - 0.5) * w * 0.03}px`,
                  background: "#6c3ebc",
                  boxShadow: "0 0 4px 1px #a084e8, 0 0 8px 2px #3a1c71",
                  opacity: 0.45,
                  filter: "blur(0.5px)",
                  zIndex: 12,
                }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: [0, 0.45, 0.3, 0], scale: [0.5, 1.1, 0.8, 0.5] }}
                transition={{ duration: 1.5 + Math.random(), delay: 0.3 + Math.random(), repeat: Number.POSITIVE_INFINITY, repeatType: "mirror" }}
              />
            ))}
            {/* Petits éclairs */}
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={`raven-lightning-${i}`}
                className="absolute"
                style={{
                  left: `${w / 2 + Math.cos((i / 8) * 2 * Math.PI) * w * 0.19}px`,
                  top: `${h / 2 + Math.sin((i / 8) * 2 * Math.PI) * w * 0.19}px`,
                  zIndex: 13,
                }}
                initial={{ opacity: 0, scale: 0.7, rotate: 0 }}
                animate={{ opacity: [0, 1, 0], scale: [0.7, 1.2, 0.7], rotate: [0, 30 + Math.random() * 60, 0] }}
                transition={{ duration: 0.8, delay: 0.5 + i * 0.08, repeat: Number.POSITIVE_INFINITY, repeatType: "mirror" }}
              >
                <svg width="22" height="22" viewBox="0 0 22 22">
                  <polyline points="2,12 10,10 8,18 18,4 12,12 20,10" stroke="#fff" strokeWidth="2" fill="none" filter="url(#glow2)" />
                </svg>
              </motion.div>
            ))}

            {/* PHASE 2: Incantation phrase */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
              style={{ zIndex: 20 }}
              initial={{ opacity: 0, scale: 0.7, filter: "blur(18px)" }}
              animate={{ opacity: [0, 1, 1], scale: [0.7, 1.1, 1], filter: ["blur(18px)", "blur(0px)", "blur(0px)"] }}
              transition={{ duration: 0.8, delay: 0.6, times: [0, 0.5, 1], ease: "easeOut" }}
            >
              <div className="flex flex-col gap-2 items-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  style={{ color: "#a084e8", fontSize: "2.2rem", fontWeight: 700, textShadow: "0 0 28px #a084e8, 0 0 40px #fff" }}
                >
                  Azarath
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.0 }}
                  style={{ color: "#fff", fontSize: "2.2rem", fontWeight: 700, textShadow: "0 0 28px #fff, 0 0 40px #a084e8" }}
                >
                  Metrion
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                  style={{ color: "#a084e8", fontSize: "2.2rem", fontWeight: 700, textShadow: "0 0 28px #a084e8, 0 0 40px #fff" }}
                >
                  Zinthos
                </motion.div>
              </div>
            </motion.div>

            {/* PHASE 3: Explosion magique très discrète */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ zIndex: 30 }}
              initial={{ opacity: 0, scale: 0.2 }}
              animate={{ opacity: [0, 0.5, 0.3, 0], scale: [0.2, 1.1, 1.3, 1.5], filter: ["blur(0px)", "blur(2px)", "blur(4px)", "blur(6px)"] }}
              transition={{ duration: 1.0, delay: 1.8, times: [0, 0.2, 0.7, 1], ease: "easeInOut" }}
            >
              <div
                style={{
                  width: "300px",
                  height: "300px",
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle, #181a23 10%, #3a1c71 40%, #000 80%, transparent 100%)",
                  filter: "blur(2px) contrast(0.9)",
                  boxShadow: "0 0 8px 2px #3a1c71, 0 0 12px 4px #181a23",
                  opacity: 0.7,
                }}
              />
            </motion.div>

            {/* PHASE 4: Corbeaux burst */}
            {Array.from({ length: 16 }).map((_, i) => (
              <motion.svg
                key={`raven-crow-${i}`}
                width="70"
                height="70"
                viewBox="0 0 60 60"
                className="absolute"
                style={{
                  left: w / 2,
                  top: h / 2,
                  zIndex: 40,
                  pointerEvents: "none",
                }}
                initial={{
                  x: 0,
                  y: 0,
                  scale: 0.7,
                  opacity: 0,
                  rotate: 0,
                }}
                animate={{
                  x: Math.cos((i / 16) * 2 * Math.PI) * (w * 0.33 + Math.random() * w * 0.18),
                  y: Math.sin((i / 16) * 2 * Math.PI) * (h * 0.25 + Math.random() * h * 0.13),
                  scale: [0.7, 1.4, 0.9 + Math.random() * 0.7],
                  opacity: [0, 1, 0.8, 0],
                  rotate: Math.random() * 360 - 180,
                }}
                transition={{
                  duration: 1.2,
                  delay: 2.8 + i * 0.03,
                  times: [0, 0.3, 0.7, 1],
                  ease: "easeInOut",
                }}
              >
                {/* Silhouette corbeau stylisée */}
                <path
                  d="M10 40 Q30 10 50 40 Q40 35 30 40 Q20 45 10 40 Z"
                  fill="#222"
                  stroke="#fff"
                  strokeWidth="1.5"
                  opacity="0.95"
                  filter="url(#glow2)"
                />
                <path
                  d="M30 40 Q32 30 38 32 Q34 38 30 40 Z"
                  fill="#fff"
                  opacity="0.22"
                />
              </motion.svg>
            ))}

            {/* PHASE 5: Apparition de Raven (image animée subtilement) */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              initial={{ opacity: 0, scale: 0.7, filter: "blur(18px)" }}
              animate={{ opacity: [0, 1, 1], scale: [0.7, 1.1, 1], filter: ["blur(18px)", "blur(0px)", "blur(0px)"] }}
              transition={{ duration: 1.2, delay: 3.2, times: [0, 0.5, 1], ease: "easeInOut" }}
              style={{ zIndex: 50 }}
            >
              <motion.div
                initial={{ opacity: 1, scale: 1, rotate: 0 }}
                animate={{
                  opacity: 1,
                  scale: [1, 1.025, 1],
                  rotate: [0, 2, -2, 0],
                }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Image
                  src="/images/intro/raven.png"
                  alt="Raven Teen Titans"
                  width={340}
                  height={340}
                  style={{
                    objectFit: "contain",
                    borderRadius: "50%",
                    boxShadow: "0 0 60px 10px #a084e8, 0 0 120px 30px #fff"
                  }}
                  priority
                />
              </motion.div>
              {/* Particules magiques devant l'image (moins nombreuses et moins lumineuses) */}
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                  key={`raven-img-particle-${i}`}
                  className="absolute rounded-full"
                  style={{
                    width: `${2 + Math.random() * 3}px`,
                    height: `${2 + Math.random() * 3}px`,
                    left: `calc(50% + ${Math.cos((i / 8) * 2 * Math.PI) * 90 + (Math.random() - 0.5) * 18}px)`,
                    top: `calc(50% + ${Math.sin((i / 8) * 2 * Math.PI) * 90 + (Math.random() - 0.5) * 18}px)`,
                    background: "#6c3ebc",
                    boxShadow: "0 0 4px 1px #a084e8, 0 0 8px 2px #3a1c71",
                    opacity: 0.45,
                    filter: "blur(0.5px)",
                    zIndex: 52,
                  }}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: [0, 0.45, 0.3, 0], scale: [0.5, 1.1, 0.8, 0.5] }}
                  transition={{ duration: 1.8 + Math.random(), delay: 3.5 + Math.random(), repeat: Number.POSITIVE_INFINITY, repeatType: "mirror" }}
                />
              ))}
            </motion.div>
          </motion.div>
        )
      case "deathstroke":
        // TIMING CONSTANTS - CORRECTED TIMELINE
        const TIMING = {
          SILENCE: { start: 0, end: 1.5 },
          SCOPE_START: 1.5,
          SCANNING_END: 3.0,
          TARGET_LOCKED: 3.0,
          SHOT: 3.5,
          IMPACT: 3.6,
          CRACKS_VISIBLE: 3.65,
          SHATTER: 4.2,
          REVEAL: 5.0,
          TEXT: 5.5,
          TOTAL_DURATION: 8.0 // Used for normalizing keyframes
        };

        // Helper to convert seconds to normalized time (0-1)
        const t = (s: number) => s / TIMING.TOTAL_DURATION;

        return (
          <motion.div
            key={`deathstroke-${animationKey}`}
            className="fixed inset-0 z-[9000] pointer-events-none overflow-hidden bg-black"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* ROOT SHAKE CONTAINER - Affects EVERYTHING */}
            <motion.div
              className="absolute inset-0"
              animate={{
                x: [0, -30, 30, -20, 20, -10, 10, 0],
                y: [0, 20, -20, 15, -15, 8, -8, 0]
              }}
              transition={{
                duration: 0.4,
                delay: TIMING.SHOT,
                ease: "easeOut"
              }}
            >
              {/* --- PHASE 5: REVEAL DEATHSTROKE (Background Layer z-0) --- */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center z-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: TIMING.REVEAL, duration: 0.8 }}
              >
                {/* Smoke */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-orange-900/40 to-transparent"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: TIMING.REVEAL, duration: 1.5 }}
                />
                {/* Image */}
                <div className="relative w-[600px] h-[600px]">
                  <Image
                    src="/images/intro/deathstroke.png"
                    alt="Deathstroke"
                    fill
                    className="object-contain drop-shadow-[0_0_80px_#ff4500]"
                  />
                  {/* Glowing Eye */}
                  <motion.div
                    className="absolute top-[30%] right-[35%] w-6 h-6 bg-orange-500 rounded-full"
                    style={{ boxShadow: "0 0 40px #ff4500, 0 0 80px #ff4500" }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: [0, 1.8, 1.2], opacity: [0, 1, 0.9] }}
                    transition={{ delay: TIMING.REVEAL + 0.3, duration: 0.5 }}
                  />
                </div>
              </motion.div>

              {/* --- PHASE 1: SILENCE (z-10) --- */}
              <motion.div
                className="absolute inset-0 z-10"
                animate={{ opacity: [1, 1, 0] }}
                transition={{ duration: TIMING.TOTAL_DURATION, times: [0, t(TIMING.SCOPE_START), t(TIMING.SCOPE_START + 0.1)] }}
              >
                {/* Heartbeat */}
                <motion.div
                  className="absolute inset-0 bg-red-900/5"
                  animate={{ opacity: [0, 0.2, 0] }}
                  transition={{ duration: 0.8, repeat: 2 }}
                />
                {/* Initial Laser Dot */}
                <motion.div
                  className="absolute w-2 h-2 bg-red-600 rounded-full shadow-[0_0_10px_#ff0000]"
                  initial={{ x: "10%", y: "80%", opacity: 0 }}
                  animate={{ x: ["10%", "40%", "50%"], y: ["80%", "30%", "50%"], opacity: [0, 1, 0] }}
                  transition={{ duration: 1.5, ease: "linear" }}
                />
              </motion.div>

              {/* --- PHASE 2: SCOPE & SCANNING (z-10) --- */}
              <motion.div
                className="absolute inset-0 z-10 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 1, 0] }} // Appear, Stay, Disappear at Shatter
                transition={{
                  duration: TIMING.TOTAL_DURATION,
                  times: [0, t(TIMING.SCOPE_START), t(TIMING.SHATTER - 0.1), t(TIMING.SHATTER)]
                }}
              >
                {/* Vignette */}
                <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_40%,black_90%)] opacity-90" />

                {/* Scope SVG - Follows Scanning */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{
                    x: [0, -50, 50, 0],
                    y: [0, -30, 30, 0]
                  }}
                  transition={{
                    duration: 1.5,
                    times: [0, 0.3, 0.7, 1],
                    ease: "easeInOut",
                    delay: TIMING.SCOPE_START
                  }}
                >
                  <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <defs>
                      <mask id="scope-mask-v2">
                        <rect x="0" y="0" width="100" height="100" fill="white" />
                        <circle cx="50" cy="50" r="35" fill="black" />
                      </mask>
                    </defs>
                    <rect x="0" y="0" width="100" height="100" fill="black" mask="url(#scope-mask-v2)" opacity="0.98" />
                    <line x1="10" y1="50" x2="90" y2="50" stroke="#00ff00" strokeWidth="0.05" opacity="0.8" />
                    <line x1="50" y1="10" x2="50" y2="90" stroke="#00ff00" strokeWidth="0.05" opacity="0.8" />
                    {/* Mil-dots */}
                    {Array.from({ length: 9 }).map((_, i) => (
                      <circle key={`h-${i}`} cx={46 + i} cy="50" r="0.15" fill="#00ff00" />
                    ))}
                    {Array.from({ length: 9 }).map((_, i) => (
                      <circle key={`v-${i}`} cx="50" cy={46 + i} r="0.15" fill="#00ff00" />
                    ))}
                  </svg>
                </motion.div>

                {/* Scanning Laser Dot */}
                <motion.div
                  className="absolute w-2 h-2 bg-red-600 rounded-full shadow-[0_0_10px_#ff0000]"
                  animate={{
                    x: [0, -50, 50, 0],
                    y: [0, -30, 30, 0]
                  }}
                  transition={{
                    duration: 1.5,
                    times: [0, 0.3, 0.7, 1],
                    ease: "easeInOut",
                    delay: TIMING.SCOPE_START
                  }}
                />

                {/* HUD */}
                <div className="absolute inset-0 pointer-events-none">
                  <motion.div className="absolute top-[30%] right-[20%] text-[#00ff00] font-mono text-xs tracking-widest">
                    DIST: <motion.span animate={{ opacity: [1, 0.5, 1] }} transition={{ repeat: Infinity, duration: 0.5 }}>842m</motion.span>
                  </motion.div>
                  <motion.div className="absolute top-[30%] left-[20%] text-[#00ff00] font-mono text-xs tracking-widest">
                    WIND: 4.2 NW
                  </motion.div>

                  {/* TARGET LOCKED Indicator */}
                  <motion.div
                    className="absolute top-[45%] left-1/2 -translate-x-1/2 text-red-500 font-mono text-sm tracking-widest font-bold border border-red-500 px-2 py-1"
                    initial={{ opacity: 0, scale: 2 }}
                    animate={{ opacity: [0, 1, 0], scale: 1 }}
                    transition={{ delay: TIMING.TARGET_LOCKED, duration: 0.5, repeat: 3 }}
                  >
                    TARGET LOCKED
                  </motion.div>

                  <motion.div
                    className="absolute bottom-[25%] left-1/2 -translate-x-1/2 text-red-500 font-mono text-sm tracking-[0.2em] font-bold"
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  >
                    BREATH HELD
                  </motion.div>
                </div>
              </motion.div>

              {/* --- PHASE 3B: IMPACT & FISSURATION (z-20) --- */}
              {/* Much more visible cracked screen */}
              <motion.div
                className="absolute inset-0 z-20"
                style={{
                  background: "rgba(255,255,255,0.25)",
                  backdropFilter: "blur(2px)",
                  boxShadow: "inset 0 0 100px rgba(255,255,255,0.3)"
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.05,
                  delay: TIMING.IMPACT
                }}
              >
                {/* Realistic Bullet Impact - Multi-layered */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  {/* Outer impact zone - crushed glass */}
                  <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full"
                    style={{
                      background: "radial-gradient(circle, rgba(0,0,0,0.3) 0%, rgba(255,255,255,0.4) 40%, transparent 70%)",
                      boxShadow: "0 0 40px rgba(255,255,255,0.6)"
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: [0, 1.3, 1], opacity: [0, 0.8, 0.6] }}
                    transition={{ duration: 0.15, delay: TIMING.IMPACT }}
                  />

                  {/* Main bullet hole - entry point */}
                  <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full"
                    style={{
                      background: "radial-gradient(circle, #000000 30%, #1a1a1a 50%, rgba(50,50,50,0.8) 100%)",
                      border: "2px solid rgba(255,255,255,0.9)",
                      boxShadow: "inset 0 0 15px rgba(0,0,0,1), inset 0 0 8px rgba(100,100,100,0.5), 0 0 25px rgba(255,255,255,0.8)"
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: [0, 1.5, 1], opacity: 1 }}
                    transition={{ duration: 0.1, delay: TIMING.IMPACT }}
                  />

                  {/* Inner dark core */}
                  <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-black"
                    style={{
                      boxShadow: "inset 0 0 6px rgba(0,0,0,1), 0 0 10px rgba(0,0,0,0.5)"
                    }}
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.2, 1] }}
                    transition={{ duration: 0.12, delay: TIMING.IMPACT + 0.03 }}
                  />

                  {/* Micro radial cracks around hole */}
                  {Array.from({ length: 12 }).map((_, i) => {
                    const angle = (i * 30) * (Math.PI / 180);
                    const length = 15 + Math.random() * 10;
                    return (
                      <motion.div
                        key={`micro-crack-${i}`}
                        className="absolute top-1/2 left-1/2"
                        style={{
                          width: "1px",
                          height: `${length}px`,
                          background: "linear-gradient(to bottom, rgba(255,255,255,0.9), transparent)",
                          transformOrigin: "top center",
                          transform: `rotate(${angle * (180 / Math.PI)}deg)`,
                          filter: "blur(0.3px)"
                        }}
                        initial={{ scaleY: 0, opacity: 0 }}
                        animate={{ scaleY: 1, opacity: 0.8 }}
                        transition={{ duration: 0.08, delay: TIMING.IMPACT + 0.05 + i * 0.005 }}
                      />
                    );
                  })}

                  {/* Glass dust particles around impact */}
                  {Array.from({ length: 8 }).map((_, i) => {
                    const angle = (i * 45) * (Math.PI / 180);
                    const distance = 20 + Math.random() * 15;
                    return (
                      <motion.div
                        key={`dust-${i}`}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-white rounded-full"
                        style={{
                          boxShadow: "0 0 4px rgba(255,255,255,0.9)"
                        }}
                        initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                        animate={{
                          x: Math.cos(angle) * distance,
                          y: Math.sin(angle) * distance,
                          opacity: [0, 1, 0.6, 0],
                          scale: [0, 1.5, 1, 0.5]
                        }}
                        transition={{ duration: 0.4, delay: TIMING.IMPACT + 0.05 }}
                      />
                    );
                  })}
                </div>
                {/* Spiderweb Cracks - MUCH MORE VISIBLE */}
                <svg className="absolute inset-0 overflow-visible" viewBox="0 0 100 100">
                  <defs>
                    <filter id="crack-glow-strong"><feGaussianBlur stdDeviation="0.3" /></filter>
                  </defs>
                  {/* Radial Cracks */}
                  {[
                    "M 50 50 L 50 5",
                    "M 50 50 L 85 15",
                    "M 50 50 L 95 50",
                    "M 50 50 L 85 85",
                    "M 50 50 L 50 95",
                    "M 50 50 L 15 85",
                    "M 50 50 L 5 50",
                    "M 50 50 L 15 15"
                  ].map((d, i) => (
                    <motion.path
                      key={`crack-${i}`}
                      d={d}
                      stroke="white"
                      strokeWidth="1.5"
                      opacity="1"
                      filter="url(#crack-glow-strong)"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.15, delay: TIMING.CRACKS_VISIBLE + i * 0.02, ease: "easeOut" }}
                    />
                  ))}
                  {/* Concentric Cracks */}
                  <motion.circle
                    cx="50" cy="50" r="15"
                    stroke="white" strokeWidth="1" fill="none"
                    strokeDasharray="3, 3"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.2, delay: TIMING.CRACKS_VISIBLE + 0.1 }}
                  />
                  <motion.circle
                    cx="50" cy="50" r="25"
                    stroke="white" strokeWidth="0.8" fill="none"
                    strokeDasharray="5, 5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.9 }}
                    transition={{ duration: 0.25, delay: TIMING.CRACKS_VISIBLE + 0.15 }}
                  />
                </svg>
              </motion.div>

              {/* --- PHASE 3A: EFFECTS (z-30) --- */}
              <motion.div className="absolute inset-0 z-30 pointer-events-none">
                {/* Muzzle Flash */}
                <motion.div
                  className="absolute inset-0 bg-white mix-blend-screen"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 0.1, delay: TIMING.SHOT }}
                />
                {/* Bullet Trail */}
                <motion.div
                  className="absolute top-1/2 left-1/2 h-1 bg-gradient-to-r from-transparent via-orange-500 to-white"
                  style={{ width: "50%", originX: 0, rotate: -45 }}
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: [1, 0] }}
                  transition={{ duration: 0.1, delay: TIMING.SHOT }}
                />
                {/* Shockwave */}
                <motion.div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-[50px] border-white/20"
                  initial={{ width: 0, height: 0, opacity: 0 }}
                  animate={{ width: "150vmax", height: "150vmax", opacity: [1, 0] }}
                  transition={{ duration: 0.3, delay: TIMING.SHOT }}
                />
              </motion.div>

              {/* --- PHASE 4: SHATTER (z-40) - DOKKAN BATTLE STYLE --- */}
              <div className="absolute inset-0 z-40 pointer-events-none">
                {/* Large Realistic Glass Shards - Irregular polygonal shapes */}
                {Array.from({ length: 12 }).map((_, i) => {
                  const angle = (i * 30) * (Math.PI / 180);
                  const distance = 400 + Math.random() * 200;
                  const size = 100 + Math.random() * 150;

                  // Create irregular polygon shapes for each shard
                  const irregularShapes = [
                    "polygon(50% 0%, 80% 30%, 100% 60%, 70% 100%, 20% 90%, 0% 50%, 30% 20%)",
                    "polygon(40% 0%, 100% 20%, 90% 80%, 60% 100%, 10% 70%, 0% 30%)",
                    "polygon(50% 10%, 100% 40%, 85% 100%, 30% 95%, 0% 60%, 20% 0%)",
                    "polygon(60% 0%, 100% 50%, 80% 100%, 20% 90%, 0% 40%, 25% 10%)"
                  ];

                  return (
                    <motion.div
                      key={`shard-${i}`}
                      className="absolute"
                      style={{
                        left: "50%",
                        top: "50%",
                        width: `${size}px`,
                        height: `${size}px`,
                        marginLeft: `-${size / 2}px`,
                        marginTop: `-${size / 2}px`,
                        clipPath: irregularShapes[i % 4]
                      }}
                      initial={{
                        x: 0,
                        y: 0,
                        opacity: 0,
                        scale: 1,
                        rotate: angle * (180 / Math.PI)
                      }}
                      animate={{
                        x: Math.cos(angle) * distance,
                        y: Math.sin(angle) * distance,
                        rotate: angle * (180 / Math.PI) + (Math.random() - 0.5) * 180,
                        opacity: [0, 1, 0.8, 0],
                        scale: [1, 1.1, 1, 0.8]
                      }}
                      transition={{
                        duration: 1.2,
                        delay: TIMING.SHATTER + i * 0.015,
                        ease: "easeOut",
                        times: [0, 0.2, 0.6, 1]
                      }}
                    >
                      {/* Base glass layer with depth gradient */}
                      <div
                        className="absolute inset-0"
                        style={{
                          background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(230,240,255,0.85) 30%, rgba(200,220,255,0.7) 100%)",
                          backdropFilter: "blur(4px)"
                        }}
                      />

                      {/* Reflection layer - light catching edge */}
                      <div
                        className="absolute inset-0"
                        style={{
                          background: "linear-gradient(45deg, transparent 0%, rgba(255,255,255,0.9) 20%, transparent 40%, rgba(255,255,255,0.6) 60%, transparent 80%)",
                          mixBlendMode: "overlay"
                        }}
                      />

                      {/* Sharp edge highlight */}
                      <div
                        className="absolute inset-0"
                        style={{
                          border: "3px solid rgba(255,255,255,0.98)",
                          boxShadow: "inset 0 0 20px rgba(255,255,255,0.4), 0 0 30px rgba(255,255,255,0.8), 0 0 60px rgba(200,220,255,0.4)",
                        }}
                      />

                      {/* Internal fracture lines/texture */}
                      <svg className="absolute inset-0" viewBox="0 0 100 100" style={{ opacity: 0.3 }}>
                        <line x1="0" y1="0" x2="100" y2="100" stroke="rgba(255,255,255,0.6)" strokeWidth="0.5" />
                        <line x1="100" y1="0" x2="0" y2="100" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" />
                        <line x1="50" y1="0" x2="50" y2="100" stroke="rgba(255,255,255,0.3)" strokeWidth="0.3" />
                      </svg>
                    </motion.div>
                  );
                })}

                {/* Additional smaller fragments for density */}
                {Array.from({ length: 20 }).map((_, i) => {
                  const angle = (i * 18 + 15) * (Math.PI / 180); // Offset angles
                  const distance = 250 + Math.random() * 250;
                  const size = 40 + Math.random() * 80;

                  return (
                    <motion.div
                      key={`small-shard-${i}`}
                      className="absolute"
                      style={{
                        left: "50%",
                        top: "50%",
                        width: `${size}px`,
                        height: `${size}px`,
                        marginLeft: `-${size / 2}px`,
                        marginTop: `-${size / 2}px`,
                        background: "rgba(255,255,255,0.85)",
                        border: "2px solid rgba(255,255,255,1)",
                        boxShadow: "0 0 20px rgba(255,255,255,0.9)",
                        clipPath: i % 3 === 0
                          ? "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" // Diamond
                          : "polygon(50% 0%, 100% 100%, 0% 100%)", // Triangle
                      }}
                      initial={{
                        x: 0,
                        y: 0,
                        opacity: 0,
                        scale: 0.8
                      }}
                      animate={{
                        x: Math.cos(angle) * distance,
                        y: Math.sin(angle) * distance,
                        rotate: Math.random() * 360,
                        opacity: [0, 1, 0],
                        scale: [0.8, 1.2, 0.6]
                      }}
                      transition={{
                        duration: 1.0,
                        delay: TIMING.SHATTER + Math.random() * 0.15,
                        ease: "easeOut"
                      }}
                    />
                  );
                })}

                {/* Bright flash particles at center */}
                {Array.from({ length: 15 }).map((_, i) => {
                  const angle = (i * 24) * (Math.PI / 180);
                  const distance = 150 + Math.random() * 100;

                  return (
                    <motion.div
                      key={`flash-${i}`}
                      className="absolute"
                      style={{
                        left: "50%",
                        top: "50%",
                        width: "12px",
                        height: "12px",
                        marginLeft: "-6px",
                        marginTop: "-6px",
                        background: "radial-gradient(circle, rgba(255,255,255,1), rgba(255,255,255,0))",
                        boxShadow: "0 0 15px rgba(255,255,255,1)",
                        borderRadius: "50%"
                      }}
                      initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                      animate={{
                        x: Math.cos(angle) * distance,
                        y: Math.sin(angle) * distance,
                        opacity: [0, 1, 0],
                        scale: [0, 2, 1]
                      }}
                      transition={{
                        duration: 0.6,
                        delay: TIMING.SHATTER,
                        ease: "easeOut"
                      }}
                    />
                  );
                })}
              </div>

              {/* --- PHASE 5: TEXT (z-50) --- */}
              <motion.div
                className="absolute bottom-[10%] left-1/2 -translate-x-1/2 text-orange-500 font-bold text-6xl tracking-[0.8em] z-50"
                style={{ textShadow: "0 0 20px #ff4500" }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: TIMING.TEXT, duration: 0.5 }}
              >
                TERMINATED
              </motion.div>

            </motion.div>
          </motion.div>
        )
      case "cyborg": // From previous good version + your new specs
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
      default:
        return null
    }
  }

  // Use Portal to ensure the animation is always fixed relative to the viewport,
  // ignoring any parent stacking contexts (transforms, filters, etc.)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  if (!mounted) return null

  return createPortal(
    <AnimatePresence mode="wait">
      {activeAnimation && (
        renderAnimation()
      )}
    </AnimatePresence>,
    document.body
  )
}
