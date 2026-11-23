---
id: 03-012
category_id: 3
difficulty: power
profiles:
- power
correct: b
options:
  a: Nothing, they are the same
  b: Provides granular control with tool-specific patterns in .claude/settings.json
  c: Only works for MCP tools
  d: Requires admin privileges
doc_reference:
  file: guide/ultimate-guide.md
  section: permissions.allow / permissions.deny Configuration
  anchor: '#permissionsallow--permissionsdeny-configuration'
official_doc: https://code.claude.com/docs/en/permissions
---

What do permission rules under permissions.allow add compared with permission modes?

---

Rules under permissions.allow (and permissions.deny) in .claude/settings.json or .claude/settings.local.json provide granular control with specific patterns. For example: 'Read(*)' allows all reads, 'Bash(git status *)' allows git status commands, 'Bash(pnpm *)' allows pnpm commands. You can set progressive permission levels from beginner (very restrictive) to advanced. Never use --dangerously-skip-permissions.
