"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

type Theme = "light" | "dark" | "robin" | "starfire" | "cyborg" | "beastboy" | "raven" | "deathstroke" | "system"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () =>
      (typeof localStorage !== "undefined" ? (localStorage.getItem(storageKey) as Theme) : defaultTheme) ||
      defaultTheme,
  )

  useEffect(() => {
    const root = window.document.documentElement

    // Remove all theme classes first
    root.classList.remove("light", "dark", "robin", "starfire", "cyborg", "beastboy", "raven", "deathstroke")

    // Apply theme effect classes
    document.body.classList.remove(
      "robin-effect",
      "starfire-effect",
      "cyborg-effect",
      "beastboy-effect",
      "raven-effect",
      "deathstroke-effect",
    )

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      root.classList.add(systemTheme)
      return
    }

    root.classList.add(theme)

    // Apply cursor effect based on theme
    if (theme === "robin") document.body.classList.add("robin-effect")
    if (theme === "starfire") document.body.classList.add("starfire-effect")
    if (theme === "cyborg") document.body.classList.add("cyborg-effect")
    if (theme === "beastboy") document.body.classList.add("beastboy-effect")
    if (theme === "raven") document.body.classList.add("raven-effect")
    if (theme === "deathstroke") document.body.classList.add("deathstroke-effect")
  }, [theme])

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme)
      setTheme(theme)
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined) throw new Error("useTheme must be used within a ThemeProvider")

  return context
}
