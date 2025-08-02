"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  duration?: number;
}

export default function TextReveal({
  children,
  className = "",
  delay = 0,
  duration = 0.8,
}: TextRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const words = children.split(" ");

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="inline-block mr-2"
          initial={{ y: "100%" }}
          animate={isInView ? { y: "0%" } : { y: "100%" }}
          transition={{
            duration: duration,
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: delay + index * 0.1,
          }}
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
}
