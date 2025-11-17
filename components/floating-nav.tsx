"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"

const navItems = [
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/blogs", label: "Blogs" },
  { href: "/contact", label: "Contact" },
]

export function FloatingTopNav() {
  const [isShaking, setIsShaking] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsShaking(true)
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight
      const winHeight = window.innerHeight
      const scrollPercent = scrollTop / (docHeight - winHeight)
      setScrollProgress(Math.round(scrollPercent * 100))
      
      setTimeout(() => setIsShaking(false), 200)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleTheme = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const newTheme = theme === "dark" ? "light" : "dark"

    // 1. Fallback for browsers that don't support View Transitions
    // @ts-ignore
    if (!document.startViewTransition) {
      setTheme(newTheme)
      return
    }

    // 2. Get click position
    const x = e.clientX
    const y = e.clientY
    
    // 3. Calculate radius to the furthest corner
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    )

    // 4. Start the transition
    // @ts-ignore
    const transition = document.startViewTransition(() => {
      setTheme(newTheme)
    })

    // 5. Wait for the pseudo-elements to be ready
    await transition.ready

    // 6. Animate the circular clip-path
    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${endRadius}px at ${x}px ${y}px)`,
    ]

    document.documentElement.animate(
      {
        clipPath: clipPath,
      },
      {
        duration: 700,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      }
    )
  }

  if (!mounted) return null

  return (
    <div
      className={cn(
        "fixed top-6 left-1/2 transform -translate-x-1/2 w-1/2 z-50 transition-transform duration-200 ease-out",
        isShaking && "animate-pulse scale-[1.01]",
      )}
    >
      <div className="bg-card backdrop-blur-md border border-border px-6 py-3 shadow-2xl rounded-full">
        <div className="flex items-center justify-between w-full">
          {/* Left side */}
          <div className="flex items-center gap-6">
            <Link href="/">
              <div className="relative flex-shrink-0">
                <svg className="absolute inset-0 w-10 h-10 -rotate-90" viewBox="0 0 40 40">
                  <circle cx="20" cy="20" r="18" fill="none" stroke="var(--color-muted)" strokeWidth="2" />
                  <circle
                    cx="20"
                    cy="20"
                    r="19"
                    fill="none"
                    stroke="var(--color-primary)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 19}`}
                    strokeDashoffset={`${2 * Math.PI * 18 * (1 - scrollProgress / 100)}`}
                    className="transition-all duration-150 ease-out"
                  />
                </svg>
                <div className="w-10 h-10 rounded-full bg-primary overflow-hidden">
                  <img 
                    src="/profile.jpg" 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </Link>

            <div className="flex items-center gap-1">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "rounded-full text-muted-foreground hover:text-foreground hover:bg-accent transition-all",
                      pathname === item.href && "text-foreground bg-accent"
                    )}
                  >
                    {item.label}
                  </Button>
                </Link>
              ))}
            </div>
          </div>

          {/* Right side - Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full text-muted-foreground hover:text-foreground hover:bg-accent relative overflow-hidden group"
            onClick={toggleTheme}
          >
            <div className="relative z-10 transition-transform duration-500 group-hover:rotate-12">
              {theme === 'dark' ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </div>
          </Button>
        </div>
      </div>
    </div>
  )
}