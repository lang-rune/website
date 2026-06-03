import * as React from "react"
import { cn } from "@/lib/utils"

type CalloutType = "note" | "warning" | "tip"

interface RuneCalloutProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: CalloutType
}

const calloutConfig: Record<
  CalloutType,
  { bg: string; border: string; icon: string; color: string }
> = {
  note: {
    bg: "var(--rune-bg-subtle)",
    border: "var(--rune-border-strong)",
    icon: "ℹ",
    color: "var(--rune-fg-base)",
  },
  warning: {
    bg: "rgba(251,191,36,0.06)",
    border: "rgba(251,191,36,0.25)",
    icon: "⚠",
    color: "var(--rune-warning)",
  },
  tip: {
    bg: "rgba(74,222,128,0.05)",
    border: "rgba(74,222,128,0.2)",
    icon: "→",
    color: "var(--rune-success)",
  },
}

export function RuneCallout({
  type = "note",
  children,
  className,
  ...props
}: RuneCalloutProps) {
  const config = calloutConfig[type]

  return (
    <div
      className={cn("rounded-[var(--rune-radius-md)] p-4 border", className)}
      style={{
        background: config.bg,
        borderColor: config.border,
      }}
      {...props}
    >
      <div className="flex gap-3 items-start">
        <span
          className="text-base flex-shrink-0 leading-snug"
          style={{ color: config.color }}
          aria-hidden="true"
        >
          {config.icon}
        </span>
        <div className="text-sm leading-relaxed text-[var(--rune-fg-base)] [&_p:not(:last-child)]:mb-2">
          {children}
        </div>
      </div>
    </div>
  )
}
