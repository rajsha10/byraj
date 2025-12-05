"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from 'lucide-react'
import Link from "next/link"
import { usePathname } from 'next/navigation'
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"
import { TransitionLink } from "@/context/transition-context"

const navItems = [
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  // { href: "/blogs", label: "Blogs" },
  { href: "/contact", label: "Contact" },
]

export function FloatingTopNav() {
  const [isShaking, setIsShaking] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
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

  const [isPulling, setIsPulling] = useState(false)

  const toggleTheme = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const newTheme = theme === "dark" ? "light" : "dark"

    // Trigger pull animation
    setIsPulling(true)
    setTimeout(() => setIsPulling(false), 600)

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
    <>
      {/* DESKTOP VIEW - Modern Redesign */}
      <div
        className={cn(
          "fixed top-6 left-1/2 transform -translate-x-1/2 w-fit max-w-2xl z-50 transition-all duration-300 ease-out hidden md:block",
          isShaking && "scale-[0.98]",
        )}
      >
        <div className="relative group">
          {/* Background with enhanced translucency */}
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/90 to-background/80 dark:from-background/60 dark:via-background/70 dark:to-background/60 backdrop-blur-xl rounded-2xl border border-border/50 dark:border-primary/20 shadow-xl dark:shadow-2xl dark:shadow-primary/5"></div>

          <div className="relative flex items-center justify-between gap-3 px-4 py-2.5">
            {/* Left side - Profile */}
            <Link href="/" className="flex-shrink-0 group/profile">
              <div className="relative">
                {/* Scroll progress ring */}
                <svg className="absolute inset-0 w-11 h-11 -rotate-90 transition-transform group-hover/profile:rotate-0 duration-500" viewBox="0 0 44 44">
                  <circle cx="22" cy="22" r="20" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted/30 dark:text-muted/20" />
                  <circle
                    cx="22"
                    cy="22"
                    r="20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 20}`}
                    strokeDashoffset={`${2 * Math.PI * 20 * (1 - scrollProgress / 100)}`}
                    className="text-primary transition-all duration-150 ease-out"
                  />
                </svg>

                {/* Profile image with glow */}
                <div className="w-11 h-11 rounded-full overflow-hidden ring-2 ring-background dark:ring-primary/30 group-hover/profile:ring-primary transition-all duration-300 group-hover/profile:scale-105 shadow-lg">
                  <img
                    src="/profile.jpg"
                    alt="Profile"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover/profile:scale-110"
                  />
                </div>
              </div>
            </Link>

            {/* Center - Navigation Items */}
            <div className="flex items-center gap-1.5 px-2">
              {navItems.map((item) => (
                <TransitionLink key={item.href} href={item.href}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "relative rounded-xl px-4 py-2 text-sm font-medium transition-all duration-300 overflow-hidden group/nav",
                      pathname === item.href
                        ? "text-primary-foreground dark:text-foreground bg-primary dark:bg-primary/20 shadow-md dark:shadow-primary/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-primary/10 dark:hover:bg-primary/15"
                    )}
                  >
                    {/* Animated background on hover */}
                    <span className={cn(
                      "absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 dark:via-primary/30 opacity-0 group-hover/nav:opacity-100 transition-opacity duration-500",
                      pathname === item.href && "opacity-0"
                    )}></span>

                    {/* Active indicator */}
                    {pathname === item.href && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-primary-foreground dark:bg-primary rounded-full"></span>
                    )}

                    <span className="relative z-10">{item.label}</span>
                  </Button>
                </TransitionLink>
              ))}
            </div>

            {/* Right side - Hanging Bulb Toggle */}
            <button
              className="relative overflow-visible group/theme flex-shrink-0 transition-all duration-300 p-2 cursor-pointer bg-transparent border-none"
              onClick={toggleTheme}
            >
              {/* Thread (at top) */}
              <div className={cn(
                "absolute top-0 left-1/2 -translate-x-1/2 w-0.5 bg-muted-foreground/40 transition-all duration-300 origin-top",
                isPulling ? "h-8 scale-y-110" : "h-6"
              )}>
              </div>

              {/* Bulb (hanging down from thread) */}
              <div className={cn(
                "relative z-10 transition-all duration-300 rotate-180",
                isPulling ? "translate-y-3" : "translate-y-0",
                "group-hover/theme:translate-y-1.5"
              )}>
                {theme === 'dark' ? (
                  // Light bulb ON (for dark mode - showing sun/light)
                  <div className="relative">
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-yellow-400/40 blur-xl rounded-full scale-150 animate-pulse"></div>
                    {/* Bulb shape */}
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="relative">
                      {/* Bulb glass */}
                      <path d="M12 2C8.5 2 6 4.5 6 8C6 10.5 7 12 8 13.5C8.5 14.5 9 15 9 16V18C9 18.5 9.5 19 10 19H14C14.5 19 15 18.5 15 18V16C15 15 15.5 14.5 16 13.5C17 12 18 10.5 18 8C18 4.5 15.5 2 12 2Z" fill="#FCD34D" className="drop-shadow-lg"/>
                      {/* Base */}
                      <rect x="10" y="19" width="4" height="1.5" rx="0.5" fill="#9CA3AF"/>
                      <rect x="10" y="20.5" width="4" height="1.5" rx="0.5" fill="#6B7280"/>
                    </svg>
                  </div>
                ) : (
                  // Light bulb OFF (for light mode)
                  <div className="relative">
                    {/* Bulb shape - darker/off */}
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                      {/* Bulb glass */}
                      <path d="M12 2C8.5 2 6 4.5 6 8C6 10.5 7 12 8 13.5C8.5 14.5 9 15 9 16V18C9 18.5 9.5 19 10 19H14C14.5 19 15 18.5 15 18V16C15 15 15.5 14.5 16 13.5C17 12 18 10.5 18 8C18 4.5 15.5 2 12 2Z" fill="#D1D5DB" stroke="#9CA3AF" strokeWidth="0.5"/>
                      {/* Base */}
                      <rect x="10" y="19" width="4" height="1.5" rx="0.5" fill="#9CA3AF"/>
                      <rect x="10" y="20.5" width="4" height="1.5" rx="0.5" fill="#6B7280"/>
                    </svg>
                  </div>
                )}
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE VIEW */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-background/80 dark:bg-background/60 backdrop-blur-xl border-b border-border/50 dark:border-primary/20 px-4 py-3 shadow-lg">
        <div className="flex items-center justify-between w-full">
          {/* Profile Photo */}
          <Link href="/" className="group/profile">
            <div className="relative flex-shrink-0">
              <svg className="absolute inset-0 w-10 h-10 -rotate-90 transition-transform group-hover/profile:rotate-0 duration-500" viewBox="0 0 40 40">
                <circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted/30" />
                <circle
                  cx="20"
                  cy="20"
                  r="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 18}`}
                  strokeDashoffset={`${2 * Math.PI * 18 * (1 - scrollProgress / 100)}`}
                  className="text-primary transition-all duration-150 ease-out"
                />
              </svg>
              <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-background dark:ring-primary/30 group-hover/profile:ring-primary transition-all duration-300 shadow-md">
                <img
                  src="/profile.jpg"
                  alt="Profile"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover/profile:scale-110"
                />
              </div>
            </div>
          </Link>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="rounded-xl text-muted-foreground hover:text-foreground hover:bg-primary/10 dark:hover:bg-primary/15 transition-all duration-300 hover:scale-105"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <div className="transition-transform duration-300">
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 rotate-90 transition-transform duration-300" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </div>
          </Button>
        </div>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed top-[4.5rem] left-0 right-0 z-40 bg-background/90 dark:bg-background/70 backdrop-blur-xl border-b border-border/50 dark:border-primary/20 shadow-xl animate-in slide-in-from-top-5 duration-300">
          <div className="flex flex-col gap-2 p-4">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setIsMobileMenuOpen(false)}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start rounded-xl px-4 py-3 text-base font-medium transition-all duration-300",
                    pathname === item.href
                      ? "text-primary-foreground dark:text-foreground bg-primary dark:bg-primary/20 shadow-md"
                      : "text-muted-foreground hover:text-foreground hover:bg-primary/10 dark:hover:bg-primary/15"
                  )}
                >
                  {pathname === item.href && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary dark:bg-primary rounded-r-full"></span>
                  )}
                  <span className={pathname === item.href ? "ml-2" : ""}>{item.label}</span>
                </Button>
              </Link>
            ))}

            {/* Divider */}
            <div className="my-2 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

            <Button
              variant="ghost"
              className="w-full justify-start rounded-xl px-4 py-3 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-primary/10 dark:hover:bg-primary/15 transition-all duration-300"
              onClick={(e) => {
                toggleTheme(e)
                setIsMobileMenuOpen(false)
              }}
            >
              <div className="flex items-center gap-3">
                {theme === 'dark' ? (
                  <>
                    {/* Light bulb ON */}
                    <div className="relative w-5 h-5">
                      <div className="absolute inset-0 bg-yellow-400/30 blur-md rounded-full"></div>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="relative">
                        <path d="M12 2C8.5 2 6 4.5 6 8C6 10.5 7 12 8 13.5C8.5 14.5 9 15 9 16V18C9 18.5 9.5 19 10 19H14C14.5 19 15 18.5 15 18V16C15 15 15.5 14.5 16 13.5C17 12 18 10.5 18 8C18 4.5 15.5 2 12 2Z" fill="#FCD34D"/>
                        <rect x="10" y="19" width="4" height="1.5" rx="0.5" fill="#9CA3AF"/>
                        <rect x="10" y="20.5" width="4" height="1.5" rx="0.5" fill="#6B7280"/>
                      </svg>
                    </div>
                    <span>Light Mode</span>
                  </>
                ) : (
                  <>
                    {/* Light bulb OFF */}
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2C8.5 2 6 4.5 6 8C6 10.5 7 12 8 13.5C8.5 14.5 9 15 9 16V18C9 18.5 9.5 19 10 19H14C14.5 19 15 18.5 15 18V16C15 15 15.5 14.5 16 13.5C17 12 18 10.5 18 8C18 4.5 15.5 2 12 2Z" fill="#D1D5DB" stroke="#9CA3AF" strokeWidth="0.5"/>
                      <rect x="10" y="19" width="4" height="1.5" rx="0.5" fill="#9CA3AF"/>
                      <rect x="10" y="20.5" width="4" height="1.5" rx="0.5" fill="#6B7280"/>
                    </svg>
                    <span>Dark Mode</span>
                  </>
                )}
              </div>
            </Button>
          </div>
        </div>
      )}
    </>
  )
}