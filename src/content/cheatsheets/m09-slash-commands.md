---
title: "Slash Commands"
subtitle: "Create reusable custom commands"
cardNumber: M09
category: Methodology
difficulty: intermediate
guideVersion: 3.32.1
order: 109
---

## Principle

A slash command is a Markdown file that defines a workflow. Claude executes it as if it had received that text as a prompt, with the ability to pass dynamic arguments.

## File locations

```
.claude/commands/          # Project commands (team)
├── commit.md              → /commit
├── review-pr.md           → /review-pr
└── tech/
    └── deploy.md          → /tech:deploy

~/.claude/commands/        # Global commands (personal)
├── release.md             → /release
└── sync.md                → /sync
```

Global commands are available in all sessions, regardless of the project.

## Invocation and arguments

```
/commit                    # No argument
/tech:deploy production    # Positional argument
/release minor             # Version bump
```

In the Markdown file, arguments are accessible via variables:

```markdown
Deploy to environment: $ARGUMENTS[0]
With strategy: $ARGUMENTS[1]

If no argument provided: use "staging" by default.
```

The `$0`, `$1` syntax is equivalent to `$ARGUMENTS[0]`, `$ARGUMENTS[1]`. The old dot notation (`$ARGUMENTS.0`) is deprecated since v2.1.19.

## Recommended structure

```markdown
# Command Name

## Objective
What this command does in one sentence.

## Process
1. **Step 1** — detailed instructions
2. **Step 2** — detailed instructions
3. **Step 3** — detailed instructions

## Arguments
- $0: target environment (default: staging)

## Output format
Description of the expected result.
```

## Useful commands to create

| Command | Usage |
|---------|-------|
| `/commit` | Automatic conventional commit |
| `/review-pr` | PR review against project criteria |
| `/release [patch|minor|major]` | Version bump + changelog |
| `/sync` | Multi-file consistency check |
| `/security-check` | Quick config scan |

## Command vs Skill vs Agent

| Mechanism | When to use |
|-----------|-------------|
| **Command** | One-off workflow, procedure to follow |
| **Skill** | Reusable knowledge + embedded resources |
| **Agent** | Recurring specialist with own memory |

A command cannot embed additional reference files — for that, use a skill. A command has no persistent memory — for that, use an agent.

## Practical tips

One command, one responsibility. As soon as a command does two distinct things, split it. Name with an action verb first (`commit`, `release`, `sync`) so that the intent is immediately readable in the list of available commands.
