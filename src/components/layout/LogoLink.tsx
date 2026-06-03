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
        <div className="relative flex items-center justify-center gap-2">
          <Image
            src="/icon.png"
            alt="Rune Icon"
            width={48}
            height={48}
            priority
            className="object-contain transition-all duration-300"
          />
          <div className="flex flex-col items-center justify-start gap-0">
            <span className="text-2xl font-bold tracking-wider leading-none font-sans">Rune</span>
            <div className="flex items-center justify-center gap-1">
              <span className="w-2 h-0.5 bg-[var(--rune-accent)]"></span>
              <span className="text-sm font-bold tracking-tight leading-none font-sans">Lang</span>
              <span className="w-2 h-0.5 bg-[var(--rune-accent)]"></span>
            </div>
          </div>
        </div>
      )}

      {variant === "constrained" && (
        <div className="relative w-8 h-8 flex items-center justify-center">
          <Image
            src="/icon.png"
            alt="Rune Icon"
            width={48}
            height={48}
            priority
            className="object-contain transition-all duration-300"
          />
        </div>
      )}

      {variant === "footer" && (
        <div className="flex items-center gap-2.5">
          <div className="relative w-8 h-8 flex items-center justify-center">
            <Image
              src="/icon.png"
              alt="Rune Icon"
              width={48}
              height={48}
              className="object-contain transition-all duration-300"
            />
          </div>
          <div className="flex flex-col items-center justify-start gap-0">
            <span className="text-2xl font-bold tracking-wider leading-none font-sans">Rune</span>
            <div className="flex items-center justify-center gap-1">
              <span className="w-2 h-0.5 bg-[var(--rune-accent)]"></span>
              <span className="text-sm font-bold tracking-tight leading-none font-sans">Lang</span>
              <span className="w-2 h-0.5 bg-[var(--rune-accent)]"></span>
            </div>
          </div>
        </div>
      )}
    </Link>
  )
}
