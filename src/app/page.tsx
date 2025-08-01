"use client";
// import Header from "@/components/home/Header";
import Hero from "@/components/home/Hero";
import Skills from "@/components/home/Skills";
import Technologies from "@/components/home/Technologies";
import Portfolio from "@/components/home/Portfolio";
import Contact from "@/components/home/Contact";
import Education from "@/components/home/Education";
import { NavBar } from "@/components/home/Navbar";
import { usePreloader } from "@/components/PreLoader";
export default function Home() {
  const [isLoading, Preloader] = usePreloader();

  return (
    <>
      <Preloader />
      {!isLoading && (
        <div className="relative min-h-screen w-full overflow-hidden">
          <NavBar />
          <main className="relative z-10">
            <Hero />
            <Skills />
            <Technologies />
            <Education />
            <Portfolio />
            <Contact />
          </main>
        </div>
      )}
    </>
  );
}
