---
id: 15-003
category_id: 15
difficulty: senior
profiles:
- senior
- power
correct: b
options:
  a: Claude Code -> Perplexity -> Implementation
  b: Perplexity Deep Research -> Export spec.md -> Claude Code implements
  c: Google Search -> Copy code -> Paste in project
  d: Ask Claude Code to search the web first
doc_reference:
  file: guide/ai-ecosystem.md
  section: Integration Workflow
  anchor: '#integration-workflow'
---

What is the recommended Research-to-Code pipeline?

---

The Research-to-Code pipeline:

1. PERPLEXITY (Deep Research)
   - Research best practices with sources
   - Output: 2000-word spec with citations

2. Export as spec.md

3. CLAUDE CODE
   - "Implement following spec.md"
   - Output: Working implementation with tests

This ensures implementation is based on verified, current information.
