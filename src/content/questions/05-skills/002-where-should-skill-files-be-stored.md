---
id: 05-002
category_id: 5
difficulty: junior
profiles:
- junior
- senior
- power
correct: b
options:
  a: Store every skill in ~/.claude/skills/ so all projects receive it
  b: Use .claude/skills/{skill-name}/ for a project-owned skill and ~/.claude/skills/{skill-name}/ for a personal skill
  c: Use .claude/agents/ for team skills and .claude/commands/ for personal skills
  d: The location does not affect ownership or discovery
doc_reference:
  file: guide/ultimate-guide.md
  section: 5.2 Creating Skills
  anchor: '#52-creating-skills'
official_doc: https://code.claude.com/docs/en/skills
---

How should storage reflect a skill's ownership scope?

---

Store a project or team skill under `.claude/skills/{skill-name}/` so the repository can carry its owner, review path, and assumptions. Store a personal skill under `~/.claude/skills/{skill-name}/`. Both locations are valid, but they declare different ownership boundaries. Each directory requires a `SKILL.md` file.
