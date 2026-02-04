---
id: 07-003
category_id: 7
difficulty: senior
profiles:
- senior
- power
correct: b
options:
  a: As command-line arguments
  b: As JSON on stdin
  c: As environment variables
  d: From a temporary file
doc_reference:
  file: guide/ultimate-guide.md
  section: 7.2 Creating Hooks
  anchor: '#hook-input-stdin-json'
official_doc: https://code.claude.com/docs/en/hooks
---

How do hooks receive input data from Claude Code?

---

Hooks receive JSON data on stdin with information about the event.

Example input structure:
```json
{
  "tool_name": "Bash",
  "tool_input": {
    "command": "git status"
  },
  "session_id": "abc123",
  "cwd": "/project"
}
```

Hooks typically parse this with: `INPUT=$(cat)` followed by `jq` for JSON extraction.
