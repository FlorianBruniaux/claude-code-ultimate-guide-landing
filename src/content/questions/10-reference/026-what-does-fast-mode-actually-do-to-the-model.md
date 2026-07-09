---
id: 10-026
category_id: 10
difficulty: junior
profiles:
- junior
- pm
correct: c
options:
  a: It switches the session to Haiku 4.5 for the rest of the conversation to reduce
    latency
  b: It disables extended thinking entirely to cut response time, regardless of model
  c: It runs the same model, currently Opus, at roughly 2.5x the speed for about 2x
    the token price; it does not switch to a smaller model
  d: It routes requests through a regional low-latency API endpoint at the same price
    as standard mode
doc_reference:
  file: guide/ultimate-guide.md
  section: Pricing Model
---

What does Claude Code's fast mode actually do to the model being used?

---

Fast mode runs the current Opus model at faster output speed, roughly 2.5x faster, at about 2x the standard token price. It is the same model, not a downgrade to Haiku, and it does not touch the extended-thinking setting or route through a different endpoint.
