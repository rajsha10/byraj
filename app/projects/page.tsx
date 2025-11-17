"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Calendar,
  Users,
  Star,
  Code,
  Globe,
  Database,
  Zap,
  Shield,
} from "lucide-react"
import Link from "next/link"

const projects = [
  {
    id: 1,
    title: "E-commerce Platform",
    description: "A full-featured e-commerce platform with modern UI, secure payments, and admin dashboard.",
    longDescription:
      "Built a comprehensive e-commerce solution from scratch, featuring user authentication, product catalog, shopping cart, secure payment processing with Stripe, order management, and a complete admin dashboard for inventory and sales management.",
    image: "/modern-ecommerce-website.png",
    category: "Full Stack",
    technologies: ["React", "Node.js", "MongoDB", "Stripe", "JWT", "Tailwind CSS"],
    features: [
      "User authentication and profiles",
      "Product catalog with search and filters",
      "Shopping cart and wishlist",
      "Secure payment processing",
      "Order tracking and history",
      "Admin dashboard with analytics",
    ],
    metrics: {
      users: "10,000+",
      performance: "98%",
      uptime: "99.9%",
    },
    status: "Live",
    year: "2024",
    duration: "3 months",
    role: "Lead Developer",
    liveUrl: "https://example-ecommerce.com",
    githubUrl: "https://github.com/raj/ecommerce-platform",
    icon: Globe,
  },
  {
    id: 2,
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates and team features.",
    longDescription:
      "Developed a modern task management application that enables teams to collaborate effectively with real-time updates, drag-and-drop functionality, project timelines, and comprehensive reporting features.",
    image: "/task-management-dashboard.png",
    category: "Frontend",
    technologies: ["Vue.js", "Firebase", "Vuetify", "Socket.io", "Chart.js"],
    features: [
      "Real-time collaboration",
      "Drag-and-drop task management",
      "Project timelines and milestones",
      "Team member assignments",
      "Progress tracking and reports",
      "Mobile-responsive design",
    ],
    metrics: {
      users: "5,000+",
      performance: "95%",
      uptime: "99.8%",
    },
    status: "Live",
    year: "2023",
    duration: "2 months",
    role: "Frontend Developer",
    liveUrl: "https://example-tasks.com",
    githubUrl: "https://github.com/raj/task-manager",
    icon: Zap,
  },
  {
    id: 3,
    title: "Portfolio Website",
    description: "A modern, responsive portfolio website with smooth animations and dark mode support.",
    longDescription:
      "Created a stunning portfolio website featuring smooth animations, dark/light mode toggle, responsive design, and optimized performance. Built with modern web technologies and best practices.",
    image: "/portfolio-website-design.png",
    category: "Frontend",
    technologies: ["Next.js", "Tailwind CSS", "Framer Motion", "TypeScript"],
    features: [
      "Smooth scroll animations",
      "Dark/light mode toggle",
      "Responsive design",
      "SEO optimized",
      "Fast loading times",
      "Contact form integration",
    ],
    metrics: {
      users: "2,000+",
      performance: "100%",
      uptime: "100%",
    },
    status: "Live",
    year: "2023",
    duration: "1 month",
    role: "Solo Developer",
    liveUrl: "https://example-portfolio.com",
    githubUrl: "https://github.com/raj/portfolio",
    icon: Code,
  },
  {
    id: 4,
    title: "Mobile Banking App",
    description: "A secure mobile banking application with biometric authentication and real-time transactions.",
    longDescription:
      "Developed a secure mobile banking application featuring biometric authentication, real-time transaction processing, account management, and comprehensive security measures to protect user data.",
    image: "/mobile-banking-app.png",
    category: "Mobile",
    technologies: ["React Native", "Node.js", "PostgreSQL", "JWT", "Biometric Auth"],
    features: [
      "Biometric authentication",
      "Real-time transactions",
      "Account balance tracking",
      "Transaction history",
      "Bill payment integration",
      "Security notifications",
    ],
    metrics: {
      users: "15,000+",
      performance: "97%",
      uptime: "99.9%",
    },
    status: "Live",
    year: "2024",
    duration: "4 months",
    role: "Mobile Developer",
    liveUrl: "https://app-store.com/banking-app",
    githubUrl: "https://github.com/raj/banking-app",
    icon: Shield,
  },
  {
    id: 5,
    title: "Analytics Dashboard",
    description: "A comprehensive analytics dashboard with real-time data visualization and reporting.",
    longDescription:
      "Built a powerful analytics dashboard that processes large datasets and presents them through interactive charts, real-time updates, and customizable reports for business intelligence.",
    image: "/analytics-dashboard.png",
    category: "Full Stack",
    technologies: ["React", "D3.js", "Python", "FastAPI", "Redis", "PostgreSQL"],
    features: [
      "Real-time data processing",
      "Interactive charts and graphs",
      "Customizable dashboards",
      "Export functionality",
      "User role management",
      "API integration",
    ],
    metrics: {
      users: "3,000+",
      performance: "96%",
      uptime: "99.7%",
    },
    status: "Live",
    year: "2023",
    duration: "3 months",
    role: "Full Stack Developer",
    liveUrl: "https://example-analytics.com",
    githubUrl: "https://github.com/raj/analytics-dashboard",
    icon: Database,
  },
  {
    id: 6,
    title: "Social Media App",
    description: "A social media platform with real-time messaging, content sharing, and community features.",
    longDescription:
      "Created a social media platform that enables users to connect, share content, engage in real-time messaging, and build communities around shared interests.",
    image: "/social-media-app.png",
    category: "Full Stack",
    technologies: ["React", "Node.js", "Socket.io", "MongoDB", "Cloudinary", "JWT"],
    features: [
      "User profiles and authentication",
      "Real-time messaging",
      "Content sharing and feeds",
      "Like and comment system",
      "Community groups",
      "Media upload and storage",
    ],
    metrics: {
      users: "8,000+",
      performance: "94%",
      uptime: "99.5%",
    },
    status: "Live",
    year: "2022",
    duration: "5 months",
    role: "Lead Developer",
    liveUrl: "https://example-social.com",
    githubUrl: "https://github.com/raj/social-app",
    icon: Users,
  },
]

const categories = ["All", "Full Stack", "Frontend", "Mobile"]

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const [visibleProjects, setVisibleProjects] = useState<number[]>([])

  const filteredProjects = projects.filter(
    (project) => selectedCategory === "All" || project.category === selectedCategory,
  )

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = Number.parseInt(entry.target.getAttribute("data-id") || "0")
          if (entry.isIntersecting) {
            setVisibleProjects((prev) => [...new Set([...prev, id])])
          }
        })
      },
      { threshold: 0.2 },
    )

    const elements = document.querySelectorAll("[data-project-id]")
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [filteredProjects])

  return (
    <div className="min-h-screen bg-background text-foreground">

      <div className="pt-24 pb-20">
        {/* Hero Section */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-heading font-bold">
                My <span className="text-accent">Projects</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                A showcase of digital experiences I've crafted, from concept to deployment
              </p>
            </div>

            {/* Mandala Divider */}
            <div className="flex items-center justify-center py-8">
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent"></div>
              <div className="mx-4 text-accent/70">✦</div>
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent"></div>
            </div>
          </div>
        </section>

        {/* Filter Tabs */}
        <section className="px-6 mb-12">
          <div className="max-w-6xl mx-auto">
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-4">
                {categories.map((category) => (
                  <TabsTrigger key={category} value={category} className="text-sm">
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => {
                const isVisible = visibleProjects.includes(project.id)
                const IconComponent = project.icon

                return (
                  <div
                    key={project.id}
                    data-project-id={project.id}
                    className={`transition-all duration-700 ${
                      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <Card
                      className={`group h-full transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 cursor-pointer ${
                        hoveredProject === project.id ? "shadow-xl shadow-accent/20 border-accent/30" : ""
                      }`}
                      onMouseEnter={() => setHoveredProject(project.id)}
                      onMouseLeave={() => setHoveredProject(null)}
                    >
                      {/* Project Image */}
                      <div className="relative aspect-video overflow-hidden rounded-t-lg">
                        <img
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                          <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
                            {project.status}
                          </Badge>
                        </div>
                        <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                          <div className="flex gap-2">
                            <Button size="sm" variant="secondary" className="bg-background/80 backdrop-blur-sm">
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="secondary" className="bg-background/80 backdrop-blur-sm">
                              <Github className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>

                      <CardHeader className="space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <CardTitle className="text-xl font-heading group-hover:text-accent transition-colors">
                            {project.title}
                          </CardTitle>
                          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                            <IconComponent className="h-5 w-5 text-accent" />
                          </div>
                        </div>
                        <CardDescription className="leading-relaxed">{project.description}</CardDescription>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {project.year}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {project.metrics.users}
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        {/* Technologies */}
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.slice(0, 4).map((tech, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                          {project.technologies.length > 4 && (
                            <Badge variant="outline" className="text-xs">
                              +{project.technologies.length - 4}
                            </Badge>
                          )}
                        </div>

                        {/* Key Features */}
                        <div className="space-y-2">
                          <h4 className="font-semibold text-sm">Key Features:</h4>
                          <ul className="space-y-1">
                            {project.features.slice(0, 3).map((feature, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0"></div>
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2 pt-2">
                          <Button size="sm" className="flex-1 group/btn">
                            View Live
                            <ExternalLink className="ml-2 h-3 w-3 transition-transform group-hover/btn:translate-x-1" />
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                            <Github className="mr-2 h-3 w-3" />
                            Code
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl font-heading font-bold">Project Impact</h2>
              <p className="text-lg text-muted-foreground">Numbers that tell the story of success</p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              <Card className="text-center p-6">
                <div className="space-y-2">
                  <div className="text-3xl font-heading font-bold text-accent">50+</div>
                  <div className="text-sm text-muted-foreground">Projects Completed</div>
                </div>
              </Card>
              <Card className="text-center p-6">
                <div className="space-y-2">
                  <div className="text-3xl font-heading font-bold text-accent">100K+</div>
                  <div className="text-sm text-muted-foreground">Users Served</div>
                </div>
              </Card>
              <Card className="text-center p-6">
                <div className="space-y-2">
                  <div className="text-3xl font-heading font-bold text-accent">99.8%</div>
                  <div className="text-sm text-muted-foreground">Average Uptime</div>
                </div>
              </Card>
              <Card className="text-center p-6">
                <div className="space-y-2">
                  <div className="text-3xl font-heading font-bold text-accent">4.9/5</div>
                  <div className="text-sm text-muted-foreground">Client Rating</div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Mandala Divider */}
            <div className="flex items-center justify-center">
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent"></div>
              <div className="mx-6 text-accent/70 text-lg">✦</div>
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent"></div>
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl font-heading font-bold">Ready to Start Your Project?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Let's collaborate to bring your vision to life with the same passion and attention to detail you see in
                these projects.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="group">
                  Start a Project
                  <Star className="ml-2 h-4 w-4 transition-transform group-hover:rotate-12" />
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" size="lg">
                  Learn More About Me
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
