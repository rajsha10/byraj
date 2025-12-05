"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Mail, Github, Globe, ExternalLink } from "lucide-react"
import { AnimatedSection } from "@/components/animated-section"
import Hero from "@/components/Hero"
import About from "@/components/About"
import GlowLight from "@/components/GlowLight"
import Link from "next/link";

interface ProjectLink {
  liveDemo?: string;
  github: string;
}

interface Project {
  id: string;
  slug: string;
  isActive: boolean;
  status: string;
  title: string;
  shortDescription: string;
  thumbnail: string;
  links: ProjectLink;
  techStack: string[];
}

const projectsData: Project[] = [
  {
    "id": "1",
    "slug": "calm-sphere",
    "isActive": true,
    "status": "Live",
    "title": "CalmSphere",
    "shortDescription": "AI-powered mental wellness platform offering personalized journaling, mood tracking, songs recommendation and community support",
    "thumbnail": "/projects/calmsphere.png",
    "links": {
      "liveDemo": "https://calm-sphere.vercel.app",
      "github": "https://github.com/rajsha10/calmsphere"
    },
    "techStack": [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "MongoDB",
      "gemma-2b model",
      "Framer Motion"
    ]
  },
  {
    "id": "2",
    "slug": "Kyooro",
    "isActive": false,
    "status": "Ongoing",
    "title": "Kyooro",
    "shortDescription": "Ethereum-based AI tutoring platform using RAG for personalized learning, featuring MetaMask/Web3Auth login and crypto payments.",
    "thumbnail": "/projects/kyooro.png",
    "links": {
      "liveDemo": "",
      "github": "https://github.com/rajsha10/kyooro"
    },
    "techStack": [
      "Next.js",
      "TypeScript",
      "Solidity",
      "Supabase",
      "PineCone",
      "Web3Auth",
      "Lang chain RAG"
    ]
  },
  {
    "id": "3",
    "slug": "cronotag",
    "isActive": true,
    "status": "Deployed",
    "title": "Crono Tag",
    "shortDescription": "A decentralized intellectual property (IP) timestamping and licensing platform built on Ethereum to prove ownership and originality.",
    "thumbnail": "/projects/crono.png",
    "links": {
      "liveDemo": "https://cronotag.vercel.app",
      "github": "https://github.com/rajsha10/cronotag"
    },
    "techStack": [
      "Next.js",
      "React",
      "Solidity",
      "Hardhat",
      "Ethers.js",
      "IPFS / Pinata"
    ]
  }
];

// Helper function to determine status badge color
const getStatusColor = (status: string) => {
  const s = status.toLowerCase();
  if (s.includes('live') || s.includes('deployed')) return "bg-green-500/80 text-green-100";
  if (s.includes('ongoing') || s.includes('building')) return "bg-amber-500/80 text-amber-100";
  return "bg-muted text-muted-foreground";
};

export default function HomePage() {
  // Get only the latest two projects
  const latestProjects = projectsData.slice(0, 2);

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

      {/* Projects Preview Section */}
      <AnimatedSection animation="fade-up">
        <section id="projects" className="py-20 relative">
          {/* Section Header */}
          <div className="space-y-3 mb-16 relative z-10">
            <div className="flex items-center gap-3">
              <span className="text-primary font-mono text-sm">&lt;projects&gt;</span>
              <div className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Featured Work
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl">
              A selection of projects showcasing my expertise in full-stack development, blockchain, and AI integration
            </p>
          </div>

          {/* Projects Grid */}
          <div className="space-y-8 relative z-10">
            {latestProjects.map((project, index) => (
              <div
                key={project.id}
                className="group relative"
              >
                {/* Card Container */}
                <div className="relative rounded-2xl overflow-hidden bg-card/40 dark:bg-card/60 backdrop-blur-md border border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10">
                  {/* Grid Layout: Image + Content side by side on larger screens */}
                  <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">

                    {/* Thumbnail Section - 2/5 width on large screens */}
                    <div className={`lg:col-span-2 relative h-64 lg:h-auto overflow-hidden bg-gradient-to-br from-primary/5 dark:from-primary/10 to-background ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 dark:from-primary/15 via-transparent to-transparent opacity-50"></div>
                      <img
                        src={project.thumbnail}
                        alt={project.title}
                        className="w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
                        onError={(e) => {
                          e.currentTarget.src = "https://placehold.co/600x400/1a1a1a/FFF?text=Project+Thumbnail";
                        }}
                      />
                      {/* Animated Border Glow */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/20 dark:from-primary/30 via-transparent to-transparent"></div>
                      </div>
                    </div>

                    {/* Content Section - 3/5 width on large screens */}
                    <div className={`lg:col-span-3 p-8 lg:p-10 flex flex-col justify-between ${index % 2 === 1 ? 'lg:order-1' : ''}`}>

                      {/* Header with Status */}
                      <div className="space-y-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-2xl md:text-3xl font-bold tracking-tight group-hover:text-primary transition-colors duration-300">
                                {project.title}
                              </h3>
                              {/* Status Badge */}
                              <div className={`flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                                <span className="relative flex h-2 w-2 mr-2">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-current"></span>
                                  <span className="relative inline-flex rounded-full h-2 w-2 bg-current"></span>
                                </span>
                                {project.status}
                              </div>
                            </div>

                            {/* Description */}
                            <p className="text-muted-foreground leading-relaxed text-base">
                              {project.shortDescription}
                            </p>
                          </div>
                        </div>

                        {/* Tech Stack */}
                        <div className="space-y-3">
                          <p className="text-xs font-mono text-primary uppercase tracking-widest">Tech Stack</p>
                          <div className="flex flex-wrap gap-2">
                            {project.techStack.map((tech, techIndex) => (
                              <span
                                key={techIndex}
                                className="text-xs px-3 py-1.5 rounded-lg bg-primary/5 dark:bg-primary/10 text-foreground border border-primary/20 dark:border-primary/30 hover:bg-primary/10 dark:hover:bg-primary/20 hover:border-primary/40 dark:hover:border-primary/50 transition-all duration-300 font-medium"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Footer Actions */}
                      <div className="flex items-center justify-between gap-4 mt-8 pt-6 border-t border-border/50">
                        {/* Action Links */}
                        <div className="flex gap-3">
                          {project.links.liveDemo && (
                            <a
                              href={project.links.liveDemo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 dark:bg-primary/20 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 text-sm font-medium group/btn"
                              aria-label="Live Demo"
                            >
                              <Globe className="h-4 w-4 transition-transform group-hover/btn:scale-110" />
                              <span>Live Demo</span>
                            </a>
                          )}
                          {project.links.github && (
                            <a
                              href={project.links.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/50 dark:bg-muted/60 text-foreground hover:bg-muted dark:hover:bg-muted/80 transition-all duration-300 text-sm font-medium group/btn"
                              aria-label="GitHub Repository"
                            >
                              <Github className="h-4 w-4 transition-transform group-hover/btn:scale-110" />
                              <span>Code</span>
                            </a>
                          )}
                        </div>

                        {/* View Details Link */}
                        <Link
                          href={`/projects/${project.slug}`}
                          className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors group/link"
                        >
                          <span>View Case Study</span>
                          <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Decorative corner accent */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 dark:from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-3xl"></div>
                </div>
              </div>
            ))}
          </div>

          {/* "View All Projects" Button */}
          <div className="flex justify-center mt-16 relative z-10">
            <Link href="/projects">
              <Button
                size="lg"
                className="group relative overflow-hidden bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground border-2 border-primary/50 hover:border-primary transition-all duration-300 px-8 py-6 text-base font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/25"
              >
                <span className="flex items-center gap-2">
                  View All Projects
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
              </Button>
            </Link>
          </div>
        </section>
      </AnimatedSection>

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