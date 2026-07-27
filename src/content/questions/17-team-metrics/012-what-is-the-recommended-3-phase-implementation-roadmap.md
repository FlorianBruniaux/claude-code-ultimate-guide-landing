---
id: 17-012
category_id: 17
difficulty: intermediate
profiles:
  - senior
  - power
  - pm
correct: b
options:
  a: "Phase 1: Hire a metrics engineer. Phase 2: Buy enterprise tooling. Phase 3: Report to board."
  b: "Phase 1 (weeks 1-2): Instrument DORA (deployment frequency + lead time first). Phase 2 (weeks 3-4): Baseline and set internal improvement targets. Phase 3 (month 2+): Layer in product and AI-specific metrics."
  c: "Phase 1: Track everything. Phase 2: Remove what isn't useful. Phase 3: Automate the remainder."
  d: "Phase 1: SPACE survey. Phase 2: DORA instrumentation. Phase 3: AI contribution metrics."
doc_reference:
  file: guide/ops/team-metrics.md
  section: Implementation Roadmap
  anchor: "#implementation-roadmap"
---

What is the recommended 3-phase implementation roadmap for a metrics program?

---

3-phase roadmap: Phase 1 (weeks 1-2) — connect CI/CD to metrics tool, get Deployment Frequency + Lead Time automated first (least manual config), establish live baseline. Phase 2 (weeks 3-4) — establish baseline from real data, set internal improvement targets (not industry benchmark comparisons yet), run first developer satisfaction pulse. Phase 3 (month 2+) — add product metrics (time-to-value, feature CSAT) and AI-specific signals (% AI code, CFR by origin). Review and prune quarterly: any metric that hasn't driven a decision in 3 months is a reporting metric, not a steering metric.
