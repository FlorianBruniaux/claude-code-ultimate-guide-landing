---
id: 05-025
category_id: 5
difficulty: senior
profiles:
  - senior
  - power
correct: b
options:
  a: Keep every repeated workflow in SKILL.md because numbered steps guarantee execution order
  b: Keep interpretation in a skill, but move required ordering, retries, stop rules, and artifact checks into a hook, script, CI job, or workflow harness
  c: Move all judgment into a deterministic script so the model cannot adapt
  d: Use an agent whenever a workflow contains more than one step
doc_reference:
  file: guide/ultimate-guide.md
  section: 5.1 Skills vs Agents
  anchor: "#decision-tree-which-to-use"
---

Where should the boundary sit between a skill and an automation harness?

---

Use a skill when the model must interpret context, resolve ambiguity, or adapt a procedure. Put required ordering, preconditions, retries, hard stops, and artifact checks in a hook, script, CI job, or dynamic workflow. A numbered list guides the model; it does not guarantee that the controls ran.
