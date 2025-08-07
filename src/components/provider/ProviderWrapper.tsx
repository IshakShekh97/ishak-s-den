"use client";

import { usePreloader } from "@/components/PreLoader";
import SmoothScrollProvider from "./SmoothScrollProvider";
import { ThemeProvider } from "./ThemeProvider";
import { NavBar } from "../home/Navbar";

const ProviderWrapper = ({ children }: { children?: React.ReactNode }) => {
  const [isLoading, Preloader] = usePreloader();

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Preloader />
      {!isLoading && (
        <SmoothScrollProvider>
          <div className="hidden md:block">{/* <SmoothCursor /> */}</div>
          <NavBar />
          {children}
        </SmoothScrollProvider>
      )}
    </ThemeProvider>
  );
};

export default ProviderWrapper;
