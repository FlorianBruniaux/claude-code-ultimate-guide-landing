---
id: 03-025
category_id: 3
difficulty: power
profiles:
- power
correct: d
options:
  a: A formula for calculating API costs across multiple models
  b: The number of agents needed for parallel execution (N tasks × M models × P priorities)
  c: The fragmentation index measuring how outdated a CLAUDE.md is
  d: The config drift formula showing how developers × tools × OS combinations cause fragmented AI instruction files
doc_reference:
  file: guide/ultimate-guide.md
  section: 3.5 Team Configuration at Scale
  anchor: '#35-team-configuration-at-scale'
---

What is the "N×M×P fragmentation problem" in team AI configuration?

---

N×M×P describes how AI instruction files multiply: N developers × M tools (Claude Code, Cursor, Windsurf) × P operating systems (macOS, Linux). For a 5-dev team using 3 tools on 2 OS types, that's 30 potential configurations. In practice, this causes real drift — one dev adds TypeScript rules, another never gets them; macOS-specific paths break on Linux. The solution is **Profile-Based Module Assembly** (Section 3.5), which extracts reusable modules and auto-assembles the final instruction file per developer profile, achieving a measured 59% token context reduction.
---
