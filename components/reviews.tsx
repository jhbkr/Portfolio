"use client"

import { useState, useEffect } from "react"
import { useTheme } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { Star, MessageSquare, User } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type Review = {
  id: number
  name: string
  avatar: string
  rating: number
  date: string
  comment: string
}

export default function Reviews() {
  const { theme } = useTheme()
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)

  // Simuler le chargement des avis en temps réel
  useEffect(() => {
    const initialReviews = [
      {
        id: 1,
        name: "Sophie Martin",
        avatar: "/placeholder.svg?height=50&width=50",
        rating: 5,
        date: "15 mars 2025",
        comment:
          "Un portfolio impressionnant avec un design unique. J'adore le thème Teen Titans et la façon dont les couleurs changent!",
      },
      {
        id: 2,
        name: "Thomas Dubois",
        avatar: "/placeholder.svg?height=50&width=50",
        rating: 4,
        date: "10 mars 2025",
        comment:
          "Très beau travail sur l'interface utilisateur. Les animations sont fluides et le contenu est bien organisé.",
      },
      {
        id: 3,
        name: "Emma Petit",
        avatar: "/placeholder.svg?height=50&width=50",
        rating: 5,
        date: "5 mars 2025",
        comment: "Un des portfolios les plus créatifs que j'ai vus. La timeline est particulièrement bien réalisée.",
      },
    ]

    setReviews(initialReviews)
    setLoading(false)

    // Simuler l'arrivée de nouveaux avis en temps réel
    const interval = setInterval(() => {
      const newReview = {
        id: Date.now(),
        name:
          ["Alex", "Julie", "Marc", "Léa", "Karim", "Nadia"][Math.floor(Math.random() * 6)] +
          " " +
          ["Bernard", "Leroy", "Moreau", "Fournier", "Lambert", "Girard"][Math.floor(Math.random() * 6)],
        avatar: "/placeholder.svg?height=50&width=50",
        rating: Math.floor(Math.random() * 2) + 4, // 4 ou 5 étoiles
        date: new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" }),
        comment: [
          "Design très original, j'adore le thème!",
          "Superbe portfolio, très professionnel.",
          "Interface intuitive et contenu bien présenté.",
          "Les animations sont vraiment impressionnantes!",
          "Un travail remarquable, bravo!",
          "Très bonne présentation des compétences et projets.",
        ][Math.floor(Math.random() * 6)],
      }

      setReviews((prev) => [newReview, ...prev.slice(0, 5)])
    }, 15000) // Nouvel avis toutes les 15 secondes

    return () => clearInterval(interval)
  }, [])

  const getThemeColor = () => {
    switch (theme) {
      case "robin":
        return "bg-[#FF0000]"
      case "starfire":
        return "bg-[#FF69B4]"
      case "cyborg":
        return "bg-[#4169E1]"
      case "beastboy":
        return "bg-[#32CD32]"
      case "raven":
        return "bg-[#663399]"
      case "deathstroke":
        return "bg-[#FF8C00]"
      default:
        return "bg-primary"
    }
  }

  const getThemeTextColor = () => {
    switch (theme) {
      case "robin":
        return "text-[#FF0000]"
      case "starfire":
        return "text-[#FF69B4]"
      case "cyborg":
        return "text-[#4169E1]"
      case "beastboy":
        return "text-[#32CD32]"
      case "raven":
        return "text-[#663399]"
      case "deathstroke":
        return "text-[#FF8C00]"
      default:
        return "text-primary"
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

  return (
    <section id="reviews" className="py-24 md:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Avis des Visiteurs</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Découvrez ce que les visiteurs pensent de mon portfolio en temps réel.
          </p>
          <div className="flex items-center justify-center mt-4">
            <div className={cn("w-12 h-12 rounded-full flex items-center justify-center mr-2", getThemeColor())}>
              <MessageSquare className="h-6 w-6 text-white" />
            </div>
          </div>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {reviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className={cn("h-full border-2 card-glow", getThemeBorderColor())}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center mb-2">
                      <div className="w-10 h-10 rounded-full overflow-hidden mr-3 bg-muted flex items-center justify-center">
                        <User className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{review.name}</CardTitle>
                        <p className="text-xs text-muted-foreground">{review.date}</p>
                      </div>
                    </div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={cn("h-4 w-4", i < review.rating ? getThemeTextColor() : "text-muted")}
                          fill={i < review.rating ? "currentColor" : "none"}
                        />
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{review.comment}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
