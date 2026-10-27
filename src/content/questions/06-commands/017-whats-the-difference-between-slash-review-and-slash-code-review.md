---
id: 06-017
category_id: 6
difficulty: power
profiles:
- senior
- power
correct: c
options:
  a: /review is the multi-agent option and /code-review is the fast single-pass option
  b: /review is a separate fast, read-only single-pass review of a GitHub PR, while /code-review runs a multi-agent review
  c: /review is an alias of /code-review and takes the same effort levels and flags
  d: /review only works on local diffs and /code-review only works on GitHub PRs
doc_reference:
  file: guide/core/claude-code-releases.md
  section: v2.1.202
---

As of v2.1.223, how does /review relate to /code-review?

---

From v2.1.223, /review is an alias of /code-review: it reviews the current diff, or a PR number, branch, or path you pass, and takes the same effort levels (low through max, plus ultra) and flags. Before v2.1.223, /review was a separate command that ran a single-pass, read-only review of a GitHub pull request, which is what option b describes. Option d invents a local-versus-GitHub split that never existed between the two.
