---
id: 09-042
category_id: 9
difficulty: power
profiles:
  - power
correct: b
options:
  a: Cannot spawn more than 2 agents
  b: Read-heavy tasks work well, write-heavy tasks risk merge conflicts
  c: Only works on macOS
  d: Requires expensive hardware
doc_reference:
  file: guide/workflows/agent-teams.md
  section: Limitations & Gotchas
  anchor: "#6-limitations-gotchas"
---

What is the main limitation of agent teams?

---

**Critical limitation**: Read-heavy > Write-heavy trade-off

✅ Good: Code review (agents read, analyze, report)
✅ Good: Bug tracing (agents read logs, trace execution)
⚠️ Risky: Refactoring shared types (merge conflicts)
❌ Bad: Same file modified by multiple agents

Mitigation: Assign non-overlapping file sets, use interface-first approach.
Token cost is also significant (3x+ multiplier).
