---
id: 06-010
category_id: 6
difficulty: senior
profiles:
- senior
- power
correct: c
options:
  a: Automatically create a feature branch
  b: Proceed anyway with warnings
  c: 'WARN: Create a feature branch first'
  d: Exit silently
doc_reference:
  file: guide/ultimate-guide.md
  section: 6.4 Command Examples
  anchor: '#example-2-pr-command'
---

What should a PR command's error handling do if the user is NOT on a feature branch?

---

According to the PR command example, if the user is not on a feature branch,
the command should WARN: "Create a feature branch first".

Similarly, if the working directory is dirty, it should ASK: "Commit changes first?"

Good command design includes clear error handling that:
- Warns users about prerequisites
- Suggests corrective actions
- Prevents accidental mistakes
