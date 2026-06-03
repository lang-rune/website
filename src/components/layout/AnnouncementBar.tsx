"use client"

import * as React from "react"
import { motion } from "motion/react"

export function AnnouncementBar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="w-full bg-[var(--rune-bg-overlay)] border-b border-[var(--rune-border)] py-1.5 px-4 text-center z-40 relative flex items-center justify-center"
    >
      <a 
        href="https://github.com/rune-lang/vscode" 
        target="_blank" 
        rel="noopener noreferrer"
        className="group inline-flex items-center gap-1.5 font-mono text-[10px] sm:text-xs text-[var(--rune-fg-muted)] hover:text-[var(--rune-accent)] transition-all duration-200"
      >
        <span className="bg-[var(--rune-accent-subtle)] text-[var(--rune-accent)] border border-[var(--rune-accent-dim)] px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider select-none">
          Ecosystem
        </span>
        <span>Rune VS Code Extension is now available on GitHub</span>
        <span className="inline-block transform group-hover:translate-x-0.5 transition-transform duration-200">
          →
        </span>
      </a>
    </motion.div>
  )
}
