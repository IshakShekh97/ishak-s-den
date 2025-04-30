"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export function ThemeSwitcher() {
    const { setTheme, theme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
    })

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark")
    }

    if (mounted) {
        return (
            <Button variant="default" size="icon" onClick={toggleTheme} className="rounded-full bg-amber-500 text-black">
                <motion.div
                    initial={{ rotate: 0 }}
                    animate={{ rotate: theme === "dark" ? 0 : 180 }}
                    transition={{ duration: 0.5 }}
                >
                    {theme === "dark" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                </motion.div>
                <span className="sr-only">Toggle theme</span>
            </Button>
        )
    }

}