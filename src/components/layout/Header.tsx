"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "motion/react"
import { LogoLink } from "./LogoLink"
import { ThemeToggle } from "./ThemeToggle"
import { Search, Menu, X, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={cn("fill-current", className)} viewBox="0 0 24 24">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}

export function Header() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = React.useState(false)

  // Listen to path changes to close mobile drawer
  React.useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  const triggerSearch = () => {
    window.dispatchEvent(new CustomEvent("open-search"))
  }

  // Navigation Links
  const navLinks = [
    { label: "Docs", url: "/docs/design-system", matches: "/docs" },
    { label: "Roadmap", url: "/roadmap", matches: "/roadmap" },
  ]

  // Detect OS for shortcut indicator
  const [shortcutLabel, setShortcutLabel] = React.useState("⌘K")
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const isMac = navigator.userAgent.toLowerCase().includes("mac")
      setShortcutLabel(isMac ? "⌘K" : "Ctrl+K")
    }
  }, [])

  return (
    <header className="sticky top-0 z-40 w-full flex flex-col">
      {/* Primary Navigation Bar */}
      <nav className="w-full h-[var(--fd-nav-height)] bg-[var(--rune-nav-bg)] backdrop-blur border-b border-[var(--rune-border)] px-4 sm:px-6 flex items-center justify-between transition-colors duration-200">
        
        {/* Left Side: Logo Link */}
        <div className="flex items-center gap-6">
          {/* Logo switches to icon on very small screens */}
          <LogoLink variant="default" className="hidden sm:inline-flex" />
          <LogoLink variant="constrained" className="inline-flex sm:hidden" />

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-4">
            {navLinks.map((link) => {
              const isActive = pathname.startsWith(link.matches)
              return (
                <Link
                  key={link.label}
                  href={link.url}
                  className={cn(
                    "text-xs font-mono transition-colors duration-150 px-2 py-1 rounded relative",
                    isActive 
                      ? "text-[var(--rune-accent)]" 
                      : "text-[var(--rune-fg-muted)] hover:text-[var(--rune-fg-base)]"
                  )}
                >
                  {link.label}
                  {isActive && (
                    <motion.div 
                      layoutId="activeHeaderTab"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-[var(--rune-accent)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              )
            })}
          </div>
        </div>

        {/* Right Side: Search, Social, ThemeToggle */}
        <div className="flex items-center gap-3">
          
          {/* Search Trigger Button */}
          <button
            onClick={triggerSearch}
            className="h-8 px-2 rounded border border-[var(--rune-border)] bg-[var(--rune-bg-raised)] text-[var(--rune-fg-muted)] hover:text-[var(--rune-fg-base)] hover:border-[var(--rune-accent)] transition-all duration-200 flex items-center gap-2 text-xs font-mono outline-none cursor-pointer"
          >
            <Search className="size-3.5" />
            <span className="hidden sm:inline">Search</span>
            <span className="text-[9px] bg-[var(--rune-bg-subtle)] px-1.5 py-0.5 rounded border border-[var(--rune-border)] select-none text-[var(--rune-fg-faint)]">
              {shortcutLabel}
            </span>
          </button>

          {/* GitHub Desktop Link */}
          <a
            href="https://github.com/rune-lang/rune"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex w-8 h-8 rounded border border-[var(--rune-border)] bg-[var(--rune-bg-raised)] text-[var(--rune-fg-muted)] hover:text-[var(--rune-fg-base)] hover:border-[var(--rune-accent)] transition-all duration-200 items-center justify-center outline-none"
            title="GitHub Repository"
          >
            <GithubIcon className="size-4" />
          </a>

          {/* VS Code Desktop Link */}
          <a
            href="https://github.com/rune-lang/vscode"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex w-8 h-8 rounded border border-[var(--rune-border)] bg-[var(--rune-bg-raised)] text-[var(--rune-fg-muted)] hover:text-[var(--rune-fg-base)] hover:border-[var(--rune-accent)] transition-all duration-200 items-center justify-center outline-none"
            title="VS Code Tooling Extension"
          >
            <ExternalLink className="size-4" />
          </a>

          {/* Theme Toggle Component */}
          <ThemeToggle />

          {/* Mobile Hamburger Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex md:hidden w-8 h-8 rounded border border-[var(--rune-border)] bg-[var(--rune-bg-raised)] text-[var(--rune-fg-muted)] hover:text-[var(--rune-fg-base)] hover:border-[var(--rune-accent)] transition-all duration-200 items-center justify-center outline-none cursor-pointer"
            aria-label="Toggle Mobile Menu"
          >
            {mobileOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-x-0 bottom-0 top-[var(--fd-nav-height)] bg-black/60 backdrop-blur-xs z-30"
            />

            {/* Drawer Body */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              className="fixed top-[var(--fd-nav-height)] right-0 bottom-0 w-64 bg-[var(--rune-bg-raised)] border-l border-[var(--rune-border-strong)] z-40 p-6 flex flex-col justify-between"
            >
              <div className="flex flex-col gap-6">
                
                {/* Header logo lockup inside drawer */}
                <div className="flex items-center gap-2 pb-4 border-b border-[var(--rune-border)]">
                  <LogoLink variant="constrained" />
                  <span className="font-display text-base font-bold text-[var(--rune-fg-base)]">
                    Rune Navigation
                  </span>
                </div>

                {/* Navigation links */}
                <div className="flex flex-col gap-3">
                  {navLinks.map((link) => {
                    const isActive = pathname.startsWith(link.matches)
                    return (
                      <Link
                        key={link.label}
                        href={link.url}
                        className={cn(
                          "px-3 py-2 rounded text-sm font-mono transition-colors",
                          isActive 
                            ? "bg-[var(--rune-accent-subtle)] border border-[var(--rune-accent-dim)] text-[var(--rune-accent)]" 
                            : "text-[var(--rune-fg-muted)] hover:text-[var(--rune-fg-base)] border border-transparent"
                        )}
                      >
                        {link.label}
                      </Link>
                    )
                  })}
                  
                  {/* GitHub link inside drawer */}
                  <a
                    href="https://github.com/rune-lang/rune"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 rounded text-sm font-mono text-[var(--rune-fg-muted)] hover:text-[var(--rune-fg-base)] flex items-center gap-2"
                  >
                    <GithubIcon className="size-4" /> GitHub Repository
                  </a>

                  {/* VS Code link inside drawer */}
                  <a
                    href="https://github.com/rune-lang/vscode"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 rounded text-sm font-mono text-[var(--rune-fg-muted)] hover:text-[var(--rune-fg-base)] flex items-center gap-2"
                  >
                    <ExternalLink className="size-4" /> VS Code Extension
                  </a>
                </div>

              </div>

              {/* Drawer footer */}
              <div className="text-[10px] font-mono text-[var(--rune-fg-faint)] border-t border-[var(--rune-border)] pt-4">
                Rune Compiler Shell v0.2
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
