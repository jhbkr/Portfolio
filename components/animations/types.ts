/**
 * Shared types and interfaces for theme change animations
 */

export interface AnimationProps {
  /** Viewport width in pixels */
  w: number
  /** Viewport height in pixels */
  h: number
  /** Animation key for forcing re-renders when theme changes */
  animationKey: number
}

export interface ContainerVariants {
  hidden: { opacity: number }
  visible: { opacity: number; transition: { duration: number } }
  exit: { opacity: number; transition: { duration: number; delay: number } }
}
