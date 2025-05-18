"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { ThemeSwitcher } from "./ThemeSwitcher"

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const navItems = [
        { name: "Home", href: "#home" },
        { name: "Skills", href: "#skills" },
        { name: "Technologies", href: "#technologies" },
        { name: "Education", href: "#education" },
        { name: "Portfolio", href: "#portfolio" },
        { name: "Contact", href: "#contact" },
    ]

    return (
        <motion.header
            className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-md"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    <motion.div
                        className="text-xl font-bold"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Image
                            src={'/logo-light.svg'}
                            alt="logo"
                            height={200}
                            width={200}
                            className="hidden dark:block"
                        />
                        <Image
                            src={'/logo-black.svg'}
                            alt="logo"
                            height={200}
                            width={200}
                            className="dark:hidden"
                        />
                    </motion.div>

                    <nav className="hidden lg:flex space-x-8">
                        {navItems.map((item, index) => (
                            <motion.a
                                key={item.name}
                                href={item.href}
                                className="text-sm font-medium hover:text-primary/80 transition-colors"
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 * index }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {item.name}
                            </motion.a>
                        ))}
                    </nav>

                    <div className="flex items-center space-x-4">
                        <ThemeSwitcher />

                        <div className="lg:hidden">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="rounded-full"
                            >
                                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {mobileMenuOpen && (
                <motion.div
                    className="lg:hidden glass"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="px-4 py-2 space-y-1">
                        {navItems.map((item, index) => (
                            <motion.a
                                key={item.name}
                                href={item.href}
                                className="block py-2 text-base font-medium"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.05 * index }}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {item.name}
                            </motion.a>
                        ))}
                    </div>
                </motion.div>
            )}
        </motion.header>
    )
}
