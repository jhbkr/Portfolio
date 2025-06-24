"use client"

import { useTheme } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { GraduationCap, MapPin } from "lucide-react"

type TimelineItem = {
  period: string
  title: string
  location: string
  tags: string[]
}

export default function Timeline() {
  const { theme } = useTheme()

  const experiences: TimelineItem[] = [
    {
      period: "2024 - 2026",
      title: "Formation Développeur Web Full-Stack",
      location: "EPITECH",
      tags: ["HTML", "CSS", "JavaScript", "React", "PHP"],
    },
    {
      period: "2019 - 2023",
      title: "Niveau Bac Général",
      location: "UGA Grenoble",
      tags: ["Informatique", "Mathématiques"],
    },
    {
      period: "2019",
      title: "Baccalauréat Général - Mention Assez Bien",
      location: "Lycée Claude Louis Berthollet",
      tags: ["Sciences", "Mathématiques"],
    },
  ]

  const workExperiences: TimelineItem[] = [
    {
      period: "2023 - 2024",
      title: "Vendeur Polyvalent",
      location: "Glacier Perriere",
      tags: ["Gestion de caisse", "Management d'équipe"],
    },
    {
      period: "Juillet - Décembre 2022",
      title: "Équipier Polyvalent",
      location: "Burger King",
      tags: ["Gestion de caisse", "Management d'équipe"],
    },
    {
      period: "Février - Août 2018",
      title: "Conseiller en Vente",
      location: "The North Face",
      tags: ["Accueil clients", "Gestion de l'inventaire"],
    },
  ]

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
    <section id="timeline" className="py-24 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Mon Parcours</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Découvrez mon parcours académique et professionnel.</p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {/* Formation */}
          <div>
            <div className="flex items-center mb-8">
              <div className={cn("w-12 h-12 rounded-full flex items-center justify-center mr-4", getThemeColor())}>
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold">Formation</h3>
            </div>

            <div className="relative pl-8 border-l-2 border-muted space-y-12 mb-16">
              {experiences.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div
                    className={cn(
                      "absolute -left-[25px] w-12 h-12 rounded-full flex items-center justify-center",
                      "border-4 border-background",
                      getThemeColor(),
                    )}
                  >
                    <span className="text-white font-bold">{item.period.split(" ")[0].slice(2)}</span>
                  </div>

                  <div className="bg-card rounded-lg p-6 shadow-md hover-effect">
                    <div className="mb-2">
                      <h4 className={cn("text-xl font-bold", getThemeTextColor())}>{item.period}</h4>
                    </div>
                    <p className="text-lg font-semibold mb-2">{item.title}</p>
                    <div className="flex items-center text-muted-foreground mb-4">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{item.location}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className={cn(
                            "px-3 py-1 rounded-full text-xs font-medium",
                            "bg-muted/50",
                            getThemeTextColor(),
                          )}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Expérience Professionnelle */}
          <div>
            <div className="flex items-center mb-8">
              <div className={cn("w-12 h-12 rounded-full flex items-center justify-center mr-4", getThemeColor())}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-white"
                >
                  <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold">Expérience Professionnelle</h3>
            </div>

            <div className="relative pl-8 border-l-2 border-muted space-y-12">
              {workExperiences.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div
                    className={cn(
                      "absolute -left-[25px] w-12 h-12 rounded-full flex items-center justify-center",
                      "border-4 border-background",
                      getThemeColor(),
                    )}
                  >
                    <span className="text-white font-bold">{item.period.split(" ")[0].slice(0, 2)}</span>
                  </div>

                  <div className="bg-card rounded-lg p-6 shadow-md hover-effect">
                    <div className="mb-2">
                      <h4 className={cn("text-xl font-bold", getThemeTextColor())}>{item.period}</h4>
                    </div>
                    <p className="text-lg font-semibold mb-2">{item.title}</p>
                    <div className="flex items-center text-muted-foreground mb-4">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{item.location}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className={cn(
                            "px-3 py-1 rounded-full text-xs font-medium",
                            "bg-muted/50",
                            getThemeTextColor(),
                          )}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
