---
id: 16-033
category_id: 16
difficulty: senior
profiles:
- senior
- power
correct: b
options:
  a: Static API keys scoped to agent type
  b: OAuth On-Behalf-Of (OBO) flows scoped to specific session contexts
  c: JWT tokens with role-based claims
  d: SAML assertions with time-bounded access
doc_reference:
  file: guide/roles/ai-roles.md
  section: 18. Agent Identity Architect
  anchor: '#18-agent-identity-architect'
---

What authentication mechanism does Microsoft Entra Agent ID use to scope permissions for individual agent sessions?

---

Microsoft Entra Agent ID provides dedicated service principal types with OAuth On-Behalf-Of (OBO) flows scoped to specific session contexts. The OBO flow means the agent acts on behalf of a specific task context, not with the broad permissions of a shared team credential or static API key. Sub-agents spawned by orchestrators cannot inherit parent permissions by default; they receive the minimum scope for their task. This is the per-agent identity model that 77% of organizations have not implemented.
