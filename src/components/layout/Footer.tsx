import * as React from "react"
import Link from "next/link"
import { LogoLink } from "./LogoLink"

export function Footer() {
  const currentYear = new Date().getFullYear()

  const columns = [
    {
      title: "Rune",
      links: [
        { label: "Documentation", url: "/docs/getting-started/introduction" },
        { label: "Compiler Roadmap", url: "/roadmap" },
        { label: "Language Guide", url: "/docs/language-guide/variables" },
      ]
    },
    {
      title: "Website",
      links: [
        { label: "Design System Spec", url: "/docs/reference/design-system" },
        { label: "Changelog logs", url: "/roadmap" },
        { label: "Issue Feedback", url: "https://github.com/lang-rune/rune/issues" },
      ]
    },
    {
      title: "VS Code",
      links: [
        { label: "Tooling Extension", url: "https://github.com/lang-rune/vscode" },
        { label: "Source files", url: "https://github.com/lang-rune/vscode" },
        { label: "Installation Guide", url: "https://github.com/lang-rune/vscode" },
      ]
    }
  ]

  return (
    <footer className="w-full bg-[var(--rune-bg-raised)] border-t border-[var(--rune-border)] px-6 py-12 select-none relative z-10 transition-colors duration-200">
      <div className="max-w-[var(--rune-max-wide)] mx-auto flex flex-col gap-10">
        
        {/* Top: Columns & Logo */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-8 items-start">
          
          {/* Brand Column (md:col-span-4) */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <LogoLink variant="footer" />
            <p className="text-xs text-[var(--rune-fg-muted)] leading-relaxed max-w-xs">
              A handcrafted, interpreted programming language built for learning, exploration, and the pure joy of language construction.
            </p>
          </div>

          {/* Links Columns (md:col-span-8) */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-6">
            {columns.map((col) => (
              <div key={col.title} className="flex flex-col gap-3">
                <span className="text-[10px] font-mono text-[var(--rune-accent)] uppercase tracking-wider font-semibold">
                  {col.title}
                </span>
                <div className="flex flex-col gap-2">
                  {col.links.map((link) => {
                    const isExternal = link.url.startsWith("http")
                    return isExternal ? (
                      <a
                        key={link.label}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-[var(--rune-fg-muted)] hover:text-[var(--rune-fg-base)] transition-colors duration-150"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        key={link.label}
                        href={link.url}
                        className="text-xs text-[var(--rune-fg-muted)] hover:text-[var(--rune-fg-base)] transition-colors duration-150"
                      >
                        {link.label}
                      </Link>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Bottom Row: Licensing */}
        <div className="pt-8 border-t border-[var(--rune-border)] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-[10px] font-mono text-[var(--rune-fg-faint)]">
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            <span>© {currentYear} Rune Language project.</span>
            <span>Licensed under MIT License.</span>
          </div>
          <span className="text-[var(--rune-accent-dim)]">
            Built by hand with pride.
          </span>
        </div>

      </div>
    </footer>
  )
}
