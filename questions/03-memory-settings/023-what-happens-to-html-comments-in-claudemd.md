---
id: 03-023
category_id: 3
difficulty: senior
profiles:
- senior
- power
correct: b
options:
  a: HTML comments are stripped entirely from the CLAUDE.md file on disk
  b: HTML comments are hidden from Claude when CLAUDE.md is auto-injected, but visible via the Read tool
  c: HTML comments are treated as YAML metadata by Claude Code
  d: HTML comments cause a parse error and prevent CLAUDE.md from loading
doc_reference:
  file: guide/core/claude-code-releases.md
  section: v2.1.72
  anchor: '#v2172'
---

Since v2.1.72, what happens to HTML comments (`<!-- ... -->`) in CLAUDE.md?

---

Starting in v2.1.72, HTML comments in CLAUDE.md are **hidden from Claude** when the file is auto-injected into context — they do not consume context tokens or influence Claude's behavior. However, they remain visible when explicitly read via the Read tool. This lets you embed developer notes, revision history, or internal documentation in CLAUDE.md that only appear when a human reads the file directly.
---
