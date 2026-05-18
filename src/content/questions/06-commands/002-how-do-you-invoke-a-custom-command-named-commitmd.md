---
id: 06-002
category_id: 6
difficulty: junior
profiles:
- junior
- senior
- power
correct: c
options:
  a: /commit
  b: /tech-commit
  c: /tech:commit
  d: '!tech/commit'
doc_reference:
  file: guide/ultimate-guide.md
  section: 6.2 Creating Custom Commands
  anchor: '#command-naming'
official_doc: https://code.claude.com/docs/en/slash-commands
---

How do you invoke a user-invocable skill named `commit` located in `.claude/skills/tech/commit/`?

---

User-invocable skills use the format `/folder:name` based on their directory path under `.claude/skills/`.

So `.claude/skills/tech/commit/SKILL.md` becomes `/tech:commit`.
This naming convention allows organizing skills by domain while keeping invocation intuitive.

Examples:
- `.claude/skills/tech/pr/SKILL.md` -> `/tech:pr`
- `.claude/skills/product/scope/SKILL.md` -> `/product:scope`

Since CC 2.1.3, these skills replace the old `.claude/commands/` files. The `disable-model-invocation: true` flag in the SKILL.md frontmatter ensures they only fire on explicit user invocation.
