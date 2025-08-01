"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import {
    SiNextdotjs,
    SiReact,
    SiTypescript,
    SiTailwindcss,
    SiFramer,
    SiJavascript,
    SiNodedotjs,
    SiGit,
    SiVercel,
    SiGithub
} from "react-icons/si"
import { cn } from "@/lib/utils"

export default function Technologies() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: false, amount: 0.3 })
    const technologies = [
        {
            name: "Next.js",
            icon: SiNextdotjs,
            className: "bg-[#000000]/20 border-white hover:bg-[#000000]/70 hover:border-white"
        },
        {
            name: "React",
            icon: SiReact,
            className: "bg-[#61dafb]/20 border-[#61dafb] hover:bg-[#61dafb]/70 hover:border-[#61dafb]"
        },
        {
            name: "TypeScript",
            icon: SiTypescript,
            className: "bg-[#3178c6]/20 border-[#3178c6] hover:bg-[#3178c6]/70 hover:border-[#3178c6]"
        },
        {
            name: "Tailwind CSS",
            icon: SiTailwindcss,
            className: "bg-[#38bdf8]/20 border-[#38bdf8] hover:bg-[#38bdf8]/70 hover:border-[#38bdf8]"
        },
        {
            name: "Framer Motion",
            icon: SiFramer,
            className: "bg-[#e8e8e8]/20 border-black hover:bg-[#e8e8e8]/70 hover:border-black"
        },
        {
            name: "JavaScript",
            icon: SiJavascript,
            className: "bg-[#f7df1e]/20 border-[#f7df1e] hover:bg-[#f7df1e]/70 hover:border-[#f7df1e]"
        },
        {
            name: "Node.js",
            icon: SiNodedotjs,
            className: "bg-[#3c873a]/20 border-[#3c873a] hover:bg-[#3c873a]/70 hover:border-[#3c873a]"
        },
        {
            name: "Git",
            icon: SiGit,
            className: "bg-[#f05032]/20 border-[#f05032] hover:bg-[#f05032]/70 hover:border-[#f05032]"
        },
        {
            name: "Vercel",
            icon: SiVercel,
            className: "bg-[#000000]/20 border-white hover:bg-[#000000]/70 hover:border-white"
        },
        {
            name: "Github",
            icon: SiGithub,
            className: "bg-[#000000]/20 border-white hover:bg-[#000000]/70 hover:border-white"
        },
    ]

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    }

    const itemVariants = {
        hidden: { scale: 0.8, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                duration: 0.5,
            },
        },
    }

    return (
        <section id="technologies" className="section-padding bg-secondary/20">
            <motion.div ref={ref} initial="hidden" animate={isInView ? "visible" : "hidden"} variants={containerVariants}>
                <motion.h2 className="text-3xl md:text-4xl font-bold mb-12 text-center" variants={itemVariants}>
                    <span className="gradient-text">Technologies</span>
                </motion.h2>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
                    {technologies.map((tech, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className={cn("flex flex-col items-center p-5 rounded-lg border", tech.className)}
                            whileHover={{ y: -5, transition: { duration: 0.2 } }}
                        >
                            <div className="glass p-4 rounded-full mb-3">
                                <tech.icon className="w-8 h-8" />
                            </div>
                            <span className="text-sm font-medium">{tech.name}</span>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    )
}
