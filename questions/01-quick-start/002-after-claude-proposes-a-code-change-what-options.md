---
id: 01-002
category_id: 1
difficulty: junior
profiles:
- junior
- senior
- power
correct: b
options:
  a: Only accept (y) or reject (n)
  b: Accept (y), reject (n), or edit (e)
  c: Accept (y), skip (s), or delay (d)
  d: Commit (c), reject (r), or review (v)
doc_reference:
  file: guide/ultimate-guide.md
  section: 1.2 First Workflow
  anchor: '#12-first-workflow'
official_doc: https://code.claude.com/docs/en/interactive-mode
---

After Claude proposes a code change, what options do you have when reviewing the diff?

---

When Claude proposes a change, you have three options: press 'y' to accept the change, 'n' to reject and ask for alternatives, or 'e' to edit the change manually. This gives you full control over what gets applied to your codebase. Always review diffs before accepting - this is your safety net.
