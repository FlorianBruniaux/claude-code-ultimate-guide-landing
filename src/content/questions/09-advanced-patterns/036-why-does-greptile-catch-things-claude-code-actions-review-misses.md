---
id: 09-036
category_id: 9
difficulty: senior
profiles:
- senior
- power
correct: a
options:
  a: Greptile indexes the whole repository ahead of time and can search across every
    file for an invariant, while Claude Code Action's review is scoped to the diff
    of a single PR
  b: Greptile runs a fine-tuned model that outperforms Claude at logic error detection
    within the same PR
  c: Greptile blocks merges directly, whereas Claude Code Action only posts advisory
    comments
  d: Claude Code Action cannot read multiple files during a review, so it only checks
    syntax within the changed lines
doc_reference:
  file: guide/workflows/multi-provider-code-review.md
  section: Why Three Providers, Not One
  anchor: '#why-three-providers-not-one'
---

In the guide's multi-provider code review architecture, why does a RAG-based tool like Greptile catch things Claude Code Action's own PR review misses?

---

Greptile indexes the entire repository up front, so it can answer questions like whether a new query respects a scoping rule enforced across dozens of unrelated files. Claude Code Action reasons deeply about a diff with full codebase context, but it reviews one PR at a time and doesn't do repo-wide search. Option c reverses the actual role split: Claude Code Action is the tool allowed to block merge via the CI gate, not Greptile. Option d is wrong because Claude Code Action does reason about intent across full codebase context per PR, it just isn't scoped to search beyond that PR.
