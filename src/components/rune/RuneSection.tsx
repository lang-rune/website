import * as React from "react"
import { cn } from "@/lib/utils"

interface RuneSectionProps extends React.HTMLAttributes<HTMLElement> {
  spacing?: "default" | "compact"
}

export function RuneSection({
  spacing = "default",
  className,
  ...props
}: RuneSectionProps) {
  return (
    <section
      className={cn(
        spacing === "default"
          ? "py-[var(--space-24)]"
          : "py-[var(--space-16)]",
        className
      )}
      {...props}
    />
  )
}
