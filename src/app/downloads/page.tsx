"use client"

import * as React from "react"
import { motion } from "motion/react"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { AnnouncementBar } from "@/components/layout/AnnouncementBar"
import { SearchDialog } from "@/components/layout/SearchDialog"
import { Download, Terminal, ExternalLink, CheckCircle2, Circle } from "lucide-react"

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}

export default function DownloadsPage() {
  const EASE_EXPO_OUT = [0.16, 1, 0.3, 1] as const

  const grainStyle = {
    backgroundImage: `url("data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='noiseFilter'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23noiseFilter)'/></svg>")`
  }

  const platforms = [
    { name: "Windows x64", status: "supported", details: "Native Portable Executable (rune.exe)" },
    { name: "Linux x64", status: "planned", details: "Planned standard compile target" },
    { name: "macOS (Apple Silicon)", status: "planned", details: "Planned native executable" },
  ]

  const repos = [
    { name: "Rune Core", desc: "Interpreter, AST, Scanner & REPL CLI", url: "https://github.com/lang-rune/rune" },
    { name: "Rune Website", desc: "Documentation shell & interactive components", url: "https://github.com/lang-rune/website" },
    { name: "VS Code Extension", desc: "Editor syntax highlighting & integration code", url: "https://github.com/lang-rune/vscode" },
  ]

  return (
    <div className="relative min-h-screen bg-[var(--rune-bg-base)] text-[var(--rune-fg-base)] overflow-x-hidden selection:bg-[var(--rune-accent-subtle)] selection:text-[var(--rune-accent)] flex flex-col justify-between">
      
      {/* Grain overlay background layer */}
      <div 
        style={grainStyle}
        className="fixed inset-0 pointer-events-none z-50 mix-blend-overlay opacity-[0.015]" 
      />

      <div className="relative z-40">
        <AnnouncementBar />
        <Header />
      </div>

      <main className="relative z-10 flex-1 max-w-[var(--rune-max-wide)] w-full mx-auto px-4 py-20 flex flex-col gap-16">
        
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-[10px] font-mono text-[var(--rune-accent)] uppercase tracking-widest block mb-2">
            Distribution
          </span>
          <h1 className="text-4xl sm:text-5xl font-display font-bold tracking-tight text-[var(--rune-fg-base)] mb-4">
            Download Rune
          </h1>
          <p className="text-sm text-[var(--rune-fg-muted)] leading-relaxed">
            Get the latest compiler releases, editor integrations, and source packages for Rune.
          </p>
        </div>

        {/* Grid Layout: Main Binary + VS Code */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          
          {/* Main Binary Box */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_EXPO_OUT }}
            className="p-8 rounded-lg border border-[var(--rune-border)] bg-[var(--rune-bg-raised)] flex flex-col justify-between hover:border-[var(--rune-border-strong)] transition-all"
          >
            <div>
              <div className="flex justify-between items-start mb-6">
                <span className="text-[10px] font-mono text-[var(--rune-accent)] uppercase tracking-wider">
                  Compiler Binaries
                </span>
                <span className="text-[9px] font-mono bg-purple-950/20 text-purple-400 border border-purple-900/40 px-2 py-0.5 rounded font-semibold uppercase">
                  v0.2.0 Stable
                </span>
              </div>

              <h2 className="text-2xl font-display font-semibold text-[var(--rune-fg-base)] mb-2">
                Windows Compiler
              </h2>
              <p className="text-xs text-[var(--rune-fg-muted)] leading-relaxed mb-6">
                Rune is compiled as a standalone, native Windows executable file. No Python installation, configuration, or environment setup is required.
              </p>

              <div className="space-y-3 mb-8 text-xs font-mono text-[var(--rune-fg-muted)]">
                <div className="flex justify-between border-b border-[var(--rune-border)] pb-2">
                  <span>Target:</span>
                  <span className="text-[var(--rune-fg-base)]">Windows x64 (64-bit)</span>
                </div>
                <div className="flex justify-between border-b border-[var(--rune-border)] pb-2">
                  <span>Package:</span>
                  <span className="text-[var(--rune-fg-base)]">Portable ZIP Archive</span>
                </div>
                <div className="flex justify-between pb-2">
                  <span>File size:</span>
                  <span className="text-[var(--rune-fg-base)]">~1.2 MB</span>
                </div>
              </div>
            </div>

            <a
              href="https://github.com/lang-rune/rune/releases/download/v0.2.0/rune-v0.2.0-windows-x64.zip"
              className="w-full py-3 px-4 rounded bg-[var(--rune-accent)] text-[#0A0A0B] font-semibold text-xs transition-colors hover:bg-[var(--rune-accent-dim)] flex items-center justify-center gap-2 group outline-none"
            >
              <Download className="size-4 shrink-0 transition-transform group-hover:translate-y-0.5" /> Download Compiler (ZIP)
            </a>
          </motion.div>

          {/* VS Code Extension Box */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6, ease: EASE_EXPO_OUT }}
            className="p-8 rounded-lg border border-[var(--rune-border)] bg-[var(--rune-bg-raised)] flex flex-col justify-between hover:border-[var(--rune-border-strong)] transition-all"
          >
            <div>
              <div className="flex justify-between items-start mb-6">
                <span className="text-[10px] font-mono text-[var(--rune-accent)] uppercase tracking-wider">
                  Editor Extensions
                </span>
                <span className="text-[9px] font-mono bg-blue-950/20 text-blue-400 border border-blue-900/40 px-2 py-0.5 rounded font-semibold uppercase">
                  v1.2.1
                </span>
              </div>

              <h2 className="text-2xl font-display font-semibold text-[var(--rune-fg-base)] mb-2">
                VS Code Extension
              </h2>
              <p className="text-xs text-[var(--rune-fg-muted)] leading-relaxed mb-6">
                Author code files with autocomplete templates, bracket matching, diagnostic scopes, and direct terminal shortcuts.
              </p>

              <div className="space-y-2 text-xs text-[var(--rune-fg-muted)] leading-relaxed mb-8">
                <div className="flex items-center gap-2 text-[var(--rune-fg-base)] font-semibold mb-1">
                  <Terminal className="size-3.5 text-[var(--rune-accent)]" /> Installation:
                </div>
                <p>1. Open extensions panel in VS Code (`Ctrl+Shift+X`).</p>
                <p>2. Search for <span className="text-[var(--rune-fg-base)]">Rune Language</span>.</p>
                <p>3. Click install to activate tooling features.</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 mt-4">
              <a
                href="vscode:extension/kjxcodez.rune"
                className="flex-1 py-2.5 px-4 rounded bg-[var(--rune-accent)] text-[#0A0A0B] font-semibold text-xs transition-colors hover:bg-[var(--rune-accent-dim)] flex items-center justify-center gap-1.5 outline-none text-center"
              >
                Install in VS Code
              </a>
              <a
                href="https://marketplace.visualstudio.com/items?itemName=kjxcodez.rune"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 px-4 rounded border border-[var(--rune-border-strong)] text-[var(--rune-fg-base)] hover:border-[var(--rune-accent)] hover:text-[var(--rune-accent)] transition-all text-xs font-mono flex items-center justify-center gap-1.5 outline-none"
              >
                Marketplace Listing <ExternalLink className="size-3" />
              </a>
            </div>
          </motion.div>

        </div>

        {/* Section: Release Highlights & Platforms */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Release Notes (lg:col-span-7) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <h3 className="text-lg font-display font-semibold text-[var(--rune-fg-base)] border-b border-[var(--rune-border)] pb-3">
              v0.2.0 Release Highlights
            </h3>
            
            <div className="space-y-4 text-xs leading-relaxed text-[var(--rune-fg-muted)]">
              <div className="flex flex-col gap-1">
                <span className="font-semibold text-[var(--rune-fg-base)] font-mono text-[10px] text-[var(--rune-accent)]">
                  » FLEXIBLE BINDINGS
                </span>
                <p>Introduced the `set` keyword as a unified binding token to handle variable definitions and reassignments inside local lexical environment frames.</p>
              </div>

              <div className="flex flex-col gap-1">
                <span className="font-semibold text-[var(--rune-fg-base)] font-mono text-[10px] text-[var(--rune-accent)]">
                  » LEXICAL SCOPE CHAINS
                </span>
                <p>Fully implemented environments stack nesting. Spells successfully preserve a link to the environment frame where they are declared, allowing closures like `make_adder` to resolve parent parameters safely.</p>
              </div>

              <div className="flex flex-col gap-1">
                <span className="font-semibold text-[var(--rune-fg-base)] font-mono text-[10px] text-[var(--rune-accent)]">
                  » EARLY CONTROL SIGNALS
                </span>
                <p>Added `skip` and `stop` keyword operators to provide clean loop skipping and early loop exits inside all loop variations (`while`, `repeat`, `count`).</p>
              </div>
            </div>
          </div>

          {/* Platform Matrix & Source (lg:col-span-5) */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            
            {/* Platforms */}
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-display font-semibold text-[var(--rune-fg-base)] border-b border-[var(--rune-border)] pb-3">
                Platform Support
              </h3>
              
              <div className="space-y-3 font-mono text-xs">
                {platforms.map((p) => (
                  <div
                    key={p.name}
                    className="p-3 rounded border border-[var(--rune-border)] bg-[var(--rune-bg-subtle)] flex items-center justify-between gap-4"
                  >
                    <div>
                      <div className="font-semibold text-[var(--rune-fg-base)]">{p.name}</div>
                      <div className="text-[10px] text-[var(--rune-fg-muted)] mt-0.5">{p.details}</div>
                    </div>
                    {p.status === "supported" ? (
                      <span className="text-[9px] bg-green-950/20 text-green-400 border border-green-900/40 px-2 py-0.5 rounded font-semibold uppercase flex items-center gap-1">
                        <CheckCircle2 className="size-3" /> Ready
                      </span>
                    ) : (
                      <span className="text-[9px] bg-[var(--rune-bg-overlay)] text-[var(--rune-fg-faint)] border border-[var(--rune-border-strong)] px-2 py-0.5 rounded font-semibold uppercase flex items-center gap-1">
                        <Circle className="size-3" /> Planned
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Source repositories */}
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-display font-semibold text-[var(--rune-fg-base)] border-b border-[var(--rune-border)] pb-3">
                Source Repositories
              </h3>
              
              <div className="grid grid-cols-1 gap-3">
                {repos.map((repo) => (
                  <a
                    key={repo.name}
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3.5 rounded border border-[var(--rune-border)] bg-[var(--rune-bg-raised)] hover:bg-[var(--rune-bg-overlay)] hover:border-[var(--rune-accent)] transition-all flex items-start gap-3 group outline-none"
                  >
                    <GithubIcon className="size-4 shrink-0 text-[var(--rune-fg-muted)] group-hover:text-[var(--rune-accent)] transition-colors mt-0.5" />
                    <div>
                      <div className="text-xs font-mono font-semibold text-[var(--rune-fg-base)] flex items-center gap-1.5">
                        {repo.name} <ExternalLink className="size-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="text-[10px] text-[var(--rune-fg-muted)] mt-1">
                        {repo.desc}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

          </div>

        </div>

      </main>

      <SearchDialog />
      <Footer />

    </div>
  )
}
