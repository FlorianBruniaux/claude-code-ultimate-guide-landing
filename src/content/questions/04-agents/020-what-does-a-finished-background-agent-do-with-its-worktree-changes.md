---
id: 04-020
category_id: 4
difficulty: senior
profiles:
- senior
- power
correct: c
options:
  a: It stops and asks the user what to do with the changes
  b: It discards the changes since worktrees are meant to be ephemeral
  c: It commits, pushes, and opens a draft pull request automatically
  d: It merges the changes directly into the main branch without a PR
doc_reference:
  file: guide/core/claude-code-releases.md
  section: v2.1.198
---

When a background agent launched from claude agents finishes code work in an isolated git worktree, what does it now do as of v2.1.198?

---

As of v2.1.198, background agents that finish code work in a worktree commit, push, and open a draft pull request automatically, instead of stopping to ask the user what to do next. This removes a manual handoff step, so reviewers should expect draft PRs to appear without a prior confirmation prompt. It does not touch main directly and does not discard the work.
