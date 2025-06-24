import type React from "react"
import type { Metadata } from "next"
import { Poppins, Montserrat } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import ThemeEffects from "@/components/theme-effects"
// Ajouter l'import pour Batsignal
import ThemeChangeAnimator from "@/components/theme-change-animator"

// Police principale plus stylisée
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
})

// Police secondaire
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "Jihad Bakari Portfolio | Développeur Web & Mobile",
  description: "Portfolio de Jihad Bakari, développeur web et mobile spécialisé Next.js, React, TypeScript. Découvrez mes projets, compétences et contactez-moi.",
  keywords: "Jihad Bakari, Portfolio, Développeur Web, Next.js, React, TypeScript, Lyon, France",
  authors: [{ name: "Jihad Bakari" }],
  robots: "index, follow",
  openGraph: {
    title: "Jihad Bakari Portfolio",
    description: "Portfolio de Jihad Bakari, développeur web et mobile.",
    url: "https://ton-domaine.com",
    siteName: "Jihad Bakari Portfolio",
    images: [
      {
        url: "https://ton-domaine.com/images/portfolio-cover.jpg",
        width: 1200,
        height: 630,
        alt: "Jihad Bakari Portfolio"
      }
    ],
    locale: "fr_FR",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Jihad Bakari Portfolio",
    description: "Portfolio de Jihad Bakari, développeur web et mobile.",
    images: ["https://ton-domaine.com/images/portfolio-cover.jpg"]
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${montserrat.variable} ${poppins.variable} font-montserrat`}>
        <ThemeProvider defaultTheme="system" storageKey="teen-titans-theme">
          {children}
          <ThemeEffects />
          <ThemeChangeAnimator />
        </ThemeProvider>
      </body>
    </html>
  )
}
