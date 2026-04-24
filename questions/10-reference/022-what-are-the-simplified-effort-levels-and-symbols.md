---
id: 10-022
category_id: 10
difficulty: junior
profiles:
- junior
- senior
- power
correct: c
options:
  a: Four levels — low, medium, high, max — with icons ▲ △ ● ○
  b: Three levels — quick, normal, deep — with symbols ○ ◐ ●
  c: Four levels — low, medium, high, xhigh — with symbols ○ ◐ ● ⬤ (xhigh added in v2.1.114+, now the default)
  d: Two levels — fast, thorough — toggled with Alt+T
doc_reference:
  file: guide/core/claude-code-releases.md
  section: v2.1.72
  anchor: '#v2172'
---

What are the current effort levels in Claude Code and their visual symbols?

---

Claude Code has **four** effort levels: low (○), medium (◐), high (●), and xhigh (⬤). v2.1.72 removed the old `max` level and introduced low/medium/high; v2.1.114+ added `xhigh` (available on Opus 4.7+) and raised it to the **default** effort level for Claude Code. Use `/model` with left/right arrow keys, the `effortLevel` setting in `settings.json`, the `CLAUDE_CODE_EFFORT_LEVEL` env var, or the `/effort` command to adjust. Use `/effort auto` to reset to default adaptive behavior.
---
