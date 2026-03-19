---
title: "Workspace Hygiene & .claudeignore"
subtitle: "Keeping context clean by excluding what Claude should not read"
cardNumber: T09
category: Technical
difficulty: beginner
guideVersion: 3.32.1
order: 9
---

## .claudeignore: same syntax as .gitignore

`.claudeignore` is placed at the project root and follows exactly the same syntax as `.gitignore`. The patterns it contains tell Claude Code which files and folders to exclude from its context exploration.

```gitignore
# Dependencies (heavy, useless for Claude)
node_modules/
.pnpm-store/
vendor/

# Secrets (essential protection)
.env
.env.*
*.pem
*.key
*credentials*

# Auto-generated (pure noise)
dist/
build/
.next/
coverage/
*.min.js

# Verbose logs
*.log
logs/
```

## Why it matters

Claude Code indexes project files to provide context. Without `.claudeignore`, it may read thousands of files inside `node_modules/` or 50 MB log files, which dilutes the quality of responses. Less noise in context means more precise answers and less token-expensive sessions.

## .gitignore vs .claudeignore

| File | Role | Scope |
|------|------|-------|
| `.gitignore` | Excludes from version control | Git |
| `.claudeignore` | Excludes from Claude exploration | Claude Code |

Both files coexist and are independent. You may want Git to ignore a file that Claude should read, or the reverse.

## Recommended .claude/ folder structure

```
.claude/
├── settings.json        # Team config (committed)
├── settings.local.json  # Local config (gitignore)
├── agents/              # Custom agents
├── commands/            # Slash commands
├── hooks/               # Automation scripts
├── rules/               # Auto-loaded conventions
└── memories/            # Manual memories
```

The `agents/`, `commands/`, `hooks/`, `rules/` and `skills/` folders are committed with the project. `settings.local.json` and `CLAUDE.md` (if personal) stay in `.gitignore`.

## Clean workspace checklist

- `node_modules/` in `.claudeignore`
- `.env` files excluded or outside the project directory
- Binaries and heavy assets ignored (`*.png`, `*.pdf`, `dist/`)
- Logs and generated files excluded
- `settings.local.json` in `.gitignore`
