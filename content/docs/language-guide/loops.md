---
title: Loops
description: Iterating with while, repeat, and count loops.
---

Rune supports three distinct types of loops for iterating blocks of code: `while`, `repeat`, and `count`.

---

## While Loop

The `while` loop runs as long as its condition evaluates to a truthy value:

```
set count = 5
while count > 0 {
    write(count)
    set count = count - 1
}
# prints 5 4 3 2 1
```

---

## Repeat Loop

The `repeat` loop runs a block of code a fixed number of times. The loop count expression is evaluated once at the start:

```
repeat 3 times {
    write("hello")
}
# prints hello hello hello
```

The count value must evaluate to a `number`. Fractional values are automatically truncated to integers.

---

## Count Loop

The `count` loop iterates a loop variable over an inclusive integer range. The increment/decrement step direction is determined automatically based on the range bounds:

```
# Counting upwards:
count from 1 to 5 as i {
    write(i)
}
# prints 1 2 3 4 5

# Counting downwards:
count from 3 to 1 as n {
    write(n)
}
# prints 3 2 1
```

The loop variable is scoped exclusively to the body of the loop.

---

## Loop Control: `skip` and `stop`

All three loop variants support early iteration skips and loop termination:

- `skip` — Skips the remainder of the current loop body iteration (similar to `continue`).
- `stop` — Exits the loop block immediately (similar to `break`).

```
count from 1 to 10 as i {
    if i == 5 {
        skip
    }
    if i == 8 {
        stop
    }
    write(i)
}
# prints 1 2 3 4 6 7
```
