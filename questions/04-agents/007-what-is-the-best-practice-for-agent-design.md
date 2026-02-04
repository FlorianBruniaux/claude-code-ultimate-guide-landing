---
id: 04-007
category_id: 4
difficulty: junior
profiles:
- junior
- senior
- power
correct: b
options:
  a: Create one generalist agent that does everything
  b: Create specialized agents for each domain (security, testing, backend, etc.)
  c: Mix specialized and generalist agents
  d: Avoid agents entirely
doc_reference:
  file: guide/ultimate-guide.md
  section: 4.4 Best Practices
  anchor: '#specialization-over-generalization'
---

What is the best practice for agent design: specialization or generalization?

---

Always prefer specialization over generalization. Good: separate agents for backend-architect (API, database, performance), security-reviewer (OWASP, auth, encryption), test-engineer (test strategy, coverage, TDD). Bad: one full-stack-expert that "does everything (poorly)". Specialized agents have focused context and domain-specific expertise.
