---
id: 07-004
category_id: 7
difficulty: senior
profiles:
- senior
- power
correct: b
options:
  a: File extensions to watch
  b: Regex pattern for which tools trigger the hook
  c: User permission levels
  d: Output format requirements
doc_reference:
  file: guide/ultimate-guide.md
  section: 7.2 Creating Hooks
  anchor: '#configuration-fields'
---

In the hook registration (settings.json), what does the `matcher` field specify?

---

The `matcher` field is a regex pattern that determines which tools trigger the hook.

Example configuration:
```json
{
  "matcher": "Bash|Edit|Write",
  "hooks": [{"type": "command", "command": "./hooks/security-check.sh"}]
}
```

This hook would trigger for Bash, Edit, or Write tools.
You can match specific tools or use `.*` to match all tools.
