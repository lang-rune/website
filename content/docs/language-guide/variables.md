---
title: Variables
description: Declaring, assigning, and scoping variables in Rune.
---

Variables in Rune store data values. Rune is dynamically typed, meaning a variable can hold any type of value and change its type over time.

## Declaration & Assignment

Variables are declared and assigned using the `set` keyword:

```rune
set name = "Rune"
set score = 100
set active = yes
```

There is no separate keyword for declaring a variable and reassigning it; the `set` keyword is used for both.

```rune
set score = 0
# Reassignment:
set score = score + 10
write(score) # 10
```

---

## Scoping Rules

Rune uses lexical scoping through a chain of parent-linked environments:

- **Local Scope** — Spells (functions) and loops introduce a new local scoping frame.
- **Innermost Binding** — The `set` statement defines the variable on the current innermost environment scope frame.
- **Hoisting / Variable Lookup** — When looking up a variable (e.g. `write(x)`), the interpreter searches the current scope. If not found, it traverses up the parent chain until the global environment is reached.
- **Assignment Limitation** — Because `set` always defines the variable on the current scope, assigning to a captured variable from an outer scope inside a spell defines a new local variable in the inner scope instead of modifying the outer scope.

```rune
set x = 10

spell check() {
    # This reads x from the outer scope:
    write(x) # 10

    # This creates a NEW local x inside check():
    set x = 20
    write(x) # 20
}

check()
write(x) # 10 (outer x remains unchanged)
```
