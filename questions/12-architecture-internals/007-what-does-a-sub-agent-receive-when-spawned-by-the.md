---
id: 12-007
category_id: 12
difficulty: senior
profiles:
- senior
- power
correct: b
options:
  a: Full conversation history + all file reads
  b: Task description only (isolated fresh context)
  c: Last 10 messages of conversation
  d: System prompt + CLAUDE.md files
doc_reference:
  file: guide/architecture.md
  section: Isolation Model
  anchor: '#isolation-model'
---

What does a sub-agent receive when spawned by the Task tool?

---

Sub-agents have ISOLATED context. They receive only the task description, have their own fresh context window, access the same tools (except Task), and return only a summary text. This isolation keeps the main context clean and prevents context pollution.
