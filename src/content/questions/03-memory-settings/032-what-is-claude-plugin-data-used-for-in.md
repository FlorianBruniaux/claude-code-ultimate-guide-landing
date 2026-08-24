---
id: 03-032
category_id: 3
difficulty: power
profiles:
  - power
correct: b
options:
  a: A variable that stores the plugin's API key for authentication
  b: A persistent storage path for skills to read/write cross-session data (not cleaned between sessions)
  c: A temporary directory that is wiped after each skill execution
  d: The path to the skill's source code directory
doc_reference:
  file: guide/ultimate-guide.md
  section: Plugin Commands
  anchor: "#plugin-commands"
---

What is ${CLAUDE_PLUGIN_DATA} used for in Claude Code skills?

---

${CLAUDE_PLUGIN_DATA} provides persistent storage for skills: a directory path that persists across sessions and is not wiped between runs. Skills can use it to store learned preferences, cached lookups, counters, or any state that should survive session restarts. Contrast with /tmp (ephemeral) or the project directory (pollutes repo). Example: a skill that tracks how many times it has been run, or caches expensive API results.
