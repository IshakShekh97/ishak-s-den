"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"

export default function Portfolio() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: false, amount: 0.1 })

    const projects = [
        {
            title: "E-commerce Platform",
            description: "A modern e-commerce platform built with Next.js and Tailwind CSS.",
            image: "/placeholder.svg?height=600&width=800",
            tags: ["Next.js", "React", "Tailwind CSS"],
            demoLink: "#",
            githubLink: "#",
        },
        {
            title: "Portfolio Website",
            description: "A responsive portfolio website with smooth animations.",
            image: "/placeholder.svg?height=600&width=800",
            tags: ["React", "Framer Motion", "Tailwind CSS"],
            demoLink: "#",
            githubLink: "#",
        },
        {
            title: "Task Management App",
            description: "A task management application with drag and drop functionality.",
            image: "/placeholder.svg?height=600&width=800",
            tags: ["Next.js", "TypeScript", "Framer Motion"],
            demoLink: "#",
            githubLink: "#",
        },
    ]

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
            },
        },
    }

    const itemVariants = {
        hidden: { y: 50, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
            },
        },
    }

    return (
        <section id="portfolio" className="section-padding">
            <motion.div ref={ref} initial="hidden" animate={isInView ? "visible" : "hidden"} variants={containerVariants}>
                <motion.h2 className="text-3xl md:text-4xl font-bold mb-12 text-center" variants={itemVariants}>
                    <span className="gradient-text">Portfolio</span>
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className="glass rounded-lg overflow-hidden"
                            whileHover={{ y: -10, transition: { duration: 0.2 } }}
                        >
                            <div className="relative h-48 overflow-hidden">
                                <Image
                                    src={project.image || "/placeholder.svg"}
                                    alt={project.title}
                                    fill
                                    className="object-cover transition-transform duration-500 hover:scale-110"
                                />
                            </div>

                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                                <p className="text-muted-foreground mb-4">{project.description}</p>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.tags.map((tag, tagIndex) => (
                                        <span key={tagIndex} className="text-xs px-2 py-1 rounded-full bg-primary/10">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex gap-3">
                                    <Button size="sm" variant="outline" className="flex items-center gap-1">
                                        <ExternalLink className="h-4 w-4" />
                                        Demo
                                    </Button>
                                    <Button size="sm" variant="outline" className="flex items-center gap-1">
                                        <Github className="h-4 w-4" />
                                        Code
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    )
}