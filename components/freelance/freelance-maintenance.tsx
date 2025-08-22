"use client"

import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Check, Shield, Zap, Star, Clock, AlertCircle } from "lucide-react"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"

export default function FreelanceMaintenance() {
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

  const maintenancePlans = [
    {
      id: "essentiel",
      title: "Essentiel",
      price: "49 €",
      period: "/mois",
      icon: Shield,
      description: "Maintenance de base pour sécuriser votre site",
      features: [
        "Mises à jour mensuelles",
        "Sauvegardes automatiques",
        "Uptime check",
        "30 min d'interventions (mineur)"
      ],
      recommended: false
    },
    {
      id: "standard",
      title: "Standard",
      price: "99 €",
      period: "/mois",
      icon: Zap,
      description: "Maintenance complète avec évolutions",
      features: [
        "Tout inclus du plan Essentiel",
        "1 h d'évolutions",
        "Petites optimisations SEO/perf",
        "Support prioritaire"
      ],
      recommended: true
    },
    {
      id: "avance",
      title: "Avancé",
      price: "199 €",
      period: "/mois",
      icon: Star,
      description: "Maintenance premium avec accompagnement",
      features: [
        "Tout inclus du plan Standard",
        "3 h d'évolutions / mois",
        "Priorisation tickets",
        "Mini‑report mensuel",
        "Accompagnement stratégique"
      ],
      recommended: false
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
    <section id="maintenance" className="py-16 md:py-24 bg-muted/20">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Maintenance & Support</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Solution complète et sécurisée
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {maintenancePlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className={cn(
                "h-full border-2 hover:shadow-lg transition-all duration-300 relative overflow-hidden",
                plan.recommended && "ring-2 ring-offset-2",
                getThemeBorderColor(),
                plan.recommended && isClient && theme === "robin" && "ring-[#FF0000]",
                plan.recommended && isClient && theme === "starfire" && "ring-[#FF69B4]",
                plan.recommended && isClient && theme === "cyborg" && "ring-[#4169E1]",
                plan.recommended && isClient && theme === "beastboy" && "ring-[#32CD32]",
                plan.recommended && isClient && theme === "raven" && "ring-[#663399]",
                plan.recommended && isClient && theme === "deathstroke" && "ring-[#FF8C00]",
              )}>
                {plan.recommended && (
                  <div className={cn(
                    "absolute top-0 right-0 bg-gradient-to-l from-transparent to-current text-white px-4 py-1 text-sm font-medium",
                    isClient && theme === "robin" && "bg-[#FF0000]",
                    isClient && theme === "starfire" && "bg-[#FF69B4]",
                    isClient && theme === "cyborg" && "bg-[#4169E1]",
                    isClient && theme === "beastboy" && "bg-[#32CD32]",
                    isClient && theme === "raven" && "bg-[#663399]",
                    isClient && theme === "deathstroke" && "bg-[#FF8C00]",
                  )}>
                    Recommandé
                  </div>
                )}
                
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-4">
                    <div className={cn(
                      "p-3 rounded-full",
                      isClient && theme === "robin" && "bg-[#FF0000]/10",
                      isClient && theme === "starfire" && "bg-[#FF69B4]/10",
                      isClient && theme === "cyborg" && "bg-[#4169E1]/10",
                      isClient && theme === "beastboy" && "bg-[#32CD32]/10",
                      isClient && theme === "raven" && "bg-[#663399]/10",
                      isClient && theme === "deathstroke" && "bg-[#FF8C00]/10",
                    )}>
                      <plan.icon className={cn(
                        "h-8 w-8",
                        isClient && theme === "robin" && "text-[#FF0000]",
                        isClient && theme === "starfire" && "text-[#FF69B4]",
                        isClient && theme === "cyborg" && "text-[#4169E1]",
                        isClient && theme === "beastboy" && "text-[#32CD32]",
                        isClient && theme === "raven" && "text-[#663399]",
                        isClient && theme === "deathstroke" && "text-[#FF8C00]",
                      )} />
                    </div>
                  </div>
                  <CardTitle className="text-2xl mb-2">{plan.title}</CardTitle>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-lg text-muted-foreground">{plan.period}</span>
                  </div>
                  <CardDescription className="text-base mt-2">
                    {plan.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start gap-3">
                        <Check className={cn(
                          "h-4 w-4 mt-0.5 flex-shrink-0",
                          isClient && theme === "robin" && "text-[#FF0000]",
                          isClient && theme === "starfire" && "text-[#FF69B4]",
                          isClient && theme === "cyborg" && "text-[#4169E1]",
                          isClient && theme === "beastboy" && "text-[#32CD32]",
                          isClient && theme === "raven" && "text-[#663399]",
                          isClient && theme === "deathstroke" && "text-[#FF8C00]",
                        )} />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    className={cn("w-full mt-6", getThemeColor())}
                    onClick={() => scrollToSection("contact")}
                  >
                    Souscrire
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16 p-6 bg-card border rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="flex items-start gap-4">
            <AlertCircle className={cn(
              "h-6 w-6 mt-1 flex-shrink-0",
              isClient && theme === "robin" && "text-[#FF0000]",
              isClient && theme === "starfire" && "text-[#FF69B4]",
              isClient && theme === "cyborg" && "text-[#4169E1]",
              isClient && theme === "beastboy" && "text-[#32CD32]",
              isClient && theme === "raven" && "text-[#663399]",
              isClient && theme === "deathstroke" && "text-[#FF8C00]",
            )} />
            <div>
              <h3 className="font-semibold mb-2">Important à noter</h3>
              <p className="text-muted-foreground">
                Les coûts d'hébergement/plug‑ins restent à la charge du client ; 
                ordre de grandeur <strong>5–50 €/mois</strong> pour un site simple.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <Button
            size="lg"
            className={cn("mr-4", getThemeColor())}
            onClick={() => scrollToSection("tjm")}
          >
            Voir le TJM
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => scrollToSection("process")}
            className="border-2"
          >
            Voir le process
          </Button>
        </motion.div>
      </div>
    </section>
  )
} 