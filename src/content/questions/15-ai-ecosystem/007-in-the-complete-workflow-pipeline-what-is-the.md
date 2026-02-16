---
id: 15-007
category_id: 15
difficulty: power
profiles:
- power
correct: b
options:
  a: Implementation -> Planning -> Delivery
  b: Planning (Perplexity/Gemini/NotebookLM) -> Implementation (Claude Code) -> Delivery
    (Kimi)
  c: Delivery -> Planning -> Implementation
  d: All tools simultaneously
doc_reference:
  file: guide/ai-ecosystem.md
  section: 7. Workflow Orchestration
  anchor: '#7-workflow-orchestration'
---

In the complete workflow pipeline, what is the correct order of phases?

---

The complete pipeline has 3 phases:

PLANNING PHASE:
- Perplexity: Deep Research -> spec.md
- Gemini: Diagram Analysis -> mermaid + plan
- NotebookLM: Doc Synthesis -> audio overview

IMPLEMENTATION PHASE:
- Claude Code: Multi-file implementation
- IDE + Copilot: Inline autocomplete

DELIVERY PHASE:
- Claude Code: PR description, release notes
- Kimi: Stakeholder deck (presentation.pptx)
