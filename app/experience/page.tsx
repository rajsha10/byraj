"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnimatedSection } from "@/components/animated-section";
import TechIcon from "@/components/TechIcon";
import {
  Award,
  Calendar,
  MapPin,
  Building,
  Laptop,
  BookOpen,
  CheckCircle,
  Link as LinkIcon,
} from "lucide-react";
import timelineData from "@/data/experience.json";

interface ExperienceItem {
  id: number;
  type: "work" | "education";
  logoUrl: string;
  brandName: string;
  role: string;
  timeline: string;
  certificateUrl: string;
  techsUsed: string[];
  workDone: string[];
  learnings: string;
  location: string;
  workType: "Remote" | "In-Office" | "On-Campus";
}

export default function ExperiencePage() {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = Number.parseInt(entry.target.getAttribute("data-id") || "0");
          if (entry.isIntersecting) {
            setVisibleItems((prev) => [...new Set([...prev, id])]);
          }
        });
      },
      { threshold: 0.2 }
    );

    const elements = document.querySelectorAll("[data-id]");
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <div className="w-full px-4 md:w-[90%] lg:w-[65%] mx-auto pt-24 pb-8">
        {/* Hero Section */}
        <AnimatedSection animation="fade-up">
          <section className="py-16 relative">
            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3">
                <span className="text-primary font-mono text-sm">&lt;experience&gt;</span>
                <div className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent"></div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold">
                Professional <span className="text-primary">Journey</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
                A comprehensive timeline of my professional growth, projects, and continuous learning journey
              </p>
            </div>
          </section>
        </AnimatedSection>

        {/* Timeline Section */}
        <AnimatedSection animation="fade-up" delay={200}>
          <section className="relative">
            <div className="space-y-12">
              {(timelineData as ExperienceItem[]).map((item, index) => {
                const isVisible = visibleItems.includes(item.id);

                return (
                  <div
                    key={item.id}
                    data-id={item.id}
                    className={`group relative transition-all duration-700 ${
                      isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-8"
                    }`}
                  >
                    {/* Card Container with Modern Design */}
                    <div className="relative rounded-2xl overflow-hidden bg-card/40 dark:bg-card/60 backdrop-blur-md border border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10">

                      {/* Header Section */}
                      <div className="p-8 lg:p-10 border-b border-border/50 bg-gradient-to-br from-primary/5 dark:from-primary/10 to-transparent">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                          <div className="flex items-start gap-5 flex-1">
                            {/* Logo */}
                            <div className="relative group/logo">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={item.logoUrl}
                                alt={`${item.brandName} Logo`}
                                className="w-16 h-16 rounded-xl border-2 border-border group-hover/logo:border-primary transition-all duration-300 shadow-sm bg-background/80 dark:bg-background/60"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = 'https://placehold.co/100x100/334155/94a3b8?text=Logo';
                                }}
                              />
                              <div className="absolute inset-0 rounded-xl bg-primary/20 dark:bg-primary/30 opacity-0 group-hover/logo:opacity-100 transition-opacity duration-300"></div>
                            </div>

                            {/* Title & Company */}
                            <div className="flex-1 space-y-2">
                              <h2 className="text-2xl md:text-3xl font-bold tracking-tight group-hover:text-primary transition-colors duration-300">
                                {item.role}
                              </h2>
                              <div className="text-lg text-primary font-semibold">
                                {item.brandName}
                              </div>
                            </div>
                          </div>

                          {/* Type Badge */}
                          <div className={`px-4 py-2 rounded-full text-sm font-medium border ${
                            item.type === "education"
                              ? "bg-blue-500/10 dark:bg-blue-500/20 text-blue-500 dark:text-blue-400 border-blue-500/30 dark:border-blue-500/40"
                              : "bg-primary/10 dark:bg-primary/20 text-primary border-primary/30 dark:border-primary/40"
                          }`}>
                            {item.type === "education" ? "Education" : "Work"}
                          </div>
                        </div>

                        {/* Meta Info Row */}
                        <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground mt-6">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-primary" />
                            <span className="font-medium">{item.timeline}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-primary" />
                            <span className="font-medium">{item.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {item.workType === "Remote" ? (
                              <Laptop className="h-4 w-4 text-primary" />
                            ) : (
                              <Building className="h-4 w-4 text-primary" />
                            )}
                            <span className="font-medium">{item.workType}</span>
                          </div>
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="p-8 lg:p-10 space-y-8">
                        {/* Work Done */}
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-green-500/10 dark:bg-green-500/20">
                              <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400" />
                            </div>
                            <h3 className="font-bold text-xl">Key Contributions</h3>
                          </div>
                          <ul className="space-y-3 ml-1">
                            {item.workDone.map((point, i) => (
                              <li key={i} className="flex gap-3 text-muted-foreground leading-relaxed">
                                <span className="text-primary mt-1.5">▹</span>
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Learnings */}
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-blue-500/10 dark:bg-blue-500/20">
                              <BookOpen className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                            </div>
                            <h3 className="font-bold text-xl">Key Learnings</h3>
                          </div>
                          <div className="ml-1 p-4 rounded-xl bg-muted/30 dark:bg-muted/50 border border-border/50 relative">
                            <div className="absolute top-3 left-3 text-4xl text-primary/20 dark:text-primary/30">&ldquo;</div>
                            <p className="text-muted-foreground italic leading-relaxed pl-8">
                              {item.learnings}
                            </p>
                          </div>
                        </div>

                        {/* Tech Stack */}
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-amber-500/10 dark:bg-amber-500/20">
                              <Award className="h-5 w-5 text-amber-500 dark:text-amber-400" />
                            </div>
                            <h3 className="font-bold text-xl">Technologies & Tools</h3>
                          </div>
                          <div className="flex flex-wrap gap-2 ml-1">
                            {item.techsUsed.map((tech, i) => (
                              <div
                                key={i}
                                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/5 dark:bg-primary/10 text-foreground border border-primary/20 dark:border-primary/30 hover:bg-primary/10 dark:hover:bg-primary/20 hover:border-primary/40 dark:hover:border-primary/50 transition-all duration-300 text-sm font-medium"
                              >
                                <TechIcon tech={tech} className="h-4 w-4" />
                                <span>{tech}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Certificate Link */}
                        {item.certificateUrl && (
                          <div className="pt-4">
                            <a
                              href={item.certificateUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-primary/10 dark:bg-primary/20 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 font-medium group/cert"
                            >
                              <Award className="h-4 w-4" />
                              <span>View Certificate</span>
                              <LinkIcon className="h-4 w-4 transition-transform group-hover/cert:translate-x-1" />
                            </a>
                          </div>
                        )}
                      </div>

                      {/* Decorative corner accent */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 dark:from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-3xl"></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </AnimatedSection>
      </div>
    </div>
  );
}