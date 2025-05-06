"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"
import { getPortfolio } from "@/sanity/lib/client"
import { Portfolio as PortfolioType } from "@/sanity/types"
import { urlFor } from "@/sanity/lib/image"
import Link from "next/link"
import { Skeleton } from "./ui/skeleton"

export default function Portfolio() {
    const [portfolioData, setPortfolioData] = useState<PortfolioType[] | undefined>()
    const [dataState, setDataState] = useState<"loading" | "loaded" | "error">("loading")
    const ref = useRef(null)
    const isInView = useInView(ref, { once: false, amount: 0.1 })


    useEffect(() => {
        async function getPortfolios() {
            try {
                const response = await getPortfolio()
                if (response) {
                    setPortfolioData(response as PortfolioType[])
                }
                setDataState("loaded")
            } catch (error) {
                console.log(error)
                setDataState('error')
            }
        }
        getPortfolios()
    }, [])


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

                {
                    dataState === 'loading' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-10">
                            {[1, 2, 3].map((_, index) => (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    className="rounded-lg overflow-hidden dark:bg-card bg-amber-100 "
                                    whileHover={{ y: -10, transition: { duration: 0.2 } }}
                                >
                                    <Skeleton className="relative h-48 " />
                                    <div className="p-5">
                                        <Skeleton className="h-5 w-full my-2" />

                                        <Skeleton className="h-3 max-w-9/12 mb-2 mt-4" />
                                        <Skeleton className="h-3 w-8/12 my-2" />

                                        <div className="flex flex-wrap gap-2 my-4">
                                            {[1, 2, 3].map((_, tagIndex) => (
                                                <Skeleton key={tagIndex} className="h-4 w-16" />
                                            ))}
                                        </div>

                                        <div className="flex gap-3">
                                            <Skeleton className="h-8 w-24" />
                                            <Skeleton className="h-8 w-24" />
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )
                }

                {
                    dataState === 'error' && (
                        <div className="flex justify-center items-center h-96 text-destructive text-lg font-semibold">
                            Error loading portfolio data
                        </div>
                    )
                }


                {dataState === 'loaded' && portfolioData && portfolioData.length === 0 && (
                    <div className="flex justify-center items-center h-96 text-muted-foreground text-lg font-semibold">
                        No portfolio data available
                    </div>
                )}
                {(dataState === 'loaded' && portfolioData) && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {portfolioData.map((project, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="rounded-lg overflow-hidden dark:bg-card bg-amber-100 "
                                whileHover={{ y: -10, transition: { duration: 0.2 } }}
                            >
                                <div className="relative h-48 overflow-hidden">
                                    <Image
                                        src={project.image ? urlFor(project.image).auto('format').url() : "/placeholder.svg"}
                                        alt={project.title as string}
                                        fill
                                        className="object-cover transition-transform duration-500 hover:scale-110"
                                    />
                                </div>

                                <div className="p-6">
                                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                                    <p className="text-muted-foreground mb-4">{project.description}</p>

                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.technologies && project.technologies.map((tag, tagIndex) => (
                                            <span key={tagIndex} className="text-xs px-2 py-1 rounded-full bg-primary/10">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex gap-3">
                                        <Button asChild size="sm" variant="outline" className="flex items-center gap-1">
                                            <Link href={project.projectLink as string} target="_blank" rel="noopener noreferrer">
                                                <ExternalLink className="h-4 w-4" />
                                                Demo
                                            </Link>
                                        </Button>
                                        <Button asChild size="sm" variant="outline" className="flex items-center gap-1">
                                            <Link href={project.githubLink as string} target="_blank" rel="noopener noreferrer">
                                                <Github className="h-4 w-4" />
                                                Code
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}


            </motion.div>
        </section>
    )
}