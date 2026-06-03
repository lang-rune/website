"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "motion/react"
import { Sun, Moon } from "lucide-react"
export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Avoid Hydration mismatch
  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="w-8 h-8 rounded border border-transparent flex items-center justify-center text-[var(--rune-fg-muted)]">
        <span className="w-4 h-4 bg-[var(--rune-bg-subtle)] rounded-full animate-pulse" />
      </div>
    )
  }

  const handleToggle = () => {
    if (theme === "dark") {
      setTheme("light")
    } else {
      setTheme("dark")
    }
  }

  const currentIcon = () => {
    if (theme === "light") return <Sun className="size-4" />
    return <Moon className="size-4" />
  }

  const themeLabel = () => {
    if (theme === "light") return "Light Theme active"
    return "Dark Theme active"
  }

  return (
    <button
      onClick={handleToggle}
      className="w-8 h-8 rounded border border-[var(--rune-border)] bg-[var(--rune-bg-raised)] text-[var(--rune-fg-muted)] hover:text-[var(--rune-fg-base)] hover:border-[var(--rune-accent)] transition-all duration-200 flex items-center justify-center outline-none focus-visible:ring-1 focus-visible:ring-[var(--rune-accent)] cursor-pointer"
      title={`${themeLabel()} (Click to toggle)`}
      aria-label="Toggle color theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={theme}
          initial={{ opacity: 0, rotate: -20, scale: 0.8 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 20, scale: 0.8 }}
          transition={{ duration: 0.15 }}
          className="flex items-center justify-center"
        >
          {currentIcon()}
        </motion.div>
      </AnimatePresence>
    </button>
  )
}
