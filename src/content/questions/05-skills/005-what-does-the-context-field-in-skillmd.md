---
id: 05-005
category_id: 5
difficulty: senior
profiles:
- senior
- power
correct: b
options:
  a: The context window size
  b: Whether the skill runs in isolated (fork) or shared (inherit) context
  c: The file context to load
  d: Database connection context
doc_reference:
  file: guide/ultimate-guide.md
  section: 5.2 Creating Skills
  anchor: '#skillmd-frontmatter'
---

What does the 'context' field in SKILL.md frontmatter control?

---

The `context` field controls execution context: 'fork' means isolated context (the skill runs independently), 'inherit' means shared context (the skill shares context with the calling agent). Use fork for skills that need clean state, inherit for skills that need access to conversation history and loaded files.
