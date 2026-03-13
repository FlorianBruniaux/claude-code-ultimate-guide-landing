---
id: 06-014
category_id: 6
difficulty: senior
profiles:
- senior
- power
correct: b
options:
  a: Reformats code to match project style (equivalent to Prettier)
  b: Reviews recently changed code for over-engineering, duplication, and redundant abstractions, then fixes them
  c: Removes all comments and dead code from the current file
  d: Summarizes the diff since last commit in plain language
doc_reference:
  file: guide/ultimate-guide.md
  section: The /simplify Command
  anchor: '#the-simplify-command'
---

What does the `/simplify` command do (v2.1.63+)?

---

`/simplify` reviews your **recently changed code** for over-engineering and redundant abstractions, then fixes the problems it finds. It operates at the architecture and structure level — analyzing for reuse opportunities, quality issues, and efficiency improvements — not at the formatting or linting level. It complements tools like ESLint or Prettier rather than replacing them. Run it after finishing a feature, before opening a pull request: `/simplify` (all changes) or `/simplify focus on error handling` (targeted scope).
---
