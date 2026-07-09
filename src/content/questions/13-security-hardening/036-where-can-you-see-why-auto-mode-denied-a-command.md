---
id: 13-036
category_id: 13
difficulty: power
profiles:
- power
correct: d
options:
  a: In a separate log file written only when CLAUDE_CODE_DEBUG is set
  b: Nowhere; denial reasons are intentionally hidden from the user for security
  c: Only in a dedicated security dashboard reachable from claude.ai
  d: In the transcript, the denial toast notification, and the /permissions recent
    denials view
doc_reference:
  file: guide/core/claude-code-releases.md
  section: v2.1.193
---

Since autoMode.classifyAllShell was introduced in v2.1.193, where can a user now see why Auto mode denied a shell command?

---

v2.1.193 added autoMode.classifyAllShell, which routes every Bash and PowerShell command through the auto-mode risk classifier instead of only commands matching arbitrary-code-execution patterns. The same release surfaced denial reasons in three places: the transcript, the denial toast, and the /permissions recent-denials list, making a blocked command easier to diagnose without digging through logs. There is no separate dashboard or hidden debug-only log for this, and hiding the reason entirely would defeat the point of the change.
