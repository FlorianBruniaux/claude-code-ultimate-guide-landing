---
id: 07-008
category_id: 7
difficulty: power
profiles:
- power
correct: b
options:
  a: '{"message": "text"}'
  b: '{"systemMessage": "text", "hookSpecificOutput": {...}}'
  c: '{"response": "text"}'
  d: '{"output": "text"}'
doc_reference:
  file: guide/ultimate-guide.md
  section: 7.2 Creating Hooks
  anchor: '#hook-output'
---

What JSON structure should a hook return to send a message back to Claude?

---

Hooks return JSON on stdout with specific fields:

```json
{
  "systemMessage": "Message shown to Claude",
  "hookSpecificOutput": {
    "additionalContext": "Extra information"
  }
}
```

- `systemMessage`: Displayed to Claude as context
- `hookSpecificOutput`: Additional structured data

This allows hooks to provide context that Claude can use in its responses.
