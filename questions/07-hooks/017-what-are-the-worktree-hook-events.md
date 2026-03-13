---
id: 07-017
category_id: 7
difficulty: senior
profiles:
- senior
- power
correct: c
options:
  a: WorktreeInit and WorktreeCleanup — fire at session start/end in a worktree
  b: WorktreeOpen and WorktreeClose — fire when a worktree tab is opened/closed in VSCode
  c: WorktreeCreate and WorktreeRemove — fire when an agent worktree is created or torn down (v2.1.50+)
  d: WorktreeMount and WorktreeUnmount — fire when a worktree filesystem is mounted
doc_reference:
  file: guide/ultimate-guide.md
  section: 7.3 Hook Event Types
  anchor: '#hook-event-types'
---

What are the two worktree-specific hook events added in v2.1.50?

---

`WorktreeCreate` fires when an agent worktree is being created (can block with non-zero exit). `WorktreeRemove` fires when a worktree is torn down (cannot block). Common use cases: `WorktreeCreate` to set up a DB branch, copy `.env` files, or install dependencies in the new worktree. `WorktreeRemove` to clean up temporary credentials or delete the corresponding DB branch. These events include `worktree` metadata fields in their JSON payload.
---