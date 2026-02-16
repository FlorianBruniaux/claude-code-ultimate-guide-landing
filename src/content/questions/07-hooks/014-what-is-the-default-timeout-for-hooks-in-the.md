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

What is the default timeout for hooks in the configuration?

---

The example hook configuration shows a timeout of 5000ms (5 seconds).

```json
{
  "type": "command",
  "command": ".claude/hooks/security-check.sh",
  "timeout": 5000
}
```

This prevents hooks from blocking Claude Code indefinitely.
For longer operations like formatting, you might increase this to 10000ms.
