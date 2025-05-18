"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { SparklesCore } from "./ui/sparkles"
import { useTheme } from "next-themes"
import { TextGenerateEffect } from "./ui/text-generate-effect"
import Link from "next/link"

export default function Hero() {
    const { theme } = useTheme()
    const ref = useRef(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    })

    const y = useTransform(scrollYProgress, [0, 1], [0, 200])
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

    return (
        <section id="home" ref={ref} className="relative min-h-screen flex items-center section-padding pt-32 text-center">
            {/* <span className="absolute top-40 right-40 z-10 text-center text-lg bg-muted flex items-center justify-center px-4 py-2 rounded-full motion-translate-x-loop-[15%] motion-translate-y-loop-[0%] motion-delay-[3ms] motion-delay-[0ms]/translate motion-ease-in-out">
                Ishak's Den
            </span> */}

            <motion.div
                style={{ y, opacity }}
                className="absolute z-0 top-0 left-0 bottom-0 right-0">
                <SparklesCore
                    id="tsparticlesfullpage"
                    background="transparent"
                    minSize={0.2}
                    maxSize={2}
                    particleDensity={200}
                    className="w-full h-full !opacity-50 "
                    particleColor={theme === "dark" ? "#fff" : "#000"}
                />
            </motion.div>

            <motion.div className="max-w-3xl mx-auto relative z-20" style={{ y, opacity }}>
                <motion.h1
                    className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-500">{"Hello, I'm"}</span>
                    <br />
                    <span>Ishak Shekh</span>
                </motion.h1>

                <motion.div
                    className="text-xl md:text-2xl mb-8 text-muted-foreground"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <TextGenerateEffect
                        words={'A passionate developer specializing in Next.js, React, and modern web technologies.'}
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex items-center justify-center flex-col sm:flex-row gap-4"
                >
                    <Button asChild size="lg" className="group">
                        <Link href={'#portfolio'} >
                            View My Work
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </Button>
                    <Button asChild size="lg" variant="outline">
                        <Link href={'#contact'} >
                            Contact Me
                        </Link>
                    </Button>
                </motion.div>
            </motion.div>
        </section>
    )
}
