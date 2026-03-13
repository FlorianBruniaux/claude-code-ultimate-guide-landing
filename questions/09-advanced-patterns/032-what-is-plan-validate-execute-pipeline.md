---
id: 09-032
category_id: 9
difficulty: power
profiles:
- power
correct: b
options:
  a: A 3-command workflow where each command runs in a separate terminal window simultaneously
  b: A 3-command workflow (/plan-start, /plan-validate, /plan-execute) where planning, independent validation, and parallel execution are deliberately separated
  c: Three phases of the /plan command toggled by pressing Tab between each
  d: A git branching strategy with plan, staging, and production branches
doc_reference:
  file: guide/workflows/plan-pipeline.md
  section: TL;DR
  anchor: '#tldr'
---

What is the Plan-Validate-Execute pipeline and what makes it different from using `/plan` mode?

---

The Plan-Validate-Execute pipeline runs in 3 explicit commands: `/plan-start` (5-phase planning with a dynamic research agent team + ADRs), `/plan-validate` (independent 2-layer review by specialist agents — no confirmation bias), `/plan-execute` (parallel worktree agents through to merged PR). The key differentiator from native `/plan` mode: research is done by specialized agents in parallel (not one agent sequentially), validation is independent from planning, and every significant decision generates an ADR that auto-resolves future decisions. Run `/clear` between commands to reset context.
---
