"use client"

import * as React from "react"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"
import { Cpu, FileCode, Layers, Play, Settings } from "lucide-react"

interface PipelineStage {
  id: string
  title: string
  icon: React.ReactNode
  description: string
  details: string
}

const PIPELINE_STAGES: PipelineStage[] = [
  {
    id: "lexer",
    title: "01. The Lexer",
    icon: <Settings className="size-5" />,
    description: "Converts raw characters into syntax tokens.",
    details: "Written completely by hand, the lexer scans the source file character-by-character, identifying keywords (like 'spell'), symbols, literals, and identifiers while discarding whitespace and comments."
  },
  {
    id: "parser",
    title: "02. The Parser",
    icon: <FileCode className="size-5" />,
    description: "Constructs tree expressions enforcing rules.",
    details: "A hand-written recursive-descent parser that consumes token sequences from the Lexer and constructs a tree of abstract syntax nodes (AST), enforcing operator precedence and grammatical structures."
  },
  {
    id: "ast",
    title: "03. The AST Node Trees",
    icon: <Layers className="size-5" />,
    description: "The syntactic map of the parsed program.",
    details: "A formal hierarchy of syntax node structures representing declarations, loops, scopes, and calls. Contains zero runtime implementation logic — only pure structured grammar representation."
  },
  {
    id: "interpreter",
    title: "04. The Interpreter",
    icon: <Play className="size-5" />,
    description: "Evaluates syntax nodes recursively.",
    details: "A classic tree-walk evaluator that recursively visits AST nodes, resolving expression results, mapping controls, and modifying environment variable mappings directly."
  },
  {
    id: "environment",
    title: "05. The Environment Stack",
    icon: <Cpu className="size-5" />,
    description: "Resolves scope values and closures.",
    details: "Manages key-value memory mapping states. Forms parent-child link chains to implement lexical scopes correctly, allowing functions to preserve pointers to the variables in their outer definitions."
  }
]

export function ArchitecturePipelineSection() {
  const [hoveredStage, setHoveredStage] = React.useState<string | null>(null)
  const [activeStage, setActiveStage] = React.useState<string>("lexer")

  return (
    <section className="relative py-24 px-4 overflow-hidden max-w-[var(--rune-max-wide)] mx-auto">
      <div className="text-center mb-16 max-w-2xl mx-auto">
        <span className="text-[var(--rune-xs)] font-mono text-[var(--rune-accent)] uppercase tracking-widest">
          Architecture
        </span>
        <h2 className="text-3xl sm:text-4xl font-display font-bold text-[var(--rune-fg-base)] mt-2">
          The Interpreter Pipeline
        </h2>
        <p className="text-[var(--rune-sm)] text-[var(--rune-fg-muted)] mt-4">
          Hover over each architectural stage of the compiler stack to inspect its structural role in the execution flow.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* PIPELINE VISUAL FLOW (Left Column) */}
        <div className="lg:col-span-6 flex flex-col items-center gap-0 relative">
          
          {/* Vertical connecting line background */}
          <div className="absolute top-8 bottom-8 left-1/2 w-px bg-[var(--rune-border-strong)] -translate-x-1/2 z-0" />

          {PIPELINE_STAGES.map((stage, i) => {
            const isHovered = hoveredStage === stage.id
            const isActive = activeStage === stage.id
            const isDimmed = hoveredStage !== null && hoveredStage !== stage.id

            return (
              <React.Fragment key={stage.id}>
                <motion.div
                  onMouseEnter={() => {
                    setHoveredStage(stage.id)
                    setActiveStage(stage.id)
                  }}
                  onMouseLeave={() => setHoveredStage(null)}
                  onClick={() => setActiveStage(stage.id)}
                  className={cn(
                    "relative z-10 w-full max-w-xs p-4 rounded-lg border bg-[var(--rune-bg-raised)] cursor-pointer select-none transition-all duration-300",
                    isHovered || isActive
                      ? "border-[var(--rune-accent)] shadow-[0_0_15px_var(--rune-accent-glow)]"
                      : "border-[var(--rune-border)]",
                    isDimmed ? "opacity-40 scale-95" : "opacity-100 scale-100"
                  )}
                  whileHover={{ y: -2 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "p-2 rounded border transition-colors",
                      isHovered || isActive
                        ? "border-[var(--rune-accent-dim)] bg-[var(--rune-accent-subtle)] text-[var(--rune-accent)]"
                        : "border-[var(--rune-border-strong)] bg-[var(--rune-bg-subtle)] text-[var(--rune-fg-muted)]"
                    )}>
                      {stage.icon}
                    </div>
                    <div>
                      <h3 className="text-sm font-mono font-semibold text-[var(--rune-fg-base)]">
                        {stage.title}
                      </h3>
                      <p className="text-[11px] text-[var(--rune-fg-muted)] mt-0.5">
                        {stage.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
                
                {/* Connecting arrow indicator between nodes */}
                {i < PIPELINE_STAGES.length - 1 && (
                  <div className="h-10 w-px select-none pointer-events-none" />
                )}
              </React.Fragment>
            )
          })}
        </div>

        {/* DETAILS POP PANEL (Right Column) */}
        <div className="lg:col-span-6 w-full">
          <div className="h-full min-h-[280px] p-8 rounded-lg border border-[var(--rune-border)] bg-[var(--rune-bg-raised)] relative flex flex-col justify-center">
            
            {/* Ambient decorative glowing corner */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--rune-accent-subtle)] blur-2xl rounded-bl-full select-none pointer-events-none" />

            <AnimatePresence mode="wait">
              {PIPELINE_STAGES.map((stage) => {
                if (stage.id !== activeStage) return null

                return (
                  <motion.div
                    key={stage.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col gap-4"
                  >
                    <span className="text-[10px] font-mono text-[var(--rune-accent)] tracking-widest uppercase">
                      Compiler Stage Specification
                    </span>
                    <h4 className="text-2xl font-display font-semibold text-[var(--rune-fg-base)]">
                      {stage.title.split(". ")[1]}
                    </h4>
                    <div className="w-8 h-0.5 bg-[var(--rune-accent-dim)]" />
                    <p className="text-sm text-[var(--rune-fg-muted)] leading-relaxed">
                      {stage.details}
                    </p>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  )
}
