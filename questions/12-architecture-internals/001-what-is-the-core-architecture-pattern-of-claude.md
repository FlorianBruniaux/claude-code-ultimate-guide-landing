---
id: 12-001
category_id: 12
difficulty: intermediate
profiles:
- senior
- power
correct: b
options:
  a: A DAG orchestrator with task planning
  b: A simple while(tool_call) loop with no classifier
  c: A RAG pipeline with embeddings
  d: A multi-agent system with intent router
doc_reference:
  file: guide/architecture.md
  section: The Master Loop
  anchor: '#1-the-master-loop'
---

What is the core architecture pattern of Claude Code?

---

Claude Code runs a remarkably simple `while(tool_call)` loop. There is NO intent classifier, task router, RAG/embedding pipeline, DAG orchestrator, or planner/executor split. The model itself decides when to call tools, which tools to call, and when it's done. This is the "agentic loop" pattern.
