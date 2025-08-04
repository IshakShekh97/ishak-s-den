"use client";
import { useEffect } from "react";
import lenis from "lenis";

const SmoothScrollProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const lenisInstance = new lenis({
      lerp: 0.7,
      duration: 1,
      smoothWheel: true,
      syncTouch: true,
      syncTouchLerp: 0.7,
    });

    function raf(time: number) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenisInstance.destroy();
    };
  });

  return <>{children}</>;
};

export default SmoothScrollProvider;
