---
id: 07-006
category_id: 7
difficulty: junior
profiles:
- junior
- senior
- power
correct: b
options:
  a: '1'
  b: '0'
  c: '2'
  d: '-1'
doc_reference:
  file: guide/ultimate-guide.md
  section: 7.2 Creating Hooks
  anchor: '#exit-codes'
---

What exit code allows an operation to proceed?

---

Exit code 0 means success and allows the operation to proceed.

The exit code system:
- **0**: Success - Allow operation
- **2**: Block - Prevent operation
- **Other**: Error - Log and continue

Always end your hooks with `exit 0` if you want to allow the operation,
or `exit 2` to block it.
