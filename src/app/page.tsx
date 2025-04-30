"use client"
import Header from "@/components/Header"
import Hero from "@/components/Hero"
import Skills from "@/components/Skills"
import Technologies from "@/components/Technologies"
import Portfolio from "@/components/Portfolio"
import Contact from "@/components/Contact"

export default function Home() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <Header />
      <main className="relative z-10">
        <Hero />
        <Skills />
        <Technologies />
        <Portfolio />
        <Contact />
      </main>
    </div>
  )
}
