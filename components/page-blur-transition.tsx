"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { motion, useReducedMotion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"
import { useTransitionContext } from "@/context/transition-context"

export function PageBlurTransition() {
  const { isTransitioning, startTime, endTransition } = useTransitionContext()
  const pathname = usePathname()
  const { resolvedTheme } = useTheme()
  const shouldReduceMotion = useReducedMotion()
  
  const [showOverlay, setShowOverlay] = useState(false)

  // Color Logic: White tint in Dark Mode, Black tint in Light Mode
  const overlayColor = resolvedTheme === "dark" ? "bg-white/10" : "bg-black/10"
  const backdropFilter = "blur(25px)"

  useEffect(() => {
    if (isTransitioning) {
      setShowOverlay(true)
    }
  }, [isTransitioning])

  useEffect(() => {
    if (isTransitioning && startTime) {
      const now = Date.now()
      const elapsed = now - startTime
      const MIN_DURATION = 400 
      const MAX_DURATION = 2500 

      const remainingTime = Math.max(0, MIN_DURATION - elapsed)
      const exitDelay = elapsed > MAX_DURATION ? 0 : remainingTime

      const timer = setTimeout(() => {
        setShowOverlay(false)
        setTimeout(() => endTransition(), 500) 
      }, exitDelay)

      return () => clearTimeout(timer)
    }
  }, [pathname])

  if (shouldReduceMotion) return null

  return (
    <AnimatePresence>
      {showOverlay && (
        <motion.div
          initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
          animate={{ opacity: 1, backdropFilter }}
          exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className={`fixed inset-0 z-40 pointer-events-none ${overlayColor}`}
        />
      )}
    </AnimatePresence>
  )
}