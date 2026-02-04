---
id: 12-011
category_id: 12
difficulty: senior
profiles:
- power
correct: b
options:
  a: More scaffolding, less model - build complex orchestration
  b: Less scaffolding, more model - trust Claude's reasoning
  c: Maximum control - explicit rules for every case
  d: Hybrid approach - RAG + classifier + model
doc_reference:
  file: guide/architecture.md
  section: 'Philosophy: Less Scaffolding, More Model'
  anchor: '#9-philosophy-less-scaffolding-more-model'
---

What is Claude Code's design philosophy, as stated by Anthropic?

---

Claude Code's philosophy is "Less scaffolding, more model" - trust Claude's reasoning instead of building complex orchestration systems. This means: single model decides (no classifier/router), Grep+Glob (no RAG), simple while loop (no DAG), conversation as state (no state machines).
