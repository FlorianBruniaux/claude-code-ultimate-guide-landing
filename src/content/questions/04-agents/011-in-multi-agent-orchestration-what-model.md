---
id: 04-011
category_id: 4
difficulty: power
profiles:
- power
correct: c
options:
  a: Opus everywhere for quality
  b: Haiku everywhere for cost savings
  c: Sonnet orchestrator + Haiku workers + Sonnet validator
  d: Use the same model for all agents
doc_reference:
  file: guide/ultimate-guide.md
  section: 4.6 Multi-Agent Orchestration Pattern
  line: 5280-5310
---

In multi-agent orchestration, what model combination is recommended?

---

The recommended pattern is: Sonnet as orchestrator (coordinates), Haiku workers (parallel execution), Sonnet validator (final check). This is 2-2.5x cheaper than using Opus everywhere with equivalent quality for 90% of tasks. For example, refactoring 100 files: Sonnet analyzes and plans, Haiku does parallel edits, Sonnet validates - saving 80-90% cost.
