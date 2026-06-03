---
title: Installation
description: Learn how to set up the Rune compiler on your machine.
---

Rune can be installed as a portable native binary or run directly from the Python source code.

---

## End Users (Recommended)

End-user installation does **not** require Python. Rune is distributed as a pre-compiled standalone executable.

### 1. Download the ZIP Package

Get the latest portable ZIP archive:
* **Windows x64:** [rune-v0.2.0-windows-x64.zip](https://github.com/lang-rune/rune/releases/download/v0.2.0/rune-v0.2.0-windows-x64.zip)
* For other options, visit the [Downloads page](/docs/getting-started/downloads).

### 2. Extract the Archive

Extract the downloaded ZIP package to a folder of your choice (for example, `C:\Program Files\Rune\` or `C:\Users\YourName\rune\`).

The archive contains:
* `rune.exe` — The native compiler CLI executable.
* Sibling license and documentation metadata.

### 3. Verify Execution

Open your Command Prompt (`cmd`) or PowerShell, navigate to the folder where you extracted the files, and run:

```cmd
./rune.exe
```

This will run the interactive compiler REPL environment.

### 4. Add to System PATH (Optional)

To run the `rune` command from any folder in your terminal:
1. Search for **Environment Variables** in the Windows Start menu.
2. Select **Edit the system environment variables**.
3. Click the **Environment Variables...** button.
4. Under *User variables* or *System variables*, locate and select the `Path` variable, then click **Edit...**.
5. Click **New** and paste the absolute path to the directory containing your extracted `rune.exe`.
6. Click **OK** on all dialogs and restart your terminal.

Verify it works by typing `rune` in a new terminal window.

---

## Contributors

If you want to contribute to the core interpreter, compile binary targets, or build editor integrations, please refer directly to the [Contributing Guide](/docs/project-meta/contributing) for development setup, repository cloning, and test suite instructions.
