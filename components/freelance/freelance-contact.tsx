"use client"

import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { Mail, Phone, MapPin, Send, Calendar, FileText } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"

export default function FreelanceContact() {
  const { theme } = useTheme()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    project: "",
    budget: "",
    message: ""
  })

  const getThemeColor = () => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Logique d'envoi du formulaire
    console.log("Formulaire soumis:", formData)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <section id="contact" className="py-16 md:py-24 bg-muted/20">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Contact & Devis</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Prêt à lancer votre projet ? Discutons de vos besoins
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="border-2 p-6">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl mb-2">Informations de contact</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Contactez-moi directement ou planifiez un appel découverte
                </p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "p-2 rounded-full",
                      theme === "robin" && "bg-[#FF0000]/10",
                      theme === "starfire" && "bg-[#FF69B4]/10",
                      theme === "cyborg" && "bg-[#4169E1]/10",
                      theme === "beastboy" && "bg-[#32CD32]/10",
                      theme === "raven" && "bg-[#663399]/10",
                      theme === "deathstroke" && "bg-[#FF8C00]/10",
                    )}>
                      <Mail className={cn(
                        "h-4 w-4",
                        theme === "robin" && "text-[#FF0000]",
                        theme === "starfire" && "text-[#FF69B4]",
                        theme === "cyborg" && "text-[#4169E1]",
                        theme === "beastboy" && "text-[#32CD32]",
                        theme === "raven" && "text-[#663399]",
                        theme === "deathstroke" && "text-[#FF8C00]",
                      )} />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Email</p>
                      <p className="text-xs text-muted-foreground">jihad.bakari@epitech.eu</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "p-3 rounded-full",
                      theme === "robin" && "bg-[#FF0000]/10",
                      theme === "starfire" && "bg-[#FF69B4]/10",
                      theme === "cyborg" && "bg-[#4169E1]/10",
                      theme === "beastboy" && "bg-[#32CD32]/10",
                      theme === "raven" && "bg-[#663399]/10",
                      theme === "deathstroke" && "bg-[#FF8C00]/10",
                    )}>
                      <Phone className={cn(
                        "h-5 w-5",
                        theme === "robin" && "text-[#FF0000]",
                        theme === "starfire" && "text-[#FF69B4]",
                        theme === "cyborg" && "text-[#4169E1]",
                        theme === "beastboy" && "text-[#32CD32]",
                        theme === "raven" && "text-[#663399]",
                        theme === "deathstroke" && "text-[#FF8C00]",
                      )} />
                    </div>
                    <div>
                      <p className="font-medium">Téléphone</p>
                      <p className="text-sm text-muted-foreground">0661527754</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "p-3 rounded-full",
                      theme === "robin" && "bg-[#FF0000]/10",
                      theme === "starfire" && "bg-[#FF69B4]/10",
                      theme === "cyborg" && "bg-[#4169E1]/10",
                      theme === "beastboy" && "bg-[#32CD32]/10",
                      theme === "raven" && "bg-[#663399]/10",
                      theme === "deathstroke" && "bg-[#FF8C00]/10",
                    )}>
                      <MapPin className={cn(
                        "h-5 w-5",
                        theme === "robin" && "text-[#FF0000]",
                        theme === "starfire" && "text-[#FF69B4]",
                        theme === "cyborg" && "text-[#4169E1]",
                        theme === "beastboy" && "text-[#32CD32]",
                        theme === "raven" && "text-[#663399]",
                        theme === "deathstroke" && "text-[#FF8C00]",
                      )} />
                    </div>
                    <div>
                      <p className="font-medium">Zone d'intervention</p>
                      <p className="text-sm text-muted-foreground">Lyon, France – Remote</p>
                    </div>
                  </div>
                </div>
                
                <div className="pt-6 border-t">
                  <h3 className="font-semibold mb-4">Actions rapides</h3>
                  <div className="space-y-3">
                    <Button 
                      className={cn("w-full justify-start", getThemeColor())}
                      onClick={() => window.open('mailto:jihad.bakari@epitech.eu')}
                    >
                      <Mail className="mr-2 h-4 w-4" />
                      Envoyer un email
                    </Button>
                    <Button 
                      variant="outline" 
                      className={cn("w-full justify-start", getThemeBorderColor())}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      Planifier un appel 15 min
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="border-2 p-8">
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl mb-2">Demande de devis</CardTitle>
                <p className="text-muted-foreground">
                  Remplissez ce formulaire pour recevoir un devis personnalisé sous 24h
                </p>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nom complet *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Votre nom"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="votre@email.com"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="company">Entreprise</Label>
                      <Input
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder="Nom de votre entreprise"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="budget">Budget estimé</Label>
                      <Input
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleInputChange}
                        placeholder="Budget en €"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="project">Type de projet *</Label>
                    <Input
                      id="project"
                      name="project"
                      value={formData.project}
                      onChange={handleInputChange}
                      required
                      placeholder="Site vitrine, e-commerce, application web..."
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Description du projet *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      placeholder="Décrivez votre projet, vos besoins, vos contraintes..."
                      rows={5}
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className={cn("w-full", getThemeColor())}
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Envoyer ma demande de devis
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          className="mt-16 p-8 bg-card border-2 rounded-lg text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold mb-4">Réponse garantie sous 24h</h3>
          <p className="text-muted-foreground mb-6">
            Je m'engage à vous répondre dans les 24h avec un devis détaillé et un planning personnalisé
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Devis détaillé
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Planning personnalisé
            </div>
            <div className="flex items-center gap-2">
              <Send className="h-4 w-4" />
              Réponse sous 24h
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 