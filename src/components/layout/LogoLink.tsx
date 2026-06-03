import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface LogoLinkProps {
  variant?: "default" | "constrained" | "footer"
  className?: string
}

export function LogoLink({ variant = "default", className }: LogoLinkProps) {
  return (
    <Link 
      href="/" 
      className={cn(
        "inline-flex items-center gap-2 select-none outline-none group/logo", 
        className
      )}
    >
      {variant === "default" && (
        <div className="relative w-28 h-8 flex items-center">
          <Image
            src="/logo.png"
            alt="Rune Logo"
            width={112}
            height={32}
            priority
            className="object-contain dark:brightness-100 brightness-0 dark:opacity-100 opacity-90 transition-all duration-300"
          />
        </div>
      )}

      {variant === "constrained" && (
        <div className="relative w-8 h-8 flex items-center justify-center">
          <Image
            src="/icon.png"
            alt="Rune Icon"
            width={32}
            height={32}
            priority
            className="object-contain dark:brightness-100 brightness-0 dark:opacity-100 opacity-90 transition-all duration-300"
          />
        </div>
      )}

      {variant === "footer" && (
        <div className="flex items-center gap-2.5">
          <div className="relative w-8 h-8 flex items-center justify-center">
            <Image
              src="/icon.png"
              alt="Rune Icon"
              width={32}
              height={32}
              className="object-contain dark:brightness-100 brightness-0 dark:opacity-100 opacity-90 transition-all duration-300"
            />
          </div>
          <span className="font-display text-xl font-bold tracking-tight text-[var(--rune-fg-base)] group-hover/logo:text-[var(--rune-accent)] transition-colors duration-200">
            Rune
          </span>
        </div>
      )}
    </Link>
  )
}
