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
  a: Four levels (low, medium, high, max) with icons ▲ △ ● ○
  b: Three levels (quick, normal, deep) with symbols ○ ◐ ●
  c: Three levels (low, medium, high) with symbols ○ ◐ ● (max was removed in v2.1.72)
  d: Two levels (fast, thorough) toggled with Alt+T
doc_reference:
  file: guide/core/claude-code-releases.md
  section: v2.1.72 (2026-03-09)
  anchor: '#v2172-2026-03-09'
---

What are the effort levels in Claude Code after the v2.1.72 simplification?

---

v2.1.72 simplified effort to **three levels**: low (○), medium (◐), and high (●). The `max` level was removed at that point. Use `/model` with left/right arrow keys to adjust the effort slider, the `effortLevel` setting in `settings.json`, or the `CLAUDE_CODE_EFFORT_LEVEL` environment variable. The symbols provide quick visual reference in the UI. Use `/effort auto` to reset to the default adaptive behavior.

**Current state (v2.1.220):** the scale grew back. `/effort` now accepts `low`, `medium`, `high`, `xhigh` (added v2.1.111), `max`, and `ultracode`; `max` and `ultracode` apply to the current session only. Available levels depend on the model.
---
