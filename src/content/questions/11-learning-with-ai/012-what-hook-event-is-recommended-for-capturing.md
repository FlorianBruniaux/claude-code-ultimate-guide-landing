---
id: 11-012
category_id: 11
difficulty: senior
profiles:
- junior
- senior
- power
correct: c
options:
  a: PreToolUse - before each command
  b: PostToolUse - after each edit
  c: Stop - when session ends
  d: Notification - on alerts
doc_reference:
  file: guide/learning-with-ai.md
  section: Hooks That Build Habits
  anchor: '#hooks-that-build-habits'
---

What hook event is recommended for capturing daily learning?

---

The learning-capture.sh hook uses the Stop event (session end) to prompt: "What's ONE thing you learned today?" This logs to ~/claude-learnings.md automatically. It's lightweight (asks one question) so you'll actually use it, unlike verbose learning journals.
