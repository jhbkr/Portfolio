"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTheme } from "@/components/theme-provider"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [currentPath, setCurrentPath] = useState('/')
  const { theme } = useTheme()

  // Initialisation côté client
  useEffect(() => {
    setIsClient(true)
    setCurrentPath(window.location.pathname)
    
    // Écouter les changements de route
    const handleRouteChange = () => {
      setCurrentPath(window.location.pathname)
    }
    
    window.addEventListener('popstate', handleRouteChange)
    
    return () => {
      window.removeEventListener('popstate', handleRouteChange)
    }
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
      // Attendre que la page soit chargée
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

    // Si c'est un lien externe (commence par /), utiliser Next.js Link
    if (sectionId.startsWith('/')) {
      window.location.href = sectionId
      setMobileMenuOpen(false)
      return
    }
    
    // Vérifier si on est sur la page d'accueil ou la page freelance
    const isOnHomePage = currentPath === '/'
    const isOnFreelancePage = currentPath === '/freelance'
    
    // Si on est sur la page freelance et qu'on clique sur une section
    if (isOnFreelancePage) {
      const section = document.getElementById(sectionId)
      if (section) {
        const offsetTop = section.offsetTop - 80
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
        setMobileMenuOpen(false)
      }
      return
    }
    
    // Si on est sur la page d'accueil et qu'on clique sur une section
    if (isOnHomePage) {
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
  }

  // Sections pour la page d'accueil
  const homeNavItems = [
    { name: "Accueil", href: "home" },
    { name: "À propos", href: "about" },
    { name: "Parcours", href: "timeline" },
    { name: "Projets", href: "projects" },
    { name: "Skills", href: "skills" },
    { name: "Freelance", href: "/freelance" },
    { name: "Contact", href: "contact" },
  ]

  // Sections pour la page freelance
  const freelanceNavItems = [
    { name: "Packs", href: "packs" },
    { name: "Process", href: "process" },
    { name: "TJM", href: "tjm" },
    { name: "Devis", href: "devis" },
    { name: "Options", href: "options" },
    { name: "FAQ", href: "faq" },
    { name: "Contact", href: "contact" },
  ]

  // Déterminer les sections à afficher selon la page
  const getNavItems = () => {
    if (!isClient) return homeNavItems
    return currentPath === '/freelance' ? freelanceNavItems : homeNavItems
  }

  const navItems = getNavItems()

  const getThemeBorderColor = () => {
    switch (theme) {
      case "robin":
        return "border-[#FF0000]"
      case "starfire":
        return "border-[#FF69B4]"
      case "cyborg":
        return "border-[#4169E1]"
      case "beastboy":
        return "border-[#32CD32]"
      case "raven":
        return "border-[#663399]"
      case "deathstroke":
        return "border-[#FF8C00]"
      default:
        return "border-primary"
    }
  }

  // Éviter le rendu avant l'hydratation pour éviter les erreurs d'hydratation
  if (!isClient) {
    return (
      <header className="fixed top-0 w-full z-50 transition-all duration-300 navbar-stable bg-background/90 backdrop-blur-md shadow-md border-b-2 border-primary">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="text-2xl font-bold">Jihad Bakari Portfolio</div>
          <div className="hidden md:flex items-center space-x-6">
            <div className="text-foreground/80">Accueil</div>
            <div className="text-foreground/80">À propos</div>
            <div className="text-foreground/80">Parcours</div>
            <div className="text-foreground/80">Projets</div>
            <div className="text-foreground/80">Skills</div>
            <div className="text-foreground/80">Freelance</div>
            <div className="text-foreground/80">Contact</div>
          </div>
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
        getThemeBorderColor(),
      )}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          href="/"
          className={cn(
            "text-2xl font-bold transition-colors",
            theme === "robin" && "text-[#FF0000]",
            theme === "starfire" && "text-[#FF69B4]",
            theme === "cyborg" && "text-[#4169E1]",
            theme === "beastboy" && "text-[#32CD32]",
            theme === "raven" && "text-[#663399]",
            theme === "deathstroke" && "text-[#FF8C00]",
          )}
        >
          {currentPath === '/freelance' ? 'Jihad Bakari Freelance' : 'Jihad Bakari Portfolio'}
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          {/* Bouton retour vers portfolio si on est sur la page freelance */}
          {currentPath === '/freelance' && (
            <Link
              href="/"
              className="text-foreground/80 hover:text-foreground transition-colors flex items-center gap-1 px-3 py-1 rounded-md border border-border hover:bg-background/50"
            >
              ← Retour Portfolio
            </Link>
          )}
          
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => scrollToSection(item.href)}
              className="text-foreground/80 hover:text-foreground transition-colors"
            >
              {item.name}
            </button>
          ))}
          <ThemeSwitcher />
        </nav>

        <div className="flex md:hidden items-center">
          <ThemeSwitcher />
          <Button variant="ghost" size="icon" className="ml-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {/* Bouton retour vers portfolio si on est sur la page freelance */}
            {currentPath === '/freelance' && (
              <Link
                href="/"
                className="text-foreground/80 hover:text-foreground transition-colors text-left flex items-center gap-2 px-3 py-1 rounded-md border border-border hover:bg-background/50"
              >
                ← Retour Portfolio
              </Link>
            )}
            
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="text-foreground/80 hover:text-foreground transition-colors py-2 text-left"
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
