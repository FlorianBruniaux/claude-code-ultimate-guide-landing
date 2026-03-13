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
  c: Three levels — low, medium, high — with symbols ○ ◐ ● (max was removed in v2.1.72)
  d: Two levels — fast, thorough — toggled with Alt+T
doc_reference:
  file: guide/core/claude-code-releases.md
  section: v2.1.72
  anchor: '#v2172'
---

What are the effort levels in Claude Code after the v2.1.72 simplification?

---

v2.1.72 simplified effort to **three levels**: low (○), medium (◐), and high (●). The `max` level was removed. Use `/model` with left/right arrow keys to adjust the effort slider, the `effortLevel` setting in `settings.json`, or the `CLAUDE_CODE_EFFORT_LEVEL` environment variable. The new symbols provide quick visual reference in the UI. Use `/effort auto` to reset to the default adaptive behavior.
---
