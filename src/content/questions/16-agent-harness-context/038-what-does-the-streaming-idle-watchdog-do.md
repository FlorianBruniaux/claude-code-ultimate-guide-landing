---
id: 16-038
category_id: 16
difficulty: intermediate
profiles:
- power
- senior
correct: a
options:
  a: It aborts the stalled stream and retries the request automatically
  b: It silently keeps waiting, since Claude Code has no built-in stream timeout
  c: It terminates the entire Claude Code process, requiring a manual restart
  d: It switches the session to a fallback model for the rest of the conversation
doc_reference:
  file: guide/core/claude-code-releases.md
  section: v2.1.196
---

The streaming idle watchdog, on by default since v2.1.196, does what when a response stream produces no events for roughly 5 minutes?

---

The watchdog aborts a stream that has produced no events for about 5 minutes and retries the request, applying across providers. It can be turned off with CLAUDE_ENABLE_STREAM_WATCHDOG=0. It doesn't kill the whole process or silently swap models. Before this release, a stalled stream with no built-in timeout was closer to the behavior described in option b.
