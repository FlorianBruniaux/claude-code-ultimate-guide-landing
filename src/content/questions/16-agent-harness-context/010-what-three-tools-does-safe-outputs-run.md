---
id: 16-010
category_id: 16
difficulty: senior
profiles:
- senior
- power
correct: a
options:
  a: Semgrep + TruffleHog + LlamaGuard
  b: SonarQube + GitLeaks + ContentSafety
  c: CodeQL + detect-secrets + Guardrails
  d: Bandit + trufflesecurity + OpenAI Moderation
doc_reference:
  file: guide/core/agent-harness.md
  section: 4. CI/CD Agentic Patterns
  anchor: '#github-agentic-workflows'
---

GitHub Agentic Workflows' Safe Outputs job validates agent-generated diffs with three tools before they touch production surfaces. What are those three tools?

---

Safe Outputs runs Semgrep (SAST, static analysis for security vulnerabilities), TruffleHog (secrets detection), and LlamaGuard (harmful content detection) on agent-generated diffs. This is the validation step that separates agent generation from production surface: the agent produces a diff, Safe Outputs validates it, and only passing diffs are applied. It runs as a separate job from the agent's main execution context.
