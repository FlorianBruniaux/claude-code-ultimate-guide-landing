---
id: 11-022
category_id: 11
difficulty: intermediate
profiles:
- senior
- power
- pm
correct: d
options:
  a: Quality declines in a straight line from 0% to 100% of the budget, with no particular
    threshold
  b: Quality is unaffected by budget usage until the window is completely full, at
    which point the session simply stops
  c: Quality improves as more context accumulates, up to a hard cutoff at 100%
  d: Quality drops sharply around 70% of the budget used, rather than declining gradually,
    so context should be purged or compacted before hitting that mark
doc_reference:
  file: guide/ecosystem/practitioner-insights.md
  section: Context Engineering
---

According to a pattern that nine independent speakers converged on at the same meetup, what happens to context quality as a session approaches its context window budget?

---

The convergence is on abruptness, not a gradual slope: context quality falls off sharply around 70% of budget used, rather than declining in a straight line. The practical implication is to purge or compact before hitting that mark, since waiting for visible confusion means the threshold has usually already been crossed. Options a, b, and c each describe a smoother or later-onset degradation than what the speakers actually reported.
