---
title: "Models & Thinking Modes"
subtitle: "Choosing the right model and the right level of reasoning"
cardNumber: T18
category: Technical
difficulty: beginner
guideVersion: 3.32.1
order: 18
---

## The Models

| Model | Input price/1M | Ideal for |
|-------|---------------|-----------|
| **Haiku 4.5** | $0.80 | Mechanical tasks, CI/CD |
| **Sonnet 4.6** | $3.00 | Day-to-day development (default) |
| **Opus 4.6** | $5.00 | Architecture, security, audits |
| **Opus 4.7** | — | Most capable model; xhigh effort available |

Sonnet is the natural starting point, covering 80% of use cases. Haiku cuts the cost by 4x on repetitive tasks (test generation, mass renaming). Opus only comes into play when deep reasoning genuinely changes the quality of the result. Opus 4.7 (`claude-opus-4-7`) is the most powerful option and is the only model with `xhigh` effort support.

## Switching Models

```bash
# Via slash command
/model

# Via flag at startup
claude --model haiku "Fix this typo in README.md"
claude --model opus "Design the auth system"
```

## Quick Decision Table

| Task | Model | Effort |
|------|-------|--------|
| Renaming, formatting | Haiku | low |
| Test generation | Haiku | low |
| Standard feature | Sonnet | medium |
| Module refactoring | Sonnet | high |
| System architecture | Opus | high |
| Critical security audit | Opus | max |

## Thinking Modes (Opus 4.6 / 4.7)

Opus 4.6 and 4.7 use **Adaptive Thinking**: the model dynamically allocates its compute budget based on request complexity. The `effort` parameter controls this depth.

**Effort levels** (v2.1.111+):

- **xlow**: absolute minimum, speed priority
- **low**: zero preamble, combined operations, mechanical tasks
- **default**: balanced (applies when no effort is set)
- **high**: design decisions, edge cases, multiple concerns — **default on Pro and Max plans since v2.1.117**
- **max**: cross-system reasoning, irreversible decisions (Opus 4.6)
- **xhigh**: maximum depth, Opus 4.7 only

## Controlling Thinking

```
Alt+T          Toggle on/off (current session)
/config        Persist across sessions
/effort        Set effort level interactively
/model + ←/→  Effort slider
```

The keywords `ultrathink` and `think hard` have had no functional effect since v2.0.67. Adaptive thinking is active by default on Opus 4.6 and 4.7.

**CI/CD:** use the `CLAUDE_EFFORT` env var to pin effort level in automated pipelines (v2.1.120):

```bash
CLAUDE_EFFORT=high claude -p "Review this PR" --dangerously-skip-permissions
```

## Golden Rule

**Start with Sonnet.** Move up to Opus only if the task involves irreversible decisions, multi-system reasoning, or a critical audit. Drop to Haiku for anything mechanical and predictable. Most sessions never need Opus.

## Multi-Agent Pattern

```yaml
# planner.md — exploration, read-only
model: opus
tools: Read, Grep, Glob

# implementer.md — mechanical execution
model: haiku
tools: Write, Edit, Bash
```

Assign models based on **role**, not perceived importance.
