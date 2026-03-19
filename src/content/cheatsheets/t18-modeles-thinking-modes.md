---
title: "Models & Thinking Modes"
subtitle: "Choosing the right model and the right level of reasoning"
cardNumber: T18
category: Technical
difficulty: beginner
guideVersion: 3.32.1
order: 18
---

## The Three Models

| Model | Input price/1M | Ideal for |
|-------|---------------|-----------|
| **Haiku 4.5** | $0.80 | Mechanical tasks, CI/CD |
| **Sonnet 4.6** | $3.00 | Day-to-day development (default) |
| **Opus 4.6** | $5.00 | Architecture, security, audits |

Sonnet is the natural starting point, covering 80% of use cases. Haiku cuts the cost by 4x on repetitive tasks (test generation, mass renaming). Opus only comes into play when deep reasoning genuinely changes the quality of the result.

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

## Thinking Modes (Opus 4.6)

Opus 4.6 uses **Adaptive Thinking**: the model dynamically allocates its compute budget based on request complexity. The `effort` parameter controls this depth.

**Effort levels**:

- **low**: zero preamble, combined operations, mechanical tasks
- **medium**: defined pattern, bounded scope, single concern
- **high**: design decisions, edge cases, multiple concerns
- **max**: cross-system reasoning, irreversible decisions (Opus 4.6 only)

## Controlling Thinking

```
Alt+T          Toggle on/off (current session)
/config        Persist across sessions
/model + ←/→  Effort slider low|medium|high
```

The keywords `ultrathink` and `think hard` have had no functional effect since v2.0.67. Adaptive thinking is active by default on Opus 4.6.

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
