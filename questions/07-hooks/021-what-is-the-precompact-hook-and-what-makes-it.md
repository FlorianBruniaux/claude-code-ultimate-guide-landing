---
id: 07-021
category_id: 7
difficulty: senior
profiles:
- senior
- power
correct: c
options:
  a: A hook that fires after compaction to validate the generated summary
  b: An async hook that runs before context compaction starts, for logging only
  c: A blocking hook that fires before context compaction, allowing scripts to inject context or veto the compaction
  d: A hook that fires when context reaches 80% to trigger manual compaction
doc_reference:
  file: guide/ultimate-guide.md
  section: 7.3 Hook Events Reference
  anchor: '#hook-events-reference'
---

What is the `PreCompact` hook and what makes it unique among hook types?

---

`PreCompact` is a **blocking hook** that fires just before Claude Code auto-compacts the context window. Because it's blocking, a non-zero exit code can **veto the compaction** — useful when your script determines that critical context hasn't been checkpointed yet. Scripts can also inject additional context via stdout before compaction proceeds. This is different from all other hooks in that it gates an internal Claude Code operation rather than a user-initiated tool call. Use it to: save important state before context is compressed, or block compaction until a checkpoint is written.
