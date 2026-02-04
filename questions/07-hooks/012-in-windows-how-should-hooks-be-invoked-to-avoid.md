---
id: 07-012
category_id: 7
difficulty: senior
profiles:
- senior
- power
correct: b
options:
  a: Run as Administrator
  b: Use powershell -ExecutionPolicy Bypass -File script.ps1
  c: Disable all security settings
  d: Convert to batch files only
doc_reference:
  file: guide/ultimate-guide.md
  section: 7.3 Hook Templates
  anchor: '#windows-hook-templates'
---

In Windows, how should hooks be invoked to avoid execution policy restrictions?

---

Windows hooks should use the full PowerShell invocation:

```json
{
  "type": "command",
  "command": "powershell -ExecutionPolicy Bypass -File .claude/hooks/security-check.ps1"
}
```

This bypasses the default execution policy that might block script execution.
Batch files (.cmd) can also be used as an alternative for simpler hooks.
