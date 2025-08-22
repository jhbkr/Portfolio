"use client"

import { useState, useEffect } from "react"
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Send, Phone, Mail, Building, Target, Calendar, Euro, MessageSquare } from "lucide-react"
import { motion } from "framer-motion"

export default function FreelanceContactForm() {
  const { theme } = useTheme()
  const [isClient, setIsClient] = useState(false)
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    telephone: "",
    societe: "",
    objectif: "",
    pack: "",
    budget: "",
    delais: "",
    commentaires: "",
    accepteCGV: false,
    accepteRGPD: false
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const getThemeColor = () => {
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

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.accepteCGV || !formData.accepteRGPD) {
      alert("Veuillez accepter les conditions générales de vente et la politique de confidentialité.")
      return
    }

    setIsSubmitting(true)

    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setIsSubmitted(true)
      setFormData({
        nom: "",
        email: "",
        telephone: "",
        societe: "",
        objectif: "",
        pack: "",
        budget: "",
        delais: "",
        commentaires: "",
        accepteCGV: false,
        accepteRGPD: false
      })
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error)
      alert('Une erreur est survenue lors de l\'envoi. Veuillez réessayer.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="container mx-auto px-4 py-16 max-w-2xl"
      >
        <Card className="text-center p-8">
          <CardContent className="space-y-6">
            <div className="w-16 h-16 mx-auto bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
              <Send className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-2xl font-bold">Message envoyé avec succès !</h2>
            <p className="text-muted-foreground">
              Merci pour votre message. Je vous répondrai dans les plus brefs délais 
              (généralement sous 24h ouvrées).
            </p>
            <p className="text-sm text-muted-foreground">
              Un email de confirmation a été envoyé à l'adresse {formData.email}
            </p>
            <Button 
              onClick={() => setIsSubmitted(false)}
              className={cn("mt-4", getThemeColor())}
            >
              Envoyer un autre message
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  return (
    <section id="contact" className="py-16 bg-muted/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Contactez-moi pour votre projet
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Remplissez ce formulaire pour me présenter votre projet. 
            Je vous répondrai rapidement avec un devis personnalisé.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center">
                Formulaire de contact / Brief projet
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="nom" className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" />
                      Nom complet *
                    </Label>
                    <Input
                      id="nom"
                      value={formData.nom}
                      onChange={(e) => handleInputChange('nom', e.target.value)}
                      placeholder="Votre nom complet"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="votre@email.com"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="telephone" className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Téléphone *
                    </Label>
                    <Input
                      id="telephone"
                      type="tel"
                      value={formData.telephone}
                      onChange={(e) => handleInputChange('telephone', e.target.value)}
                      placeholder="06 12 34 56 78"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="societe" className="flex items-center gap-2">
                      <Building className="w-4 h-4" />
                      Société (optionnel)
                    </Label>
                    <Input
                      id="societe"
                      value={formData.societe}
                      onChange={(e) => handleInputChange('societe', e.target.value)}
                      placeholder="Nom de votre entreprise"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="objectif" className="flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    Objectif du projet *
                  </Label>
                  <Textarea
                    id="objectif"
                    value={formData.objectif}
                    onChange={(e) => handleInputChange('objectif', e.target.value)}
                    placeholder="Décrivez brièvement votre projet, vos objectifs et vos attentes..."
                    rows={4}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="pack">Pack choisi</Label>
                    <Select value={formData.pack} onValueChange={(value) => handleInputChange('pack', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez un pack" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="vitrine">Pack Vitrine</SelectItem>
                        <SelectItem value="ecommerce">Pack E-commerce</SelectItem>
                        <SelectItem value="mvp">Pack MVP</SelectItem>
                        <SelectItem value="sur-mesure">Projet sur mesure</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                        <SelectItem value="autre">Autre</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="budget" className="flex items-center gap-2">
                      <Euro className="w-4 h-4" />
                      Budget indicatif
                    </Label>
                    <Select value={formData.budget} onValueChange={(value) => handleInputChange('budget', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Budget estimé" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1000-2000">1 000 - 2 000 €</SelectItem>
                        <SelectItem value="2000-5000">2 000 - 5 000 €</SelectItem>
                        <SelectItem value="5000-10000">5 000 - 10 000 €</SelectItem>
                        <SelectItem value="10000+">10 000 € +</SelectItem>
                        <SelectItem value="non-defini">À définir</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="delais" className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Délais souhaités
                    </Label>
                    <Select value={formData.delais} onValueChange={(value) => handleInputChange('delais', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Délai souhaité" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="urgent">Urgent (moins de 2 semaines)</SelectItem>
                        <SelectItem value="normal">Normal (1-2 mois)</SelectItem>
                        <SelectItem value="flexible">Flexible (2-6 mois)</SelectItem>
                        <SelectItem value="non-defini">À définir</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="commentaires">Commentaires supplémentaires</Label>
                  <Textarea
                    id="commentaires"
                    value={formData.commentaires}
                    onChange={(e) => handleInputChange('commentaires', e.target.value)}
                    placeholder="Informations complémentaires, contraintes techniques, questions spécifiques..."
                    rows={3}
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="accepteCGV"
                      checked={formData.accepteCGV}
                      onCheckedChange={(checked) => handleInputChange('accepteCGV', checked as boolean)}
                      required
                    />
                    <Label htmlFor="accepteCGV" className="text-sm leading-relaxed">
                      J'ai lu et j'accepte les{" "}
                      <a 
                        href="/cgv" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:underline font-medium"
                      >
                        conditions générales de vente
                      </a>
                      *
                    </Label>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="accepteRGPD"
                      checked={formData.accepteRGPD}
                      onCheckedChange={(checked) => handleInputChange('accepteRGPD', checked as boolean)}
                      required
                    />
                    <Label htmlFor="accepteRGPD" className="text-sm leading-relaxed">
                      J'accepte que mes données soient traitées conformément à la{" "}
                      <a 
                        href="/mentions-legales" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:underline font-medium"
                      >
                        politique de confidentialité
                      </a>
                      *
                    </Label>
                  </div>
                </div>

                <div className="text-center pt-6">
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className={cn(
                      "px-8 py-3 text-lg gap-3",
                      getThemeColor()
                    )}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Envoyer ma demande
                      </>
                    )}
                  </Button>
                  <p className="text-sm text-muted-foreground mt-3">
                    * Champs obligatoires
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
