---
id: 09-038
category_id: 9
difficulty: senior
profiles:
- senior
- power
- pm
correct: a
options:
  a: It never stops being required. Every level from L0 through L5 assumes a human
    reviews the output before a client sees it
  b: L2, once the agent gets read-only database access and its diagnoses become reliable
    enough
  c: L3, once the agent can distinguish known bugs from new issues via the issue tracker
    integration
  d: L5, once the agent has enough context to draft a full CSM pre-call briefing without
    supervision
doc_reference:
  file: guide/workflows/support-csm-agent.md
  section: Security & Guardrails
  anchor: '#security--guardrails'
---

In the support and CSM agent maturity model, at which level does the human-in-the-loop review step, a person reading the draft before it reaches a client, stop being required?

---

The guide states this explicitly: the human-review step is not optional and should not get automated away even once the agent's accuracy looks good in practice, and every level in the pattern assumes a person reads the output before it reaches a client. Options b, c, and d each pick a specific level as the cutoff, but the whole point of the pattern is that human review is the permanent safety mechanism that makes granting deeper access, like L2's database read, an acceptable risk in the first place.
