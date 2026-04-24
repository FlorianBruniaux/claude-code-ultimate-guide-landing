---
id: 06-018
category_id: 6
difficulty: junior
profiles:
- junior
- senior
- power
correct: c
options:
  a: Displays token effort spent in the current session
  b: Sets the maximum number of tool calls per turn
  c: Interactively adjusts the thinking depth level (low/medium/high/xhigh) without restarting the session
  d: Generates a time and cost estimate for the next task before executing it
doc_reference:
  file: guide/ultimate-guide.md
  section: 10.1 Commands Table
  anchor: '#built-in-commands'
---

What does the `/effort` command do?

---

`/effort` lets you **change the thinking depth mid-session** without restarting Claude Code. Usage: `/effort low`, `/effort medium`, `/effort high`, `/effort xhigh`, or `/effort auto` to reset to the default adaptive behavior. This is faster than going through `/model` arrow keys. Typical use: downgrade to `low` for quick throwaway tasks, upgrade to `xhigh` when hitting a hard problem — without losing session context.
