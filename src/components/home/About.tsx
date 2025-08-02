"use client";

import React from "react";
import { motion } from "framer-motion";
import { UserCheck } from "lucide-react";
import { TextReveal, TextRevealChars } from "../animated/text-reveal";

const About = () => {
  return (
    <section id="about" className="relative py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="flex items-center gap-2 mb-5 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <UserCheck className="text-primary size-6" />
            <TextRevealChars
              text="ABOUT ME"
              className="text-lg font-medium tracking-wider uppercase text-primary"
              delay={0.5}
              duration={0.4}
              staggerDelay={0.05}
            />
          </motion.div>
          {/* Main About Text */}
          <div className="space-y-8 text-center">
            <TextReveal
              text="I'm Ishak Shekh, a primarily frontend developer with an excellent grasp of modern technologies. I have 3 years of experience as a developer and can build full stack web applications. My focus is on delivering high-quality, impactful digital experiences. I've collaborated with innovative creators to help them achieve the sites they deserved."
              className="text-xl md:text-3xl leading-relaxed max-w-full font-semibold"
              textClassName="mb-4"
              delay={0.2}
              duration={0.8}
              staggerDelay={0.2}
            />
          </div>{" "}
        </div>
      </div>
    </section>
  );
};

export default About;
