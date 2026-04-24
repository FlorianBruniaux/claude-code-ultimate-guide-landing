---
id: 09-036
category_id: 9
difficulty: senior
profiles:
- senior
- power
correct: c
options:
  a: An alias for plan mode with extended thinking enabled locally
  b: A local multi-step planner using the current session model
  c: Async cloud-based planning using multi-agent Opus 4.7 that runs remotely and returns a structured plan (v2.1.91+)
  d: A plan mode that auto-approves all proposed changes after review
doc_reference:
  file: guide/ultimate-guide.md
  section: Ultraplan
  anchor: '#ultraplan'
---

What is Ultraplan (`/ultraplan`) and how does it differ from standard plan mode?

---

Ultraplan is a **cloud-based async planning system** launched with v2.1.91+. When you run `/ultraplan`, Claude Code sends your task to Anthropic's infrastructure where **multiple Opus 4.7 agents** collaborate to produce a deep, structured implementation plan — then returns it to your session. Key differences from local plan mode: it runs remotely (not blocking your terminal), uses Opus 4.7 regardless of your current model, parallelizes analysis across agent roles, and produces more thorough output. Designed for complex architectural decisions where local thinking depth isn't enough.
