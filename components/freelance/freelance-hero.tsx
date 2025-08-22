"use client"

import { useState, useEffect } from "react"
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ArrowRight, Calendar, FileText, Phone, Sparkles, Star } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"

export default function FreelanceHero() {
  const { theme } = useTheme()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

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

  const getThemeColor = () => {
    if (!isClient) return "bg-primary hover:bg-primary/90"
    
    switch (theme) {
      case "robin":
        return "bg-[#FF0000] hover:bg-[#FF0000]/90"
      case "starfire":
        return "bg-[#FF69B4] hover:bg-[#FF69B4]/90"
      case "cyborg":
        return "bg-[#4169E1] hover:bg-[#4169E1]/90"
      case "beastboy":
        return "bg-[#32CD32] hover:bg-[#32CD32]/90"
      case "raven":
        return "bg-[#663399] hover:bg-[#663399]/90"
      case "deathstroke":
        return "bg-[#FF8C00] hover:bg-[#FF8C00]/90"
      default:
        return "bg-primary hover:bg-primary/90"
    }
  }

  if (!isClient) {
    return (
      <section className="min-h-screen pt-16 flex items-center relative overflow-hidden">
        <div className="container mx-auto px-4 py-8 md:py-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="h-6 bg-muted rounded animate-pulse w-48"></div>
                <div className="h-12 bg-muted rounded animate-pulse w-96"></div>
                <div className="h-6 bg-muted rounded animate-pulse w-80"></div>
                <div className="h-6 bg-muted rounded animate-pulse w-72"></div>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="w-64 h-64 lg:w-80 lg:h-80 rounded-full bg-muted animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="min-h-screen pt-16 flex items-center relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/20" />
      
      {/* Floating particles effect */}
      {isClient && (
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-primary/20 rounded-full"
              animate={{
                x: [0, Math.random() * 1000],
                y: [0, Math.random() * 1000],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
      )}

      <div className="container mx-auto px-4 py-8 md:py-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Content */}
          <div className="space-y-8">
                      <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium"
              >
                <Sparkles className="h-4 w-4" />
                Disponible pour nouveaux projets
              </motion.div>

              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground">
                Jihad Bakari
                <br />
                <span className={cn(
                  "block bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent",
                  isClient && theme === "robin" && "from-[#FF0000] to-[#FF0000]/60",
                  isClient && theme === "starfire" && "from-[#FF69B4] to-[#FF69B4]/60",
                  isClient && theme === "cyborg" && "from-[#4169E1] to-[#4169E1]/60",
                  isClient && theme === "beastboy" && "from-[#32CD32] to-[#32CD32]/60",
                  isClient && theme === "raven" && "from-[#663399] to-[#663399]/60",
                  isClient && theme === "deathstroke" && "from-[#FF8C00] to-[#FF8C00]/60",
                )}>
                  Développeur web freelance
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-foreground/80">
                Lyon, France – Remote
              </p>

              <p className="text-lg text-muted-foreground">
                Sites vitrines, e‑commerce & apps web
                <br />
                <span className="font-medium text-primary">React/Next.js • Node.js • PHP • APIs</span>
              </p>

              <p className="text-lg text-muted-foreground max-w-2xl">
                Je suis Jihad Bakari, passionné par le développement web et mobile. J'aide TPE/PME & startups à lancer, refondre et accélérer leurs produits web.
              </p>
            </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              size="lg"
              className={cn("group text-lg px-8 py-6 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl", getThemeColor())}
              onClick={() => scrollToSection("packs")}
            >
              <FileText className="mr-2 h-5 w-5" />
              Demander un devis
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 border-2 hover:bg-background/10 transform hover:scale-105 transition-all duration-300"
              onClick={() => scrollToSection("contact")}
            >
              <Calendar className="mr-2 h-5 w-5" />
              Planifier un appel 15 min
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap gap-6 text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              Micro‑entreprise
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              TVA non applicable, art. 293 B CGI
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full">
              <div className="w-2 h-2 rounded-full bg-purple-500"></div>
              SIRET [à insérer]
            </div>
          </motion.div>
        </div>

        {/* Profile Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex justify-center lg:justify-end"
        >
          <div className="relative">
            <div className={cn(
              "relative w-64 h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 shadow-2xl",
              "transform hover:scale-105 transition-all duration-300",
              isClient && theme === "robin" && "border-[#FF0000] shadow-[#FF0000]/20",
              isClient && theme === "starfire" && "border-[#FF69B4] shadow-[#FF69B4]/20",
              isClient && theme === "cyborg" && "border-[#4169E1] shadow-[#4169E1]/20",
              isClient && theme === "beastboy" && "border-[#32CD32] shadow-[#32CD32]/20",
              isClient && theme === "raven" && "border-[#663399] shadow-[#663399]/20",
              isClient && theme === "deathstroke" && "border-[#FF8C00] shadow-[#FF8C00]/20",
            )}>
              <Image 
                src="/images/photo/CVPhoto.jpg" 
                alt="Jihad Bakari - Développeur web freelance" 
                fill 
                className="object-cover"
                sizes="(max-width: 768px) 256px, 320px"
              />
            </div>
            
            {/* Floating badge */}
            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-4 -right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg"
            >
              <Star className="h-4 w-4" />
            </motion.div>
          </div>
        </motion.div>
        </div>
      </div>
    </section>
  )
} 