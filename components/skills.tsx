"use client"

import { useState, useRef, useEffect } from "react"
import { useTheme } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence, useAnimation } from "framer-motion"
import { X } from "lucide-react"

type Skill = {
  name: string
  icon: string
  description: string
  type: "Frontend" | "Backend" | "Fullstack" | "Outil"
  usage: string
}

export default function Skills() {
  const { theme } = useTheme()
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const skills: Skill[] = [
    {
      name: "HTML",
      icon: "🌐",
      description: "Langage de balisage utilisé pour structurer le contenu des pages web.",
      type: "Frontend",
      usage: "Création de la structure des pages web, formulaires, et éléments interactifs.",
    },
    {
      name: "CSS",
      icon: "🎨",
      description: "Langage de style utilisé pour définir la présentation des documents HTML.",
      type: "Frontend",
      usage: "Mise en forme, animations, et responsive design pour les interfaces utilisateur.",
    },
    {
      name: "JavaScript",
      icon: "📜",
      description:
        "Langage de programmation qui permet d'implémenter des fonctionnalités dynamiques sur les pages web.",
      type: "Frontend",
      usage: "Interactivité côté client, manipulation du DOM, et applications web dynamiques.",
    },
    {
      name: "TypeScript",
      icon: "🔷",
      description: "Surensemble de JavaScript qui ajoute des types statiques et d'autres fonctionnalités.",
      type: "Fullstack",
      usage: "Développement d'applications robustes avec vérification de types à la compilation.",
    },
    {
      name: "React",
      icon: "⚛️",
      description: "Bibliothèque JavaScript pour construire des interfaces utilisateur composables.",
      type: "Frontend",
      usage: "Création d'interfaces utilisateur interactives et réutilisables.",
    },
    {
      name: "Next.js",
      icon: "▲",
      description: "Framework React qui permet le rendu côté serveur et la génération de sites statiques.",
      type: "Fullstack",
      usage: "Développement d'applications web performantes avec rendu hybride.",
    },
    {
      name: "Tailwind CSS",
      icon: "💨",
      description: "Framework CSS utilitaire pour créer rapidement des designs personnalisés.",
      type: "Frontend",
      usage: "Stylisation rapide et cohérente sans quitter le HTML.",
    },
    {
      name: "SASS",
      icon: "💅",
      description: "Préprocesseur CSS qui ajoute des fonctionnalités comme les variables et les mixins.",
      type: "Frontend",
      usage: "Organisation et maintenance de styles complexes pour les grandes applications.",
    },
    {
      name: "PHP",
      icon: "🐘",
      description: "Langage de script côté serveur conçu pour le développement web.",
      type: "Backend",
      usage: "Développement de sites dynamiques, API et applications web côté serveur.",
    },
    {
      name: "GitHub",
      icon: "🐙",
      description: "Plateforme de développement collaboratif pour héberger et réviser du code.",
      type: "Outil",
      usage: "Gestion de versions, collaboration, et déploiement continu.",
    },
    {
      name: "SQL",
      icon: "🗃️",
      description: "Langage de requête structurée pour gérer les bases de données relationnelles.",
      type: "Backend",
      usage: "Stockage, récupération et manipulation de données structurées.",
    },
    {
      name: "AngularJS",
      icon: "🅰️",
      description: "Framework JavaScript pour construire des applications web dynamiques côté client.",
      type: "Frontend",
      usage: "Développement d'applications web SPA robustes et modulaires.",
    },
    {
      name: "Python",
      icon: "🐍",
      description: "Langage de programmation polyvalent, très utilisé pour le backend, la data science et l'automatisation.",
      type: "Backend",
      usage: "Développement d'APIs, scripts, automatisation, et applications serveur.",
    },
    {
      name: "MongoDB",
      icon: "🍃",
      description: "Base de données NoSQL orientée documents, flexible et scalable.",
      type: "Backend",
      usage: "Stockage et gestion de données non structurées ou semi-structurées.",
    },
    {
      name: "NodeJS",
      icon: "🟩",
      description: "Environnement d'exécution JavaScript côté serveur, basé sur le moteur V8 de Chrome.",
      type: "Backend",
      usage: "Création de serveurs web performants, APIs REST, et applications temps réel.",
    },
    {
      name: "ExpressJS",
      icon: "🚂",
      description: "Framework minimaliste pour Node.js, facilitant la création d'APIs et d'applications web.",
      type: "Backend",
      usage: "Développement rapide d'APIs RESTful et de middlewares pour Node.js.",
    },
    {
      name: "SpringBoot",
      icon: "🌱",
      description: "Framework Java pour créer des applications backend robustes et évolutives.",
      type: "Backend",
      usage: "Développement d'APIs, microservices et applications d'entreprise en Java.",
    },
    {
      name: "Java",
      icon: "☕",
      description: "Langage de programmation orienté objet, largement utilisé pour les applications backend et Android.",
      type: "Backend",
      usage: "Développement d'applications serveur, Android, et systèmes d'information complexes.",
    },
  ]

  // Duplicate skills for infinite scrolling effect
  const duplicatedSkills = [...skills, ...skills]

  // Ajout pour scroll infini
  const containerRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(0)
  const controls = useAnimation()

  useEffect(() => {
    if (containerRef.current) {
      setWidth(containerRef.current.scrollWidth / 2)
    }
  }, [skills.length])

  useEffect(() => {
    if (width > 0) {
      controls.start({
        x: -width,
        transition: {
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 35,
            ease: "linear",
          },
        },
      })
    }
  }, [width, controls])

  const getThemeColor = () => {
    if (!mounted) return "bg-primary"
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
      default:
        if ((theme as string) === "deathstroke") return "bg-[#FF8C00]"
        return "bg-primary"
    }
  }

  const getThemeTextColor = () => {
    if (!mounted) return "text-primary"
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
        if ((theme as string) === "deathstroke") return "text-[#FF8C00]"
        return "text-primary"
    }
  }

  const getThemeBorderColor = () => {
    if (!mounted) return "border-primary"
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
      default:
        if ((theme as string) === "deathstroke") return "border-[#FF8C00]"
        return "border-primary"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Frontend":
        return "bg-blue-500/20 text-blue-500"
      case "Backend":
        return "bg-green-500/20 text-green-500"
      case "Fullstack":
        return "bg-purple-500/20 text-purple-500"
      case "Outil":
        return "bg-orange-500/20 text-orange-500"
      default:
        return "bg-gray-500/20 text-gray-500"
    }
  }

  return (
    <section id="skills" className="py-24 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Mes Skills</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Voici les technologies et compétences avec lesquelles je travaille. Cliquez sur une compétence pour en
            savoir plus.
          </p>
        </motion.div>

        <div className="overflow-hidden py-8 relative">
          <motion.div
            className="flex whitespace-nowrap"
            ref={containerRef}
            animate={controls}
            style={{ x: 0 }}
          >
            {[...skills, ...skills].map((skill, index) => (
              <div
                key={`${skill.name}-${index}`}
                className={cn(
                  "flex items-center justify-center mx-4 px-6 py-4 rounded-xl border-2 min-w-[180px] cursor-pointer",
                  "card-glow transition-all duration-300",
                  getThemeBorderColor(),
                )}
                onClick={() => setSelectedSkill(skill)}
              >
                <span className="text-3xl mr-3">{skill.icon}</span>
                <span className={cn("text-xl font-bold", getThemeTextColor())}>{skill.name}</span>
              </div>
            ))}
          </motion.div>

          <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-background to-transparent z-10"></div>
          <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-background to-transparent z-10"></div>
        </div>
      </div>

      {/* Skill Detail Modal */}
      <AnimatePresence>
        {selectedSkill && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedSkill(null)}
          >
            <motion.div
              className={cn("bg-card max-w-md w-full rounded-xl p-6 border-2", "card-glow", getThemeBorderColor())}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <span className="text-4xl mr-3">{selectedSkill.icon}</span>
                  <h3 className={cn("text-2xl font-bold", getThemeTextColor())}>{selectedSkill.name}</h3>
                </div>
                <button
                  onClick={() => setSelectedSkill(null)}
                  className="p-1 rounded-full hover:bg-muted/50 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mb-4">
                <span
                  className={cn(
                    "inline-block px-3 py-1 rounded-full text-sm font-medium mb-2",
                    getTypeColor(selectedSkill.type),
                  )}
                >
                  {selectedSkill.type}
                </span>
                <p className="text-foreground/80">{selectedSkill.description}</p>
              </div>

              <div className="mt-4">
                <h4 className="text-sm font-semibold text-muted-foreground mb-2">Utilisation:</h4>
                <p className="text-foreground/80">{selectedSkill.usage}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
