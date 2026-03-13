---
id: 09-034
category_id: 9
difficulty: senior
profiles:
- senior
- power
correct: b
options:
  a: Prevents the agent from reading files outside the current directory
  b: Automatically spawns the agent in a fresh git worktree every time it is invoked (v2.1.50+)
  c: Runs the agent in a Docker container with network isolation
  d: Creates a virtual sandbox that blocks all file write operations
doc_reference:
  file: guide/ultimate-guide.md
  section: Declarative isolation in agent definitions
  anchor: '#declarative-isolation-in-agent-definitions'
---

What does `isolation: "worktree"` in an agent's YAML frontmatter do (v2.1.50+)?

---

Setting `isolation: "worktree"` in an agent's frontmatter automatically spawns the agent in a fresh git worktree every time it is invoked. This replaces the earlier pattern of manually passing `isolation: "worktree"` to each individual Task tool call. The worktree is automatically created before the agent runs and cleaned up after it completes. This is the recommended approach for agents that perform large-scale refactors or generate changes that must not pollute the main working tree.
---
