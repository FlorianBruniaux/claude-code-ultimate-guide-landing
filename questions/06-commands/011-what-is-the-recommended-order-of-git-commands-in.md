---
id: 06-011
category_id: 6
difficulty: power
profiles:
- power
correct: b
options:
  a: push, diff, create PR
  b: status, branch, log, diff, push if needed, create PR
  c: add, commit, push, create PR
  d: checkout, status, push, create PR
doc_reference:
  file: guide/ultimate-guide.md
  section: 6.4 Command Examples
  anchor: '#example-2-pr-command'
---

What is the recommended order of git commands in a PR creation workflow?

---

The recommended PR workflow order is:

1. `git status` - Verify clean working directory
2. `git branch` - Confirm on feature branch
3. `git log main..HEAD` - Review all commits
4. `git diff main...HEAD` - See all changes vs main
5. `git push -u origin [branch]` - Push if not already pushed
6. `gh pr create` - Create the PR

This thorough process ensures quality PRs with proper context.
