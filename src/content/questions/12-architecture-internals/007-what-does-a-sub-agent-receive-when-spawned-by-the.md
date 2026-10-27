---
id: 12-007
category_id: 12
difficulty: senior
profiles:
- senior
- power
correct: b
options:
  a: The full conversation history and every file Claude has already read
  b: A fresh, isolated context window seeded by the delegation message Claude writes for it
  c: The last 10 messages of the conversation
  d: A compressed copy of the parent session
doc_reference:
  file: guide/architecture.md
  section: Isolation Model
  anchor: '#isolation-model'
---

What context does a sub-agent start with when spawned by the Agent tool?

---

Sub-agents have ISOLATED context. Each starts with a fresh context window and does not see your conversation history, the skills you already invoked, or the files Claude already read; it works from the delegation message Claude composes (a fork is the exception, since it inherits the conversation). A sub-agent returns a summary, which keeps the main context clean. Explore and Plan also start without your CLAUDE.md files, while other built-in and custom subagents load them.
