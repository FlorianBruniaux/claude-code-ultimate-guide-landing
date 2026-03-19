---
title: "Commands, Skills, Plugins & Agents"
subtitle: "Choosing the right extension mechanism for the need"
cardNumber: C04
category: Design
difficulty: intermediate
guideVersion: 3.32.1
order: 204
---

## Comparison table

| Mechanism | Scope | Persistence | Resources | Use case |
|-----------|-------|-------------|-----------|----------|
| **Command** | Single prompt | Session | No | Repeatable one-off task |
| **Skill** | Reusable capability | Cross-session | Yes | Shared expertise |
| **Plugin** | Marketplace | Global | Yes | Third-party ecosystem |
| **Agent** | Autonomous specialist | Cross-session | Via memory | Complex delegation |

## Commands: one-off tasks

A command is a Markdown file in `.claude/commands/` that you invoke with `/command-name`. It is resolved at call time: its entire content is injected into the context as an instruction.

```
.claude/commands/
├── release.md        # /release
├── security-check.md # /security-check
└── sync.md           # /sync
```

**When to choose:** you have a sequence of instructions you type manually several times a week. A command codifies it once and for all.

## Skills: reusable know-how

A Skill is a structured knowledge module (SKILL.md file with YAML frontmatter) that Claude can invoke when needed. Unlike a command that runs explicitly, a Skill is loaded based on context.

```yaml
# .claude/skills/pdf-generator/SKILL.md
---
name: pdf-generator
description: Generates PDFs using the whitepaper-typst template
allowed-tools: [Read, Write, Bash]
---
Use quarto render --to whitepaper-typst...
```

**When to choose:** you have a technical process with variable parameters (PDF build, service deployment) that you want to fully delegate to Claude with guardrails.

**Note on the 56% warning:** Skills are invoked on demand, not automatically. If Claude does not invoke your Skill, use `.claude/rules/` (systematic loading) or an explicit Command instead.

## Plugins: third-party integrations

Plugins come from the marketplace and add external capabilities (Context7 for documentation, Linear MCP for tickets, Figma MCP for design-to-code). They are installed via `/plugin marketplace add`.

**When to choose:** an integration with an existing third-party service covers exactly your need. Do not build what already exists.

## Agents: complex task delegation

An Agent is a specialized Claude with its own tools, its own scope, and potentially its own memory. It serves to isolate context, not to simulate a human role.

```yaml
# .claude/agents/security-audit.md
---
name: security-audit
model: opus
tools: Read, Grep, Glob
---
Analyze code for OWASP vulnerabilities...
```

**When to choose:** you have a long task that would pollute the main context, or work that can run in parallel while you continue elsewhere.

## Quick decision rule

An instruction to repeat manually = **Command**. Know-how to encapsulate = **Skill**. A third-party integration = **Plugin**. A task to fully delegate with its own context = **Agent**.
