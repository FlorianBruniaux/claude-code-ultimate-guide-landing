---
id: 09-027
category_id: 9
difficulty: power
profiles:
- power
correct: c
options:
  a: Security Reviewer, Performance Analyst, UX Reviewer
  b: Linter, Type Checker, Test Runner
  c: Consistency Agent, SOLID Agent, Defensive Code Auditor
  d: Junior Reviewer, Senior Reviewer, Architect Reviewer
doc_reference:
  file: guide/ultimate-guide.md
  section: Multi-Agent PR Review
  anchor: '#multi-agent-pr-review'
---

What are the 3 specialized agents in multi-agent code review?

---

Multi-agent PR review uses 3 specialized agents:

1. **Consistency Agent** - Checks naming conventions, import patterns, code style adherence
2. **SOLID Agent** - Reviews architectural principles, dependency injection, single responsibility
3. **Defensive Code Auditor** - Validates error handling, input validation, edge cases

Each agent has anti-hallucination safeguards (occurrence rule, file-scoped claims).
