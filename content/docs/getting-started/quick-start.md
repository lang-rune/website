---
title: Quick Start
description: Get up and running with Rune in less than five minutes.
---

Once you have Rune set up locally, you can start writing and executing Rune files immediately.

## Running a File

Rune source files typically end with the `.rune` extension. Create a file named `hello.rune` with the following content:

```rune
# hello.rune
set name = "Explorer"
write("Hello,", name)
```

Run the file from the root directory of the repository using:

```bash
python -m rune.cli.main hello.rune
```

Output:
```
Hello, Explorer
```

---

## Interactive REPL

Rune includes an interactive Read-Eval-Print Loop (REPL) for quick code experimentation.

Start the REPL by running the CLI runner with no arguments:

```bash
python -m rune.cli.main
```

You will see an interactive prompt where you can execute statements:

```
Rune REPL (v0.2.0)
Type code and press Enter. Ctrl+C or Ctrl+D to exit.
>>> set greeting = "Welcome"
>>> write(greeting + " to Rune!")
Welcome to Rune!
>>> 
```

Press `Ctrl+C` or `Ctrl+D` (or type `exit`) to leave the REPL.
