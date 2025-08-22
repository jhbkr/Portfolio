"use client"

import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Search, FileText, Play, Code, CheckCircle, Rocket, Users, Clock, Zap, Target } from "lucide-react"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"

export default function FreelanceProcess() {
  const { theme } = useTheme()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

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

  const getThemeBorderColor = () => {
    if (!isClient) return "border-primary"
    
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

  const steps = [
    {
      id: 1,
      title: "Découverte",
      duration: "15 min",
      icon: Search,
      description: "Besoins, cibles, contenus, délais",
      details: [
        "Objectif business ? (contacts, ventes, crédibilité…)",
        "Pages & contenus déjà prêts ?",
        "Références/design que vous aimez ?",
        "Contraintes (deadline, budget cible) ?",
        "Qui décide et valide ? (interlocuteur)",
        "Tech existantes à garder ? (domaine, mails, CMS…)"
      ]
    },
    {
      id: 2,
      title: "Proposition",
      duration: "24h",
      icon: FileText,
      description: "Devis + planning + CGV ; acompte 40 %",
      details: [
        "Devis détaillé avec planning",
        "Conditions générales de vente",
        "Acompte de 40 % à la commande",
        "Validité du devis : 30 jours"
      ]
    },
    {
      id: 3,
      title: "Kick‑off",
      duration: "1 jour",
      icon: Play,
      description: "Accès, contenus, rôles, jalons",
      details: [
        "Mise en place des accès",
        "Réception des contenus",
        "Définition des rôles",
        "Planification des jalons"
      ]
    },
    {
      id: 4,
      title: "Design & Dev",
      duration: "Variable",
      icon: Code,
      description: "Maquette rapide puis itérations (Git/tickets)",
      details: [
        "Maquette rapide",
        "Développement itératif",
        "Suivi via Git/tickets",
        "Démos régulières"
      ]
    },
    {
      id: 5,
      title: "Recette",
      duration: "5 jours",
      icon: CheckCircle,
      description: "Correctifs, perf/SEO, check RGPD",
      details: [
        "Phase de recette (5 jours ouvrés)",
        "Correctifs d'anomalies bloquantes/majeures",
        "Optimisations performance/SEO",
        "Vérification conformité RGPD"
      ]
    },
    {
      id: 6,
      title: "Mise en ligne & Handover",
      duration: "1 jour",
      icon: Rocket,
      description: "Doc & transfert, garantie 7 jours",
      details: [
        "Mise en ligne",
        "Documentation complète",
        "Transfert des accès",
        "Garantie 7 jours correctifs"
      ]
    }
  ]

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

  return (
    <section id="process" className="py-16 md:py-24 bg-muted/20">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Process de Mission</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Process éprouvé et transparent pour rassurer
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent transform -translate-y-1/2 z-0" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative z-10"
              >
                <Card className={cn(
                  "h-full border-2 hover:shadow-xl transition-all duration-300 transform hover:scale-105 backdrop-blur-sm bg-card/80",
                  getThemeBorderColor()
                )}>
                  <CardHeader className="text-center pb-4">
                    <div className="flex justify-center mb-4">
                      <div className={cn(
                        "p-3 rounded-full relative",
                        isClient && theme === "robin" && "bg-[#FF0000]/10",
                        isClient && theme === "starfire" && "bg-[#FF69B4]/10",
                        isClient && theme === "cyborg" && "bg-[#4169E1]/10",
                        isClient && theme === "beastboy" && "bg-[#32CD32]/10",
                        isClient && theme === "raven" && "bg-[#663399]/10",
                        isClient && theme === "deathstroke" && "bg-[#FF8C00]/10",
                      )}>
                        <step.icon className={cn(
                          "h-8 w-8",
                          isClient && theme === "robin" && "text-[#FF0000]",
                          isClient && theme === "starfire" && "text-[#FF69B4]",
                          isClient && theme === "cyborg" && "text-[#4169E1]",
                          isClient && theme === "beastboy" && "text-[#32CD32]",
                          isClient && theme === "raven" && "text-[#663399]",
                          isClient && theme === "deathstroke" && "text-[#FF8C00]",
                        )} />
                        <Badge className={cn(
                          "absolute -top-2 -right-2 text-xs",
                          isClient && theme === "robin" && "bg-[#FF0000]",
                          isClient && theme === "starfire" && "bg-[#FF69B4]",
                          isClient && theme === "cyborg" && "bg-[#4169E1]",
                          isClient && theme === "beastboy" && "bg-[#32CD32]",
                          isClient && theme === "raven" && "bg-[#663399]",
                          isClient && theme === "deathstroke" && "bg-[#FF8C00]",
                        )}>
                          {step.id}
                        </Badge>
                      </div>
                    </div>
                    <CardTitle className="text-xl mb-2">{step.title}</CardTitle>
                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {step.duration}
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      {step.description}
                    </p>
                  </CardHeader>
                  
                  <CardContent className="space-y-2">
                    <div className="space-y-1">
                      {step.details.slice(0, 3).map((detail, detailIndex) => (
                        <div key={detailIndex} className="flex items-start gap-2">
                          <div className={cn(
                            "w-1 h-1 rounded-full mt-2 flex-shrink-0",
                            isClient && theme === "robin" && "bg-[#FF0000]",
                            isClient && theme === "starfire" && "bg-[#FF69B4]",
                            isClient && theme === "cyborg" && "bg-[#4169E1]",
                            isClient && theme === "beastboy" && "bg-[#32CD32]",
                            isClient && theme === "raven" && "bg-[#663399]",
                            isClient && theme === "deathstroke" && "bg-[#FF8C00]",
                          )} />
                          <span className="text-xs">{detail}</span>
                        </div>
                      ))}
                      {step.details.length > 3 && (
                        <p className="text-xs text-muted-foreground mt-1">
                          +{step.details.length - 3} autres détails
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          className="mt-16 p-8 bg-card border-2 rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Clôture de l'appel découverte</h3>
            <p className="text-lg text-muted-foreground mb-6">
              "Je vous envoie devis + planning aujourd'hui. Si OK, vous validez avec 40 % d'acompte, et on lance."
            </p>
            <Button
              size="lg"
              className={cn("mr-4", getThemeColor())}
              onClick={() => scrollToSection("contact")}
            >
              Planifier un appel découverte
            </Button>
          </div>
        </motion.div>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <Button
            size="lg"
            className={cn("mr-4", getThemeColor())}
            onClick={() => scrollToSection("devis")}
          >
            Voir les exemples de devis
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => scrollToSection("faq")}
            className="border-2"
          >
            Voir la FAQ
          </Button>
        </motion.div>
      </div>
    </section>
  )
} 