"use client"

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react"

type Point = { x: number; y: number }

interface TransitionContextValue {
  isTransitioning: boolean
  transitionOrigin: Point | null
  startTransition: (origin: Point) => void
  finishTransition: () => void
}

const TransitionContext = createContext<TransitionContextValue | undefined>(
  undefined
)

export function TransitionProvider({ children }: { children: ReactNode }) {
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [transitionOrigin, setTransitionOrigin] = useState<Point | null>(null)

  const startTransition = (origin: Point) => {
    // Ignore if a transition is already running
    setTransitionOrigin((prev) => {
      if (isTransitioning && prev) return prev
      return origin
    })
    if (!isTransitioning) {
      setIsTransitioning(true)
    }
  }

  const finishTransition = () => {
    setIsTransitioning(false)
    setTransitionOrigin(null)
  }

  return (
    <TransitionContext.Provider
      value={{ isTransitioning, transitionOrigin, startTransition, finishTransition }}
    >
      {children}
    </TransitionContext.Provider>
  )
}

export function useTransition() {
  const ctx = useContext(TransitionContext)
  if (!ctx) {
    throw new Error("useTransition must be used within a TransitionProvider")
  }
  return ctx
}
