---
title: Quick Start
description: Get up and running with Rune in less than five minutes.
---

Once you have the compiler installed and added to your `PATH`, you can write and execute Rune programs immediately.

---

## 1. Writing Your First File

Rune source files typically use the `.rn` or `.rune` extension. 

Create a file named `hello.rn` in any folder with the following content:

```rune
# hello.rn
set message = "hello explorer"
write(message)
```

Run the file using the native `rune` CLI command in your terminal:

```bash
rune hello.rn
```

Output:
```
hello explorer
```

---

## 2. Language Basics

Here is a quick overview of variables, spells, and loops in Rune.

### Variables

Declare and reassign variables using the `set` keyword:

```rune
set name = "Kapil"
write("Name is: ", name)

# Reassignment:
set name = "Rune Developer"
write("Updated name is: ", name)
```

### Spells (Functions)

Define callable functions (spells) using the `spell` keyword. Parameters can be comma-separated or space-separated:

```rune
spell greet(name) {
    write("Hello, ", name)
}

greet("explorer")
```

### Control Flow & Loops

Test conditions using `if` and `otherwise` blocks. Loop using `while`, `repeat`, or `count`:

```rune
# Repeat block a fixed number of times:
repeat 3 times {
    write("Rune is running")
}

# Iterate over a numeric range:
count from 1 to 3 as i {
    write("Step: ", i)
}
```

---

## 3. Interactive REPL

Rune includes an interactive Read-Eval-Print Loop (REPL) for quick code testing.

Start the REPL by typing the compiler command with no arguments:

```bash
rune
```

You will see the interactive prompt:

```
Rune REPL (v0.2.0)
Type code and press Enter. Ctrl+C or Ctrl+D to exit.
>>> set greeting = "Welcome"
>>> write(greeting + " to Rune!")
Welcome to Rune!
>>> 
```

Press `Ctrl+C` or `Ctrl+D` (or type `exit`) to leave the REPL.
