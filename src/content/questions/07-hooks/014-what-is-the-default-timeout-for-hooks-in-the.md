---
id: 07-014
category_id: 7
difficulty: senior
profiles:
- senior
- power
correct: b
options:
  a: Milliseconds
  b: Seconds
  c: Minutes
  d: Tokens
doc_reference:
  file: guide/ultimate-guide.md
  section: 7.2 Creating Hooks
  anchor: '#hook-registration-settingsjson'
---

In a hook registration, what unit does the `timeout` field use?

---

The `timeout` field is the number of seconds before Claude Code cancels the hook.

```json
{
  "type": "command",
  "command": ".claude/hooks/security-check.sh",
  "timeout": 10
}
```

This prevents a hook from blocking Claude Code indefinitely. When the field is omitted, command hooks default to 600 seconds, prompt hooks to 30 seconds, and agent hooks to 60 seconds. A value such as 5000 would mean 5000 seconds, not 5 seconds.
