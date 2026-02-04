---
id: 10-012
category_id: 10
difficulty: junior
profiles:
- junior
- senior
- power
correct: b
options:
  a: 'shell: command'
  b: '!command'
  c: $command
  d: run command
doc_reference:
  file: guide/ultimate-guide.md
  section: 10.1 Commands Table
  anchor: '#quick-actions'
---

How do you run a shell command directly from Claude Code prompt?

---

The `!command` prefix runs a shell command directly.

Quick actions:
- `!command` - Run shell command
- `@filename` - Reference file
- `Ctrl+C` - Cancel operation
- `Ctrl+R` - Retry last

Example: `!git status` runs git status without Claude interpreting it.
