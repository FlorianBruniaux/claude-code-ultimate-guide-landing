---
id: 02-020
category_id: 2
difficulty: senior
profiles:
- senior
- power
correct: c
options:
  a: A mode that automatically creates git commits after each accepted change
  b: An AI planner that breaks tasks into subtasks without prompting
  c: A permission classifier that automatically approves tool calls based on risk assessment, without manual confirmation (v2.1.114+)
  d: A setting that auto-selects the optimal model for each request
doc_reference:
  file: guide/core/claude-code-releases.md
  section: v2.1.114
  anchor: '#v21114'
---

What is Auto Mode for Claude Code Max subscribers (v2.1.114+)?

---

Auto Mode (Max plan, v2.1.114+) is a **permission classifier** that evaluates each tool call and automatically approves those it deems safe — removing manual confirmation prompts for low-risk actions. It is completely unrelated to Auto Plan Mode (which forces plan approval before execution). Auto Mode is about **permission automation**, not planning. Enable it in `settings.json` under the auto mode configuration. Not available on Pro plan.