---
id: 04-019
category_id: 4
difficulty: intermediate
profiles:
- junior
- senior
- power
correct: d
options:
  a: They only run in the background if you pass a --background flag explicitly
  b: They run in the background only when spawned from the claude agents panel
  c: They still block the main session until they finish, unchanged since earlier
    versions
  d: They run in the background by default, so Claude keeps working and gets notified
    when they finish
doc_reference:
  file: guide/core/claude-code-releases.md
  section: v2.1.198
---

As of v2.1.198, how do subagents spawned via the Task/Agent tool behave by default?

---

Since v2.1.198, subagents run in the background by default, so Claude continues other work while they execute and is notified when they finish, instead of blocking synchronously. Option c describes the pre-v2.1.198 behavior. Options a and b invent gating mechanisms that don't exist; the change applies broadly to Task-tool subagents, not just ones launched from a specific panel.
