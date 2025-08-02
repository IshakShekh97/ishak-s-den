"use client";

import React from "react";
import { motion } from "framer-motion";
import TextReveal from "@/components/animated/text-reveal";
import { VelocityScroll } from "@/components/animated/scroll-based-velocity";

const About = () => {
  return (
    <section id="about" className="relative py-32 bg-background">
      {/* Scrolling text between hero and about */}
      <div className="mb-32">
        <VelocityScroll
          defaultVelocity={3}
          numRows={2}
          className="text-6xl md:text-8xl lg:text-9xl font-bold text-muted-foreground/10"
        >
          MENTOR • WEBSITES • DESIGNING • GRAPHICS • ANIMATIONS • COMMUNITY •
          DEVELOPMENT •
        </VelocityScroll>
      </div>

      <div className="container mx-auto px-4">
        {/* About Me Section */}
        <div className="max-w-6xl mx-auto">
          {/* Section Label */}
          <motion.div
            className="flex items-center gap-2 mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <span className="text-primary text-sm font-medium tracking-wider uppercase">
              ABOUT ME
            </span>
          </motion.div>

          {/* Main About Text */}
          <div className="space-y-8">
            <TextReveal
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground"
              delay={0.2}
              duration={0.8}
            >
              I&apos;m Your Name, with over 5+ years of experience in design &
              development
            </TextReveal>

            <TextReveal
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground"
              delay={0.6}
              duration={0.8}
            >
              with strong focus on producing high quality & impactful digital
              experiences. I
            </TextReveal>

            <TextReveal
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground"
              delay={1.0}
              duration={0.8}
            >
              have worked with some of the most innovative industry leaders to
              help build
            </TextReveal>

            <TextReveal
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-muted-foreground/70"
              delay={1.4}
              duration={0.8}
            >
              their top-notch products.
            </TextReveal>
          </div>

          {/* My Work Section */}
          <motion.div
            className="mt-32"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Section Label */}
            <div className="flex items-center gap-2 mb-16">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-primary text-sm font-medium tracking-wider uppercase">
                MY WORK
              </span>
            </div>

            <TextReveal
              className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-foreground mb-6"
              delay={0.2}
              duration={0.8}
            >
              Selected Projects
            </TextReveal>

            <TextReveal
              className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl"
              delay={0.6}
              duration={0.8}
            >
              Here&apos;s a curated selection showcasing my expertise and the
              achieved results.
            </TextReveal>

            {/* Project Placeholders */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-16">
              <motion.div
                className="aspect-[4/3] bg-gradient-to-br from-yellow-200 via-orange-200 to-pink-200 rounded-2xl"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
              <motion.div
                className="aspect-[4/3] bg-gradient-to-br from-purple-200 via-pink-200 to-red-200 rounded-2xl"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
