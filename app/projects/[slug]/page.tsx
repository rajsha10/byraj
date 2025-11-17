"use client";

import { useMemo, use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowLeft,
  Github,
  Globe,
  Calendar,
  Users,
  User,
  CheckCircle,
  Clock,
  Rocket,
  Target,
  FlaskConical,
  GraduationCap,
  Lightbulb,
} from "lucide-react";
import projectsData from "@/data/projects.json";
import { Project } from "@/types/project";
import TechIcon from "@/components/TechIcon";
import { AnimatedSection } from "@/components/animated-section";

// Cast the imported data
const allProjects: Project[] = projectsData as Project[];

export default function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);

  const project = useMemo(() => {
    return allProjects.find((p) => p.slug === slug);
  }, [slug]);

  if (!project) {
    notFound();
  }

  const metaInfo = [
    {
      icon: Calendar,
      label: "Timeline",
      value: project.meta.timeline,
    },
    {
      icon: project.meta.teamSize === "Solo Project" ? User : Users,
      label: "Team Size",
      value: project.meta.teamSize,
    },
    {
      icon: Rocket,
      label: "Role",
      value: project.meta.role,
    },
    {
      icon: project.isActive ? CheckCircle : Clock,
      label: "Status",
      value: project.status,
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="pt-24 pb-20">
        {/* Back Button */}
        <AnimatedSection animation="fade-up">
          <div className="max-w-5xl mx-auto px-6 mb-8">
            <Button asChild variant="ghost" className="group">
              <Link href="/projects">
                <ArrowLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
                Back to Projects
              </Link>
            </Button>
          </div>
        </AnimatedSection>

        {/* Header */}
        <AnimatedSection animation="fade-up" delay={100}>
          <section className="px-6 mb-12">
            <div className="max-w-5xl mx-auto text-center space-y-6">
              <h1 className="text-4xl md:text-6xl font-heading font-bold">
                {project.title}
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                {project.shortDescription}
              </p>
              <div className="flex justify-center gap-4">
                {project.links.liveDemo && (
                  <Button size="lg" asChild className="group">
                    <a href={project.links.liveDemo ? project.links.liveDemo : "#" } target="_blank" rel="noopener noreferrer">
                      View Live Demo
                      <Globe className="h-4 w-4 ml-2 transition-transform group-hover:scale-110" />
                    </a>
                  </Button>
                )}
                {project.links.github && (
                  <Button size="lg" variant="secondary" asChild className="group">
                    <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-2 transition-transform group-hover:scale-110" />
                      View on GitHub
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Banner Image */}
        <AnimatedSection animation="fade-up" delay={200}>
          <section className="px-6 mb-12">
            <div className="max-w-5xl mx-auto">
              <img
                src={project.bannerImage}
                alt={`${project.title} Banner`}
                className="w-full h-auto max-h-[500px] object-cover rounded-xl shadow-lg border border-border"
              />
            </div>
          </section>
        </AnimatedSection>

        {/* Main Content Grid */}
        <section className="px-6">
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column (Main Info) */}
            <div className="lg:col-span-2 space-y-8">
              {/* Product Info */}
              <AnimatedSection animation="fade-up" delay={300}>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl font-heading flex items-center gap-3">
                      <Lightbulb className="h-6 w-6 text-primary" />
                      Project Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-lg mb-2">Motive</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        {project.productInfo.motive}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-2">Overview</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        {project.productInfo.overview}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-2">User Flow</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        {project.productInfo.userFlow}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-2">Future Plans</h4>
                      <ul className="list-disc list-inside text-muted-foreground space-y-2">
                        {project.productInfo.futurePlans.map((plan, i) => (
                          <li key={i}>{plan}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>

              {/* Learnings & Challenges */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <AnimatedSection animation="fade-up" delay={400}>
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle className="text-2xl font-heading flex items-center gap-3">
                        <GraduationCap className="h-6 w-6 text-green-500" />
                        Learnings
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc list-inside text-muted-foreground space-y-2">
                        {project.learnings.map((learning, i) => (
                          <li key={i}>{learning}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </AnimatedSection>
                <AnimatedSection animation="fade-up" delay={500}>
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle className="text-2xl font-heading flex items-center gap-3">
                        <Target className="h-6 w-6 text-red-500" />
                        Challenges
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc list-inside text-muted-foreground space-y-2">
                        {project.challenges.map((challenge, i) => (
                          <li key={i}>{challenge}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              </div>
            </div>

            {/* Right Column (Sidebar) */}
            <div className="lg:col-span-1 space-y-8 lg:sticky lg:top-28 h-fit">
              {/* Meta Info */}
              <AnimatedSection animation="fade-up" delay={300}>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl font-heading">
                      Project Info
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {metaInfo.map((item) => (
                      <div key={item.label} className="flex items-center gap-3">
                        <item.icon className="h-5 w-5 text-primary" />
                        <div>
                          <div className="text-xs text-muted-foreground">
                            {item.label}
                          </div>
                          <div className="text-sm font-semibold text-foreground">
                            {item.value}
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </AnimatedSection>

              {/* Tech Stack */}
              <AnimatedSection animation="fade-up" delay={400}>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl font-heading">
                      Technology Stack
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-wrap gap-3">
                    {project.techStack.map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="flex items-center gap-2 py-1 px-3"
                      >
                        <TechIcon tech={tech} className="h-4 w-4" />
                        {tech}
                      </Badge>
                    ))}
                  </CardContent>
                </Card>
              </AnimatedSection>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}