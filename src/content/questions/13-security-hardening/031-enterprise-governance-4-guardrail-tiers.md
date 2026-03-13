---
id: 13-031
category_id: 13
difficulty: senior
profiles:
- senior
- power
correct: b
options:
  a: Bronze, Silver, Gold, Platinum — scaling by team size only
  b: Starter, Standard, Strict, Regulated — scaling by compliance requirements and production exposure
  c: Basic, Advanced, Enterprise, Government — scaling by plan tier
  d: Dev, Staging, Production, Compliance — mirroring deployment environments
doc_reference:
  file: guide/security/enterprise-governance.md
  section: Guardrail Tiers
  anchor: '#4-guardrail-tiers'
---

What are the 4 pre-configured guardrail tiers in the enterprise governance guide?

---

The 4 tiers are: **Starter** (small team <5, internal projects, 10-minute setup), **Standard** (team 5-20, production-adjacent code, adds MCP controls and workflow gates), **Strict** (production systems with real customer data, full approval workflow + audit log), and **Regulated** (HIPAA/SOC2/PCI/finance environments, all previous tiers + compliance audit trail). Each tier provides a ready-to-copy `settings.json` and CLAUDE.md additions. The tiers scale by compliance requirements and production exposure, not by headcount alone.
---