---
id: 15-019
category_id: 15
difficulty: power
profiles:
- power
correct: d
options:
  a: The ANTHROPIC_BASE_URL environment variable was deprecated in favor of a JSON
    config block
  b: Bedrock and Vertex AI support were removed in favor of anthropicAws
  c: A new /gateway slash command replaced /model for provider switching
  d: Model-not-found responses now advance the failover chain instead of stopping
    it
doc_reference:
  file: guide/core/claude-code-releases.md
  section: v2.1.198
---

Claude Code's gateway layer added Claude Platform on AWS as an additional upstream provider option in v2.1.198. What else changed alongside it in the same release note?

---

The same release note states that model-not-found responses now advance the failover chain, meaning a missing model on one provider no longer dead-ends the gateway lookup. Nothing in that release deprecates ANTHROPIC_BASE_URL, removes Bedrock or Vertex support, or introduces a /gateway command.
