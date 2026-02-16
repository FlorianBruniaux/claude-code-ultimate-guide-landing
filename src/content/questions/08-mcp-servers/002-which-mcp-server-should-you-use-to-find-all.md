---
id: 08-002
category_id: 8
difficulty: senior
profiles:
- senior
- power
correct: c
options:
  a: Context7
  b: Sequential Thinking
  c: Serena
  d: Postgres
doc_reference:
  file: guide/ultimate-guide.md
  section: 8.2 Available Servers
  anchor: '#serena-semantic-code-analysis'
official_doc: https://code.claude.com/docs/en/mcp-servers
---

Which MCP server should you use to find all usages of a function across your codebase?

---

Serena provides semantic code analysis with tools like `find_referencing_symbols`.

Serena tools include:
- `find_symbol` - Find functions, classes, methods by name
- `get_symbols_overview` - Get file structure overview
- `find_referencing_symbols` - Find all usages of a symbol
- `search_for_pattern` - Regex search across codebase

Use Serena for deep code understanding and symbol-level analysis.
