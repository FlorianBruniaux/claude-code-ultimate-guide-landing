---
id: 07-019
category_id: 7
difficulty: senior
profiles:
- senior
- power
correct: d
options:
  a: A PreToolUse hook that renames files before Claude edits them
  b: A SessionStart hook that generates a session title from the CLAUDE.md file
  c: A UserPromptSubmit hook that auto-prefixes each prompt with a session name
  d: A SessionEnd hook that reads the session JSONL, calls Haiku to generate a title, and updates the session slug
doc_reference:
  file: guide/ultimate-guide.md
  section: Session Naming
  anchor: '#session-naming'
---

What is the `auto-rename-session.sh` hook template and how does it work?

---

`auto-rename-session.sh` is a **SessionEnd hook** that automatically generates a descriptive title for each session. It reads the session JSONL file directly from `~/.claude/projects/`, extracts the first 3 user messages, calls `claude -p --model claude-haiku-4-5-20251001` to generate a 4-6 word title in `verb + subject` format, then updates the session slug in the JSONL for `/resume`. If Haiku is unavailable, it falls back to the cleaned first user message. Output goes via `/dev/tty` to bypass Claude Code's JSON parsing.
---