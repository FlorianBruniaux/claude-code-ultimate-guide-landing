---
title: "Search Tools Decision Tree"
subtitle: "Choosing between Glob, Grep, Read, Task and Bash based on context"
cardNumber: T11
category: Technical
difficulty: intermediate
guideVersion: 3.32.1
order: 11
---

## The 5 native search tools

Claude Code offers 5 distinct tools to find and read information in a project. Each has a precise role, and mixing them without a strategy wastes tokens unnecessarily.

| Tool | Role | Token cost |
|------|------|------------|
| `Glob` | Find files by pattern | Low |
| `Grep` | Search content by regex | Low |
| `Read` | Read a full or partial file | High |
| `Task` | Broad, multi-file exploration | Very high |
| `Bash` | System commands, uncovered cases | Variable |

## Glob: files by pattern

Glob returns a list of paths without reading their content. It is the fastest tool for locating files before any other operation.

```
Pattern examples:
*.ts              → all .ts files at root
src/**/*.tsx      → all .tsx files in src/
**/*.test.ts      → all test files
```

**Usage rule**: use Glob first to narrow the scope, then Grep or Read on the resulting list.

## Grep: content by regex

Grep uses ripgrep under the hood, making it very fast (~20ms on medium codebases). It reads files partially to extract only the matching lines, without loading the full content.

```bash
# Find a function by exact name
Grep "authenticate" --type ts

# Search with context (3 lines around)
Grep "validateJWT" -A 3
```

Grep is sufficient for 90% of exact text searches. Do not escalate to Task or Bash if the pattern is known.

## Read: targeted reading

Read loads a full file or a line range via `offset` and `limit`. On large files, it automatically truncates at 2000 lines.

```
# Read lines 50 to 120 of a file
Read("auth.service.ts", offset=50, limit=70)
```

Always prefer a targeted Read with offset/limit over a full Read on a file with several hundred lines.

## Task: broad exploration

The Task tool spawns a sub-agent with its own isolated context. It is the right option when you do not know where to look, the scope is wide, or exploration requires multiple files in parallel.

**Cost**: each sub-agent opens a new context, which represents a significant overhead. Reserve it for tasks that truly justify it.

## Bash: the universal adapter

Bash covers cases the other 4 tools cannot handle directly: git commands, system calls, complex pipes, third-party CLI tools.

```bash
# Legitimate use cases for Bash
git log --oneline -20
find . -name "*.lock" -mtime -1
wc -l src/**/*.ts
```

## Decision tree

```
Looking for files by name/extension
  → Glob

Looking for text/code and know the pattern
  → Grep

Want to read an identified file
  → Read (with offset/limit for long files)

Do not know where to look, broad scope
  → Task (sub-agent)

None of the 4 tools is sufficient
  → Bash
```

**Core principle**: Glob and Grep before opening files with Read. Task only when the scope is unknown.

## Native file search on macOS/Linux (v2.1.117)

Since v2.1.117, Claude Code uses `bfs` (Breadth-First Search) and `ugrep` as native replacements for Glob and Grep on macOS and Linux. These binaries provide approximately 40% faster file discovery with no configuration change. The decision logic above remains identical — the internal tool implementation is simply faster.
