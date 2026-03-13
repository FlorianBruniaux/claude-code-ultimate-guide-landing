---
id: 06-013
category_id: 6
difficulty: junior
profiles:
- junior
- senior
- power
correct: c
options:
  a: Repeats the last command once
  b: Enters an infinite conversation loop with no session limit
  c: Runs a prompt or slash command on a recurring interval (e.g., every 5 minutes)
  d: Loops through all files in the current directory
doc_reference:
  file: guide/ultimate-guide.md
  section: 10.1 Command Reference Table
  anchor: '#101-command-reference-table'
---

What does the `/loop` command do in Claude Code (v2.1.71+)?

---

`/loop [interval] [prompt]` runs a prompt or slash command on a recurring schedule. Example: `/loop 5m check the deploy` checks the deployment every 5 minutes until you stop it. This is useful for monitoring tasks, periodic status checks, or recurring automation without leaving Claude Code. The interval can be specified in minutes (`5m`), seconds (`30s`), or hours (`1h`).
---