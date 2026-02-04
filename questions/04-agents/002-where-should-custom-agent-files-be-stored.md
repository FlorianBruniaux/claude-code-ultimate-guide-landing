---
id: 04-002
category_id: 4
difficulty: junior
profiles:
- junior
- senior
- power
correct: b
options:
  a: ~/.claude/agents/
  b: .claude/agents/
  c: /agents/
  d: .claude/commands/
doc_reference:
  file: guide/ultimate-guide.md
  section: 4.2 Creating Custom Agents
  anchor: '#42-creating-custom-agents'
official_doc: https://code.claude.com/docs/en/agents
---

Where should custom agent files be stored?

---

Custom agent files should be stored in `.claude/agents/` within your project directory. They are markdown files with YAML frontmatter. For example: `.claude/agents/backend-architect.md`, `.claude/agents/code-reviewer.md`. These can be committed to version control to share with your team.
