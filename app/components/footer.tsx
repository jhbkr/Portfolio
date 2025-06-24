"use client"

import { useTheme } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { Github, Twitter, Linkedin, Instagram } from "lucide-react"

export default function Footer() {
  const { theme } = useTheme()

  const getThemeColor = () => {
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
      default:
        return "text-primary"
    }
  }

  const getThemeBgColor = () => {
    switch (theme) {
      case "robin":
        return "bg-[#FF0000]/10"
      case "starfire":
        return "bg-[#FF69B4]/10"
      case "cyborg":
        return "bg-[#4169E1]/10"
      case "beastboy":
        return "bg-[#32CD32]/10"
      case "raven":
        return "bg-[#663399]/10"
      default:
        return "bg-primary/10"
    }
  }

  return (
    <footer className={cn("py-8 border-t", getThemeBgColor())}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link href="/" className={cn("text-xl font-bold", getThemeColor())}>
              Jihad Bakari Portfolio
            </Link>
            <p className="text-sm text-muted-foreground mt-1">&copy; {new Date().getFullYear()} All rights reserved</p>
          </div>

          <div className="flex space-x-4">
            <Link
              href="#"
              className="w-10 h-10 rounded-full flex items-center justify-center bg-background hover:bg-muted transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </Link>
            <Link
              href="#"
              className="w-10 h-10 rounded-full flex items-center justify-center bg-background hover:bg-muted transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5" />
            </Link>
            <Link
              href="#"
              className="w-10 h-10 rounded-full flex items-center justify-center bg-background hover:bg-muted transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </Link>
            <Link
              href="#"
              className="w-10 h-10 rounded-full flex items-center justify-center bg-background hover:bg-muted transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
