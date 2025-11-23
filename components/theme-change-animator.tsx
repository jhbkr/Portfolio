"use client"

import { useTheme } from "@/components/theme-provider"
import { useEffect, useState } from "react"
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
        // Départ et arrivée de la comète
        const cometStart = { x: -0.2 * w, y: h * 1.1 }
        const cometEnd = { x: w / 2, y: h / 2 }
        return (
          <motion.div
            key={`starfire-${animationKey}`}
            className="fixed inset-0 z-[9000] pointer-events-none overflow-hidden bg-black"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* --- NÉBULEUSE MODÉLISÉE --- */}
            {/* Blobs SVG animés */}
            <motion.svg
              width={w}
              height={h}
              className="absolute inset-0"
              style={{ zIndex: 1 }}
            >
              <motion.ellipse
                cx={w * 0.6}
                cy={h * 0.4}
                rx={w * 0.38}
                ry={h * 0.22}
                fill="url(#sf-nebula1)"
                initial={{ opacity: 0, scale: 1.2, rotate: 0 }}
                animate={{ opacity: 0.7, scale: 1, rotate: 12 }}
                transition={{ duration: 1.8, ease: "easeOut" }}
              />
              <motion.ellipse
                cx={w * 0.3}
                cy={h * 0.7}
                rx={w * 0.28}
                ry={h * 0.18}
                fill="url(#sf-nebula2)"
                initial={{ opacity: 0, scale: 1.1, rotate: 0 }}
                animate={{ opacity: 0.5, scale: 1, rotate: -18 }}
                transition={{ duration: 2.0, delay: 0.1, ease: "easeOut" }}
              />
              <motion.ellipse
                cx={w * 0.8}
                cy={h * 0.2}
                rx={w * 0.18}
                ry={h * 0.12}
                fill="url(#sf-nebula3)"
                initial={{ opacity: 0, scale: 1.3, rotate: 0 }}
                animate={{ opacity: 0.4, scale: 1, rotate: 24 }}
                transition={{ duration: 1.9, delay: 0.2, ease: "easeOut" }}
              />
              <defs>
                <radialGradient id="sf-nebula1" cx="50%" cy="50%" r="100%">
                  <stop offset="0%" stopColor="#ff7ce5" />
                  <stop offset="60%" stopColor="#7f5fff" />
                  <stop offset="100%" stopColor="#000" />
                </radialGradient>
                <radialGradient id="sf-nebula2" cx="50%" cy="50%" r="100%">
                  <stop offset="0%" stopColor="#ffb347" />
                  <stop offset="40%" stopColor="#ff7ce5" />
                  <stop offset="100%" stopColor="transparent" />
                </radialGradient>
                <radialGradient id="sf-nebula3" cx="50%" cy="50%" r="100%">
                  <stop offset="0%" stopColor="#7f5fff" />
                  <stop offset="40%" stopColor="#ffb347" />
                  <stop offset="100%" stopColor="transparent" />
                </radialGradient>
              </defs>
            </motion.svg>

            {/* Filaments lumineux */}
            {Array.from({ length: 3 }).map((_, i) => (
              <motion.div
                key={`sf-filament-${i}`}
                className="absolute"
                style={{
                  left: `${20 + i * 30}%`,
                  top: `${30 + i * 20}%`,
                  width: "60vw",
                  height: "8vw",
                  borderRadius: "50%",
                  background: `linear-gradient(90deg, transparent, #ff7ce5aa 60%, #baff39aa 100%)`,
                  filter: "blur(18px)",
                  opacity: 0.25 + i * 0.1,
                  rotate: `${-10 + i * 18}deg`,
                  zIndex: 2,
                }}
                initial={{ scaleX: 0.7, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 0.25 + i * 0.1 }}
                transition={{ duration: 1.5 + i * 0.3, delay: 0.3 * i, ease: "easeOut" }}
              />
            ))}

            {/* --- ÉTOILES SCINTILLANTES --- */}
            {Array.from({ length: 90 }).map((_, i) => (
              <motion.div
                key={`sf-star-${i}`}
                className="absolute rounded-full"
                style={{
                  width: `${1 + Math.random() * 2.5}px`,
                  height: `${1 + Math.random() * 2.5}px`,
                  left: `${Math.random() * 100}vw`,
                  top: `${Math.random() * 100}vh`,
                  background: "white",
                  opacity: 0.7 + Math.random() * 0.3,
                  filter: "blur(0.5px)",
                  zIndex: 3,
                }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: [0, 1, 0.7, 1, 0], scale: [0.5, 1, 0.8, 1.2, 0.5] }}
                transition={{
                  duration: 1.8 + Math.random() * 1.5,
                  delay: Math.random() * 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "mirror",
                }}
              />
            ))}

            {/* --- COMÈTE --- */}
            <motion.div
              className="absolute"
              style={{
                left: 0,
                top: 0,
                width: "100vw",
                height: "100vh",
                pointerEvents: "none",
                zIndex: 10,
              }}
            >
              <motion.div
                style={{
                  position: "absolute",
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  background: "radial-gradient(circle, #fff 60%, #ffb347 90%, #ff7ce5 100%)",
                  boxShadow: "0 0 60px 20px #ffb347, 0 0 120px 60px #ff7ce5",
                }}
                initial={{
                  x: cometStart.x,
                  y: cometStart.y,
                  scale: 0.7,
                  opacity: 0,
                  rotate: -18,
                }}
                animate={{
                  x: [cometStart.x, w * 0.7, cometEnd.x],
                  y: [cometStart.y, h * 0.3, cometEnd.y],
                  scale: [0.7, 1.1, 1.5],
                  opacity: [0, 1, 1, 0],
                  rotate: [-18, 0, 12],
                }}
                transition={{
                  duration: 1.2,
                  delay: 0.8,
                  times: [0, 0.7, 1],
                  ease: "easeInOut",
                }}
              />
              {/* Traînée */}
              <motion.div
                style={{
                  position: "absolute",
                  width: "16px",
                  height: "320px",
                  borderRadius: "50% 50% 100% 100%/100% 100% 100% 100%",
                  background: "linear-gradient(180deg, #ffb347 0%, #ff7ce5 80%, transparent 100%)",
                  filter: "blur(12px)",
                  left: cometStart.x + 8,
                  top: cometStart.y + 16,
                  opacity: 0.7,
                  zIndex: 9,
                }}
                initial={{
                  x: 0,
                  y: 0,
                  scaleY: 0.7,
                  opacity: 0,
                }}
                animate={{
                  x: [0, w * 0.7 - cometStart.x, cometEnd.x - cometStart.x],
                  y: [0, h * 0.3 - cometStart.y, cometEnd.y - cometStart.y],
                  scaleY: [0.7, 1.2, 1.7],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: 1.2,
                  delay: 0.8,
                  times: [0, 0.7, 1],
                  ease: "easeInOut",
                }}
              />
            </motion.div>

            {/* --- EXPLOSION AMÉLIORÉE --- */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ zIndex: 20 }}
              initial={{ opacity: 0, scale: 0.2 }}
              animate={{
                opacity: [0, 1, 0.7, 0],
                scale: [0.2, 1.5, 2.2, 2.8],
                filter: ["blur(0px)", "blur(8px)", "blur(16px)", "blur(24px)"],
              }}
              transition={{ duration: 0.6, delay: 2.0, times: [0, 0.2, 0.7, 1], ease: "easeOut" }}
            >
              {/* Onde de choc */}
              <div
                style={{
                  width: "420px",
                  height: "420px",
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle, #fff 10%, #ffb347 28%, #ff7ce5 48%, #7f5fff 68%, rgba(200,0,200,0.7) 82%, transparent 95%)",
                  filter: "blur(18px) contrast(1.6)",
                  boxShadow: "0 0 120px 60px #ff7ce5, 0 0 180px 90px #ffb347",
                }}
              />
              {/* Particules d'éclat */}
              {Array.from({ length: 18 }).map((_, i) => (
                <motion.div
                  key={`sf-explosion-particle-${i}`}
                  className="absolute"
                  style={{
                    left: "50%",
                    top: "50%",
                    width: "18px",
                    height: "18px",
                    borderRadius: "50%",
                    background: i % 2 === 0 ? "#ffe066" : "#ff7ce5",
                    filter: "blur(2px)",
                    zIndex: 21,
                  }}
                  initial={{ x: 0, y: 0, scale: 0.5, opacity: 1 }}
                  animate={{
                    x: Math.cos((i / 18) * 2 * Math.PI) * 180,
                    y: Math.sin((i / 18) * 2 * Math.PI) * 180,
                    scale: [0.5, 1.2, 0.2],
                    opacity: [1, 1, 0],
                  }}
                  transition={{ duration: 0.6, delay: 2.0, ease: "easeOut", repeat: Number.POSITIVE_INFINITY, repeatType: "mirror" }}
                />
              ))}
            </motion.div>

            {/* --- APPARITION DE STARFIRE --- */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              initial={{ opacity: 0, scale: 0.7, filter: "blur(18px)" }}
              animate={{
                opacity: [0, 1, 1],
                scale: [0.7, 1.1, 1],
                filter: ["blur(18px)", "blur(0px)", "blur(0px)"],
              }}
              transition={{ duration: 0.9, delay: 2.6, times: [0, 0.5, 1], ease: "easeOut" }}
              style={{ zIndex: 30 }}
            >
              <motion.div initial={{ opacity: 1 }} animate={{ opacity: 0.3 }} transition={{ duration: 1.2, ease: "easeOut" }} className="relative w-[320px] h-[320px]">
                <Image
                  src="/images/intro/starfire.png"
                  alt="Starfire Teen Titans"
                  fill
                  style={{
                    objectFit: "contain",
                    borderRadius: "50%",
                    boxShadow: "0 0 60px 10px #ff7ce5",
                  }}
                  priority
                />
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
        return (
          <motion.div
            key={`deathstroke-${animationKey}`}
            className="fixed inset-0 z-[9000] pointer-events-none overflow-hidden bg-black"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Phase 1: Tactical Briefing (0 - 2s) */}
            <motion.div className="absolute inset-0 opacity-35">
              <motion.div initial={{ backgroundPosition: "0 0" }} animate={{ backgroundPosition: "-100px -100px" }} transition={{ duration: 1.5, ease: "linear", repeat: 1, repeatType: "loop" }}>
                <div className="w-full h-full bg-gradient-to-br from-orange-900 via-orange-800 to-orange-700 opacity-50" />
              </motion.div>
            </motion.div>
            <motion.div
              className="absolute top-[12%] left-1/2 -translate-x-1/2 text-orange-400 text-5xl md:text-7xl font-mono tracking-widest" // Prominent
              style={{ textShadow: "0 0 20px #FF8C00, 0 0 12px #FF4500, 0 0 3px white" }}
              initial={{ opacity: 0, y: -60 }}
              animate={{ opacity: [0, 1, 1, 0], y: 0 }}
              transition={{ duration: 1.8, delay: 0.1, times: [0, 0.1, 0.88, 1], ease: "easeInOut" }}
            >
              TARGET ACQUIRED
            </motion.div>

            {/* Phase 2: Mask & Reticle (1.5s - 3s) */}
            <motion.div
              className="absolute top-0 left-0 w-1/2 h-full bg-orange-600 origin-right"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.35, delay: 1.5, ease: "circOut" }}
            />
            <motion.div
              className="absolute top-0 right-0 w-1/2 h-full bg-slate-900 origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.35, delay: 1.5, ease: "circOut" }}
            />
            <motion.div // Larger, menacing eye
              className="absolute top-1/2 right-[calc(25%-55px)] -translate-y-1/2 w-[110px] h-[110px] rounded-full bg-black shadow-2xl shadow-black ring-2 ring-orange-500/40"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.25, delay: 1.8, type: "spring", stiffness: 180 }}
            />
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-red-600"
              initial={{ opacity: 0, scale: 3.5, filter: "blur(7px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.5, delay: 2.0, ease: "backOut" }}
            >
              <Target width={w * 0.45} height={w * 0.45} strokeWidth={0.9} className="animate-pulse-fast" />
            </motion.div>

            {/* Phase 3: Brutal Assault (2.8s - 4.2s) */}
            {Array.from({ length: 7 }).map(
              (
                _,
                i, // Wider, faster slashes
              ) => (
                <motion.div
                  key={`ds-wide-slash-${i}`}
                  className="absolute bg-gradient-to-r from-transparent via-gray-100 to-transparent"
                  style={{
                    width: "250%",
                    height: "8px",
                    left: "-75%",
                    top: `${8 + Math.random() * 84}%`,
                    rotate: `${-40 + Math.random() * 80}deg`,
                    boxShadow: "0 0 22px 6px #fff, 0 0 14px 4px #ffb84d",
                    mixBlendMode: "add", // Brighter effect
                  }}
                  initial={{ x: i % 2 === 0 ? "-100%" : "100%", opacity: 0 }}
                  animate={{ x: "0%", opacity: [0, 1, 0] }}
                  transition={{ duration: 0.15, delay: 2.8 + i * 0.06, ease: "easeOut" }}
                />
              ),
            )}
            {Array.from({ length: 12 }).map(
              (
                _,
                i, // More éclat for bullets
              ) => (
                <motion.div
                  key={`ds-bright-bullet-${i}`}
                  className="absolute rounded-full bg-orange-200"
                  style={{
                    width: "24px",
                    height: "24px",
                    left: `${4 + Math.random() * 92}%`,
                    top: `${4 + Math.random() * 92}%`,
                    boxShadow: "0 0 18px 10px #FF8C00, 0 0 35px 18px #FFA500, inset 0 0 8px #FFFFE0",
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: [0, 2.2, 1.6], opacity: [0, 1, 0] }}
                  transition={{ duration: 0.22, delay: 3.2 + i * 0.03, times: [0, 0.15, 1] }}
                />
              ),
            )}
            <motion.div // Larger, detailed explosion
              className="absolute top-[calc(50%-150px)] left-[calc(50%-150px)] w-[300px] h-[300px] rounded-full"
              style={{
                background:
                  "radial-gradient(circle, #FFFFFF 10%, #FFD700 28%, #FFA500 48%, #FF4500 68%, rgba(200,0,0,0.7) 82%, transparent 95%)",
                filter: "blur(10px) contrast(1.6)",
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.9, 1.4], opacity: [0, 1, 0] }}
              transition={{ duration: 0.6, delay: 3.8, ease: "circOut" }}
            >
              <Bomb
                width={160}
                height={160}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-red-800/75 opacity-65"
              />
            </motion.div>

            {/* Phase 4: Logo Disappearance (4.0s - 4.5s) */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              initial={{ opacity: 0, scale: 3.8, filter: "blur(14px)" }}
              animate={{
                opacity: [0, 1, 0.6, 0],
                scale: [3.8, 1, 1.4, 2.8],
                filter: ["blur(14px)", "blur(0px)", "blur(0px)", "blur(10px)"],
              }}
              transition={{ duration: 0.7, delay: 4.0, ease: "easeInOut" }}
            >
              <motion.div initial={{ opacity: 1 }} animate={{ opacity: 0.3 }} transition={{ duration: 1.2, ease: "easeOut" }}>
                <div className="w-[150px] h-[150px] bg-gradient-to-br from-orange-600 to-orange-800 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  DS
                </div>
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

  return <AnimatePresence mode="wait">{activeAnimation && renderAnimation()}</AnimatePresence>
}
