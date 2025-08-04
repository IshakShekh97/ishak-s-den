"use client";
import { urlFor } from "@/sanity/lib/image";
import { Portfolio as PortfolioType } from "@/sanity/types";
import { motion } from "framer-motion";
import { ImageLoader } from "./image-loader";
import Link from "next/link";
import MagneticButton from "./animated/magnetic-button";
import { ArrowUpRight, Code } from "lucide-react";
import { BsGithub } from "react-icons/bs";

export const ProjectCard = ({
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
            <BsGithub className="size-4" />
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
