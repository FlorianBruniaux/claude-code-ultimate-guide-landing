---
id: 03-008
category_id: 3
difficulty: senior
profiles:
- senior
- power
correct: b
options:
  a: Only the exact command 'git'
  b: Any git command
  c: Git commands that start with asterisk
  d: Git commands with glob patterns
doc_reference:
  file: guide/ultimate-guide.md
  section: 3.3 Settings & Permissions
  anchor: '#permission-patterns'
official_doc: https://code.claude.com/docs/en/permissions
---

What does the permission pattern 'Bash(git *)' match?

---

The pattern 'Bash(git *)' matches any git command. Permission patterns use wildcards: 'Bash(git *)' matches any git command, 'Bash(pnpm *)' matches any pnpm command, 'mcp__serena__*' matches all Serena MCP tools. The space-based syntax is current - colon syntax like 'Bash(git status:*)' is deprecated.
