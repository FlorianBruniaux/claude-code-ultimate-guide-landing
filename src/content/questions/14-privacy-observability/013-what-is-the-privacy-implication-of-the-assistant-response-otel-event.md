---
id: 14-013
category_id: 14
difficulty: senior
profiles:
- senior
- power
- pm
correct: b
options:
  a: Nothing changes; the event is opt-in and disabled by default in every deployment
  b: The deployment will also start receiving response content on upgrade, unless
    it sets OTEL_LOG_ASSISTANT_RESPONSES=0 to keep logging prompts only
  c: The deployment must migrate to a new OTel schema before any telemetry is accepted
  d: Response content is hashed automatically and cannot be read in plaintext
doc_reference:
  file: guide/core/claude-code-releases.md
  section: v2.1.193
---

The v2.1.193 claude_code.assistant_response OTel event logs the model's response text. What is the privacy implication for a deployment that was already exporting prompt content before upgrading?

---

A deployment already logging prompt content through OpenTelemetry doesn't need to opt into anything new to also start receiving assistant response text after upgrading to v2.1.193, the new event ships on by default for that scenario. A team that wants to keep exporting prompts only, without response text, has to set OTEL_LOG_ASSISTANT_RESPONSES=0. Worth flagging to a compliance-conscious team: an ordinary upgrade can silently widen what gets logged.
