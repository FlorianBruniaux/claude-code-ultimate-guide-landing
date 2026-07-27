---
id: 09-041
category_id: 9
difficulty: power
profiles:
  - power
correct: b
options:
  a: Always - agent teams are superior
  b: When tasks need coordination on shared codebase (read-heavy analysis)
  c: When tasks are completely independent (separate projects)
  d: When budget is tight (agent teams are cheaper)
doc_reference:
  file: guide/ultimate-guide.md
  section: 9.20 Agent Teams
  anchor: "#920-agent-teams-multi-agent-coordination"
---

When should you use Agent Teams instead of Multi-Instance workflows?

---

**Agent Teams** = Automatic coordination on shared codebase (git-based)
Best for: Read-heavy tasks (code review, bug tracing, analysis)

**Multi-Instance** = Manual orchestration, independent tasks
Best for: Separate projects, no shared state, no coordination needed

Key: Use Teams when coordination matters, Multi-Instance when parallelization without coordination.
