---
title: Introduction
description: Welcome to Rune, a beginner-friendly programming language built in Python.
---

Rune is a handcrafted, interpreted programming language designed for learning, exploration, and understanding programming language internals. 

Rune uses plain-English keywords and a clean, consistent grammar that can be learned in an afternoon. It is a dynamically typed, interpreted language featuring closures, first-class functions (spells), and a small but complete standard library.

```rune
spell greet(name) {
    write("Hello, " + name + "!")
}

greet("world")
```

---

## Core Characteristics

Rune was built from the ground up to showcase the components of a programming language without unnecessary complexity:

- **Plain-English Syntax** — Read code like a sentence using keywords like `set`, `write`, `if / otherwise`, `while`, `repeat`, and `count from/to`.
- **Handcrafted Pipeline** — Complete compiler pipeline with a hand-rolled scanner (lexer), recursive-descent parser, Abstract Syntax Tree (AST), and a tree-walk interpreter.
- **Environment Scope Chains** — Fully implemented closure support using parent-linked scoping environment frames.
- **Dynamic Typing** — Variables are dynamically typed and can hold number, word, boolean, or empty values.
- **Zero Dependencies** — Written in pure Python 3.10+ with no external packages required.
