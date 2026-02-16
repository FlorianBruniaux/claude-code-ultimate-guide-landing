---
id: 02-018
category_id: 2
difficulty: power
profiles:
- power
correct: b
options:
  a: Automatic planning that's always on by default
  b: A configuration that forces Claude to present a plan and wait for approval before
    any tool execution
  c: A mode that automatically generates project plans
  d: A premium feature for enterprise users
doc_reference:
  file: guide/ultimate-guide.md
  section: 2.3 Plan Mode
  anchor: '#auto-plan-mode'
---

What is Auto Plan Mode and how do you enable it?

---

Auto Plan Mode makes Claude present a plan and wait for explicit user approval before executing ANY tool. Configure via `~/.claude/auto-plan-mode.txt` and launch with `claude --append-system-prompt "$(cat ~/.claude/auto-plan-mode.txt)"`. Results in 76% fewer tokens with better results because plans are validated before execution.
