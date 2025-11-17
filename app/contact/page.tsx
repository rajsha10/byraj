"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { sendContactEmail } from "@/actions"
import {
  Send,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Twitter,
  Clock,
  CheckCircle,
  MessageSquare,
  Coffee,
} from "lucide-react"

const contactMethods = [
  {
    icon: Mail,
    title: "Email",
    value: "raj@example.com",
    description: "Best for detailed project discussions",
    href: "mailto:raj@example.com",
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+91 98765 43210",
    description: "Available Mon-Fri, 9 AM - 6 PM IST",
    href: "tel:+919876543210",
  },
  {
    icon: MapPin,
    title: "Location",
    value: "Mumbai, India",
    description: "Open to remote and hybrid work",
    href: "#",
  },
]

const socialLinks = [
  {
    icon: Github,
    name: "GitHub",
    username: "@raj-dev",
    href: "https://github.com/raj-dev",
    color: "hover:text-gray-400",
  },
  {
    icon: Linkedin,
    name: "LinkedIn",
    username: "Raj Kumar",
    href: "https://linkedin.com/in/raj-kumar",
    color: "hover:text-blue-400",
  },
  {
    icon: Twitter,
    name: "Twitter",
    username: "@raj_codes",
    href: "https://twitter.com/raj_codes",
    color: "hover:text-blue-400",
  },
]

const availability = [
  { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM IST", available: true },
  { day: "Saturday", hours: "10:00 AM - 2:00 PM IST", available: true },
  { day: "Sunday", hours: "Unavailable", available: false },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    projectType: "",
    budget: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const result = await sendContactEmail(formData)

      if (result.success) {
        setIsSubmitted(true)
        toast.success("Message sent successfully!")

        setTimeout(() => {
          setFormData({
            name: "",
            email: "",
            subject: "",
            message: "",
            projectType: "",
            budget: "",
          })
          setIsSubmitted(false)
        }, 3000)
      } else {
        toast.error(result.error || "Something went wrong. Please try again.")
      }
    } catch (error) {
      console.error(error)
      toast.error("Failed to send message. Please check your connection.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    // CRITICAL: Ensure NO 'overflow-hidden' or 'overflow-x-hidden' is here
    <div className="min-h-screen bg-background text-foreground w-full px-4 md:w-[90%] lg:w-[85%] mx-auto">
      <div className="pt-24 pb-20">
        {/* Hero Section */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-heading font-bold">
                Let&apos;s <span className="text-accent">Connect</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Ready to bring your ideas to life? I&apos;d love to hear about your project and explore how we can work
                together.
              </p>
            </div>

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
            <div className="grid lg:grid-cols-3 gap-12 relative">
              {/* Contact Form */}
              <div className="lg:col-span-2">
                <Card className="p-8">
                  <CardHeader className="px-0 pt-0">
                    <CardTitle className="text-2xl font-heading flex items-center gap-2">
                      <MessageSquare className="h-6 w-6 text-accent" />
                      Send Me a Message
                    </CardTitle>
                    <CardDescription>
                      Fill out the form below and I&apos;ll get back to you within 24 hours.
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="px-0 pb-0">
                    {isSubmitted ? (
                      <div className="text-center py-12 space-y-4 animate-in fade-in-0 zoom-in-95 duration-500">
                        <div className="w-16 h-16 mx-auto rounded-full bg-green-500/10 flex items-center justify-center">
                          <CheckCircle className="h-8 w-8 text-green-500" />
                        </div>
                        <h3 className="text-xl font-heading font-semibold">Message Sent Successfully!</h3>
                        <p className="text-muted-foreground">
                          Thank you for reaching out. I&apos;ll review your message and get back to you soon.
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="name">Full Name *</Label>
                            <Input
                              id="name"
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              onFocus={() => setFocusedField("name")}
                              onBlur={() => setFocusedField(null)}
                              className={`transition-all duration-300 ${
                                focusedField === "name" ? "border-accent ring-2 ring-accent/20" : ""
                              }`}
                              placeholder="Your full name"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email Address *</Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              onFocus={() => setFocusedField("email")}
                              onBlur={() => setFocusedField(null)}
                              className={`transition-all duration-300 ${
                                focusedField === "email" ? "border-accent ring-2 ring-accent/20" : ""
                              }`}
                              placeholder="your.email@example.com"
                              required
                            />
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="projectType">Project Type</Label>
                            <select
                              id="projectType"
                              name="projectType"
                              value={formData.projectType}
                              onChange={handleInputChange}
                              onFocus={() => setFocusedField("projectType")}
                              onBlur={() => setFocusedField(null)}
                              className={`w-full px-3 py-2 bg-background border border-input rounded-md text-sm transition-all duration-300 ${
                                focusedField === "projectType" ? "border-accent ring-2 ring-accent/20" : ""
                              }`}
                            >
                              <option value="">Select project type</option>
                              <option value="website">Website Development</option>
                              <option value="webapp">Web Application</option>
                              <option value="mobile">Mobile App</option>
                              <option value="ecommerce">E-commerce Platform</option>
                              <option value="other">Other</option>
                            </select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="budget">Budget Range</Label>
                            <select
                              id="budget"
                              name="budget"
                              value={formData.budget}
                              onChange={handleInputChange}
                              onFocus={() => setFocusedField("budget")}
                              onBlur={() => setFocusedField(null)}
                              className={`w-full px-3 py-2 bg-background border border-input rounded-md text-sm transition-all duration-300 ${
                                focusedField === "budget" ? "border-accent ring-2 ring-accent/20" : ""
                              }`}
                            >
                              <option value="">Select budget range</option>
                              <option value="5k-10k">$5,000 - $10,000</option>
                              <option value="10k-25k">$10,000 - $25,000</option>
                              <option value="25k-50k">$25,000 - $50,000</option>
                              <option value="50k+">$50,000+</option>
                            </select>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="subject">Subject *</Label>
                          <Input
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                            onFocus={() => setFocusedField("subject")}
                            onBlur={() => setFocusedField(null)}
                            className={`transition-all duration-300 ${
                              focusedField === "subject" ? "border-accent ring-2 ring-accent/20" : ""
                            }`}
                            placeholder="Brief description of your project"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="message">Message *</Label>
                          <Textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            onFocus={() => setFocusedField("message")}
                            onBlur={() => setFocusedField(null)}
                            className={`min-h-32 transition-all duration-300 ${
                              focusedField === "message" ? "border-accent ring-2 ring-accent/20" : ""
                            }`}
                            placeholder="Tell me more about your project, goals, timeline, and any specific requirements..."
                            required
                          />
                        </div>

                        <Button
                          type="submit"
                          size="lg"
                          disabled={isSubmitting}
                          className="w-full group relative overflow-hidden"
                        >
                          {isSubmitting ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-2 border-background border-t-transparent mr-2"></div>
                              Sending Message...
                            </>
                          ) : (
                            <>
                              Send Message
                              <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </>
                          )}
                        </Button>
                      </form>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Sticky Sidebar */}
              {/* FIX: Use 'self-start' to prevent grid stretching, enabling stickiness */}
              <div className="space-y-8 lg:col-span-1 lg:sticky lg:top-24 lg:self-start">
                {/* Contact Methods */}
                <Card className="p-6">
                  <CardHeader className="px-0 pt-0">
                    <CardTitle className="text-lg font-heading">Get In Touch</CardTitle>
                    <CardDescription>Choose your preferred way to connect</CardDescription>
                  </CardHeader>
                  <CardContent className="px-0 pb-0 space-y-4">
                    {contactMethods.map((method, index) => (
                      <a
                        key={index}
                        href={method.href}
                        className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent/5 transition-colors group"
                      >
                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                          <method.icon className="h-5 w-5 text-accent" />
                        </div>
                        <div className="space-y-1">
                          <div className="font-medium text-sm">{method.title}</div>
                          <div className="text-sm text-foreground">{method.value}</div>
                          <div className="text-xs text-muted-foreground">{method.description}</div>
                        </div>
                      </a>
                    ))}
                  </CardContent>
                </Card>

                {/* Social Links */}
                <Card className="p-6">
                  <CardHeader className="px-0 pt-0">
                    <CardTitle className="text-lg font-heading">Follow Me</CardTitle>
                    <CardDescription>Stay updated with my latest work</CardDescription>
                  </CardHeader>
                  <CardContent className="px-0 pb-0 space-y-3">
                    {socialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-3 p-3 rounded-lg hover:bg-accent/5 transition-all group ${social.color}`}
                      >
                        <social.icon className="h-5 w-5" />
                        <div className="space-y-1">
                          <div className="font-medium text-sm">{social.name}</div>
                          <div className="text-xs text-muted-foreground">{social.username}</div>
                        </div>
                      </a>
                    ))}
                  </CardContent>
                </Card>

                {/* Availability */}
                <Card className="p-6">
                  <CardHeader className="px-0 pt-0">
                    <CardTitle className="text-lg font-heading flex items-center gap-2">
                      <Clock className="h-5 w-5 text-accent" />
                      Availability
                    </CardTitle>
                    <CardDescription>My typical working hours</CardDescription>
                  </CardHeader>
                  <CardContent className="px-0 pb-0 space-y-3">
                    {availability.map((slot, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="text-sm">{slot.day}</div>
                        <div className="flex items-center gap-2">
                          <Badge variant={slot.available ? "default" : "secondary"} className="text-xs">
                            {slot.hours}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Fun Fact */}
                <Card className="p-6 bg-gradient-to-br from-accent/5 to-primary/5 border-accent/20">
                  <CardContent className="px-0 pb-0">
                    <div className="text-center space-y-3">
                      <Coffee className="h-8 w-8 text-accent mx-auto" />
                      <div className="text-sm font-medium">Coffee Chat?</div>
                      <div className="text-xs text-muted-foreground leading-relaxed">
                        I&apos;m always up for a virtual coffee chat to discuss ideas, even if there&apos;s no immediate
                        project in mind!
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl font-heading font-bold">Frequently Asked Questions</h2>
              <p className="text-lg text-muted-foreground">Quick answers to common questions</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6">
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="text-lg">What&apos;s your typical project timeline?</CardTitle>
                </CardHeader>
                <CardContent className="px-0 pb-0">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Project timelines vary based on complexity, but most websites take 2-4 weeks, while web applications
                    can take 1-3 months. I&apos;ll provide a detailed timeline after understanding your requirements.
                  </p>
                </CardContent>
              </Card>

              <Card className="p-6">
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="text-lg">Do you work with international clients?</CardTitle>
                </CardHeader>
                <CardContent className="px-0 pb-0">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    I work with clients worldwide and am comfortable with different time zones. I use modern
                    collaboration tools to ensure smooth communication throughout the project.
                  </p>
                </CardContent>
              </Card>

              <Card className="p-6">
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="text-lg">What technologies do you specialize in?</CardTitle>
                </CardHeader>
                <CardContent className="px-0 pb-0">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    I specialize in React, Next.js, Node.js, and modern web technologies. I&apos;m also experienced with
                    databases, cloud platforms, and can adapt to your preferred tech stack.
                  </p>
                </CardContent>
              </Card>

              <Card className="p-6">
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="text-lg">Do you provide ongoing support?</CardTitle>
                </CardHeader>
                <CardContent className="px-0 pb-0">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Yes! I offer ongoing maintenance and support packages to keep your project running smoothly. This
                    includes updates, bug fixes, and feature enhancements as needed.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
