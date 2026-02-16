---
id: 04-004
category_id: 4
difficulty: junior
profiles:
- junior
- senior
- power
correct: b
options:
  a: Agents are faster
  b: Agents encapsulate expertise so you don't need to explain everything each time
  c: Agents cost less
  d: Agents can access more files
doc_reference:
  file: guide/ultimate-guide.md
  section: 4.1 What Are Agents
  anchor: '#agent-vs-direct-prompt'
---

What is the advantage of using agents over direct prompts?

---

Agents encapsulate expertise. Without agents, you'd write: "Review this code for security issues, focusing on OWASP Top 10, checking for SQL injection, XSS, CSRF..." With agents: "Use the security-reviewer agent to audit this code." The agent already has that expertise, making your prompts shorter and more consistent.
