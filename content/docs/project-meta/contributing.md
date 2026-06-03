---
title: Contributing Guide
description: Guidelines for contributing to the Rune project.
---

We welcome contributions to the Rune interpreter, VS Code extension, and website!

---

## Code Style

- **Python Core** — Standard PEP 8 formatting. Relative imports must be preserved to prevent stdlib `ast` namespace collisions.
- **VS Code Extension** — TypeScript command/service architecture.
- **Website** — Next.js 15, Tailwind v4, HSL design tokens matching `DESIGN.md`.

---

## Running the Core Tests

Before submitting changes, make sure the integration test suite passes:

```bash
# Run from the root workspace directory:
python -m unittest rune.tests.test_interpreter -v
```

Tests cover number math, variables hoisting, spells recursion, loops skip/stop control signals, and condition chains.

---

## Submitting Pull Requests

1. Fork the target repository (`lang-rune/rune`, `lang-rune/website`, or `lang-rune/vscode`).
2. Create a feature branch.
3. Write clear, documented code. Include test cases in `test_interpreter.py` if changing the language core.
4. Verify tests pass.
5. Open a Pull Request on GitHub.
