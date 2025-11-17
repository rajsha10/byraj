"use client";

import { useState } from "react";
import { ProjectCard } from "@/components/ProjectCard";
import { AnimatedSection } from "@/components/animated-section";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import projectsData from "@/data/projects.json";
import { Project } from "@/types/project";

// Cast the imported data to the Project type
const allProjects: Project[] = projectsData as Project[];

export default function ProjectsPage() {
  const [filter, setFilter] = useState("all");

  const filteredProjects = allProjects.filter((project) => {
    if (filter === "all") return true;
    if (filter === "live") return project.isActive;
    if (filter === "ongoing") return !project.isActive;
    return true;
  });

  const getProjectCount = (filterValue: string) => {
    if (filterValue === "all") return allProjects.length;
    if (filterValue === "live") return allProjects.filter(p => p.isActive).length;
    if (filterValue === "ongoing") return allProjects.filter(p => !p.isActive).length;
    return 0;
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden w-full px-4 md:w-[90%] lg:w-[65%] mx-auto">
      <div className="pt-24 pb-20">
        {/* Header Section */}
        <AnimatedSection animation="fade-up">
          <section className="py-20 px-6">
            {/* UPDATED: Removed max-w-4xl, parent now handles width */}
            <div className="mx-auto text-center space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-heading font-bold">
                  Projects
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  My projects and work across different technologies and domains.
                </p>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Filter Tabs & Grid */}
        <AnimatedSection animation="fade-up" delay={200}>
          <section className="px-6">
            {/* UPDATED: Removed max-w-6xl, parent now handles width */}
            <div className="mx-auto">
              {/* Filter Tabs */}
              <div className="mb-8 flex justify-center">
                <Tabs value={filter} onValueChange={setFilter} className="w-auto">
                  <TabsList>
                    <TabsTrigger value="all">
                      All Projects ({getProjectCount("all")})
                    </TabsTrigger>
                    <TabsTrigger value="live">
                      Live ({getProjectCount("live")})
                    </TabsTrigger>
                    <TabsTrigger value="ongoing">
                      Ongoing ({getProjectCount("ongoing")})
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              {/* Projects Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                {filteredProjects.map((project, index) => (
                  <AnimatedSection
                    key={project.id}
                    animation="fade-up"
                    delay={index * 100}
                  >
                    <ProjectCard project={project} />
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </section>
        </AnimatedSection>
      </div>
    </div>
  );
}