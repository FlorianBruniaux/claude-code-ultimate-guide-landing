---
id: 03-001
category_id: 3
difficulty: junior
profiles:
- junior
- senior
- power
- pm
correct: b
options:
  a: Only the most specific file is loaded and the others are ignored
  b: The applicable files are combined, so contradictory instructions should be avoided instead of relying on an override order
  c: Local overrides project, which overrides global, exactly like settings.json precedence
  d: Global always overrides project and personal files
doc_reference:
  file: guide/ultimate-guide.md
  section: 3.4 Precedence Rules
  anchor: '#claudemd-precedence'
official_doc: https://code.claude.com/docs/en/memory
---

How does Claude Code treat the applicable user (~/.claude/CLAUDE.md), project (CLAUDE.md), and personal (CLAUDE.local.md) instruction files in one session?

---

Instructions combine rather than following settings precedence. ~/.claude/CLAUDE.md applies to all your projects, CLAUDE.md or .claude/CLAUDE.md holds the shared project instructions that you commit, and CLAUDE.local.md holds personal project instructions that stay gitignored. Because all applicable files reach Claude together, a contradiction between them is a bug in your instructions, not something a precedence rule resolves for you.
