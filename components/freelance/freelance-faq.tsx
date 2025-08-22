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
      category: "delais",
      question: "Quels sont les délais de réalisation ?",
      answer: "Les délais varient selon le pack : Pack Vitrine (1-2 semaines), Pack E-commerce (3-4 semaines), Pack MVP (4-6 semaines). Pour les projets sur mesure, le délai est défini selon le cahier des charges. Ces délais sont indicatifs et peuvent varier selon la complexité du projet."
    },
    {
      id: 2,
      category: "revisions",
      question: "Combien de révisions sont incluses ?",
      answer: "Chaque phase de développement inclut 2 allers-retours de révisions. Les modifications mineures sont incluses dans le prix initial. Les modifications majeures font l'objet d'un devis complémentaire. Je m'engage à répondre sous 48h ouvrées maximum."
    },
    {
      id: 3,
      category: "livrable",
      question: "Que recevrai-je à la livraison ?",
      answer: "Vous recevrez : le site mis en ligne et fonctionnel, les fichiers sources, une documentation technique, une formation d'utilisation, et 7 jours d'assistance technique post-livraison. La propriété intellectuelle est transférée une fois la prestation entièrement soldée."
    },
    {
      id: 4,
      category: "hebergement",
      question: "Proposez-vous l'hébergement ?",
      answer: "Je peux recommander des solutions d'hébergement adaptées à votre projet. Les frais récurrents varient selon la solution : environ 5-50€/mois pour un site simple (hébergement + outils). Je peux également gérer la mise en ligne pour vous."
    },
    {
      id: 5,
      category: "support",
      question: "Quel support après la livraison ?",
      answer: "Inclus : 7 jours d'assistance technique gratuite après la mise en ligne. Pour un support continu, je propose des contrats de maintenance séparés. La garantie bugfix couvre 7 jours après la livraison."
    },
    {
      id: 6,
      category: "droits",
      question: "Qui possède les droits du site ?",
      answer: "La propriété intellectuelle des développements réalisés est transférée au client une fois la prestation entièrement soldée. Le client s'engage à respecter les droits de propriété intellectuelle du prestataire sur les éléments techniques, frameworks et bibliothèques utilisés."
    },
    {
      id: 7,
      category: "tva",
      question: "Facturez-vous la TVA ?",
      answer: "Non, je suis en franchise de base de TVA (art. 293 B du CGI). Tous les prix sont exprimés hors taxes. La TVA n'est pas applicable sur mes prestations."
    },
    {
      id: 8,
      category: "facturation",
      question: "Comment fonctionne la facturation ?",
      answer: "Modalités de paiement : 40% d'acompte à la commande, 40% à la recette, 20% à la mise en ligne. Paiement par virement bancaire ou chèque. Délai de paiement : 30 jours fin de mois (B2B). En cas de retard, des pénalités s'appliquent (taux légal + 40€ indemnité forfaitaire)."
    },
    {
      id: 9,
      category: "pricing",
      question: "Pourquoi vos prix sont-ils compétitifs ?",
      answer: "Mes process et gages de qualité (performance, SEO, documentation, garantie) sécurisent le résultat. Les tarifs sont adaptés à la complexité et à la valeur ajoutée de chaque projet."
    },
    {
      id: 10,
      category: "project",
      question: "Que faire si je n'ai pas tous les contenus ?",
      answer: "Je fournis un gabarit et j'intègre les contenus au fil de l'eau. Je peux aussi proposer une prestation de rédaction de contenu (option). Nous pouvons commencer le développement avec des contenus de placeholder et les remplacer progressivement."
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