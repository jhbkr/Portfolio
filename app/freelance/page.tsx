import { Metadata } from "next"
import FreelanceHero from "@/components/freelance/freelance-hero"
import FreelancePacks from "@/components/freelance/freelance-packs"
import FreelanceOptions from "@/components/freelance/freelance-options"
import FreelanceMaintenance from "@/components/freelance/freelance-maintenance"
import FreelanceTJM from "@/components/freelance/freelance-tjm"
import FreelanceProcess from "@/components/freelance/freelance-process"
import FreelanceDevis from "@/components/freelance/freelance-devis"
import FreelanceFAQ from "@/components/freelance/freelance-faq"
import FreelanceContactForm from "@/components/freelance/freelance-contact-form"
import Header from "@/components/header"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "Freelance | Jihad Bakari - Pixel Web",
  description: "Services de développement web et mobile freelance. Packs personnalisés, devis sur mesure et accompagnement complet pour vos projets digitaux.",
}

export default function FreelancePage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <FreelanceHero />
      <FreelancePacks />
      <FreelanceProcess />
      <FreelanceOptions />
      <FreelanceTJM />
      <FreelanceDevis />
      <FreelanceMaintenance />
      <FreelanceFAQ />
      <FreelanceContactForm />
      <Footer />
    </main>
  )
} 