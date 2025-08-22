"use client"

import { useState, useEffect } from "react"
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Check, Star, Zap, ShoppingCart, Code, Rocket, Crown, TrendingUp } from "lucide-react"
import { motion } from "framer-motion"

export default function FreelancePacks() {
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

  const packs = [
    {
      id: "vitrine-starter",
      title: "Pack Vitrine Starter",
      price: "690 €",
      subtitle: "Pour : artisan, indépendant, association – 1 page 'one‑page'",
      icon: Star,
      features: [
        "Atelier brief (30–45 min), arbo simple, 1 maquette rapide",
        "Design responsive & flat (bonnes pratiques Lighthouse)",
        "1 page défilante : sections Accueil/Services/À‑propos/Contact",
        "Formulaire de contact (anti‑spam), mentions légales, favicon",
        "SEO de base : title/meta, Hn, sitemap/robots, vitesse (Image opti)",
        "Mise en ligne (domaine + hébergement/ Vercel)",
        "1 aller‑retour de révisions (petits ajustements)",
        "Garantie 7 jours correctifs après mise en ligne"
      ],
      delay: "5–7 jours ouvrés",
                    note: "Idéal pour un projet rapide et visible localement."
    },
    {
      id: "vitrine-pro",
      title: "Pack Vitrine Pro",
      price: "1 290 €",
      subtitle: "Pour : TPE/PME – site institutionnel simple",
      icon: Zap,
      popular: true,
      features: [
        "3 à 5 pages (Accueil, Services, Références, À‑propos, Contact)",
        "2 allers‑retours de révisions",
        "Schema.org LocalBusiness + config Google Search Console",
        "Intégration Google Analytics / Matomo",
        "Mini‑guide d'admin (PDF 4–6 pages) + handover 30 min",
        "Tout inclus du Pack Starter"
      ],
      delay: "10–15 jours ouvrés"
    },
    {
      id: "ecommerce-starter",
      title: "Pack E‑commerce Starter",
      price: "1 990 €",
      subtitle: "Pour : boutique 10–30 produits, paiement en ligne",
      icon: ShoppingCart,
      features: [
        "Front Next.js ou thème Shopify/WordPress+Woo (selon besoin)",
        "Panier, paiement (Stripe/PayPal), e‑mails transactionnels",
        "Pages légales (CGV, retours, politique de confidentialité)",
        "SEO produits (title/meta, données structurées Produit)",
        "Formation 1 h prise en main + check‑list exploitation"
      ],
      delay: "3–4 semaines",
      note: "NB coûts récurrents (abonnements/plug‑ins/hébergement) : prévoir 5–50 €/mois pour un site simple."
    },
    {
      id: "mvp-app",
      title: "Pack MVP / App Web + API",
      price: "2 990 €",
      subtitle: "Pour : prototype produit / back‑office simple",
      icon: Code,
      features: [
        "Stack : React/Next.js + Node.js/Express (ou Laravel)",
        "Auth (JWT), Rôles, CRUD, REST/GraphQL, DB (Postgres/Supabase)",
        "Semaines en sprint (démo à chaque itération)",
        "Déploiement (Vercel/Render/Docker léger) + CI de base",
        "Tests d'intégration minimum (routes critiques)"
      ],
      delay: "3–6 semaines selon périmètre (itératif)"
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
    <section id="packs" className="py-16 md:py-24 bg-muted/20">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Offres Packagées</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Prix compétitifs et adaptés à vos besoins
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {packs.map((pack, index) => (
            <motion.div
              key={pack.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Popular badge */}
              {pack.popular && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
                  viewport={{ once: true }}
                  className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10"
                >
                  <Badge className={cn(
                    "px-4 py-1 text-sm font-medium shadow-lg",
                    isClient && theme === "robin" && "bg-[#FF0000] text-white",
                    isClient && theme === "starfire" && "bg-[#FF69B4] text-white",
                    isClient && theme === "cyborg" && "bg-[#4169E1] text-white",
                    isClient && theme === "beastboy" && "bg-[#32CD32] text-white",
                    isClient && theme === "raven" && "bg-[#663399] text-white",
                    isClient && theme === "deathstroke" && "bg-[#FF8C00] text-white",
                  )}>
                    <Crown className="h-3 w-3 mr-1" />
                    Recommandé
                  </Badge>
                </motion.div>
              )}

              <Card className={cn(
                "h-full border-2 hover:shadow-xl transition-all duration-300 relative overflow-hidden transform hover:scale-105",
                "backdrop-blur-sm bg-card/80",
                getThemeBorderColor(),
                pack.popular && "ring-2 ring-primary/20"
              )}>
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
                      <pack.icon className={cn(
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
                  <CardTitle className="text-xl mb-2">{pack.title}</CardTitle>
                  <div className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">{pack.price}</div>
                  <CardDescription className="text-sm">{pack.subtitle}</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {pack.features.slice(0, 4).map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start gap-2">
                        <Check className={cn(
                          "h-3 w-3 mt-0.5 flex-shrink-0",
                          isClient && theme === "robin" && "text-[#FF0000]",
                          isClient && theme === "starfire" && "text-[#FF69B4]",
                          isClient && theme === "cyborg" && "text-[#4169E1]",
                          isClient && theme === "beastboy" && "text-[#32CD32]",
                          isClient && theme === "raven" && "text-[#663399]",
                          isClient && theme === "deathstroke" && "text-[#FF8C00]",
                        )} />
                        <span className="text-xs">{feature}</span>
                      </div>
                    ))}
                    {pack.features.length > 4 && (
                      <p className="text-xs text-muted-foreground mt-2">
                        +{pack.features.length - 4} autres fonctionnalités
                      </p>
                    )}
                  </div>
                  
                  <div className="pt-4 border-t">
                    <Badge variant="outline" className="mb-2">
                      Délai : {pack.delay}
                    </Badge>
                    {pack.note && (
                      <p className="text-xs text-muted-foreground mt-2">{pack.note}</p>
                    )}
                  </div>
                  
                  <Button 
                    className={cn("w-full mt-4", getThemeColor())}
                    onClick={() => scrollToSection("contact")}
                  >
                    Demander un devis
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
            Ces prix "à partir de" sont sous la moyenne marché, mais cohérents avec ce qu'un client s'attend à payer pour un freelance débutant encadré.
          </p>
          <Button
            variant="outline"
            size="lg"
            onClick={() => scrollToSection("options")}
            className="border-2"
          >
            Voir les options supplémentaires
          </Button>
        </motion.div>
      </div>
    </section>
  )
} 