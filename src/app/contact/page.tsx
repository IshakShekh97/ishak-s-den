"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Mail,
  MapPin,
  Phone,
  MessageCircle,
  Clock,
  Send,
  HelpCircle,
} from "lucide-react";
import { useForm, ValidationError } from "@formspree/react";
import { TextReveal, TextRevealChars } from "@/components/animated/text-reveal";
import Link from "next/link";

export default function Contact() {
  const [state, handleSubmit] = useForm(
    process.env.NEXT_PUBLIC_CONTACT_FROM_ID!
  );
  const ref = useRef(null);
  const faqRef = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const isFaqInView = useInView(faqRef, { once: true, amount: 0.2 });

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6 text-primary" />,
      title: "Email",
      value: "shekhishak90@gmail.com",
      link: "mailto:shekhishak90@gmail.com",
      description: "Send me an email anytime",
    },
    {
      icon: <Phone className="h-6 w-6 text-primary" />,
      title: "Phone",
      value: "+91 63569 08980",
      link: "tel:+916356908980",
      description: "Available Mon-Fri, 9AM-6PM IST",
    },
    {
      icon: <MapPin className="h-6 w-6 text-primary" />,
      title: "Location",
      value: "Bodeli - Gujarat / Pandua - West Bengal, India",
      link: "#",
      description: "Remote work available worldwide",
    },
  ];

  const faqData = [
    {
      question: "What services do you offer?",
      answer:
        "I specialize in full-stack web development, focusing on modern React/Next.js applications, responsive UI/UX design, API development, and database integration. I also offer consulting services for technical architecture and code reviews.",
    },
    {
      question: "How long does a typical project take?",
      answer:
        "Project timelines vary depending on complexity. A simple landing page might take 1-2 weeks, while a full-scale web application could take 2-3 months. I provide detailed timelines during our initial consultation.",
    },
    {
      question: "What is your development process?",
      answer:
        "I follow an agile development approach with regular check-ins. The process includes: Discovery & Planning → Design & Prototyping → Development → Testing → Deployment → Maintenance. You'll have full visibility throughout the project.",
    },
    {
      question: "Do you work with existing teams?",
      answer:
        "Absolutely! I collaborate effectively with existing development teams, designers, and stakeholders. I can integrate seamlessly into your workflow using tools like Git, Slack, Notion, or whatever your team prefers.",
    },
    {
      question: "What technologies do you specialize in?",
      answer:
        "My primary stack includes React, Next.js, TypeScript, Node.js, Tailwind CSS, and modern databases like PostgreSQL and MongoDB. I'm also experienced with cloud platforms like Vercel, AWS, and various API integrations.",
    },
    {
      question: "Can you help with ongoing maintenance?",
      answer:
        "Yes! I offer ongoing maintenance packages that include bug fixes, security updates, feature enhancements, and performance optimizations. I believe in building long-term partnerships with my clients.",
    },
    {
      question: "What are your rates?",
      answer:
        "My rates depend on the project scope, timeline, and complexity. I offer both project-based pricing and hourly rates. Contact me for a personalized quote based on your specific requirements.",
    },
    {
      question: "Do you provide hosting and deployment services?",
      answer:
        "I can assist with deployment setup and recommend the best hosting solutions for your project. While I don't provide hosting directly, I work with reliable platforms like Vercel, Netlify, and AWS to ensure optimal performance.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <>
      <section
        id="contact"
        className="relative py-20 bg-background overflow-hidden"
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-1/4 -left-32 w-64 h-64 bg-primary/5 rounded-full blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-1/4 -right-32 w-96 h-96 bg-primary/3 rounded-full blur-3xl"
            animate={{
              x: [0, -80, 0],
              y: [0, 60, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            ref={ref}
          >
            <motion.div
              className="flex items-center gap-2 mb-6 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <MessageCircle className="text-primary size-6" />
              <TextRevealChars
                text="GET IN TOUCH"
                className="text-lg font-medium tracking-wider uppercase text-primary"
                delay={0.3}
                duration={0.4}
                staggerDelay={0.05}
              />
            </motion.div>

            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Let&apos;s Create Something
              <span className="block text-primary">Amazing Together</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <TextReveal
                text="Whether you have a project in mind, need technical consultation, or just want to say hello, I'd love to hear from you. Let's discuss how we can bring your ideas to life."
                className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto"
                delay={0.8}
                duration={1}
              />
            </motion.div>
          </motion.div>

          <div className="grid gap-12 lg:grid-cols-2 xl:gap-20">
            {/* Contact Information */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="space-y-8"
            >
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <motion.div key={index} variants={itemVariants}>
                    <Card className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/30">
                      <CardContent className="p-8">
                        <div className="flex items-start space-x-6">
                          <div className="flex-shrink-0 p-3 bg-primary/10 rounded-2xl group-hover:bg-primary/20 transition-colors duration-300">
                            {item.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-xl font-semibold mb-2 text-foreground">
                              {item.title}
                            </h3>
                            <Link
                              href={item.link}
                              className="text-muted-foreground hover:text-primary transition-colors duration-300 text-lg font-medium break-words"
                            >
                              {item.value}
                            </Link>
                            <p className="text-sm text-muted-foreground/80 mt-2">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            {/* Contact Form */}
            {state.succeeded ? (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                <Card className="min-h-full flex flex-col items-center justify-center text-center border-border/50 shadow-lg">
                  <CardContent className="p-12 text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        delay: 0.2,
                      }}
                      className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                      <Send className="h-10 w-10 text-primary" />
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-4 text-foreground">
                      Message Sent Successfully!
                    </h3>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      Thank you for reaching out! I&apos;ve received your
                      message and will get back to you within 24 hours.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                <Card className="border-border/50 shadow-lg">
                  <CardContent className="p-8">
                    <div className="mb-8">
                      <h3 className="text-2xl font-bold mb-2 text-foreground">
                        Send Me a Message
                      </h3>
                      <p className="text-muted-foreground">
                        Fill out the form below and I&apos;ll get back to you as
                        soon as possible.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid gap-6 md:grid-cols-2">
                        <motion.div variants={itemVariants}>
                          <label
                            htmlFor="name"
                            className="block text-sm font-semibold mb-2 text-foreground"
                          >
                            Full Name *
                          </label>
                          <Input
                            required
                            id="name"
                            placeholder="John Doe"
                            name="name"
                            className="h-12 px-4 border-border/50 focus:border-primary"
                          />
                          <ValidationError
                            prefix="Name"
                            field="name"
                            errors={state.errors}
                            className="text-destructive text-sm mt-1"
                          />
                        </motion.div>

                        <motion.div variants={itemVariants}>
                          <label
                            htmlFor="email"
                            className="block text-sm font-semibold mb-2 text-foreground"
                          >
                            Email Address *
                          </label>
                          <Input
                            required
                            id="email"
                            name="email"
                            type="email"
                            placeholder="john@example.com"
                            className="h-12 px-4 border-border/50 focus:border-primary"
                          />
                          <ValidationError
                            prefix="Email"
                            field="email"
                            errors={state.errors}
                            className="text-destructive text-sm mt-1"
                          />
                        </motion.div>
                      </div>

                      <motion.div variants={itemVariants}>
                        <label
                          htmlFor="subject"
                          className="block text-sm font-semibold mb-2 text-foreground"
                        >
                          Subject *
                        </label>
                        <Input
                          required
                          id="subject"
                          name="subject"
                          placeholder="Project Inquiry / Collaboration / Question"
                          className="h-12 px-4 border-border/50 focus:border-primary"
                        />
                        <ValidationError
                          prefix="Subject"
                          field="subject"
                          errors={state.errors}
                          className="text-destructive text-sm mt-1"
                        />
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <label
                          htmlFor="message"
                          className="block text-sm font-semibold mb-2 text-foreground"
                        >
                          Message *
                        </label>
                        <Textarea
                          required
                          id="message"
                          name="message"
                          placeholder="Tell me about your project, goals, timeline, and any specific requirements..."
                          rows={6}
                          className="px-4 py-3 border-border/50 focus:border-primary resize-none"
                        />
                        <ValidationError
                          prefix="Message"
                          field="message"
                          errors={state.errors}
                          className="text-destructive text-sm mt-1"
                        />
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <Button
                          type="submit"
                          disabled={state.submitting}
                          size="lg"
                          className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90 disabled:opacity-50"
                        >
                          {state.submitting ? (
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              Sending...
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <Send className="h-4 w-4" />
                              Send Message
                            </div>
                          )}
                        </Button>
                        <ValidationError
                          errors={state.errors}
                          className="text-destructive text-sm mt-2"
                        />
                      </motion.div>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
          <motion.div
            variants={itemVariants}
            className="p-6 rounded-2xl bg-primary/5 border border-primary/20 my-10"
          >
            <div className="flex items-center gap-3 mb-3">
              <Clock className="h-5 w-5 text-primary" />
              <h4 className="font-semibold text-foreground">Quick Response</h4>
            </div>
            <p className="text-muted-foreground">
              I typically respond within 24 hours. For urgent matters, feel free
              to call directly.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative py-20 bg-secondary/20 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-0 left-1/2 w-72 h-72 bg-primary/5 rounded-full blur-3xl"
            animate={{
              x: [0, -100, 0],
              y: [0, 50, 0],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-16"
            ref={faqRef}
            initial={{ opacity: 0, y: 40 }}
            animate={isFaqInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="flex items-center gap-2 mb-6 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={isFaqInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <HelpCircle className="text-primary size-6" />
              <TextRevealChars
                text="FREQUENTLY ASKED"
                className="text-lg font-medium tracking-wider uppercase text-primary"
                delay={0.3}
                duration={0.4}
                staggerDelay={0.05}
              />
            </motion.div>

            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isFaqInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Questions & Answers
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isFaqInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <TextReveal
                text="Find answers to common questions about my services, process, and how we can work together."
                className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto"
                delay={0.8}
                duration={1}
              />
            </motion.div>
          </motion.div>

          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={isFaqInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Accordion type="single" collapsible className="space-y-4">
              {faqData.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isFaqInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                >
                  <AccordionItem
                    value={`item-${index}`}
                    className="border border-border/50 rounded-2xl px-6 bg-background/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300 data-[state=open]:bg-background data-[state=open]:shadow-xl data-[state=open]:border-primary/30"
                  >
                    <AccordionTrigger className="text-left hover:no-underline py-6 text-lg font-semibold text-foreground hover:text-primary transition-colors duration-300 [&[data-state=open]>svg]:rotate-180">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="pb-6 pt-2 text-muted-foreground leading-relaxed text-base">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={isFaqInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            <div className="inline-flex flex-col sm:flex-row gap-4 items-center">
              <p className="text-muted-foreground text-lg">
                Still have questions?
              </p>
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8"
                asChild
              >
                <Link
                  href="https://wa.me/916356908980"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  <MessageCircle className="h-5 w-5" />
                  Get in Touch
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
