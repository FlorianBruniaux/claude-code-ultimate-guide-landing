---
id: 10-024
category_id: 10
difficulty: senior
profiles:
- senior
- power
correct: a
options:
  a: It allows specifying a different model per Agent tool invocation, enabling different sub-agents to use different models
  b: It sets the model for the entire session when passed to the first Agent tool call
  c: It overrides the model used by background cron jobs
  d: It was permanently removed in v2.1.72 and replaced by modelOverrides
doc_reference:
  file: guide/core/claude-code-releases.md
  section: v2.1.72
  anchor: '#v2172'
---

What does the restored `model` parameter on the Agent tool enable (v2.1.72)?

---

The `model` parameter on the Agent tool (restored in v2.1.72) enables **per-invocation model overrides** — you can specify which model each sub-agent uses when spawning it via the Task tool. For example, an orchestrator on Opus 4.6 can spawn a code-review sub-agent on Sonnet for cost efficiency, or a security-audit sub-agent on Opus for thoroughness. This parameter was temporarily removed in a previous release and is now back with the same behavior as before.
---
