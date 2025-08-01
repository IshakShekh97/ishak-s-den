"use client";

import { motion } from "framer-motion";

interface GradientBackgroundProps {
  className?: string;
}

export default function GradientBackground({
  className = "",
}: GradientBackgroundProps) {
  return (
    <motion.div
      className={`absolute inset-0 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      {/* Animated gradient mesh */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.15) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.15) 0%, transparent 50%)",
            "radial-gradient(circle at 40% 80%, rgba(119, 255, 198, 0.15) 0%, transparent 50%)",
            "radial-gradient(circle at 60% 20%, rgba(198, 119, 255, 0.15) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.15) 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />

      {/* Secondary gradient layer */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          background: [
            "linear-gradient(45deg, rgba(120, 119, 198, 0.1) 0%, transparent 30%, rgba(255, 119, 198, 0.1) 70%, transparent 100%)",
            "linear-gradient(135deg, rgba(255, 119, 198, 0.1) 0%, transparent 30%, rgba(119, 255, 198, 0.1) 70%, transparent 100%)",
            "linear-gradient(225deg, rgba(119, 255, 198, 0.1) 0%, transparent 30%, rgba(198, 119, 255, 0.1) 70%, transparent 100%)",
            "linear-gradient(315deg, rgba(198, 119, 255, 0.1) 0%, transparent 30%, rgba(120, 119, 198, 0.1) 70%, transparent 100%)",
            "linear-gradient(45deg, rgba(120, 119, 198, 0.1) 0%, transparent 30%, rgba(255, 119, 198, 0.1) 70%, transparent 100%)",
          ],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear",
        }}
      />

      {/* Subtle noise overlay for texture */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </motion.div>
  );
}
