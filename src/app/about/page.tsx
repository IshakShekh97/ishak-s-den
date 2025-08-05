"use client";

import React from "react";
import { motion } from "framer-motion";
import { User, Code, Heart, Coffee, Sparkles, Zap } from "lucide-react";
import { TextReveal, TextRevealChars } from "@/components/animated/text-reveal";
import { TextGenerateEffect } from "@/components/animated/text-generate-effect";
import { VelocityScroll } from "@/components/animated/scroll-based-velocity";
import { ScrollProgress } from "@/components/scroll-progress";
import { Footer } from "@/components/Footer";
import { NavBar } from "@/components/home/Navbar";
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
  SiExpress,
  SiRedux,
  SiSupabase,
} from "react-icons/si";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
      duration: 0.8,
      ease: "easeOut" as const,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.95,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 1.2,
      ease: "easeOut" as const,
    },
  },
};

const technologies = [
  { icon: SiReact, name: "React" },
  { icon: SiNextdotjs, name: "Next.js" },
  { icon: SiTypescript, name: "TypeScript" },
  { icon: SiJavascript, name: "JavaScript" },
  { icon: SiTailwindcss, name: "Tailwind CSS" },
  { icon: SiFramer, name: "Framer Motion" },
  { icon: SiNodedotjs, name: "Node.js" },
  { icon: SiExpress, name: "Express.js" },
  { icon: SiMongodb, name: "MongoDB" },
  { icon: SiPostgresql, name: "PostgreSQL" },
  { icon: SiPrisma, name: "Prisma" },
  { icon: SiSupabase, name: "Supabase" },
  { icon: SiSanity, name: "Sanity CMS" },
  { icon: SiRedux, name: "Redux" },
  { icon: SiGit, name: "Git" },
  { icon: SiGithub, name: "GitHub" },
  { icon: SiDocker, name: "Docker" },
  { icon: SiVercel, name: "Vercel" },
  { icon: SiNetlify, name: "Netlify" },
];

const TechIcon = ({
  tech,
}: {
  tech: { icon: React.ComponentType<{ className?: string }>; name: string };
}) => {
  const Icon = tech.icon;
  return (
    <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-secondary/30 border border-border/50 hover:bg-secondary/50 transition-colors duration-300 backdrop-blur-sm mx-2">
      <Icon className="w-6 h-6 text-primary" />
      <span className="text-sm font-medium text-foreground whitespace-nowrap">
        {tech.name}
      </span>
    </div>
  );
};

const page = () => {
  return (
    <>
      <ScrollProgress className="h-[2px] !rounded-full" />
      <NavBar />

      <div className="relative min-h-screen w-full overflow-hidden bg-background">
        <main className="relative z-10">
          {/* Hero Section */}
          <section className="relative min-h-screen flex items-center justify-center px-4 py-24 bg-background overflow-hidden">
            <motion.div
              className="w-full max-w-6xl mx-auto flex flex-col items-center gap-12 z-10 relative"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div className="relative mb-6" variants={itemVariants}>
                <motion.div
                  className="w-24 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 96, opacity: 1 }}
                  transition={{ duration: 2, delay: 0.8, ease: "easeOut" }}
                />
              </motion.div>

              <motion.div
                className="flex items-center gap-2 mb-5 justify-center"
                variants={itemVariants}
              >
                <User className="text-primary size-6" />
                <TextRevealChars
                  text="ABOUT ME"
                  className="text-lg font-medium tracking-wider uppercase text-primary"
                  delay={0.5}
                  duration={0.4}
                  staggerDelay={0.05}
                />
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="text-center space-y-8"
              >
                <TextGenerateEffect
                  words="Creative Developer & Full-Stack Enthusiast"
                  className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight"
                  duration={2}
                  filter={false}
                />
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="max-w-4xl text-center space-y-6"
              >
                <TextReveal
                  text="I'm a passionate full-stack developer who primarily focuses on Next.js and modern web technologies. I love crafting beautiful, functional, and user-centric digital experiences that make a difference."
                  className="text-xl md:text-2xl leading-relaxed font-medium"
                  textClassName="mb-4"
                  delay={0.8}
                  duration={1}
                  staggerDelay={0.15}
                />
              </motion.div>
            </motion.div>
          </section>

          {/* My Journey Section */}
          <section className="relative py-20 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-7xl mx-auto">
                <motion.div
                  className="text-center mb-16"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="flex items-center gap-2 mb-5 justify-center">
                    <Sparkles className="text-primary size-6" />
                    <TextRevealChars
                      text="MY JOURNEY"
                      className="text-lg font-medium tracking-wider uppercase text-primary"
                      delay={0.3}
                      duration={0.4}
                      staggerDelay={0.05}
                    />
                  </div>

                  <TextReveal
                    text="Every great developer starts with curiosity and a willingness to learn"
                    className="text-2xl md:text-3xl font-semibold text-muted-foreground"
                    delay={0.5}
                    duration={0.8}
                  />
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                  <motion.div
                    className="p-8 rounded-2xl bg-secondary/20 backdrop-blur-sm border border-border/30 text-center"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                  >
                    <Code className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-3">
                      Learning & Growing
                    </h3>
                    <p className="text-muted-foreground">
                      I&apos;m constantly exploring new technologies and best
                      practices. Every project is an opportunity to learn
                      something new and push my boundaries.
                    </p>
                  </motion.div>

                  <motion.div
                    className="p-8 rounded-2xl bg-secondary/20 backdrop-blur-sm border border-border/30 text-center"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-3">
                      Passion-Driven
                    </h3>
                    <p className="text-muted-foreground">
                      I believe in building with purpose. Every line of code I
                      write is driven by passion and a desire to create
                      meaningful digital experiences.
                    </p>
                  </motion.div>

                  <motion.div
                    className="p-8 rounded-2xl bg-secondary/20 backdrop-blur-sm border border-border/30 text-center"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  >
                    <Coffee className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-3">
                      Always Creating
                    </h3>
                    <p className="text-muted-foreground">
                      When I&apos;m not coding, I&apos;m probably thinking about
                      coding. I love turning ideas into reality and solving
                      complex problems with elegant solutions.
                    </p>
                  </motion.div>
                </div>
              </div>
            </div>
          </section>

          {/* Technologies Section */}
          <section className="relative py-20 bg-secondary/10">
            <div className="container mx-auto px-4">
              <div className="max-w-7xl mx-auto">
                <motion.div
                  className="text-center mb-16"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="flex items-center gap-2 mb-5 justify-center">
                    <Zap className="text-primary size-6" />
                    <TextRevealChars
                      text="TECHNOLOGIES I LOVE"
                      className="text-lg font-medium tracking-wider uppercase text-primary"
                      delay={0.3}
                      duration={0.4}
                      staggerDelay={0.05}
                    />
                  </div>

                  <TextReveal
                    text="Here are the tools and technologies I use to bring ideas to life"
                    className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto"
                    delay={0.5}
                    duration={0.8}
                  />
                </motion.div>

                <motion.div
                  className="relative overflow-hidden rounded-2xl bg-secondary/20 backdrop-blur-sm border border-border/30 p-8"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <div className="space-y-6">
                    <VelocityScroll
                      defaultVelocity={3}
                      numRows={1}
                      className="text-base font-normal tracking-normal opacity-90 hover:opacity-100 transition-opacity duration-500"
                    >
                      {technologies.slice(0, 7).map((tech, index) => (
                        <TechIcon key={index} tech={tech} />
                      ))}
                    </VelocityScroll>

                    <VelocityScroll
                      defaultVelocity={-2.5}
                      numRows={1}
                      className="text-base font-normal tracking-normal opacity-90 hover:opacity-100 transition-opacity duration-500"
                    >
                      {technologies.slice(7, 14).map((tech, index) => (
                        <TechIcon key={index} tech={tech} />
                      ))}
                    </VelocityScroll>

                    <VelocityScroll
                      defaultVelocity={4}
                      numRows={1}
                      className="text-base font-normal tracking-normal opacity-90 hover:opacity-100 transition-opacity duration-500"
                    >
                      {technologies.slice(14).map((tech, index) => (
                        <TechIcon key={index} tech={tech} />
                      ))}
                    </VelocityScroll>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Personal Philosophy */}
          <section className="relative py-20 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <TextReveal
                    text="I believe that great software is not just about clean code, but about creating experiences that genuinely improve people's lives. Every project is an opportunity to learn, grow, and make a positive impact."
                    className="text-2xl md:text-3xl leading-relaxed font-medium italic text-foreground/90"
                    delay={0.3}
                    duration={1.2}
                    staggerDelay={0.08}
                  />
                </motion.div>

                <motion.div
                  className="mt-12 p-8 rounded-2xl bg-primary/5 border border-primary/20"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  <p className="text-lg text-muted-foreground">
                    &ldquo;The best way to predict the future is to create
                    it.&rdquo; - Peter Drucker
                  </p>
                  <p className="text-sm text-primary mt-2 font-medium">
                    This quote drives my passion for building tomorrow&apos;s
                    web today.
                  </p>
                </motion.div>
              </div>
            </div>
          </section>

          <Footer />
        </main>
      </div>
    </>
  );
};

export default page;
