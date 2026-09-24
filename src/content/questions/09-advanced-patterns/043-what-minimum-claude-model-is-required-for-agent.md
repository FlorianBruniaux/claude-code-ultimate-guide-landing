---
id: 09-043
category_id: 9
difficulty: senior
profiles:
- senior
- power
correct: d
options:
  a: Every teammate must use Opus
  b: Every teammate must use the same model as the lead
  c: Haiku cannot be selected for a teammate
  d: Teammates may use different models available to the account
doc_reference:
  file: guide/workflows/agent-teams.md
  section: When Large Teams ARE Justified
  anchor: '#when-large-teams-are-justified'
---

Which model rule applies to experimental Agent Teams?

---

Agent Teams requires the experimental feature flag, not a minimum Opus version. Specify a model per teammate in the request or agent definition; otherwise the subagent-model setting or lead model supplies the default. Organization restrictions and forced environment overrides still apply. Each teammate has its own model-dependent context window.
