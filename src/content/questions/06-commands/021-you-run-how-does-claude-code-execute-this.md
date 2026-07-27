---
id: 06-021
category_id: 6
difficulty: senior
profiles:
  - senior
  - power
correct: b
options:
  a: Runs the prompt once, then waits for manual re-trigger. Stop by closing the terminal.
  b: Executes the prompt every 5 minutes until you press Ctrl+C or send any new message
  c: Creates a background cron job that continues even after Claude Code exits
  d: Runs the prompt in a separate sub-agent session on a 5-minute schedule
doc_reference:
  file: guide/ultimate-guide.md
  section: The /loop Command
  anchor: "#the-loop-command"
---

You run `/loop 5m check the deploy`. How does Claude Code execute this, and how do you stop it?

---

`/loop [interval] [prompt]` runs the given prompt or slash command repeatedly at the specified interval. After each execution, Claude waits the interval and executes again. The default interval when none is provided is 10 minutes. Stopping is simple: press Ctrl+C or send any new message. The loop does not persist beyond the session. Common use cases include monitoring deploys, polling for PR feedback, and checking on background tasks.
