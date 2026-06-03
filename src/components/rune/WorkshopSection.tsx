"use client"

import * as React from "react"
import { motion, AnimatePresence } from "motion/react"
import { X, Code, Terminal, Cpu, Settings } from "lucide-react"
import { RuneCodeBlock } from "@/components/rune/RuneCodeBlock"

interface WorkshopItem {
  id: string
  num: string
  title: string
  desc: string
  icon: React.ReactNode
  filename: string
  lang: string
  code: string
}

const ITEMS: WorkshopItem[] = [
  {
    id: "lexer",
    num: "01",
    title: "Lexer Scanner",
    desc: "A pure character-by-character scan loop. Consumes source streams, identifies keyword lexemes, literal numbers/strings, and variables without RegEx shortcuts.",
    icon: <Settings className="size-6 text-[var(--rune-accent)]" />,
    filename: "lexer/lexer.py",
    lang: "python",
    code: `class Lexer:
    def __init__(self, text: str):
        self.text = text
        self.pos = 0
        self.line = 1
        self.column = 1
        self.tokens = []

    def tokenize(self) -> list[Token]:
        while self.pos < len(self.text):
            self.skip_whitespace()
            char = self.peek()
            if char == '\\0':
                break
            elif char == '#':
                self.skip_comment()
            elif char == '\\n':
                self.tokens.append(Token(TokenType.NEWLINE, self.advance(), self.line, self.column))
            elif char.isdigit():
                self.tokens.append(Token(TokenType.NUMBER, self.read_number(), self.line, self.column))
            elif char in '"\\'':
                self.tokens.append(Token(TokenType.WORD, self.read_word_literal(), self.line, self.column))
            elif char.isalpha() or char == '_':
                ident = self.read_identifier()
                token_type = self.keywords.get(ident, TokenType.IDENTIFIER)
                self.tokens.append(Token(token_type, ident, self.line, self.column))`
  },
  {
    id: "parser",
    num: "02",
    title: "Expression Parser",
    desc: "A clean recursive-descent parser. Handles math operator hierarchies and nested brackets correctly by climbing precedence levels.",
    icon: <Code className="size-6 text-[var(--rune-accent)]" />,
    filename: "parser/parser.py",
    lang: "python",
    code: `class Parser:
    def parse(self) -> Program:
        statements = []
        self.skip_newlines()
        while not self.match(TokenType.EOF):
            stmt = self.parse_statement()
            if stmt:
                statements.append(stmt)
            self.skip_newlines()
        return Program(statements)

    def parse_statement(self) -> Optional[Statement]:
        if self.match(TokenType.WRITE):
            return self.parse_write_statement()
        elif self.match(TokenType.SET):
            return self.parse_assignment_statement()
        elif self.match(TokenType.IF):
            return self.parse_if_statement()
        elif self.match(TokenType.WHILE):
            return self.parse_while_statement()
        elif self.match(TokenType.SPELL):
            return self.parse_spell_definition()
        elif self.match(TokenType.CAST):
            return self.parse_cast_statement()
        elif self.match(TokenType.RETURN):
            return self.parse_return_statement()`
  },
  {
    id: "ast",
    num: "03",
    title: "Abstract Syntax Trees",
    desc: "Strongly-typed expressions and statement structures representation. Visualizes the program tree in a syntax layout prior to evaluations.",
    icon: <Cpu className="size-6 text-[var(--rune-accent)]" />,
    filename: "ast/nodes.py",
    lang: "python",
    code: `class ASTNode(ABC):
    pass

class Expression(ASTNode):
    pass

class Statement(ASTNode):
    pass

class BinaryOp(Expression):
    def __init__(self, left: Expression, operator: str, right: Expression):
        self.left = left
        self.operator = operator
        self.right = right

class AssignmentStatement(Statement):
    def __init__(self, variable: str, value: Expression):
        self.variable = variable
        self.value = value

class SpellDefinition(Statement):
    def __init__(self, name: str, params: List[str], body: List[Statement]):
        self.name = name
        self.params = params
        self.body = body`
  },
  {
    id: "runtime",
    num: "04",
    title: "Runtime Evaluator",
    desc: "A dynamic tree-walk interpreter evaluation engine. Traces expression nodes sequentially while mutating scoping frame configurations.",
    icon: <Terminal className="size-6 text-[var(--rune-accent)]" />,
    filename: "runtime/interpreter.py",
    lang: "python",
    code: `class Interpreter:
    def interpret(self, node: ASTNode) -> Any:
        method = getattr(self, f'visit_{type(node).__name__}', None)
        if method:
            return method(node)
        self.error(f"No visit method for {type(node)}")

    def visit_BinaryOp(self, node: BinaryOp) -> Any:
        left = self.interpret(node.left)
        right = self.interpret(node.right)

        if node.operator == '+':
            if isinstance(left, str) or isinstance(right, str):
                return to_rune_string(left) + to_rune_string(right)
            return left + right
        if node.operator == '-':   return left - right
        if node.operator == '*':   return left * right
        if node.operator == '/':
            if right == 0:
                self.error("Division by zero")
            return left / right`
  }
]

export function WorkshopSection() {
  const [selectedItem, setSelectedItem] = React.useState<WorkshopItem | null>(null)

  const EASE_EXPO_OUT = [0.16, 1, 0.3, 1] as const

  return (
    <section className="relative py-24 px-4 overflow-hidden max-w-[var(--rune-max-wide)] mx-auto z-[99999]">
      
      <div className="text-center mb-16 max-w-2xl mx-auto">
        <span className="text-[var(--rune-xs)] font-mono text-[var(--rune-accent)] uppercase tracking-widest">
          Craftsmanship
        </span>
        <h2 className="text-3xl sm:text-4xl font-display font-bold text-[var(--rune-fg-base)] mt-2">
          Inside the Codebase
        </h2>
        <p className="text-[var(--rune-sm)] text-[var(--rune-fg-muted)] mt-4">
          Rune was constructed entirely by hand. Select a block to open the implementation details and read the source code.
        </p>
      </div>

      {/* 2x2 블루프린트 그리드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--rune-border-strong)] rounded-lg overflow-hidden border border-[var(--rune-border-strong)]">
        {ITEMS.map((item, index) => (
          <motion.div
            key={item.id}
            onClick={() => setSelectedItem(item)}
            className="p-8 bg-[var(--rune-bg-raised)] hover:bg-[var(--rune-bg-overlay)] cursor-pointer flex flex-col justify-between min-h-[220px] transition-colors group relative"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: index * 0.05, duration: 0.6, ease: EASE_EXPO_OUT }}
          >
            <div className="flex justify-between items-start">
              <span className="text-3xl font-display font-bold text-[var(--rune-fg-faint)] group-hover:text-[var(--rune-accent-dim)] transition-colors">
                {item.num}
              </span>
              <div className="p-2 border border-[var(--rune-border)] bg-[var(--rune-bg-subtle)] rounded transition-all group-hover:border-[var(--rune-accent-dim)]">
                {item.icon}
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-display font-semibold text-[var(--rune-fg-base)] flex items-center gap-2 group-hover:text-[var(--rune-accent)] transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-[var(--rune-fg-muted)] leading-relaxed mt-2">
                {item.desc}
              </p>
            </div>

            {/* Corner hover link indicator */}
            <span className="absolute bottom-4 right-4 text-[10px] font-mono text-[var(--rune-fg-faint)] group-hover:text-[var(--rune-accent)] transition-all transform translate-x-1 group-hover:translate-x-0">
              → Inspect Source
            </span>
          </motion.div>
        ))}
      </div>

      {/* CODE OVERLAY DRAWER PANEL */}
      <AnimatePresence>
        {selectedItem && (
          <>
            {/* Dark blur backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="fixed inset-0 bg-black z-40 cursor-pointer"
            />

            {/* Drawer body */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.5, ease: EASE_EXPO_OUT }}
              className="fixed top-14 right-0 bottom-0 w-full max-w-xl bg-[var(--rune-bg-raised)] border-l border-[var(--rune-border-strong)] z-[999] p-6 flex flex-col justify-between max-h-[92dvh] overflow-hidden"
            >
              <div>
                
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-[var(--rune-border)] mb-6">
                  <div>
                    <span className="text-[10px] font-mono text-[var(--rune-accent)] uppercase">
                      Core Implementation
                    </span>
                    <h4 className="text-lg font-display font-semibold text-[var(--rune-fg-base)]">
                      {selectedItem.title}
                    </h4>
                  </div>
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="p-1.5 rounded border border-[var(--rune-border)] hover:border-[var(--rune-accent)] text-[var(--rune-fg-muted)] hover:text-[var(--rune-fg-base)] transition-all"
                  >
                    <X className="size-4" />
                  </button>
                </div>

                {/* Subtitle description */}
                <p className="text-xs text-[var(--rune-fg-muted)] leading-relaxed mb-6">
                  {selectedItem.desc}
                </p>

                {/* Code Block Container */}
                <RuneCodeBlock
                  language={selectedItem.lang}
                  filename={`src/${selectedItem.filename}`}
                  className="text-[11px] leading-relaxed max-h-[50vh] overflow-y-auto scrollbar-thin"
                >
                  {selectedItem.code}
                </RuneCodeBlock>

              </div>

              {/* Action buttons at bottom */}
              <div className="pt-4 border-t border-[var(--rune-border)] flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setSelectedItem(null)}
                  className="px-4 py-2 text-xs font-mono border border-[var(--rune-border-strong)] rounded text-[var(--rune-fg-muted)] hover:text-[var(--rune-fg-base)] hover:border-[var(--rune-fg-base)] transition-all"
                >
                  Close
                </button>
                <a
                  href={`https://github.com/lang-rune/rune/blob/main/rune/${selectedItem.filename}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-xs font-mono bg-[var(--rune-accent)] text-[#0A0A0B] font-semibold rounded hover:bg-[var(--rune-accent-dim)] transition-all flex items-center gap-1.5"
                >
                  View on GitHub
                </a>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>

    </section>
  )
}
