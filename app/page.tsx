import Header from "@/components/header"
import Hero from "@/components/hero"
import About from "@/components/about"
import Timeline from "@/components/timeline"
import ProjectsCarousel from "@/components/projects-carousel"
import Skills from "@/components/skills"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import Reviews from "@/components/reviews"
import IntroAnimation from "@/components/intro-animation"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <IntroAnimation />
      <Header />
      <Hero />
      <About />
      <Timeline />
      <ProjectsCarousel />
      <Skills />
      <Contact />
      <Reviews />
      <Footer />
    </main>
  )
}
