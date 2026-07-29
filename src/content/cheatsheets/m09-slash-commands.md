---
title: "Slash Commands"
subtitle: "Create reusable custom commands"
cardNumber: M09
category: Methodology
difficulty: intermediate
guideVersion: 3.32.3
order: 109
---

## Principle

A slash command is a Markdown file that defines a workflow. Claude executes it as if it had received that text as a prompt, with the ability to pass dynamic arguments.

> **CC 2.1.3:** Custom slash commands now live in `.claude/skills/` with `disable-model-invocation: true`. The old `.claude/commands/` directory is no longer used for new projects.

## File locations

```
.claude/skills/              # Project skills (team) — since CC 2.1.3
├── commit/
│   └── SKILL.md             → /commit
├── review-pr/
│   └── SKILL.md             → /review-pr
└── tech/
    └── deploy/
        └── SKILL.md         → /tech:deploy

~/.claude/skills/            # Global skills (personal)
├── release/
│   └── SKILL.md             → /release
└── sync/
    └── SKILL.md             → /sync
```

Global skills are available in all sessions, regardless of the project.

## SKILL.md frontmatter for user-invocable skills

```yaml
---
name: commit
description: Generate a conventional commit from staged changes
allowed-tools: [Read, Bash]
disable-model-invocation: true
---
```

The `disable-model-invocation: true` flag is what makes a skill user-only — it prevents the model from auto-loading it based on context matching.

## Invocation and arguments

```
/commit                    # No argument
/tech:deploy production    # Positional argument
/release minor             # Version bump
```

In the Markdown body, arguments are accessible via variables:

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

## Native commands (built-in since recent versions)

| Command | Available since | Purpose |
|---------|----------------|---------|
| `/usage` | v2.1.118 | Token usage + per-model cost breakdown |
| `/cost` | v2.1.118 | *(alias for `/usage`)* |
| `/stats` | v2.1.118 | *(alias for `/usage`)* |
| `/recap` | v2.1.108 | Session summary |
| `/undo` | v2.1.108 | *(alias for `/rewind`)* return to a checkpoint |
| `/tui [default\|fullscreen]` | v2.1.110 | Pick the terminal renderer and relaunch into it |
| `/focus` | v2.1.110 | Focus view: last prompt, tool-call summary, final response (fullscreen only) |
| `/ultrareview` | v2.1.114 | Multi-agent cloud review, now an alias of `/code-review ultra` |
| `/fewer-permission-prompts` | v2.1.111 | Propose a read-only allowlist from transcripts (shipped as `/less-permission-prompts`) |
| `/effort` | v2.1.111 | Effort level: low/medium/high/xhigh/max/ultracode |
| `/proactive` | v2.1.105 | *(alias for `/loop`)* rerun a prompt on repeat |
| `/code-review [level]` | v2.1.152 | Review the diff for correctness bugs; `--fix` applies them |
| `/doctor` | v2.1.205 | Full setup checkup (install, settings, hooks, `CLAUDE.md` bloat) |

The complete list of ~100 built-in commands lives at [code.claude.com/docs/en/commands](https://code.claude.com/docs/en/commands).

## Useful custom skills (user-invocable) to create

| Command | Usage |
|---------|-------|
| `/commit` | Automatic conventional commit |
| `/review-pr` | PR review against project criteria |
| `/release [patch|minor|major]` | Version bump + changelog |
| `/sync` | Multi-file consistency check |
| `/security-check` | Quick config scan |

## Skill (user) vs Skill (auto) vs Agent

| Mechanism | When to use |
|-----------|-------------|
| **Skill (user-invocable)** | One-off workflow, procedure to follow — `disable-model-invocation: true` |
| **Skill (model-invocable)** | Reusable knowledge + embedded resources — auto-loads on context match |
| **Agent** | Recurring specialist with own memory |

A user-invocable skill cannot embed additional reference files without a skill folder — for that, create a full skill directory with `SKILL.md` plus resource files. A skill has no persistent memory — for that, use an agent.

## Practical tips

One skill, one responsibility. As soon as a skill does two distinct things, split it. Name with an action verb first (`commit`, `release`, `sync`) so that the intent is immediately readable in the list of available commands.
