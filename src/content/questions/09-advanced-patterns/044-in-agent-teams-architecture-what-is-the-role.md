---
id: 09-044
category_id: 9
difficulty: power
profiles:
  - power
correct: b
options:
  a: Execute all tasks while teammates observe
  b: Break down tasks, spawn teammates, synthesize findings
  c: Monitor costs and prevent token overuse
  d: Resolve merge conflicts manually
doc_reference:
  file: guide/workflows/agent-teams.md
  section: Architecture Deep-Dive
  anchor: "#2-architecture-deep-dive"
---

In agent teams architecture, what is the role of the 'team lead'?

---

**Team lead** (main session) responsibilities:

1. **Break down tasks** into subtasks
2. **Spawn teammate sessions** (each with 1M token context)
3. **Synthesize findings** from all agents after completion

**Teammates** work independently on assigned tasks, report back to team lead.
Navigation: Use Shift+Up/Down to switch between agents.
