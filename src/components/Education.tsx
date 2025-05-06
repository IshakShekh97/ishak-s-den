'use client'

import { motion, useInView } from "framer-motion";
import { Calendar, GraduationCap, School } from "lucide-react";
import { useRef } from "react";

const Education = () => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: false, amount: 0.1 })
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

    const educationData = [
        {
            degree: "Bachelor of Computer Application",
            institution: "Parul University / PICA",
            year: "2022 - 2025",
            score: "CGPA: 8.1",
            icon: GraduationCap,
            details: "Graduated with a Bachelor's in Computer Application. Specialized in web development, database management, and software development. Completed several projects including a full-stack web application.",
        },
        {
            degree: "12th Standard (PCB)",
            institution: "Sapphire Public School",
            year: "2022",
            score: "54%",
            icon: School,
            details: "Completed higher secondary education with Physics, Chemistry, and Biology stream. Participated in science exhibitions and practical laboratory work. Member of the school's science club.",
        },
        {
            degree: "10th Standard",
            institution: "Sapphire Public School",
            year: "2020",
            score: "73%",
            icon: School,
            details: "Completed secondary education with distinction in science and mathematics. Participated in various academic competitions and secured good academic standing.",
        },
    ]


    return (
        <section id="education" className="section-padding">
            <motion.div ref={ref} initial="hidden" animate={isInView ? "visible" : "hidden"} variants={containerVariants}>
                <motion.h2 className="text-3xl md:text-4xl font-bold mb-12 text-center" variants={itemVariants}>
                    <span className="gradient-text">Education</span>
                </motion.h2>


                <div className="max-w-full mx-auto">
                    <div className="relative border-l-2 border-amber-500/30 pl-8 ml-4 md:ml-8 space-y-10">
                        {educationData.map((item, index) => (
                            <motion.div key={index} variants={itemVariants} className="relative">
                                {/* Timeline dot */}
                                <div className="absolute -left-[41px] top-0 w-6 h-6 rounded-full glass bg-amber-500/20 flex items-center justify-center">
                                    <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                                </div>

                                {/* Content */}
                                <motion.div
                                    className="rounded-lg overflow-hidden dark:bg-card bg-amber-100 p-6"
                                    whileHover={{
                                        x: 5,
                                        boxShadow: "0 10px 30px -15px rgba(245, 158, 11, 0.2)",
                                        transition: { duration: 0.2 },
                                    }}
                                >
                                    <div className="flex items-center mb-2">
                                        <div className="p-2 rounded-full bg-amber-500/10 mr-3">
                                            <item.icon className="h-5 w-5 text-amber-500" />
                                        </div>
                                        <h3 className="text-xl font-semibold">{item.degree}</h3>
                                    </div>

                                    <div className="ml-12">
                                        <p className="text-lg font-medium mb-1">{item.institution}</p>
                                        <div className="flex items-center text-sm text-muted-foreground mb-2">
                                            <Calendar className="h-4 w-4 mr-1" />
                                            <span>{item.year}</span>
                                            <span className="mx-2">•</span>
                                            <span>{item.score}</span>
                                        </div>

                                        <p className="text-muted-foreground">{item.details}</p>
                                    </div>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                </div>





            </motion.div>
        </section>
    )
}

export default Education