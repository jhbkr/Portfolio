import FreelanceHero from "@/components/freelance/freelance-hero"
import FreelancePacks from "@/components/freelance/freelance-packs"
import FreelanceOptions from "@/components/freelance/freelance-options"
import FreelanceMaintenance from "@/components/freelance/freelance-maintenance"
import FreelanceTJM from "@/components/freelance/freelance-tjm"
import FreelanceProcess from "@/components/freelance/freelance-process"
import FreelanceDevis from "@/components/freelance/freelance-devis"
import FreelanceFAQ from "@/components/freelance/freelance-faq"
import FreelanceContact from "@/components/freelance/freelance-contact"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function FreelancePage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <FreelanceHero />
      <FreelancePacks />
      <FreelanceProcess />
      <FreelanceTJM />
      <FreelanceDevis />
      <FreelanceOptions />
      <FreelanceMaintenance />
      <FreelanceFAQ />
      <FreelanceContact />
      <Footer />
    </main>
  )
} 