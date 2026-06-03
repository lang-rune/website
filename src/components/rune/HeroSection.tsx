"use client"

import * as React from "react"
import { motion, AnimatePresence } from "motion/react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"

export function HeroSection() {
  const [phase, setPhase] = React.useState<"glyph" | "code" | "tokens" | "reveal">("glyph")
  const [typedCode, setTypedCode] = React.useState("")
  const fullCode = 'write("hello explorer")'

  React.useEffect(() => {
    if (phase === "glyph") {
      const timer = setTimeout(() => setPhase("code"), 1800)
      return () => clearTimeout(timer)
    }

    if (phase === "code") {
      let index = 0
      const interval = setInterval(() => {
        setTypedCode(fullCode.slice(0, index + 1))
        index++
        if (index >= fullCode.length) {
          clearInterval(interval)
          setTimeout(() => setPhase("tokens"), 800)
        }
      }, 70)
      return () => clearInterval(interval)
    }

    if (phase === "tokens") {
      const timer = setTimeout(() => setPhase("reveal"), 2000)
      return () => clearTimeout(timer)
    }
  }, [phase])

  // Easing presets
  const EASE_EXPO_OUT = [0.16, 1, 0.3, 1] as const

  return (
    <section className="relative flex flex-col items-center justify-center min-h-[90vh] py-20 px-4 overflow-hidden">
      <div className="w-full max-w-[720px] flex flex-col items-center text-center z-10">

        {/* Phase 1: Interactive Glyph Logo */}
        <div className="relative mb-8 h-20 w-20 flex items-center justify-center">
          <svg
            viewBox="0 0 100 100"
            className="w-16 h-16 stroke-[var(--rune-accent)] fill-none"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <motion.path
              d="M 35 15 L 35 85 M 35 15 L 70 32.5 L 35 50 M 35 50 L 70 85"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                duration: 1.5,
                ease: "easeInOut",
              }}
            />
          </svg>

          {/* Subtle surrounding glow ring */}
          <motion.div
            className="absolute inset-0 rounded-full border border-[var(--rune-accent-dim)] opacity-20"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1.1, opacity: 0.15 }}
            transition={{ duration: 2, ease: EASE_EXPO_OUT }}
          />
        </div>

        {/* Phase 2 & 3: Interactive Terminal Code Simulator */}
        <div className="w-full max-w-sm mb-12 rounded-lg border border-[var(--rune-border)] bg-[var(--rune-bg-raised)] p-4 min-h-[100px] flex flex-col justify-center relative font-mono text-left text-xs">
          <div className="absolute top-2 left-3 flex gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[var(--rune-border-strong)]" />
            <span className="w-2 h-2 rounded-full bg-[var(--rune-border-strong)]" />
            <span className="w-2 h-2 rounded-full bg-[var(--rune-border-strong)]" />
          </div>

          <div className="mt-2 pl-1 select-none">
            {phase === "code" && (
              <span className="text-[var(--rune-fg-base)]">
                {typedCode}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="inline-block w-1.5 h-3 bg-[var(--rune-accent)] ml-0.5"
                />
              </span>
            )}

            {phase === "tokens" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-wrap gap-2 items-center"
              >
                <span className="px-1.5 py-0.5 rounded border border-[var(--rune-accent-dim)] bg-[var(--rune-accent-subtle)] text-[var(--rune-accent)] font-semibold scale-95 transition-all">
                  KEYWORD(write)
                </span>
                <span className="text-[var(--rune-fg-muted)]">(</span>
                <span className="px-1.5 py-0.5 rounded border border-green-900/50 bg-green-950/20 text-[var(--rune-success)] scale-95">
                  WORD(&quot;hello explorer&quot;)
                </span>
                <span className="text-[var(--rune-fg-muted)]">)</span>
              </motion.div>
            )}

            {phase === "reveal" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-[var(--rune-fg-muted)] leading-relaxed"
              >
                <div className="text-[var(--rune-fg-base)]">{'write("hello explorer")'}</div>
                <div className="text-green-500/80 mt-1">✓ Lexed & parsed in 0.1ms</div>
                <div className="text-[var(--rune-accent)] font-semibold mt-1">» hello explorer</div>
              </motion.div>
            )}

            {phase === "glyph" && (
              <span className="text-[var(--rune-fg-faint)] italic select-none">Initializing compilation loop...</span>
            )}
          </div>
        </div>

        {/* Phase 4: Main Headline & Actions Reveal */}
        <AnimatePresence>
          {phase === "reveal" && (
            <motion.div
              initial="hidden"
              animate="show"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: { staggerChildren: 0.25 }
                }
              }}
              className="flex flex-col items-center"
            >
              <motion.h1
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.8, ease: EASE_EXPO_OUT }}
                className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--rune-fg-base)] leading-none text-wrap-balance mb-6"
              >
                A language built because someone wanted to know how.
              </motion.h1>

              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  show: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.8, ease: EASE_EXPO_OUT }}
                className="text-base sm:text-lg text-[var(--rune-fg-muted)] leading-relaxed max-w-lg mb-10"
              >
                Rune is a handcrafted programming language written to explore variables, environment chains, expression parsing, and execution. Built for study, not scale.
              </motion.p>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  show: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.8, ease: EASE_EXPO_OUT }}
                className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full"
              >
                <Button asChild className="w-full sm:w-auto bg-[var(--rune-accent)] text-[#0A0A0B] hover:bg-[var(--rune-accent-dim)] font-semibold transition-all text-background">
                  <a href="https://github.com/lang-rune/rune" target="_blank" rel="noopener noreferrer">
                    Explore the Source <ArrowRightIcon className="ml-1.5 size-4" />
                  </a>
                </Button>
                <Button asChild variant="outline" className="w-full sm:w-auto border-[var(--rune-border-strong)] text-[var(--rune-fg-base)] hover:border-[var(--rune-accent)] hover:text-[var(--rune-accent)]">
                  <Link href="/docs">
                    Read the Docs
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
