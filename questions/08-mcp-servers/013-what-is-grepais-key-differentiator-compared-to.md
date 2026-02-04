---
id: 08-013
category_id: 8
difficulty: power
profiles:
- power
correct: b
options:
  a: It's faster
  b: It provides semantic search by intent plus call graph analysis
  c: It supports more languages
  d: It has better documentation
doc_reference:
  file: guide/ultimate-guide.md
  section: 8.2 Available Servers
  anchor: '#grepai-recommended-semantic-search'
---

What is grepai's key differentiator compared to Serena?

---

grepai excels at intent-based search using natural language, plus offers
call graph analysis to trace function dependencies:

```bash
# Semantic search (finds code by meaning, not exact text)
grepai search "user authentication flow"

# Who calls this function?
grepai trace callers "createSession"
```

While Serena focuses on symbol-level analysis, grepai finds code by
describing what it does and traces caller/callee relationships.

Use grepai for exploring unfamiliar codebases or understanding dependencies.
