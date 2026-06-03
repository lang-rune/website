---
title: Control Flow
description: Conditional branch testing and truthiness in Rune.
---

Rune uses conditional structures to control execution flow.

---

## Conditionals: `if / otherwise`

Rune uses `if` and `otherwise` (instead of `else` or `else if`) to construct conditional branches. Parentheses around the conditions are optional and braces `{}` are required.

```rune
if score > 90 {
    write("Excellent!")
} otherwise {
    write("Keep practicing!")
}
```

### Else-If Chains

You can chain multiple checks using `otherwise condition`:

```rune
if temperature > 30 {
    write("Hot")
} otherwise temperature > 15 {
    write("Warm")
} otherwise {
    write("Cold")
}
```

---

## Truthiness

Conditions are evaluated for their truthiness. The following values are considered **falsy** in Rune:

- `empty`
- `no` (boolean false)
- `0` (the number zero)
- `""` (empty word string)

**Everything else is truthy**, including non-empty words (like `"no"`), non-zero numbers, and `yes`.
