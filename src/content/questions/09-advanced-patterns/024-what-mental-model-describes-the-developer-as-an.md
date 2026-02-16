---
id: 09-024
category_id: 9
difficulty: senior
profiles:
- senior
- power
correct: c
options:
  a: Pipeline Manager
  b: Agent Supervisor
  c: You Are the Main Thread - CPU scheduler analogy where developer dispatches tasks
    to agents
  d: Task Router
doc_reference:
  file: guide/ultimate-guide.md
  section: You Are the Main Thread
  anchor: '#you-are-the-main-thread'
---

What mental model describes the developer as an orchestrator of Claude instances?

---

"You Are the Main Thread" uses the CPU scheduler analogy: the developer is the main thread dispatching work to Claude instances (worker threads). You manage priorities, context switches, and synchronization. Key insight: you don't write code - you manage the agents that write code. This shifts the skill from coding to orchestration.
