---
id: 01-004
category_id: 1
difficulty: junior
profiles:
- junior
- senior
- power
correct: b
options:
  a: Marks a command as urgent
  b: Runs a shell command directly without asking Claude
  c: Escapes special characters
  d: Deletes the previous command
doc_reference:
  file: guide/ultimate-guide.md
  section: 1.3 Essential Commands
  anchor: '#shell-commands-with-'
official_doc: https://code.claude.com/docs/en/interactive-mode
---

What does the `!` prefix do in Claude Code?

---

The `!` prefix executes shell commands immediately without asking Claude to do it. For example, `!git status` runs the command directly. Use this for quick status checks, view commands, and already-known commands. It's faster than asking Claude when you know exactly what command you need.
