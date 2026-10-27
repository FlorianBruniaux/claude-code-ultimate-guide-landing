---
id: 10-022
category_id: 10
difficulty: junior
profiles:
- junior
- senior
- power
correct: b
options:
  a: Three levels (low, medium, high), because max was removed in v2.1.72
  b: Five levels (low, medium, high, xhigh, max)
  c: Three levels (quick, normal, deep)
  d: Two levels (fast, thorough) toggled with Alt+T
doc_reference:
  file: guide/core/claude-code-releases.md
  section: v2.1.72 (2026-03-09)
  anchor: '#v2172-2026-03-09'
---

Which effort levels does Claude Code offer on Opus 5.5, Sonnet 5.5, and Haiku 5.5?

---

Opus 5.5, Sonnet 5.5, Haiku 5.5, and the Fable models support `low`, `medium`, `high`, `xhigh`, and `max`. Opus 4.6 and Sonnet 4.6 stop at `max` without `xhigh`, and a level the active model does not support falls back to the highest supported level at or below it. Models not listed in the model configuration docs do not support effort.

The default is `medium` on Opus 5.5, Sonnet 5.5, and Haiku 5.5, and `high` on most other models that support effort. Set a level with `/effort`, the `/model` picker, `--effort`, or the `CLAUDE_CODE_EFFORT_LEVEL` environment variable. `max` applies to the current session only unless you set it through that environment variable. Ultracode is a separate toggle, not an effort level.
