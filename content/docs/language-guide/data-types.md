---
title: Data Types
description: The four built-in data types in Rune.
---

Rune is a dynamically typed language with four core data types. Types are evaluated at runtime, and variables can change their type.

---

## Number

All numbers in Rune are IEEE 754 double-precision floating-point values. Rune does not distinguish between integers and decimal numbers at the language level.

```
set integer = 42
set decimal = 3.14159
set negative = -10
```

Whole values print without a decimal point (e.g., `42` instead of `42.0`).

---

## Word

A word is a text string delimited by single or double quotes.

```
set hello = "Hello, world!"
set language = 'Rune'
```

### Escape Sequences

Words support the following backslash escape sequences:

| Sequence | Character |
|---|---|
| `\n` | Newline |
| `\t` | Tab |
| `\\` | Backslash |
| `\"` | Double quote |
| `\'` | Single quote |

---

## Boolean

Rune uses plain-English keywords `yes` and `no` for booleans (instead of `true` and `false`).

```
set success = yes
set failure = no
```

---

## Empty

The `empty` keyword represents the absence of a value (similar to `null` or `None` in other languages).

```
set result = empty
```
