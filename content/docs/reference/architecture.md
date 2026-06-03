---
title: Interpreter Architecture
description: Understanding the implementation details of the Rune interpreter.
---

Rune is implemented in Python (3.10+) as a classic tree-walk interpreter. The pipeline is separated into individual stages:

```
Source text (.rune) -> Lexer -> Parser -> AST -> Interpreter -> output
```

---

## Package Structure

The codebase is organized into modular Python packages under the `rune` folder:

```
rune/
├── lexer/        # character scanning, keyword maps, tokens definitions
├── ast/          # Abstract Syntax Tree nodes representation classes
├── parser/       # recursive-descent syntax parser
└── runtime/      # tree-walk evaluator, environment chain, builtins
```

---

## 1. Lexer Scanner (`rune/lexer/`)

The lexer scans the raw input text character-by-character in a single pass to emit a flat list of `Token` structures.
- **Keywords** (`keywords.py`) maps word lexemes (like `spell` or `set`) to `TokenType` enum tokens.
- **Tokens** (`token.py` / `token_types.py`) track values and exact `line` / `column` coordinates for syntax error pointing.

---

## 2. Recursive-Descent Parser (`rune/parser/`)

The parser consumes the list of tokens to build a hierarchy of typed syntax nodes (AST).
- **Recursive Descent** implements one parsing method per grammar rule (e.g., `parse_statement`, `parse_expression`).
- **Operator Precedence** (`precedence.py`) defines precedence levels and groups operators (like `TERM_OPS` or `FACTOR_OPS`) to handle complex calculations without Pratt parser overhead.

---

## 3. Abstract Syntax Tree (`rune/ast/`)

Every AST node in `nodes.py` is a simple Python class deriving from `ASTNode` containing no runtime logic, representing structural grammar.
- **Expressions** (e.g. `BinaryOp`, `FunctionCall`, literals) produce values.
- **Statements** (e.g. `IfStatement`, `WhileStatement`, `SpellDefinition`) perform actions.

---

## 4. Interpreter Runtime (`rune/runtime/`)

The interpreter Walks the AST nodes recursively.
- **Visitor Pattern** (`interpreter.py`) maps visits dynamically: `visit_NumberLiteral`, `visit_BinaryOp`, etc.
- **Environment Stack** (`environment.py`) stores bound variables. Calling a spell creates a parent-linked `Environment` chain pointing to the spell's definition environment, creating dynamic lexical scopes.
- **Control Primitives** (`signals.py`) propagates loops control (`skip`, `stop`) and function exits (`ReturnSignal`) upwards using native Python exceptions.
