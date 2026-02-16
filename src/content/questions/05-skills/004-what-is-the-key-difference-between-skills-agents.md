---
id: 05-004
category_id: 5
difficulty: junior
profiles:
- junior
- senior
- power
correct: b
options:
  a: They all do the same thing
  b: Skills = knowledge modules (inherited), Agents = specialized roles (delegated),
    Commands = process workflows (slash invoked)
  c: Commands are the only reusable component
  d: Agents cannot use skills or commands
doc_reference:
  file: guide/ultimate-guide.md
  section: 5.1 Understanding Skills
  anchor: '#skills-vs-agents-vs-commands'
---

What is the key difference between Skills, Agents, and Commands?

---

The three concepts have distinct purposes: Skills are knowledge modules inherited by agents (like OWASP security knowledge), Agents are specialized roles that Claude delegates tasks to (like a security reviewer), and Commands are process workflows invoked with slash commands (like /tech:commit). They can be combined: agents inherit skills and execute commands.
