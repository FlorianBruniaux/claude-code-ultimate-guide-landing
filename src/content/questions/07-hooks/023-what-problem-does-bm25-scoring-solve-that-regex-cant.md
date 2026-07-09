---
id: 07-023
category_id: 7
difficulty: senior
profiles:
- senior
- power
correct: a
options:
  a: BM25 scores a prompt against stored positive and negative example phrasings per
    skill, so it catches natural-language variations a fixed regex pattern was never
    written to anticipate
  b: BM25 replaces regex matchers entirely because it runs faster and requires no
    per-skill configuration
  c: BM25 uses a neural embedding model to semantically cluster prompts, requiring
    a GPU-backed inference server
  d: BM25 only activates once a project has more than 50 skills, since smaller skill
    sets are handled by regex alone
doc_reference:
  file: guide/workflows/smart-suggest-routing.md
  section: Why this exists
---

A UserPromptSubmit hook uses BM25 lexical scoring alongside a regex matcher to suggest relevant skills. What problem does BM25 solve that regex alone cannot?

---

Regex matchers require a rule per anticipated phrasing, so two prompts meaning the same thing but worded differently need separate patterns. BM25 instead scores a prompt's lexical overlap against curated positive and negative example scenarios stored per skill, with per-skill thresholds auto-calibrated from that corpus, so it generalizes to phrasings never explicitly written. It runs alongside regex rather than replacing it, since regex still wins for fixed, high-confidence enforcement patterns. It is a pure lexical scoring method with no embeddings or GPU involved, and it works from as few as 8 positive examples per skill, not a project-size threshold.
