"use client";
import { motion } from "framer-motion";
import { TextReveal, TextRevealChars } from "../animated/text-reveal";
import React, { Suspense } from "react";
import { Code } from "lucide-react";
import { ProjectCard } from "../ProjectCard";
import { cn } from "@/lib/utils";
import MagneticButton from "../animated/magnetic-button";
import Link from "next/link";

interface ProjectCardProps {
  featuredProjects: {
    title: string;
    coverImage: string;
    githubLink: string | null;
    liveLink: string | null;
    isFeatures: boolean;
    role: string;
    year: number;
    id: string;
  }[];
}

const Projects = ({ featuredProjects }: ProjectCardProps) => {
  return (
    <section id="projects" className="relative py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="flex items-center gap-2 mb-5 justify-start"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Code className="text-primary size-6" />
            <TextRevealChars
              text="PROJECTS"
              className="text-lg font-medium tracking-wider uppercase text-primary"
              delay={0.5}
              duration={0.4}
              staggerDelay={0.05}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <TextReveal
              text="Featured projects showcasing my expertise and the achieved results."
              className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl"
              delay={0.6}
              duration={0.8}
            />

            <Suspense>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-16 ">
                {featuredProjects.map((project, index) => (
                  <ProjectCard
                    coverImage={project.coverImage}
                    key={project.id}
                    index={index}
                    githubLink={project.githubLink}
                    liveLink={project.liveLink}
                    isFeatures={project.isFeatures}
                    role={project.role}
                    title={project.title}
                    year={project.year}
                    id={project.id}
                    className={cn(
                      index % 2 === 0 ? "lg:mt-0" : "lg:mt-10",
                      "hover:translate-y-2 transition-transform duration-300"
                    )}
                  />
                ))}
              </div>
            </Suspense>
            <motion.div
              className="flex justify-center mt-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Link href="/projects">
                <MagneticButton variant="secondary">
                  View All Projects
                </MagneticButton>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
