---
id: 06-017
category_id: 6
difficulty: power
profiles:
- senior
- power
correct: b
options:
  a: /review <pr> is the multi-agent option, /code-review <level> <pr#> is the fast
    single-pass option
  b: /review <pr> is a fast single-pass review, /code-review <level> <pr#> runs a
    multi-agent review at a chosen effort level
  c: They are aliases for the exact same command with no behavioral difference
  d: /review only works on local diffs, /code-review only works on GitHub PRs
doc_reference:
  file: guide/core/claude-code-releases.md
  section: v2.1.202
---

As of v2.1.202, what is the difference between /review <pr> and /code-review <level> <pr#>?

---

In v2.1.202, /review <pr> reverted to being a fast single-pass review, while /code-review <level> <pr#> handles the multi-agent, multi-pass review at a chosen effort level (low through max). This distinction had shifted before: at one point /review <pr> used the same engine as /code-review medium. Option c is wrong since the two now behave differently, and option d invents a local-versus-GitHub split that isn't the actual distinction.
