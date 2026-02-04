---
id: 05-017
category_id: 5
difficulty: senior
profiles:
- senior
- power
correct: b
options:
  a: 'import: skill-name'
  b: 'skills: [skill-name]'
  c: 'use: skill-name'
  d: 'require: skill-name'
doc_reference:
  file: guide/ultimate-guide.md
  section: 4.4 Best Practices
  anchor: '#skill-composition'
---

How do you reference a skill in an agent's frontmatter?

---

Reference skills in an agent's frontmatter using the `skills` array: `skills: [security-guardian, tdd]`. This makes the agent inherit all knowledge from those skills. You can reference multiple skills, and the agent combines their expertise. The skill name matches the folder name in `.claude/skills/`.
