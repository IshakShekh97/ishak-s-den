"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  text: string | string[];
  className?: string;
  textClassName?: string;
  delay?: number;
  duration?: number;
  staggerDelay?: number;
  once?: boolean;
}

const TextReveal = ({
  text,
  className,
  textClassName,
  delay = 0,
  duration = 0.8,
  staggerDelay = 0.1,
  once = false,
}: TextRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once,
    margin: "-10% 0px -10% 0px",
  });

  // Convert text to array if it's a string
  const textArray = Array.isArray(text) ? text : [text];

  // Animation variants for each line
  const lineVariants: Variants = {
    hidden: {
      color: "hsl(var(--muted-foreground))",
      opacity: 0.3,
    },
    visible: {
      color: "hsl(var(--foreground))",
      opacity: 1,
      transition: {
        duration,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  // Container variants for staggered animation
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: delay,
        staggerChildren: staggerDelay,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={cn("overflow-hidden", className)}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {textArray.map((line, index) => (
        <motion.div
          key={index}
          variants={lineVariants}
          className={cn("transition-colors duration-300", textClassName)}
        >
          {line}
        </motion.div>
      ))}
    </motion.div>
  );
};

// Alternative component for word-by-word animation
interface TextRevealWordsProps {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  duration?: number;
  staggerDelay?: number;
  once?: boolean;
}

const TextRevealWords = ({
  text,
  className,
  wordClassName,
  delay = 0,
  duration = 0.6,
  staggerDelay = 0.05,
  once = false,
}: TextRevealWordsProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once,
    margin: "-10% 0px -10% 0px",
  });

  const words = text.split(" ");

  const wordVariants: Variants = {
    hidden: {
      color: "hsl(var(--muted-foreground))",
      opacity: 0.3,
      y: 10,
    },
    visible: {
      color: "hsl(var(--foreground))",
      opacity: 1,
      y: 0,
      transition: {
        duration,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: delay,
        staggerChildren: staggerDelay,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={cn("overflow-hidden", className)}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={wordVariants}
          className={cn(
            "inline-block transition-colors duration-300",
            wordClassName
          )}
        >
          {word}
          {index < words.length - 1 && " "}
        </motion.span>
      ))}
    </motion.div>
  );
};

// Character-by-character animation variant
interface TextRevealCharsProps {
  text: string;
  className?: string;
  charClassName?: string;
  delay?: number;
  duration?: number;
  staggerDelay?: number;
  once?: boolean;
}

const TextRevealChars = ({
  text,
  className,
  charClassName,
  delay = 0,
  duration = 0.4,
  staggerDelay = 0.02,
  once = false,
}: TextRevealCharsProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once,
    margin: "-10% 0px -10% 0px",
  });

  const characters = text.split("");

  const charVariants: Variants = {
    hidden: {
      color: "hsl(var(--muted-foreground))",
      opacity: 0.3,
      scale: 0.8,
    },
    visible: {
      color: "hsl(var(--foreground))",
      opacity: 1,
      scale: 1,
      transition: {
        duration,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: delay,
        staggerChildren: staggerDelay,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={cn("overflow-hidden", className)}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {characters.map((char, index) => (
        <motion.span
          key={index}
          variants={charVariants}
          className={cn(
            "inline-block transition-colors duration-300",
            charClassName
          )}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.div>
  );
};

export { TextReveal, TextRevealWords, TextRevealChars };
export default TextReveal;
