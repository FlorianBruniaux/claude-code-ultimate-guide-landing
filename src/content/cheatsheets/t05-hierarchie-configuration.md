---
title: "Configuration Hierarchy"
subtitle: "Where to configure what — from global to local"
cardNumber: T05
category: Technical
difficulty: beginner
guideVersion: 3.32.1
order: 5
---

## Configuration Levels

| Level | File | Scope | Git |
|-------|------|-------|-----|
| Global user | `~/.claude/settings.json` | All projects | No |
| Global rules | `~/.claude/CLAUDE.md` | All projects | No |
| Shared project | `.claude/settings.json` | Team | Yes |
| Local project | `.claude/settings.local.json` | Personal | No |
| Project rules | `CLAUDE.md` (root) | Team | Yes |
| Subfolder | `subfolder/CLAUDE.md` | Folder | Yes |

## Conflict Resolution

```
~/.claude/CLAUDE.md          (1 - global base)
↓ + merge
./CLAUDE.md                  (2 - project rules)
↓ + merge
subfolder/CLAUDE.md          (3 - local rules)
↓ + merge
@explicit import             (4 - inline import)
```

Rules at a lower level **supplement** rather than replace higher levels.

## settings.json — Structure

```json
{
  "model": "claude-opus-4-5",
  "permissions": {
    "allow": ["Bash(git *)"],
    "deny": ["Bash(rm -rf*)"]
  },
  "env": {
    "ANTHROPIC_LOG": "error"
  }
}
```

## CLAUDE.md — Best Practices

```markdown
# Project Conventions

## Stack
- TypeScript strict mode
- pnpm (not npm)
- Tests: Vitest

## Rules
- Always check types before modifying
- Commits in English
- Never modify package-lock.json
```

## What Goes Where

**Global CLAUDE.md** — Personal preferences, code style, universal conventions.

**Project CLAUDE.md** — Architecture, stack, team conventions, build/test commands.

**Project settings.json** — Tool permissions, default model, dev environment variables.

**settings.local.json** — Personal overrides that should not affect the team.

## Persistent configuration via `/config` (v2.1.119)

`/config` lets you view and change settings inside a session, with the option to persist them to `settings.json`. Changes made via `/config` follow the same override precedence: a project-level setting will override a global one, and a `settings.local.json` entry will override `settings.json`.

```
/config              # Open interactive config editor
/config model        # Change default model (persists to settings.json)
```

## Required .gitignore

```
# In the project .gitignore
.claude/settings.local.json
```
