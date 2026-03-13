---
id: 13-033
category_id: 13
difficulty: senior
profiles:
- senior
- power
correct: c
options:
  a: macOS uses Docker containers; Linux uses native process sandboxing
  b: macOS uses bubblewrap; Linux uses Seatbelt (sandbox-exec)
  c: macOS uses Seatbelt (sandbox-exec, built-in); Linux uses bubblewrap + socat (must install separately)
  d: Both platforms use the same Docker-based sandbox, with optional native mode
doc_reference:
  file: guide/security/sandbox-native.md
  section: TL;DR
  anchor: '#tldr'
---

How does native sandboxing differ between macOS and Linux in Claude Code?

---

On **macOS**, native sandboxing uses **Seatbelt** (the built-in `sandbox-exec` system) — no installation required, works out of the box from v2.1.0+. On **Linux/WSL2**, it uses **bubblewrap** + **socat**, which must be installed manually (`sudo apt-get install bubblewrap socat` on Ubuntu/Debian). Native sandboxing is not yet available on WSL1 or Windows (planned). The `dangerouslyDisableSandbox` parameter allows incompatible tools (like `docker` or `watchman`) to escape the sandbox on a per-command basis with user approval.
---