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
| `Ctrl+J` / `Cmd+J` | Open Claude Code |
| `Shift+Tab` | Toggle auto-accept mode |
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
/cost           View session costs
/status         Context status
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
/new            New session
/resume         Resume previous session
/sessions       List sessions
```

## Context Navigation

| Command | Effect |
|---------|--------|
| `/compact` | Summarize and free up space |
| `/clear` | Full reset |
| `#file` | Add file to context |

## Custom Slash Commands

```
# Invoke a custom command
/command-name [args]

# Defined in:
.claude/commands/command-name.md
```

## Essential Tips

**Verbosity control** — Use `--no-stream` to see the full response at once.

**Multiline** — `Shift+Enter` in the terminal to add a new line without submitting.

**Vim mode** — Add `{"vim": true}` to `~/.claude/settings.json` for Vim keybindings.
