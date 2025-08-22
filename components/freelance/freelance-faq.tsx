"use client"

import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { ChevronDown, ChevronUp, HelpCircle, Euro, FileText, Clock, Shield, Search, Filter } from "lucide-react"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"

export default function FreelanceFAQ() {
  const { theme } = useTheme()
  const [isClient, setIsClient] = useState(false)
  const [openItems, setOpenItems] = useState<number[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  useEffect(() => {
    setIsClient(true)
  }, [])

  const getThemeColor = () => {
    // Retourner une couleur par défaut pour le SSR
    if (!isClient) {
      return "bg-primary hover:bg-primary/90"
    }

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
    // Retourner une couleur par défaut pour le SSR
    if (!isClient) {
      return "border-primary"
    }

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

  const faqs = [
    {
      id: 1,
      category: "pricing",
      question: "Pourquoi vos prix sont 'bas' ?",
      answer: "Je me positionne en junior (formation EPITECH) pour signer vite et bâtir des références. Mes process et gages de qualité (perf, SEO, doc, garantie) sécurisent le résultat. Les tarifs évolueront avec l'expérience."
    },
    {
      id: 2,
      category: "project",
      question: "Et si je n'ai pas encore tous les contenus ?",
      answer: "Je fournis un gabarit et j'intègre les contenus au fil de l'eau ; je peux aussi proposer une prestation de copy (option)."
    },
    {
      id: 3,
      category: "technical",
      question: "Hébergement & frais récurrents ?",
      answer: "Variables selon la solution choisie ; pour un site simple, prévoir environ 5–50 €/mois (hébergement/outils)."
    },
    {
      id: 4,
      category: "legal",
      question: "Vous facturez la TVA ?",
      answer: "Non, je suis en franchise de base de TVA (mention art. 293 B sur devis/factures)."
    },
    {
      id: 5,
      category: "payment",
      question: "Quels sont les délais de paiement ?",
      answer: "Échéances : 40 % commande, 40 % recette, 20 % livraison ; paiement sous 30 jours fin de mois (B2B)."
    },
    {
      id: 6,
      category: "legal",
      question: "Que se passe-t-il en cas de retard de paiement ?",
      answer: "Retard : pénalités au taux légal + indemnité forfaitaire 40 € (B2B), sans préjudice d'un complément si frais supérieurs."
    },
    {
      id: 7,
      category: "guarantee",
      question: "Quelle est la garantie après livraison ?",
      answer: "Garantie 7 jours après mise en ligne pour corrections de bugs non induits par des interventions tierces."
    },
    {
      id: 8,
      category: "project",
      question: "Puis-je modifier le projet en cours de route ?",
      answer: "Toute demande hors périmètre initial fera l'objet d'un avenant (nouveau devis)."
    },
    {
      id: 9,
      category: "profile",
      question: "Quelle est votre formation et expérience ?",
      answer: "Formation EPITECH Développeur Web Full-Stack (2024-2026), compétences en React/Next.js, Node.js, PHP, et développement mobile. Passionné par les nouvelles technologies."
    },
    {
      id: 10,
      category: "work",
      question: "Travaillez-vous en remote ?",
      answer: "Oui, je travaille principalement en remote depuis Lyon. Je peux me déplacer pour des réunions importantes si nécessaire."
    }
  ]

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const categories = [
    { id: "all", label: "Toutes", icon: Filter },
    { id: "pricing", label: "Prix", icon: Euro },
    { id: "project", label: "Projet", icon: FileText },
    { id: "technical", label: "Technique", icon: Shield },
    { id: "legal", label: "Légal", icon: FileText },
    { id: "payment", label: "Paiement", icon: Clock },
    { id: "guarantee", label: "Garantie", icon: Shield },
    { id: "profile", label: "Profil", icon: HelpCircle },
    { id: "work", label: "Travail", icon: Clock }
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
    <section id="faq" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">FAQ</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Questions fréquentes pour rassurer et convertir
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          className="max-w-4xl mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Rechercher dans les questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg bg-background/50 backdrop-blur-sm"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={cn(
                    "flex items-center gap-1 px-3 py-1 rounded-full text-xs border transition-all duration-200",
                    selectedCategory === category.id
                      ? "bg-primary text-white border-primary"
                      : "bg-background/50 border-border hover:bg-background/80"
                  )}
                >
                  <category.icon className="h-3 w-3" />
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-6xl mx-auto">
          {filteredFaqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className={cn(
                "border-2 hover:shadow-lg transition-all duration-300 cursor-pointer",
                getThemeBorderColor(),
                openItems.includes(faq.id) && "shadow-lg"
              )}>
                <CardHeader 
                  className="pb-3"
                  onClick={() => toggleItem(faq.id)}
                >
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base flex items-center gap-2">
                      <HelpCircle className={cn(
                        "h-4 w-4",
                        isClient && theme === "robin" && "text-[#FF0000]",
                        isClient && theme === "starfire" && "text-[#FF69B4]",
                        isClient && theme === "cyborg" && "text-[#4169E1]",
                        isClient && theme === "beastboy" && "text-[#32CD32]",
                        isClient && theme === "raven" && "text-[#663399]",
                        isClient && theme === "deathstroke" && "text-[#FF8C00]",
                      )} />
                      {faq.question}
                    </CardTitle>
                    {openItems.includes(faq.id) ? (
                      <ChevronUp className={cn(
                        "h-4 w-4 transition-transform",
                        isClient && theme === "robin" && "text-[#FF0000]",
                        isClient && theme === "starfire" && "text-[#FF69B4]",
                        isClient && theme === "cyborg" && "text-[#4169E1]",
                        isClient && theme === "beastboy" && "text-[#32CD32]",
                        isClient && theme === "raven" && "text-[#663399]",
                        isClient && theme === "deathstroke" && "text-[#FF8C00]",
                      )} />
                    ) : (
                      <ChevronDown className={cn(
                        "h-4 w-4 transition-transform",
                        isClient && theme === "robin" && "text-[#FF0000]",
                        isClient && theme === "starfire" && "text-[#FF69B4]",
                        isClient && theme === "cyborg" && "text-[#4169E1]",
                        isClient && theme === "beastboy" && "text-[#32CD32]",
                        isClient && theme === "raven" && "text-[#663399]",
                        isClient && theme === "deathstroke" && "text-[#FF8C00]",
                      )} />
                    )}
                  </div>
                </CardHeader>
                
                {openItems.includes(faq.id) && (
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </CardContent>
                )}
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16 p-8 bg-muted/20 rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Vous avez d'autres questions ?</h3>
            <p className="text-lg text-muted-foreground mb-6">
              N'hésitez pas à me contacter pour toute question spécifique à votre projet
            </p>
            <Button
              size="lg"
              className={cn("mr-4", getThemeColor())}
              onClick={() => scrollToSection("contact")}
            >
              Me contacter
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => scrollToSection("devis")}
              className="border-2"
            >
              Voir les exemples de devis
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 