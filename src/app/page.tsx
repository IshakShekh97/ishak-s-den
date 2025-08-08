"use client";
import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import CTA from "@/components/home/CTA";
import Projects from "@/components/home/Projects";
import TechStack from "@/components/home/TechStack";
import Speciality from "@/components/home/Speciality";
import { Footer } from "@/components/Footer";
import { SeparationSection } from "@/components/home/ScrollSeprator";
import { SocialLinks } from "@/components/home/SocialLinks";

export default function Home() {
  return (
    <>
      <div className="relative min-h-screen w-full overflow-hidden">
        <main className="relative z-10">
          <Hero />
          <SeparationSection />
          <About />
          <Projects />
          <TechStack />
          <Speciality />
          <SocialLinks />
          <CTA />
          <Footer />
        </main>
      </div>
    </>
  );
}
