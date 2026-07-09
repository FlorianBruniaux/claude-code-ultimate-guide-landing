---
id: 05-022
category_id: 5
difficulty: intermediate
profiles:
- junior
- senior
- power
correct: b
options:
  a: Only the first skill mentioned is loaded, the rest are treated as plain text
  b: All leading skills are loaded, up to a maximum of 5
  c: All leading skills are loaded with no limit on how many
  d: Stacking skill invocations in one prompt is not supported and raises an error
doc_reference:
  file: guide/core/claude-code-releases.md
  section: v2.1.199
---

If you type /skill-a /skill-b do XYZ in a single prompt, what happens as of v2.1.199?

---

As of v2.1.199, stacked slash-skill invocations load all leading skills mentioned at the start of the prompt, up to a maximum of 5, instead of loading only the first one. Before this change, only the first skill would have been recognized. Option c is wrong since there is a cap, and option d is wrong since stacking is explicitly supported.
