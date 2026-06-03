---
title: Language Roadmap
description: Checklist of completed milestones and planned feature additions for Rune.
---

Rune is developed incrementally to explore language development concepts step-by-step.

---

## Completed

- **v0.1.0 — Initial Release** — Lexer scanner, recursive descent parser, typed AST nodes, tree-walk interpreter, dynamically typed variables, standard loops, first-class functions (spells), environment scope closures, and an interactive REPL shell.
- **v0.2.0 — Architecture Refactor** — Split codebase into clean package directories (`lexer/`, `parser/`, `runtime/`, `ast/`), isolated control-flow signals (skip, stop, return exceptions), and extracted keyword token config lists.
- **VS Code Extension** — Basic editor tooling workspace with TextMate syntax rules, snippets, and integrated execution terminals.

---

## Planned

### Near-term

- **Lists** — Ordered mutable collections: `set items = [1 2 3]`, referencing `items[0]`, and `length(items)`.
- **List Iteration** — Loop statements: `for item in items { ... }`.
- **Multiline Strings** — Triple-quoted word literals.
- **String Escape Extensions** — Robust unicode and custom escapes parsing.
- **Compound Assignment** — Syntactic sugar `set x += 1` and `set x -= 1`.

### Medium-term

- **Modules** — Importing other files: `import math` to namespace `.rune` file targets.
- **Exports** — Exposing select spells from module files.
- **Error Handling** — Structured catch blocks for tracking exceptions.
- **Standard Library** — Integrated utility libraries for math calculations and file I/O operations.

### Long-term

- **Bytecode Compiler** — Compiling the high-level AST into compact, dense instructions.
- **Virtual Machine** — Designing a stack-based VM to execute instructions, improving speed.
- **LSP Integration** — Custom Language Server Protocol for completions and diagnostics in editors.
- **Formatter** — Enforcing standard, canonical code style guidelines.
- **Package Manager** — Tooling to share and install third-party Rune modules.
