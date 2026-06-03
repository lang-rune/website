"use client"

import * as React from "react"
import { motion } from "motion/react"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { AnnouncementBar } from "@/components/layout/AnnouncementBar"
import { SearchDialog } from "@/components/layout/SearchDialog"
import { Layers, Rocket, Zap, Heart } from "lucide-react"

interface Milestone {
  phase: string
  title: string
  status: "completed" | "in-progress" | "planned"
  icon: React.ReactNode
  description: string
}

const MILESTONES: Milestone[] = [
  {
    phase: "Phase 1: Basic Interpreter",
    title: "Tree-Walk Evaluator & Closures",
    status: "completed",
    icon: <Layers className="size-4" />,
    description: "Hand-rolled scanner, recursive-descent expression parser, scope resolver checking binding depth, and evaluation stack executing syntax trees directly."
  },
  {
    phase: "Phase 2: Compiler Optimizer",
    title: "Abstract Tree Folding Pass",
    status: "in-progress",
    icon: <Zap className="size-4" />,
    description: "Integrating static analysis passes to optimize AST structures: folding math operations, dead path checking, and tracking scoping variables before evaluation."
  },
  {
    phase: "Phase 3: Bytecode VM",
    title: "Virtual Machine Execution",
    status: "planned",
    icon: <Rocket className="size-4" />,
    description: "Migrating from raw tree-walking evaluation to a stack-based VM. Compiling the AST to bytecode instructions for faster loops."
  },
  {
    phase: "Phase 4: Ecosystem & Tooling",
    title: "Language Server Protocol (LSP)",
    status: "planned",
    icon: <Heart className="size-4" />,
    description: "Extending the VS Code plugin to support autocompletions, diagnostics, and hover definition highlights using a custom LSP server written in Rust."
  }
]

export default function RoadmapPage() {
  const EASE_EXPO_OUT = [0.16, 1, 0.3, 1] as const

  const grainStyle = {
    backgroundImage: `url("data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='noiseFilter'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23noiseFilter)'/></svg>")`
  }

  return (
    <div className="relative min-h-screen bg-[var(--rune-bg-base)] text-[var(--rune-fg-base)] overflow-x-hidden selection:bg-[var(--rune-accent-subtle)] selection:text-[var(--rune-accent)] flex flex-col justify-between">
      
      {/* 1. Grain overlay background layer */}
      <div 
        style={grainStyle}
        className="fixed inset-0 pointer-events-none z-50 mix-blend-overlay opacity-[0.015]" 
      />

      {/* Header and announcement elements */}
      <div className="relative z-40">
        <AnnouncementBar />
        <Header />
      </div>

      {/* Main Roadmap Contents */}
      <main className="relative z-10 flex-1 max-w-[var(--rune-max-content)] mx-auto px-4 py-20">
        
        {/* Typographic page header */}
        <div className="text-center mb-16">
          <span className="text-[10px] font-mono text-[var(--rune-accent)] uppercase tracking-widest block mb-2">
            Progression
          </span>
          <h1 className="text-4xl sm:text-5xl font-display font-bold tracking-tight text-[var(--rune-fg-base)] mb-4">
            Rune Roadmap
          </h1>
          <p className="text-sm text-[var(--rune-fg-muted)] leading-relaxed">
            The evolution checklist of a handcrafted language. Following compiler fundamentals step-by-step.
          </p>
        </div>

        {/* Milestone stack list */}
        <div className="relative border-l border-[var(--rune-border-strong)] pl-6 space-y-12 ml-2">
          
          {MILESTONES.map((stone, idx) => (
            <motion.div
              key={stone.phase}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: idx * 0.1, duration: 0.8, ease: EASE_EXPO_OUT }}
              className="relative flex flex-col gap-2 group"
            >
              {/* Timeline indicator node */}
              <div className="absolute -left-9 top-1 w-6 h-6 rounded-full border border-[var(--rune-border-strong)] bg-[var(--rune-bg-raised)] flex items-center justify-center text-[var(--rune-fg-muted)] group-hover:border-[var(--rune-accent)] group-hover:text-[var(--rune-accent)] transition-all">
                {stone.icon}
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <span className="text-[10px] font-mono text-[var(--rune-fg-faint)] uppercase">
                  {stone.phase}
                </span>
                
                {/* Status badges */}
                {stone.status === "completed" && (
                  <span className="text-[9px] font-mono bg-green-950/20 text-green-400 border border-green-900/40 px-1.5 py-0.2 rounded font-semibold uppercase tracking-wider">
                    Completed
                  </span>
                )}
                {stone.status === "in-progress" && (
                  <span className="text-[9px] font-mono bg-amber-950/20 text-[var(--rune-accent)] border border-[var(--rune-accent-dim)] px-1.5 py-0.2 rounded font-semibold uppercase tracking-wider animate-pulse">
                    Active Pass
                  </span>
                )}
                {stone.status === "planned" && (
                  <span className="text-[9px] font-mono bg-[var(--rune-bg-subtle)] text-[var(--rune-fg-faint)] border border-[var(--rune-border)] px-1.5 py-0.2 rounded font-semibold uppercase tracking-wider">
                    Planned
                  </span>
                )}
              </div>

              <h2 className="text-xl font-display font-semibold text-[var(--rune-fg-base)] group-hover:text-[var(--rune-accent)] transition-colors mt-1">
                {stone.title}
              </h2>
              
              <p className="text-xs text-[var(--rune-fg-muted)] leading-relaxed mt-1.5">
                {stone.description}
              </p>
            </motion.div>
          ))}

        </div>

      </main>

      {/* Persistent global dialog modal container */}
      <SearchDialog />

      {/* Global footer layout */}
      <Footer />

    </div>
  )
}
