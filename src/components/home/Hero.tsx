"use client";
import { motion } from "framer-motion";
import { TextGenerateEffect } from "@/components/animated/text-generate-effect";
import MagneticButton from "@/components/animated/magnetic-button";
import ImageCursorTrail from "@/components/animated/image-cursortrail";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { FlipText } from "../animated/TextFlip";
import { Sparkle } from "lucide-react";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

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

export default function Hero() {
  const portfolioImages = [
    "/portfolio-image-1.jpeg",
    "/portfolio-image-2.jpeg",
    "/portfolio-image-4.jpeg",
    "/portfolio-image-5.jpeg",
    "/portfolio-image-6.jpeg",
    "/portfolio-image-7.jpeg",
    "/portfolio-image-8.jpeg",
  ];

  return (
    <ImageCursorTrail
      items={portfolioImages}
      className="min-h-[88vh] relative z-40 overflow-hidden"
      fadeAnimation={true}
      maxNumberOfImages={4}
      distance={15}
      disableOnContentHover={true}
      contentSelector=".main-content, button, a, [role='button'], .text-generate-effect, .flip-text"
      imgClass="w-24 sm:w-32 md:w-40 lg:w-48 xl:w-[300px] aspect-[16/9] rounded-lg object-cover  shadow-md"
    >
      <section
        id="home"
        className="relative flex items-center justify-center px-4 py-10 z-50"
      >
        <motion.div
          className="w-full max-w-4xl mx-auto flex flex-col items-center gap-8 text-center main-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Logo/Brand */}
          <MagneticButton className="relative" variant={"primary"}>
            <div className="flex items-center gap-2 text-white">
              <Sparkle className="animate-pulse text-white" />
              <span
                className={cn(
                  "text-sm font-medium tracking-wider",
                  inter.className
                )}
              >
                ISHAK SHEKH
              </span>
            </div>
          </MagneticButton>

          {/* Main Heading */}
          <motion.div className="relative z-50" variants={itemVariants}>
            <motion.div
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight"
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 1.5,
                delay: 0.5,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <div className="text-white">
                <TextGenerateEffect
                  words="Build Faster"
                  className="font-bold"
                  duration={1.2}
                />
              </div>
              <div className="mt-2">
                <FlipText className="text-primary">Ship Sooner</FlipText>
              </div>
            </motion.div>
          </motion.div>

          {/* Subtitle */}
          <motion.div className="max-w-2xl text-center" variants={itemVariants}>
            <motion.p
              className={cn(
                "text-lg md:text-xl text-gray-400 leading-relaxed font-light",
                inter.className
              )}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 1.2 }}
            >
              Accelerate your development with modern, innovative, and
              customizable solutions that bring your ideas to life.
            </motion.p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.8 }}
          >
            <MagneticButton variant="primary" strength={0.7}>
              <Link href={"/contact"}>Get Started →</Link>
            </MagneticButton>

            <MagneticButton variant="secondary" strength={0.4}>
              <Link href={"#projects"}>View Projects</Link>
            </MagneticButton>
          </motion.div>
        </motion.div>
      </section>
    </ImageCursorTrail>
  );
}
