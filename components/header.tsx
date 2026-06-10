"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTheme } from "@/components/theme-provider"

// Nav items for each page
const homeNavItems = [
  { name: "Accueil", href: "hero" },
  { name: "À propos", href: "about" },
  { name: "Parcours", href: "timeline" },
  { name: "Projets", href: "projects" },
  { name: "Skills", href: "skills" },
  { name: "Cybersécurité", href: "/cybersecurity" },
  { name: "Freelance", href: "/freelance" },
  { name: "Contact", href: "contact" },
]

const freelanceNavItems = [
  { name: "Services", href: "freelance-hero" },
  { name: "Expertise", href: "freelance-stats" },
  { name: "Projets", href: "freelance-projects" },
  { name: "Témoignages", href: "freelance-testimonials" },
  { name: "Contact", href: "contact-freelance" },
]

const cybersecurityNavItems = [
  { name: "Stats TryHackMe", href: "tryhackme" },
  { name: "Compétences", href: "skills" },
  { name: "Outils", href: "tools" },
  { name: "Portfolio", href: "/" },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const currentPath = usePathname()
  const { theme } = useTheme()
  const router = useRouter()

  // Initialisation côté client
  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isClient])

  // Gérer les ancres dans l'URL au chargement de la page
  useEffect(() => {
    if (!isClient) return

    const hash = window.location.hash
    if (hash) {
      setTimeout(() => {
        const section = document.getElementById(hash.substring(1))
        if (section) {
          const offsetTop = section.offsetTop - 80
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          })
        }
      }, 100)
    }
  }, [isClient])

  const scrollToSection = (sectionId: string) => {
    if (!isClient) return

    if (sectionId.startsWith('/')) {
      router.push(sectionId)
      setMobileMenuOpen(false)
      return
    }

    const section = document.getElementById(sectionId)
    if (section) {
      const offsetTop = section.offsetTop - 80
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
      setMobileMenuOpen(false)
    }
  }

  // Déterminer les sections à afficher selon la page
  const getNavItems = () => {
    if (currentPath === '/cybersecurity') return cybersecurityNavItems
    if (currentPath === '/freelance') return freelanceNavItems
    return homeNavItems
  }

  const navItems = getNavItems()

  const getThemeTextLinkColor = () => {
    if (currentPath === "/cybersecurity") return "hover:text-red-500"
    switch (theme) {
      case "robin": return "hover:text-[#FF0000]"
      case "starfire": return "hover:text-[#FF69B4]"
      case "beastboy": return "hover:text-[#32CD32]"
      case "raven": return "hover:text-[#663399]"
      case "cyborg": return "hover:text-[#4169E1]"
      case "deathstroke": return "hover:text-[#FF8C00]"
      default: return "hover:text-primary"
    }
  }

  const getThemeMobileMenuColor = () => {
    if (currentPath === "/cybersecurity") return "bg-red-500"
    switch (theme) {
      case "robin": return "bg-[#FF0000]"
      case "starfire": return "bg-[#FF69B4]"
      case "beastboy": return "bg-[#32CD32]"
      case "raven": return "bg-[#663399]"
      case "cyborg": return "bg-[#4169E1]"
      case "deathstroke": return "bg-[#FF8C00]"
      default: return "bg-primary"
    }
  }

  const getThemeBorderColor = () => {
    switch (theme) {
      case "robin": return "border-[#FF0000]"
      case "starfire": return "border-[#FF69B4]"
      case "cyborg": return "border-[#4169E1]"
      case "beastboy": return "border-[#32CD32]"
      case "raven": return "border-[#663399]"
      case "deathstroke": return "border-[#FF8C00]"
      default: return "border-primary"
    }
  }

  const getThemeLogoColor = () => {
    switch (theme) {
      case "robin": return "bg-[#FF0000] shadow-[0_0_15px_rgba(255,0,0,0.5)]"
      case "starfire": return "bg-[#FF69B4] shadow-[0_0_15px_rgba(255,105,180,0.5)]"
      case "cyborg": return "bg-[#4169E1] shadow-[0_0_15px_rgba(65,105,225,0.5)]"
      case "beastboy": return "bg-[#32CD32] shadow-[0_0_15px_rgba(50,205,50,0.5)]"
      case "raven": return "bg-[#663399] shadow-[0_0_15px_rgba(102,51,153,0.5)]"
      case "deathstroke": return "bg-[#FF8C00] shadow-[0_0_15px_rgba(254,140,0,0.5)]"
      default: return "bg-primary shadow-[0_0_15px_rgba(var(--primary),0.5)]"
    }
  }

  const getThemeTextColor = () => {
    switch (theme) {
      case "robin": return "text-[#FF0000]"
      case "starfire": return "text-[#FF69B4]"
      case "cyborg": return "text-[#4169E1]"
      case "beastboy": return "text-[#32CD32]"
      case "raven": return "text-[#663399]"
      case "deathstroke": return "text-[#FF8C00]"
      default: return "text-primary"
    }
  }

  // Éviter le rendu avant l'hydratation pour éviter les erreurs d'hydratation
  if (!isClient) {
    return (
      <header className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 navbar-stable bg-background/90 backdrop-blur-md shadow-md border-b-2",
        currentPath === "/cybersecurity" ? "border-red-500/30" : "border-primary"
      )}>
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="text-2xl font-bold">Jihad Bakari Portfolio</div>
        </div>
      </header>
    )
  }

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 navbar-stable",
        isScrolled ? "bg-background/90 backdrop-blur-md shadow-md" : "bg-transparent",
        "border-b-2",
        currentPath === "/cybersecurity" ? "border-red-500/30" : getThemeBorderColor(),
      )}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          href="/"
          className={cn(
            "text-2xl font-bold transition-colors",
            currentPath === "/cybersecurity" ? "text-red-500" : (
              theme === "robin" && "text-[#FF0000]" ||
              theme === "starfire" && "text-[#FF69B4]" ||
              theme === "cyborg" && "text-[#4169E1]" ||
              theme === "beastboy" && "text-[#32CD32]" ||
              theme === "raven" && "text-[#663399]" ||
              theme === "deathstroke" && "text-[#FF8C00]"
            )
          )}
        >
          {currentPath === '/cybersecurity' ? 'Jihad Bakari CyberSec' : (currentPath === '/freelance' ? 'Jihad Bakari Freelance' : 'Jihad Bakari Portfolio')}
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          {(currentPath === '/freelance' || currentPath === '/cybersecurity') && (
            <Link
              href="/"
              className={cn(
                "transition-colors flex items-center gap-1 px-3 py-1 rounded-md border",
                currentPath === '/cybersecurity'
                  ? "text-red-500/80 hover:text-red-500 border-red-500/30 hover:bg-red-500/10"
                  : "text-foreground/80 hover:text-foreground border-border hover:bg-background/50"
              )}
            >
              ← Retour Portfolio
            </Link>
          )}

          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => scrollToSection(item.href)}
              className={cn(
                "transition-colors",
                currentPath === "/cybersecurity"
                  ? "text-red-400/80 hover:text-red-500"
                  : "text-foreground/80 hover:text-foreground"
              )}
            >
              {item.name}
            </button>
          ))}
          <ThemeSwitcher />
        </nav>

        <div className="flex md:hidden items-center">
          <ThemeSwitcher />
          <Button variant="ghost" size="icon" className="ml-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className={currentPath === "/cybersecurity" ? "text-red-500" : ""} /> : <Menu className={currentPath === "/cybersecurity" ? "text-red-500" : ""} />}
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className={cn(
          "md:hidden backdrop-blur-md",
          currentPath === "/cybersecurity" ? "bg-black/95 border-b border-red-500/20" : "bg-background/95"
        )}>
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {(currentPath === '/freelance' || currentPath === '/cybersecurity') && (
              <Link
                href="/"
                className={cn(
                  "transition-colors text-left flex items-center gap-2 px-3 py-1 rounded-md border",
                  currentPath === '/cybersecurity'
                    ? "text-red-500/80 border-red-500/30"
                    : "text-foreground/80 border-border"
                )}
              >
                ← Retour Portfolio
              </Link>
            )}

            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className={cn(
                  "transition-colors py-2 text-left",
                  currentPath === "/cybersecurity" ? "text-red-400 hover:text-red-500" : "text-foreground/80 hover:text-foreground"
                )}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
