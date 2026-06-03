---
title: Installation
description: How to set up Rune on your local machine.
---

Rune is built in pure Python and has zero third-party dependencies. Setting it up is quick and straightforward.

## Prerequisites

To run Rune, you will need **Python 3.10 or later** installed on your system.

You can verify your Python version by running:

```bash
python --version
```

---

## Setup

1. **Clone the Repository**

   Clone the Rune Core repository from GitHub:

   ```bash
   git clone https://github.com/lang-rune/rune.git
   cd rune
   ```

2. **Verify Installation**

   Run the test suite to ensure everything is working correctly:

   ```bash
   python -m unittest rune.tests.test_interpreter -v
   ```

   You should see a message indicating all tests have passed.
