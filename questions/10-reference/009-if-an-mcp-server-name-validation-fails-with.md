---
id: 10-009
category_id: 10
difficulty: power
profiles:
- power
correct: b
options:
  a: Letters only
  b: Letters, numbers, underscores, hyphens (max 64 chars)
  c: Any characters except spaces
  d: Alphanumeric and periods
doc_reference:
  file: guide/ultimate-guide.md
  section: 10.4 Troubleshooting
  anchor: '#error-1-tool-name-validation-failed'
---

If an MCP server name validation fails with pattern error, what characters ARE allowed?

---

MCP server names must match: `^[a-zA-Z0-9_-]{1,64}`

Allowed:
- Letters (a-z, A-Z)
- Numbers (0-9)
- Underscores (_)
- Hyphens (-)
- Maximum 64 characters

Not allowed:
- Spaces
- Special characters (@, #, etc.)
- More than 64 characters
