---
title: "Essential Commands"
subtitle: "Keyboard shortcuts & indispensable slash commands"
cardNumber: T01
category: Technical
difficulty: beginner
guideVersion: 3.32.1
order: 1
---

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Shift+Tab` | Cycle permission mode (Manual, acceptEdits, Plan) |
| `Ctrl+O` | Toggle verbose transcript |
| `Ctrl+C` | Interrupt generation |
| `Esc` | Cancel current action |
| `↑` / `↓` | Message history |
| `Tab` | Path completion |

## Core Slash Commands

```
/help           Help and available commands
/clear          Clear context (reset)
/compact        Compress history
/model          Switch model
/usage          View session costs and token breakdown (per model)
/cost           *(alias for /usage since v2.1.118)*
/status         Context status
/recap          Summary of current session (v2.1.108)
/undo           Undo the last action (v2.1.108)
```

## Permission Modes

```
claude                    Interactive mode (default)
claude --dangerously-skip-permissions
                          Full bypass (CI/CD)
claude --allowedTools "Edit,Read,Bash"
                          Tool whitelist
```

## Quick Start

```bash
# Launch Claude Code
claude

# With context file
claude --context CLAUDE.md

# Non-interactive mode (scripts)
claude -p "Analyze this file" < input.txt

# Continue last session
claude --continue
```

## Session Commands

```
/new            New session (alias for /clear)
/resume         Resume a session (opens the picker)
/branch         Fork the conversation here (v2.1.77)
```

## Context Navigation

| Command | Effect |
|---------|--------|
| `/compact` | Summarize and free up space |
| `/clear` | Full reset |
| `/usage` | Token usage + cost per model |
| `@file` | Reference a file in the prompt |

## Custom Slash Commands

```
# Invoke a user-invocable skill
/command-name [args]

# Defined in (CC 2.1.3+):
.claude/skills/command-name/SKILL.md
# with: disable-model-invocation: true
```

## Essential Tips

**Verbosity control** — Use `--no-stream` to see the full response at once.

**Multiline** — `Shift+Enter` in the terminal to add a new line without submitting.

**Vim mode** — `/config` → Editor mode, or `{"editorMode": "vim"}` in `~/.claude/settings.json`. The `/vim` command was removed in v2.1.92.
