---
id: 16-026
category_id: 16
difficulty: senior
profiles:
- senior
- power
correct: d
options:
  a: Langfuse and LangSmith
  b: Braintrust
  c: Helicone
  d: None, no commercial LLMOps tool implements ejection
doc_reference:
  file: guide/core/context-engineering.md
  section: 12. Ejection - Disciplined De-engineering
  anchor: '#ejection-vs-archive'
---

Which commercial observability tools implement the ejection mechanism for dormant rules and skills?

---

None. Braintrust, Langfuse, Helicone, and LangSmith all track what happened in prompts and completions; none of them track what your configuration contains nor suggest removing parts of it that are causing harm. Ejection requires knowing your config schema, not just your prompt history. This is the unique gap the discipline fills versus commercial tooling, and why the guide describes it as one of the defensible novelties of the approach.
