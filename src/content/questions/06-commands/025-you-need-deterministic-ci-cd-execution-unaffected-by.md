---
id: 06-025
category_id: 6
difficulty: power
profiles:
  - power
correct: b
options:
  a: "`--dangerously-skip-permissions` — bypasses all permission checks for headless execution"
  b: "`--bare` — disables hooks, LSP, plugin sync, and skill directory scanning; requires ANTHROPIC_API_KEY"
  c: "`--no-mcp` — disables all MCP servers for a clean execution environment"
  d: "`-p` alone — print mode already provides a hermetic execution environment"
doc_reference:
  file: guide/ultimate-guide.md
  section: GitHub Actions Integration
  anchor: "#github-actions-integration"
---

You need deterministic CI/CD execution unaffected by local developer settings. Which CLI flag achieves this?

---

`--bare` was added specifically for scripted `-p` calls in CI environments. It disables hooks, LSP, plugin sync, and skill directory walks so that local developer configuration never bleeds into pipeline execution. It also disables auto-memory entirely and requires `ANTHROPIC_API_KEY` or `apiKeyHelper` via `--settings`. Without `--bare`, a `claude -p` call in CI could pick up local hooks, plugins, and skills installed on the machine that set up the runner, making pipeline behavior non-deterministic.
