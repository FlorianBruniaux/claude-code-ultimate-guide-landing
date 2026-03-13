---
id: 15-014
category_id: 15
difficulty: senior
profiles:
- senior
- power
correct: c
options:
  a: A Rust-based linter that removes unused code tokens before compilation
  b: A tool that compresses API responses to reduce billing costs
  c: A CLI proxy that filters command outputs before they reach Claude's context, reducing token consumption by 60-90%
  d: A plugin that replaces verbose error messages with concise summaries in the IDE
doc_reference:
  file: guide/ecosystem/third-party-tools.md
  section: RTK (Rust Token Killer)
  anchor: '#rtk-rust-token-killer'
---

What is RTK (Rust Token Killer) and how does it work?

---

RTK is a **CLI proxy** (Rust binary, 446 stars) that filters command outputs **before** they reach Claude's context. Example: `rtk git status` reduces a typical `git status` output by ~76%; `rtk git log` by ~92%. Supports git, cargo, pnpm, vitest, prisma, docker, mypy, aws, psql, and more. Uses a hook-first install (`rtk init --global`) so commands are auto-rewritten transparently. `rtk gain` shows token savings analytics. The TOML Filter DSL allows adding custom filters for any command without writing Rust. Key distinction: RTK **reduces** token consumption (preprocessing); tools like ccusage **monitor** it (postprocessing).
---