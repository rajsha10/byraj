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
    <div className="min-h-screen bg-background text-foreground">
      <div className="pt-24 pb-20">
        {/* Hero Section */}
        <AnimatedSection animation="fade-up">
          <section className="py-20 px-6">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-heading font-bold">
                  My <span className="text-red-900 dark:text-orange-400">Experience</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  A timeline of my professional growth, projects, and learning.
                </p>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Timeline Section */}
        <AnimatedSection animation="fade-up" delay={200}>
          <section className="px-6">
            <div className="max-w-4xl mx-auto">
              <div className="relative space-y-12">
                {/* Timeline Line */}
                <div className="absolute left-6 top-0 bottom-0 w-px bg-border -translate-x-1/2"></div>

                {(timelineData as ExperienceItem[]).map((item) => {
                  const isVisible = visibleItems.includes(item.id);

                  return (
                    <div
                      key={item.id}
                      data-id={item.id}
                      className={`relative flex gap-6 transition-all duration-700 ${
                        isVisible
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-8"
                      }`}
                    >
                      {/* Content Card */}
                      <Card className="w-full">
                        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                          <div className="flex items-center gap-4">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={item.logoUrl}
                              alt={`${item.brandName} Logo`}
                              className="w-14 h-14 rounded-lg border border-border"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://placehold.co/100x100/334155/94a3b8?text=Logo';
                              }}
                            />
                            <div>
                              <CardTitle className="text-2xl font-heading">
                                {item.role}
                              </CardTitle>
                              <div className="text-lg text-green-600 dark:text-green-400 font-medium">
                                {item.brandName}
                              </div>
                            </div>
                          </div>
                          <Badge
                            variant={
                              item.type === "education" ? "secondary" : "default"
                            }
                            className="capitalize flex-shrink-0"
                          >
                            {item.type}
                          </Badge>
                        </CardHeader>

                        <CardContent className="space-y-6">
                          {/* Meta Info */}
                          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground border-t border-b border-border py-4">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              {item.timeline}
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4" />
                              {item.location}
                            </div>
                            <div className="flex items-center gap-2">
                              {item.workType === "Remote" ? (
                                <Laptop className="h-4 w-4" />
                              ) : (
                                <Building className="h-4 w-4" />
                              )}
                              {item.workType}
                            </div>
                          </div>

                          {/* Work Done */}
                          <div className="space-y-3">
                            <h4 className="font-semibold text-lg flex items-center gap-2">
                              <CheckCircle className="h-5 w-5 text-green-500" />
                              What I Did
                            </h4>
                            <ul className="list-disc list-inside text-muted-foreground space-y-2 pl-2">
                              {item.workDone.map((point, i) => (
                                <li key={i}>{point}</li>
                              ))}
                            </ul>
                          </div>

                          {/* Learnings */}
                          <div className="space-y-3">
                            <h4 className="font-semibold text-lg flex items-center gap-2">
                              <BookOpen className="h-5 w-5 text-blue-500" />
                              What I Learned
                            </h4>
                            <p className="text-muted-foreground italic">
                              &quot;{item.learnings}&quot;
                            </p>
                          </div>

                          {/* Tech Stack */}
                          <div className="space-y-3">
                            <h4 className="font-semibold text-lg flex items-center gap-2">
                              <Award className="h-5 w-5 text-yellow-500" />
                              Technologies Used
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {item.techsUsed.map((tech, i) => (
                                <Badge
                                  key={i}
                                  variant="secondary"
                                  className="flex items-center gap-2 py-1 px-3"
                                >
                                  <TechIcon tech={tech} className="h-4 w-4" />
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          {/* Certificate Link */}
                          {item.certificateUrl && (
                            <div className="pt-4">
                              <Button asChild variant="outline" className="group">
                                <a
                                  href={item.certificateUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  View Certificate
                                  <LinkIcon className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                                </a>
                              </Button>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </AnimatedSection>
      </div>
    </div>
  );
}