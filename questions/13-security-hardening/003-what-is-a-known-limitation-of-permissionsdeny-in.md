---
id: 13-003
category_id: 13
difficulty: intermediate
profiles:
- senior
- power
correct: b
options:
  a: It only works on macOS
  b: System reminders may expose file contents before tool permission checks
  c: It cannot block Bash commands
  d: It requires admin privileges
doc_reference:
  file: guide/security-hardening.md
  section: Known Security Gaps
  anchor: '#known-security-gaps'
---

What is a known limitation of permissions.deny in .claude/settings.json?

---

permissions.deny has architectural limitations: background indexing may expose file contents via internal "system reminder" mechanism BEFORE tool permission checks are applied. This is documented in GitHub #4160. Defense-in-depth: store secrets outside project directories.
