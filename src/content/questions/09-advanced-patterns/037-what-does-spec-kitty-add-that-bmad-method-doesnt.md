---
id: 09-037
category_id: 9
difficulty: senior
profiles:
- senior
- power
correct: c
options:
  a: Automatic regeneration of code from the spec whenever the two drift out of sync
  b: A managed cloud service that runs the full spec-to-deploy cycle behind a single
    interface
  c: 'Isolated parallel execution: each work package runs in its own git worktree,
    tracked on a local kanban board with an audit trail of every merge decision'
  d: A chain of 19+ role-specific agents (Analyst, PM, Architect, Dev, QA) that each
    produce a versioned planning artifact before a human signs off
doc_reference:
  file: guide/workflows/spec-first.md
  section: With Spec-Kitty (Isolated Parallel Execution)
  anchor: '#with-spec-kitty-isolated-parallel-execution'
---

BMAD-METHOD and spec-kitty both extend spec-first development, but each adds a different missing piece. What does spec-kitty provide that BMAD-METHOD does not?

---

Spec-kitty adds the piece both Spec Kit and BMAD-METHOD leave out: each work package runs in its own git worktree, with a local kanban dashboard tracking the review-accept-merge loop and an audit trail of every merge decision. Option d describes BMAD-METHOD itself, which runs 19+ role-specific agents through a planning chain but doesn't provide isolated parallel execution on its own. Option a refers to the still-unsolved spec drift problem that no tool handles reliably. Option b describes a different category entirely, the full-cycle AI software factories like Maleus, Factory.ai, and Blitzy.
