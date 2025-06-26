"use client"

import { useTheme } from "@/components/theme-provider"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function ThemeEffects() {
  const { theme } = useTheme()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)

    // Ajouter la classe d'effet au body
    if (theme) {
      document.body.classList.remove(
        "robin-effect",
        "starfire-effect",
        "beastboy-effect",
        "raven-effect",
        "cyborg-effect",
        "deathstroke-effect",
      )

      if (theme !== "light" && theme !== "dark" && theme !== "system") {
        document.body.classList.add(`${theme}-effect`)
      }
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [theme])

  if (!isClient) return null

  const renderThemeEffect = () => {
    switch (theme) {
      case "robin":
        return (
          <>
            {/* Effet de batarang qui suit le curseur */}
            <motion.div
              className="fixed pointer-events-none z-50"
              style={{
                left: mousePosition.x - 15,
                top: mousePosition.y - 15,
                opacity: 0.7,
              }}
              animate={{
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            >
              <svg width="30" height="30" viewBox="0 0 24 24" fill="rgba(255, 0, 0, 0.5)">
                <path d="M12,2L4,12L12,22L20,12L12,2M12,5.5L17,12L12,18.5L7,12L12,5.5Z" />
              </svg>
            </motion.div>

            {/* Batarangs volants occasionnels */}
            {Array.from({ length: 3 }).map((_, i) => (
              <motion.div
                key={`robin-batarang-${i}`}
                className="fixed pointer-events-none z-40"
                style={{
                  width: "20px",
                  height: "20px",
                }}
                initial={{
                  x: "-10vw",
                  y: `${20 + i * 30}vh`,
                  opacity: 0,
                }}
                animate={{
                  x: "110vw",
                  y: [`${20 + i * 30}vh`, `${50 + i * 10}vh`, `${30 + i * 20}vh`],
                  opacity: [0, 1, 0],
                  rotate: 720,
                }}
                transition={{
                  duration: 8 + i * 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatDelay: 15 + i * 5,
                  ease: "easeInOut",
                  times: [0, 0.5, 1],
                }}
              >
                <svg viewBox="0 0 24 24" fill="rgba(255, 0, 0, 0.7)">
                  <path d="M12,2L4,12L12,22L20,12L12,2M12,5.5L17,12L12,18.5L7,12L12,5.5Z" />
                </svg>
              </motion.div>
            ))}
          </>
        )

      case "starfire":
        return (
          <>
            {/* Effet d'énergie stellaire autour du curseur */}
            <motion.div
              className="fixed pointer-events-none z-50"
              style={{
                left: mousePosition.x - 20,
                top: mousePosition.y - 20,
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(255,105,180,0.5) 0%, rgba(255,105,180,0) 70%)",
                boxShadow: "0 0 15px 8px rgba(255,105,180,0.3)",
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.7, 0.4, 0.7],
              }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />

            {/* Étoiles flottantes */}
            {Array.from({ length: 10 }).map((_, i) => (
              <motion.div
                key={`starfire-star-${i}`}
                className="fixed pointer-events-none z-40"
                style={{
                  width: `${2 + Math.random() * 4}px`,
                  height: `${2 + Math.random() * 4}px`,
                  background: "rgba(255,255,255,0.9)",
                  boxShadow: "0 0 5px 2px rgba(255,105,180,0.7)",
                  borderRadius: "50%",
                  left: `${Math.random() * 100}vw`,
                  top: `${Math.random() * 100}vh`,
                }}
                animate={{
                  opacity: [0.2, 0.8, 0.2],
                  scale: [1, 1.5, 1],
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                  delay: i * 0.2,
                }}
              />
            ))}

            {/* Rayons d'énergie occasionnels */}
            {Array.from({ length: 3 }).map((_, i) => (
              <motion.div
                key={`starfire-ray-${i}`}
                className="fixed pointer-events-none z-40"
                style={{
                  width: "2px",
                  height: `${50 + Math.random() * 100}px`,
                  background: "rgba(255,105,180,0.8)",
                  boxShadow: "0 0 8px 4px rgba(255,105,180,0.4)",
                  left: `${Math.random() * 100}vw`,
                  top: `${Math.random() * 50}vh`,
                  transformOrigin: "center bottom",
                }}
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{
                  scaleY: 1,
                  opacity: [0, 0.8, 0],
                }}
                transition={{
                  duration: 0.8 + Math.random() * 0.5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatDelay: 5 + i * 3,
                  delay: i * 2,
                }}
              />
            ))}
          </>
        )

      case "beastboy":
        return (
          <>
            {/* Effet de transformation animale autour du curseur */}
            <motion.div
              className="fixed pointer-events-none z-50"
              style={{
                left: mousePosition.x - 25,
                top: mousePosition.y - 25,
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(50,205,50,0.3) 0%, rgba(50,205,50,0) 70%)",
              }}
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

            {/* Empreintes d'animaux qui apparaissent au hasard */}
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.div
                key={`beastboy-paw-${i}`}
                className="fixed pointer-events-none z-40"
                style={{
                  width: "20px",
                  height: "20px",
                  opacity: 0,
                }}
                initial={{
                  x: `${Math.random() * 100}vw`,
                  y: `${Math.random() * 100}vh`,
                  rotate: Math.random() * 360,
                  opacity: 0,
                }}
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

            {/* Feuilles volantes */}
            {Array.from({ length: 3 }).map((_, i) => (
              <motion.div
                key={`beastboy-leaf-${i}`}
                className="fixed pointer-events-none z-40"
                style={{
                  width: "20px",
                  height: "20px",
                  color: "rgba(50,205,50,0.7)",
                }}
                initial={{
                  x: "-5vw",
                  y: `${20 + i * 30}vh`,
                  rotate: 0,
                  opacity: 0,
                }}
                animate={{
                  x: "105vw",
                  y: [`${20 + i * 30}vh`, `${50 + i * 10}vh`, `${30 + i * 20}vh`],
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
            {/* Effet de magie noire autour du curseur */}
            <motion.div
              className="fixed pointer-events-none z-50"
              style={{
                left: mousePosition.x - 20,
                top: mousePosition.y - 20,
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(102,51,153,0.6) 0%, rgba(102,51,153,0) 70%)",
                boxShadow: "0 0 15px 8px rgba(102,51,153,0.3)",
              }}
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

            {/* Pluie */}
            <div className="fixed inset-0 pointer-events-none z-40">
              {Array.from({ length: 50 }).map((_, i) => (
                <motion.div
                  key={`raven-rain-${i}`}
                  className="fixed w-[1px] h-[10px] bg-[#663399]/30"
                  style={{
                    left: `${Math.random() * 100}vw`,
                    top: `-10px`,
                  }}
                  initial={{ opacity: 0.7 }}
                  animate={{
                    y: "100vh",
                    opacity: 0,
                  }}
                  transition={{
                    duration: 0.8 + Math.random() * 0.5,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                    delay: i * 0.05,
                  }}
                />
              ))}
            </div>

            {/* Nuages sombres */}
            {Array.from({ length: 3 }).map((_, i) => (
              <motion.div
                key={`raven-cloud-${i}`}
                className="fixed rounded-full pointer-events-none z-30"
                style={{
                  background: "rgba(40, 20, 60, 0.5)",
                  width: 100 + Math.random() * 150,
                  height: 60 + Math.random() * 80,
                  filter: "blur(20px)",
                  top: `${Math.random() * 60}vh`,
                }}
                initial={{
                  x: "-20vw",
                  opacity: 0,
                }}
                animate={{
                  x: "120vw",
                  opacity: [0, 0.5, 0],
                }}
                transition={{
                  duration: 15 + Math.random() * 10,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  delay: i * 3,
                }}
              />
            ))}

            {/* Éclairs */}
            {Array.from({ length: 3 }).map((_, i) => (
              <motion.div
                key={`raven-lightning-${i}`}
                className="fixed pointer-events-none z-40"
                style={{
                  width: `${2 + Math.random() * 3}px`,
                  height: `${100 + Math.random() * 200}px`,
                  background: "rgba(102,51,153,0.8)",
                  boxShadow: "0 0 10px 5px rgba(102,51,153,0.5)",
                  left: `${Math.random() * 100}vw`,
                  top: `${Math.random() * 30}vh`,
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
            <motion.div
              className="fixed pointer-events-none z-50"
              style={{
                left: mousePosition.x,
                top: mousePosition.y,
                width: "2px",
                height: "2px",
                background: "rgba(65,105,225,0.9)",
                boxShadow: "0 0 5px 3px rgba(65,105,225,0.5)",
              }}
              animate={{
                scale: [1, 15, 1],
                opacity: [0, 0.8, 0],
              }}
              transition={{ duration: 1 }}
            />

            {/* Lignes de circuit */}
            {Array.from({ length: 10 }).map((_, i) => (
              <motion.div
                key={`cyborg-circuit-${i}`}
                className="fixed pointer-events-none z-40"
                style={{
                  width: `${50 + Math.random() * 150}px`,
                  height: "2px",
                  background: "rgba(65,105,225,0.7)",
                  left: `${Math.random() * 100}vw`,
                  top: `${Math.random() * 100}vh`,
                }}
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{
                  scaleX: 1,
                  opacity: [0, 0.8, 0],
                  x: [0, 20, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  delay: i * 0.8,
                }}
              />
            ))}

            {/* Points de données */}
            {Array.from({ length: 15 }).map((_, i) => (
              <motion.div
                key={`cyborg-data-${i}`}
                className="fixed w-1 h-1 rounded-full pointer-events-none z-40"
                style={{
                  background: "rgba(65,105,225,1)",
                  boxShadow: "0 0 3px 2px rgba(65,105,225,0.5)",
                  left: `${Math.random() * 100}vw`,
                  top: `${Math.random() * 100}vh`,
                }}
                initial={{ opacity: 0.2 }}
                animate={{
                  opacity: [0.2, 1, 0.2],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 1 + Math.random(),
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                  delay: i * 0.2,
                }}
              />
            ))}
          </>
        )

      case "deathstroke":
        return (
          <>
            {/* Effet de visée et de cible */}
            <motion.div
              className="fixed w-16 h-16 rounded-full border-2 border-[#FF8C00] pointer-events-none z-50"
              style={{
                left: mousePosition.x - 32,
                top: mousePosition.y - 32,
              }}
              animate={{
                scale: [1, 1.5],
                opacity: [0.8, 0],
              }}
              transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
            />
            <motion.div
              className="fixed pointer-events-none z-40"
              style={{
                left: mousePosition.x,
                top: 0,
                width: "1px",
                height: "100vh",
                background: "rgba(255,140,0,0.3)",
              }}
            />
            <motion.div
              className="fixed pointer-events-none z-40"
              style={{
                left: 0,
                top: mousePosition.y,
                width: "100vw",
                height: "1px",
                background: "rgba(255,140,0,0.3)",
              }}
            />

            {/* Étincelles et balles */}
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={`deathstroke-spark-${i}`}
                className="fixed w-2 h-2 rounded-full pointer-events-none z-40"
                style={{
                  background: "rgba(255,140,0,0.9)",
                  boxShadow: "0 0 5px 2px rgba(255,140,0,0.5)",
                }}
                initial={{
                  x: `${Math.random() * 100}vw`,
                  y: `${Math.random() * 100}vh`,
                  opacity: 0,
                }}
                animate={{
                  x: `${Math.random() * 100}vw`,
                  y: `${Math.random() * 100}vh`,
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 0.5 + Math.random() * 0.5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  delay: i * 0.7,
                }}
              />
            ))}

            {/* Traînées de balles */}
            {Array.from({ length: 3 }).map((_, i) => (
              <motion.div
                key={`deathstroke-bullet-${i}`}
                className="fixed w-4 h-1 rounded-full pointer-events-none z-40"
                style={{
                  background: "rgba(255,140,0,0.9)",
                  boxShadow: "0 0 5px 2px rgba(255,140,0,0.5)",
                }}
                initial={{
                  x: "-5vw",
                  y: `${20 + Math.random() * 60}vh`,
                  opacity: 0,
                }}
                animate={{
                  x: "105vw",
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  delay: i * 2.5,
                }}
              />
            ))}
          </>
        )

      default:
        return null
    }
  }

  return <div className="fixed inset-0 pointer-events-none z-50">{renderThemeEffect()}</div>
}
