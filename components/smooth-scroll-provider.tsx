"use client"

import { ReactLenis } from "@studio-freight/react-lenis"
import { useReducedMotion } from "framer-motion"
import { CustomScrollbar } from "./custom-scrollbar"

const LENIS_OPTIONS = {
  lerp: 0.1,
  duration: 1.3,
  smoothWheel: true,
  wheelMultiplier: 1.2,
  touchMultiplier: 2,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
}

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return <>{children}</>
  }

  return (
    <ReactLenis root options={LENIS_OPTIONS}>
      <CustomScrollbar />
      {children as any}
    </ReactLenis>
  )
}