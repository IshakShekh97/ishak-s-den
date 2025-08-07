"use client";
import { motion } from "framer-motion";
import React from "react";
import { Code } from "lucide-react";
import TextReveal, { TextRevealChars } from "@/components/animated/text-reveal";

const ProjectsPage = () => {
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
              text="A selection of featured projects that highlight my expertise and results."
              className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl"
              delay={0.6}
              duration={0.8}
            />

            {/* {dataState == "loading" && (
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
            )} */}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsPage;
