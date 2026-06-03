"use client"

import * as React from "react"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"
import { ArrowRight, RotateCcw } from "lucide-react"

interface ExecutionStep {
  label: string
  codeLines: number[] // 1-indexed lines to highlight
  globalEnv: { name: string; val: string }[]
  closureEnv: { name: string; val: string }[] | null
  activeReturn: string | null
  explanation: string
}

const STEPS: ExecutionStep[] = [
  {
    label: "1. Declaration",
    codeLines: [1, 2, 3, 4, 5, 6, 7, 8],
    globalEnv: [{ name: "makeCounter", val: "spell()" }],
    closureEnv: null,
    activeReturn: null,
    explanation: "The compiler registers the global function template `makeCounter` in the Global Scope environment table. No variables are executed yet."
  },
  {
    label: "2. Allocation",
    codeLines: [10],
    globalEnv: [
      { name: "makeCounter", val: "spell()" },
      { name: "counter", val: "spell(countUp)" }
    ],
    closureEnv: [{ name: "count", val: "0" }],
    activeReturn: "countUp Function pointer",
    explanation: "Executing `makeCounter()` spawns a unique local environment scope frame. Inside it, `count` is initialized to `0`. A reference to `countUp` is returned, keeping this environment alive."
  },
  {
    label: "3. First Call",
    codeLines: [11],
    globalEnv: [
      { name: "makeCounter", val: "spell()" },
      { name: "counter", val: "spell(countUp)" }
    ],
    closureEnv: [{ name: "count", val: "1" }],
    activeReturn: "1",
    explanation: "Calling `counter()` executes the inner `countUp` spell. It climbs the environment chain to find `count` in the parent frame, increments it from `0` to `1`, and returns `1`."
  },
  {
    label: "4. Mutation",
    codeLines: [12],
    globalEnv: [
      { name: "makeCounter", val: "spell()" },
      { name: "counter", val: "spell(countUp)" }
    ],
    closureEnv: [{ name: "count", val: "2" }],
    activeReturn: "2",
    explanation: "Calling `counter()` a second time accesses the exact same closure environment frame. It increments the existing value of `count` from `1` to `2`, returning `2`."
  }
]

const CODE_LINES = [
  "spell makeCounter() {",
  "  let count = 0;",
  "  spell countUp() {",
  "    count = count + 1;",
  "    return count;",
  "  }",
  "  return countUp;",
  "}",
  "",
  "let counter = makeCounter();",
  "counter(); // 1",
  "counter(); // 2"
]

export function ClosureExplorerSection() {
  const [currentStep, setCurrentStep] = React.useState<number>(0)

  const handleNext = () => {
    setCurrentStep((prev) => (prev < STEPS.length - 1 ? prev + 1 : prev))
  }

  const handlePrev = () => {
    setCurrentStep((prev) => (prev > 0 ? prev - 1 : prev))
  }

  const handleReset = () => {
    setCurrentStep(0)
  }

  const stepData = STEPS[currentStep]

  return (
    <section className="relative py-24 px-4 overflow-hidden max-w-[var(--rune-max-wide)] mx-auto">
      
      <div className="text-center mb-16 max-w-2xl mx-auto">
        <span className="text-[var(--rune-xs)] font-mono text-[var(--rune-accent)] uppercase tracking-widest">
          Language Internals
        </span>
        <h2 className="text-3xl sm:text-4xl font-display font-bold text-[var(--rune-fg-base)] mt-2">
          Closure Scope Explorer
        </h2>
        <p className="text-[var(--rune-sm)] text-[var(--rune-fg-muted)] mt-4">
          Closures hold reference links to parent variables. Click through the step-by-step simulator to visualize the memory allocation changes.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* CODE HIGHLIGHTER (Left Column) */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          <div className="rounded-lg border border-[var(--rune-border)] bg-[var(--rune-bg-raised)] overflow-hidden flex flex-col h-full justify-between">
            
            {/* Window header */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-[var(--rune-border)] bg-[var(--rune-bg-overlay)]">
              <span className="text-xs font-mono text-[var(--rune-fg-muted)] flex items-center gap-1.5">
                closure_test.rn
              </span>
              <div className="flex gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--rune-border-strong)]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--rune-border-strong)]" />
              </div>
            </div>

            {/* Code rows */}
            <div className="p-6 font-mono text-[13px] leading-relaxed text-[var(--rune-fg-base)] flex-1">
              {CODE_LINES.map((line, idx) => {
                const lineNum = idx + 1
                const isHighlighted = stepData.codeLines.includes(lineNum)
                return (
                  <div
                    key={idx}
                    className={cn(
                      "px-2 py-0.5 rounded transition-colors duration-200 flex gap-4",
                      isHighlighted 
                        ? "bg-[var(--rune-accent-subtle)] text-[var(--rune-fg-base)] border-l-2 border-[var(--rune-accent)]" 
                        : "text-[var(--rune-fg-muted)]"
                    )}
                  >
                    <span className="text-[var(--rune-fg-faint)] select-none text-[10px] w-4 text-right">
                      {lineNum}
                    </span>
                    <pre className="whitespace-pre">{line}</pre>
                  </div>
                )
              })}
            </div>

            {/* Simulator controls */}
            <div className="px-6 py-4 border-t border-[var(--rune-border)] bg-[var(--rune-bg-overlay)] flex items-center justify-between gap-4">
              <div className="text-xs font-mono text-[var(--rune-fg-muted)]">
                Step {currentStep + 1} of {STEPS.length}
              </div>
              <div className="flex gap-2">
                {currentStep > 0 ? (
                  <button
                    onClick={handlePrev}
                    className="px-3 py-1.5 text-xs font-mono border border-[var(--rune-border-strong)] hover:border-[var(--rune-fg-base)] rounded text-[var(--rune-fg-base)] transition-all"
                  >
                    Back
                  </button>
                ) : (
                  <div className="w-[50px]" />
                )}
                
                {currentStep < STEPS.length - 1 ? (
                  <button
                    onClick={handleNext}
                    className="px-4 py-1.5 text-xs font-mono bg-[var(--rune-accent)] text-[#0A0A0B] hover:bg-[var(--rune-accent-dim)] font-semibold rounded transition-all flex items-center gap-1"
                  >
                    Next <ArrowRight className="size-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={handleReset}
                    className="px-4 py-1.5 text-xs font-mono border border-[var(--rune-accent)] text-[var(--rune-accent)] hover:bg-[var(--rune-accent-subtle)] rounded transition-all flex items-center gap-1.5"
                  >
                    <RotateCcw className="size-3.5" /> Reset
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* ENVIRONMENT CANVAS VISUALIZATION (Right Column) */}
        <div className="lg:col-span-6 flex flex-col gap-4 justify-between">
          <div className="rounded-lg border border-[var(--rune-border)] bg-[var(--rune-bg-raised)] p-6 flex-1 flex flex-col gap-6 relative justify-center min-h-[300px]">
            
            {/* Global Scope Frame */}
            <div className="p-4 rounded border border-[var(--rune-border-strong)] bg-[var(--rune-bg-subtle)] flex flex-col gap-2">
              <div className="text-xs font-mono font-semibold text-[var(--rune-fg-base)] flex justify-between">
                <span>Global Scope Environment</span>
                <span className="text-[10px] text-[var(--rune-fg-faint)]">Parent: None</span>
              </div>
              <div className="space-y-1.5 border-t border-[var(--rune-border)] pt-2 mt-1">
                {stepData.globalEnv.map((v) => (
                  <div key={v.name} className="flex justify-between text-xs font-mono">
                    <span className="text-[var(--rune-accent)]">{v.name}</span>
                    <span className="text-[var(--rune-fg-base)]">{v.val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Closure Scope Frame (Conditional) */}
            <AnimatePresence mode="wait">
              {stepData.closureEnv && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="p-4 rounded border border-[var(--rune-accent-dim)] bg-[var(--rune-accent-subtle)] flex flex-col gap-2 relative"
                >
                  {/* Scope connection pointer line */}
                  <div className="absolute -top-6 left-1/4 w-px h-6 bg-dashed bg-[var(--rune-accent-dim)]" />
                  
                  <div className="text-xs font-mono font-semibold text-[var(--rune-accent)] flex justify-between">
                    <span>makeCounter Closure Environment</span>
                    <span className="text-[10px] text-[var(--rune-accent-dim)]">Parent: Global</span>
                  </div>
                  <div className="space-y-1.5 border-t border-amber-900/30 pt-2 mt-1">
                    {stepData.closureEnv.map((v) => (
                      <div key={v.name} className="flex justify-between text-xs font-mono">
                        <span className="text-[var(--rune-fg-base)] font-bold">{v.name}</span>
                        <motion.span
                          key={v.val}
                          initial={{ scale: 1.2, color: "#D4A24C" }}
                          animate={{ scale: 1, color: "#E8E8EE" }}
                          className="font-bold font-mono"
                        >
                          {v.val}
                        </motion.span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Evaluation Return Output */}
            {stepData.activeReturn && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-3 bg-black border border-neutral-900 rounded text-xs font-mono flex justify-between items-center text-[var(--rune-fg-muted)]"
              >
                <span>Active Expression Return Value:</span>
                <span className="text-[var(--rune-success)] font-semibold">{stepData.activeReturn}</span>
              </motion.div>
            )}

          </div>

          {/* Explanation box */}
          <div className="p-4 rounded-lg border border-[var(--rune-border)] bg-[var(--rune-bg-overlay)] text-xs text-[var(--rune-fg-muted)] leading-relaxed">
            <span className="text-[var(--rune-accent)] font-semibold font-mono block mb-1">
              EXPLANATION:
            </span>
            {stepData.explanation}
          </div>
        </div>

      </div>
    </section>
  )
}
