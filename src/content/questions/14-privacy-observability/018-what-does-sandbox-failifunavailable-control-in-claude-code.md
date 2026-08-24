---
id: 14-018
category_id: 14
difficulty: senior
profiles:
  - senior
  - power
correct: b
options:
  a: Whether Claude Code crashes when the network is unavailable
  b: Whether Claude Code refuses to run if its sandbox isolation layer cannot be activated
  c: Whether MCP servers fail gracefully when their sandbox times out
  d: Whether hooks are skipped when the sandbox is busy
doc_reference:
  file: guide/core/settings-reference.md
  section: sandbox.failIfUnavailable
  anchor: "#sandboxfailifunavailable"
---

What does sandbox.failIfUnavailable control in Claude Code settings?

---

sandbox.failIfUnavailable (boolean, default: false) controls whether Claude Code hard-fails when sandbox isolation cannot be activated. Set to true in production/CI environments to enforce that every session runs inside the sandbox, with no silent fallback to unsandboxed mode. Set to false in dev environments where sandbox may not be available (e.g., certain Linux kernels or Docker-in-Docker). Part of the defense-in-depth configuration.
