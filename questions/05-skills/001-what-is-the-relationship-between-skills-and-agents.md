---
id: 05-001
category_id: 5
difficulty: junior
profiles:
- junior
- senior
- power
- pm
correct: b
options:
  a: Skills replace agents
  b: Skills are knowledge packages that agents can inherit
  c: Agents are a type of skill
  d: They are completely independent
doc_reference:
  file: guide/ultimate-guide.md
  section: 5.1 Understanding Skills
  anchor: '#51-understanding-skills'
official_doc: https://code.claude.com/docs/en/skills
---

What is the relationship between Skills and Agents?

---

Skills are knowledge packages that agents can inherit. While agents are specialized roles (task-focused), skills are reusable knowledge modules (domain-focused). Multiple agents can inherit the same skill, avoiding duplication. For example, both a code-reviewer and security-auditor agent can inherit the security-guardian skill.
