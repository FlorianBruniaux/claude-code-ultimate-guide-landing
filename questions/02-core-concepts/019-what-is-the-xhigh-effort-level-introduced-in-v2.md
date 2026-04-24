---
id: 02-019
category_id: 2
difficulty: junior
profiles:
- junior
- senior
- power
correct: d
options:
  a: A batch processing mode that processes multiple prompts simultaneously
  b: A model override that automatically selects Opus for all requests
  c: An extended timeout setting for long-running tasks
  d: The highest thinking depth level (above high), available on Opus 4.7+, now the default effort for Claude Code
doc_reference:
  file: guide/core/claude-code-releases.md
  section: v2.1.114
  anchor: '#v21114'
---

What is the `xhigh` effort level introduced in v2.1.114+?

---

`xhigh` is the **highest effort level** added to Claude Code in v2.1.114+. It sits above the previous top level (`high`) and unlocks the deepest reasoning available — it requires Opus 4.7+ and has been set as the **default effort level for Claude Code** since release. The four levels are now: low (○), medium (◐), high (●), xhigh (⬤). Adjust via `/effort`, the `effortLevel` setting in `settings.json`, or `CLAUDE_CODE_EFFORT_LEVEL` env var.