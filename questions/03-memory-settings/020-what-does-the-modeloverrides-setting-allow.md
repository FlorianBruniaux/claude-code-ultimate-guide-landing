---
id: 03-020
category_id: 3
difficulty: senior
profiles:
- senior
- power
correct: b
options:
  a: Switches Claude to a different model mid-conversation
  b: Maps model picker entries to custom provider model IDs (e.g., Bedrock ARNs)
  c: Sets the default model for all new sessions
  d: Overrides the model used by sub-agents only
doc_reference:
  file: guide/core/claude-code-releases.md
  section: v2.1.73
  anchor: '#v2173'
---

What does the `modelOverrides` setting introduced in v2.1.73 allow you to do?

---

`modelOverrides` lets you map model picker entries to custom provider model IDs — for example, pointing the "Opus" entry to a specific Bedrock inference profile ARN. This is useful on third-party providers (Bedrock, Vertex, Foundry) where the model IDs differ from first-party API names. It goes in `~/.claude/settings.json` and does not switch models mid-conversation; it redirects which provider model ID is used when you select a given model from the picker.
---