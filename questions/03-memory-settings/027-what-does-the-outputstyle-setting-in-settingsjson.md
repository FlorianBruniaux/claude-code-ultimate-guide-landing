---
id: 03-027
category_id: 3
difficulty: senior
profiles:
- senior
- power
correct: d
options:
  a: The terminal color theme for Claude Code's output
  b: Whether Claude uses markdown or plain text in responses
  c: The verbosity level of tool call logs
  d: The response style mode — built-in presets (Default/Explanatory/Learning) or a path to a custom style file in .claude/styles/
doc_reference:
  file: guide/ultimate-guide.md
  section: Output Styles
  anchor: '#output-styles'
---

What does the `outputStyle` setting in `settings.json` configure?

---

`outputStyle` controls Claude's **response communication style** — not formatting, not colors, but how Claude explains and presents its work. Built-in values: `"Default"` (standard), `"Explanatory"` (verbose, explains reasoning step by step), `"Learning"` (asks questions, promotes understanding). You can also provide a **path to a custom style file** in `.claude/styles/` for team-specific response conventions. This replaces the older approach of adding `## Learning Mode` sections to CLAUDE.md.