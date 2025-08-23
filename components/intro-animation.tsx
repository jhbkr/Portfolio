"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function IntroAnimation() {
  const [showIntro, setShowIntro] = useState(true)
  const [hasCheckedSession, setHasCheckedSession] = useState(false)
  const [currentCharacter, setCurrentCharacter] = useState(-1)
  const [spotlightPosition, setSpotlightPosition] = useState({ x: 0, y: 0 })
  const [foundTarget, setFoundTarget] = useState(false)
  const [showButton, setShowButton] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [currentEffect, setCurrentEffect] = useState<string | null>(null)
  const [waitingForClick, setWaitingForClick] = useState(false)

  // Utiliser useRef au niveau supérieur du composant
  const mousePositionRef = useRef({ ...mousePosition, throttle: false })

  // Vérifier si l'intro a déjà été jouée dans cette session
  useEffect(() => {
    if (hasCheckedSession || typeof window === 'undefined') return
    
    // Vérifier immédiatement pour éviter l'affichage du contenu principal
    const sessionIntroPlayed = sessionStorage.getItem('introAnimationPlayed')
    if (sessionIntroPlayed) {
      setShowIntro(false)
    }
    setHasCheckedSession(true)
  }, [hasCheckedSession])

  // Mettre à jour la référence quand mousePosition change
  useEffect(() => {
    mousePositionRef.current = { ...mousePosition, throttle: mousePositionRef.current?.throttle || false }
  }, [mousePosition])

  const characters = [
    {
      name: "Robin",
      image: "/images/intro/robin.png",
      effect: "robin",
      color: "#FF0000",
    },
    {
      name: "Starfire",
      image: "/images/intro/starfire.png",
      effect: "starfire",
      color: "#FF69B4",
    },
    {
      name: "Beast Boy",
      image: "/images/intro/beastboy.png",
      effect: "beastboy",
      color: "#32CD32",
    },
    {
      name: "Raven",
      image: "/images/intro/raven.png",
      effect: "raven",
      color: "#663399",
    },
    {
      name: "Cyborg",
      image: "/images/intro/cyborg.png",
      effect: "cyborg",
      color: "#4169E1",
    },
    {
      name: "Deathstroke",
      image: "/images/intro/deathstroke.png",
      effect: "deathstroke",
      color: "#FF8C00",
    },
  ]

  // Projecteur qui se déplace aléatoirement - Optimisé et fluidifié
  useEffect(() => {
    if (!showIntro || foundTarget) return

    const moveSpotlight = () => {
      const randomX = Math.random() * 80 - 40 // -40 à 40
      const randomY = Math.random() * 80 - 40 // -40 à 40

      setSpotlightPosition({ x: randomX, y: randomY })
    }

    const interval = setInterval(moveSpotlight, 600) // Plus fluide

    // Après quelques secondes, le projecteur "trouve" sa cible
    const targetTimer = setTimeout(() => {
      setSpotlightPosition({ x: 0, y: 0 })
      setFoundTarget(true)
      clearInterval(interval)

      // Commencer à afficher les personnages plus rapidement
      setTimeout(() => {
        setCurrentCharacter(0)
        setWaitingForClick(true)
      }, 300) // Plus rapide
    }, 2000) // Plus rapide

    return () => {
      clearInterval(interval)
      clearTimeout(targetTimer)
    }
  }, [showIntro, foundTarget])

  // Gestion du mouvement de la souris - Optimisé avec throttling
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!containerRef.current || !showIntro) return

      // Throttling pour améliorer les performances
      if (mousePositionRef.current.throttle) return
      
      mousePositionRef.current.throttle = true
      setTimeout(() => {
        mousePositionRef.current.throttle = false
      }, 8) // Plus fluide ~120fps

      const container = containerRef.current
      const rect = container.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      setMousePosition({ x, y })
    },
    [showIntro],
  )

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [handleMouseMove])

  // Définir l'effet actuel en fonction du personnage
  useEffect(() => {
    if (currentCharacter >= 0) {
      setCurrentEffect(characters[currentCharacter].effect)
    }
  }, [currentCharacter, characters])

  const handleNextCharacter = () => {
    if (currentCharacter < characters.length - 1) {
      setCurrentCharacter((prev) => prev + 1)
    } else {
      // Afficher le bouton après le dernier personnage
      setShowButton(true)
    }
  }

  const handleEnterSite = () => {
    setShowIntro(false)
    sessionStorage.setItem('introAnimationPlayed', 'true')
  }

  // Générer des éléments d'effet en fonction du personnage actuel
  const renderEffects = () => {
    if (!currentEffect) return null

    switch (currentEffect) {
      case "robin":
        return (
          <>
            {/* Effet de gadgets de Robin */}
            {currentCharacter === 0 && (
              <motion.div
                className="absolute"
                style={{
                  left: mousePositionRef.current.x - 15,
                  top: mousePositionRef.current.y - 15,
                  pointerEvents: "none",
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.8 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <svg width="30" height="30" viewBox="0 0 24 24" fill="rgba(255, 0, 0, 0.8)">
                  <path d="M17,2 L17,5 L19,5 L19,7 L22,7 L22,9 L19,9 L19,11 L17,11 L17,14 L14,14 L14,11 L12,11 L12,9 L14,9 L14,7 L12,7 L12,5 L14,5 L14,2 L17,2 Z M7,7 L7,9 L9,9 L9,7 L7,7 Z M7,11 L7,13 L9,13 L9,11 L7,11 Z M7,15 L7,17 L9,17 L9,15 L7,15 Z M3,7 L3,9 L5,9 L5,7 L3,7 Z M3,11 L3,13 L5,13 L5,11 L3,11 Z M3,15 L3,17 L5,17 L5,15 L3,15 Z" />
                </svg>
              </motion.div>
            )}
            {/* Batarangs volants - Optimisé */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={`batarang-${i}`}
                className="absolute w-8 h-8"
                style={{
                  color: "rgba(255, 0, 0, 0.8)",
                }}
                                  initial={{
                    x: `${20 + i * 30}%`,
                    y: "100%",
                    rotate: 0,
                  }}
                  animate={{
                    x: `${20 + i * 30}%`,
                    y: "-10%",
                    rotate: 360 * 3,
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                    delay: i * 0.8,
                  }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12,2L4,12L12,22L20,12L12,2M12,5.5L17,12L12,18.5L7,12L12,5.5Z" />
                </svg>
              </motion.div>
            ))}
            {/* Fumée de Gotham - Optimisé */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={`smoke-${i}`}
                  className="absolute rounded-full"
                                      style={{
                      background: "rgba(100,100,100,0.2)",
                      width: `${40 + i * 10}px`,
                      height: `${40 + i * 10}px`,
                      left: `${10 + i * 20}%`,
                      top: `${20 + i * 15}%`,
                    }}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{
                      opacity: [0, 0.2, 0],
                      scale: [0.5, 1.2, 1.5],
                      y: [0, -30, -60],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "loop",
                      delay: i * 1,
                    }}
                />
              ))}
            </div>
          </>
        )

      case "starfire":
        return (
          <>
            {/* Effet d'énergie stellaire */}
            {currentCharacter === 1 && (
              <motion.div
                className="absolute"
                style={{
                  left: mousePositionRef.current.x - 20,
                  top: mousePositionRef.current.y - 20,
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(255,105,180,1) 0%, rgba(255,105,180,0) 70%)",
                  boxShadow: "0 0 15px 8px rgba(255,105,180,0.5)",
                  pointerEvents: "none",
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.8, 0.4, 0.8],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              />
            )}
            {/* Rayons d'énergie - Optimisé */}
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={`ray-${i}`}
                className="absolute"
                                  style={{
                    width: "2px",
                    height: `${60 + i * 20}px`,
                    background: "rgba(255,105,180,0.8)",
                    boxShadow: "0 0 8px 4px rgba(255,105,180,0.4)",
                    left: `${20 + i * 20}%`,
                    top: `${10 + i * 25}%`,
                    transformOrigin: "center bottom",
                  }}
                  initial={{
                    scaleY: 0,
                    opacity: 0,
                    rotate: i * 45,
                  }}
                  animate={{
                    scaleY: 1,
                    opacity: [0, 0.8, 0],
                    rotate: i * 45,
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                    delay: i * 0.4,
                  }}
              />
            ))}
            {/* Étoiles flottantes - Optimisé */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`star-${i}`}
                className="absolute"
                                  style={{
                    width: `${3 + i}px`,
                    height: `${3 + i}px`,
                    background: "rgba(255,255,255,0.9)",
                    boxShadow: "0 0 5px 2px rgba(255,105,180,0.7)",
                    borderRadius: "50%",
                    left: `${15 + i * 12}%`,
                    top: `${20 + i * 10}%`,
                  }}
                  initial={{
                    opacity: 0.2,
                  }}
                  animate={{
                    opacity: [0.2, 0.8, 0.2],
                    scale: [1, 1.3, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                    delay: i * 0.3,
                  }}
              />
            ))}
          </>
        )

      case "beastboy":
        return (
          <>
            {/* Effet de transformation animale */}
            {currentCharacter === 2 && (
              <motion.div
                className="absolute"
                style={{
                  left: mousePositionRef.current.x - 25,
                  top: mousePositionRef.current.y - 25,
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(50,205,50,0.3) 0%, rgba(50,205,50,0) 70%)",
                  pointerEvents: "none",
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 1,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              >
                {/* Silhouettes d'animaux qui changent */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={Math.floor(Date.now() / 3000) % 3} // Change toutes les 3 secondes
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {Math.floor(Date.now() / 3000) % 3 === 0 && (
                      <svg viewBox="0 0 24 24" fill="rgba(50,205,50,0.8)" width="50" height="50">
                        <path d="M8,3L8,7.5L10,9.5L10,11.5L8,13.5L8,15.5L11,18.5L11,20.5L9,21.5L7,20.5L7,18.5L5,16.5L3,17.5L2,16.5L3,14.5L5,13.5L5,11.5L3,9.5L5,7.5L5,3L8,3M19,3L22,7.5L20,9.5L18,13.5L19,15.5L19,20.5L16,21.5L13,20.5L13,18.5L16,17.5L16,15.5L15,13.5L15,9.5L14,7.5L16,3L19,3Z" />
                      </svg>
                    )}
                    {Math.floor(Date.now() / 3000) % 3 === 1 && (
                      <svg viewBox="0 0 24 24" fill="rgba(50,205,50,0.8)" width="50" height="50">
                        <path d="M21,9H19V7H21V9M21,5H19V3H21V5M19,11H21V13H19V11M21,19H19V17H21V19M17,3H15V5H17V3M13,3H11V5H13V3M17,19H15V21H17V19M17,11H15V13H17V11M9,3H7V5H9V3M5,3H3V5H5V3M9,19H7V21H9V19M5,19H3V21H5V19M3,11H5V13H3V11M3,7H5V9H3V7M13,19H11V21H13V19M13,11H11V13H13V11Z" />
                      </svg>
                    )}
                    {Math.floor(Date.now() / 3000) % 3 === 2 && (
                      <svg viewBox="0 0 24 24" fill="rgba(50,205,50,0.8)" width="50" height="50">
                        <path d="M12,3C13.74,3 15.36,3.5 16.74,4.35C17.38,3.53 18.38,3 19.5,3A3.5,3.5 0 0,1 23,6.5C23,8 22.05,9.28 20.72,9.78C20.9,10.5 21,11.23 21,12A9,9 0 0,1 12,21A9,9 0 0,1 3,12C3,7.03 7.03,3 12,3Z" />
                      </svg>
                    )}
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            )}
            {/* Empreintes d'animaux - Optimisé */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={`paw-${i}`}
                className="absolute"
                style={{
                  width: "20px",
                  height: "20px",
                  opacity: 0.7,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                initial={{ opacity: 0, rotate: Math.random() * 360 }}
                animate={{
                  opacity: [0, 0.7, 0],
                  scale: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatDelay: 10 + i * 3,
                  delay: i * 2,
                }}
              >
                <svg viewBox="0 0 24 24" fill="rgba(50,205,50,0.7)">
                  <path d="M12,3C10.89,3 10,3.89 10,5C10,6.11 10.89,7 12,7C13.11,7 14,6.11 14,5C14,3.89 13.11,3 12,3M12,8C10.89,8 10,8.89 10,10C10,11.11 10.89,12 12,12C13.11,12 14,11.11 14,10C14,8.89 13.11,8 12,8M12,13C10.89,13 10,13.89 10,15C10,16.11 10.89,17 12,17C13.11,17 14,16.11 14,15C14,13.89 13.11,13 12,13M8,18C6.89,18 6,18.89 6,20C6,21.11 6.89,22 8,22C9.11,22 10,21.11 10,20C10,18.89 9.11,18 8,18M16,18C14.89,18 14,18.89 14,20C14,21.11 14.89,22 16,22C17.11,22 18,21.11 18,20C18,18.89 17.11,18 16,18Z" />
                </svg>
              </motion.div>
            ))}
            {/* Feuilles volantes - Optimisé */}
            {[...Array(2)].map((_, i) => (
              <motion.div
                key={`leaf-${i}`}
                className="absolute"
                style={{
                  width: "20px",
                  height: "20px",
                  color: "rgba(50,205,50,0.7)",
                }}
                initial={{
                  x: "-5%",
                  y: `${20 + i * 30}%`,
                  rotate: 0,
                  opacity: 0,
                }}
                animate={{
                  x: "105%",
                  y: [`${20 + i * 30}%`, `${50 + i * 10}%`, `${30 + i * 20}%`],
                  opacity: [0, 0.7, 0],
                  rotate: 360,
                }}
                transition={{
                  duration: 15,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatDelay: 20,
                  ease: "easeInOut",
                  times: [0, 0.5, 1],
                }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" />
                </svg>
              </motion.div>
            ))}
          </>
        )

      case "raven":
        return (
          <>
            {/* Effet de magie noire */}
            {currentCharacter === 3 && (
              <motion.div
                className="absolute"
                style={{
                  left: mousePositionRef.current.x - 20,
                  top: mousePositionRef.current.y - 20,
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(102,51,153,0.6) 0%, rgba(102,51,153,0) 70%)",
                  boxShadow: "0 0 15px 8px rgba(102,51,153,0.3)",
                  pointerEvents: "none",
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.6, 0.3, 0.6],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              />
            )}
            {/* Pluie - Optimisé */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={`rain-${i}`}
                  className="absolute w-[1px] h-[10px] bg-[#663399]/30"
                  style={{
                    left: `${5 + i * 5}%`,
                    top: `-10px`,
                  }}
                  initial={{ opacity: 0.7 }}
                  animate={{
                    y: "100vh",
                    opacity: 0,
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                    delay: i * 0.1,
                  }}
                />
              ))}
            </div>
            {/* Nuages sombres - Optimisé */}
            {[...Array(2)].map((_, i) => (
              <motion.div
                key={`cloud-${i}`}
                className="absolute rounded-full"
                                  style={{
                    background: "rgba(40, 20, 60, 0.5)",
                    width: 120 + i * 30,
                    height: 70 + i * 20,
                    filter: "blur(20px)",
                    top: `${20 + i * 30}%`,
                  }}
                  initial={{
                    x: "-20%",
                    opacity: 0,
                  }}
                  animate={{
                    x: "120%",
                    opacity: [0, 0.5, 0],
                  }}
                  transition={{
                    duration: 12,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                    delay: i * 4,
                  }}
              />
            ))}
            {/* Éclairs - Optimisé */}
            {[...Array(2)].map((_, i) => (
              <motion.div
                key={`lightning-${i}`}
                className="absolute"
                style={{
                  width: `${2 + Math.random() * 3}px`,
                  height: `${100 + Math.random() * 200}px`,
                  background: "rgba(102,51,153,0.8)",
                  boxShadow: "0 0 10px 5px rgba(102,51,153,0.5)",
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 30}%`,
                  transformOrigin: "center top",
                }}
                initial={{
                  scaleY: 0,
                  opacity: 0,
                }}
                animate={{
                  scaleY: 1,
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 0.3 + Math.random() * 0.2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  delay: i * 5 + Math.random() * 5,
                }}
              />
            ))}
          </>
        )

      case "cyborg":
        return (
          <>
            {/* Effet de circuits électroniques */}
            {currentCharacter === 4 && (
              <motion.div
                className="absolute"
                style={{
                  left: mousePositionRef.current.x,
                  top: mousePositionRef.current.y,
                  width: "2px",
                  height: "2px",
                  background: "rgba(65,105,225,0.9)",
                  boxShadow: "0 0 5px 3px rgba(65,105,225,0.5)",
                  pointerEvents: "none",
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [1, 15, 1],
                  opacity: [0, 0.8, 0],
                }}
                transition={{ duration: 1 }}
              />
            )}
            {/* Lignes de circuit - Optimisé */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={`circuit-${i}`}
                className="absolute"
                                  style={{
                    width: `${80 + i * 20}px`,
                    height: "2px",
                    background: "rgba(65,105,225,0.7)",
                    left: `${10 + i * 20}%`,
                    top: `${20 + i * 15}%`,
                  }}
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{
                    scaleX: 1,
                    opacity: [0, 0.8, 0],
                    x: [0, 15, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                    delay: i * 1,
                  }}
              />
            ))}
            {/* Points de données - Optimisé */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`data-${i}`}
                className="absolute w-1 h-1 rounded-full"
                style={{
                  background: "rgba(65,105,225,1)",
                  boxShadow: "0 0 3px 2px rgba(65,105,225,0.5)",
                  left: `${15 + i * 12}%`,
                  top: `${25 + i * 8}%`,
                }}
                initial={{ opacity: 0.2 }}
                animate={{
                  opacity: [0.2, 1, 0.2],
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  duration: 1,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                  delay: i * 0.3,
                }}
              />
            ))}
          </>
        )

      case "deathstroke":
        return (
          <>
            {/* Effet de visée et de cible */}
            {currentCharacter === 5 && (
              <>
                <motion.div
                  className="absolute w-16 h-16 rounded-full border-2 border-[#FF8C00]"
                  style={{
                    left: mousePositionRef.current.x - 32,
                    top: mousePositionRef.current.y - 32,
                    pointerEvents: "none",
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: [1, 1.5],
                    opacity: [0.8, 0],
                  }}
                  transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
                />
                <motion.div
                  className="absolute"
                  style={{
                    left: mousePositionRef.current.x,
                    top: 0,
                    width: "1px",
                    height: "100%",
                    background: "rgba(255,140,0,0.3)",
                    pointerEvents: "none",
                  }}
                />
                <motion.div
                  className="absolute"
                  style={{
                    left: 0,
                    top: mousePositionRef.current.y,
                    width: "100%",
                    height: "1px",
                    background: "rgba(255,140,0,0.3)",
                    pointerEvents: "none",
                  }}
                />
              </>
            )}
            {/* Étincelles et balles - Optimisé */}
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={`spark-${i}`}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  background: "rgba(255,140,0,0.9)",
                  boxShadow: "0 0 5px 2px rgba(255,140,0,0.5)",
                }}
                initial={{
                  x: `${20 + i * 20}%`,
                  y: `${30 + i * 15}%`,
                  opacity: 0,
                }}
                animate={{
                  x: `${60 + i * 10}%`,
                  y: `${20 + i * 20}%`,
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 0.5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  delay: i * 0.8,
                }}
              />
            ))}
          </>
        )

      default:
        return null
    }
  }

  return (
    <AnimatePresence>
      {showIntro && (
        <motion.div
          ref={containerRef}
          className="fixed inset-0 bg-black z-[9999] flex flex-col items-center justify-center overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          onClick={() => {
            if (waitingForClick && currentCharacter >= 0) {
              handleNextCharacter()
            }
          }}
        >
          {/* Projecteur qui se déplace */}
          <motion.div
            className="absolute w-[300px] h-[300px] rounded-full pointer-events-none"
            animate={{
              x: spotlightPosition.x + "vw",
              y: spotlightPosition.y + "vh",
              opacity: foundTarget ? 1 : [0.3, 0.7, 0.5],
              scale: foundTarget ? 1.2 : [0.8, 1.1, 0.9],
            }}
            transition={{
              duration: foundTarget ? 0.5 : 1,
              ease: "easeInOut",
            }}
            style={{
              background:
                "radial-gradient(circle, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.1) 50%, rgba(0,0,0,0) 70%)",
              boxShadow: "0 0 50px 30px rgba(255,255,255,0.1)",
            }}
          />

          {/* Faisceau du projecteur */}
          {foundTarget && (
            <motion.div
              className="absolute top-0 w-[100px] h-[100vh] pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.15 }}
              style={{
                background:
                  "linear-gradient(to bottom, rgba(255,255,255,0.1), rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.1))",
                transform: "perspective(500px) rotateX(20deg)",
              }}
            />
          )}

          {/* Effets spécifiques au personnage */}
          {renderEffects()}

          {/* Personnages */}
          <AnimatePresence mode="wait">
            {currentCharacter >= 0 && (
              <motion.div
                key={currentCharacter}
                className="relative z-10"
                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.5, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative w-[250px] h-[250px] flex items-center justify-center">
                  <Image
                    src={characters[currentCharacter].image || "/placeholder.svg"}
                    alt={characters[currentCharacter].name}
                    width={250}
                    height={250}
                    className="object-contain"
                    style={{ filter: "drop-shadow(0 0 10px rgba(255,255,255,0.5))" }}
                  />
                </div>

                <motion.div
                  className="text-white text-2xl font-bold text-center mt-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                >
                  {characters[currentCharacter].name}
                </motion.div>

                {waitingForClick && !showButton && (
                  <motion.div
                    className="text-white/60 text-sm text-center mt-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.4, 0.8, 0.4] }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                  >
                    Cliquez pour continuer
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bouton pour entrer sur le site */}
          <AnimatePresence>
            {showButton && (
              <motion.div
                className="absolute bottom-[20%]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Button
                  onClick={handleEnterSite}
                  className="px-8 py-6 text-lg bg-white text-black hover:bg-white/90 transition-all duration-300 rounded-full"
                  style={{ boxShadow: "0 0 20px rgba(255,255,255,0.5)" }}
                >
                  Découvrir le Portfolio
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
