"use client"

import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ArrowRight, Download } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function Hero() {
  const { theme } = useTheme()
  const [backgroundImage, setBackgroundImage] = useState("/placeholder.svg?height=800&width=1200")

  useEffect(() => {
    // Définir l'image de fond en fonction du thème
    switch (String(theme)) {
      case "robin":
        setBackgroundImage("/images/wallpapers/robin-wallpaper.webp")
        break
      case "starfire":
        setBackgroundImage("/images/wallpapers/starfire-wallpaper.webp")
        break
      case "beastboy":
        setBackgroundImage("/images/wallpapers/beast-boy-wallpaper.jpg")
        break
      case "raven":
        setBackgroundImage("/images/wallpapers/raven-wallpaper.png")
        break
      case "deathstroke":
        setBackgroundImage("/images/wallpapers/deathstroke-wallpaper.jpg")
        break
      case "cyborg":
        setBackgroundImage("/images/wallpapers/cyborg-wallpaper.webp")
        break
      case "light":
        setBackgroundImage("/images/wallpapers/TeenTitan-wallpaper.jpeg")
        break
      case "dark":
        setBackgroundImage("/images/wallpapers/TeenTitan-wallpaper.jpeg")
        break
      default:
        setBackgroundImage("/images/wallpapers/TeenTitan-wallpaper.jpeg")
    }
  }, [theme])

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      const offsetTop = section.offsetTop - 80
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }
  }

  const getHeroBackground = () => {
    if (theme === "light" || theme === "dark") {
      return {
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8)), url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
    }

    switch (String(theme)) {
      case "robin":
        return {
          backgroundImage: `radial-gradient(circle at center, rgba(255, 0, 0, 0.3), rgba(0, 0, 0, 0.8)), url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }
      case "starfire":
        return {
          backgroundImage: `radial-gradient(circle at center, rgba(255, 105, 180, 0.3), rgba(40, 0, 80, 0.8)), url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }
      case "cyborg":
        return {
          backgroundImage: `linear-gradient(135deg, rgba(65, 105, 225, 0.3), rgba(0, 20, 40, 0.8)), url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }
      case "beastboy":
        return {
          backgroundImage: `linear-gradient(135deg, rgba(50, 205, 50, 0.3), rgba(20, 40, 10, 0.8)), url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }
      case "raven":
        return {
          backgroundImage: `radial-gradient(circle at center, rgba(102, 51, 153, 0.3), rgba(10, 0, 20, 0.8)), url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }
      case "deathstroke":
        return {
          backgroundImage: `radial-gradient(circle at center, rgba(255, 140, 0, 0.3), rgba(0, 0, 0, 0.8)), url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }
      default:
        return {
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8)), url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }
    }
  }

  return (
    <section id="home" className="min-h-screen pt-16 flex items-center relative" style={getHeroBackground()}>
      {/* Overlay blanc en light pour lisibilité */}
      {theme === "light" && (
        <div className="absolute inset-0 bg-white/70 z-0 pointer-events-none" />
      )}
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
              Jihad Bakari - <span
                className={cn(
                  theme === "robin" && "text-[#FF0000]",
                  theme === "starfire" && "text-[#FF69B4]",
                  theme === "cyborg" && "text-[#4169E1]",
                  theme === "beastboy" && "text-[#32CD32]",
                  theme === "raven" && "text-[#663399]",
                  (theme as string) === "deathstroke" && "text-[#FF8C00]",
                )}
              >
                Développeur Web
              </span>{" "}
              & Mobile
            </h1>
            <p className="text-xl text-foreground/80">
              Je suis Jihad Bakari, passionné par le développement web et mobile, à la recherche d'une alternance en Septembre 2025 pour approfondir mes compétences en Full-Stack.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className={cn(
                  "group",
                  theme === "robin" && "bg-[#FF0000] hover:bg-[#FF0000]/90",
                  theme === "starfire" && "bg-[#FF69B4] hover:bg-[#FF69B4]/90",
                  theme === "cyborg" && "bg-[#4169E1] hover:bg-[#4169E1]/90",
                  theme === "beastboy" && "bg-[#32CD32] hover:bg-[#32CD32]/90",
                  theme === "raven" && "bg-[#663399] hover:bg-[#663399]/90",
                  (theme as string) === "deathstroke" && "bg-[#FF8C00] hover:bg-[#FF8C00]/90",
                )}
                onClick={() => scrollToSection("projects")}
              >
                Voir mes projets
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 hover:bg-background/10 text-foreground"
                onClick={() => scrollToSection("contact")}
              >
                Me contacter
              </Button>
              <Button size="lg" variant="outline" className="border-2 hover:bg-background/10 gap-2 text-foreground" asChild>
                <a href="/images/cv/CV BAKARIJIHAD-2.pdf" download>
                  <Download className="h-4 w-4" />
                  Télécharger CV
                </a>
              </Button>
            </div>
          </motion.div>

          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div
              className={cn(
                "relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden",
                "border-4 card-glow",
                theme === "robin" && "border-[#FF0000]",
                theme === "starfire" && "border-[#FF69B4]",
                theme === "cyborg" && "border-[#4169E1]",
                theme === "beastboy" && "border-[#32CD32]",
                theme === "raven" && "border-[#663399]",
                (theme as string) === "deathstroke" && "border-[#FF8C00]",
              )}
            >
              <Image src="/images/photo/CVPhoto.jpg" alt="Profile photo" fill className="object-cover" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
