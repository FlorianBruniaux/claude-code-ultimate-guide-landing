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
  a: .claude/commands/
  b: .claude/skills/{skill-name}/
  c: .claude/agents/
  d: ~/.claude/skills/
doc_reference:
  file: guide/ultimate-guide.md
  section: 5.2 Creating Skills
  anchor: '#52-creating-skills'
official_doc: https://code.claude.com/docs/en/skills
---

Where should skill files be stored?

---

Skills live in `.claude/skills/{skill-name}/` directories within your project. Each skill has its own folder containing at minimum a SKILL.md file, with optional reference.md, checklists/, examples/, and scripts/ subdirectories. This organization keeps knowledge modular and reusable.
