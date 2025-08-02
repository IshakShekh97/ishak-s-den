"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Self-sufficient Preloader component
const PreloaderInner = ({ onDone }: { onDone: () => void }) => {
  const [count, setCount] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsDone(true), 300);
          return 100;
        }
        return prevCount + 1;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isDone) {
      const timeout = setTimeout(() => {
        onDone();
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [isDone, onDone]);

  const preloaderVariants = {
    initial: {
      opacity: 1,
    },
    exit: {
      opacity: [1, 0.7, 0.4, 0],
      filter: [
        "none",
        "contrast(2) brightness(1.5) blur(2px)",
        "contrast(0.5) brightness(0.7) blur(6px)",
        "none",
      ],
      transition: {
        opacity: { duration: 1, times: [0, 0.3, 0.7, 1] },
        filter: { duration: 1, times: [0, 0.3, 0.7, 1] },
      },
    },
  };

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          className="fixed inset-0 flex items-end justify-end text-primary z-[100]"
          variants={preloaderVariants}
          initial="initial"
          animate="initial"
          exit="exit"
          style={{ willChange: "opacity, filter" }}
        >
          <div className="p-8 sm:p-12 md:p-16 lg:p-20">
            <span className="text-9xl sm:text-[13rem] md:text-[17rem] lg:text-[20rem] xl:text-[25rem] font-bold ">
              {count}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export function usePreloader() {
  const [isLoading, setIsLoading] = useState(true);

  const Preloader = useCallback(() => {
    return isLoading ? (
      <PreloaderInner onDone={() => setIsLoading(false)} />
    ) : null;
  }, [isLoading]);

  return [isLoading, Preloader] as [boolean, () => React.ReactElement | null];
}
