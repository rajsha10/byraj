"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Mail} from "lucide-react"
import { AnimatedSection } from "@/components/animated-section"
import Hero from "@/components/Hero"
import About from "@/components/About"
import GlowLight from "@/components/GlowLight"
import Link from "next/link";

export default function HomePage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="min-h-screen text-foreground relative overflow-hidden w-full px-4 md:w-[90%] lg:w-[65%] mx-auto">
      {/* Decorative background pattern */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 opacity-30">
          <svg viewBox="0 0 100 100" className="w-full h-full text-accent">
            <path
              d="M50 10 Q60 20 70 30 Q80 40 85 50 Q80 60 70 70 Q60 80 50 90 Q40 80 30 70 Q20 60 15 50 Q20 40 30 30 Q40 20 50 10 Z"
              fill="currentColor"
              opacity="0.1"
            />
            <circle cx="50" cy="50" r="8" fill="currentColor" opacity="0.2" />
          </svg>
        </div>
      </div>

      {/* Hero Section */}
      <Hero />

      <GlowLight />
      {/* <LampDemo /> */}

      {/* About Preview */}
      <About />

      {/* Projects Preview */}
      

      {/* Contact Preview */}
      <AnimatedSection animation="fade-up">
        <section id="contact" className="relative py-10 px-6 overflow-hidden">
          {/* Subtle grid pattern background */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-grid-foreground/[0.02] bg-grid-16"></div>
            <div className="absolute top-20 right-20 w-64 h-64 rounded-full border border-border"></div>
            <div className="absolute bottom-32 left-16 w-32 h-32 rounded-full border border-primary/20"></div>
          </div>

          <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
            {/* Header with primary accent */}
            <div className="space-y-1">
              <span className="text-primary font-mono text-sm">&lt;contact&gt;&nbsp;</span>
              <h2 className="text-2xl inline-block md:text-3xl font-bold text-foreground">
                Ready to Build Something Amazing?
              </h2>
              <span className="text-primary font-mono text-sm">&nbsp;&lt;/contact&gt;</span>
            </div>

            {/* Enhanced description */}
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Let`&apos;`s collaborate and turn your ideas into powerful, scalable web applications. 
              I`&apos;`m always excited to work on new projects and solve interesting challenges.
            </p>

            {/* CTA buttons using theme colors */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="group relative overflow-hidden bg-primary hover:bg-primary/90 
                  text-primary-foreground px-8 py-3 rounded-lg transition-all duration-300 
                  hover:shadow-lg hover:shadow-primary/25 border-2 border-primary/50 hover:border-primary"
                  >
                  <span className="relative z-10 flex items-center">
                    Start a Project
                    <Mail className="ml-2 h-4 w-4 transition-transform group-hover:scale-110" />
                  </span>
                </Button>
              </Link>

              <Link href="/contact">
                <Button
                  size="lg"
                  className="group relative overflow-hidden bg-secondary hover:bg-secondary/80 
                  text-secondary-foreground px-8 py-3 rounded-lg transition-all duration-300 
                  hover:shadow-lg hover:shadow-secondary/25 border-2 border-secondary/50 hover:border-secondary"
                  >
                  <span className="flex items-center">
                    Get In Touch
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </AnimatedSection>
    </div>
  )
}