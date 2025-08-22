"use client"

import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Plus, FileText, Globe, Palette, BookOpen, Search, CreditCard, ShoppingCart, Database, Camera } from "lucide-react"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"

export default function FreelanceOptions() {
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

  const options = [
    {
      id: "page-supplementaire",
      title: "Page supplémentaire vitrine",
      description: "Mise en page simple",
      price: "+120 €",
      icon: FileText
    },
    {
      id: "landing-page",
      title: "Landing page performance",
      description: "Copy + A/B léger",
      price: "+290 €",
      icon: FileText
    },
    {
      id: "logo-identite",
      title: "Logo/identité légère",
      description: "Palette + fontes",
      price: "+180 €",
      icon: Palette
    },
    {
      id: "blog",
      title: "Blog",
      description: "Listing + article type, Markdown/CMS headless",
      price: "+240 €",
      icon: BookOpen
    },
    {
      id: "multi-langues",
      title: "Multi‑langues",
      description: "fr+en, 5 pages",
      price: "+220 €",
      icon: Globe
    },
    {
      id: "seo-local",
      title: "SEO local boost",
      description: "GMB + 3 posts + 5 citations annuaires",
      price: "+190 €",
      icon: Search
    },
    {
      id: "stripe-paiement",
      title: "Intégration Stripe",
      description: "Paiement unique",
      price: "+160 €",
      icon: CreditCard
    },
    {
      id: "stripe-abonnement",
      title: "Intégration Stripe abonnement",
      description: "Checkout + webhooks",
      price: "+320 €",
      icon: CreditCard
    },
    {
      id: "import-catalogue",
      title: "Import catalogue",
      description: "CSV ≤ 200 SKU",
      price: "+280 €",
      icon: Database
    },
    {
      id: "pack-shooting",
      title: "Pack shooting",
      description: "Brief + retouche 10 visuels, via partenaire",
      price: "sur devis",
      icon: Camera
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
    <section id="options" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Options & Unités</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Personnalisez vos projets avec ces options à la carte
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {options.map((option, index) => (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              <Card className={cn(
                "h-full border-2 hover:shadow-lg transition-all duration-300 group cursor-pointer",
                getThemeBorderColor()
              )}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className={cn(
                      "p-2 rounded-lg",
                      isClient && theme === "robin" && "bg-[#FF0000]/10",
                      isClient && theme === "starfire" && "bg-[#FF69B4]/10",
                      isClient && theme === "cyborg" && "bg-[#4169E1]/10",
                      isClient && theme === "beastboy" && "bg-[#32CD32]/10",
                      isClient && theme === "raven" && "bg-[#663399]/10",
                      isClient && theme === "deathstroke" && "bg-[#FF8C00]/10",
                    )}>
                      <option.icon className={cn(
                        "h-5 w-5",
                        isClient && theme === "robin" && "text-[#FF0000]",
                        isClient && theme === "starfire" && "text-[#FF69B4]",
                        isClient && theme === "cyborg" && "text-[#4169E1]",
                        isClient && theme === "beastboy" && "text-[#32CD32]",
                        isClient && theme === "raven" && "text-[#663399]",
                        isClient && theme === "deathstroke" && "text-[#FF8C00]",
                      )} />
                    </div>
                    <div className={cn(
                      "text-lg font-bold",
                      isClient && theme === "robin" && "text-[#FF0000]",
                      isClient && theme === "starfire" && "text-[#FF69B4]",
                      isClient && theme === "cyborg" && "text-[#4169E1]",
                      isClient && theme === "beastboy" && "text-[#32CD32]",
                      isClient && theme === "raven" && "text-[#663399]",
                      isClient && theme === "deathstroke" && "text-[#FF8C00]",
                    )}>
                      {option.price}
                    </div>
                  </div>
                  <CardTitle className="text-lg">{option.title}</CardTitle>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground mb-4">
                    {option.description}
                  </p>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    className={cn(
                      "w-full group-hover:scale-105 transition-transform",
                      getThemeBorderColor()
                    )}
                    onClick={() => scrollToSection("contact")}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter au devis
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-muted-foreground mb-6">
            Tu restes dans ton positionnement accessible tout en protégeant ta marge.
          </p>
          <Button
            size="lg"
            className={cn("mr-4", getThemeColor())}
            onClick={() => scrollToSection("maintenance")}
          >
            Voir la maintenance
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => scrollToSection("tjm")}
            className="border-2"
          >
            Voir le TJM
          </Button>
        </motion.div>
      </div>
    </section>
  )
} 