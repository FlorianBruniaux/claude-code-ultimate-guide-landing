---
id: 08-027
category_id: 8
difficulty: junior
profiles:
  - junior
  - senior
  - power
correct: c
options:
  a: ${projectPath}
  b: ${workspaceFolder}
  c: ${VAR_NAME}
  d: ${PROJECT_DIR}
doc_reference:
  file: guide/ultimate-guide.md
  section: 8.3 Configuration
  anchor: "#variable-substitution"
---

What syntax does Claude Code use for environment variable substitution in MCP config?

---

Claude Code uses standard shell-style `${VAR}` syntax for environment variable expansion.

Variable substitution in MCP config:
- `${VAR}` - Environment variable value
- `${VAR:-default}` - Environment variable with fallback

Note: `${workspaceFolder}` and `${env:VAR_NAME}` are VS Code conventions, not Claude Code.

Example:
```json
"env": {
  "DATABASE_URL": "${DATABASE_URL}"
}
```
