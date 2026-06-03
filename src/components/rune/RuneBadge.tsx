import * as React from "react"
import { Badge, badgeVariants } from "@/components/ui/badge"
import type { VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

interface RuneBadgeProps
  extends React.ComponentProps<typeof Badge>,
    VariantProps<typeof badgeVariants> {
  accent?: boolean
}

export function RuneBadge({
  accent,
  variant,
  className,
  ...props
}: RuneBadgeProps) {
  return (
    <Badge
      variant={accent ? "accent" : variant}
      className={cn(className)}
      {...props}
    />
  )
}
