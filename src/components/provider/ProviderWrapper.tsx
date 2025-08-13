"use client";

import { usePreloader } from "@/components/PreLoader";
import SmoothScrollProvider from "./SmoothScrollProvider";
import { ThemeProvider } from "./ThemeProvider";
import { NavBar } from "../home/Navbar";
import { Toaster } from "sonner";
import { SmoothCursor } from "../animated/smooth-cursor";

const ProviderWrapper = ({ children }: { children?: React.ReactNode }) => {
  const [isLoading, Preloader] = usePreloader();

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Preloader />
      <div className="hidden md:block">
        <SmoothCursor />
      </div>
      {!isLoading && (
        <SmoothScrollProvider>
          <NavBar />
          <div className="mt-10">{children}</div>
          <Toaster />
        </SmoothScrollProvider>
      )}
    </ThemeProvider>
  );
};

export default ProviderWrapper;
