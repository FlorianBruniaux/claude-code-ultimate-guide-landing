---
id: 08-008
category_id: 8
difficulty: junior
profiles:
- junior
- senior
- power
correct: b
options:
  a: ${projectPath}
  b: ${CLAUDE_PROJECT_DIR}
  c: ${cwd}
  d: ${PROJECT_DIR}
doc_reference:
  file: guide/ultimate-guide.md
  section: 8.3 Configuration
  anchor: '#variable-substitution'
---

What variable can you use in mcp.json to reference the current project path?

---

The `${CLAUDE_PROJECT_DIR}` variable expands to the absolute path of the project root and is auto-injected into stdio-type MCP server environments.

Variable substitution in Claude Code uses standard shell-style syntax:
- `${CLAUDE_PROJECT_DIR}` - Absolute path to the project root
- `${VAR}` / `${VAR:-default}` - Environment variable with optional default

Note: `${workspaceFolder}` and `${env:VAR_NAME}` are VS Code conventions that Claude Code does NOT support.

Example:
```json
"env": {
  "PROJECT_PATH": "${CLAUDE_PROJECT_DIR}"
}
```
