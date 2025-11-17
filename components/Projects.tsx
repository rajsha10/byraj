import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { AnimatedSection } from "./animated-section"

export default function Projects(){


    return(

        <AnimatedSection animation="slide-left">
        <section id="projects" className="py-20 px-4 md:px-6">
          <div className="w-full md:max-w-[80%] lg:max-w-[60%] mx-auto">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl md:text-4xl font-heading font-bold">Featured Projects</h2>
              <p className="text-lg text-muted-foreground">Some of my recent work</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "E-commerce Platform",
                  tech: "React, Node.js, MongoDB",
                  image: "/modern-ecommerce-website.png",
                },
                { title: "Portfolio Website", tech: "Next.js, Tailwind CSS", image: "/portfolio-website-design.png" },
                { title: "Task Management App", tech: "Vue.js, Firebase", image: "/task-management-dashboard.png" },
              ].map((project, index) => (
                <AnimatedSection key={index} animation="zoom-in" delay={index * 150}>
                  <Card className="group hover:shadow-xl hover:shadow-accent/20 transition-all duration-500 hover:-translate-y-4 hover:rotate-1">
                    <div className="aspect-video overflow-hidden rounded-t-lg">
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="group-hover:text-accent transition-colors duration-300">
                        {project.title}
                      </CardTitle>
                      <CardDescription>{project.tech}</CardDescription>
                    </CardHeader>
                  </Card>
                </AnimatedSection>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button
                size="lg"
                className="group hover:shadow-lg hover:shadow-accent/25 transition-all duration-300"
              >
                See More Projects
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </section>
      </AnimatedSection>
    )
}