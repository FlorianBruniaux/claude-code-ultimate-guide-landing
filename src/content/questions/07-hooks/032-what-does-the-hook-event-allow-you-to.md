---
id: 07-032
category_id: 7
difficulty: senior
profiles:
  - senior
  - power
correct: c
options:
  a: Prevent context compaction from running when context is still small
  b: Run cleanup logic after a session ends and transcripts are archived
  c: Restore state or log metadata after context compaction completes
  d: Inject system messages before Claude's next turn following a compaction
doc_reference:
  file: guide/ultimate-guide.md
  section: 7.1 The Event System
  anchor: "#event-types"
---

What does the `PostCompact` hook event allow you to do that no other lifecycle hook provides?

---

`PostCompact` fires after context compaction completes and cannot block. It is the only hook event scoped specifically to the compaction lifecycle. Its primary use cases are restoring state that was captured by a `PreCompact` hook before compaction ran, and logging metadata about when and how often compaction is happening. Neither `SessionStart` nor any other lifecycle hook fires in response to a compaction event, making `PostCompact` the right place for any logic that depends on knowing compaction just occurred.
