"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight, ExternalLink, Github } from "lucide-react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

type Project = {
  id: number
  title: string
  description: string
  image: string
  tags: string[]
  githubUrl: string
  liveUrl: string
}

export default function ProjectsCarousel() {
  const { theme: rawTheme } = useTheme()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isAutoPlaying, setIsAutoPlaying] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)
  const autoPlayInterval = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Auto-play
  useEffect(() => {
    if (isAutoPlaying && !isPaused) {
      autoPlayInterval.current = setInterval(() => {
        nextProject()
      }, 5000) // Change every 5 seconds
    }
    return () => {
      if (autoPlayInterval.current) {
        clearInterval(autoPlayInterval.current)
      }
    }
  }, [isAutoPlaying, isPaused, currentIndex])

  // Navigation clavier
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        prevProject()
      } else if (e.key === "ArrowRight") {
        nextProject()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const theme = mounted ? rawTheme : "system"

  const projects: Project[] = [
    {
      id: 1,
      title: "My Twitter",
      description: "Un clone de Twitter avec les fonctionnalités principales comme tweeter, retweeter et liker.",
      image: "/images/project/Twitter.png",
      tags: ["Next.js", "Tailwind CSS", "TypeScript", "SQL"],
      githubUrl: "#",
      liveUrl: "https://twitter.m-aydin.fr/auth/login",
    },
    {
      id: 2,
      title: "Site Portfolio",
      description: "Un site portfolio responsive présentant des projets et compétences avec un thème unique.",
      image: "/placeholder.svg?height=300&width=500",
      tags: ["Next.js", "Framer Motion", "Tailwind CSS"],
      githubUrl: "#",
      liveUrl: "#",
    },
    {
      id: 3,
      title: "My Snapchat",
      description: "Une application mobile inspirée de Snapchat pour envoyer des snaps et discuter.",
      image: "/images/project/snap-conversation.png",
      tags: ["React Native", "TypeScript", "API REST"],
      githubUrl: "#",
      liveUrl: "#",
    },
    {
      id: 4,
      title: "E-commerce",
      description: "Projet e-commerce complet réalisé en équipe de 6 personnes. En tant que Scrum Master, j'ai coordonné le développement de toutes les fonctionnalités : catalogue produits, panier d'achat, système de paiement, gestion des commandes, authentification utilisateur, panel administrateur et système de notation.",
      image: "/placeholder.svg?height=300&width=500",
      tags: ["React", "Node.js", "Express", "MongoDB", "Stripe", "JWT", "Redux"],
      githubUrl: "#",
      liveUrl: "#",
    },
  ]

  const nextProject = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length)
    setTimeout(() => setIsTransitioning(false), 600)
  }

  const prevProject = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length)
    setTimeout(() => setIsTransitioning(false), 600)
  }

  const goToProject = (index: number) => {
    if (isTransitioning || index === currentIndex) return
    setIsTransitioning(true)
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
    setTimeout(() => setIsTransitioning(false), 600)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 100) {
      nextProject()
    } else if (touchEndX.current - touchStartX.current > 100) {
      prevProject()
    }
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95,
    }),
  }

  const getThemeColor = () => {
    switch (theme) {
      case "robin":
        return "bg-[#FF0000]"
      case "starfire":
        return "bg-[#FF69B4]"
      case "cyborg":
        return "bg-[#4169E1]"
      case "beastboy":
        return "bg-[#32CD32]"
      case "raven":
        return "bg-[#663399]"
      case "deathstroke":
        return "bg-[#FF8C00]"
      default:
        return "bg-primary"
    }
  }

  const getThemeTextColor = () => {
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
      case "deathstroke":
        return "text-[#FF8C00]"
      default:
        return "text-primary"
    }
  }

  return (
    <section id="projects" className="py-24 md:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Mes Projets</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-4">
            Découvrez quelques-uns de mes travaux récents. Utilisez les flèches du clavier ou faites glisser pour naviguer.
          </p>
          <div className="flex items-center justify-center gap-4">
            <span className={cn("text-sm font-medium", getThemeTextColor())}>
              {currentIndex + 1} / {projects.length}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className={cn(
                "gap-2 border-2",
                theme === "robin" && "border-[#FF0000] text-[#FF0000] hover:bg-[#FF0000]/10",
                theme === "starfire" && "border-[#FF69B4] text-[#FF69B4] hover:bg-[#FF69B4]/10",
                theme === "cyborg" && "border-[#4169E1] text-[#4169E1] hover:bg-[#4169E1]/10",
                theme === "beastboy" && "border-[#32CD32] text-[#32CD32] hover:bg-[#32CD32]/10",
                theme === "raven" && "border-[#663399] text-[#663399] hover:bg-[#663399]/10",
                theme === "deathstroke" && "border-[#FF8C00] text-[#FF8C00] hover:bg-[#FF8C00]/10",
              )}
            >
              {isAutoPlaying ? "⏸ Pause" : "▶ Auto-Play"}
            </Button>
          </div>
        </motion.div>

        <div
          className="relative overflow-hidden projects-carousel-container"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          role="region"
          aria-label="Carrousel de projets"
          aria-live="polite"
        >
          <div className="py-8 relative h-[420px] md:h-[540px] flex items-center justify-center">
            {/* Projets adjacents - masqués sur mobile pour performance */}
            <div className="hidden md:block">
              {[currentIndex - 1, currentIndex + 1].map((i, idx) => {
                const index = (i + projects.length) % projects.length;
                const project = projects[index];
                const isPrev = idx === 0;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.85, x: isPrev ? -80 : 80 }}
                    animate={{ opacity: 0.5, scale: 0.9, x: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className={
                      isPrev
                        ? "absolute left-0 top-0 h-full w-1/3 pointer-events-none z-0 -translate-x-1/2"
                        : "absolute right-0 top-0 h-full w-1/3 pointer-events-none z-0 translate-x-1/2"
                    }
                    style={{
                      filter: 'blur(3px) brightness(0.7)',
                      opacity: 0.4
                    }}
                  >
                    <Card className="overflow-hidden border-2 card-glow relative h-full">
                      <div className="relative h-72 md:h-96">
                        {project.title === "Site Portfolio" ? (
                          <video
                            src="/images/project/Portfolio.webm"
                            className="object-cover w-full h-full absolute inset-0"
                            autoPlay
                            loop
                            muted
                            playsInline
                            poster="/placeholder.svg?height=300&width=500"
                          />
                        ) : project.title === "E-commerce" ? (
                          <video
                            src="/images/project/demo.mp4"
                            className="object-cover w-full h-full absolute inset-0"
                            autoPlay
                            loop
                            muted
                            playsInline
                            poster="/placeholder.svg?height=300&width=500"
                          />
                        ) : (
                          <Image
                            src={project.image || "/placeholder.svg"}
                            alt={`Aperçu ${project.title}`}
                            fill
                            className={project.title === "My Snapchat" ? "object-contain" : "object-cover"}
                          />
                        )}
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
            {/* Projet courant */}
            <AnimatePresence custom={direction} initial={false} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  type: "tween",
                  duration: 0.35,
                  ease: "easeInOut"
                }}
                className="w-full projects-carousel-slide relative z-10"
              >
                <Card
                  className={cn(
                    "mx-auto max-w-4xl overflow-hidden border-2 card-glow transition-all duration-300",
                    theme === "robin" && "border-[#FF0000]",
                    theme === "starfire" && "border-[#FF69B4]",
                    theme === "cyborg" && "border-[#4169E1]",
                    theme === "beastboy" && "border-[#32CD32]",
                    theme === "raven" && "border-[#663399]",
                    theme === "deathstroke" && "border-[#FF8C00]",
                  )}
                >
                  <div className="relative h-72 md:h-96">
                    {projects[currentIndex].title === "Site Portfolio" ? (
                      <video
                        src="/images/project/Portfolio.webm"
                        className="object-cover w-full h-full absolute inset-0"
                        autoPlay
                        loop
                        muted
                        playsInline
                        poster="/placeholder.svg?height=300&width=500"
                      />
                    ) : projects[currentIndex].title === "E-commerce" ? (
                      <video
                        src="/images/project/demo.mp4"
                        className="object-cover w-full h-full absolute inset-0"
                        autoPlay
                        loop
                        muted
                        playsInline
                        poster="/placeholder.svg?height=300&width=500"
                      />
                    ) : (
                      <Image
                        src={projects[currentIndex].image || "/placeholder.svg"}
                        alt={projects[currentIndex].title}
                        fill
                        className={projects[currentIndex].title === "My Snapchat" ? "object-contain" : "object-cover"}
                      />
                    )}
                    <div
                      className={cn("absolute bottom-0 left-0 h-2 transition-all duration-500", getThemeColor())}
                      style={{ width: `${((currentIndex + 1) / projects.length) * 100}%` }}
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className={getThemeTextColor()}>{projects[currentIndex].title}</CardTitle>
                    <CardDescription className="text-lg">{projects[currentIndex].description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {projects[currentIndex].tags.map((tag) => (
                        <span
                          key={tag}
                          className={cn(
                            "px-3 py-1 rounded-full text-xs font-medium",
                            theme === "robin" && "bg-[#FF0000]/20 text-[#FF0000]",
                            theme === "starfire" && "bg-[#FF69B4]/20 text-[#FF69B4]",
                            theme === "cyborg" && "bg-[#4169E1]/20 text-[#4169E1]",
                            theme === "beastboy" && "bg-[#32CD32]/20 text-[#32CD32]",
                            theme === "raven" && "bg-[#663399]/20 text-[#663399]",
                            theme === "deathstroke" && "bg-[#FF8C00]/20 text-[#FF8C00]",
                          )}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button
                      variant="outline"
                      size="sm"
                      className={cn(
                        "gap-2 border-2",
                        theme === "robin" && "border-[#FF0000] text-[#FF0000] hover:bg-[#FF0000]/10",
                        theme === "starfire" && "border-[#FF69B4] text-[#FF69B4] hover:bg-[#FF69B4]/10",
                        theme === "cyborg" && "border-[#4169E1] text-[#4169E1] hover:bg-[#4169E1]/10",
                        theme === "beastboy" && "border-[#32CD32] text-[#32CD32] hover:bg-[#32CD32]/10",
                        theme === "raven" && "border-[#663399] text-[#663399] hover:bg-[#663399]/10",
                        theme === "deathstroke" && "border-[#FF8C00] text-[#FF8C00] hover:bg-[#FF8C00]/10",
                      )}
                    >
                      <Github className="h-4 w-4" />
                      GitHub
                    </Button>
                    <Button
                      size="sm"
                      className={cn(
                        "gap-2",
                        theme === "robin" && "bg-[#FF0000] hover:bg-[#FF0000]/90",
                        theme === "starfire" && "bg-[#FF69B4] hover:bg-[#FF69B4]/90",
                        theme === "cyborg" && "bg-[#4169E1] hover:bg-[#4169E1]/90",
                        theme === "beastboy" && "bg-[#32CD32] hover:bg-[#32CD32]/90",
                        theme === "raven" && "bg-[#663399] hover:bg-[#663399]/90",
                        theme === "deathstroke" && "bg-[#FF8C00] hover:bg-[#FF8C00]/90",
                      )}
                    >
                      <ExternalLink className="h-4 w-4" />
                      Démo Live
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            </AnimatePresence>
            {/* Flèches de navigation au-dessus de tout */}
            <div className="flex justify-between absolute top-1/2 left-4 right-4 z-20 -translate-y-1/2 pointer-events-auto">
              <Button
                variant="outline"
                size="icon"
                disabled={isTransitioning}
                className={cn(
                  "rounded-full bg-background/20 backdrop-blur-sm border-2 hover:bg-background/40 transition-all duration-200",
                  isTransitioning && "opacity-50 cursor-not-allowed",
                  theme === "robin" && "border-[#FF0000] text-[#FF0000]",
                  theme === "starfire" && "border-[#FF69B4] text-[#FF69B4]",
                  theme === "cyborg" && "border-[#4169E1] text-[#4169E1]",
                  theme === "beastboy" && "border-[#32CD32] text-[#32CD32]",
                  theme === "raven" && "border-[#663399] text-[#663399]",
                  theme === "deathstroke" && "border-[#FF8C00] text-[#FF8C00]",
                )}
                onClick={prevProject}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                disabled={isTransitioning}
                className={cn(
                  "rounded-full bg-background/20 backdrop-blur-sm border-2 hover:bg-background/40 transition-all duration-200",
                  isTransitioning && "opacity-50 cursor-not-allowed",
                  theme === "robin" && "border-[#FF0000] text-[#FF0000]",
                  theme === "starfire" && "border-[#FF69B4] text-[#FF69B4]",
                  theme === "cyborg" && "border-[#4169E1] text-[#4169E1]",
                  theme === "beastboy" && "border-[#32CD32] text-[#32CD32]",
                  theme === "raven" && "border-[#663399] text-[#663399]",
                  theme === "deathstroke" && "border-[#FF8C00] text-[#FF8C00]",
                )}
                onClick={nextProject}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>

        {/* Indicateurs toujours visibles pour navigation rapide */}
        <motion.div
          className="flex justify-center gap-3 mt-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {projects.map((project, index) => (
            <button
              key={index}
              onClick={() => goToProject(index)}
              disabled={isTransitioning}
              className={cn(
                "group relative transition-all duration-300 disabled:cursor-not-allowed",
                index === currentIndex && "scale-110"
              )}
              aria-label={`Aller au projet ${index + 1}: ${project.title}`}
              aria-current={index === currentIndex ? "true" : "false"}
            >
              <div
                className={cn(
                  "w-3 h-3 rounded-full transition-all duration-300 border-2",
                  "group-hover:scale-125 group-hover:shadow-lg",
                  index === currentIndex ? getThemeColor() + " shadow-md" : "bg-transparent",
                  theme === "robin" && "border-[#FF0000]",
                  theme === "starfire" && "border-[#FF69B4]",
                  theme === "cyborg" && "border-[#4169E1]",
                  theme === "beastboy" && "border-[#32CD32]",
                  theme === "raven" && "border-[#663399]",
                  theme === "deathstroke" && "border-[#FF8C00]"
                )}
              />
              {/* Tooltip au hover */}
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs bg-background/90 backdrop-blur-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {project.title}
              </span>
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
