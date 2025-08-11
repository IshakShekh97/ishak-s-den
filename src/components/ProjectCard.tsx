"use client";
import { motion } from "framer-motion";
import { ImageLoader } from "./image-loader";
import Link from "next/link";
import MagneticButton from "./animated/magnetic-button";
import { ArrowUpRight, Code } from "lucide-react";
import { BsGithub } from "react-icons/bs";
import { Badge } from "./ui/badge";

interface PortfolioType {
  title: string;
  coverImage: string;
  githubLink: string | null;
  liveLink: string | null;
  isFeatures: boolean;
  role: string;
  year: number;
  className?: string;
  id: string;
  index: number;
}

export const ProjectCard = ({
  index,
  coverImage,
  githubLink,
  isFeatures,
  liveLink,
  role,
  title,
  year,
  className,
  id,
}: PortfolioType) => {
  return (
    <motion.div
      key={id}
      className={`group cursor-pointer ${className}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
    >
      <Link href={`/projects/${id}`} className="block pb-5">
        <div
          className={`rounded-2xl overflow-hidden relative aspect-video transition-all duration-500 group-hover:scale-[1.02]`}
        >
          <ImageLoader
            src={coverImage ? coverImage : "/placeholder.svg"}
            alt={title}
            className="w-full h-full rounded-2xl"
            objectFit="cover"
            width="100%"
            height="100%"
          />
        </div>
      </Link>

      <div className="px-2">
        <Link href={`/projects/${id}`} className="block">
          <div className="flex items-end justify-between mb-1">
            <div>
              <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                {title}
              </h3>
              <p className="text-muted-foreground text-xs leading-relaxed">
                {role}
              </p>
            </div>
            <span className="text-muted-foreground text-xs font-medium">
              {year}
            </span>
          </div>
        </Link>
      </div>

      <div className="flex items-center justify-between mt-5">
        <div className="">
          {isFeatures && (
            <Badge
              variant={"outline"}
              className="bg-muted text-muted-foreground text-xs font-medium py-1 px-2 rounded-md"
            >
              Featured
            </Badge>
          )}
        </div>
        <div className="flex items-center justify-center gap-3">
          <MagneticButton size={"icon"}>
            <Link href={liveLink || "#"} target="_blank">
              <Code className="size-4" />
            </Link>
          </MagneticButton>
          <MagneticButton size={"icon"}>
            <Link href={githubLink || "#"} target="_blank">
              <BsGithub className="size-4" />
            </Link>
          </MagneticButton>
          <MagneticButton size={"icon"}>
            <Link href={`/projects/${id}`} target="_blank">
              <ArrowUpRight className="size-4" />
            </Link>
          </MagneticButton>
        </div>
      </div>
    </motion.div>
  );
};
