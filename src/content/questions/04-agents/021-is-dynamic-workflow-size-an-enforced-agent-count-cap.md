---
id: 04-021
category_id: 4
difficulty: power
profiles:
- senior
- power
correct: d
options:
  a: It enforces a strict maximum number of agents Claude cannot exceed
  b: It only applies to agents spawned from custom slash commands
  c: It is a billing setting that limits how many agents can run per month
  d: It is an advisory guideline for Claude, not an enforced hard cap on agent count
doc_reference:
  file: guide/core/claude-code-releases.md
  section: v2.1.202
---

The "Dynamic workflow size" setting in /config lets you pick small, medium, or large agent-count guidelines. What is the nature of this setting?

---

The setting is explicitly an advisory guideline for how large Claude generally makes dynamic workflows, not an enforced cap. Claude can still deviate from it depending on the task. Option a overstates it as a hard limit, and options b and c invent scopes the release notes don't support.
