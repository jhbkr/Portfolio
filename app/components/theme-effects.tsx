"use client"

import { useTheme } from "@/components/theme-provider"
import { useEffect } from "react"

export default function ThemeEffects() {
  const { theme } = useTheme()

  // Appliquer des effets spécifiques au thème
  useEffect(() => {
    // Supprimer toutes les classes d'effet précédentes
    document.body.classList.remove(
      "robin-effect",
      "starfire-effect",
      "cyborg-effect",
      "beastboy-effect",
      "raven-effect",
      "deathstroke-effect",
    )

    // Ajouter la classe d'effet correspondant au thème actuel
    if (theme === "robin") document.body.classList.add("robin-effect")
    if (theme === "starfire") document.body.classList.add("starfire-effect")
    if (theme === "cyborg") document.body.classList.add("cyborg-effect")
    if (theme === "beastboy") document.body.classList.add("beastboy-effect")
    if (theme === "raven") document.body.classList.add("raven-effect")
    if (theme === "deathstroke") document.body.classList.add("deathstroke-effect")

    // Ajouter un effet de transition de page
    const content = document.getElementById("main-content")
    if (content) {
      content.classList.add("page-transition-enter")
      setTimeout(() => {
        content.classList.remove("page-transition-enter")
        content.classList.add("page-transition-enter-active")
      }, 10)
      setTimeout(() => {
        content.classList.remove("page-transition-enter-active")
      }, 500)
    }
  }, [theme])

  return null
}
