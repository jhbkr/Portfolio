"use client"

import { useTheme } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { Briefcase, GraduationCap, Languages, User } from "lucide-react"
import { motion } from "framer-motion"

export default function About() {
  const { theme } = useTheme()

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

  // Sections pour le défilement infini
  const sections = [
    {
      icon: <User className="h-6 w-6 text-white" />,
      title: "Profil Professionnel",
      content: [
        "Passionné par le développement web, à la recherche d'une alternance en Septembre 2025 pour approfondir ses compétences en Full-Stack.",
        "Objectif : Appliquer les connaissances techniques acquises et contribuer à des projets web innovants.",
        "Fortes capacités d'adaptabilité, de polyvalence et d'esprit d'équipe.",
      ],
    },
    {
      icon: <GraduationCap className="h-6 w-6 text-white" />,
      title: "Formation",
      content: [
        "2024 - 2026 | EPITECH - Formation Développeur Web Full-Stack",
        "2019 - 2023 | UGA Grenoble - Niveau Bac Général",
        "Lycée Claude Louis Berthollet - Baccalauréat Général - Mention Assez Bien",
      ],
    },
    {
      icon: <Languages className="h-6 w-6 text-white" />,
      title: "Langues",
      content: ["Français : Langue maternelle", "Anglais : Niveau B2", "Espagnol : Niveau B2"],
    },
    {
      icon: <Briefcase className="h-6 w-6 text-white" />,
      title: "Soft Skills",
      content: ["Autonomie", "Esprit d'équipe", "Polyvalence", "Adaptabilité", "Responsabilité"],
    },
  ]

  // Dupliquer les sections pour le défilement infini
  const duplicatedSections = [...sections, ...sections]

  return (
    <section id="about" className="py-24 md:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">À Propos de Moi</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Découvrez mon profil, mes compétences et mes objectifs professionnels.
          </p>
        </motion.div>

        <div className="overflow-hidden py-8 relative">
          <div className="flex animate-scroll">
            {duplicatedSections.map((section, index) => (
              <div
                key={`${section.title}-${index}`}
                className={cn(
                  "mx-4 p-6 rounded-xl border-2 min-w-[300px] md:min-w-[400px] max-w-[400px]",
                  "card-glow",
                  getThemeBorderColor(),
                )}
              >
                <div className="flex items-center mb-4">
                  <div className={cn("w-10 h-10 rounded-full flex items-center justify-center mr-3", getThemeColor())}>
                    {section.icon}
                  </div>
                  <h3 className={cn("text-xl font-bold", getThemeTextColor())}>{section.title}</h3>
                </div>

                <ul className="space-y-2">
                  {section.content.map((item, idx) => (
                    <li key={idx} className="text-muted-foreground break-words">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-background to-transparent z-10"></div>
          <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-background to-transparent z-10"></div>
        </div>
      </div>
    </section>
  )
}
