---
id: 06-019
category_id: 6
difficulty: power
profiles:
- senior
- power
correct: b
options:
  a: No, running /clear permanently discards the ability to rewind anything before
    it
  b: Yes, /rewind can resume a conversation from before /clear was run
  c: Only if the session was saved with /save before the /clear
  d: Yes, but only within the same calendar day as the /clear
doc_reference:
  file: guide/core/claude-code-releases.md
  section: v2.1.191
---

As of v2.1.191, can /rewind still recover a conversation after you've run /clear?

---

Since v2.1.191, /rewind can resume a conversation from before /clear was run, so clearing the visible context no longer means losing the ability to go back. Before this change, /clear would have effectively been a point of no return for rewind purposes. Options c and d invent conditions, a manual save step and a time window, that the release notes don't mention.
