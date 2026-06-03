"use client"

import * as React from "react"
import { motion, AnimatePresence } from "motion/react"
import { X, Code, Terminal, Cpu, Settings } from "lucide-react"

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
    filename: "lexer.rs",
    lang: "rust",
    code: `pub struct Lexer {
    source: String,
    chars: Vec<char>,
    start: usize,
    current: usize,
    line: usize,
}

impl Lexer {
    pub fn scan_token(&mut self) -> Token {
        self.skip_whitespace();
        if self.is_at_end() {
            return self.make_token(TokenType::EOF);
        }
        
        let c = self.advance();
        if c.is_alphabetic() {
            return self.identifier();
        }
        if c.is_numeric() {
            return self.number();
        }

        match c {
            '(' => self.make_token(TokenType::LeftParen),
            ')' => self.make_token(TokenType::RightParen),
            '{' => self.make_token(TokenType::LeftBrace),
            '}' => self.make_token(TokenType::RightBrace),
            ';' => self.make_token(TokenType::Semicolon),
            ',' => self.make_token(TokenType::Comma),
            '+' => self.make_token(TokenType::Plus),
            '-' => self.make_token(TokenType::Minus),
            '*' => self.make_token(TokenType::Star),
            _ => self.error_token("Unexpected character."),
        }
    }
}`
  },
  {
    id: "parser",
    num: "02",
    title: "Expression Parser",
    desc: "A clean recursive-descent parser. Handles math operator hierarchies and nested brackets correctly by climbing precedence levels.",
    icon: <Code className="size-6 text-[var(--rune-accent)]" />,
    filename: "parser.rs",
    lang: "rust",
    code: `impl Parser {
    fn parse_expression(&mut self, precedence: Precedence) -> Result<Expr, ParseError> {
        let mut left = self.parse_prefix()?;
        
        while precedence < self.peek_precedence() {
            let operator = self.advance()?;
            left = self.parse_infix(left, operator)?;
        }
        
        Ok(left)
    }

    fn parse_prefix(&mut self) -> Result<Expr, ParseError> {
        let token = self.peek();
        match token.token_type {
            TokenType::Identifier => Ok(Expr::Variable(token.lexeme)),
            TokenType::Number => Ok(Expr::Literal(Value::Number(token.literal))),
            TokenType::LeftParen => {
                self.advance()?;
                let expr = self.parse_expression(Precedence::Lowest)?;
                self.consume(TokenType::RightParen, "Expect ')' after expression.")?;
                Ok(expr)
            }
            _ => Err(ParseError::Unexpected(token)),
        }
    }
}`
  },
  {
    id: "ast",
    num: "03",
    title: "Abstract Syntax Trees",
    desc: "Strongly-typed expressions and statement structures representation. Visualizes the program tree in a syntax layout prior to evaluations.",
    icon: <Cpu className="size-6 text-[var(--rune-accent)]" />,
    filename: "ast.rs",
    lang: "rust",
    code: `#[derive(Debug, Clone)]
pub enum Expr {
    Literal(Value),
    Variable(String),
    Binary {
        left: Box<Expr>,
        operator: Token,
        right: Box<Expr>,
    },
    Call {
        callee: Box<Expr>,
        paren: Token,
        arguments: Vec<Expr>,
    },
    Grouping(Box<Expr>),
}

#[derive(Debug, Clone)]
pub enum Stmt {
    Expression(Expr),
    Let {
        name: Token,
        initializer: Expr,
    },
    Function {
        name: Token,
        params: Vec<Token>,
        body: Vec<Stmt>,
    },
    Return {
        keyword: Token,
        value: Option<Expr>,
    },
}`
  },
  {
    id: "runtime",
    num: "04",
    title: "Runtime Evaluator",
    desc: "A dynamic tree-walk interpreter evaluation engine. Traces expression nodes sequentially while mutating scoping frame configurations.",
    icon: <Terminal className="size-6 text-[var(--rune-accent)]" />,
    filename: "interpreter.rs",
    lang: "rust",
    code: `pub fn evaluate(&mut self, expr: &Expr, env: &mut Environment) -> Result<Value, RuntimeError> {
    match expr {
        Expr::Literal(val) => Ok(val.clone()),
        Expr::Variable(name) => env.get(name),
        Expr::Binary { left, operator, right } => {
            let left_val = self.evaluate(left, env)?;
            let right_val = self.evaluate(right, env)?;
            self.evaluate_binary(left_val, operator, right_val)
        }
        Expr::Call { callee, paren, arguments } => {
            let callee_val = self.evaluate(callee, env)?;
            let mut args = Vec::new();
            for arg in arguments {
                args.push(self.evaluate(arg, env)?);
            }
            self.execute_call(callee_val, args, paren)
        }
        Expr::Grouping(inner) => self.evaluate(inner, env),
    }
}`
  }
]

export function WorkshopSection() {
  const [selectedItem, setSelectedItem] = React.useState<WorkshopItem | null>(null)

  const EASE_EXPO_OUT = [0.16, 1, 0.3, 1] as const

  return (
    <section className="relative py-24 px-4 overflow-hidden max-w-[var(--rune-max-wide)] mx-auto">
      
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
              className="fixed top-0 right-0 bottom-0 w-full max-w-xl bg-[var(--rune-bg-raised)] border-l border-[var(--rune-border-strong)] z-50 p-6 flex flex-col justify-between"
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
                <div className="rounded-md border border-[var(--rune-border)] bg-[var(--rune-bg-overlay)] overflow-hidden font-mono text-[11px] leading-relaxed">
                  <div className="px-4 py-2 border-b border-[var(--rune-border)] bg-[var(--rune-bg-subtle)] flex items-center justify-between">
                    <span className="text-[10px] text-[var(--rune-fg-muted)]">
                      src/{selectedItem.filename}
                    </span>
                    <span className="text-[10px] text-[var(--rune-fg-faint)]">
                      {selectedItem.lang.toUpperCase()}
                    </span>
                  </div>
                  <div className="p-4 overflow-y-auto max-h-[50vh] text-[var(--rune-fg-base)] scrollbar-thin">
                    <pre className="whitespace-pre">
                      {selectedItem.code}
                    </pre>
                  </div>
                </div>

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
                  href={`https://github.com/rune-lang/rune/blob/main/src/${selectedItem.filename}`}
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
