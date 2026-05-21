---
id: 16-005
category_id: 16
difficulty: junior
profiles:
- junior
- senior
- power
- pm
correct: b
options:
  a: Weak prompts, missing tools, no sandboxing
  b: Private data + untrusted content + external communication capability
  c: No authentication, no rate limiting, no audit logging
  d: Large context window, public deployment, no human review
doc_reference:
  file: guide/core/agent-harness.md
  section: 3. The Lethal Trifecta - Security Model
  anchor: '#3-the-lethal-trifecta-security-model'
---

What three conditions constitute the "Lethal Trifecta" security threat in agent systems?

---

Simon Willison coined the term to describe: access to private data + exposure to untrusted content + capability for external communication. Any two of the three are manageable. All three together, without structural isolation, create an exfiltration path: an attacker plants instructions in data the agent will read, the agent processes those instructions using its access to private data, then uses its communication capabilities to exfiltrate. GitHub Security has documented real attacks via malicious repository content.
