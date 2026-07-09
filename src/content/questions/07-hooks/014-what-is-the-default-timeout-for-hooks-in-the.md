---
id: 07-014
category_id: 7
difficulty: senior
profiles:
- senior
- power
correct: b
options:
  a: 1000ms (1 second)
  b: 5000ms (5 seconds)
  c: 30000ms (30 seconds)
  d: No timeout by default
doc_reference:
  file: guide/ultimate-guide.md
  section: 7.2 Creating Hooks
  anchor: '#hook-registration-settingsjson'
---

What timeout value does the example hook registration in the guide use?

---

The example hook configuration shows a timeout of 5000ms (5 seconds).

```json
{
  "type": "command",
  "command": ".claude/hooks/security-check.sh",
  "timeout": 5000
}
```

This prevents hooks from blocking Claude Code indefinitely. Note that 5000ms is the value chosen in this example, not the platform default: when the timeout field is omitted, command-type hooks default to 600 seconds, prompt hooks to 30 seconds, and agent hooks to 60 seconds.
For longer operations like formatting, you might increase this to 10000ms.
