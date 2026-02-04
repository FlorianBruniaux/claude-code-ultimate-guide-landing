---
id: 03-013
category_id: 3
difficulty: junior
profiles:
- junior
- senior
- power
correct: b
options:
  a: /etc/claude/
  b: ~/.claude/
  c: /usr/local/claude/
  d: ~/.config/claude/
doc_reference:
  file: guide/ultimate-guide.md
  section: 1.1 Installation
  anchor: '#platform-specific-paths'
---

What is the global config path on macOS/Linux?

---

On macOS/Linux, the global config path is ~/.claude/. On Windows, it's %USERPROFILE%\.claude\ or C:\Users\YourName\.claude\. This directory contains your global CLAUDE.md, settings, and can include a profiles/ subdirectory for dynamic memory switching.
