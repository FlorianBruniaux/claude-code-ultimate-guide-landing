---
id: 04-003
category_id: 4
difficulty: senior
profiles:
- senior
- power
correct: b
options:
  a: name, model, tools
  b: name, description
  c: name, description, model, tools
  d: name, role, skills
doc_reference:
  file: guide/ultimate-guide.md
  section: 4.2 Creating Custom Agents
  anchor: '#frontmatter-fields'
official_doc: https://code.claude.com/docs/en/agents
---

What fields are REQUIRED in an agent's YAML frontmatter?

---

Only `name` and `description` are required in agent frontmatter. Optional fields include: model (sonnet default, opus, or haiku), tools (comma-separated list), skills (to inherit), and disallowedTools. The description is crucial - it determines when Claude auto-activates the agent, so make it clear and specific.
