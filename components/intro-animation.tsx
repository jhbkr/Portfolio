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
            {/* Masque de lumière - Effet "détecté par le spot" */}
            {currentCharacter === 0 && foundTarget && (
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                  mixBlendMode: "screen",
                  mask: "radial-gradient(circle at center, white 0%, transparent 70%)",
                  WebkitMask: "radial-gradient(circle at center, white 0%, transparent 70%)",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-red-500/20 to-transparent" />
              </motion.div>
            )}

            {/* Camera shake - Quand le grappin accroche */}
            {currentCharacter === 0 && foundTarget && (
              <motion.div
                className="absolute inset-0 pointer-events-none"
                animate={{
                  x: [0, -2, 2, -1, 1, 0],
                  y: [0, 1, -1, 2, -2, 0],
                }}
                transition={{
                  duration: 0.3,
                  delay: 1.2,
                  ease: "easeInOut",
                }}
              />
            )}

            {/* Gouttes sur la lentille - Effet pluie ciné */}
            {currentCharacter === 0 && (
              <>
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={`raindrop-${i}`}
                    className="absolute w-2 h-2 rounded-full bg-white/30"
                    style={{
                      left: `${15 + i * 15}%`,
                      top: `${10 + i * 12}%`,
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: [0, 0.6, 0],
                      scale: [0, 1, 0.8],
                      y: [0, 20, 40],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "loop",
                      delay: i * 0.3,
                    }}
                  />
                ))}
              </>
            )}

            {/* Batarang en gros plan avec motion blur - Effet "wahou" */}
            {currentCharacter === 0 && foundTarget && (
              <motion.div
                className="absolute w-32 h-32 pointer-events-none"
                style={{
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  filter: "blur(2px)",
                }}
                initial={{
                  x: "-200%",
                  y: "-200%",
                  rotate: 0,
                  scale: 0.5,
                  opacity: 0,
                }}
                animate={{
                  x: "200%",
                  y: "200%",
                  rotate: 720,
                  scale: 2,
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 0.8,
                  delay: 1.5,
                  ease: "easeInOut",
                }}
              >
                <svg viewBox="0 0 24 24" fill="rgba(255, 0, 0, 0.9)" className="w-full h-full">
                  <path d="M12,2L4,12L12,22L20,12L12,2M12,5.5L17,12L12,18.5L7,12L12,5.5Z" />
                </svg>
              </motion.div>
            )}

            {/* Batarangs volants - Version améliorée */}
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

            {/* Fumée de Gotham - Version améliorée */}
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
            {/* Comète avec rubans plasma */}
            {currentCharacter === 1 && (
              <motion.div
                className="absolute w-4 h-4 pointer-events-none"
                style={{
                  left: "20%",
                  top: "30%",
                  background: "radial-gradient(circle, rgba(255,105,180,1) 0%, rgba(255,105,180,0) 70%)",
                  boxShadow: "0 0 20px 10px rgba(255,105,180,0.6)",
                }}
                initial={{ x: "-100%", y: "50%", scale: 0 }}
                animate={{
                  x: "50%",
                  y: "50%",
                  scale: [0, 1, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  ease: "easeInOut",
                }}
              >
                {/* Rubans plasma en orbite */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={`plasma-${i}`}
                    className="absolute w-1 h-20"
                    style={{
                      background: "linear-gradient(to bottom, rgba(255,105,180,0.8), transparent)",
                      left: "50%",
                      top: "50%",
                      transformOrigin: "center top",
                    }}
                    initial={{ rotate: i * 120, scaleY: 0 }}
                    animate={{
                      rotate: [i * 120, i * 120 + 360],
                      scaleY: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      delay: 0.5 + i * 0.2,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </motion.div>
            )}

            {/* Iris qui se referme - Signature Starfire */}
            {currentCharacter === 1 && foundTarget && (
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "conic-gradient(from 0deg, transparent, rgba(255,105,180,0.3), transparent)",
                  borderRadius: "50%",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                }}
                initial={{ width: "100vw", height: "100vh", opacity: 0 }}
                animate={{
                  width: "0px",
                  height: "0px",
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1,
                  delay: 1.8,
                  ease: "easeInOut",
                }}
              />
            )}

            {/* Explosion douce - Signature Starfire */}
            {currentCharacter === 1 && foundTarget && (
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "radial-gradient(circle, rgba(255,105,180,0.2) 0%, transparent 70%)",
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 2, 3],
                  opacity: [0, 0.6, 0],
                }}
                transition={{
                  duration: 1.2,
                  delay: 2.2,
                  ease: "easeOut",
                }}
              />
            )}

            {/* Bokeh cosmique - Grands disques flous qui respirent */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={`bokeh-${i}`}
                className="absolute rounded-full"
                style={{
                  background: "radial-gradient(circle, rgba(255,105,180,0.1) 0%, transparent 70%)",
                  width: `${80 + i * 40}px`,
                  height: `${80 + i * 40}px`,
                  left: `${20 + i * 15}%`,
                  top: `${30 + i * 10}%`,
                  filter: "blur(10px)",
                }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{
                  opacity: [0, 0.3, 0],
                  scale: [0.5, 1.2, 0.8],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                  delay: i * 0.5,
                }}
              />
            ))}

            {/* Gravité lumineuse - Distorsion finale */}
            {currentCharacter === 1 && foundTarget && (
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse at center, transparent 0%, rgba(255,105,180,0.1) 50%, transparent 100%)",
                }}
                initial={{ scale: 1, opacity: 0 }}
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0, 0.4, 0],
                }}
                transition={{
                  duration: 0.8,
                  delay: 2.5,
                  ease: "easeInOut",
                }}
              />
            )}

            {/* Rayons d'énergie - Version améliorée */}
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

            {/* Étoiles flottantes - Version améliorée */}
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
            {/* Morphing "silhouette → emoji → photo" */}
            {currentCharacter === 2 && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {/* Phase 1: Silhouette animale verte */}
                <motion.div
                  className="absolute"
                  initial={{ opacity: 1, scale: 1 }}
                  animate={{ opacity: [1, 0, 0], scale: [1, 1.2, 0.8] }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                  <svg viewBox="0 0 24 24" fill="rgba(50,205,50,0.8)" width="100" height="100">
                    <path d="M8,3L8,7.5L10,9.5L10,11.5L8,13.5L8,15.5L11,18.5L11,20.5L9,21.5L7,20.5L7,18.5L5,16.5L3,17.5L2,16.5L3,14.5L5,13.5L5,11.5L3,9.5L5,7.5L5,3L8,3M19,3L22,7.5L20,9.5L18,13.5L19,15.5L19,20.5L16,21.5L13,20.5L13,18.5L16,17.5L16,15.5L15,13.5L15,9.5L14,7.5L16,3L19,3Z" />
                  </svg>
                </motion.div>

                {/* Flash de transition */}
                <motion.div
                  className="absolute inset-0 bg-white"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 0.2, delay: 0.8 }}
                />

                {/* Phase 2: Emoji */}
                <motion.div
                  className="absolute text-6xl"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.8] }}
                  transition={{ duration: 0.6, delay: 1.0 }}
                >
                  🐺
                </motion.div>

                {/* Flash de transition */}
                <motion.div
                  className="absolute inset-0 bg-white"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 0.2, delay: 1.6 }}
                />

                {/* Phase 3: Image finale */}
                <motion.div
                  className="absolute"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: [0, 1], scale: [0.8, 1] }}
                  transition={{ duration: 0.4, delay: 1.8 }}
                >
                  <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">BB</span>
                  </div>
                </motion.div>
              </div>
            )}
            {/* Empreintes qui convergent vers le centre - "retour à l'humain" */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`paw-converge-${i}`}
                className="absolute w-4 h-4"
                style={{
                  left: `${20 + i * 10}%`,
                  top: `${30 + i * 8}%`,
                }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{
                  opacity: [0, 0.7, 0],
                  scale: [0.5, 1, 0.8],
                  x: [0, -50 - i * 10],
                  y: [0, -30 - i * 5],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.1,
                  ease: "easeInOut",
                }}
              >
                <svg viewBox="0 0 24 24" fill="rgba(50,205,50,0.7)">
                  <path d="M12,3C10.89,3 10,3.89 10,5C10,6.11 10.89,7 12,7C13.11,7 14,6.11 14,5C14,3.89 13.11,3 12,3M12,8C10.89,8 10,8.89 10,10C10,11.11 10.89,12 12,12C13.11,12 14,11.11 14,10C14,8.89 13.11,8 12,8M12,13C10.89,13 10,13.89 10,15C10,16.11 10.89,17 12,17C13.11,17 14,16.11 14,15C14,13.89 13.11,13 12,13M8,18C6.89,18 6,18.89 6,20C6,21.11 6.89,22 8,22C9.11,22 10,21.11 10,20C10,18.89 9.11,18 8,18M16,18C14.89,18 14,18.89 14,20C14,21.11 14.89,22 16,22C17.11,22 18,21.11 18,20C18,18.89 17.11,18 16,18Z" />
                </svg>
              </motion.div>
            ))}

            {/* Souffle de jungle - Fog vert en "wind sweep" horizontal */}
            {currentCharacter === 2 && foundTarget && (
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "linear-gradient(90deg, transparent 0%, rgba(50,205,50,0.1) 50%, transparent 100%)",
                }}
                initial={{ x: "-100%", opacity: 0 }}
                animate={{
                  x: "100%",
                  opacity: [0, 0.3, 0],
                }}
                transition={{
                  duration: 1.5,
                  delay: 2.0,
                  ease: "easeInOut",
                }}
              />
            )}

            {/* ADN double hélice */}
            {currentCharacter === 2 && (
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={`dna-${i}`}
                    className="absolute w-2 h-2 bg-green-400 rounded-full"
                    style={{
                      left: `${50 + Math.sin(i * 0.3) * 20}%`,
                      top: `${10 + i * 4}%`,
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: [0, 0.8, 0],
                      scale: [0, 1, 0.8],
                    }}
                    transition={{
                      duration: 2,
                      delay: i * 0.1,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "loop",
                    }}
                  />
                ))}
              </div>
            )}
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
            {/* Anneau d'encre qui se propage - Effet arcane */}
            {currentCharacter === 3 && foundTarget && (
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                  mixBlendMode: "difference",
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 2, 4],
                  opacity: [0, 0.3, 0],
                }}
                transition={{
                  duration: 1.5,
                  delay: 0.5,
                  ease: "easeOut",
                }}
              >
                <div className="absolute inset-0 rounded-full border-4 border-purple-600" />
              </motion.div>
            )}

            {/* Corbeaux qui forment un portail elliptique */}
            {currentCharacter === 3 && (
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={`crow-${i}`}
                    className="absolute w-6 h-6"
                    style={{
                      left: `${30 + i * 10}%`,
                      top: `${20 + i * 15}%`,
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0.8],
                      x: [0, 50 * Math.cos(i * 60 * Math.PI / 180)],
                      y: [0, 30 * Math.sin(i * 60 * Math.PI / 180)],
                    }}
                    transition={{
                      duration: 2,
                      delay: i * 0.2,
                      ease: "easeInOut",
                    }}
                  >
                    <svg viewBox="0 0 24 24" fill="rgba(102,51,153,0.8)">
                      <path d="M12,2C13.1,2 14,2.9 14,4C14,5.1 13.1,6 12,6C10.9,6 10,5.1 10,4C10,2.9 10.9,2 12,2M21,9V7L15,13L11,9L3,17V19L11,11L15,15L21,9Z" />
                    </svg>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Explosion en particules violettes */}
            {currentCharacter === 3 && foundTarget && (
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(15)].map((_, i) => (
                  <motion.div
                    key={`particle-${i}`}
                    className="absolute w-2 h-2 bg-purple-600 rounded-full"
                    style={{
                      left: "50%",
                      top: "50%",
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                      x: [0, (Math.random() - 0.5) * 200],
                      y: [0, (Math.random() - 0.5) * 200],
                    }}
                    transition={{
                      duration: 2,
                      delay: 1.5 + i * 0.1,
                      ease: "easeOut",
                    }}
                  />
                ))}
              </div>
            )}

            {/* Time-freeze sur "Zinthos" */}
            {currentCharacter === 3 && foundTarget && (
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "rgba(102,51,153,0.1)",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{
                  duration: 0.2,
                  delay: 2.0,
                }}
              />
            )}

            {/* Runes flottantes */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`rune-${i}`}
                className="absolute w-8 h-8 text-purple-600"
                style={{
                  left: `${15 + i * 12}%`,
                  top: `${25 + i * 8}%`,
                }}
                initial={{ opacity: 0, rotate: 0 }}
                animate={{
                  opacity: [0, 0.6, 0],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  delay: i * 0.3,
                }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8Z" />
                </svg>
              </motion.div>
            ))}

            {/* Pluie - Version améliorée */}
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

            {/* Nuages sombres - Version améliorée */}
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

            {/* Éclairs - Version améliorée */}
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
            {/* Glitch datamosh au boot */}
            {currentCharacter === 4 && foundTarget && (
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "linear-gradient(90deg, transparent 0%, rgba(65,105,225,0.1) 50%, transparent 100%)",
                }}
                initial={{ opacity: 0, y: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  y: [0, 2, 0],
                }}
                transition={{
                  duration: 0.1,
                  delay: 0.3,
                  repeat: 3,
                  repeatType: "loop",
                }}
              />
            )}

            {/* Scanlines */}
            {currentCharacter === 4 && foundTarget && (
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={`scanline-${i}`}
                    className="absolute w-full h-[1px] bg-blue-500/20"
                    style={{
                      top: `${i * 5}%`,
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{
                      duration: 0.05,
                      delay: 0.3 + i * 0.01,
                    }}
                  />
                ))}
              </div>
            )}

            {/* Chroma split */}
            {currentCharacter === 4 && foundTarget && (
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "linear-gradient(90deg, rgba(255,0,0,0.1) 0%, transparent 50%, rgba(0,0,255,0.1) 100%)",
                }}
                initial={{ x: 0 }}
                animate={{ x: [0, 2, -2, 0] }}
                transition={{
                  duration: 0.1,
                  delay: 0.4,
                  repeat: 2,
                  repeatType: "loop",
                }}
              />
            )}

            {/* Ouverture de l'œil rouge */}
            {currentCharacter === 4 && foundTarget && (
              <motion.div
                className="absolute w-16 h-16 bg-red-600 rounded-full pointer-events-none"
                style={{
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  boxShadow: "0 0 20px 10px rgba(255,0,0,0.5)",
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 1, 1.2, 1],
                  opacity: [0, 1, 0.8, 1],
                }}
                transition={{
                  duration: 0.5,
                  delay: 0.6,
                  ease: "easeOut",
                }}
              />
            )}

            {/* Onde sonique avec circuits imprimés */}
            {currentCharacter === 4 && foundTarget && (
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={`sonic-${i}`}
                    className="absolute rounded-full border-2 border-blue-500"
                    style={{
                      left: "50%",
                      top: "50%",
                      transform: "translate(-50%, -50%)",
                      width: `${100 + i * 50}px`,
                      height: `${100 + i * 50}px`,
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      scale: [0, 1, 2],
                      opacity: [0, 0.6, 0],
                    }}
                    transition={{
                      duration: 1,
                      delay: 1.0 + i * 0.2,
                      ease: "easeOut",
                    }}
                  >
                    {/* Circuits imprimés */}
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                      <path
                        d="M10,50 L30,30 L70,30 L90,50 L70,70 L30,70 Z"
                        fill="none"
                        stroke="rgba(65,105,225,0.8)"
                        strokeWidth="1"
                        strokeDasharray="5,5"
                      />
                    </svg>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Overlay HUD - Barres CPU */}
            {currentCharacter === 4 && foundTarget && (
              <div className="absolute top-4 left-4 pointer-events-none">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={`cpu-${i}`}
                    className="w-20 h-2 bg-gray-800 border border-blue-500 mb-1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: 1.5 + i * 0.1,
                    }}
                  >
                    <motion.div
                      className="h-full bg-blue-500"
                      initial={{ width: "0%" }}
                      animate={{ width: `${60 + i * 10}%` }}
                      transition={{
                        duration: 0.5,
                        delay: 1.8 + i * 0.1,
                      }}
                    />
                  </motion.div>
                ))}

                {/* "LINK ESTABLISHED" */}
                <motion.div
                  className="text-blue-500 text-xs font-mono mt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0.3,
                    delay: 2.0,
                  }}
                >
                  LINK ESTABLISHED
                </motion.div>
              </div>
            )}

            {/* Extinction des barres HUD */}
            {currentCharacter === 4 && foundTarget && (
              <div className="absolute top-4 left-4 pointer-events-none">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={`cpu-off-${i}`}
                    className="w-20 h-2 bg-gray-800 border border-blue-500 mb-1"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0 }}
                    transition={{
                      duration: 0.2,
                      delay: 2.5 + i * 0.1,
                    }}
                  />
                ))}
              </div>
            )}

            {/* Lignes de circuit - Version améliorée */}
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

            {/* Points de données - Version améliorée */}
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
            {/* Scope overlay avec distance/vent */}
            {currentCharacter === 5 && foundTarget && (
              <div className="absolute top-4 right-4 pointer-events-none">
                <motion.div
                  className="text-orange-500 text-xs font-mono"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                >
                  <div>DIST: 247m</div>
                  <div>WIND: 3.2m/s</div>
                  <div>HUM: 67%</div>
                </motion.div>
              </div>
            )}

            {/* "TARGET ACQUIRED" */}
            {currentCharacter === 5 && foundTarget && (
              <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-orange-500 text-lg font-mono pointer-events-none"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.0 }}
              >
                TARGET ACQUIRED
              </motion.div>
            )}

            {/* Bullet time - Duplication fantôme */}
            {currentCharacter === 5 && foundTarget && (
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={`ghost-${i}`}
                    className="absolute w-32 h-32 border-2 border-orange-500 rounded-full"
                    style={{
                      left: "50%",
                      top: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                    initial={{ opacity: 0, scale: 1 }}
                    animate={{
                      opacity: [0, 0.3, 0],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 0.3,
                      delay: 1.5 + i * 0.1,
                      ease: "easeOut",
                    }}
                  />
                ))}
              </div>
            )}

            {/* Ricochets étincelles qui tracent "DS" */}
            {currentCharacter === 5 && foundTarget && (
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={`ricochet-${i}`}
                    className="absolute w-1 h-1 bg-orange-500 rounded-full"
                    style={{
                      left: `${30 + i * 5}%`,
                      top: `${40 + i * 3}%`,
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                      x: [0, (i % 2 === 0 ? 20 : -20)],
                      y: [0, (i % 3 === 0 ? 15 : -15)],
                    }}
                    transition={{
                      duration: 0.2,
                      delay: 2.0 + i * 0.05,
                      ease: "easeOut",
                    }}
                  />
                ))}
              </div>
            )}

            {/* Effet de visée et de cible - Version améliorée */}
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

            {/* Étincelles et balles - Version améliorée */}
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
                    fill
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
