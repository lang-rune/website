"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Check, Copy } from "lucide-react"
import { renderHighlightedCode } from "@/lib/rune-grammar/scope-mapping"

interface RuneCodeBlockProps {
  children: string
  language?: string
  filename?: string
  showLineNumbers?: boolean
  className?: string
}

export function RuneCodeBlock({
  children,
  language = "rune",
  filename,
  showLineNumbers = false,
  className,
}: RuneCodeBlockProps) {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={cn("rune-codeblock group", className)}>
      {(filename || language) && (
        <div className="rune-codeblock-header">
          <span>{filename || language}</span>
          <span className="rune-badge accent">{language}</span>
        </div>
      )}
      <div className="relative">
        <button
          onClick={handleCopy}
          className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-md hover:bg-[var(--rune-bg-subtle)] text-[var(--rune-fg-muted)] hover:text-[var(--rune-fg-base)] cursor-pointer"
          aria-label="Copy code"
        >
          {copied ? (
            <Check className="size-4 text-[var(--rune-success)]" />
          ) : (
            <Copy className="size-4" />
          )}
        </button>
        <pre className={cn(showLineNumbers && "rune-line-numbers")}>
          <code>{renderHighlightedCode(children, language)}</code>
        </pre>
      </div>
    </div>
  )
}
