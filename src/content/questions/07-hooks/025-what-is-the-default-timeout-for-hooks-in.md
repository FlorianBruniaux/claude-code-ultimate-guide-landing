---
id: 07-025
category_id: 7
difficulty: senior
profiles:
- senior
- power
correct: d
options:
  a: 5 seconds
  b: 30 seconds
  c: 60 seconds
  d: 600 seconds
doc_reference:
  file: guide/ultimate-guide.md
  section: 7.2 Creating Hooks
  anchor: '#hook-registration-settingsjson'
---

What is the default timeout of a command hook on most events when the `timeout` field is omitted?

---

Command, http, and mcp_tool hooks default to 600 seconds. Prompt hooks default to 30 seconds and agent hooks to 60 seconds. A few events use shorter defaults, for example `UserPromptSubmit` (30 seconds for command hooks) and `SessionEnd` (1.5 seconds).

Set `timeout` (in seconds) explicitly on any hook that must fail fast, such as a security check that runs before every tool call.
