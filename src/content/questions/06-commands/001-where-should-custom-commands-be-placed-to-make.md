---
id: 06-001
category_id: 6
difficulty: junior
profiles:
- junior
- senior
- power
correct: b
options:
  a: ~/.claude/skills/
  b: .claude/skills/
  c: /usr/local/claude/commands/
  d: .claude/config/commands/
doc_reference:
  file: guide/ultimate-guide.md
  section: 6.2 Creating Custom Commands
  anchor: '#62-creating-custom-commands'
official_doc: https://code.claude.com/docs/en/slash-commands
---

Where should custom commands (user-invocable skills) be placed to make them available in Claude Code?

---

Since CC 2.1.3, custom slash commands live in `.claude/skills/` as user-invocable skills. Each command is a folder with a `SKILL.md` file that includes `disable-model-invocation: true` in the frontmatter.

This allows project-specific commands that can be committed with your codebase.
The global directory `~/.claude/skills/` is for personal commands available across all projects.

Skills are organized in subdirectories:
- `.claude/skills/tech/deploy/` for development workflows
- `.claude/skills/product/scope/` for product workflows
