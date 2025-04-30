"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { cn } from "@/lib/utils"

export default function Skills() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: false, amount: 0.3 })

    const skills = [
        { name: "Frontend Development", description: "Building responsive and interactive user interfaces" },
        { name: "UI/UX Design", description: "Creating intuitive and engaging user experiences" },
        { name: "Web Animation", description: "Implementing smooth and meaningful animations" },
        { name: "Performance Optimization", description: "Ensuring fast and efficient web applications" },
        { name: "Responsive Design", description: "Developing websites that work on all devices" },
    ]

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    }

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
            },
        },
    }

    return (
        <section id="skills" className="section-padding relative">
            <motion.div ref={ref} initial="hidden" animate={isInView ? "visible" : "hidden"} variants={containerVariants}>
                <motion.h2 className="text-3xl md:text-4xl font-bold mb-12 text-center" variants={itemVariants}>
                    <span className="gradient-text">Skills</span>
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
                    {skills.map((skill, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className={cn('glass p-6 rounded-lg border-foreground/40 border',
                                (index === skills.length - 1 || index === skills.length - 2) ? "lg:col-span-3" : "lg:col-span-2",
                            )}
                            whileHover={{ y: -5, transition: { duration: 0.2 } }}
                        >
                            <h3 className="text-xl font-semibold mb-2">{skill.name}</h3>
                            <p className="text-muted-foreground">{skill.description}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    )
}
