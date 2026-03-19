---
title: "TodoWrite vs Tasks API"
subtitle: "The old and new task management systems"
cardNumber: M07
category: Methodology
difficulty: intermediate
guideVersion: 3.32.1
order: 107
---

## Direct comparison

| Criterion | TodoWrite (legacy) | Tasks API (v2.1.16+) |
|-----------|-------------------|---------------------|
| **Persistence** | Session only | Disk (`~/.claude/tasks/`) |
| **Multi-session** | Lost on close | Survives restarts |
| **Dependencies** | Manual ordering | Native `blockedBy` |
| **Coordination** | Single agent | Multi-agent, broadcast |
| **Statuses** | pending / completed | 4 statuses + metadata |
| **Context summary** | Lost on `/compact` | Intact after compaction |

## When to stay on TodoWrite

TodoWrite remains relevant for simple cases: a linear list that wraps up in under ten minutes, with no complex dependencies, in a single continuous session. The Tasks API setup represents an investment that only pays off if the project extends over time.

## When to migrate to Tasks API

```
Work across multiple sessions    → Tasks API required
Dependencies between tasks       → native blockedBy
Multi-terminal or multi-agents   → real-time broadcast
Resume after /compact            → guaranteed persistence
```

## Enable and disable

```bash
# Tasks API is enabled by default since v2.1.19
claude

# Force fallback to TodoWrite (rare)
CLAUDE_CODE_ENABLE_TASKS=false claude

# Check current configuration
env | grep CLAUDE_CODE_ENABLE_TASKS
```

## Migrating an existing TodoWrite list

Here is a typical transformation from a flat list to a Tasks API hierarchy.

**Before (TodoWrite):**
```
- [ ] Add user authentication
- [ ] Hash passwords
- [ ] Write tests
```

**After (Tasks API):**
```bash
export CLAUDE_CODE_TASK_LIST_ID="my-project-auth"
# Then inside Claude:
# TaskCreate parent + children with blockedBy
```

## Update CLAUDE.md

When you migrate, update your project instructions so Claude automatically uses the right system. Specifying the expected list ID in CLAUDE.md prevents it from being forgotten between sessions.

## Note on the future of TodoWrite

TodoWrite will continue to work, but Anthropic's direction is clearly toward the Tasks API. New multi-agent coordination features are built exclusively on the Tasks API. Migrating now avoids a forced refactor later, on larger projects.

## Auto-migration flag

Since v2.1.19, the `--task-manage` flag automatically activates the Tasks API for any operation involving more than three steps or two distinct directories. Handy for enforcing good habits without thinking about it.
