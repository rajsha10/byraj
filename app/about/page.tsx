"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Code2,
  Coffee,
  Music,
  Camera,
  BookOpen,
  ArrowLeft,
  Download,
  Heart,
  Lightbulb,
  Users,
  Target,
} from "lucide-react"
import Link from "next/link"

const skills = [
  { name: "JavaScript/TypeScript", level: 95, category: "Frontend" },
  { name: "React/Next.js", level: 90, category: "Frontend" },
  { name: "Node.js", level: 85, category: "Backend" },
  { name: "Python", level: 80, category: "Backend" },
  { name: "PostgreSQL/MongoDB", level: 85, category: "Database" },
  { name: "AWS/Vercel", level: 75, category: "DevOps" },
  { name: "UI/UX Design", level: 70, category: "Design" },
  { name: "GraphQL", level: 80, category: "API" },
]

const interests = [
  { icon: Coffee, label: "Coffee Enthusiast", description: "Always exploring new brewing methods" },
  { icon: Music, label: "Music Lover", description: "Classical Indian and modern fusion" },
  { icon: Camera, label: "Photography", description: "Capturing moments and landscapes" },
  { icon: BookOpen, label: "Continuous Learning", description: "Always reading about new technologies" },
]

const values = [
  {
    icon: Heart,
    title: "Passion-Driven",
    description: "I believe great work comes from genuine passion and dedication to craft.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Always seeking creative solutions and pushing the boundaries of what's possible.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "The best results come from working together and learning from each other.",
  },
  {
    icon: Target,
    title: "Quality Focus",
    description: "Committed to delivering polished, accessible, and performant solutions.",
  },
]

export default function AboutPage() {
  const [imageHovered, setImageHovered] = useState(false)

  return (
    <div className="min-h-screen bg-background text-foreground">

      <div className="pt-24 pb-20">
        {/* Hero Section */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-heading font-bold">
                About <span className="text-accent">Me</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Passionate web developer crafting digital experiences that bridge creativity and functionality
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

        {/* Main Content */}
        <section className="px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Profile & Introduction */}
              <div className="lg:col-span-2 space-y-8">
                <Card className="p-8">
                  <div className="grid md:grid-cols-3 gap-8 items-start">
                    <div className="md:col-span-1">
                      <div
                        className="relative group cursor-pointer"
                        onMouseEnter={() => setImageHovered(true)}
                        onMouseLeave={() => setImageHovered(false)}
                      >
                        <div className="w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-accent/30 transition-all duration-500 group-hover:border-accent group-hover:shadow-xl group-hover:shadow-accent/20">
                          <div
                            className={`w-full h-full bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center transition-all duration-500 ${imageHovered ? "scale-110" : ""}`}
                          >
                            <Code2 className="h-20 w-20 text-accent" />
                          </div>
                        </div>
                        <div className="absolute inset-0 rounded-full bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      </div>
                    </div>

                    <div className="md:col-span-2 space-y-6">
                      <div>
                        <h2 className="text-2xl font-heading font-bold mb-4">Hello, I'm Raj</h2>
                        <div className="space-y-4 text-muted-foreground leading-relaxed">
                          <p>
                            I'm a passionate web developer with over 4 years of experience creating digital experiences
                            that matter. My journey began with a curiosity about how websites work, and it has evolved
                            into a deep love for crafting beautiful, functional applications that solve real problems.
                          </p>
                          <p>
                            Born and raised in India, I bring a unique perspective to my work, blending traditional
                            attention to detail with modern development practices. I believe that great software is not
                            just about clean code, but about understanding users and creating experiences that feel
                            intuitive and delightful.
                          </p>
                          <p>
                            When I'm not coding, you'll find me exploring new coffee brewing techniques, listening to
                            classical Indian music, or capturing the world through my camera lens. These interests fuel
                            my creativity and often inspire my approach to problem-solving in development.
                          </p>
                        </div>
                      </div>

                      <Button className="group">
                        <Download className="mr-2 h-4 w-4" />
                        Download Resume
                      </Button>
                    </div>
                  </div>
                </Card>

                {/* Skills Section */}
                <Card className="p-8">
                  <CardHeader className="px-0 pt-0">
                    <CardTitle className="text-2xl font-heading flex items-center gap-2">
                      <Code2 className="h-6 w-6 text-accent" />
                      Technical Skills
                    </CardTitle>
                    <CardDescription>Technologies and tools I work with to bring ideas to life</CardDescription>
                  </CardHeader>
                  <CardContent className="px-0 pb-0">
                    <div className="grid md:grid-cols-2 gap-6">
                      {skills.map((skill, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{skill.name}</span>
                            <Badge variant="secondary" className="text-xs">
                              {skill.category}
                            </Badge>
                          </div>
                          <Progress value={skill.level} className="h-2" />
                          <div className="text-xs text-muted-foreground text-right">{skill.level}%</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Values & Philosophy */}
                <Card className="p-8">
                  <CardHeader className="px-0 pt-0">
                    <CardTitle className="text-2xl font-heading flex items-center gap-2">
                      <Heart className="h-6 w-6 text-accent" />
                      My Values
                    </CardTitle>
                    <CardDescription>The principles that guide my work and approach to development</CardDescription>
                  </CardHeader>
                  <CardContent className="px-0 pb-0">
                    <div className="grid md:grid-cols-2 gap-6">
                      {values.map((value, index) => (
                        <div key={index} className="flex gap-4">
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                              <value.icon className="h-6 w-6 text-accent" />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <h3 className="font-semibold">{value.title}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Quick Stats */}
                <Card className="p-6">
                  <CardHeader className="px-0 pt-0">
                    <CardTitle className="text-lg font-heading">Quick Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="px-0 pb-0 space-y-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Experience</span>
                      <span className="font-semibold">4+ Years</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Projects</span>
                      <span className="font-semibold">50+ Completed</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Location</span>
                      <span className="font-semibold">India</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Languages</span>
                      <span className="font-semibold">Hindi, English</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Interests */}
                <Card className="p-6">
                  <CardHeader className="px-0 pt-0">
                    <CardTitle className="text-lg font-heading">Beyond Code</CardTitle>
                    <CardDescription>What keeps me inspired and creative</CardDescription>
                  </CardHeader>
                  <CardContent className="px-0 pb-0 space-y-4">
                    {interests.map((interest, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                          <interest.icon className="h-4 w-4 text-accent" />
                        </div>
                        <div>
                          <div className="font-medium text-sm">{interest.label}</div>
                          <div className="text-xs text-muted-foreground">{interest.description}</div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Fun Fact */}
                <Card className="p-6 bg-gradient-to-br from-accent/5 to-primary/5 border-accent/20">
                  <CardContent className="px-0 pb-0">
                    <div className="text-center space-y-3">
                      <div className="text-2xl">☕</div>
                      <div className="text-sm font-medium">Fun Fact</div>
                      <div className="text-xs text-muted-foreground leading-relaxed">
                        I've tried over 100 different coffee varieties from around the world, and I believe the perfect
                        cup of coffee leads to the perfect code!
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
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
              <h2 className="text-3xl font-heading font-bold">Let's Create Something Amazing</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Ready to bring your ideas to life? I'd love to hear about your project and explore how we can work
                together.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="group">
                  Start a Project
                  <ArrowLeft className="ml-2 h-4 w-4 rotate-180 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/projects">
                <Button variant="outline" size="lg">
                  View My Work
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
