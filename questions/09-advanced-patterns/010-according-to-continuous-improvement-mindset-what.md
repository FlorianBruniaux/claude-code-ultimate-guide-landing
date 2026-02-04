---
id: 09-010
category_id: 9
difficulty: power
profiles:
- power
correct: b
options:
  a: Was this my fault?
  b: How can I improve the process so this error can be avoided next time?
  c: Who is responsible for this?
  d: Should I use a different AI?
doc_reference:
  file: guide/ultimate-guide.md
  section: 9.10 Continuous Improvement Mindset
  anchor: '#the-key-question'
---

According to 'Continuous Improvement Mindset', what should you ask after every manual intervention?

---

After every manual intervention, ask:
"How can I improve the process so this error or manual fix can be avoided next time?"

The improvement pipeline:
1. Can a linting rule catch it? -> Add lint rule
2. Can it go in conventions/docs? -> Add to CLAUDE.md or ADRs
3. Neither? -> Accept as edge case

The meta-skill: instead of fixing code, fix the system that produces the code.
