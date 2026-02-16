---
id: 14-007
category_id: 14
difficulty: intermediate
profiles:
- senior
- power
correct: b
options:
  a: PreToolUse
  b: PostToolUse
  c: SessionStart
  d: Notification
doc_reference:
  file: guide/observability.md
  section: Register in Settings
  anchor: '#2-register-in-settings'
---

What hook event is used for session logging?

---

Session logging uses PostToolUse hook - it runs after each tool completes, capturing tool name, file path, project, and token estimates. Configure in settings.json with the session-logger.sh script. Logs are stored as JSONL files in ~/.claude/logs/.
