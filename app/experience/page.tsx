"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Calendar,
  MapPin,
  ExternalLink,
  Code,
  Users,
  TrendingUp,
  Award,
  Briefcase,
  GraduationCap,
} from "lucide-react"
import Link from "next/link"

const experiences = [
  {
    id: 1,
    type: "work",
    title: "Senior Web Developer",
    company: "Tech Solutions Inc.",
    location: "Mumbai, India",
    period: "2024 - Present",
    duration: "8 months",
    description:
      "Leading frontend development for enterprise applications, mentoring junior developers, and architecting scalable solutions.",
    achievements: [
      "Led a team of 4 developers in rebuilding the company's main product",
      "Improved application performance by 40% through code optimization",
      "Implemented automated testing reducing bugs by 60%",
      "Mentored 3 junior developers, helping them advance their careers",
    ],
    technologies: ["React", "TypeScript", "Next.js", "Node.js", "PostgreSQL", "AWS"],
    icon: Briefcase,
    color: "accent",
  },
  {
    id: 2,
    type: "work",
    title: "Full Stack Developer",
    company: "Digital Agency",
    location: "Bangalore, India",
    period: "2022 - 2024",
    duration: "2 years",
    description: "Developed and maintained multiple client projects, from e-commerce platforms to corporate websites.",
    achievements: [
      "Successfully delivered 15+ client projects on time and within budget",
      "Increased client satisfaction scores by 25%",
      "Built a reusable component library used across 10+ projects",
      "Reduced development time by 30% through process improvements",
    ],
    technologies: ["Vue.js", "React", "Python", "Django", "MongoDB", "Docker"],
    icon: Code,
    color: "primary",
  },
  {
    id: 3,
    type: "work",
    title: "Frontend Developer",
    company: "Startup Co.",
    location: "Delhi, India",
    period: "2020 - 2022",
    duration: "2 years",
    description:
      "Focused on creating responsive, user-friendly interfaces and collaborating closely with design teams.",
    achievements: [
      "Developed the company's first mobile-responsive website",
      "Collaborated with UX team to improve user engagement by 50%",
      "Implemented accessibility standards achieving WCAG 2.1 compliance",
      "Created comprehensive documentation for frontend codebase",
    ],
    technologies: ["JavaScript", "React", "SASS", "Webpack", "Git", "Figma"],
    icon: Users,
    color: "secondary",
  },
  {
    id: 4,
    type: "education",
    title: "Bachelor of Computer Science",
    company: "University of Technology",
    location: "New Delhi, India",
    period: "2016 - 2020",
    duration: "4 years",
    description: "Graduated with honors, specializing in web technologies and software engineering principles.",
    achievements: [
      "Graduated Magna Cum Laude with 3.8 GPA",
      "Led the university's coding club for 2 years",
      "Won 1st place in inter-university hackathon",
      "Published research paper on web accessibility",
    ],
    technologies: ["Java", "Python", "C++", "Database Design", "Algorithms", "Software Engineering"],
    icon: GraduationCap,
    color: "muted",
  },
]

const milestones = [
  {
    year: "2024",
    title: "Senior Developer Promotion",
    description: "Advanced to senior role, leading development teams",
  },
  { year: "2023", title: "AWS Certification", description: "Achieved AWS Solutions Architect certification" },
  { year: "2022", title: "Full Stack Transition", description: "Expanded skills to become a full-stack developer" },
  {
    year: "2021",
    title: "First Major Project",
    description: "Led development of e-commerce platform serving 10k+ users",
  },
  { year: "2020", title: "Career Start", description: "Began professional journey as a frontend developer" },
]

export default function ExperiencePage() {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const [activeItem, setActiveItem] = useState<number | null>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = Number.parseInt(entry.target.getAttribute("data-id") || "0")
          if (entry.isIntersecting) {
            setVisibleItems((prev) => [...new Set([...prev, id])])
          }
        })
      },
      { threshold: 0.3 },
    )

    const elements = document.querySelectorAll("[data-id]")
    elements.forEach((el) => observerRef.current?.observe(el))

    return () => observerRef.current?.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">

      <div className="pt-24 pb-20">
        {/* Hero Section */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-heading font-bold">
                My <span className="text-accent">Journey</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                A timeline of growth, learning, and building amazing digital experiences
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

        {/* Timeline Section */}
        <section className="px-6">
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent/50 via-accent/30 to-transparent"></div>

              <div className="space-y-16">
                {experiences.map((exp, index) => {
                  const isVisible = visibleItems.includes(exp.id)
                  const isEven = index % 2 === 0
                  const IconComponent = exp.icon

                  return (
                    <div
                      key={exp.id}
                      data-id={exp.id}
                      className={`relative transition-all duration-700 ${
                        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                      }`}
                      onMouseEnter={() => setActiveItem(exp.id)}
                      onMouseLeave={() => setActiveItem(null)}
                    >
                      {/* Timeline Marker */}
                      <div
                        className={`absolute left-8 md:left-1/2 transform md:-translate-x-1/2 -translate-y-1/2 top-8 z-10`}
                      >
                        <div
                          className={`w-16 h-16 rounded-full border-4 border-background flex items-center justify-center transition-all duration-300 ${
                            activeItem === exp.id
                              ? "bg-accent shadow-lg shadow-accent/30 scale-110"
                              : exp.color === "accent"
                                ? "bg-accent"
                                : exp.color === "primary"
                                  ? "bg-primary"
                                  : "bg-secondary"
                          }`}
                        >
                          <IconComponent className="h-6 w-6 text-background" />
                        </div>
                      </div>

                      {/* Content Card */}
                      <div
                        className={`ml-24 md:ml-0 md:w-5/12 ${isEven ? "md:mr-auto md:pr-16" : "md:ml-auto md:pl-16"}`}
                      >
                        <Card
                          className={`transition-all duration-300 hover:shadow-xl ${
                            activeItem === exp.id ? "shadow-lg shadow-accent/10 border-accent/30" : ""
                          }`}
                        >
                          <CardHeader>
                            <div className="flex items-start justify-between gap-4">
                              <div className="space-y-2">
                                <CardTitle className="text-xl font-heading">{exp.title}</CardTitle>
                                <CardDescription className="flex items-center gap-2 text-base">
                                  <Briefcase className="h-4 w-4" />
                                  {exp.company}
                                </CardDescription>
                              </div>
                              <Badge variant={exp.type === "education" ? "secondary" : "default"}>
                                {exp.type === "education" ? "Education" : "Work"}
                              </Badge>
                            </div>

                            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                {exp.period}
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                {exp.location}
                              </div>
                              <div className="flex items-center gap-1">
                                <TrendingUp className="h-4 w-4" />
                                {exp.duration}
                              </div>
                            </div>
                          </CardHeader>

                          <CardContent className="space-y-6">
                            <p className="text-muted-foreground leading-relaxed">{exp.description}</p>

                            {/* Key Achievements */}
                            <div className="space-y-3">
                              <h4 className="font-semibold flex items-center gap-2">
                                <Award className="h-4 w-4 text-accent" />
                                Key Achievements
                              </h4>
                              <ul className="space-y-2">
                                {exp.achievements.map((achievement, i) => (
                                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                    <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0"></div>
                                    {achievement}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Technologies */}
                            <div className="space-y-3">
                              <h4 className="font-semibold flex items-center gap-2">
                                <Code className="h-4 w-4 text-accent" />
                                Technologies Used
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {exp.technologies.map((tech, i) => (
                                  <Badge key={i} variant="outline" className="text-xs">
                                    {tech}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Milestones Section */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl font-heading font-bold">Career Milestones</h2>
              <p className="text-lg text-muted-foreground">Key moments that shaped my professional journey</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {milestones.map((milestone, index) => (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg font-heading">{milestone.title}</CardTitle>
                      <Badge variant="outline" className="group-hover:border-accent transition-colors">
                        {milestone.year}
                      </Badge>
                    </div>
                    <CardDescription className="leading-relaxed">{milestone.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
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
              <h2 className="text-3xl font-heading font-bold">Ready for the Next Chapter</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                I'm always excited about new opportunities and challenges. Let's discuss how my experience can
                contribute to your next project.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="group">
                  Let's Work Together
                  <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/projects">
                <Button variant="outline" size="lg">
                  View My Projects
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
