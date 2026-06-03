---
title: Spells
description: Declaring and calling spells (functions) in Rune.
---

Functions in Rune are called **spells** and are declared and invoked using a simple, readable syntax.

---

## Defining a Spell

Spells are defined using the `spell` keyword, followed by the spell name, a parenthesized parameter list, and a block statement enclosed in braces `{}`:

```
spell greet(name) {
    write("Greetings,", name)
}
```

### Parameters

Parameters inside the parentheses can be space-separated or comma-separated. Both forms are valid:

```
# Space-separated parameters (idiomatic):
spell add(a b) {
    return a + b
}

# Comma-separated parameters:
spell add(a, b) {
    return a + b
}
```

---

## Invoking a Spell

You can invoke (call) a spell in two ways:

1. **Direct Call** — Standard call syntax common in most languages.
2. **Explicit Cast Call** — Prefixed with the `cast` keyword. Both forms are identical.

```
# Direct call:
greet("explorer")

# Explicit cast call:
cast greet("explorer")
```

---

## Return Values

Use the `return` keyword to exit a spell early and return a value:

```
spell max(a, b) {
    if a > b {
        return a
    }
    return b
}
```

If a spell completes execution without hitting a `return` statement, it implicitly returns `empty`.
