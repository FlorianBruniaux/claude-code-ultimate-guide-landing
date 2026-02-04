---
id: 09-005
category_id: 9
difficulty: power
profiles:
- power
correct: b
options:
  a: Running tests in parallel
  b: Multiple rounds of write-critique-improve cycles
  c: Restarting Claude Code between tasks
  d: Using higher compute models
doc_reference:
  file: guide/ultimate-guide.md
  section: 9.2 Composition Patterns
  anchor: '#the-rev-the-engine-pattern'
---

What is the 'Rev the Engine' pattern?

---

The "Rev the Engine" pattern uses multiple rounds of critique for quality:

```
Round 1: [Initial implementation]
Critique: [What's wrong]
Improvement: [Better version]

Round 2: [Improved implementation]
Critique: [What's still wrong]
Improvement: [Even better version]

Round 3: [Final implementation]
Final check: [Verification]
```

Typically 3 rounds are recommended for quality work.
