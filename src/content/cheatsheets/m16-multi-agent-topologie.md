---
title: "Multi-Agent: Topology & Orchestration"
subtitle: "Architecting agent teams for complex tasks"
cardNumber: M16
category: Methodology
difficulty: advanced
guideVersion: 3.32.1
order: 116
---

## When to switch to multi-agent

A single agent remains optimal up to roughly 7 directories or 50 files. Beyond that, the context window fills to 80-90% just loading relevant files, leaving almost no room for reasoning. Distributing work across multiple agents keeps each around 40% utilization, with enough space to analyze and decide.

| Scope | Single agent | Team |
|-------|-------------|------|
| <10 directories | Comfortable (~30%) | Unnecessary |
| 50K lines | Degraded (80-90%) | Recommended |
| 100K+ lines | Context overflow | Essential |

## Star topology

The central orchestrator receives the global objective, breaks it down into subtasks, delegates to specialized agents, then synthesizes their results. This is the default topology for Claude Code Agent Teams.

```
Orchestrator
├── Security Agent  → auth analysis
├── Quality Agent   → code review
└── Test Agent      → coverage
```

The orchestrator plans and delegates; it does not code itself. Its role is to allocate work, unblock dependencies, and present a unified response.

## Pipeline topology

Agents work in sequence: the output of one becomes the input of the next. Useful when steps are strictly ordered and each result conditions the next.

```
Analyst → Architect → Implementer → Reviewer
```

Advantage: each agent focuses on a precise phase, without noise from previous phases in its context. Disadvantage: a blockage on one step stops the entire pipeline.

## Parallel topology

Independent agents work simultaneously on modules with no dependencies between them. Typical case: refactoring frontend, backend and infra in parallel on non-shared files.

```
Frontend Agent   ─┐
Backend Agent    ─┼─→ final merge
Infra Agent      ─┘
```

Applicability condition: modules must have zero shared state. If agents constantly need to read each other's outputs or modify common files, git conflicts and coordination messages cancel out the gain.

## Isolation and permissions per agent

Each agent has its own context window (1M tokens with Opus 4.6 or 4.7) and can receive a distinct tool whitelist. Limiting an agent to `Read`, `Glob`, `Grep` tools prevents any accidental modification during the analysis phase.

**Opus 4.7 (`claude-opus-4-7`)** is available for orchestrator agents requiring the deepest reasoning. The 1M context utilization bug (where the window was not fully used) was fixed in v2.1.117, making Opus 4.7 reliable for large-codebase orchestrations.

| Agent | Allowed tools |
|-------|--------------|
| Explorer | Read, Glob, Grep |
| Planner | Read, Glob, Grep, Write(plan) |
| Implementer | Read, Edit, Bash, Write |
| Reviewer | Read, Glob, Grep |

## Enabling Agent Teams

```bash
# Environment variable (current session)
export CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1
claude

# Persistent configuration ~/.claude/settings.json
{
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
  }
}
```

Prerequisites: Claude Code v2.1.32+, Opus 4.6 or 4.7 model (`/model opus`), initialized git repository. Navigate between agents with `Shift+Down` in in-process mode.

## The >5 agents rule

Start with 2 to 3 agents, then increase progressively. Beyond 5, the coordination cost (mailbox messages, git conflicts) generally exceeds the parallelization gain. The exception: physically independent modules on a 100K+ line codebase.
