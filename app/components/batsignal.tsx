"use client"

import { useTheme } from "@/components/theme-provider"
import { useEffect, useState } from "react"

export default function Batsignal() {
  const { theme } = useTheme()
  const [isActive, setIsActive] = useState(false)

  // Fonction pour activer le batsignal
  const activateBatsignal = () => {
    setIsActive(true)
    setTimeout(() => {
      setIsActive(false)
    }, 3000) // Désactiver après 3 secondes
  }

  // Activer le batsignal lors du changement de thème
  useEffect(() => {
    activateBatsignal()
  }, [theme])

  // Ajouter un écouteur d'événement pour la combinaison de touches secrète (Alt+B)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.key === "b") {
        activateBatsignal()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  return <div className={`batsignal ${isActive ? "active" : ""}`} aria-hidden="true"></div>
}
