---
id: 09-006
category_id: 9
difficulty: senior
profiles:
- senior
- power
correct: b
options:
  a: --format json
  b: --output-format json
  c: --json
  d: --structured
doc_reference:
  file: guide/ultimate-guide.md
  section: 9.3 CI/CD Integration
  anchor: '#output-format-control'
---

What output format flag gets structured JSON from Claude for scripting?

---

Use `--output-format` to control response format:

| Format | Use Case |
|--------|----------|
| `text` | Human-readable output (default) |
| `json` | Machine-parseable structured data |
| `stream-json` | Real-time streaming for large outputs |

Example:
```bash
git log --oneline -10 | claude -p 'Categorize commits' --output-format json
```
