---
id: 14-010
category_id: 14
difficulty: junior
profiles:
- junior
- senior
- power
correct: b
options:
  a: ~/.config/claude/
  b: ~/.claude/projects/<project>/
  c: /var/log/claude/
  d: In the cloud only
doc_reference:
  file: guide/observability.md
  section: Native Commands
  anchor: '#native-commands'
---

Where are Claude Code session logs stored locally?

---

Sessions are stored locally at ~/.claude/projects/<project>/ as JSONL files. This enables session resume with 'claude --resume <id>' or 'claude -c' for most recent. Custom logs from session-logger.sh go to ~/.claude/logs/ (configurable via CLAUDE_LOG_DIR).
