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

What JSON structure should a hook return to surface a message to the user?

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

- `systemMessage`: A warning message displayed to the human user (not fed to Claude)
- `hookSpecificOutput.additionalContext`: The mechanism that actually injects content into Claude's context window

Use systemMessage to alert the user; use hookSpecificOutput.additionalContext (or the reason field on a decision: block response) to feed information back to Claude.
