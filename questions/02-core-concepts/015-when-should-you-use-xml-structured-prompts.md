---
id: 02-015
category_id: 2
difficulty: senior
profiles:
- senior
- power
correct: b
options:
  a: For all prompts regardless of complexity
  b: For multi-step features, bug investigations with context, and code reviews with
    specific criteria
  c: Only for simple one-liner requests
  d: Only when working with APIs
doc_reference:
  file: guide/ultimate-guide.md
  section: 2.6 Structured Prompting with XML Tags
  anchor: '#when-to-use-xml-structured-prompts'
---

When should you use XML-structured prompts?

---

Use XML-structured prompts when requests have 3+ distinct aspects (instruction + context + constraints), when ambiguity causes misunderstanding, when creating reusable templates, or for complex hierarchy. Don't use them for simple one-liner requests or quick typo fixes - the overhead outweighs the benefit. Tags like <instruction>, <context>, <constraints> help Claude understand different aspects.
