---
id: 14-012
category_id: 14
difficulty: power
profiles:
- senior
- power
correct: c
options:
  a: Merge telemetry from two separate workflow runs into a single trace automatically
  b: Automatically kill a workflow that exceeds its token budget
  c: Reconstruct a specific multi-agent workflow run's activity from telemetry data,
    since every span emitted by workflow-spawned agents now carries the run's ID and
    name
  d: Rename a running workflow directly from the OTel collector dashboard
doc_reference:
  file: guide/core/claude-code-releases.md
  section: v2.1.202
---

What do the workflow.run_id and workflow.name OpenTelemetry attributes, added in v2.1.202, let an operations team do?

---

v2.1.202 added workflow.run_id and workflow.name as OpenTelemetry attributes on telemetry emitted by workflow-spawned agents. Every span produced during a given workflow run now carries a common identifier and name, so an operator can filter or group telemetry in their observability backend and reconstruct exactly what that one workflow run did. It doesn't add budget enforcement, a rename capability, or automatic trace merging.
