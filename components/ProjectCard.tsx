"use client";

import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Github, Globe, CheckCircle, Clock } from "lucide-react";
import { Project } from "@/types/project";
import TechIcon from "./TechIcon";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const router = useRouter();

  const handleNavigate = (e?: any) => {
    e?.stopPropagation();
    router.push(`/projects/${project.slug}`);
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter" || e.key === " ") {
      handleNavigate(e);
    }
  };

  return (
    <div
      role="link"
      tabIndex={0}
      onClick={(e) => handleNavigate(e)}
      onKeyDown={handleKeyDown}
      className="group block"
    >
      <Card className="flex h-full flex-col overflow-hidden bg-card transition-all duration-300 ease-out hover:shadow-lg hover:shadow-primary/20">
        {/* Image Thumbnail */}
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <img
            src={project.thumbnail}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
          />
          {/* Gradient Overlay on Hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/50 via-primary/20 to-transparent opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100" />
          
          {/* Status Badge */}
          <Badge
            variant={project.isActive ? "default" : "secondary"}
            className={`absolute top-3 right-3 flex items-center gap-1 border border-black/10 ${
              project.isActive
                ? "bg-green-500/90 text-white"
                : "bg-amber-500/90 text-white"
            }`}
          >
            {project.isActive ? (
              <CheckCircle className="h-3 w-3" />
            ) : (
              <Clock className="h-3 w-3" />
            )}
            {project.status}
          </Badge>
        </div>

        {/* Card Content */}
        <div className="flex flex-1 flex-col p-5">
          <div className="flex flex-1 flex-col">
            {/* Header: Title + Links */}
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-xl font-bold text-foreground transition-colors">
                &lt;H3&gt;&nbsp;
                {project.title}
                &nbsp;&lt;&#47;H3&gt;

              </h3>
              <div className="flex flex-shrink-0 items-center gap-2">
                <TooltipProvider>
                  {project.links.github && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <a
                          href={project.links.github ? project.links.github : "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-muted-foreground transition-colors hover:text-foreground"
                        >
                          <Github className="h-5 w-5" />
                        </a>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>View on GitHub</p>
                      </TooltipContent>
                    </Tooltip>
                  )}
                  {project.links.liveDemo && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <a
                          href={project.links.liveDemo ? project.links.liveDemo : "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-muted-foreground transition-colors hover:text-foreground"
                        >
                          <Globe className="h-5 w-5" />
                        </a>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>View Live Demo</p>
                      </TooltipContent>
                    </Tooltip>
                  )}
                </TooltipProvider>
              </div>
            </div>

            {/* Short Description */}
            <p className="mt-3 text-sm text-muted-foreground line-clamp-3">
              {project.shortDescription}
            </p>
          </div>

          {/* Footer: Tech Stack */}
          <div className="mt-6">
            <h4 className="mb-3 text-xs font-semibold uppercase text-muted-foreground">
              Technologies
            </h4>
            <div className="flex flex-wrap items-center gap-3">
              <TooltipProvider>
                {project.techStack.map((tech) => (
                  <Tooltip key={tech}>
                    <TooltipTrigger>
                      <div className="text-muted-foreground transition-colors hover:text-primary">
                        <TechIcon tech={tech} className="h-5 w-5" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{tech}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </TooltipProvider>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}