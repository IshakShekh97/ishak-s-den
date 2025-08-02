"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  direction: number;
}

interface ParticleSystemProps {
  count?: number;
  className?: string;
}

export default function ParticleSystem({
  count = 20,
  className = "",
}: ParticleSystemProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const generateParticles = () => {
      const newParticles: Particle[] = Array.from(
        { length: count },
        (_, i) => ({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          duration: Math.random() * 20 + 15,
          delay: Math.random() * 10,
          direction: Math.random() > 0.5 ? 1 : -1,
        })
      );
      setParticles(newParticles);
    };

    generateParticles();
  }, [count]);

  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
    >
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-primary/20"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, particle.direction * 100, 0],
            x: [0, Math.sin(particle.id) * 50, 0],
            opacity: [0, 0.8, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "linear",
            delay: particle.delay,
          }}
        />
      ))}

      {/* Additional sparkle effects */}
      {particles.slice(0, 5).map((particle) => (
        <motion.div
          key={`sparkle-${particle.id}`}
          className="absolute"
          style={{
            left: `${particle.x + 10}%`,
            top: `${particle.y + 10}%`,
          }}
          animate={{
            rotate: [0, 360],
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            delay: particle.delay + 2,
          }}
        >
          <svg width="8" height="8" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 0L14.4 9.6L24 12L14.4 14.4L12 24L9.6 14.4L0 12L9.6 9.6L12 0Z"
              fill="currentColor"
              className="text-primary/40"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
