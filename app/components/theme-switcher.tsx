"use client"

import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useEffect } from "react"
import { Sun, Moon, Palette } from "lucide-react"

type HeroTheme = "robin" | "starfire" | "cyborg" | "beastboy" | "raven" | "deathstroke" | "system" | "light" | "dark"

export function ThemeSwitcher() {
  const { setTheme } = useTheme()

  // Apply animation class when theme changes
  useEffect(() => {
    const body = document.body
    body.classList.add("theme-transition")

    const removeTransition = () => {
      body.classList.remove("theme-transition")
    }

    body.addEventListener("animationend", removeTransition)

    return () => {
      body.removeEventListener("animationend", removeTransition)
    }
  }, [])

  const heroes: { name: string; theme: HeroTheme; icon: string }[] = [
    { name: "Robin", theme: "robin", icon: "🎭" },
    { name: "Starfire", theme: "starfire", icon: "✨" },
    { name: "Cyborg", theme: "cyborg", icon: "🤖" },
    { name: "Beast Boy", theme: "beastboy", icon: "🐯" },
    { name: "Raven", theme: "raven", icon: "🔮" },
    { name: "Deathstroke", theme: "deathstroke", icon: "🎯" },
  ]

  const handleThemeChange = (theme: HeroTheme) => {
    setTheme(theme)

    // Activate batsignal effect when theme changes
    const batsignal = document.getElementById("batsignal")
    if (batsignal) {
      batsignal.classList.add("active")
      setTimeout(() => {
        batsignal.classList.remove("active")
      }, 2000)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <Palette className="absolute h-[1.2rem] w-[1.2rem] scale-0 transition-all robin:scale-100 starfire:scale-100 cyborg:scale-100 beastboy:scale-100 raven:scale-100 deathstroke:scale-100" />
          <span className="sr-only">Changer de thème</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleThemeChange("light")}>
          <Sun className="mr-2 h-4 w-4" />
          <span>Clair</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeChange("dark")}>
          <Moon className="mr-2 h-4 w-4" />
          <span>Sombre</span>
        </DropdownMenuItem>
        {heroes.map((hero) => (
          <DropdownMenuItem key={hero.theme} onClick={() => handleThemeChange(hero.theme)}>
            <span className="mr-2">{hero.icon}</span>
            <span>{hero.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
