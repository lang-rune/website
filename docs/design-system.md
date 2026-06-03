# Rune Design System

Reference for all design tokens, typography, and component patterns used across the Rune Lang website. All values derive from `DESIGN.md`.

---

## Color Tokens

### Backgrounds

| Token                  | Dark            | Light           | Usage                      |
|------------------------|-----------------|-----------------|----------------------------|
| `--rune-bg-base`       | `#0A0A0B`       | `#F5F2EC`       | Page background            |
| `--rune-bg-raised`     | `#111114`       | `#EDEAE2`       | Cards, code blocks         |
| `--rune-bg-overlay`    | `#18181C`       | `#E5E1D7`       | Modals, dropdowns          |
| `--rune-bg-subtle`     | `#1E1E24`       | `#DBD7CC`       | Hover states, table rows   |

### Borders

| Token                  | Dark                      | Light                    |
|------------------------|---------------------------|--------------------------|
| `--rune-border`        | `rgba(255,255,255,0.07)`  | `rgba(0,0,0,0.08)`      |
| `--rune-border-strong` | `rgba(255,255,255,0.13)`  | `rgba(0,0,0,0.15)`      |

### Foreground

| Token              | Dark       | Light      | Usage                  |
|--------------------|------------|------------|------------------------|
| `--rune-fg-base`   | `#E8E8EE`  | `#1A1A1F`  | Primary text           |
| `--rune-fg-muted`  | `#7A7A8C`  | `#6B6860`  | Secondary text         |
| `--rune-fg-faint`  | `#3D3D4F`  | `#A8A49C`  | Disabled, placeholders |

### Accent (Amber/Gold)

| Token                  | Dark                        | Light                      |
|------------------------|-----------------------------|----------------------------|
| `--rune-accent`        | `#D4A24C`                   | `#8B5E1A`                  |
| `--rune-accent-dim`    | `#9A6F2A`                   | `#6B4712`                  |
| `--rune-accent-glow`   | `rgba(212,162,76,0.15)`     | `rgba(139,94,26,0.12)`     |
| `--rune-accent-subtle` | `rgba(212,162,76,0.07)`     | `rgba(139,94,26,0.06)`     |

### Syntax Highlighting

| Token                | Value     | Usage              |
|----------------------|-----------|--------------------|
| `--rune-syn-keyword` | `#C792EA` | `let`, `fn`, `if`  |
| `--rune-syn-string`  | `#C3E88D` | `"hello"`          |
| `--rune-syn-number`  | `#F78C6C` | `42`, `3.14`       |
| `--rune-syn-comment` | `#546E7A` | `# comment`        |
| `--rune-syn-fn`      | `#82AAFF` | function names     |
| `--rune-syn-operator`| `#89DDFF` | `+`, `-`, `==`     |
| `--rune-syn-variable`| `#EEFFFF` | identifiers        |

### Functional

| Token            | Value     | Usage   |
|------------------|-----------|---------|
| `--rune-success` | `#4ADE80` | Success |
| `--rune-warning` | `#FBBF24` | Warning |
| `--rune-error`   | `#F87171` | Error   |

---

## Typography

### Font Stack

| Family          | Font            | Usage                          |
|-----------------|-----------------|--------------------------------|
| `font-display`  | Fraunces        | Hero, H1, H2                  |
| `font-sans`     | DM Sans         | Body, navigation, UI           |
| `font-mono`     | JetBrains Mono  | Code, badges, technical labels |

### Type Scale

| Token          | Size     | Weight | Line Height | Usage                  |
|----------------|----------|--------|-------------|------------------------|
| `--rune-hero`  | 5.5rem   | 700    | 1.0         | Hero headline only     |
| `--rune-h1`    | 3.5rem   | 700    | 1.1         | Page titles            |
| `--rune-h2`    | 2.25rem  | 600    | 1.2         | Section headings       |
| `--rune-h3`    | 1.5rem   | 600    | 1.3         | Card titles            |
| `--rune-h4`    | 1.125rem | 600    | 1.4         | Sidebar headings       |
| `--rune-body`  | 1rem     | 400    | 1.7         | Body copy              |
| `--rune-sm`    | 0.875rem | 400    | 1.6         | Captions               |
| `--rune-xs`    | 0.75rem  | 500    | 1.5         | Labels, tags, badges   |
| `--rune-code`  | 0.875rem | 400    | 1.6         | Inline and block code  |

### Rules

- H1/H2 always use Fraunces at 700/600
- H3/H4 may use DM Sans at 600
- `letter-spacing: -0.02em` on H1 and above
- `text-wrap: balance` on all headlines
- Body line-height is 1.7

---

## Spacing

4px base grid:

| Token        | Value  |
|--------------|--------|
| `--space-1`  | 4px    |
| `--space-2`  | 8px    |
| `--space-3`  | 12px   |
| `--space-4`  | 16px   |
| `--space-5`  | 20px   |
| `--space-6`  | 24px   |
| `--space-8`  | 32px   |
| `--space-10` | 40px   |
| `--space-12` | 48px   |
| `--space-16` | 64px   |
| `--space-20` | 80px   |
| `--space-24` | 96px   |
| `--space-32` | 128px  |

Section vertical rhythm: `--space-24` between major sections, `--space-16` between subsections.

---

## Radius

| Token              | Value | Usage             |
|--------------------|-------|-------------------|
| `--rune-radius-sm` | 4px   | Inline code, tags |
| `--rune-radius-md` | 8px   | Buttons, inputs   |
| `--rune-radius-lg` | 12px  | Cards, code blocks|

---

## Layout

| Token                | Value   | Usage                  |
|----------------------|---------|------------------------|
| `--rune-max-content` | 720px   | Prose, docs body       |
| `--rune-max-wide`    | 1100px  | Feature grids          |
| `--rune-max-full`    | 1400px  | Overall page wrapper   |

---

## Component Patterns

### Buttons

- **Primary**: Amber bg, dark text, font-semibold, glow hover (`box-shadow: 0 0 0 3px var(--rune-accent-glow)`)
- **Outline** (secondary): Transparent + border-strong, amber border+text on hover
- **Ghost**: Muted text, subtle bg on hover

### Cards

- `bg-card` (raised), border (no shadow), `rounded-lg`
- Hover: border-strong + overlay bg transition

### Badges

- JetBrains Mono, `tracking-[0.02em]`, pill shape
- Default: muted bg + border + muted text
- Accent: amber subtle bg + amber border + amber text

### Tabs

- Editor-like: transparent bg, bottom border
- Active: amber bottom indicator, foreground text

### Code Blocks

- `.rune-codeblock`: raised bg, border, accent gradient top line
- `.rune-codeblock-header`: overlay bg, border-bottom, mono font
- Copy button visible on hover

---

## Rune Composition Components

Located in `components/rune/`:

| Component                  | Usage                                   |
|----------------------------|-----------------------------------------|
| `RuneCodeBlock`            | Syntax-highlighted code with copy       |
| `RuneBadge`                | Badge wrapper with accent prop          |
| `RuneCallout`              | Note/Warning/Tip callout boxes          |
| `RuneFeatureCard`          | Landing page feature cards              |
| `RuneArchitectureDiagram`  | Interpreter pipeline diagram            |
| `RuneContainer`            | Max-width wrapper (content/wide/full)   |
| `RuneSection`              | Section with vertical rhythm spacing    |

---

## Motion

- Entrance: `0.25s ease-out`. Exit: `0.2s ease-in`.
- Stagger list items: 50ms delay increments
- Scroll reveals: `whileInView` with cubic bezier `[0.22, 1, 0.36, 1]`
- No infinite looping animations except optional hero typewriter
