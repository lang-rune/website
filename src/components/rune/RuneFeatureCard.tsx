import * as React from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface RuneFeatureCardProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode
  title: string
  description: string
}

export function RuneFeatureCard({
  icon,
  title,
  description,
  className,
  ...props
}: RuneFeatureCardProps) {
  return (
    <Card
      className={cn("feature-card group relative overflow-visible", className)}
      {...props}
    >
      <CardHeader>
        {icon && (
          <div className="text-[var(--rune-accent)] mb-1 [&_svg]:size-5">
            {icon}
          </div>
        )}
        <CardTitle className="font-display text-lg font-semibold">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="leading-relaxed">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  )
}
