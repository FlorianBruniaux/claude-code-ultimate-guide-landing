---
id: 09-031
category_id: 9
difficulty: power
profiles:
- power
correct: a
options:
  a: Assemble → Check → Execute — build context, validate with canary tests, then run Claude
  b: Audit → Compress → Evaluate — score context quality, remove bloat, then measure adherence
  c: Agent → Context → Exit — spawn agents, inject context, then terminate on completion
  d: Analyze → Configure → Embed — analyze codebase, configure rules, then embed in CLAUDE.md
doc_reference:
  file: guide/core/context-engineering.md
  section: The ACE Pipeline
  anchor: '#the-ace-pipeline'
---

What does the ACE pipeline stand for in context engineering?

---

ACE = **Assemble → Check → Execute**. Assemble builds context from the team profile and project modules, producing a CLAUDE.md specific to the developer and task. Check runs canary validation — 3-5 test prompts that verify key behaviors before the actual task. If canary checks fail, fix the context issue before proceeding. Execute runs Claude with the validated context on the actual task. The pipeline is structured for teams running Claude Code in automated or semi-automated workflows where context quality must be verified before each run.
---