"use client"

import { useTheme } from "@/components/theme-provider"
import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { AnimatePresence } from "framer-motion"

// Extracted animation components
import { RobinAnimation } from "./animations/robin-animation"
import { StarfireAnimation } from "./animations/starfire-animation"
import { BeastBoyAnimation } from "./animations/beastboy-animation"
import { RavenAnimation } from "./animations/raven-animation"
import { CyborgAnimation } from "./animations/cyborg-animation"
import { DeathstrokeAnimation } from "./animations/deathstroke-animation"

const ANIMATION_DURATION = 7000 // 7 seconds

const imagesToPreload = [
  "/images/intro/gotham-skyline.png",
  "/images/intro/robin-acrobatic-pose.png",
  "/images/intro/starfire.png",
  "/images/intro/raven.png",
  "/images/intro/deathstroke.png",
]

export default function ThemeChangeAnimator() {
  const { theme } = useTheme()
  const [activeAnimation, setActiveAnimation] = useState<string | null>(null)
  const [animationKey, setAnimationKey] = useState(0)
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
  const [lastPath, setLastPath] = useState<string | null>(null)

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
    console.log("[DEBUG] Theme Effect Triggered:", { theme, lastPath })
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
      console.log("[DEBUG] Triggering standard animation for:", theme)
      setAnimationKey((prevKey) => prevKey + 1)
      setActiveAnimation(theme)

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

      const timer = setTimeout(() => {
        setActiveAnimation(null)
      }, ANIMATION_DURATION)

      return () => {
        clearTimeout(timer)
      }
    }

    setLastPath(currentPath)
  }, [theme, lastPath])

  const renderAnimation = () => {
    if (!activeAnimation || windowSize.width === 0) {
      console.log("[DEBUG] renderAnimation skipped:", { activeAnimation, width: windowSize.width })
      return null;
    }
    const { width: w, height: h } = windowSize;
    console.log('Active animation:', activeAnimation);
    switch (activeAnimation) {
      case "robin":
        return <RobinAnimation w={w} h={h} animationKey={animationKey} />;
      case "starfire":
        return <StarfireAnimation w={w} h={h} animationKey={animationKey} />;
      case "beastboy":
        return <BeastBoyAnimation w={w} h={h} animationKey={animationKey} />;
      case "raven":
        return <RavenAnimation w={w} h={h} animationKey={animationKey} />;
      case "cyborg":
        return <CyborgAnimation w={w} h={h} animationKey={animationKey} />;
      case "deathstroke":
        return <DeathstrokeAnimation w={w} h={h} animationKey={animationKey} />;
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
