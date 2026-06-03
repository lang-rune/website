---
title: Built-in Functions
description: Reference documentation for standard library built-ins.
---

Rune includes a small set of built-in functions that are globally available without importing.

---

## Function Reference

| Function | Argument(s) | Return Type | Description |
|---|---|---|---|
| `write(...)` | Zero or more values | `empty` | Prints arguments separated by spaces, followed by a newline, to standard output. |
| `input(prompt)` | `prompt` (optional word) | `word` | Reads a line of text from standard input and returns it. |
| `type(val)` | Any value | `word` | Returns a string representation of the value's type (`"number"`, `"word"`, `"boolean"`, `"empty"`). |
| `length(val)` | Word | `number` | Returns the character count of the word. Raises runtime error for non-words. |
| `number(val)` | Any value | `number` | Converts value to a number. Word strings must be parseable. Booleans convert to `1` (`yes`) or `0` (`no`). |
| `word(val)` | Any value | `word` | Converts a value to its string representation. |

---

## Examples

### Converting Types

```
set user_input = input("Enter score: ")
set numeric_score = number(user_input)
write("Double score is: ", numeric_score * 2)
```

### Checking Types

```
set x = yes
write(type(x)) # boolean
```
