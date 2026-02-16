---
id: 15-013
category_id: 15
difficulty: senior
profiles:
- senior
- power
correct: c
options:
  a: Performance, Cost, Scalability
  b: UI, API, Database
  c: Security, Architecture, Developer Experience (DX)
  d: Tests, Documentation, CI/CD
doc_reference:
  file: guide/ultimate-guide.md
  section: Skeleton Projects Workflow
  anchor: '#skeleton-projects-workflow'
---

What 3 areas should sub-agents audit when evaluating a skeleton project before forking?

---

Skeleton project evaluation uses 3 specialized sub-agents:

1. **Security** - Audit dependencies, secrets management, auth patterns, known vulnerabilities
2. **Architecture** - Evaluate code organization, patterns, scalability, maintainability
3. **Developer Experience (DX)** - Check setup complexity, documentation quality, tooling, onboarding friction

Each agent produces a score and recommendations before the fork decision.
