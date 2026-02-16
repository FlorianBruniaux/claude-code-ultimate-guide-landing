---
id: 09-004
category_id: 9
difficulty: junior
profiles:
- junior
- senior
- power
correct: b
options:
  a: claude | cat file.txt -p 'analyze'
  b: cat file.txt | claude -p 'analyze this code'
  c: claude < file.txt --prompt 'analyze'
  d: file.txt > claude -p 'analyze'
doc_reference:
  file: guide/ultimate-guide.md
  section: 9.3 CI/CD Integration
  anchor: '#unix-piping-workflows'
---

How do you pipe content to Claude Code with a prompt?

---

Use standard Unix piping with the `-p` flag:

```bash
cat file.txt | claude -p 'analyze this code'
git diff | claude -p 'explain these changes'
npm test 2>&1 | claude -p 'summarize test failures'
```

This enables powerful shell integration for automated code analysis.
