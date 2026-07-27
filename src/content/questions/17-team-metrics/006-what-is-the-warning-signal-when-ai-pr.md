---
id: 17-006
category_id: 17
difficulty: intermediate
profiles:
  - senior
  - power
correct: b
options:
  a: Normal and expected — AI code is simpler and faster to review
  b: A yellow flag indicating possible rubber-stamping; AI-generated code requires at least as much scrutiny as manually written code
  c: A positive sign that AI code quality is higher
  d: Acceptable only if Change Failure Rate is also lower
doc_reference:
  file: guide/ops/team-metrics.md
  section: AI-Specific Metrics
  anchor: "#ai-specific-metrics"
---

What is the warning signal when AI PR review time is 30% faster than manual PR review time?

---

If AI-generated PRs are getting merged 30%+ faster than manual ones, it's a yellow flag suggesting rubber-stamping. AI-generated code requires at least as much review scrutiny as manually written code — arguably more, because it can be confidently wrong in non-obvious ways. Track CFR separately for AI-generated vs manually written code: if AI-generated CFR is materially higher (more than 2-3 percentage points), your review discipline has dropped, not your AI tooling quality.
