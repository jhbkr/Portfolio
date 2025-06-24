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
    switch (theme) {
      case "robin":
        setBackgroundImage(
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/robinWallpaper-v5znOpDM4YlPkhZqR9pTKSvnEqkpAL.png",
        )
        break
      case "starfire":
        setBackgroundImage(
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/starfireWallpaper.jpg-aFhVNmjnVvzoofj3mW1ZhBP57O1hv4.jpeg",
        )
        break
      case "beastboy":
        setBackgroundImage(
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/beastboyWallpaper.jpg-Z0xN1IHUuaQoHpeilSx3YufNCEa3Zu.jpeg",
        )
        break
      case "raven":
        setBackgroundImage(
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/RavenWallpaper.jpg-QU7AXQtlJsM1DGvENHLyR31TUHvBnm.jpeg",
        )
        break
      case "deathstroke":
        setBackgroundImage(
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/deathrokeWallpaper.jpg-6h3L8AjdaUtbVY7sHmPdRiFUmsgnCl.jpeg",
        )
        break
      case "cyborg":
        setBackgroundImage(
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cyborgWallpaper-zdmFdbinFr3nwAYXPBS5ZsepJDQh1I.png",
        )
        break
      case "light":
        setBackgroundImage("/placeholder.svg?height=800&width=1200")
        break
      case "dark":
        setBackgroundImage("/placeholder.svg?height=800&width=1200")
        break
      default:
        setBackgroundImage("/placeholder.svg?height=800&width=1200")
    }
  }, [theme])

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      const offsetTop = section.offsetTop - 80 // Adjust for header height
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

    switch (theme) {
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
    <section id="home" className="min-h-screen pt-16 flex items-center" style={getHeroBackground()}>
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              <span
                className={cn(
                  theme === "robin" && "text-[#FF0000]",
                  theme === "starfire" && "text-[#FF69B4]",
                  theme === "cyborg" && "text-[#4169E1]",
                  theme === "beastboy" && "text-[#32CD32]",
                  theme === "raven" && "text-[#663399]",
                  theme === "deathstroke" && "text-[#FF8C00]",
                )}
              >
                Développeur Web
              </span>{" "}
              Full-Stack
            </h1>
            <p className="text-xl text-foreground/80">
              Passionné par le développement web, à la recherche d'une alternance en Novembre 2025 pour approfondir mes
              compétences en Full-Stack.
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
                  theme === "deathstroke" && "bg-[#FF8C00] hover:bg-[#FF8C00]/90",
                )}
                onClick={() => scrollToSection("projects")}
              >
                Voir mes projets
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 hover:bg-background/10"
                onClick={() => scrollToSection("contact")}
              >
                Me contacter
              </Button>
              <Button size="lg" variant="outline" className="border-2 hover:bg-background/10 gap-2" asChild>
                <a href="/cv.pdf" download>
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
                theme === "deathstroke" && "border-[#FF8C00]",
              )}
            >
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/CVPhoto.jpg-Rw2X9Jh233apkAk4fI9lnLVSoVzNzJ.jpeg"
                alt="Profile photo"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
