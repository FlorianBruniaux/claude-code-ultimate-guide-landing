---
id: 03-030
category_id: 3
difficulty: intermediate
profiles:
  - senior
  - power
correct: b
options:
  a: Local, Remote, Cloud
  b: User (global), Project (repo-level), Local (gitignored per-machine)
  c: Session, Persistent, Archived
  d: Read-only, Write-once, Append-only
doc_reference:
  file: guide/ultimate-guide.md
  section: Memory Scopes
  anchor: "#memory-scopes"
---

What are the three scopes for Claude Code's agent memory system?

---

Agent Memory has 3 scopes: (1) User — global memory in ~/.claude/, applies to all projects, personal preferences and cross-project knowledge. (2) Project — repo-level memory in .claude/, committed to git, shared with the team. (3) Local — gitignored per-machine memory in .claude/memory/ (local), for machine-specific state that should not be shared. Understanding the scope prevents accidentally committing personal notes or missing team-level context.
