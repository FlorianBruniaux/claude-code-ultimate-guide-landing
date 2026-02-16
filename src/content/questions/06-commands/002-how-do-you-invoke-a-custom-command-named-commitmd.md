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

How do you invoke a custom command named `commit.md` located in `.claude/commands/tech/`?

---

Custom commands use the format `/folder:filename` (without the .md extension).

So `.claude/commands/tech/commit.md` becomes `/tech:commit`.
This naming convention allows organizing commands by domain while keeping invocation intuitive.

Examples:
- `.claude/commands/tech/pr.md` -> `/tech:pr`
- `.claude/commands/product/scope.md` -> `/product:scope`
