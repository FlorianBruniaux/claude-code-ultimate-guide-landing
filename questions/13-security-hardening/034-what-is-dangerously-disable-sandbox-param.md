---
id: 13-034
category_id: 13
difficulty: senior
profiles:
- senior
- power
correct: b
options:
  a: A settings.json flag that permanently disables all sandboxing for the project
  b: A per-command escape hatch that lets Claude retry a failed command outside the sandbox, with user approval
  c: A CLI flag equivalent to --dangerously-skip-permissions
  d: A managed policy setting that only admins can configure
doc_reference:
  file: guide/security/sandbox-native.md
  section: Escape Hatch
  anchor: '#6-escape-hatch'
---

What is the `dangerouslyDisableSandbox` parameter and when does it apply?

---

`dangerouslyDisableSandbox` is a **per-command escape hatch** for tools incompatible with sandboxing (e.g., `docker`, `watchman`). When a command fails due to sandbox restrictions, Claude analyzes the failure and retries with this parameter set. The user receives a normal permission prompt, and if approved, the command runs outside the sandbox. To disable this escape hatch entirely for maximum security, set `"sandbox.allowUnsandboxedCommands": false` in `settings.json` — this forces all commands to run sandboxed or be explicitly listed in `excludedCommands`.
---
