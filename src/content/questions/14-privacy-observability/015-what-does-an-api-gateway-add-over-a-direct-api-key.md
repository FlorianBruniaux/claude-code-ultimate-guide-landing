---
id: 14-015
category_id: 14
difficulty: intermediate
profiles:
- senior
- power
- pm
correct: b
options:
  a: Faster model inference, since the gateway caches every response permanently
  b: Virtual keys with per-team budgets and model allowlists, plus centralized usage
    logging, all enforced before a request reaches Anthropic
  c: Automatic code review of every AI-generated pull request
  d: A replacement for permissions.deny, since the gateway can also block local file
    reads
doc_reference:
  file: guide/ops/api-gateway.md
  section: 1. Why a Gateway Layer
  anchor: '#1-why-a-gateway-layer'
---

What does putting an API gateway like LiteLLM or Portkey in front of Anthropic's API add, compared to giving each developer a direct Anthropic API key?

---

Without a gateway, any developer holding the real Anthropic key can call any model, and there is no per-team cost breakdown until the invoice arrives. A gateway like LiteLLM or Portkey issues virtual keys scoped to a team, enforces a monthly budget cap that returns an error once exceeded, restricts which models a key can call, and logs every request with team and token metadata for dashboards. It doesn't review code quality, and it has no visibility into what happens on the developer's machine, so permissions.deny and local sandboxing remain separately necessary.
