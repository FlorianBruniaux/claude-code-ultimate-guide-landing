---
id: 06-015
category_id: 6
difficulty: senior
profiles:
- senior
- power
correct: d
options:
  a: Runs a single command in batch (non-interactive) mode
  b: Groups multiple pending changes into one commit
  c: Executes all queued agent tasks in sequence
  d: Orchestrates large-scale codebase changes across 5-30 parallel agents in isolated worktrees, each opening its own PR
doc_reference:
  file: guide/ultimate-guide.md
  section: The /batch Command
  anchor: '#the-batch-command'
---

What does the `/batch` command do in Claude Code (v2.1.63+)?

---

`/batch` distributes large-scale codebase changes across 5–30 parallel agents in isolated git worktrees. Each agent handles an independent portion of the work and opens its own pull request. The workflow is: (1) research and plan the change, (2) spawn parallel worktree agents, (3) each agent completes its portion and creates a PR. Ideal for migrations like `/batch migrate from react to vue` or `/batch add type annotations to all JavaScript files` — tasks that can be split into independent units.
---
