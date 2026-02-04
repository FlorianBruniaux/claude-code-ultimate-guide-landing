---
id: 09-026
category_id: 9
difficulty: senior
profiles:
- senior
- power
correct: b
options:
  a: '>5 occurrences = established, 2-5 = emerging, <2 = not established'
  b: '10+ occurrences = established, 3-10 = emerging, <3 = not established'
  c: Based on file count, not occurrences
  d: '>20 occurrences = established, 5-20 = emerging, <5 = not established'
doc_reference:
  file: guide/ultimate-guide.md
  section: Anti-Hallucination Safeguards
  anchor: '#anti-hallucination-safeguards'
---

What is the 'occurrence rule' for claiming established patterns in code reviews?

---

Anti-hallucination safeguards for code reviews define the occurrence rule:

- **10+ occurrences** = established pattern (safe to reference)
- **3-10 occurrences** = emerging pattern (mention cautiously)
- **<3 occurrences** = NOT an established pattern (don't claim it is)

This prevents Claude from hallucinating "established conventions" from a few examples.
