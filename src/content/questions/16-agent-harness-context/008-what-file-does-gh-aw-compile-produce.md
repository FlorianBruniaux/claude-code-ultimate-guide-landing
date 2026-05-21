---
id: 16-008
category_id: 16
difficulty: intermediate
profiles:
- junior
- senior
- power
correct: b
options:
  a: .agent.yml
  b: .lock.yml
  c: workflow-compiled.yaml
  d: agents-hardened.json
doc_reference:
  file: guide/core/agent-harness.md
  section: 4. CI/CD Agentic Patterns
  anchor: '#github-agentic-workflows'
---

What file does `gh aw compile` produce in GitHub Agentic Workflows?

---

`gh aw compile` takes an agent workflow definition in Markdown and produces a `.lock.yml`, which is a hardened GitHub Actions file with security properties baked in at compile time. This is the key architectural decision: security is enforced during compilation, not added later as a policy layer. The compiled `.lock.yml` enforces the agent's read-only context and routes writes through the Safe Outputs validation job.
