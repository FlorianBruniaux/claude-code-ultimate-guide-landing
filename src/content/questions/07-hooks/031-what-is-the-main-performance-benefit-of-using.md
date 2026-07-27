---
id: 07-031
category_id: 7
difficulty: power
profiles:
  - power
correct: c
options:
  a: The `if` field enables parallel hook execution across multiple events
  b: Hooks with `if` run in a separate process pool and never time out
  c: The `if` field avoids spawning the subprocess entirely when the condition is false, reducing overhead when events fire hundreds of times per session
  d: The `if` field compresses hook output before sending it back to Claude
doc_reference:
  file: guide/ultimate-guide.md
  section: Conditional Hooks with if (v2.1.85+)
  anchor: "#conditional-hooks-with-if-v2185"
---

What is the main performance benefit of using the `if` field on hooks over handling conditions inside the hook script?

---

Without `if`, every PostToolUse event spawns a subprocess even when the hook logic immediately exits because the tool does not match. In large repos, PostToolUse can fire hundreds of times per session. The `if` field is evaluated by Claude Code before any subprocess is created. When the condition is false the hook is simply skipped, eliminating the subprocess spawn entirely. Moving the filter into the hook script with a `case` statement achieves the same logic but still incurs the cost of starting the process every time.
