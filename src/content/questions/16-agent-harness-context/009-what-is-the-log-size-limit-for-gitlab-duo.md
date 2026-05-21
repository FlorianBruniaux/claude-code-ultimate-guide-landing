---
id: 16-009
category_id: 16
difficulty: senior
profiles:
- senior
- power
correct: c
options:
  a: 50 KiB
  b: 500 KiB
  c: 150 KiB
  d: 1 MiB
doc_reference:
  file: guide/core/agent-harness.md
  section: 4. CI/CD Agentic Patterns
  anchor: '#gitlab-duo'
---

What is the log size limit for GitLab Duo's Fix CI/CD Pipeline feature?

---

GitLab Duo reads up to 150 KiB of pipeline logs when diagnosing failures. Pipelines with verbose output beyond this threshold get truncated context, which degrades diagnosis quality. This is a key constraint to understand before routing all CI failures through GitLab Duo: verbose test runners, Docker builds, and integration suites regularly exceed this limit. The guide recommends knowing this limit when evaluating the tool for your pipeline.
