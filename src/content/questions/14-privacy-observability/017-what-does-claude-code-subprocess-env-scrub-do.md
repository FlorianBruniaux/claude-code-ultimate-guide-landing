---
id: 14-017
category_id: 14
difficulty: senior
profiles:
  - senior
  - power
correct: b
options:
  a: It clears the terminal output after each command
  b: It prevents sensitive environment variables from leaking into subprocess contexts (e.g., MCP servers, hooks)
  c: It disables all environment variable expansion in bash commands
  d: It encrypts environment variables before they are passed to Claude
doc_reference:
  file: guide/core/settings-reference.md
  section: Behavior Control
  anchor: "#behavior-control"
---

What does CLAUDE_CODE_SUBPROCESS_ENV_SCRUB do and why is it needed?

---

CLAUDE_CODE_SUBPROCESS_ENV_SCRUB is a security control that prevents sensitive env vars (API keys, tokens, secrets) from leaking into subprocess contexts. Without it, environment variables present in the parent shell are inherited by MCP server processes, hooks, and spawned subprocesses. Set it to a comma-separated list of var names to scrub, or use a glob pattern. Critical for teams where Claude runs in environments with production credentials.
