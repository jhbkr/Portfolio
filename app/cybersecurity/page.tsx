import { Metadata } from "next"
import CyberHero from "@/components/cybersecurity/cyber-hero"
import CyberTryHackMeStats from "@/components/cybersecurity/cyber-tryhackme-stats"
import CyberSkills from "@/components/cybersecurity/cyber-skills"
import CyberTools from "@/components/cybersecurity/cyber-tools"
import Header from "@/components/header"
import Footer from "@/components/footer"

export const metadata: Metadata = {
    title: "Cybersécurité | Jihad Bakari - Parcours TryHackMe",
    description: "Mon parcours en cybersécurité, mes compétences en pentesting, et ma progression sur TryHackMe. Découvrez mes certifications et outils maîtrisés.",
}

export default function CybersecurityPage() {
    return (
        <main className="min-h-screen bg-background">
            <Header />
            <CyberHero />
            <CyberTryHackMeStats />
            <CyberSkills />
            <CyberTools />
            <Footer />
        </main>
    )
}
