"use client"

import * as React from "react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const steps = [
  { label: "Source", description: "Raw Rune source code text" },
  { label: "Lexer", description: "Tokenizes source into a stream of tokens" },
  { label: "Parser", description: "Pratt parser builds an Abstract Syntax Tree" },
  { label: "AST", description: "Tree representation of the program structure" },
  { label: "Evaluator", description: "Tree-walk interpreter executes the AST" },
  { label: "Value", description: "Final computed result" },
]

interface RuneArchitectureDiagramProps {
  className?: string
}

export function RuneArchitectureDiagram({
  className,
}: RuneArchitectureDiagramProps) {
  return (
    <TooltipProvider>
      <div className={cn("flex flex-col items-center gap-0", className)}>
        {steps.map((step, i) => (
          <React.Fragment key={step.label}>
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: i * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  viewport={{ once: true }}
                  className="flex items-center justify-center w-48 py-3 px-5 rounded-[var(--rune-radius-md)] border border-[var(--rune-border)] bg-[var(--rune-bg-raised)] text-sm font-mono text-[var(--rune-fg-base)] cursor-default transition-all duration-200 hover:border-[var(--rune-accent)] hover:shadow-[0_0_0_3px_var(--rune-accent-glow)]"
                >
                  {step.label}
                </motion.div>
              </TooltipTrigger>
              <TooltipContent>{step.description}</TooltipContent>
            </Tooltip>
            {i < steps.length - 1 && (
              <motion.div
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                transition={{
                  duration: 0.3,
                  delay: i * 0.08 + 0.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
                viewport={{ once: true }}
                className="w-px h-8 bg-[var(--rune-border-strong)] origin-top"
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </TooltipProvider>
  )
}
