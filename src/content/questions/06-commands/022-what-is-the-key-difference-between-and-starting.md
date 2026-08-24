---
id: 06-022
category_id: 6
difficulty: senior
profiles:
  - senior
  - power
correct: b
options:
  a: "There is no difference: `/branch` is just an alias for starting a new session"
  b: "`/branch` forks the current session into an independent copy that preserves all prior context, while a fresh session starts empty"
  c: "`/branch` creates a git branch automatically, while a fresh session does not"
  d: "`/branch` is only available in Plan Mode; a fresh session works in any mode"
doc_reference:
  file: guide/ultimate-guide.md
  section: Session Forking
  anchor: "#session-forking"
---

What is the key difference between `/branch` and starting a fresh `claude` session at a decision point?

---

`/branch` creates a new independent session that starts from the current session's history. Both branches then evolve independently. The equivalent CLI approach is `claude --resume <session-id> --fork-session`. A fresh `claude` session starts with no conversation history, losing all context accumulated up to the decision point. Use `/branch` when you want to try two different approaches to the same problem without losing either starting point.
