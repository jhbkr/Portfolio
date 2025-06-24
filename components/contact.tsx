"use client"

import type React from "react"

import { useState } from "react"
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { Send, Mail, Phone, MapPin, Github, Linkedin, Twitter } from "lucide-react"
import { motion } from "framer-motion"

export default function Contact() {
  const { theme } = useTheme()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        alert("Message envoyé !");
        setFormData({ name: "", email: "", message: "" });
      } else {
        alert("Erreur lors de l'envoi du message.");
      }
    } catch (err) {
      alert("Erreur lors de l'envoi du message.");
    }
  }

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

  return (
    <section id="contact" className="py-24 md:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Me Contacter</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Vous avez une question ou souhaitez travailler ensemble ? N'hésitez pas à me contacter !
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className={cn("p-8 rounded-2xl border-2 card-glow", getThemeBorderColor())}>
              <h3 className="text-2xl font-bold mb-6">Informations de Contact</h3>

              <div className="space-y-6">
                <div className="flex items-center">
                  <div className={cn("w-12 h-12 rounded-full flex items-center justify-center mr-4", getThemeColor())}>
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium text-lg">jihad.bakari@epitech.eu</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className={cn("w-12 h-12 rounded-full flex items-center justify-center mr-4", getThemeColor())}>
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Téléphone</p>
                    <p className="font-medium text-lg">0661527754</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className={cn("w-12 h-12 rounded-full flex items-center justify-center mr-4", getThemeColor())}>
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Localisation</p>
                    <p className="font-medium text-lg">Lyon, France</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-border">
                <h4 className="text-lg font-semibold mb-4">Retrouvez-moi sur</h4>
                <div className="flex space-x-4">
                  <a
                    href="https://github.com/jhbkr"
                    className={cn("w-10 h-10 rounded-full flex items-center justify-center", getThemeColor())}
                    aria-label="GitHub"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="h-5 w-5 text-white" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/jihad-bakari/"
                    className={cn("w-10 h-10 rounded-full flex items-center justify-center", getThemeColor())}
                    aria-label="LinkedIn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin className="h-5 w-5 text-white" />
                  </a>
                  <a
                    href="#"
                    className={cn("w-10 h-10 rounded-full flex items-center justify-center", getThemeColor())}
                    aria-label="Twitter"
                  >
                    <Twitter className="h-5 w-5 text-white" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <form
              onSubmit={handleSubmit}
              className={cn("p-8 rounded-2xl border-2 card-glow space-y-6", getThemeBorderColor())}
            >
              <h3 className="text-2xl font-bold mb-6">Envoyez-moi un message</h3>

              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Nom
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Votre nom"
                  required
                  className={cn("w-full bg-background/50 border-2 h-12", getThemeBorderColor())}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Votre email"
                  required
                  className={cn("w-full bg-background/50 border-2 h-12", getThemeBorderColor())}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Votre message"
                  required
                  className={cn("w-full bg-background/50 border-2 min-h-[150px]", getThemeBorderColor())}
                />
              </div>

              <Button type="submit" className={cn("w-full gap-2 h-12 text-lg", getThemeColor())}>
                <Send className="h-5 w-5" />
                Envoyer
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
