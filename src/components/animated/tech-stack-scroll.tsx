"use client";

import React from "react";
import { VelocityScroll } from "./scroll-based-velocity";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiNodedotjs,
  SiTailwindcss,
  SiMongodb,
  SiPostgresql,
  SiGit,
  SiGithub,
  SiVercel,
  SiFramer,
  SiSanity,
  SiPrisma,
  SiDocker,
  SiNetlify,
} from "react-icons/si";
import { cn } from "@/lib/utils";

interface TechItem {
  icon: React.ComponentType<{ className?: string }>;
  name: string;
  category: "frontend" | "backend" | "database" | "tools" | "cloud";
}

const techStack: TechItem[] = [
  { icon: SiReact, name: "React", category: "frontend" },
  { icon: SiNextdotjs, name: "Next.js", category: "frontend" },
  { icon: SiTypescript, name: "TypeScript", category: "frontend" },
  { icon: SiJavascript, name: "JavaScript", category: "frontend" },
  { icon: SiTailwindcss, name: "Tailwind CSS", category: "frontend" },
  { icon: SiFramer, name: "Framer Motion", category: "frontend" },
  { icon: SiNodedotjs, name: "Node.js", category: "backend" },
  { icon: SiMongodb, name: "MongoDB", category: "database" },
  { icon: SiPostgresql, name: "PostgreSQL", category: "database" },
  { icon: SiPrisma, name: "Prisma", category: "database" },
  { icon: SiSanity, name: "Sanity", category: "tools" },
  { icon: SiGit, name: "Git", category: "tools" },
  { icon: SiGithub, name: "GitHub", category: "tools" },
  { icon: SiDocker, name: "Docker", category: "tools" },
  { icon: SiVercel, name: "Vercel", category: "cloud" },
  { icon: SiNetlify, name: "Netlify", category: "cloud" },
];

interface TechStackScrollProps {
  className?: string;
  velocity?: number;
  numRows?: number;
}

const TechIcon = ({
  tech,
  className,
}: {
  tech: TechItem;
  className?: string;
}) => {
  const Icon = tech.icon;
  return (
    <div
      className={cn(
        "inline-flex items-center gap-3 px-6 py-3 rounded-full",
        "bg-secondary/30 border border-border/50",
        "hover:bg-secondary/50 transition-colors duration-300",
        "backdrop-blur-sm",
        className
      )}
    >
      <Icon className="w-6 h-6 text-primary" />
      <span className="text-sm font-medium text-foreground whitespace-nowrap">
        {tech.name}
      </span>
    </div>
  );
};

export function TechStackScroll({
  className,
  velocity = 3,
  numRows = 3,
}: TechStackScrollProps) {
  // Split tech stack into rows
  const itemsPerRow = Math.ceil(techStack.length / numRows);
  const rows = Array.from({ length: numRows }, (_, i) =>
    techStack.slice(i * itemsPerRow, (i + 1) * itemsPerRow)
  );

  return (
    <div className={cn("w-full py-8", className)}>
      {rows.map((rowTechs, rowIndex) => (
        <div key={rowIndex} className="mb-4 last:mb-0">
          <VelocityScroll
            defaultVelocity={velocity * (rowIndex % 2 === 0 ? 1 : -1)}
            numRows={1}
            className="text-base font-normal tracking-normal"
          >
            {rowTechs.map((tech, techIndex) => (
              <TechIcon
                key={`${rowIndex}-${techIndex}`}
                tech={tech}
                className="mr-4"
              />
            ))}
          </VelocityScroll>
        </div>
      ))}
    </div>
  );
}

// Alternative version with category-based rows
export function TechStackScrollByCategory({
  className,
  velocity = 4,
}: Omit<TechStackScrollProps, "numRows">) {
  const categories = {
    frontend: techStack.filter((tech) => tech.category === "frontend"),
    backend: techStack.filter(
      (tech) => tech.category === "backend" || tech.category === "database"
    ),
    tools: techStack.filter(
      (tech) => tech.category === "tools" || tech.category === "cloud"
    ),
  };

  return (
    <div className={cn("w-full py-8 space-y-6", className)}>
      {Object.entries(categories).map(([category, techs], index) => (
        <div key={category}>
          <VelocityScroll
            defaultVelocity={velocity * (index % 2 === 0 ? 1 : -1)}
            numRows={1}
            className="text-base font-normal tracking-normal"
          >
            {techs.map((tech, techIndex) => (
              <TechIcon
                key={`${category}-${techIndex}`}
                tech={tech}
                className="mr-4"
              />
            ))}
          </VelocityScroll>
        </div>
      ))}
    </div>
  );
}
