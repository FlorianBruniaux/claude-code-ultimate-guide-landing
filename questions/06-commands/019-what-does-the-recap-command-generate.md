---
id: 06-019
category_id: 6
difficulty: junior
profiles:
- junior
- senior
- power
correct: c
options:
  a: A list of all slash commands used in the session
  b: A git diff of all files changed since session start
  c: A structured summary of what was accomplished in the current session
  d: A replay of the last 5 tool calls with their outputs
doc_reference:
  file: guide/ultimate-guide.md
  section: 10.1 Commands Table
  anchor: '#built-in-commands'
---

What does the `/recap` command generate?

---

`/recap` produces a **structured session summary** — what was worked on, decisions made, files changed, and key outcomes. It's the built-in alternative to the `Stop` hook learning-capture pattern. Use `/recap` at session end before starting a new session, when handing off to a teammate, or to capture what you learned. The output is designed to be pasted into a handoff doc or the next session's context. It does not show raw diffs — it generates human-readable narrative plus key facts.
