import { Metadata } from "next"
import FreelanceContactForm from "@/components/freelance/freelance-contact-form"
import Header from "@/components/header"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "Contact | Jihad Bakari - Pixel Web",
  description: "Contactez Jihad Bakari pour vos projets de développement web et mobile. Formulaire de contact et devis personnalisé.",
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <FreelanceContactForm />
      <Footer />
    </main>
  )
} 