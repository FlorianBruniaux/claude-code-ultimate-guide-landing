---
id: 07-001
category_id: 7
difficulty: junior
profiles:
- junior
- senior
- power
correct: c
options:
  a: '0'
  b: '1'
  c: '2'
  d: '255'
doc_reference:
  file: guide/ultimate-guide.md
  section: 7.2 Creating Hooks
  anchor: '#exit-codes'
official_doc: https://code.claude.com/docs/en/hooks
---

What exit code should a hook return to BLOCK an operation?

---

Hook exit codes have specific meanings:

- **Exit code 0**: Success - Allow the operation to proceed
- **Exit code 2**: Block - Prevent the operation from executing
- **Other codes**: Error - Log the error and continue

This is critical for security hooks that need to prevent dangerous commands.
For example, a hook that detects `rm -rf /` should `exit 2` to block execution.
