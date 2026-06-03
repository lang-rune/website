"use client"

import * as React from "react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

interface Milestone {
  date: string
  title: string
  description: string
}

const MILESTONES: Milestone[] = [
  {
    date: "Jan 2025",
    title: "v0.1.0 Initial Release",
    description: "A complete tree-walk interpreter in Python: lexer, recursive-descent parser, environment chains, closures, standard built-ins, and an interactive REPL."
  },
  {
    date: "Jun 2025",
    title: "v0.2.0 Package Refactor",
    description: "Split packages into lexer, parser, ast, and runtime modules; isolated control-flow signals and centralizing keywords configuration."
  },
  {
    date: "Jun 2026",
    title: "VS Code Extension v1.2.1",
    description: "Syntax highlighting, snippets, and editor workspace execution integration with robust terminal path auto-discovery."
  },
  {
    date: "Jun 2026",
    title: "Website & Docs Launch",
    description: "Establishing the design system documentation and launching this editorial workspace registry with real-time pipeline visualizers."
  }
]

export function TimelineSection() {
  const EASE_EXPO_OUT = [0.16, 1, 0.3, 1] as const

  return (
    <section className="relative py-24 px-4 overflow-hidden max-w-[var(--rune-max-wide)] mx-auto">
      
      <div className="text-center mb-20 max-w-2xl mx-auto">
        <span className="text-[var(--rune-xs)] font-mono text-[var(--rune-accent)] uppercase tracking-widest">
          Chronology
        </span>
        <h2 className="text-3xl sm:text-4xl font-display font-bold text-[var(--rune-fg-base)] mt-2">
          Engineering Log
        </h2>
        <p className="text-[var(--rune-sm)] text-[var(--rune-fg-muted)] mt-4">
          A historical log of milestones during the construction of the Rune interpreter.
        </p>
      </div>

      <div className="relative w-full flex flex-col items-center">
        
        {/* Timeline main vertical line */}
        <div className="absolute top-0 bottom-0 left-4 md:left-1/2 w-px bg-[var(--rune-border-strong)] -translate-x-1/2" />

        <div className="w-full flex flex-col gap-12">
          {MILESTONES.map((milestone, idx) => {
            const isLeft = idx % 2 === 0

            return (
              <div 
                key={idx} 
                className={cn(
                  "relative w-full flex flex-col md:flex-row items-start md:items-center pl-12 md:pl-0",
                  isLeft ? "md:flex-row-reverse" : "md:flex-row"
                )}
              >
                
                {/* Timeline node circle */}
                <motion.div 
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, ease: EASE_EXPO_OUT }}
                  className="absolute left-4 md:left-1/2 top-1.5 md:top-auto w-3.5 h-3.5 rounded-full border-2 border-[var(--rune-accent)] bg-[#0A0A0B] -translate-x-1/2 z-10 shadow-[0_0_8px_var(--rune-accent-glow)]"
                />

                {/* Milestone spacing block (desktop) */}
                <div className="hidden md:block w-1/2" />

                {/* Milestone card content */}
                <motion.div 
                  initial={{ opacity: 0, x: isLeft ? 30 : -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: EASE_EXPO_OUT }}
                  className="w-full md:w-1/2 md:px-8 flex flex-col"
                >
                  <div className="p-6 rounded-lg border border-[var(--rune-border)] bg-[var(--rune-bg-raised)] hover:border-[var(--rune-border-strong)] transition-all">
                    <span className="text-[10px] font-mono text-[var(--rune-accent)] uppercase font-semibold">
                      {milestone.date}
                    </span>
                    <h3 className="text-base font-display font-bold text-[var(--rune-fg-base)] mt-1.5">
                      {milestone.title}
                    </h3>
                    <p className="text-xs text-[var(--rune-fg-muted)] leading-relaxed mt-2">
                      {milestone.description}
                    </p>
                  </div>
                </motion.div>

              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
