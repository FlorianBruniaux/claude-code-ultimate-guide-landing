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
  b: ${workspaceFolder}
  c: ${cwd}
  d: ${PROJECT_DIR}
doc_reference:
  file: guide/ultimate-guide.md
  section: 8.3 Configuration
  anchor: '#variable-substitution'
---

What variable can you use in mcp.json to reference the current project path?

---

The `${workspaceFolder}` variable expands to the current project path.

Variable substitution in mcp.json:
- `${workspaceFolder}` - Current project path
- `${env:VAR_NAME}` - Environment variable

Example:
```json
"env": {
  "PROJECT_PATH": "${workspaceFolder}"
}
```
