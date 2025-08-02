"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  AnimatePresence,
} from "framer-motion";
import { TextGenerateEffect } from "@/components/animated/text-generate-effect";
import FloatingOrbs from "@/components/animated/floating-orbs";
import MagneticButton from "@/components/animated/magnetic-button";
import ParticleSystem from "@/components/animated/particle-system";
import GradientBackground from "@/components/animated/gradient-background";
import { Pacifico } from "next/font/google";
import { cn } from "@/lib/utils";
import Link from "next/link";

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
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
  const ref = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7], [1, 0.8, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.4], [1, 0.92]);
  const rotateXMouse = useTransform(mouseY, [-500, 500], [3, -3]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Enhanced mouse movement for ultra-smooth parallax
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (rect) {
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      mouseX.set((e.clientX - centerX) * 0.5);
      mouseY.set((e.clientY - centerY) * 0.5);
    }
  };

  return (
    <section
      id="home"
      ref={ref}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center px-4 py-24 bg-background overflow-hidden"
      style={{ perspective: "1000px" }}
    >
      {/* Award-winning animated gradient background */}
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        <GradientBackground />
      </motion.div>

      {/* Enhanced floating orbs with award-winning physics */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
      >
        <FloatingOrbs count={8} className="z-[1]" />
      </motion.div>

      {/* Particle system for premium ambient effects */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 3, delay: 0.8 }}
      >
        <ParticleSystem count={25} className="z-[1]" />
      </motion.div>

      <motion.div className="absolute inset-0 pointer-events-none z-[1]">
        <AnimatePresence>
          {isLoaded &&
            [...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${15 + i * 12}%`,
                  top: `${25 + (i % 3) * 25}%`,
                }}
                initial={{ opacity: 0, scale: 0, rotate: 0 }}
                animate={{
                  opacity: [0.2, 0.6, 0.2],
                  scale: [1, 1.3, 1],
                  rotate: [0, 180, 360],
                  y: [-30, 30, -30],
                  x: [0, Math.sin(i) * 20, 0],
                }}
                transition={{
                  duration: 4 + i * 0.8,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: i * 0.4,
                  ease: "easeInOut",
                }}
              >
                <div
                  className={`
                w-3 h-3 rounded-full bg-gradient-to-br
                ${
                  i % 4 === 0
                    ? "from-primary/40 to-primary/20"
                    : i % 4 === 1
                      ? "from-accent/40 to-accent/20"
                      : i % 4 === 2
                        ? "from-secondary/40 to-secondary/20"
                        : "from-muted/40 to-muted/20"
                }
                shadow-lg
              `}
                />
              </motion.div>
            ))}
        </AnimatePresence>
      </motion.div>

      <motion.div
        className="w-full max-w-5xl mx-auto flex flex-col items-center gap-8 z-10 relative"
        style={{
          y,
          opacity,
          scale,
          rotateX: rotateXMouse,
          rotateY: useTransform(mouseX, [-500, 500], [-1, 1]),
        }}
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
          <motion.div
            className="absolute inset-0 w-24 h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent blur-sm"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 96, opacity: 1 }}
            transition={{ duration: 2, delay: 1, ease: "easeOut" }}
          />
        </motion.div>

        <motion.div className="relative" variants={itemVariants}>
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 1.5,
              delay: 0.5,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <TextGenerateEffect
              words="Hi, I'm Ishak Shekh"
              className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-center bg-gradient-to-br from-foreground via-foreground/95 to-foreground/80 bg-clip-text text-transparent"
              duration={1.2}
            />
          </motion.div>
        </motion.div>

        <motion.div
          className="max-w-3xl text-center space-y-6"
          variants={itemVariants}
        >
          <motion.p
            className={cn(
              "text-lg md:text-xl lg:text-2xl text-muted-foreground/90 leading-relaxed font-light",
              pacifico.className
            )}
            style={{
              x: useTransform(mouseX, [-200, 200], [-3, 3]),
              y: useTransform(mouseY, [-200, 200], [-2, 2]),
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.2 }}
          >
            I love transforming ideas into interactive, delightful
            products—blending design, code, and innovation to craft seamless
            digital journeys that captivate and inspire.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center mt-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.8 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <MagneticButton variant="primary" strength={0.4}>
                <Link href={"#portfolio"} className={`relative z-10 `}>
                  View My Work
                </Link>
              </MagneticButton>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <MagneticButton variant="secondary" strength={0.4}>
                <Link href={"#contact"} className={`relative z-10`}>
                  Get In Touch
                </Link>
              </MagneticButton>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        variants={itemVariants}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2.2 }}
      >
        <motion.span
          className="text-xs text-muted-foreground/70 font-medium tracking-[0.2em] uppercase"
          animate={{
            opacity: [0.4, 1, 0.4],
            y: [0, -2, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          Scroll to Explore
        </motion.span>
        <div className="relative">
          <motion.div
            className="w-[2px] h-10 bg-gradient-to-b from-transparent via-primary to-transparent"
            animate={{
              scaleY: [1, 1.3, 1],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="w-1.5 h-1.5 bg-primary rounded-full -translate-x-1/2 shadow-lg shadow-primary/50"
            animate={{
              y: [0, 32, 0],
              opacity: [1, 0.2, 1],
              scale: [1, 0.8, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </motion.div>

      <motion.div
        className="absolute inset-0 pointer-events-none z-[1]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 4, delay: 1 }}
      >
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: Math.random() * 4 + 1,
              height: Math.random() * 4 + 1,
              background:
                i % 4 === 0
                  ? "hsl(var(--primary) / 0.6)"
                  : i % 4 === 1
                    ? "hsl(var(--accent) / 0.4)"
                    : i % 4 === 2
                      ? "hsl(var(--secondary) / 0.3)"
                      : "hsl(var(--muted) / 0.2)",
              boxShadow: i % 3 === 0 ? "0 0 20px currentColor" : "none",
            }}
            animate={{
              y: [-150, window.innerHeight + 150],
              x: [0, Math.sin(i * 0.5) * 200],
              opacity: [0, 0.8, 0],
              scale: [0, 1, 0],
              rotate: [0, 360, 720],
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 10,
              ease: "linear",
            }}
          />
        ))}

        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute text-primary/40 text-lg"
            style={{
              left: `${15 + i * 7}%`,
              top: `${15 + (i % 4) * 20}%`,
            }}
            animate={{
              rotate: [0, 360],
              scale: [0, 1.2, 0],
              opacity: [0, 1, 0],
              filter: ["blur(2px)", "blur(0px)", "blur(2px)"],
            }}
            transition={{
              duration: 8 + i * 0.7,
              repeat: Infinity,
              delay: i * 2,
              ease: "easeInOut",
            }}
          >
            ✦
          </motion.div>
        ))}

        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`geo-${i}`}
            className={`absolute border border-primary/20 ${
              i % 3 === 0
                ? "w-8 h-8"
                : i % 3 === 1
                  ? "w-6 h-6 rotate-45"
                  : "w-4 h-4"
            }`}
            style={{
              left: `${25 + i * 15}%`,
              top: `${30 + (i % 2) * 30}%`,
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.6, 0.2],
              borderColor: [
                "hsl(var(--primary) / 0.2)",
                "hsl(var(--accent) / 0.4)",
                "hsl(var(--primary) / 0.2)",
              ],
            }}
            transition={{
              duration: 6 + i,
              repeat: Infinity,
              delay: i * 1.5,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>
    </section>
  );
}
