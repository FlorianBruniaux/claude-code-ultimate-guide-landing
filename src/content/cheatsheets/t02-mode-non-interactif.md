---
title: "Non-Interactive & Headless Mode"
subtitle: "Using Claude Code without human interaction: scripts, CI, pipes"
cardNumber: T02
category: Technical
difficulty: intermediate
guideVersion: 3.32.1
order: 2
---

## Base flag: `-p`

The `-p` flag (or `--print`) activates non-interactive mode. Claude returns the response in the terminal and exits immediately without waiting for user input.

```bash
# Direct prompt
claude -p "Analyze this file and list the bugs"

# With pipe stdin (content becomes the input)
git diff | claude -p "Explain these changes"
cat error.log | claude -p "Identify the root cause"
```

## Output formats

`--output-format` controls the response structure, which is essential for integration into scripts.

| Format | Usage |
|--------|-------|
| `text` | Human-readable, default |
| `json` | Parseable by `jq` |
| `stream-json` | Real-time streaming |

```bash
# JSON output for automatic parsing
git status --short | claude -p "Categorize the changes" \
  --output-format json | jq '.categories'

# Stream JSON for long operations
cat report.txt | claude -p "Summarize" --output-format stream-json
```

## `--no-stream` and flow control

By default, Claude Code streams the response character by character. `--no-stream` waits for the complete response before displaying anything, which simplifies pipes with tools that expect complete input.

```bash
claude -p "Generate a report" --no-stream > report.md
```

## CI/CD usage

In an isolated container, `--dangerously-skip-permissions` suppresses all confirmation requests. Reserve exclusively for sandboxed environments where Claude cannot access sensitive resources.

```bash
# GitHub Actions (isolated container)
claude -p "Run the tests and fix failures" \
  --dangerously-skip-permissions \
  --output-format json

# Set AI_AGENT=1 to signal headless execution context (v2.1.120)
AI_AGENT=1 claude -p "Run the tests and fix failures" \
  --dangerously-skip-permissions
```

## `--print` honors agent frontmatter (v2.1.119)

When calling a custom agent in non-interactive mode, `--print` (or `-p`) now respects the `permissionMode` and tool whitelist defined in the agent's YAML frontmatter. The agent constraints apply even in headless pipelines.

```bash
# The content-analyzer agent's restricted tools apply automatically
claude --agent content-analyzer -p "Analyze this file: src/main.ts"
```

## `claude ultrareview` (v2.1.120)

New subcommand that runs a deep multi-pass review of a target file or PR. Designed for CI integration.

```bash
# Review a specific file
claude ultrareview src/auth.ts

# Output as JSON for downstream parsing
claude ultrareview src/auth.ts --json > review.json
```

## Common patterns

```bash
# Automated log analysis
tail -n 200 app.log | claude -p "Critical alerts only" \
  --output-format json

# PR review (package.json integration)
git diff main...HEAD | claude -p "Security review, JSON format" \
  --output-format json > review.json
```

## Interactive vs Non-Interactive

| Aspect | Interactive | Non-Interactive (`-p`) |
|--------|-------------|------------------------|
| Output | Stream UI | Raw stdout |
| Permissions | Prompts | Auto or skip |
| Usage | Development | CI, scripts, pipes |
| Session | Persistent | Single, stateless |

**Best practice**: limit pipe size to avoid exceeding the context window. Filter with `head`, `grep` or `--name-only` before sending to Claude.
