---
title: "Custom Agents"
subtitle: "Create specialized sub-agents to delegate tasks"
cardNumber: M08
category: Methodology
difficulty: intermediate
guideVersion: 3.32.1
order: 108
---

## Agent structure

An agent is a Markdown file placed in `.claude/agents/` with a YAML frontmatter. Claude Code discovers it automatically at session startup.

```yaml
---
name: code-reviewer
description: Use to review code before any commit
model: sonnet
tools: Read, Grep, Glob
memory: project
---
```

The file body contains instructions in Markdown: role, methodology, examples, constraints.

## Frontmatter fields

| Field | Required | Role |
|-------|----------|------|
| `name` | Yes | kebab-case identifier |
| `description` | Yes | Activation trigger (50-100 chars) |
| `model` | No | `haiku`, `sonnet` (default), `opus` |
| `tools` | No | Whitelist of accessible tools |
| `memory` | No | Persistent memory scope |
| `maxTurns` | No | Agentic turn limit |
| `permissionMode` | No | Permission control |
| `isolation` | No | `worktree` for git isolation |
| `color` | No | CLI color for visual distinction |

## The tools field: isolation by default

Limiting `tools` to what the agent actually needs reduces the exposure surface and accidental errors. A code review agent only needs `Read, Grep, Glob` — no reason to give it `Bash` or `Write`.

## Persistent memory (v2.1.32+)

```yaml
memory: project   # .claude/agent-memory/<name>/
memory: user      # ~/.claude/agent-memory/<name>/
memory: local     # .claude/agent-memory-local/<name>/
```

`project` memory is committed with the repo — useful for the agent to accumulate knowledge shared across the entire team. `local` memory stays private to the machine.

## Agent vs Slash Command

| Criterion | Agent | Slash Command |
|-----------|-------|---------------|
| Specialty | Yes, specific domain | No, generic workflow |
| Own memory | Yes (v2.1.32+) | No |
| Isolated tools | Yes, whitelist | No |
| Invocation | Automatic or manual | Manual only |
| Format | Markdown + frontmatter | Markdown template |

Create an agent when the task recurs regularly with stable context and tools. Create a command when it is a one-off workflow or a procedure to follow.

## Concrete example: code review agent

```yaml
---
name: code-reviewer
description: Use PROACTIVELY after every code modification
  to verify quality, security, and conventions
model: sonnet
tools: Read, Grep, Glob
memory: project
---

# Code Reviewer

Systematically verify: OWASP security, test coverage,
project convention compliance, and introduced technical debt.
```

The keyword `PROACTIVELY` in the description encourages Claude to invoke the agent without waiting for an explicit request.

## Non-interactive agent invocation (v2.1.119)

Two improvements for headless pipelines:

**`--print` honors agent frontmatter:** when using `-p` / `--print` with an agent, the agent's `tools` whitelist and `permissionMode` are respected — not bypassed. This means CI pipelines get the same safety constraints as interactive sessions.

**`--agent` honors `permissionMode`:** the `permissionMode` field in the agent frontmatter now applies when invoking via `--agent` flag:

```yaml
---
name: security-scanner
permissionMode: readonly
tools: Read, Grep, Glob
---
```

```bash
# permissionMode: readonly applies even in CI
claude --agent security-scanner -p "Scan src/ for OWASP issues"
```
