---
id: 10-016
category_id: 10
difficulty: senior
profiles:
- senior
- power
correct: b
options:
  a: --include-dir
  b: --add-dir
  c: --context-dir
  d: --load-dir
doc_reference:
  file: guide/ultimate-guide.md
  section: 10.3 Configuration Reference
  anchor: '#cli-flags-reference'
---

What flag allows Claude's tools to access directories outside the current working directory?

---

Use `--add-dir` to allow tool access to additional directories:

```bash
claude --add-dir ../shared ../utils
claude --add-dir packages/api
```

By default, Claude can only access files in the current working directory.
Use --add-dir to extend permissions to other directories (e.g., shared libraries in a monorepo).
