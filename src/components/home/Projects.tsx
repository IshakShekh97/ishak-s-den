"use client";
import { motion } from "framer-motion";
import { TextReveal, TextRevealChars } from "../animated/text-reveal";
import { useEffect, useState } from "react";
import { getPortfolio } from "@/sanity/lib/client";
import { Portfolio as PortfolioType } from "@/sanity/types";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";

import React from "react";
import MagneticButton from "../animated/magnetic-button";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Code, Github } from "lucide-react";
import { ImageLoader } from "../image-loader";

const Projects = () => {
  const [portfolioData, setPortfolioData] = useState<
    PortfolioType[] | undefined
  >();
  const [dataState, setDataState] = useState<"loading" | "loaded" | "error">(
    "loading"
  );

  useEffect(() => {
    async function getPortfolios() {
      try {
        const response = (await getPortfolio()).slice(0, 4);
        if (response) {
          setPortfolioData(response as PortfolioType[]);
        }
        setDataState("loaded");
      } catch (error) {
        console.log(error);
        setDataState("error");
      }
    }
    getPortfolios();
  }, []);

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

            {/* Projects Display */}
            {dataState == "loading" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-16">
                {[1, 2, 3, 4].map((_, index) => (
                  <motion.div
                    key={index}
                    className={cn(
                      "group",
                      index % 2 === 0 ? "lg:mt-0" : "lg:mt-10",
                      "hover:translate-y-2 transition-transform duration-300"
                    )}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
                  >
                    <div className="rounded-3xl overflow-hidden relative bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 p-8 mb-6 aspect-[16/10]">
                      <Skeleton className="w-full h-full" />
                    </div>
                    <div className="px-2">
                      <Skeleton className="h-8 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-1/2 mb-4" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-2/3 mb-6" />

                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          {[1, 2, 3].map((_, tagIndex) => (
                            <Skeleton
                              key={tagIndex}
                              className="h-6 w-16 rounded-full"
                            />
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <Skeleton className="h-8 w-8 rounded" />
                          <Skeleton className="h-8 w-8 rounded" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {dataState === "error" && (
              <div className="flex justify-center items-center h-96 text-destructive text-lg font-semibold mt-16">
                Error loading projects
              </div>
            )}

            {dataState === "loaded" &&
              portfolioData &&
              portfolioData.length === 0 && (
                <div className="flex justify-center items-center h-96 text-muted-foreground text-lg font-semibold mt-16">
                  No projects available
                </div>
              )}

            {dataState === "loaded" && portfolioData && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-16 ">
                {portfolioData.map((project, index) => (
                  <ProjectCard
                    key={index}
                    project={project}
                    index={index}
                    className={cn(
                      index % 2 === 0 ? "lg:mt-0" : "lg:mt-10",
                      "hover:translate-y-2 transition-transform duration-300"
                    )}
                  />
                ))}
              </div>
            )}

            {/* View All Projects Button */}
            {dataState === "loaded" &&
              portfolioData &&
              portfolioData.length > 0 && (
                <motion.div
                  className="flex justify-center mt-16"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  <MagneticButton variant="secondary">
                    <Link href="/projects">View All Projects</Link>
                  </MagneticButton>
                </motion.div>
              )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({
  project,
  index,
  className,
}: {
  project: PortfolioType;
  index: number;
  className?: string;
}) => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.div
      key={index}
      className={`group cursor-pointer ${className}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
    >
      <Link
        href={`/projects/${project.slug?.current || project._id}`}
        className="block pb-5"
      >
        <div
          className={`rounded-2xl overflow-hidden relative aspect-video transition-all duration-500 group-hover:scale-[1.02]`}
        >
          <ImageLoader
            src={
              project.image
                ? urlFor(project.image).auto("format").url()
                : "/placeholder.svg"
            }
            alt={project.title as string}
            className="w-full h-full rounded-2xl"
            objectFit="cover"
            width="100%"
            height="100%"
          />
        </div>
      </Link>

      <div className="px-2">
        <Link
          href={`/projects/${project.slug?.current || project._id}`}
          className="block"
        >
          <div className="flex items-end justify-between mb-1">
            <div>
              <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                {project.title}
              </h3>
              <p className="text-muted-foreground text-xs leading-relaxed">
                Development & Design
              </p>
            </div>
            <span className="text-muted-foreground text-xs font-medium">
              {currentYear}
            </span>
          </div>
        </Link>
      </div>

      <div className="flex items-center justify-end mt-5 gap-3">
        <MagneticButton size={"icon"}>
          <Link href={project.projectLink || "#"} target="_blank">
            <Code className="size-4" />
          </Link>
        </MagneticButton>
        <MagneticButton size={"icon"}>
          <Link href={project.githubLink || "#"} target="_blank">
            <Github className="size-4" />
          </Link>
        </MagneticButton>
        <MagneticButton size={"icon"}>
          <Link
            href={`/${project.slug?.current || project._id}`}
            target="_blank"
          >
            <ArrowUpRight className="size-4" />
          </Link>
        </MagneticButton>
      </div>
    </motion.div>
  );
};

export default Projects;
