---
id: 10-019
category_id: 10
difficulty: junior
profiles:
- junior
- senior
- power
correct: b
options:
  a: Creates a new pull request
  b: Resumes sessions linked to a GitHub PR number or URL
  c: Fetches all PR comments into context
  d: Closes a pull request
doc_reference:
  file: guide/claude-code-releases.md
  section: v2.1.27
  anchor: '#v2127'
---

What does the '--from-pr' flag do in Claude Code v2.1.27?

---

The `--from-pr` flag (v2.1.27) lets you resume Claude Code sessions linked to a specific GitHub PR. Usage: `claude --from-pr 123` or `claude --from-pr https://github.com/org/repo/pull/123`. This loads the PR context (diff, comments, checks) directly into the session.
