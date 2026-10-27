---
id: 06-025
category_id: 6
difficulty: power
profiles:
- power
correct: b
options:
  a: '`--dangerously-skip-permissions`: bypasses all permission checks for headless execution'
  b: '`--bare`: skips auto-discovery of hooks, skills, plugins, subagents, MCP servers, auto memory, and CLAUDE.md'
  c: '`--no-mcp`: disables all MCP servers for a clean execution environment'
  d: '`-p` alone: print mode already provides a hermetic execution environment'
doc_reference:
  file: guide/ultimate-guide.md
  section: GitHub Actions Integration
  anchor: '#github-actions-integration'
---

You need deterministic CI/CD execution unaffected by local developer settings. Which CLI flag achieves this?

---

`--bare` is minimal mode for scripted `-p` calls such as `claude --bare -p "query"`. It skips auto-discovery of hooks, skills, custom commands, subagents, installed plugins, MCP servers, auto memory, and CLAUDE.md, so local developer configuration does not bleed into pipeline execution; Claude keeps Bash, file read, and file edit tools. Skills in a directory you pass with `--add-dir` still load. Without `--bare`, a `claude -p` call in CI could pick up hooks, plugins, and skills installed on the machine that set up the runner, making pipeline behavior non-deterministic.
