"use client";

import React from "react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiNodedotjs,
  SiTailwindcss,
  SiGit,
  SiGithub,
  SiVercel,
  SiFramer,
  SiSanity,
  SiPrisma,
  SiDocker,
  SiNetlify,
  SiMongodb,
  SiPostgresql,
} from "react-icons/si";
import { FaCode, FaBug, FaTerminal, FaCodeBranch } from "react-icons/fa";
import { HiCursorClick, HiLightningBolt } from "react-icons/hi";
import { BsCodeSlash, BsGear } from "react-icons/bs";
import { MdDeveloperMode, MdBuild } from "react-icons/md";

interface CodeElement {
  id: number;
  type: "icon" | "text" | "symbol";
  content: React.ComponentType<{ className?: string }> | string;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

const codeIcons = [
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiNodedotjs,
  SiTailwindcss,
  SiGit,
  SiGithub,
  SiVercel,
  SiFramer,
  SiSanity,
  SiPrisma,
  SiDocker,
  SiNetlify,
  SiMongodb,
  SiPostgresql,
  FaCode,
  FaBug,
  FaTerminal,
  FaCodeBranch,
  HiCursorClick,
  HiLightningBolt,
  BsCodeSlash,
  BsGear,
  MdDeveloperMode,
  MdBuild,
];

const codeTexts = [
  "function()",
  "const",
  "useState",
  "useEffect",
  "async/await",
  "return",
  "export",
  "import",
  "interface",
  "type",
  "class",
  "extends",
  "props",
  "state",
  "render()",
  "component",
  "hook",
  "API",
  "JSON",
  "HTTP",
  "CSS",
  "HTML",
  "JSX",
  "TSX",
  "npm",
  "yarn",
  "git",
  "commit",
  "push",
  "pull",
  "merge",
  "branch",
  "deploy",
  "build",
  "dev",
  "prod",
  "localhost",
  "server",
  "client",
  "database",
];

const codeSymbols = [
  "{}",
  "[]",
  "()",
  "<>",
  "=>",
  "&&",
  "||",
  "===",
  "!==",
  "++",
  "--",
  "+=",
  "-=",
  "*=",
  "/=",
  "...",
  "?:",
  "??",
  "?.",
  "!",
  "&",
  "|",
  "^",
  "~",
  "<<",
  ">>",
  "%",
  "@",
  "#",
  "$",
  "/**/",
  "//",
  ";",
  ":",
  ",",
  ".",
  "?",
  "*",
  "+",
  "-",
  "=",
  "<",
  ">",
  "/",
  "\\",
  "|",
  "_",
  "`",
  "~",
  "^",
];

interface CodeBgProps {
  intensity?: "low" | "medium" | "high";
  className?: string;
}

/**
 * CodeBg component creates an animated background with floating code-related
 * icons, text, and symbols that don't interfere with the main content.
 *
 * @param intensity - Controls the density and visibility of elements
 * @param className - Additional CSS classes to apply to the container
 */
export default function CodeBg({
  intensity = "medium",
  className = "",
}: CodeBgProps) {
  const [elements, setElements] = useState<CodeElement[]>([]);

  useEffect(() => {
    const generateElements = () => {
      const newElements: CodeElement[] = [];

      // Adjust counts based on intensity
      const iconCount =
        intensity === "low" ? 8 : intensity === "medium" ? 12 : 16;
      const textCount =
        intensity === "low" ? 12 : intensity === "medium" ? 16 : 24;
      const symbolCount =
        intensity === "low" ? 15 : intensity === "medium" ? 17 : 22;

      // Adjust base opacity based on intensity
      const baseOpacity =
        intensity === "low" ? 0.02 : intensity === "medium" ? 0.03 : 0.04;
      const opacityRange =
        intensity === "low" ? 0.08 : intensity === "medium" ? 0.12 : 0.16;

      // Generate icons
      for (let i = 0; i < iconCount; i++) {
        newElements.push({
          id: i,
          type: "icon",
          content: codeIcons[Math.floor(Math.random() * codeIcons.length)],
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 16 + 12,
          duration: Math.random() * 25 + 40,
          delay: Math.random() * 10,
          opacity: Math.random() * opacityRange + baseOpacity,
        });
      }

      // Generate text elements
      for (let i = iconCount; i < iconCount + textCount; i++) {
        newElements.push({
          id: i,
          type: "text",
          content: codeTexts[Math.floor(Math.random() * codeTexts.length)],
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 6 + 9,
          duration: Math.random() * 30 + 45,
          delay: Math.random() * 15,
          opacity: Math.random() * (opacityRange * 0.8) + baseOpacity * 0.8,
        });
      }

      // Generate symbols
      for (
        let i = iconCount + textCount;
        i < iconCount + textCount + symbolCount;
        i++
      ) {
        newElements.push({
          id: i,
          type: "symbol",
          content: codeSymbols[Math.floor(Math.random() * codeSymbols.length)],
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 5 + 7,
          duration: Math.random() * 35 + 50,
          delay: Math.random() * 20,
          opacity: Math.random() * (opacityRange * 0.6) + baseOpacity * 0.6,
        });
      }

      setElements(newElements);
    };

    generateElements();

    // Regenerate elements every 2 minutes to keep it fresh
    const interval = setInterval(generateElements, 120000);
    return () => clearInterval(interval);
  }, [intensity]);

  return (
    <div
      className={`fixed inset-0 pointer-events-none overflow-hidden z-0 ${className}`}
    >
      {/* Gradient overlay to ensure readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-background/95" />

      {elements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute select-none"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            fontSize:
              element.type === "icon"
                ? `${element.size}px`
                : `${element.size}px`,
            opacity: element.opacity,
          }}
          initial={{
            opacity: 0,
            scale: 0.5,
            rotate: Math.random() * 360,
          }}
          animate={{
            opacity: element.opacity,
            scale: 1,
            rotate: [
              Math.random() * 360,
              Math.random() * 360 + 180,
              Math.random() * 360 + 360,
            ],
            x: [0, Math.random() * 100 - 50, Math.random() * 80 - 40, 0],
            y: [0, Math.random() * 100 - 50, Math.random() * 80 - 40, 0],
          }}
          transition={{
            duration: element.duration,
            delay: element.delay,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
          }}
        >
          {element.type === "icon" ? (
            React.createElement(
              element.content as React.ComponentType<{ className?: string }>,
              {
                className: "text-foreground/20 dark:text-foreground/10",
              }
            )
          ) : (
            <span className="font-mono text-foreground/15 dark:text-foreground/8 font-medium">
              {element.content as string}
            </span>
          )}
        </motion.div>
      ))}

      {/* Additional floating particles for extra ambiance */}
      {Array.from({ length: 12 }, (_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-0.5 h-0.5 bg-primary/8 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, Math.random() * 150 - 75, 0],
            y: [0, Math.random() * 150 - 75, 0],
            opacity: [0.05, 0.2, 0.05],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: Math.random() * 20 + 30,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
            delay: Math.random() * 15,
          }}
        />
      ))}

      {/* Code-like grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.01]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Subtle radial gradient for depth */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.1) 100%)",
        }}
      />
    </div>
  );
}
