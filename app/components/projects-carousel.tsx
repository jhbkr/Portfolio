"use client"

import type React from "react"

import { useState, useRef } from "react"
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
  const { theme } = useTheme()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  const projects: Project[] = [
    {
      id: 1,
      title: "Plateforme E-commerce",
      description:
        "Une plateforme e-commerce complète avec authentification utilisateur, gestion des produits et traitement des paiements.",
      image: "/placeholder.svg?height=300&width=500",
      tags: ["Next.js", "Tailwind CSS", "Stripe", "MongoDB"],
      githubUrl: "#",
      liveUrl: "#",
    },
    {
      id: 2,
      title: "Application de Gestion de Tâches",
      description:
        "Une application collaborative de gestion de tâches avec mises à jour en temps réel et espaces de travail d'équipe.",
      image: "/placeholder.svg?height=300&width=500",
      tags: ["React", "Firebase", "Tailwind CSS", "TypeScript"],
      githubUrl: "#",
      liveUrl: "#",
    },
    {
      id: 3,
      title: "Site Portfolio",
      description: "Un site portfolio responsive présentant des projets et compétences avec un thème unique.",
      image: "/placeholder.svg?height=300&width=500",
      tags: ["Next.js", "Framer Motion", "Tailwind CSS"],
      githubUrl: "#",
      liveUrl: "#",
    },
    {
      id: 4,
      title: "Tableau de Bord Météo",
      description:
        "Un tableau de bord météo qui affiche les données météorologiques actuelles et prévues pour plusieurs emplacements.",
      image: "/placeholder.svg?height=300&width=500",
      tags: ["React", "OpenWeather API", "Chart.js"],
      githubUrl: "#",
      liveUrl: "#",
    },
    {
      id: 5,
      title: "Plateforme de Blog",
      description: "Une plateforme de blog complète avec support markdown, commentaires et profils utilisateurs.",
      image: "/placeholder.svg?height=300&width=500",
      tags: ["Next.js", "Prisma", "PostgreSQL", "Tailwind CSS"],
      githubUrl: "#",
      liveUrl: "#",
    },
  ]

  const nextProject = () => {
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length)
  }

  const prevProject = () => {
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length)
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
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
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

  return (
    <section id="projects" className="py-24 md:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Mes Projets</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Découvrez quelques-uns de mes travaux récents. Faites glisser ou utilisez les flèches pour naviguer entre
            les projets.
          </p>
        </motion.div>

        <div
          className="relative overflow-hidden projects-carousel-container"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="flex justify-between absolute top-1/2 left-4 right-4 z-10 -translate-y-1/2">
            <Button
              variant="outline"
              size="icon"
              className={cn(
                "rounded-full bg-background/20 backdrop-blur-sm border-2 hover:bg-background/40",
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
              className={cn(
                "rounded-full bg-background/20 backdrop-blur-sm border-2 hover:bg-background/40",
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

          <div className="py-8">
            <AnimatePresence custom={direction} initial={false} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="w-full projects-carousel-slide"
              >
                <Card
                  className={cn(
                    "mx-auto max-w-4xl overflow-hidden border-2 card-glow hover-effect",
                    theme === "robin" && "border-[#FF0000]",
                    theme === "starfire" && "border-[#FF69B4]",
                    theme === "cyborg" && "border-[#4169E1]",
                    theme === "beastboy" && "border-[#32CD32]",
                    theme === "raven" && "border-[#663399]",
                    theme === "deathstroke" && "border-[#FF8C00]",
                  )}
                >
                  <div className="relative h-72 md:h-96">
                    <Image
                      src={projects[currentIndex].image || "/placeholder.svg"}
                      alt={projects[currentIndex].title}
                      fill
                      className="object-cover"
                    />
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
          </div>

          <div className="flex justify-center gap-3 mt-6">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1)
                  setCurrentIndex(index)
                }}
                className={cn(
                  "w-4 h-4 rounded-full transition-all border-2",
                  index === currentIndex ? getThemeColor() : "bg-transparent",
                  theme === "robin" && "border-[#FF0000]",
                  theme === "starfire" && "border-[#FF69B4]",
                  theme === "cyborg" && "border-[#4169E1]",
                  theme === "beastboy" && "border-[#32CD32]",
                  theme === "raven" && "border-[#663399]",
                  theme === "deathstroke" && "border-[#FF8C00]",
                )}
                aria-label={`Aller à la diapositive ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
