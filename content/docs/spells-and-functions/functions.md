---
title: First-Class Functions
description: Using functions as first-class values in Rune.
---

In Rune, functions are called **spells**. They are first-class citizens, meaning they are values that can be assigned to variables, passed as arguments, and returned from other spells.

---

## Assignment to Variables

You can assign a defined spell to a variable by referencing its identifier without parentheses:

```
spell double(x) {
    return x * 2
}

# Assign spell to a variable:
set my_func = double

# Call the spell through the variable:
write(my_func(5)) # 10
```

---

## Functions as Arguments

Spells can accept other spells as parameters. This allows for high-order logic structures:

```
spell run_twice(func, value) {
    return func(func(value))
}

spell square(n) {
    return n * n
}

write(run_twice(square, 3)) # 81 (3 * 3 = 9, then 9 * 9 = 81)
```

---

## Closures

Spells capture the environment scope in which they were defined. The returned spell holds onto a reference to its definition context, creating a closure:

```
spell make_adder(n) {
    spell add(x) {
        return x + n
    }
    return add
}

set add5 = make_adder(5)
write(add5(10)) # 15
```
