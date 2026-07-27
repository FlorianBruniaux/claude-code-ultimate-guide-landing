---
id: 07-027
category_id: 7
difficulty: senior
profiles:
  - senior
  - power
correct: c
options:
  a: allow > ask > defer > deny
  b: deny > ask > defer > allow
  c: deny > defer > ask > allow
  d: ask > deny > defer > allow
doc_reference:
  file: guide/ultimate-guide.md
  section: 7.2 Creating Hooks
  anchor: "#hook-output"
---

When multiple PreToolUse hooks return conflicting permission decisions in v2.1.89+, what is the correct precedence order (highest to lowest)?

---

Since v2.1.89, when multiple PreToolUse hooks return different `permissionDecision` values, the resolution order is: `deny` > `defer` > `ask` > `allow`. The most restrictive decision wins. A single hook returning `deny` blocks the tool even if other hooks allow it, and `defer` (pause for external approval) takes priority over `ask` (interactive prompt). Design your hook pipelines with this precedence in mind so security hooks can always override permissive ones.
