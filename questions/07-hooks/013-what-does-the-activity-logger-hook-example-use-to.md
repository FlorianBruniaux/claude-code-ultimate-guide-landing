---
id: 07-013
category_id: 7
difficulty: power
profiles:
- power
correct: c
options:
  a: SQLite database
  b: Plain text files
  c: JSONL (JSON Lines) files
  d: CSV files
doc_reference:
  file: guide/ultimate-guide.md
  section: 7.5 Hook Examples
  anchor: '#example-1-activity-logger'
---

What does the activity logger hook example use to store logs?

---

The activity logger hook stores logs in JSONL format (JSON Lines).

Key features:
- Logs to `~/.claude/logs/activity-YYYY-MM-DD.jsonl`
- Each entry contains timestamp, tool name, and session ID
- Auto-cleanup of logs older than 7 days
- Uses `jq` for JSON construction

JSONL is ideal for log files as each line is a valid JSON object,
making it easy to append and parse.
