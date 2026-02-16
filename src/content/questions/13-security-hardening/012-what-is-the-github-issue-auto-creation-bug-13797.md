---
id: 13-012
category_id: 13
difficulty: junior
profiles:
- junior
- senior
- power
- pm
correct: b
options:
  a: Issues get automatically deleted
  b: Claude Code accidentally creates public GitHub issues containing private project
    details
  c: Issues are created but remain private
  d: Only affects paid enterprise accounts
doc_reference:
  file: guide/known-issues.md
  section: GitHub Issue Auto-Creation Bug
  anchor: '#github-issue-auto-creation-bug'
---

What is the GitHub Issue Auto-Creation Bug (#13797) and why is it dangerous?

---

The GitHub Issue Auto-Creation Bug (#13797) causes Claude Code to accidentally create public GitHub issues containing private project details. Over 17 accidental disclosures documented, affecting v2.0.65+. The danger: internal code, architecture decisions, and private context leak publicly. Mitigation: disable the gh CLI tool or restrict GitHub permissions.
