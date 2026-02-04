---
id: 09-016
category_id: 9
difficulty: power
profiles:
- power
correct: b
options:
  a: Git stash
  b: Git worktrees
  c: Git branches only
  d: Git submodules
doc_reference:
  file: guide/ultimate-guide.md
  section: 9.12 Git Best Practices & Workflows
  anchor: '#git-worktrees-for-parallel-development'
---

What git workflow enables working on multiple features simultaneously with isolated contexts?

---

Git worktrees create multiple working directories from the same repository.

Benefits:
- Work on multiple features simultaneously
- Each worktree has independent Claude Code context
- No need for stash/switch operations
- Parallel testing while developing

```bash
git worktree add ../myproject-hotfix hotfix
git worktree add ../myproject-feature-a feature-a
```
