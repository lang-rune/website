"use client"

import * as React from "react"
import { motion } from "motion/react"

interface SourceLink {
  label: string
  url: string
}

const LINKS: SourceLink[] = [
  { label: "→ Read the Lexer Scanner", url: "https://github.com/lang-rune/rune/blob/main/rune/lexer/lexer.py" },
  { label: "→ Read the Expression Parser", url: "https://github.com/lang-rune/rune/blob/main/rune/parser/parser.py" },
  { label: "→ Read the AST Tree Models", url: "https://github.com/lang-rune/rune/blob/main/rune/ast/nodes.py" },
  { label: "→ Read the Evaluation Loop", url: "https://github.com/lang-rune/rune/blob/main/rune/runtime/interpreter.py" }
]

export function ReadSourceSection() {
  const EASE_EXPO_OUT = [0.16, 1, 0.3, 1] as const

  return (
    <section className="relative py-28 px-4 overflow-hidden max-w-[var(--rune-max-content)] mx-auto">
      <div className="flex flex-col items-center text-center">
        
        {/* Line divider */}
        <motion.div 
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.0, ease: EASE_EXPO_OUT }}
          className="w-24 h-px bg-[var(--rune-border-strong)] mb-12"
        />

        <motion.h2 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: EASE_EXPO_OUT }}
          className="font-display text-3xl sm:text-4xl font-bold text-[var(--rune-fg-base)] mb-4"
        >
          The source is the documentation.
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.1, duration: 0.8, ease: EASE_EXPO_OUT }}
          className="text-xs sm:text-sm text-[var(--rune-fg-muted)] leading-relaxed max-w-lg mb-12"
        >
          Every module in Rune is built to be read. Dive directly into the implementation of our core subsystems.
        </motion.p>

        {/* Large Typographic Links list */}
        <div className="flex flex-col gap-4 w-full max-w-md text-left font-display">
          {LINKS.map((link, idx) => (
            <motion.a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: idx * 0.08, duration: 0.6, ease: EASE_EXPO_OUT }}
              className="group py-2.5 px-4 text-base sm:text-lg font-semibold text-[var(--rune-fg-base)] hover:text-[var(--rune-accent)] rounded border border-transparent hover:border-[var(--rune-border)] hover:bg-[var(--rune-bg-raised)] transition-all flex items-center justify-between"
            >
              <span>{link.label}</span>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs font-mono text-[var(--rune-accent)]">
                GITHUB ↗
              </span>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  )
}
