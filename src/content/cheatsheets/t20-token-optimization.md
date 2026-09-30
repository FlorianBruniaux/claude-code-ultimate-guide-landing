---
title: "Token Optimization"
subtitle: "Reducing token consumption without losing quality"
cardNumber: T20
category: Technical
difficulty: intermediate
guideVersion: 3.41.0
order: 20
---

## RTK: Upstream Filtering

RTK (Rust Token Killer) intercepts command outputs **before** they enter Claude's context. It is not a post-hoc summary, it is a filter that eliminates structurally redundant noise. Disclosure: the author of this guide is a core contributor to RTK.

```bash
# Installation
brew install rtk
# or: cargo install --git https://github.com/rtk-ai/rtk

# Initialize in a project (sets up the hook automatically)
rtk init
```

## Measured Savings

| Command | Without RTK | With RTK | Reduction |
|---------|------------|---------|-----------|
| `git log` | 13,994 chars | 1,076 chars | **92%** |
| `git status` | 100 chars | 24 chars | **76%** |
| `vitest run` | ~50,000 chars | ~5,000 chars | **90%** |
| `pnpm list` | ~8,000 chars | ~2,400 chars | **70%** |

These are per-command output reductions, not session or bill reductions. Whole-task measurements of RTK alone differ by study: JetBrains measured +7.6% median cost per task at low reasoning effort and +0.1% at high effort, Dasein +13% total cost, THOL +7.1% with an interval that crosses zero, and Codepointer's replay -0.5% of spend. RTK's maintainers dispute the JetBrains design and report -4.8% on 13 dev tasks (p = 0.305) in their own re-run. Details: https://cc.bruniaux.com/token-savings/

## Essential RTK Commands

```bash
rtk git status        # Condensed git
rtk git log           # Clean log output
rtk cargo test        # Filtered Rust tests
rtk vitest run        # Condensed JS tests
rtk gh pr view 123    # Optimized GitHub PR
rtk gain              # Savings dashboard
```

## Compact: Freeing Up Context

`/compact` summarizes the conversation history and frees roughly 40-50% of used context, without losing the thread of the session. Use it proactively at 70% usage, not as an emergency measure at 90%.

```
/compact              # Summarize the current session
```

The difference from `/clear`: compact preserves session continuity, clear starts from scratch.

## `.claudeignore`: Excluding Noise

```
node_modules/
.next/
dist/
*.lock
coverage/
```

Without this file, Claude may read thousands of irrelevant files during a global search, consuming context unnecessarily.

## Efficient Prompt Rules

**Target, don't load:**
- "Check the `login` function in `auth.ts:45-60`" rather than "Check auth.ts for issues"
- Reference symbols (`calculateTotal`) rather than entire files
- Avoid pasting large JSON blobs or raw logs into the prompt

**What consumes the most:**

| Action | Estimated tokens |
|--------|----------------|
| Reading a large file (2000 lines) | ~5K+ |
| MCP call (Serena, Context7) | ~2K per call |
| Long conversation without /compact | Accumulation |
| Tests with full unfiltered output | 3K-10K |

## Combined Strategy

RTK reduces the cost of bash commands (preventive). `/compact` frees up context mid-session (curative). `.claudeignore` avoids unnecessary reads (structural). These three levers are complementary and apply in parallel.
