"use client"

import React, { createContext, useContext, useState, useEffect, useTransition } from "react"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"

// --- Context ---
type TransitionContextType = {
  isTransitioning: boolean
  startTime: number | null
  startTransition: () => void
  endTransition: () => void
}

const TransitionContext = createContext<TransitionContextType>({
  isTransitioning: false,
  startTime: null,
  startTransition: () => {},
  endTransition: () => {},
})

export const useTransitionContext = () => useContext(TransitionContext)

// --- Provider ---
export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [startTime, setStartTime] = useState<number | null>(null)
  const pathname = usePathname()

  // Reset transition when pathname changes (Navigation Complete)
  useEffect(() => {
    if (isTransitioning) {
      // The PageBlurTransition component handles the visual cleanup
      // We just ensure state is eventually consistent here if needed
    }
  }, [pathname])

  const startTransition = () => {
    setIsTransitioning(true)
    setStartTime(Date.now())
  }

  const endTransition = () => {
    setIsTransitioning(false)
    setStartTime(null)
  }

  return (
    <TransitionContext.Provider
      value={{
        isTransitioning,
        startTime,
        startTransition,
        endTransition,
      }}
    >
      {children}
    </TransitionContext.Provider>
  )
}

interface TransitionLinkProps extends React.ComponentProps<typeof Link> {
  href: string
}

export function TransitionLink({ href, children, onClick, ...props }: TransitionLinkProps) {
  const router = useRouter()
  const { startTransition } = useTransitionContext()
  const pathname = usePathname()

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    
    if (href === pathname) return

    e.preventDefault()
    
    startTransition()
    
    // 2. Call optional user onClick
    if (onClick) onClick(e)

    // 3. Push route (React Transition allows generic loading states, but we use our custom overlay)
    React.startTransition(() => {
      router.push(href as string)
    })
  }

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  )
}