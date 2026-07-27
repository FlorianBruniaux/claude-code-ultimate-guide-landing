---
id: 07-029
category_id: 7
difficulty: power
profiles:
  - power
correct: b
options:
  a: .env files, node_modules/, and /tmp/ paths
  b: .git/, .claude/ (except .claude/worktrees/), shell config files (.bashrc, .zshrc), .gitconfig, .mcp.json, and .claude.json
  c: Any file outside the current working directory
  d: Only production database configs and SSH keys
doc_reference:
  file: guide/ultimate-guide.md
  section: Bypass Permissions Mode (bypassPermissions)
  anchor: "#bypass-permissions-mode-bypasspermissions"
---

Which paths are ALWAYS protected and prompt for approval even when running in `bypassPermissions` mode?

---

The `bypassPermissions` mode auto-approves everything except a fixed set of always-protected paths. Claude Code will always prompt before modifying: the `.git/` directory, the `.claude/` directory (excluding `.claude/worktrees/`), shell config files (`.bashrc`, `.zshrc`, `.bash_profile`, `.profile`), and tool configs (`.gitconfig`, `.mcp.json`, `.claude.json`). This safety invariant holds regardless of permission mode, preventing accidental or malicious modification of the configuration layer itself.
