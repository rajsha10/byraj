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
  Clock,
  CheckCircle,
  MessageSquare,
  Coffee,
} from "lucide-react"
import { BsTwitterX } from "react-icons/bs";

const contactMethods = [
  {
    icon: Mail,
    title: "Email",
    value: "rajsha8617@gmail.com",
    description: "Best for detailed project discussions",
    href: "mailto:rajsha8617@gmail.com",
  },
]

const socialLinks = [
  {
    icon: Github,
    name: "GitHub",
    username: "@rajsha10",
    href: "https://github.com/rajsha10",
    color: "hover:text-gray-400",
  },
  {
    icon: Linkedin,
    name: "LinkedIn",
    username: "Raj Sharma",
    href: "https://www.linkedin.com/in/raj-sharma-web/",
    color: "hover:text-blue-400",
  },
  {
    icon: BsTwitterX,
    name: "Twitter",
    username: "@raj_sharma190",
    href: "https://x.com/raj_sharma190",
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
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden w-full px-4 md:w-[90%] lg:w-[65%] mx-auto">
      <div className="pt-24 pb-8">
        {/* Hero Section */}
        <section className="py-10 px-6">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-heading font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
                Let&apos;s <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">Connect</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Ready to bring your ideas to life? I&apos;d love to hear about your project and explore how we can work
                together.
              </p>
            </div>

            <div className="flex items-center justify-center py-2">
              <div className="w-20 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
              <div className="mx-4 text-primary/60 text-sm">✦</div>
              <div className="w-20 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="px-6">
          <div className="mx-auto">
            {/* Fixed Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Contact Form - Main Content */}
              <div className="lg:col-span-2 space-y-6">
                <div className="relative rounded-2xl overflow-hidden bg-card/40 dark:bg-card/60 backdrop-blur-md border border-border/50 dark:border-primary/20 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10">
                  <div className="p-8 md:p-10">
                    {/* Header with gradient accent */}
                    <div className="mb-8 pb-6 border-b border-border/50 dark:border-primary/10">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-primary/10 dark:bg-primary/20">
                          <MessageSquare className="h-5 w-5 text-primary" />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-heading font-bold">Send Me a Message</h2>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        Fill out the form below and I&apos;ll get back to you within 24 hours.
                      </p>
                    </div>

                    {isSubmitted ? (
                      <div className="text-center py-16 space-y-5 animate-in fade-in-0 zoom-in-95 duration-500">
                        <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-green-500/20 to-green-600/10 flex items-center justify-center ring-4 ring-green-500/20">
                          <CheckCircle className="h-10 w-10 text-green-500" />
                        </div>
                        <h3 className="text-2xl font-heading font-bold">Message Sent Successfully!</h3>
                        <p className="text-muted-foreground max-w-md mx-auto">
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
                              className={`transition-all duration-300 bg-background/50 ${
                                focusedField === "name" ? "border-primary ring-2 ring-primary/20" : ""
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
                              className={`transition-all duration-300 bg-background/50 ${
                                focusedField === "email" ? "border-primary ring-2 ring-primary/20" : ""
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
                              className={`w-full px-3 py-2 bg-background/50 border border-input rounded-md text-sm transition-all duration-300 ${
                                focusedField === "projectType" ? "border-primary ring-2 ring-primary/20" : ""
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
                              className={`w-full px-3 py-2 bg-background/50 border border-input rounded-md text-sm transition-all duration-300 ${
                                focusedField === "budget" ? "border-primary ring-2 ring-primary/20" : ""
                              }`}
                            >
                              <option value="">Select budget range</option>
                              <option value="5k-10k">₹5,000 - ₹10,000</option>
                              <option value="10k-25k">₹10,000 - ₹25,000</option>
                              <option value="25k-50k">₹25,000 - ₹50,000</option>
                              <option value="50k+">₹50,000+</option>
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
                            className={`transition-all duration-300 bg-background/50 ${
                              focusedField === "subject" ? "border-primary ring-2 ring-primary/20" : ""
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
                            className={`min-h-32 transition-all duration-300 bg-background/50 ${
                              focusedField === "message" ? "border-primary ring-2 ring-primary/20" : ""
                            }`}
                            placeholder="Tell me more about your project, goals, timeline, and any specific requirements..."
                            required
                          />
                        </div>

                        <Button
                          type="submit"
                          size="lg"
                          disabled={isSubmitting}
                          className="w-full group relative overflow-hidden bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl hover:shadow-primary/20 transition-all duration-300"
                        >
                          {isSubmitting ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary-foreground border-t-transparent mr-2"></div>
                              Sending Message...
                            </>
                          ) : (
                            <>
                              Send Message
                              <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                            </>
                          )}
                        </Button>
                      </form>
                    )}
                  </div>
                </div>

                {/* Fun Fact Card */}
                <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/5 backdrop-blur-sm border border-primary/20 p-6">
                  <div className="text-center space-y-3">
                    <div className="w-14 h-14 mx-auto rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                      <Coffee className="h-7 w-7 text-primary" />
                    </div>
                    <div className="text-base font-semibold">Coffee Chat?</div>
                    <div className="text-sm text-muted-foreground leading-relaxed">
                      I&apos;m always up for a virtual coffee chat to discuss ideas, even if there&apos;s no immediate
                      project in mind!
                    </div>
                  </div>
                </div>
              </div>

              {/* Sticky Sidebar */}
              <div className="lg:col-span-1">
                <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
                  {/* Contact Methods */}
                  <div className="relative rounded-2xl overflow-hidden bg-card/40 dark:bg-card/60 backdrop-blur-md border border-border/50 dark:border-primary/20 hover:border-primary/50 transition-all duration-500 p-6">
                    <div className="mb-4">
                      <h3 className="text-lg font-heading font-semibold">Get In Touch</h3>
                      <p className="text-sm text-muted-foreground mt-1">Choose your preferred way to connect</p>
                    </div>
                    <div className="space-y-3">
                      {contactMethods.map((method, index) => (
                        <a
                          key={index}
                          href={method.href}
                          className="flex items-start gap-3 p-3 rounded-xl hover:bg-primary/5 dark:hover:bg-primary/10 transition-all duration-300 group border border-transparent hover:border-primary/30"
                        >
                          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center group-hover:bg-primary/20 dark:group-hover:bg-primary/30 transition-colors">
                            <method.icon className="h-5 w-5 text-primary" />
                          </div>
                          <div className="space-y-1 flex-1">
                            <div className="font-medium text-sm">{method.title}</div>
                            <div className="text-sm text-foreground break-all">{method.value}</div>
                            <div className="text-xs text-muted-foreground">{method.description}</div>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="relative rounded-2xl overflow-hidden bg-card/40 dark:bg-card/60 backdrop-blur-md border border-border/50 dark:border-primary/20 hover:border-primary/50 transition-all duration-500 p-6">
                    <div className="mb-4">
                      <h3 className="text-lg font-heading font-semibold">Follow Me</h3>
                      <p className="text-sm text-muted-foreground mt-1">Stay updated with my latest work</p>
                    </div>
                    <div className="space-y-3">
                      {socialLinks.map((social, index) => (
                        <a
                          key={index}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-3 rounded-xl hover:bg-primary/5 dark:hover:bg-primary/10 transition-all duration-300 group border border-transparent hover:border-primary/30"
                        >
                          <div className="w-9 h-9 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center group-hover:bg-primary/20 dark:group-hover:bg-primary/30 transition-colors">
                            <social.icon className="h-4 w-4 text-primary" />
                          </div>
                          <div className="space-y-0.5 flex-1">
                            <div className="font-medium text-sm">{social.name}</div>
                            <div className="text-xs text-muted-foreground">{social.username}</div>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Availability */}
                  <div className="relative rounded-2xl overflow-hidden bg-card/40 dark:bg-card/60 backdrop-blur-md border border-border/50 dark:border-primary/20 hover:border-primary/50 transition-all duration-500 p-6">
                    <div className="mb-4 flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-primary/10 dark:bg-primary/20">
                        <Clock className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-heading font-semibold">Availability</h3>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">My typical working hours</p>
                    <div className="space-y-3">
                      {availability.map((slot, index) => (
                        <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors">
                          <div className="text-sm font-medium">{slot.day}</div>
                          <div className="flex items-center gap-2">
                            <Badge
                              variant={slot.available ? "default" : "secondary"}
                              className={`text-xs ${slot.available ? 'bg-primary/20 text-primary hover:bg-primary/30 border-primary/30' : ''}`}
                            >
                              {slot.hours}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold">Frequently Asked Questions</h2>
              <p className="text-base text-muted-foreground">Quick answers to common questions</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative rounded-2xl overflow-hidden bg-card/40 dark:bg-card/60 backdrop-blur-md border border-border/50 dark:border-primary/20 hover:border-primary/50 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 p-6">
                <h3 className="text-lg font-semibold mb-3">What&apos;s your typical project timeline?</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Project timelines vary based on complexity, but most websites take 2-4 weeks, while web applications
                  can take 1-3 months. I&apos;ll provide a detailed timeline after understanding your requirements.
                </p>
              </div>

              <div className="relative rounded-2xl overflow-hidden bg-card/40 dark:bg-card/60 backdrop-blur-md border border-border/50 dark:border-primary/20 hover:border-primary/50 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 p-6">
                <h3 className="text-lg font-semibold mb-3">Do you work with international clients?</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  I work with clients worldwide and am comfortable with different time zones. I use modern
                  collaboration tools to ensure smooth communication throughout the project.
                </p>
              </div>

              <div className="relative rounded-2xl overflow-hidden bg-card/40 dark:bg-card/60 backdrop-blur-md border border-border/50 dark:border-primary/20 hover:border-primary/50 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 p-6">
                <h3 className="text-lg font-semibold mb-3">What technologies do you specialize in?</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  I specialize in React, Next.js, Node.js, and modern web technologies. I&apos;m also experienced with
                  databases, cloud platforms, and can adapt to your preferred tech stack.
                </p>
              </div>

              <div className="relative rounded-2xl overflow-hidden bg-card/40 dark:bg-card/60 backdrop-blur-md border border-border/50 dark:border-primary/20 hover:border-primary/50 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 p-6">
                <h3 className="text-lg font-semibold mb-3">Do you provide ongoing support?</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Yes! I offer ongoing maintenance and support packages to keep your project running smoothly. This
                  includes updates, bug fixes, and feature enhancements as needed.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}