---
id: 16-037
category_id: 16
difficulty: power
profiles:
- power
correct: d
options:
  a: It disables all automatic retries, requiring the user to manually resume every
    failed request
  b: It only affects retries for MCP tool calls, not the underlying API connection
  c: It caps CLAUDE_CODE_MAX_RETRIES at 15 to prevent a runaway retry loop on a flaky
    network
  d: It raises the default retry count for non-capacity transient errors to 300 and
    lifts the 15-retry cap otherwise imposed by CLAUDE_CODE_MAX_RETRIES
doc_reference:
  file: guide/core/claude-code-releases.md
  section: v2.1.199
---

What does setting CLAUDE_CODE_RETRY_WATCHDOG change for a long-running, unattended session?

---

CLAUDE_CODE_RETRY_WATCHDOG raises the default retry count for transient, non-capacity errors to 300 and removes the cap of 15 that CLAUDE_CODE_MAX_RETRIES otherwise imposes. Option c describes the opposite, the pre-existing cap the watchdog variable lifts. The same v2.1.199 release also made transient 429 errors, unrelated to hitting a usage limit, retry automatically with backoff for subscribers, a related but separate change from the watchdog variable itself.
