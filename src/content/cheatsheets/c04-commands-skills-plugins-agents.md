---
title: "Skills, Plugins & Agents"
subtitle: "Choosing the right extension mechanism for the need"
cardNumber: C04
category: Design
difficulty: intermediate
guideVersion: 3.32.3
order: 204
---

## Comparison table

| Mechanism | Invocation | Scope | Resources | Use case |
|-----------|-----------|-------|-----------|----------|
| **Skill (user)** | `/name` by user | Reusable | Yes | Workflow procedure, user-triggered |
| **Skill (auto)** | Model decides | Reusable | Yes | Domain knowledge, auto-loaded |
| **Plugin** | Marketplace | Global | Yes | Third-party ecosystem |
| **Agent** | Auto or manual | Cross-session | Via memory | Complex delegation |

## User-Invocable Skills (formerly Commands)

Since CC 2.1.3, custom slash commands live in `.claude/skills/` with `disable-model-invocation: true`. This flag makes the skill user-only: the model will not auto-load it, but `/name` invocation works as before.

```
.claude/skills/
├── release/
│   ├── SKILL.md          # disable-model-invocation: true
│   └── checklist.md
├── security-check/
│   └── SKILL.md          # /security-check
└── sync/
    └── SKILL.md          # /sync
```

```yaml
# .claude/skills/release/SKILL.md
---
name: release
description: Release workflow — bump version, update changelog, tag
allowed-tools: [Read, Write, Bash]
disable-model-invocation: true
---
Run the release process for $ARGUMENTS[0] bump...
```

**When to choose:** you have a procedure you trigger manually (commit formatting, PR creation, deployment checklist). Add `disable-model-invocation: true` so the skill never fires on its own.

## Model-Invocable Skills

A Skill without `disable-model-invocation` can be auto-loaded by the model when context matches the `description` trigger. It is a structured knowledge module with optional embedded resources (docs, checklists, examples).

```yaml
# .claude/skills/security-guardian/SKILL.md
---
name: security-guardian
description: OWASP expertise, auth review, and data protection patterns
allowed-tools: [Read, Grep, Bash]
---
Apply OWASP Top 10 checks systematically...
```

**When to choose:** domain knowledge that should activate automatically when the model detects the right context (security review, TDD cycle, PDF generation).

**Note on the 56% caveat:** auto-invocation works in about 56% of cases in evals. For critical instructions that must always apply, use `.claude/rules/` instead.

## Plugins

Plugins come from the marketplace and add external capabilities (Context7 for documentation, Linear MCP for tickets, Figma MCP for design-to-code). Install via `/plugin marketplace add`.

**When to choose:** an integration with an existing third-party service covers exactly your need. Do not build what already exists.

## Agents

An Agent is a specialized Claude instance with its own tools, scope, and optionally its own memory. It isolates context, not just instructions.

```yaml
# .claude/agents/security-audit.md
---
name: security-audit
model: opus
tools: Read, Grep, Glob
---
Analyze code for OWASP vulnerabilities...
```

**When to choose:** you have a long or recurring task that would pollute the main context, or work that can run in parallel while you continue elsewhere.

## Quick decision rule

Procedure triggered by you = **User-Invocable Skill** (`disable-model-invocation: true`). Know-how loaded by context = **Model-Invocable Skill**. A third-party integration = **Plugin**. A task to fully delegate with its own context = **Agent**.
