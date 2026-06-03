"use client"

import * as React from "react"
import { motion } from "motion/react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function FooterCTASection() {
  const EASE_EXPO_OUT = [0.16, 1, 0.3, 1] as const

  return (
    <section className="relative py-24 px-4 overflow-hidden border-t border-[var(--rune-border)] bg-[var(--rune-bg-raised)]">
      <div className="max-w-[720px] mx-auto text-center flex flex-col items-center">
        
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE_EXPO_OUT }}
          className="mb-8"
        >
          <span className="text-[10px] font-mono text-[var(--rune-accent)] uppercase tracking-widest block mb-2">
            Conclusion
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-semibold text-[var(--rune-fg-base)]">
            Explore compiler internals.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.8, ease: EASE_EXPO_OUT }}
          className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full"
        >
          <Button asChild variant="outline" className="w-full sm:w-auto border-[var(--rune-border-strong)] text-[var(--rune-fg-base)] hover:border-[var(--rune-accent)] hover:text-[var(--rune-accent)]">
            <Link href="/docs">
              Read the Docs
            </Link>
          </Button>

          <Button asChild variant="outline" className="w-full sm:w-auto border-[var(--rune-border-strong)] text-[var(--rune-fg-base)] hover:border-[var(--rune-accent)] hover:text-[var(--rune-accent)]">
            <a href="https://github.com/lang-rune/rune" target="_blank" rel="noopener noreferrer">
              Explore the Source
            </a>
          </Button>

          <Button asChild variant="outline" className="w-full sm:w-auto border-[var(--rune-border-strong)] text-[var(--rune-fg-base)] hover:border-[var(--rune-accent)] hover:text-[var(--rune-accent)]">
            <Link href="/docs/reference/design-system">
              Understand How It Works
            </Link>
          </Button>
        </motion.div>

        <div className="mt-16 text-[10px] font-mono text-[var(--rune-fg-faint)] select-none">
          © {new Date().getFullYear()} Rune Lang. Built by hand with pride.
        </div>

      </div>
    </section>
  )
}
