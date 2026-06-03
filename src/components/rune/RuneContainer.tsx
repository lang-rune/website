import * as React from "react"
import { cn } from "@/lib/utils"

interface RuneContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "content" | "wide" | "full"
}

const containerSizes = {
  content: "max-w-[var(--rune-max-content)]",
  wide: "max-w-[var(--rune-max-wide)]",
  full: "max-w-[var(--rune-max-full)]",
}

export function RuneContainer({
  size = "wide",
  className,
  ...props
}: RuneContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        containerSizes[size],
        className
      )}
      {...props}
    />
  )
}
