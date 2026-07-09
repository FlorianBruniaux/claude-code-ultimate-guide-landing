---
id: 10-027
category_id: 10
difficulty: intermediate
profiles:
- power
correct: a
options:
  a: Disables mouse click, drag, and hover handling in fullscreen mode, while wheel
    scroll keeps working
  b: Disables wheel scroll only, forcing keyboard-only navigation everywhere
  c: Disables the entire mouse subsystem, including outside fullscreen views
  d: Hides the mouse cursor without changing any click behavior
doc_reference:
  file: guide/core/claude-code-releases.md
  section: v2.1.195
---

What does setting CLAUDE_CODE_DISABLE_MOUSE_CLICKS do in the terminal UI?

---

The env var disables mouse click, drag, and hover in fullscreen mode specifically, while keeping wheel scroll functional. It doesn't touch scroll behavior, doesn't extend outside fullscreen mode, and doesn't affect cursor visibility.
