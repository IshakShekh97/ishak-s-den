import React, { Suspense } from "react";
import { Code } from "lucide-react";
import TextReveal, { TextRevealChars } from "@/components/animated/text-reveal";
import prisma from "@/lib/prisma";
import { cn } from "@/lib/utils";
import { ProjectCard } from "@/components/ProjectCard";
import { Skeleton } from "@/components/ui/skeleton";

const ProjectsPage = () => {
  return (
    <section id="projects" className="relative py-20 ">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-5 justify-start">
            <Code className="text-primary size-6" />
            <TextRevealChars
              text="PROJECTS"
              className="text-lg font-medium tracking-wider uppercase text-primary"
              delay={0.5}
              duration={0.4}
              staggerDelay={0.05}
            />
          </div>

          <div>
            <TextReveal
              text="A selection of featured projects that highlight my expertise and results."
              className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl"
              delay={0.6}
              duration={0.8}
            />
          </div>
        </div>
      </div>
      <div className="bg-background mt-5">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto py-10">
            <Suspense fallback={<CardSkeleton />}>
              <ProjectsGrid />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
};

const ProjectsGrid = async () => {
  const projects = await prisma.project.findMany({
    select: {
      title: true,
      coverImage: true,
      githubLink: true,
      liveLink: true,
      isFeatures: true,
      role: true,
      year: true,
      id: true,
    },
    orderBy: {
      order: "asc",
    },
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
      {projects.map((project, index) => (
        <ProjectCard
          key={project.id}
          index={index}
          title={project.title}
          coverImage={project.coverImage}
          githubLink={project.githubLink}
          liveLink={project.liveLink}
          isFeatures={project.isFeatures}
          role={project.role}
          year={project.year}
          id={project.id}
          className={cn(
            index % 2 === 0 ? "lg:mt-0" : "lg:mt-10",
            "hover:translate-y-2 transition-transform duration-300"
          )}
        />
      ))}
    </div>
  );
};

const CardSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="group cursor-pointer">
          <div className="block pb-5">
            <div className="rounded-2xl overflow-hidden relative aspect-video">
              <Skeleton className="w-full h-full rounded-2xl" />
            </div>
          </div>

          <div className="px-2">
            <div className="flex items-end justify-between mb-1">
              <div className="flex-1">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </div>
              <Skeleton className="h-4 w-12" />
            </div>
          </div>

          <div className="flex items-center justify-between mt-5">
            <Skeleton className="h-6 w-20" />
            <div className="flex items-center justify-center gap-3">
              <Skeleton className="h-8 w-8 rounded-md" />
              <Skeleton className="h-8 w-8 rounded-md" />
              <Skeleton className="h-8 w-8 rounded-md" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectsPage;
