"use client"

import { useTheme } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { Github, Twitter, Linkedin, Instagram } from "lucide-react"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"

export default function Footer() {
  const { theme } = useTheme()
  const currentPath = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const getThemeColor = () => {
    if (!mounted) return "text-primary"
    if (currentPath === "/cybersecurity") return "text-red-500"

    switch (theme) {
      case "robin":
        return "text-[#FF0000]"
      case "starfire":
        return "text-[#FF69B4]"
      case "cyborg":
        return "text-[#4169E1]"
      case "beastboy":
        return "text-[#32CD32]"
      case "raven":
        return "text-[#663399]"
      default:
        return "text-primary"
    }
  }

  const getThemeBgColor = () => {
    if (!mounted) return "bg-primary/10"
    if (currentPath === "/cybersecurity") return "bg-black"

    switch (theme) {
      case "robin":
        return "bg-[#FF0000]/10"
      case "starfire":
        return "bg-[#FF69B4]/10"
      case "cyborg":
        return "bg-[#4169E1]/10"
      case "beastboy":
        return "bg-[#32CD32]/10"
      case "raven":
        return "bg-[#663399]/10"
      default:
        return "bg-primary/10"
    }
  }

  return (
    <footer className={cn("py-8 border-t", currentPath === "/cybersecurity" ? "border-red-500/20 bg-black" : getThemeBgColor())}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link href="/" className={cn("text-xl font-bold", getThemeColor())}>
              {currentPath === "/cybersecurity" ? "Jihad Bakari CyberSec" : "Jihad Bakari Portfolio"}
            </Link>
            <p className="text-sm text-muted-foreground mt-1">&copy; {new Date().getFullYear()} All rights reserved</p>
          </div>

          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
            {/* Liens légaux */}
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link href="/mentions-legales" className={cn("text-muted-foreground transition-colors hover:text-foreground", currentPath === "/cybersecurity" && "hover:text-red-500")}>
                Mentions légales
              </Link>
              <Link href="/cgv" className={cn("text-muted-foreground transition-colors hover:text-foreground", currentPath === "/cybersecurity" && "hover:text-red-500")}>
                CGV
              </Link>
              <Link href="/politique-confidentialite" className={cn("text-muted-foreground transition-colors hover:text-foreground", currentPath === "/cybersecurity" && "hover:text-red-500")}>
                Politique de confidentialité
              </Link>
              <Link href="/contact" className={cn("text-muted-foreground transition-colors hover:text-foreground", currentPath === "/cybersecurity" && "hover:text-red-500")}>
                Contact
              </Link>
            </div>

            {/* Réseaux sociaux */}
            <div className="flex space-x-4">
              <a
                href="https://github.com/jhbkr"
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center bg-background hover:bg-muted transition-colors border",
                  currentPath === "/cybersecurity" ? "border-red-500/30 hover:bg-red-500/10 text-red-500" : "border-transparent"
                )}
                aria-label="GitHub"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/jihad-bakari/"
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center bg-background hover:bg-muted transition-colors border",
                  currentPath === "/cybersecurity" ? "border-red-500/30 hover:bg-red-500/10 text-red-500" : "border-transparent"
                )}
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
