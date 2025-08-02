"use client";
import { motion } from "framer-motion";
import {
  BugOff,
  Code2,
  Database,
  Globe,
  Smartphone,
  Zap,
  Brain,
  LucideIcon,
} from "lucide-react";
import TextReveal, { TextRevealChars } from "../animated/text-reveal";
import { cn } from "@/lib/utils";

type ServiceItem = {
  icon: LucideIcon;
  title: string;
  description: string;
  position?: "left" | "right";
  cornerStyle?: string;
};

const leftServices: ServiceItem[] = [
  {
    icon: Code2,
    title: "Frontend Development",
    description:
      "Building responsive and interactive user interfaces with modern frameworks like React, Next.js, and TypeScript.",
    position: "left",
    cornerStyle: "sm:translate-x-4 sm:rounded-br-[2px]",
  },
  {
    icon: Database,
    title: "Backend Development",
    description:
      "Creating robust server-side applications with Node.js, API design, and database management.",
    position: "left",
    cornerStyle: "sm:-translate-x-4 sm:rounded-br-[2px]",
  },
  {
    icon: Globe,
    title: "Full-Stack Solutions",
    description:
      "End-to-end web development combining frontend, backend, and deployment expertise.",
    position: "left",
    cornerStyle: "sm:translate-x-4 sm:rounded-tr-[2px]",
  },
];

const rightServices: ServiceItem[] = [
  {
    icon: Smartphone,
    title: "Mobile Development",
    description:
      "Cross-platform mobile applications using React Native and modern mobile technologies.",
    position: "right",
    cornerStyle: "sm:-translate-x-4 sm:rounded-bl-[2px]",
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    description:
      "Enhancing application speed, SEO optimization, and implementing best practices for scalability.",
    position: "right",
    cornerStyle: "sm:translate-x-4 sm:rounded-bl-[2px]",
  },
  {
    icon: Brain,
    title: "Problem Solving",
    description:
      "Analytical thinking and creative solutions for complex technical challenges and debugging.",
    position: "right",
    cornerStyle: "sm:-translate-x-4 sm:rounded-tl-[2px]",
  },
];

const Speciality = () => {
  return (
    <section id="speciality" className="relative py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="flex items-center gap-2 mb-5 justify-start"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
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
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <TextReveal
              text="Showcasing my core skills in software development, modern web technologies, and problem-solving."
              className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl"
              delay={0.6}
              duration={0.8}
            />
          </motion.div>

          <div className="mt-16">
            <div className="flex flex-col-reverse gap-6 md:grid md:grid-cols-3">
              <div className="flex flex-col gap-6">
                {leftServices.map((service, index) => (
                  <ServiceCard
                    key={`left-service-${index}`}
                    service={service}
                    index={index}
                  />
                ))}
              </div>

              <div className="order-[1] mb-6 self-center sm:order-[0] md:mb-0 flex items-center justify-center">
                <Code2 className="text-primary size-16 mb-4 font-bold" />
              </div>

              <div className="flex flex-col gap-6">
                {rightServices.map((service, index) => (
                  <ServiceCard
                    key={`right-service-${index}`}
                    service={service}
                    index={index + 3}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ServiceCard = ({
  service,
  index,
}: {
  service: ServiceItem;
  index: number;
}) => {
  const Icon = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div
        className={cn(
          "relative rounded-2xl px-4 pt-4 pb-4 text-sm h-full",
          "bg-secondary/50 ring-border ring hover:bg-secondary/70 transition-colors duration-300",
          service.cornerStyle
        )}
      >
        <div className="text-primary mb-3 text-[2rem]">
          <Icon />
        </div>
        <h3 className="text-foreground mb-2.5 text-xl font-semibold">
          {service.title}
        </h3>
        <p className="text-muted-foreground text-base text-pretty leading-relaxed">
          {service.description}
        </p>
        <span className="from-primary/0 via-primary to-primary/0 absolute -bottom-px left-1/2 h-px w-1/2 -translate-x-1/2 bg-gradient-to-r opacity-60"></span>
        <span className="absolute inset-0 bg-[radial-gradient(30%_5%_at_50%_100%,hsl(var(--primary)/0.15)_0%,transparent_100%)] opacity-60"></span>
      </div>
    </motion.div>
  );
};

export default Speciality;
