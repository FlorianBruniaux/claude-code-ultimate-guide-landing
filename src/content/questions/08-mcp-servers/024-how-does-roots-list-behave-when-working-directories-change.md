---
id: 08-024
category_id: 8
difficulty: power
profiles:
- senior
- power
correct: d
options:
  a: It is computed once at session start and never updates, even if directories are
    added later with --add-dir
  b: It only ever returns the single directory Claude Code was launched from, ignoring
    any additional working directories
  c: It requires the MCP server to poll roots/list on a timer, since Claude Code does
    not push change notifications
  d: It reflects the session's current additional working directories, and Claude
    Code sends notifications/roots/list_changed whenever they change, so servers can
    stay in sync dynamically
doc_reference:
  file: guide/core/claude-code-releases.md
  section: v2.1.203
---

As of v2.1.203, how does Claude Code's MCP roots/list capability behave when a session's working directories change mid-session?

---

v2.1.203 made the roots/list response reflect the session's current additional working directories, including ones added later via --add-dir or another mid-session mechanism, and Claude Code now sends a notifications/roots/list_changed event whenever that set changes. This lets an MCP server stay aligned with what the session considers in scope without polling. The other options describe a static or poll-based model that the actual push-notification design replaces.
