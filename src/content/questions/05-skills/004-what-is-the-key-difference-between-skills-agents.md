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
  b: Skills = knowledge modules (user-invocable or auto), Agents = specialized roles (delegated),
    Commands = user-invocable skills with disable-model-invocation true
  c: Commands are the only reusable component
  d: Agents cannot use skills or commands
doc_reference:
  file: guide/ultimate-guide.md
  section: 5.1 Understanding Skills
  anchor: '#skills-vs-agents-vs-commands'
---

What is the key difference between Skills, Agents, and Commands (CC 2.1.3+)?

---

Since CC 2.1.3, the distinction is: Skills are knowledge modules that can be either user-invocable (formerly "commands") or auto-invoked by the model. Agents are specialized roles that Claude delegates tasks to (like a security reviewer). "Commands" are now simply user-invocable skills — skills with `disable-model-invocation: true` in their frontmatter — stored in `.claude/skills/` like all other skills.

In practice: Skills with `disable-model-invocation: true` behave like the old commands (triggered by `/name`). Skills without that flag auto-load when context matches. Agents inherit skills and have their own persistent memory. They can be combined: agents inherit model-invocable skills, and users invoke user-invocable skills via `/name`.
