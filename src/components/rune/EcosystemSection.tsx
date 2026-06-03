"use client"

import * as React from "react"
import { motion } from "motion/react"
import { ExternalLink } from "lucide-react"

interface RepoCard {
  title: string
  subtitle: string
  desc: string
  link: string
}

const REPOS: RepoCard[] = [
  {
    title: "rune-core",
    subtitle: "Core Language Interpreter",
    desc: "The central repository containing the hand-rolled tokenizer, recursive-descent parser, AST nodes, evaluator, and terminal shell (REPL).",
    link: "https://github.com/lang-rune/rune"
  },
  {
    title: "rune-website",
    subtitle: "Documentation & Guides",
    desc: "The codebase of this web portal, built with Next.js, Tailwind v4, and MDX. Integrates custom design tokens and interactive scopes.",
    link: "https://github.com/lang-rune/website"
  },
  {
    title: "rune-vscode",
    subtitle: "VS Code Language Extension",
    desc: "The VS Code tooling extension providing syntax highlighting configurations, brace completions, and local editor workspace support.",
    link: "https://github.com/lang-rune/vscode"
  }
]

export function EcosystemSection() {
  const EASE_EXPO_OUT = [0.16, 1, 0.3, 1] as const

  return (
    <section className="relative py-24 px-4 overflow-hidden max-w-[var(--rune-max-wide)] mx-auto">
      
      <div className="text-center mb-16 max-w-2xl mx-auto">
        <span className="text-[var(--rune-xs)] font-mono text-[var(--rune-accent)] uppercase tracking-widest">
          Collaboration
        </span>
        <h2 className="text-3xl sm:text-4xl font-display font-bold text-[var(--rune-fg-base)] mt-2">
          Open Source Ecosystem
        </h2>
        <p className="text-[var(--rune-sm)] text-[var(--rune-fg-muted)] mt-4">
          Explore the repositories that make up the Rune ecosystem. Read, fork, and write.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {REPOS.map((repo, idx) => (
          <motion.div
            key={repo.title}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: idx * 0.05, duration: 0.6, ease: EASE_EXPO_OUT }}
            className="group p-6 rounded-lg border border-[var(--rune-border)] bg-[var(--rune-bg-raised)] hover:border-[var(--rune-accent-dim)] transition-all flex flex-col justify-between min-h-[220px]"
          >
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-mono font-bold text-[var(--rune-accent)] flex items-center gap-1.5">
                  <svg className="size-4 text-[var(--rune-fg-base)] fill-current" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg> {repo.title}
                </span>
                <span className="text-[10px] font-mono text-[var(--rune-fg-faint)] bg-[var(--rune-bg-subtle)] px-2 py-0.5 rounded border border-[var(--rune-border)]">
                  Public repo
                </span>
              </div>
              
              <h3 className="text-base font-display font-bold text-[var(--rune-fg-base)] mb-2">
                {repo.subtitle}
              </h3>
              
              <p className="text-xs text-[var(--rune-fg-muted)] leading-relaxed">
                {repo.desc}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[var(--rune-border)] flex items-center justify-between">
              <span className="text-[10px] font-mono text-[var(--rune-fg-muted)] group-hover:text-[var(--rune-fg-base)] transition-colors">
                View Source Files
              </span>
              <a
                href={repo.link}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded border border-[var(--rune-border-strong)] text-[var(--rune-fg-muted)] group-hover:border-[var(--rune-accent)] group-hover:text-[var(--rune-accent)] bg-transparent transition-all"
              >
                <ExternalLink className="size-3.5" />
              </a>
            </div>

          </motion.div>
        ))}
      </div>
    </section>
  )
}
