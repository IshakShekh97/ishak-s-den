"use client";

import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import TextReveal, { TextRevealChars } from "../animated/text-reveal";
import { TechStackScroll } from "../animated/tech-stack-scroll";

const TechStack = () => {
  return (
    <section id="techstack" className="relative py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="mt-20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="text-center mb-12">
              <motion.div
                className="flex items-center gap-2 mb-5 justify-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <Zap className="text-primary size-6" />
                <TextRevealChars
                  text="TECH STACK"
                  className="text-lg font-medium tracking-wider uppercase text-primary"
                  delay={0.3}
                  duration={0.4}
                  staggerDelay={0.05}
                />
              </motion.div>

              <TextReveal
                text="Technologies and tools I work with to build modern, scalable applications"
                className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto"
                delay={0.5}
                duration={0.8}
              />
            </div>

            <div className="relative overflow-hidden rounded-2xl bg-secondary/20 backdrop-blur-sm border border-border/30 p-8">
              <TechStackScroll
                velocity={4}
                numRows={3}
                className="opacity-90 hover:opacity-100 transition-opacity duration-500"
              />

              {/* Gradient overlays for smooth edges */}
              <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
              <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
