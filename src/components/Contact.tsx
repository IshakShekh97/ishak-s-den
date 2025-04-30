"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, MapPin, Phone } from "lucide-react"

export default function Contact() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, amount: 0.2 })

    const contactInfo = [
        {
            icon: <Mail className="h-6 w-6 text-primary" />,
            title: "Email",
            value: "shekhishak90@gmail.com",
            link: "mailto:shekhishak90@gmail.com",
        },
        {
            icon: <Phone className="h-6 w-6 text-primary" />,
            title: "Phone",
            value: "+91 63569 08980",
            link: "tel:+916356908980",
        },
        {
            icon: <MapPin className="h-6 w-6 text-primary" />,
            title: "Location",
            value: "Gujarat / West Bengal, India",
            link: "#",
        },
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
            transition: { duration: 0.5 },
        },
    }

    return (
        <section id="contact" className="py-20 bg-muted/50">
            <div className="container px-4 md:px-6">
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    ref={ref}
                >
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Get In Touch</h2>
                    <p className="mt-4 text-muted-foreground md:text-xl max-w-[700px] mx-auto">
                        {"Have a project in mind? Let's work together to create something amazing."}
                    </p>
                </motion.div>

                <div className="grid gap-10 lg:grid-cols-2">
                    <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
                        <div className="space-y-6">
                            {contactInfo.map((item, index) => (
                                <motion.div key={index} variants={itemVariants}>
                                    <Card>
                                        <CardContent className="p-6 flex items-center space-x-4">
                                            <div className="flex-shrink-0">{item.icon}</div>
                                            <div>
                                                <h3 className="font-medium">{item.title}</h3>
                                                <a href={item.link} className="text-muted-foreground hover:text-primary transition-colors">
                                                    {item.value}
                                                </a>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
                        <Card>
                            <CardContent className="p-6">
                                <form className="space-y-4">
                                    <motion.div variants={itemVariants}>
                                        <label htmlFor="name" className="block text-sm font-medium mb-1">
                                            Name
                                        </label>
                                        <Input id="name" placeholder="Your name" />
                                    </motion.div>

                                    <motion.div variants={itemVariants}>
                                        <label htmlFor="email" className="block text-sm font-medium mb-1">
                                            Email
                                        </label>
                                        <Input id="email" type="email" placeholder="Your email" />
                                    </motion.div>

                                    <motion.div variants={itemVariants}>
                                        <label htmlFor="subject" className="block text-sm font-medium mb-1">
                                            Subject
                                        </label>
                                        <Input id="subject" placeholder="Subject" />
                                    </motion.div>

                                    <motion.div variants={itemVariants}>
                                        <label htmlFor="message" className="block text-sm font-medium mb-1">
                                            Message
                                        </label>
                                        <Textarea id="message" placeholder="Your message" rows={5} />
                                    </motion.div>

                                    <motion.div variants={itemVariants}>
                                        <Button type="submit" className="w-full">
                                            Send Message
                                        </Button>
                                    </motion.div>
                                </form>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
