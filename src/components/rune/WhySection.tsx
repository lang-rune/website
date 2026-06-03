"use client"

import * as React from "react"
import { motion } from "motion/react"

export function WhySection() {
  const EASE_EXPO_OUT = [0.16, 1, 0.3, 1] as const

  const lineVariants = {
    hidden: { opacity: 0, y: 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.0,
        ease: EASE_EXPO_OUT
      }
    }
  }

  return (
    <section className="relative py-28 px-4 flex flex-col items-center justify-center overflow-hidden">
      <div className="w-full max-w-[720px] flex flex-col items-center text-center">
        
        {/* Vertical divider line linking to the top */}
        <motion.div 
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="w-px h-16 bg-gradient-to-b from-transparent to-[var(--rune-border-strong)] mb-12 origin-top"
        />

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-150px" }}
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: 0.35 }
            }
          }}
          className="space-y-6 select-none"
        >
          <motion.p 
            variants={lineVariants}
            className="font-body text-xl sm:text-2xl text-[var(--rune-fg-muted)] leading-relaxed"
          >
            Most developers use programming languages every day.
          </motion.p>
          
          <motion.p 
            variants={lineVariants}
            className="font-body text-xl sm:text-2xl text-[var(--rune-fg-muted)] leading-relaxed"
          >
            Few ever see how one works.
          </motion.p>
          
          <motion.p 
            variants={lineVariants}
            className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold text-[var(--rune-fg-base)] tracking-tight"
          >
            Rune was built to change that.
          </motion.p>
        </motion.div>

        {/* Vertical divider pointing down to compilation journey */}
        <motion.div 
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, delay: 0.8, ease: "easeInOut" }}
          className="w-px h-24 bg-gradient-to-b from-[var(--rune-border-strong)] to-transparent mt-16 origin-top"
        />

      </div>
    </section>
  )
}
