---
id: 04-008
category_id: 4
difficulty: senior
profiles:
- senior
- power
correct: b
options:
  a: By copying skill content into the agent
  b: Using the 'skills' field in the frontmatter
  c: Skills and agents cannot be combined
  d: By importing skill files
doc_reference:
  file: guide/ultimate-guide.md
  section: 4.4 Best Practices
  anchor: '#skill-composition'
---

How can agents inherit knowledge from skills?

---

Agents inherit skills using the `skills` field in frontmatter. For example: `skills: [security-guardian]`. This composes expertise without duplication - instead of copying OWASP knowledge into every security-related agent, they all inherit from the security-guardian skill. This follows DRY principles for knowledge organization.
