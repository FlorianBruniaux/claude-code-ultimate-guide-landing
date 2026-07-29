---
title: "Permission Modes"
subtitle: "The 5 Claude Code permission modes ranked: Default, Auto-accept edits, Auto-accept all, Full bypass, Auto"
cardNumber: T03
category: Technical
difficulty: beginner
guideVersion: 3.32.1
order: 3
---

## Available Modes

| Mode | Flag | Recommended use |
|------|------|-----------------|
| **Manual** (`default`) | _(none)_ | Daily development |
| **Auto-accept edits** (`acceptEdits`) | `Shift+Tab` | Code reviews |
| **Plan** (`plan`) | `Shift+Tab x2` or `/plan` | Analysis without modification |
| **Auto** (`auto`, AI classifier) | `permissions.defaultMode: "auto"` | Long tasks, fewer interruptions |
| **Don't ask** (`dontAsk`) | `--permission-mode dontAsk` | CI, only pre-approved tools run |
| **Full bypass** (`bypassPermissions`) | `--dangerously-skip-permissions` | Headless CI/CD, sandboxed |
| **Fewer prompts** | `/fewer-permission-prompts` | Generates an allowlist from transcripts (shipped as `/less-permission-prompts` in v2.1.111) |

**Note (v2.1.121):** `--dangerously-skip-permissions` now also skips validation of the `.claude/` directory (agents, commands, hooks). In hardened environments, verify `.claude/` contents before granting this flag.

## Tool Whitelist

```bash
# Allow only specific tools
claude --allowedTools "Read,Grep,Glob"

# Block specific tools
claude --disallowedTools "Bash,Write"

# Useful combinations
claude --allowedTools "Read,Edit,Bash(git*)"
```

## Configuration in settings.json

```json
{
  "permissions": {
    "allow": [
      "Bash(git log*)",
      "Bash(npm test*)",
      "Read",
      "Edit"
    ],
    "deny": [
      "Bash(rm*)",
      "Bash(sudo*)"
    ]
  }
}
```

## Permission Hierarchy

Permissions accumulate and are inherited in this order:

1. `~/.claude/settings.json` — global user
2. `.claude/settings.json` — project (shared)
3. `.claude/settings.local.json` — project (local, gitignored)
4. CLI flags — session only

## Glob Patterns for Bash

```bash
# Allow git only
"Bash(git *)"

# Allow npm test and build
"Bash(npm test*)", "Bash(npm run build*)"

# Allow file reading
"Bash(cat *)", "Bash(ls *)"
```

## Best Practices

**CI/CD** — Always use `--dangerously-skip-permissions` with a sandboxed environment (Docker, ephemeral container). Never on a shared production machine.

**Sensitive projects** — Restrict Bash tools with precise globs in `.claude/settings.json`. Commit this file so the whole team uses the same constraints.

**Audit** — Claude's actions are logged in `~/.claude/logs/`. Verifiable at any time.
