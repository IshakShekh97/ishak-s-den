"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, MapPin, Phone } from "lucide-react"
import { useForm, ValidationError } from "@formspree/react";

export default function Contact() {
    const [state, handleSubmit] = useForm(process.env.NEXT_PUBLIC_CONTACT_FROM_ID!);
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
        <section id="contact" className="py-20 bg-amber-100 dark:bg-muted">
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
                    {
                        state.succeeded ? (
                            <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
                                <Card className="min-h-full flex flex-col items-center justify-center text-center">
                                    <CardContent className="p-6 flex items-center justify-center flex-col text-center">
                                        <span className="text-4xl mb-4">📬</span>
                                        <h3 className="text-xl font-semibold mb-2">Thank you for reaching out!</h3>
                                        <p className="text-muted-foreground text-center">
                                            I have received your message and will contact you soon.
                                        </p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ) : (
                                <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
                                    <Card>
                                        <CardContent className="p-6">
                                            <form onSubmit={handleSubmit} className="space-y-4">
                                                <motion.div variants={itemVariants}>
                                                    <label htmlFor="name" className="block text-sm font-medium mb-1">
                                                        Name
                                                    </label>
                                                    <Input required id="name" placeholder="Your name" name="name" />
                                                    <ValidationError prefix="Name" field="name" errors={state.errors} />
                                                </motion.div>

                                                <motion.div variants={itemVariants}>
                                                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                                                        Email
                                                    </label>
                                                    <Input required id="email" name="email" type="email" placeholder="Your email" />
                                                    <ValidationError prefix="Email" field="email" errors={state.errors} />
                                                </motion.div>

                                                <motion.div variants={itemVariants}>
                                                    <label htmlFor="subject" className="block text-sm font-medium mb-1">
                                                        Subject
                                                    </label>
                                                    <Input required id="subject" name="subject" placeholder="Subject" />
                                                    <ValidationError prefix="Subject" field="subject" errors={state.errors} />
                                                </motion.div>

                                                <motion.div variants={itemVariants}>
                                                    <label htmlFor="message" className="block text-sm font-medium mb-1">
                                                        Message
                                                    </label>
                                                    <Textarea required id="message" name="message" placeholder="Your message" rows={5} />
                                                    <ValidationError prefix="Message" field="message" errors={state.errors} />
                                                </motion.div>

                                                <motion.div variants={itemVariants}>
                                                    <Button type="submit" disabled={state.submitting} className="w-full">
                                                        Send Message
                                                    </Button>
                                                </motion.div>
                                                <ValidationError errors={state.errors} />
                                            </form>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                        )
                    }
                </div>
            </div>
        </section>
    )
}
