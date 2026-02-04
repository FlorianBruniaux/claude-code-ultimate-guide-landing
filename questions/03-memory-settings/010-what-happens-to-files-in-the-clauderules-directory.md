---
id: 03-010
category_id: 3
difficulty: senior
profiles:
- senior
- power
correct: b
options:
  a: They must be manually imported
  b: They are automatically loaded and combined
  c: They override CLAUDE.md
  d: They are ignored unless referenced
doc_reference:
  file: guide/ultimate-guide.md
  section: 3.4 Precedence Rules
  anchor: '#rules-auto-loading'
---

What happens to files in the .claude/rules/ directory?

---

Files in `.claude/rules/` are automatically loaded and combined. You can create multiple files like code-conventions.md, git-workflow.md, and architecture.md - all are loaded automatically without manual imports. This allows modular organization of project conventions that Claude will follow.
