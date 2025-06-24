import type React from "react"
// Déclarations de types pour les modules manquants
declare module "react" {
  export * from "react"
}

declare module "framer-motion" {
  export const motion: any
  export const AnimatePresence: any
  export const useAnimation: any
  export const useMotionValue: any
  export const useTransform: any
  export const useScroll: any
  export const useSpring: any
  export const useCycle: any
}

declare module "lucide-react" {
  import type { FC, SVGProps } from "react"
  export const ArrowRight: FC<SVGProps<SVGSVGElement>>
  export const Download: FC<SVGProps<SVGSVGElement>>
  export const Sun: FC<SVGProps<SVGSVGElement>>
  export const Moon: FC<SVGProps<SVGSVGElement>>
  export const Palette: FC<SVGProps<SVGSVGElement>>
  export const Menu: FC<SVGProps<SVGSVGElement>>
  export const X: FC<SVGProps<SVGSVGElement>>
  export const ChevronLeft: FC<SVGProps<SVGSVGElement>>
  export const ChevronRight: FC<SVGProps<SVGSVGElement>>
  export const Github: FC<SVGProps<SVGSVGElement>>
  export const ExternalLink: FC<SVGProps<SVGSVGElement>>
  export const Mail: FC<SVGProps<SVGSVGElement>>
  export const Phone: FC<SVGProps<SVGSVGElement>>
  export const MapPin: FC<SVGProps<SVGSVGElement>>
  export const Linkedin: FC<SVGProps<SVGSVGElement>>
  export const Twitter: FC<SVGProps<SVGSVGElement>>
  export const Send: FC<SVGProps<SVGSVGElement>>
  export const MessageSquare: FC<SVGProps<SVGSVGElement>>
  export const Star: FC<SVGProps<SVGSVGElement>>
  export const User: FC<SVGProps<SVGSVGElement>>
  export const Briefcase: FC<SVGProps<SVGSVGElement>>
  export const GraduationCap: FC<SVGProps<SVGSVGElement>>
  export const Languages: FC<SVGProps<SVGSVGElement>>
  export const Instagram: FC<SVGProps<SVGSVGElement>>
}

declare module "@radix-ui/react-dropdown-menu" {
  export const DropdownMenu: any
  export const DropdownMenuTrigger: any
  export const DropdownMenuContent: any
  export const DropdownMenuItem: any
  export const DropdownMenuSeparator: any
  export const DropdownMenuLabel: any
  export const DropdownMenuGroup: any
  export const DropdownMenuCheckboxItem: any
  export const DropdownMenuRadioGroup: any
  export const DropdownMenuRadioItem: any
  export const DropdownMenuPortal: any
  export const DropdownMenuSub: any
  export const DropdownMenuSubContent: any
  export const DropdownMenuSubTrigger: any
  export const DropdownMenuArrow: any
}

declare module "next/link" {
  import type { FC, AnchorHTMLAttributes } from "react"

  interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    href: string
    as?: string
    replace?: boolean
    scroll?: boolean
    shallow?: boolean
    passHref?: boolean
    prefetch?: boolean
    locale?: string | false
  }

  const Link: FC<LinkProps>
  export default Link
}

declare module "next/image" {
  import type { FC, ImgHTMLAttributes } from "react"

  interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
    src: string
    alt: string
    width?: number
    height?: number
    layout?: "fixed" | "intrinsic" | "responsive" | "fill"
    objectFit?: "fill" | "contain" | "cover" | "none" | "scale-down"
    objectPosition?: string
    loader?: any
    quality?: number
    priority?: boolean
    loading?: "lazy" | "eager"
    unoptimized?: boolean
    placeholder?: "blur" | "empty"
    blurDataURL?: string
  }

  const Image: FC<ImageProps>
  export default Image
}

declare module "clsx" {
  export default function clsx(...inputs: any[]): string
}

declare module "tailwind-merge" {
  export function twMerge(...classLists: string[]): string
}

// Déclaration pour les thèmes personnalisés
interface ThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: string
  storageKey?: string
}

type Theme = "light" | "dark" | "robin" | "starfire" | "cyborg" | "beastboy" | "raven" | "deathstroke" | "system"

interface ThemeProviderState {
  theme: Theme
  setTheme: (theme: Theme) => void
}
