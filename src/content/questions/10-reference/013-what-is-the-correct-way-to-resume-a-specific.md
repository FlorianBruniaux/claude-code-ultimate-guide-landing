---
id: 10-013
category_id: 10
difficulty: senior
profiles:
- senior
- power
correct: b
options:
  a: claude --session abc123
  b: claude -r abc123
  c: claude --load abc123
  d: claude -s abc123
doc_reference:
  file: guide/ultimate-guide.md
  section: 10.3 Configuration Reference
  anchor: '#cli-flags-reference'
official_doc: https://code.claude.com/docs/en/setup
---

What is the correct way to resume a specific session by ID?

---

Use `-r` or `--resume` to resume a specific session:

```bash
claude -r abc123           # Resume session abc123
claude --resume abc123     # Same as above
claude -c                  # Resume last session (short)
claude --continue          # Resume last session (long)
```

Combine with `-p` for scripting: `claude -r abc123 -p "check status"`
