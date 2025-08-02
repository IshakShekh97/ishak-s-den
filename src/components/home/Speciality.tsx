"use client";
import { motion } from "framer-motion";
import { BugOff } from "lucide-react";

import React from "react";
import TextReveal, { TextRevealChars } from "../animated/text-reveal";

const Speciality = () => {
  return (
    <section id="speciality" className="relative py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="flex items-center gap-2 mb-5 justify-start"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <BugOff className="text-primary size-6" />
            <TextRevealChars
              text="SPECIALITY"
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
              text="Showcasing my core skills in software development, modern web technologies, and problem-solving."
              className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl"
              delay={0.6}
              duration={0.8}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Speciality;
