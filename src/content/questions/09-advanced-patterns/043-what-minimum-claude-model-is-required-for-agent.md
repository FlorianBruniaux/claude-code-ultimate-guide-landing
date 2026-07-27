---
id: 09-043
category_id: 9
difficulty: senior
profiles:
  - senior
  - power
correct: d
options:
  a: Haiku
  b: Sonnet 4.5
  c: Opus 4.5
  d: Opus 4.6
doc_reference:
  file: guide/workflows/agent-teams.md
  section: Prerequisites
  anchor: "#prerequisites"
---

What minimum Claude model is required for agent teams?

---

Agent teams require **Opus 4.6 minimum** (released Feb 2026 with v2.1.32).

This is because:
- Each agent needs 1M token context window
- Git-based coordination requires advanced reasoning
- Team lead must synthesize findings from multiple teammates

Lower models (Sonnet, Haiku) cannot spawn agent teams.
