"use client"

import * as React from "react"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"
import { Check, Terminal, Code, Cpu, ChevronRight } from "lucide-react"
import { renderHighlightedCode } from "@/lib/rune-grammar/scope-mapping"

// Types & Data
interface Snippet {
  id: string
  title: string
  code: string
  tokens: { value: string; type: string }[]
  ast: { id: string; label: string; parentId: string | null }[]
  output: string
  explanation: string
}

const SNIPPETS: Snippet[] = [
  {
    id: "greet",
    title: "Functions (greet)",
    code: `spell greet(name) {
  write("Hello ", name)
}

greet("explorer")`,
    tokens: [
      { value: "spell", type: "keyword" },
      { value: "greet", type: "ident" },
      { value: "(", type: "symbol" },
      { value: "name", type: "ident" },
      { value: ")", type: "symbol" },
      { value: "{", type: "symbol" },
      { value: "write", type: "fn" },
      { value: "(", type: "symbol" },
      { value: '"Hello "', type: "string" },
      { value: ",", type: "symbol" },
      { value: "name", type: "ident" },
      { value: ")", type: "symbol" },
      { value: "}", type: "symbol" },
      { value: "greet", type: "ident" },
      { value: "(", type: "symbol" },
      { value: '"explorer"', type: "string" },
      { value: ")", type: "symbol" },
    ],
    ast: [
      { id: "root", label: "Program", parentId: null },
      { id: "decl", label: "SpellDefinition: greet(name)", parentId: "root" },
      { id: "params", label: "Param: name", parentId: "decl" },
      { id: "body", label: "BlockStmt", parentId: "decl" },
      { id: "call", label: "WriteStatement: write()", parentId: "body" },
      { id: "arg1", label: 'Arg: "Hello "', parentId: "call" },
      { id: "arg2", label: "Arg: name", parentId: "call" },
      { id: "exec", label: 'FunctionCall: greet("explorer")', parentId: "root" },
    ],
    output: "Hello explorer",
    explanation: "Declares a function `greet` using the `spell` keyword, then invokes it passing 'explorer' to bind to the `name` parameter in a local environment."
  },
  {
    id: "factorial",
    title: "Control Flow (factorial)",
    code: `spell factorial(n) {
  if n <= 1 {
    return 1
  }
  return n * factorial(n - 1)
}

factorial(5)`,
    tokens: [
      { value: "spell", type: "keyword" },
      { value: "factorial", type: "ident" },
      { value: "(", type: "symbol" },
      { value: "n", type: "ident" },
      { value: ")", type: "symbol" },
      { value: "{", type: "symbol" },
      { value: "if", type: "keyword" },
      { value: "n", type: "ident" },
      { value: "<=", type: "operator" },
      { value: "1", type: "number" },
      { value: "{", type: "symbol" },
      { value: "return", type: "keyword" },
      { value: "1", type: "number" },
      { value: "}", type: "symbol" },
      { value: "return", type: "keyword" },
      { value: "n", type: "ident" },
      { value: "*", type: "operator" },
      { value: "factorial", type: "ident" },
      { value: "(", type: "symbol" },
      { value: "n", type: "ident" },
      { value: "-", type: "operator" },
      { value: "1", type: "number" },
      { value: ")", type: "symbol" },
      { value: "}", type: "symbol" },
      { value: "factorial", type: "ident" },
      { value: "(", type: "symbol" },
      { value: "5", type: "number" },
      { value: ")", type: "symbol" },
    ],
    ast: [
      { id: "root", label: "Program", parentId: null },
      { id: "decl", label: "SpellDefinition: factorial(n)", parentId: "root" },
      { id: "ifstmt", label: "IfStatement", parentId: "decl" },
      { id: "cond", label: "n <= 1", parentId: "ifstmt" },
      { id: "then", label: "ReturnStatement: 1", parentId: "ifstmt" },
      { id: "ret", label: "ReturnStatement: n * factorial(n - 1)", parentId: "decl" },
      { id: "exec", label: "FunctionCall: factorial(5)", parentId: "root" },
    ],
    output: "120",
    explanation: "Demonstrates recursion and logical expression precedence: the parser structure checks the branch `n <= 1` before evaluating the expression product."
  },
  {
    id: "makeCounter",
    title: "State Closures (make_counter)",
    code: `spell make_counter() {
  set count = 0
  spell count_up() {
    set count = count + 1
    return count
  }
  return count_up
}

set counter = make_counter()
counter()`,
    tokens: [
      { value: "spell", type: "keyword" },
      { value: "make_counter", type: "ident" },
      { value: "(", type: "symbol" },
      { value: ")", type: "symbol" },
      { value: "{", type: "symbol" },
      { value: "set", type: "keyword" },
      { value: "count", type: "ident" },
      { value: "=", type: "operator" },
      { value: "0", type: "number" },
      { value: "spell", type: "keyword" },
      { value: "count_up", type: "ident" },
      { value: "(", type: "symbol" },
      { value: ")", type: "symbol" },
      { value: "{", type: "symbol" },
      { value: "set", type: "keyword" },
      { value: "count", type: "ident" },
      { value: "=", type: "operator" },
      { value: "count", type: "ident" },
      { value: "+", type: "operator" },
      { value: "1", type: "number" },
      { value: "return", type: "keyword" },
      { value: "count", type: "ident" },
      { value: "}", type: "symbol" },
      { value: "return", type: "keyword" },
      { value: "count_up", type: "ident" },
      { value: "}", type: "symbol" },
      { value: "set", type: "keyword" },
      { value: "counter", type: "ident" },
      { value: "=", type: "operator" },
      { value: "make_counter", type: "ident" },
      { value: "(", type: "symbol" },
      { value: ")", type: "symbol" },
      { value: "counter", type: "ident" },
      { value: "(", type: "symbol" },
      { value: ")", type: "symbol" },
    ],
    ast: [
      { id: "root", label: "Program", parentId: null },
      { id: "decl", label: "SpellDefinition: make_counter()", parentId: "root" },
      { id: "setstmt", label: "AssignmentStatement: count = 0", parentId: "decl" },
      { id: "inner", label: "SpellDefinition: count_up()", parentId: "decl" },
      { id: "assign", label: "AssignmentStatement: count = count + 1", parentId: "inner" },
      { id: "ret", label: "ReturnStatement: count_up", parentId: "decl" },
      { id: "inst", label: "AssignmentStatement: counter = make_counter()", parentId: "root" },
    ],
    output: "1",
    explanation: "Creates a closure environment. The returned `count_up` function captures a pointer to the parent context environment containing `count`."
  }
]

const STAGES = [
  { id: "source", label: "1. Source Text", desc: "The raw program text loaded into memory characters." },
  { id: "lexer", label: "2. Token Stream", desc: "A hand-rolled scanner breaks characters into syntactic tokens." },
  { id: "ast", label: "3. Abstract Syntax Tree", desc: "The recursive parser links tokens into structured expressions." },
  { id: "runtime", label: "4. Execution Stack", desc: "A tree-walk evaluator executes nodes in environment chains." },
  { id: "output", label: "5. Terminal Console", desc: "The execution completes and prints values." }
]

export function CompilerJourneySection() {
  const [activeSnippet, setActiveSnippet] = React.useState<Snippet>(SNIPPETS[0])
  const [activeStage, setActiveStage] = React.useState<string>("source")

  // Custom scrolling detection inside ref wrapper
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const handleScroll = () => {
      const viewportCenter = window.innerHeight / 2
      let closestStage = activeStage

      STAGES.forEach((stage) => {
        const el = document.getElementById(`stage-${stage.id}`)
        if (el) {
          const rect = el.getBoundingClientRect()
          // Update active stage ONLY when the card spans across the vertical middle of the viewport
          if (rect.top <= viewportCenter && rect.bottom >= viewportCenter) {
            closestStage = stage.id
          }
        }
      })

      setActiveStage(closestStage)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Initialize correctly on mount
    return () => window.removeEventListener("scroll", handleScroll)
  }, [activeStage])

  const handleStageSelect = (stageId: string) => {
    setActiveStage(stageId)
    const el = document.getElementById(`stage-${stageId}`)
    if (el) {
      const rect = el.getBoundingClientRect()
      const scrollPos = window.scrollY + rect.top - (window.innerHeight / 2) + (rect.height / 2)
      window.scrollTo({ top: scrollPos, behavior: "smooth" })
    }
  }

  return (
    <div ref={containerRef} className="relative min-h-[220vh] w-full max-w-[var(--rune-max-wide)] mx-auto px-4 py-20">

      <div className="text-center mb-16 max-w-2xl mx-auto">
        <span className="text-[var(--rune-xs)] font-mono text-[var(--rune-accent)] uppercase tracking-widest">
          Signature Interactive
        </span>
        <h2 className="text-3xl sm:text-4xl font-display font-bold text-[var(--rune-fg-base)] mt-2">
          The Compiler Journey
        </h2>
        <p className="text-[var(--rune-sm)] text-[var(--rune-fg-muted)] mt-4">
          Scroll down or select a compiler stage to watch code convert step-by-step from raw text to outputs.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative">

        {/* LEFT COLUMN: STICKY CODE EDITOR (50vh) */}
        <div className="lg:col-span-5 lg:sticky lg:top-28 w-full flex flex-col gap-4 z-20">

          {/* Curated Snippets Tabs */}
          <div className="flex gap-2 p-1 rounded-md border border-[var(--rune-border)] bg-[var(--rune-bg-raised)]">
            {SNIPPETS.map((snip) => (
              <button
                key={snip.id}
                onClick={() => setActiveSnippet(snip)}
                className={cn(
                  "flex-1 py-1.5 px-2 text-xs font-mono rounded transition-all",
                  activeSnippet.id === snip.id
                    ? "bg-[var(--rune-accent)] text-[#0A0A0B] font-semibold"
                    : "text-[var(--rune-fg-muted)] hover:text-[var(--rune-fg-base)]"
                )}
              >
                {snip.id.charAt(0).toUpperCase() + snip.id.slice(1)}
              </button>
            ))}
          </div>

          {/* Code Editor Box */}
          <div className="rounded-lg border border-[var(--rune-border)] bg-[var(--rune-bg-raised)] overflow-hidden">

            {/* Header tab */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-[var(--rune-border)] bg-[var(--rune-bg-overlay)]">
              <span className="text-xs font-mono text-[var(--rune-fg-muted)] flex items-center gap-1.5">
                <Code className="size-3.5 text-[var(--rune-accent)]" /> {activeSnippet.id}.rn
              </span>
              <span className="text-[10px] font-mono bg-[var(--rune-bg-subtle)] text-[var(--rune-fg-muted)] px-1.5 py-0.5 rounded border border-[var(--rune-border)]">
                Rune Code
              </span>
            </div>

            {/* Code Content */}
            <div className="p-5 font-mono text-sm leading-relaxed overflow-x-auto text-[var(--rune-fg-base)] min-h-[160px] relative">
              <pre className="whitespace-pre">
                {renderHighlightedCode(activeSnippet.code, "rune")}
              </pre>

              {/* Cursor indicator overlay based on active stage */}
              <AnimatePresence>
                {activeStage === "source" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-[var(--rune-accent)] pointer-events-none"
                  />
                )}
              </AnimatePresence>
            </div>

            {/* Footer console */}
            <div className="px-4 py-2 bg-[var(--rune-bg-subtle)] border-t border-[var(--rune-border)] flex items-center justify-between text-xs font-mono">
              <span className="text-[var(--rune-fg-muted)]">Console Status</span>
              {activeStage === "output" ? (
                <span className="text-[var(--rune-success)] flex items-center gap-1">
                  <Check className="size-3" /> Execution Complete
                </span>
              ) : (
                <span className="text-[var(--rune-accent-dim)] animate-pulse">Waiting for execution...</span>
              )}
            </div>
          </div>

          {/* Mini controls */}
          <div className="flex justify-between items-center px-1">
            <span className="text-[10px] font-mono text-[var(--rune-fg-faint)]">
              STAGE RESOLUTION:
            </span>
            <div className="flex gap-1">
              {STAGES.map(s => (
                <button
                  key={s.id}
                  onClick={() => handleStageSelect(s.id)}
                  className={cn(
                    "w-2 h-2 rounded-full border border-transparent transition-all",
                    activeStage === s.id
                      ? "bg-[var(--rune-accent)] scale-125"
                      : "bg-[var(--rune-fg-faint)] hover:bg-[var(--rune-fg-muted)]"
                  )}
                  title={s.label}
                />
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: SCROLLING COMPILER STAGES */}
        <div className="lg:col-span-7 flex flex-col gap-16 lg:py-16">

          {/* Stage 1: Source */}
          <div id="stage-source" className={cn(
            "p-6 rounded-lg border transition-all duration-300",
            activeStage === "source"
              ? "border-[var(--rune-accent-dim)] bg-[var(--rune-bg-raised)] shadow-[0_0_15px_var(--rune-accent-subtle)]"
              : "border-[var(--rune-border)] bg-transparent opacity-40"
          )}>
            <div className="flex items-center gap-2 text-sm font-mono text-[var(--rune-accent)] font-semibold mb-2">
              <Code className="size-4" /> {STAGES[0].label}
            </div>
            <p className="text-xs text-[var(--rune-fg-muted)] mb-4">{STAGES[0].desc}</p>
            <div className="p-3 bg-[var(--rune-bg-subtle)] border border-[var(--rune-border)] rounded text-xs font-mono text-[var(--rune-fg-base)] leading-relaxed select-all">
              {Array.from(activeSnippet.code).map((char, i) => (
                <span
                  key={i}
                  className={cn(
                    "transition-all duration-150",
                    activeStage === "source" && "text-[var(--rune-accent)] bg-[var(--rune-accent-subtle)] font-bold"
                  )}
                >
                  {char === "\n" ? <br /> : char}
                </span>
              ))}
            </div>
          </div>

          {/* Stage 2: Lexer Tokens */}
          <div id="stage-lexer" className={cn(
            "p-6 rounded-lg border transition-all duration-300",
            activeStage === "lexer"
              ? "border-[var(--rune-accent-dim)] bg-[var(--rune-bg-raised)] shadow-[0_0_15px_var(--rune-accent-subtle)]"
              : "border-[var(--rune-border)] bg-transparent opacity-40"
          )}>
            <div className="flex items-center gap-2 text-sm font-mono text-[var(--rune-accent)] font-semibold mb-2">
              <Cpu className="size-4" /> {STAGES[1].label}
            </div>
            <p className="text-xs text-[var(--rune-fg-muted)] mb-4">{STAGES[1].desc}</p>

            <div className="flex flex-wrap gap-2 max-h-[180px] overflow-y-auto p-1">
              {activeSnippet.tokens.map((token, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={activeStage === "lexer" ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: index * 0.02 }}
                  className={cn(
                    "px-2 py-0.5 rounded text-[10px] font-mono border",
                    token.type === "keyword" && "bg-purple-950/20 border-purple-900/50 text-purple-400",
                    token.type === "ident" && "bg-blue-950/20 border-blue-900/50 text-blue-400",
                    token.type === "string" && "bg-green-950/20 border-green-900/50 text-[var(--rune-success)]",
                    token.type === "number" && "bg-orange-950/20 border-orange-900/50 text-orange-400",
                    token.type === "operator" && "bg-cyan-950/20 border-cyan-900/50 text-cyan-400",
                    token.type === "symbol" && "bg-neutral-900/40 border-neutral-800 text-[var(--rune-fg-muted)]",
                    token.type === "fn" && "bg-amber-950/20 border-amber-900/50 text-[var(--rune-accent)]"
                  )}
                >
                  {token.type.toUpperCase()}({token.value})
                </motion.span>
              ))}
            </div>
          </div>

          {/* Stage 3: AST Nodes */}
          <div id="stage-ast" className={cn(
            "p-6 rounded-lg border transition-all duration-300",
            activeStage === "ast"
              ? "border-[var(--rune-accent-dim)] bg-[var(--rune-bg-raised)] shadow-[0_0_15px_var(--rune-accent-subtle)]"
              : "border-[var(--rune-border)] bg-transparent opacity-40"
          )}>
            <div className="flex items-center gap-2 text-sm font-mono text-[var(--rune-accent)] font-semibold mb-2">
              <Code className="size-4" /> {STAGES[2].label}
            </div>
            <p className="text-xs text-[var(--rune-fg-muted)] mb-4">{STAGES[2].desc}</p>

            <div className="flex flex-col gap-2 font-mono text-xs max-h-[220px] overflow-y-auto pl-2 border-l border-[var(--rune-border-strong)]">
              {activeSnippet.ast.map((node) => {
                // Calculate tree nesting level
                let depth = 0
                let current = node
                while (current.parentId) {
                  depth++
                  const parent = activeSnippet.ast.find(n => n.id === current.parentId)
                  if (!parent) break
                  current = parent
                }

                return (
                  <motion.div
                    key={node.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={activeStage === "ast" ? { opacity: 1, x: 0 } : {}}
                    className="flex items-center gap-1 text-[var(--rune-fg-base)]"
                    style={{ paddingLeft: `${depth * 16}px` }}
                  >
                    {depth > 0 && <span className="text-[var(--rune-fg-faint)]">└─</span>}
                    <span className={cn(
                      "px-1.5 py-0.5 rounded border border-[var(--rune-border)] bg-[var(--rune-bg-subtle)] text-[10px]",
                      node.id === "root" && "border-[var(--rune-accent-dim)] text-[var(--rune-accent)] font-semibold"
                    )}>
                      {node.label}
                    </span>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Stage 4: Interpreter Stack */}
          <div id="stage-runtime" className={cn(
            "p-6 rounded-lg border transition-all duration-300",
            activeStage === "runtime"
              ? "border-[var(--rune-accent-dim)] bg-[var(--rune-bg-raised)] shadow-[0_0_15px_var(--rune-accent-subtle)]"
              : "border-[var(--rune-border)] bg-transparent opacity-40"
          )}>
            <div className="flex items-center gap-2 text-sm font-mono text-[var(--rune-accent)] font-semibold mb-2">
              <Cpu className="size-4" /> {STAGES[3].label}
            </div>
            <p className="text-xs text-[var(--rune-fg-muted)] mb-4">{STAGES[3].desc}</p>
            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 rounded border border-[var(--rune-border)] bg-[var(--rune-bg-subtle)] text-[var(--rune-fg-muted)] flex flex-col gap-1.5">
                <span className="text-[var(--rune-fg-base)] font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--rune-accent)] animate-ping" /> Global Environment
                </span>
                <div className="flex justify-between border-t border-[var(--rune-border)] pt-1.5 mt-1">
                  <span>Variables Bound:</span>
                  <span className="text-[var(--rune-fg-base)]">
                    {activeSnippet.id === "greet" && "greet = [Closure: greet]"}
                    {activeSnippet.id === "factorial" && "factorial = [Closure: factorial]"}
                    {activeSnippet.id === "makeCounter" && "make_counter = [Closure: make_counter], counter = [Closure: count_up]"}
                  </span>
                </div>
              </div>
              <p className="text-[11px] text-[var(--rune-fg-muted)] italic leading-relaxed pt-1">
                {activeSnippet.explanation}
              </p>
            </div>
          </div>

          {/* Stage 5: Output */}
          <div id="stage-output" className={cn(
            "p-6 rounded-lg border transition-all duration-300",
            activeStage === "output"
              ? "border-[var(--rune-accent-dim)] bg-[var(--rune-bg-raised)] shadow-[0_0_15px_var(--rune-accent-subtle)]"
              : "border-[var(--rune-border)] bg-transparent opacity-40"
          )}>
            <div className="flex items-center gap-2 text-sm font-mono text-[var(--rune-accent)] font-semibold mb-2">
              <Terminal className="size-4" /> {STAGES[4].label}
            </div>
            <p className="text-xs text-[var(--rune-fg-muted)] mb-4">{STAGES[4].desc}</p>
            <div className="p-4 bg-black rounded border border-neutral-800 text-xs font-mono text-green-400 min-h-[80px] flex items-center gap-2">
              <ChevronRight className="size-4 text-[var(--rune-accent)] shrink-0" />
              <motion.span
                initial={{ opacity: 0 }}
                animate={activeStage === "output" ? { opacity: 1 } : {}}
                transition={{ duration: 0.5 }}
                className="select-all"
              >
                {activeSnippet.output}
              </motion.span>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}
