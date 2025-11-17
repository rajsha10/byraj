import { Button } from "@/components/ui/button"
import { Code } from "lucide-react"
import { AnimatedSection } from "./animated-section"

export default function About() {
  return (
    <AnimatedSection animation="slide-right">
      <section id="about" className="py-20 px-6 relative overflow-hidden bg-background">

        <div className="mx-auto relative z-10">
          {/* Decorative leaky code in background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none text-[3rem] font-mono font-bold opacity-10 select-none leading-none">
            <span className="absolute top-10 left-20 text-blue-500">&lt;div&gt;</span>
            <span className="absolute bottom-24 right-28 text-green-500">{"{ user.name }"}</span>
            <span className="absolute top-1/2 left-1/4 text-primary">&lt;/section&gt;</span>
            <span className="absolute bottom-12 left-12 text-purple-400">console.log(`&quot;`Raj`&quot;`)</span>
          </div>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            
            {/* Content Side */}
            <div className="space-y-8 order-2 md:order-1">
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-1 w-12 bg-gradient-to-r from-primary to-primary/70 rounded-full"></div>
                  <span className="text-sm font-medium text-primary uppercase tracking-wider">
                    About Me
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
                  <span className="text-green-600 dark:text-green-400">&lt;h1&gt; </span>
                  Crafting Digital Experiences 
                  <span className="text-green-600 dark:text-green-400"> &lt;/h1&gt;</span>
                </h2>
              </div>

              <div className="space-y-6 text-muted-foreground">
                <p className="text-lg leading-relaxed">
                  I`&apos;`m <span className="text-primary font-semibold">Raj Sharma</span>, a{" "}
                  <span className="text-green-600 dark:text-green-400 font-semibold">full-stack developer</span> 
                  and computer science student passionate about building modern, scalable applications.
                </p>

                <p className="text-base leading-relaxed">
                  Skilled in{" "}
                  <span className="text-foreground font-medium">Next.js, MERN stack, PHP, MySQL, and RESTful APIs</span>, 
                  I also bring experience in{" "}
                  <span className="text-orange-600 dark:text-orange-400 font-medium">blockchain development, Solidity, and Web3 solutions</span>. 
                  I enjoy creating functional, user-friendly products with expertise in{" "}
                  <span className="text-green-600 dark:text-green-400 font-medium">AI tools, cybersecurity, and cloud deployment</span>.
                </p>

                <p className="text-base leading-relaxed">
                  With a strong foundation in{" "}
                  <span className="text-foreground font-medium">data structures, problem-solving, and software engineering</span>, 
                  I love building impactful projects like{" "}
                  <span className="text-green-600 dark:text-green-400">&lt;span&gt; </span>
                  <span className="text-primary font-medium">Asume, MindMate, and Kuroro</span>, 
                  <span className="text-green-600 dark:text-green-400"> &lt;/span&gt;</span>
                  where I combined innovation with real-world problem-solving.
                </p>
              </div>

              {/* Stats or Skills Preview */}
              <div className="grid grid-cols-3 gap-6 py-6 border-t border-b border-border">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">5+</div>
                  <div className="text-sm text-muted-foreground">Technologies</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">5+</div>
                  <div className="text-sm text-muted-foreground">Projects Shipped</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">1+</div>
                  <div className="text-sm text-muted-foreground">Years</div>
                </div>
              </div>
            </div>

            {/* Image Side */}
            <div className="relative order-1 md:order-2">
              <div className="relative group">
                <div className="relative border-none p-6">
                  <div className="aspect-square overflow-hidden flex items-center justify-center relative">
                    <img
                      src="/about.png"
                      alt="About Me"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </AnimatedSection>
  )
}