---
id: 02-013
category_id: 2
difficulty: senior
profiles:
- senior
- power
correct: c
options:
  a: File structure and code content
  b: Git state and branches
  c: Runtime state, external services, and hidden files
  d: Project rules in CLAUDE.md
doc_reference:
  file: guide/ultimate-guide.md
  section: 2.5 Mental Model
  anchor: '#what-claude-doesnt-know'
---

What does Claude NOT have access to regarding your project?

---

Claude knows: file structure, code content, git state, and project rules (CLAUDE.md). Claude does NOT know: runtime state (can't see running processes), external services (can't access databases directly), your intent (needs clear instructions), and hidden files (respects .gitignore by default). Understanding this mental model helps you communicate effectively.
