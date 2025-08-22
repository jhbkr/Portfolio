"use client"

import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { FileText, Download, Eye, Euro, Calendar, CheckCircle, ChevronLeft, ChevronRight, ArrowRight, Target } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useRef, useEffect } from "react"

export default function FreelanceDevis() {
  const { theme } = useTheme()
  const [isClient, setIsClient] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

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

  const devisExamples = [
    {
      id: 1,
      title: "Devis Vitrine Pro (5 pages)",
      price: "1 290 €",
      client: "[Raison sociale] — SIREN [xxx] — Contact : [Nom]",
      project: "Création d'un site vitrine 5 pages (responsive, SEO de base)",
      items: [
        { detail: "Cadrage & arborescence", qty: "1", pu: "170 €", total: "170 €" },
        { detail: "Intégration Front", qty: "1", pu: "660 €", total: "660 €" },
        { detail: "Formulaire & RGPD", qty: "1", pu: "90 €", total: "90 €" },
        { detail: "SEO de base", qty: "1", pu: "160 €", total: "160 €" },
        { detail: "Mise en ligne", qty: "1", pu: "110 €", total: "110 €" }
      ],
      subtotal: "1 190 €",
      options: [
        { detail: "Logo léger", qty: "1", pu: "100 €", total: "100 €" }
      ],
      total: "1 290 €",
      delay: "10–15 jours ouvrés",
      conditions: "40 % à la commande – 40 % à la recette – 20 % à la mise en ligne"
    },
    {
      id: 2,
      title: "Devis E‑commerce Starter (≤ 30 produits)",
      price: "1 990 €",
      client: "Boutique en ligne",
      project: "Création d'une boutique e-commerce avec paiement en ligne",
      items: [
        { detail: "Cadrage & config", qty: "1", pu: "240 €", total: "240 €" },
        { detail: "Catalogue & pages", qty: "1", pu: "680 €", total: "680 €" },
        { detail: "Paiement & e‑mails", qty: "1", pu: "320 €", total: "320 €" },
        { detail: "SEO & perf", qty: "1", pu: "280 €", total: "280 €" },
        { detail: "Mise en ligne & formation", qty: "1", pu: "290 €", total: "290 €" }
      ],
      subtotal: "1 810 €",
      options: [
        { detail: "Import CSV", qty: "1", pu: "180 €", total: "180 €" }
      ],
      total: "1 990 €",
      delay: "3–4 semaines",
      conditions: "40 % à la commande – 40 % à la recette – 20 % à la mise en ligne"
    },
    {
      id: 3,
      title: "Devis MVP App Web + API (sprint 2 sem.)",
      price: "2 990 €",
      client: "Startup / Prototype",
      project: "Développement d'une application web avec API",
      items: [
        { detail: "Sprint 0 (cadrage)", qty: "1", pu: "490 €", total: "490 €" },
        { detail: "Sprint 1 (2 semaines)", qty: "1", pu: "1 250 €", total: "1 250 €" },
        { detail: "Sprint 2 (2 semaines)", qty: "1", pu: "1 250 €", total: "1 250 €" }
      ],
      subtotal: "2 990 €",
      options: [],
      total: "2 990 €",
      delay: "3–6 semaines selon périmètre",
      conditions: "40 % / 40 % / 20 %"
    }
  ]

  const nextDevis = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % devisExamples.length)
    setTimeout(() => setIsTransitioning(false), 600)
  }

  const prevDevis = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + devisExamples.length) % devisExamples.length)
    setTimeout(() => setIsTransitioning(false), 600)
  }

  const goToDevis = (index: number) => {
    if (isTransitioning || index === currentIndex) return
    setIsTransitioning(true)
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
    setTimeout(() => setIsTransitioning(false), 600)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 100) {
      nextDevis()
    } else if (touchEndX.current - touchStartX.current > 100) {
      prevDevis()
    }
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95,
    }),
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
    <section id="devis" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Exemples de DEVIS</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Prêts à copier avec mentions légales complètes
          </p>
        </motion.div>

        <div
          className="relative overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="py-8 relative h-[800px] flex items-center justify-center">
            {/* Devis adjacents */}
            {[currentIndex - 1, currentIndex + 1].map((i, idx) => {
              const index = (i + devisExamples.length) % devisExamples.length;
              const devis = devisExamples[index];
              const isPrev = idx === 0;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8, x: isPrev ? -30 : 30 }}
                  animate={{ opacity: 0.2, scale: 0.9, x: 0 }}
                  exit={{ opacity: 0, scale: 0.8, x: isPrev ? -30 : 30 }}
                  transition={{ duration: 0.3 }}
                  className={
                    isPrev
                      ? "absolute left-0 top-0 h-full w-1/6 pointer-events-none z-0 -translate-x-1/3"
                      : "absolute right-0 top-0 h-full w-1/6 pointer-events-none z-0 translate-x-1/3"
                  }
                  style={{ filter: 'blur(4px)', opacity: 0.2, background: 'rgba(255,255,255,0.05)', boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.1)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
                >
                  <Card className="overflow-hidden border-2 card-glow relative h-full">
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-sm mb-1">{devis.title}</CardTitle>
                          <p className="text-xs text-muted-foreground">{devis.client}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold">{devis.price}</div>
                          <Badge variant="outline" className="text-xs">{devis.delay}</Badge>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                </motion.div>
              );
            })}
            
            {/* Devis courant */}
            <AnimatePresence custom={direction} initial={false} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  type: "tween",
                  duration: 0.35,
                  ease: "easeInOut"
                }}
                className="w-full relative z-10"
              >
                <Card className={cn(
                  "mx-auto max-w-4xl overflow-hidden border-2 card-glow transition-all duration-300",
                  getThemeBorderColor()
                )}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl mb-1">{devisExamples[currentIndex].title}</CardTitle>
                        <p className="text-muted-foreground mb-1">{devisExamples[currentIndex].client}</p>
                        <p className="text-xs text-muted-foreground">{devisExamples[currentIndex].project}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold mb-1">{devisExamples[currentIndex].price}</div>
                        <Badge variant="outline" className="text-xs">{devisExamples[currentIndex].delay}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-3">
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-1 font-medium">Poste</th>
                            <th className="text-left py-1 font-medium">Qté</th>
                            <th className="text-right py-1 font-medium">PU HT</th>
                            <th className="text-right py-1 font-medium">Total HT</th>
                          </tr>
                        </thead>
                        <tbody>
                          {devisExamples[currentIndex].items.map((item, itemIndex) => (
                            <tr key={itemIndex} className="border-b">
                              <td className="py-1">{item.detail}</td>
                              <td className="py-1">{item.qty}</td>
                              <td className="py-1 text-right">{item.pu}</td>
                              <td className="py-1 text-right font-medium">{item.total}</td>
                            </tr>
                          ))}
                          <tr className="font-semibold">
                            <td colSpan={3} className="py-1">Sous‑total HT</td>
                            <td className="py-1 text-right">{devisExamples[currentIndex].subtotal}</td>
                          </tr>
                          {devisExamples[currentIndex].options.length > 0 && (
                            <>
                              <tr className="border-b">
                                <td colSpan={4} className="py-1 text-xs text-muted-foreground">
                                  Option :
                                </td>
                              </tr>
                              {devisExamples[currentIndex].options.map((option, optionIndex) => (
                                <tr key={optionIndex} className="border-b">
                                  <td className="py-1">{option.detail}</td>
                                  <td className="py-1">{option.qty}</td>
                                  <td className="py-1 text-right">{option.pu}</td>
                                  <td className="py-1 text-right font-medium">{option.total}</td>
                                </tr>
                              ))}
                            </>
                          )}
                          <tr className="text-base font-bold">
                            <td colSpan={3} className="py-1">TOTAL HT</td>
                            <td className="py-1 text-right">{devisExamples[currentIndex].total}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-3 border-t">
                      <div>
                        <h4 className="font-semibold mb-1 text-xs">Conditions de paiement</h4>
                        <p className="text-xs text-muted-foreground">{devisExamples[currentIndex].conditions}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1 text-xs">Mentions légales</h4>
                        <div className="text-xs text-muted-foreground space-y-0.5">
                          <p>• TVA : non applicable – art. 293 B CGI</p>
                          <p>• Pénalités : taux légal / jour + 40 € indemnité forfaitaire (B2B)</p>
                          <p>• Validité du devis : 30 jours</p>
                        </div>
                      </div>
                    </div>
                    
                    <Button 
                      className={cn("w-full gap-2 py-2 transform hover:scale-105 transition-all duration-300", getThemeColor())}
                      onClick={() => scrollToSection("contact")}
                    >
                      <FileText className="h-3 w-3" />
                      Demander ce devis
                      <ArrowRight className="h-3 w-3" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
            
            {/* Flèches de navigation */}
            <div className="flex justify-between absolute top-1/2 left-4 right-4 z-20 -translate-y-1/2 pointer-events-auto">
              <Button
                variant="outline"
                size="icon"
                disabled={isTransitioning}
                className={cn(
                  "rounded-full bg-background/20 backdrop-blur-sm border-2 hover:bg-background/40 transition-all duration-200",
                  isTransitioning && "opacity-50 cursor-not-allowed",
                  getThemeBorderColor()
                )}
                onClick={prevDevis}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                disabled={isTransitioning}
                className={cn(
                  "rounded-full bg-background/20 backdrop-blur-sm border-2 hover:bg-background/40 transition-all duration-200",
                  isTransitioning && "opacity-50 cursor-not-allowed",
                  getThemeBorderColor()
                )}
                onClick={nextDevis}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>

        {/* Indicateurs */}
        <motion.div 
          className="flex justify-center gap-3 mt-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ 
            opacity: isTransitioning ? 1 : 0,
            y: isTransitioning ? 0 : 10
          }}
          transition={{ duration: 0.3 }}
        >
          {devisExamples.map((_, index) => (
            <button
              key={index}
              onClick={() => goToDevis(index)}
              disabled={isTransitioning}
              className={cn(
                "w-3 h-3 rounded-full transition-all duration-300 border-2 hover:scale-110",
                index === currentIndex ? getThemeColor() : "bg-transparent",
                getThemeBorderColor(),
                isTransitioning && "cursor-not-allowed"
              )}
              aria-label={`Aller au devis ${index + 1}`}
            />
          ))}
        </motion.div>

        <motion.div
          className="mt-16 p-8 bg-muted/20 rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Mentions légales à ne PAS oublier</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="space-y-2">
                <h4 className="font-semibold flex items-center gap-2">
                  <Euro className="h-4 w-4" />
                  Micro‑entreprise
                </h4>
                <p className="text-sm text-muted-foreground">
                  "TVA non applicable, art. 293 B du CGI" (sur devis & facture).
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Pénalités de retard
                </h4>
                <p className="text-sm text-muted-foreground">
                  Indemnité forfaitaire 40 € (B2B, Code de commerce).
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Devis recommandé
                </h4>
                <p className="text-sm text-muted-foreground">
                  Dès 500 € TTC / "sur‑mesure" ; de toute façon, fais toujours un devis.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          viewport={{ once: true }}
        >
          <Button
            size="lg"
            className={cn("mr-4", getThemeColor())}
            onClick={() => scrollToSection("contact")}
          >
            Demander un devis personnalisé
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