---
id: 09-046
category_id: 9
difficulty: power
profiles:
  - power
correct: c
options:
  a: Same as single agent (no overhead)
  b: 1.5x (minimal overhead)
  c: 3x+ (each agent runs separate model inference)
  d: 10x (exponential cost)
doc_reference:
  file: guide/workflows/agent-teams.md
  section: Cost Trade-offs
  anchor: "#cost-trade-offs"
---

What is the typical token cost multiplier for agent teams (3 agents)?

---

**Token cost multiplier: 3x+** for 3 agents

Why:
- Each agent runs **separate model inference**
- 3 agents = 3x input tokens, 3x output tokens
- Context loading per agent (1M tokens × 3)
- Coordination overhead (team lead synthesis)

Cost justified when time saved > cost increase (production issues, critical analysis).
Budget-constrained projects should use single agent.
