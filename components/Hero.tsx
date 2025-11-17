import { BackgroundRippleEffect } from "./ui/background-ripple-effect"
import AnimatedGreetings from "./AnimatedGreetings"
import { AnimatedSection } from "./animated-section"
import { Button } from "@/components/ui/button"
import { ArrowRight, Github, Linkedin, Twitter } from "lucide-react"
import { FaXTwitter } from "react-icons/fa6";
import ProfileImage from "./ProfileImage"
import { LinkPreview } from "./ui/link-preview"

import { BiLogoTypescript, BiLogoPostgresql } from "react-icons/bi";
import { FaReact } from "react-icons/fa";
import { SiNextdotjs, SiMongodb } from "react-icons/si";
import { TbBrandThreejs } from "react-icons/tb";
import { PiReadCvLogoFill } from "react-icons/pi";

export default function Hero(){

    return(
        <section className="pt-32 px-6">
            <div className="relative">
            <BackgroundRippleEffect />

            <div className="relative z-10 p-8 md:p-12">
                <div className="text-left space-y-6">
                    <AnimatedSection animation="fade-up" delay={100}>
                        <div className="space-y-4">
                            <ProfileImage
                                src="/profile.jpg"
                                alt="Profile picture of Raj"
                            />

                            <div className="space-y-2">
                                <div className="text-lg md:text-xl font-medium text-muted-foreground">
                                <span className="block transition-all duration-500 transform">
                                    <AnimatedGreetings />
                                </span>
                                </div>
                                
                                <h1 className="text-xl md:text-3xl lg:text-4xl font-bold text-foreground leading-tight tracking-tight">
                                I'm Raj — A Full Stack web developer.
                                </h1>
                                <span className="p-0 m-0 italic text-muted-foreground">
                                    Always learning. Always building
                                </span>

                                <div className="text-base md:text-lg text-muted-foreground pt-4">
                                    <div className="flex flex-wrap items-center gap-2 leading-relaxed">
                                        <span>Building modern, scalable, and interactive web apps with</span>
                                        
                                        {/* TypeScript */}
                                        <span className="px-3 py-1.5 rounded-lg bg-blue-600/20 border border-blue-500/30 text-blue-600 dark:text-blue-300 text-sm font-medium hover:bg-blue-600/30 hover:border-blue-400/50 transition-all duration-200 flex items-center gap-2">
                                        <BiLogoTypescript />
                                        TypeScript
                                        </span>
                                        <span>,</span>
                                        
                                        {/* React */}
                                        <span className="px-3 py-1.5 rounded-lg bg-cyan-600/20 border border-cyan-500/30 text-cyan-600 dark:text-cyan-300 text-sm font-medium hover:bg-cyan-600/30 hover:border-cyan-400/50 transition-all duration-200 flex items-center gap-2">
                                        <FaReact />
                                        React
                                        </span>
                                        <span>,</span>
                                        
                                        {/* Next.js */}
                                        <span className="px-3 py-1.5 rounded-lg bg-foreground/10 border border-foreground/20 text-foreground text-sm font-medium hover:bg-foreground/20 hover:border-foreground/30 transition-all duration-200 flex items-center gap-2">
                                        <SiNextdotjs />
                                        Next.js
                                        </span>
                                        <span>,</span>
                                        
                                        {/* MongoDB */}
                                        <span className="px-3 py-1.5 rounded-lg bg-green-600/20 border border-green-500/30 text-green-700 dark:text-green-300 text-sm font-medium hover:bg-green-600/30 hover:border-green-400/50 transition-all duration-200 flex items-center gap-2">
                                        <SiMongodb />
                                        MongoDB
                                        </span>
                                        
                                        {/* PostgreSQL */}
                                        <span className="px-3 py-1.5 rounded-lg bg-blue-700/20 border border-blue-600/30 text-blue-700 dark:text-blue-200 text-sm font-medium hover:bg-blue-700/30 hover:border-blue-500/50 transition-all duration-200 flex items-center gap-2">
                                        <BiLogoPostgresql />
                                        PostgreSQL
                                        </span>
                                        <span>&</span>
                                        
                                        {/* Three.js */}
                                        <span className="px-3 py-1.5 rounded-lg bg-foreground/10 border border-foreground/20 text-foreground text-sm font-medium hover:bg-foreground/20 hover:border-foreground/30 transition-all duration-200 flex items-center gap-2">
                                        <TbBrandThreejs />
                                        Three.js
                                        </span>
                                        <span>today's most powerful technologies</span>
                                    </div>
                                    </div>
                            </div>
                        </div>
                    </AnimatedSection>

                    {/* --- Button Section --- */}
                    <AnimatedSection animation="fade-up" delay={300}>
                        <div className="flex flex-col sm:flex-row gap-6 justify-start pt-6">
                            <LinkPreview url="https://drive.google.com/file/d/1lEqfY5xugf9GKamFZQhgE9pb-wG7k1Sv/view?usp=sharing">
                                <Button
                                    size="lg"
                                    className="group relative overflow-hidden bg-primary hover:bg-primary/90 
                                    text-primary-foreground border-2 border-primary/50 hover:border-primary 
                                    shadow-lg hover:shadow-xl hover:shadow-primary/25 transition-all duration-300 
                                    hover:scale-105 px-10 py-5 text-base font-bold rounded-xl"
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        Resume/CV
                                        <PiReadCvLogoFill className="w-5 h-5" />
                                    </span>
                                    <div className="absolute -inset-1 bg-primary/20 rounded-xl blur opacity-75 group-hover:opacity-100 transition-opacity" />
                                </Button>
                            </LinkPreview>
                            
                            <Button
                                size="lg"
                                className="group relative overflow-hidden bg-secondary hover:bg-secondary/80 
                                text-secondary-foreground border-2 border-secondary/50 hover:border-secondary 
                                shadow-lg hover:shadow-xl hover:shadow-secondary/25 
                                transition-all duration-300 hover:scale-105 px-10 py-5 text-base font-bold rounded-xl"
                            >
                                <span className="relative z-10">Contact</span>
                                <div className="absolute -inset-1 bg-secondary/20 rounded-xl blur opacity-75 group-hover:opacity-100 transition-opacity" />
                            </Button>
                        </div>
                    </AnimatedSection>
                    {/* --- End of Button Section --- */}

                    <AnimatedSection animation="fade-up" delay={500}>
                        <div className="relative flex justify-start gap-4 z-50">
                            <LinkPreview
                                url="https://github.com/rajsha10"
                                className="group relative p-3 rounded-lg bg-card border border-border 
                                hover:bg-accent hover:border-accent transition-all duration-300 
                                hover:scale-110 hover:-translate-y-1 hover:shadow-lg"
                            >
                                <Github className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors duration-300" />
                            </LinkPreview>
                            
                            <button
                             className="group relative p-3 rounded-lg bg-card border border-border 
                                hover:bg-accent hover:border-accent transition-all duration-300 
                                hover:scale-110 hover:-translate-y-1 hover:shadow-lg cursor-pointer"
                            >
                                <Linkedin className="h-5 w-5 text-muted-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300" />
                            </button>
                            
                            <button
                                className="group relative p-3 rounded-lg bg-card border border-border 
                                hover:bg-accent hover:border-accent transition-all duration-300 
                                hover:scale-110 hover:-translate-y-1 hover:shadow-lg"
                            >
                                <FaXTwitter className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors duration-300" />
                            </button>
                        </div>
                    </AnimatedSection>
                </div>
            </div>
            </div>
        </section>
    )
}