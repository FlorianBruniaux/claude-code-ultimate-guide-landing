---
id: 03-021
category_id: 3
difficulty: senior
profiles:
- senior
- power
correct: c
options:
  a: The directory where CLAUDE.md files are searched
  b: A folder Claude scans for context files on startup
  c: The custom storage directory for auto-memory files
  d: The path where session transcripts are archived
doc_reference:
  file: guide/core/claude-code-releases.md
  section: v2.1.74
  anchor: '#v2174'
---

What does the `autoMemoryDirectory` setting (v2.1.74) configure?

---

`autoMemoryDirectory` specifies where Claude Code stores memory files that it saves automatically via the auto-memory feature (v2.1.59+). By default, auto-memory writes to `~/.claude/projects/*/memory/MEMORY.md`. This setting lets teams redirect that storage — useful for shared drives or when you want all memory in a specific project subdirectory. It is set in `settings.json`, not in CLAUDE.md.
---