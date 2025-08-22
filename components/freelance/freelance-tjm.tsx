"use client"

import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Euro, TrendingUp, Clock, Calculator } from "lucide-react"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"

export default function FreelanceTJM() {
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
    <section id="tjm" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">TJM de Lancement</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tarif journalier pour missions en régie - Junior Lyon, formation EPITECH
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="border-2 p-8">
              <CardHeader className="text-center pb-6">
                <div className="flex justify-center mb-4">
                  <div className={cn(
                    "p-4 rounded-full",
                    isClient && theme === "robin" && "bg-[#FF0000]/10",
                    isClient && theme === "starfire" && "bg-[#FF69B4]/10",
                    isClient && theme === "cyborg" && "bg-[#4169E1]/10",
                    isClient && theme === "beastboy" && "bg-[#32CD32]/10",
                    isClient && theme === "raven" && "bg-[#663399]/10",
                    isClient && theme === "deathstroke" && "bg-[#FF8C00]/10",
                  )}>
                    <Euro className={cn(
                      "h-12 w-12",
                      isClient && theme === "robin" && "text-[#FF0000]",
                      isClient && theme === "starfire" && "text-[#FF69B4]",
                      isClient && theme === "cyborg" && "text-[#4169E1]",
                      isClient && theme === "beastboy" && "text-[#32CD32]",
                      isClient && theme === "raven" && "text-[#663399]",
                      isClient && theme === "deathstroke" && "text-[#FF8C00]",
                    )} />
                  </div>
                </div>
                <CardTitle className="text-4xl mb-2">260 €</CardTitle>
                <p className="text-xl text-muted-foreground">TJM recommandé (Lyon, junior)</p>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <span className="font-medium">Plancher</span>
                    <Badge variant="outline">240 €/j</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <span className="font-medium">Plafond</span>
                    <Badge variant="outline">300 €/j</Badge>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <TrendingUp className={cn(
                      "h-5 w-5 mt-0.5 flex-shrink-0",
                      isClient && theme === "robin" && "text-[#FF0000]",
                      isClient && theme === "starfire" && "text-[#FF69B4]",
                      isClient && theme === "cyborg" && "text-[#4169E1]",
                      isClient && theme === "beastboy" && "text-[#32CD32]",
                      isClient && theme === "raven" && "text-[#663399]",
                      isClient && theme === "deathstroke" && "text-[#FF8C00]",
                    )} />
                    <span className="text-sm">Aligné sur référentiel junior local (JS, Node, WP ~243–260 €/j)</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calculator className={cn(
                      "h-5 w-5 mt-0.5 flex-shrink-0",
                      isClient && theme === "robin" && "text-[#FF0000]",
                      isClient && theme === "starfire" && "text-[#FF69B4]",
                      isClient && theme === "cyborg" && "text-[#4169E1]",
                      isClient && theme === "beastboy" && "text-[#32CD32]",
                      isClient && theme === "raven" && "text-[#663399]",
                      isClient && theme === "deathstroke" && "text-[#FF8C00]",
                    )} />
                    <span className="text-sm">Rappel marché : moyenne France ≈ 576 €/j (positionnement compétitif)</span>
                  </div>
                </div>
                
                <Button 
                  className={cn("w-full", getThemeColor())}
                  onClick={() => scrollToSection("contact")}
                >
                  Demander un devis régie
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Références Marché</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium text-sm">Moyenne France</span>
                  </div>
                  <p className="text-xl font-bold text-muted-foreground">576 €/j</p>
                  <p className="text-xs text-muted-foreground">Baromètre Malt 2025</p>
                </div>
                
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium text-sm">Juniors Lyon</span>
                  </div>
                  <p className="text-xl font-bold text-muted-foreground">240–260 €/j</p>
                  <p className="text-xs text-muted-foreground">JS/Node/WordPress</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-muted/20 rounded-lg">
                <h4 className="font-semibold mb-2 text-sm">Astuce Marge</h4>
                <p className="text-xs text-muted-foreground">
                  Vise <strong>2–3 jours par 1 000 €</strong> vendus pour la rentabilité.
                </p>
              </div>

              <div className="p-4 bg-card border rounded-lg">
                <h4 className="font-semibold mb-2 text-sm">Charges Sociales</h4>
                <p className="text-xs text-muted-foreground">
                  Micro BNC ≈ <strong>24,6 %</strong> du CA. Garde ~30 %.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Button
            size="lg"
            className={cn("mr-4", getThemeColor())}
            onClick={() => scrollToSection("process")}
          >
            Voir le process
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => scrollToSection("devis")}
            className="border-2"
          >
            Voir les exemples de devis
          </Button>
        </motion.div>
      </div>
    </section>
  )
} 