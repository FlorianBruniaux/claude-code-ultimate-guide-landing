---
id: 09-051
category_id: 9
difficulty: senior
profiles:
  - senior
  - power
correct: c
options:
  a: "Planner: Sonnet, Implementer: Haiku"
  b: "Planner: Opus, Implementer: Sonnet"
  c: "Planner: Opus, Implementer: Haiku"
  d: "Both: Sonnet (consistency matters more than cost)"
doc_reference:
  file: guide/ultimate-guide.md
  section: 2.5 Model per Agent Patterns
  anchor: "#model-per-agent-patterns"
---

In the planner/implementer agent pattern, which model should each role use?

---

**Planner: Opus.** Strategy requires deep reasoning.
Planning errors compound through all implementation steps.
A wrong architecture decision caught at planning cost = minutes to fix.
The same error found post-implementation = days.

**Implementer: Haiku.** Mechanical execution.
The approach is already decided by the planner.
No design decisions = no need for deep reasoning.
Haiku is 60x cheaper than Opus on input tokens.

**When Haiku isn't enough**: If the implementation requires judgment calls,
the implementer should stop and report rather than decide, or use Sonnet instead.
