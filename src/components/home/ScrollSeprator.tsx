"use client";
import { VelocityScroll } from "@/components/animated/scroll-based-velocity";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Montserrat } from "next/font/google";
import { motion } from "framer-motion";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "400", "500", "600", "700", "800", "900"],
});

export const SeparationSection = () => {
  const TEXT_VARIANTS = [
    "CODE WIZARD",
    "PIXEL PERFECTIONIST",
    "UI/UX ENTHUSIAST",
    "REACT ALCHEMIST",
    "API ARCHITECT",
  ];

  const TEXT_VARIANTS_2 = [
    "FRONTEND INNOVATOR",
    "BUG SLAYER",
    "PERFORMANCE GURU",
    "ACCESSIBILITY ADVOCATE",
    "DEPLOYMENT NINJA",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 1 }}
      className={cn("relative", montserrat.className)}
    >
      <Separator className="mb-5" />
      <div className="py-2 space-y-3">
        <VelocityScroll
          defaultVelocity={1}
          numRows={1}
          className="text-2xl md:text-4xl lg:text-6xl font-bold text-muted-foreground"
        >
          {TEXT_VARIANTS.map((text, index) => (
            <span key={index} className="inline-block mr-4">
              {text}
              <span className="text-primary"> ✧ </span>
            </span>
          ))}
        </VelocityScroll>
        <VelocityScroll
          defaultVelocity={-1}
          numRows={1}
          className="text-2xl md:text-4xl lg:text-6xl font-bold text-muted-foreground"
        >
          {TEXT_VARIANTS_2.map((text, index) => (
            <span key={index} className="inline-block mr-4">
              {text}
              <span className="text-primary"> ✧ </span>
            </span>
          ))}
        </VelocityScroll>
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
      <Separator className="mt-5" />
    </motion.div>
  );
};
