---
title: "Fast Mode & API Breaking Changes"
subtitle: "Fast mode and the major API changes you need to know"
cardNumber: T21
category: Technical
difficulty: intermediate
guideVersion: 3.32.1
order: 21
---

## Fast Mode

Fast Mode produces responses **2.5x faster** in exchange for a 6x higher cost. The underlying model remains Opus 4.6 or 4.7, not a different model: this is priority resource allocation, not simplified reasoning.

| Parameter | Standard | Fast Mode |
|-----------|----------|-----------|
| Model | Opus 4.6 / 4.7 | Opus 4.6 / 4.7 |
| Speed | Reference | 2.5x faster |
| Input price | $5/MTok | $30/MTok |
| Output price | $25/MTok | $150/MTok |

**In CLI:** `/fast` activates the mode for the current session.

## When to Use Fast Mode

Fast Mode is worthwhile when response time has direct business value: live demo, intensive pair programming, mechanical code generation in a tight loop. It is not a replacement for Sonnet on simple tasks — Sonnet remains 10x cheaper.

**Relevant:**
- Repetitive boilerplate generation in an interactive session
- Reformatting or large-scale code conversion
- Demo context where visible latency impacts the experience

**Not relevant:**
- Background or asynchronous tasks (speed does not matter)
- Simple tasks covered by Sonnet or Haiku
- Tight API budgets

## Fast Mode via API (Opus 4.6 / 4.7)

```python
response = client.messages.create(
    model="claude-opus-4-7",  # or claude-opus-4-6
    speed="fast",
    extra_headers={
        "anthropic-beta": "fast-mode-2026-02-01"
    },
    messages=[{"role": "user", "content": "..."}]
)
```

The beta header is mandatory. Without it, the `speed` parameter is silently ignored.

## Breaking Change: `assistant-prefill` Removed

Opus 4.6 removed support for **assistant prefill**: the technique that allowed pre-filling Claude's response to guide its output format.

```python
# Before (no longer works on Opus 4.6)
messages=[
    {"role": "user", "content": "Respond in JSON"},
    {"role": "assistant", "content": "{"}  # prefill
]

# After — use the system prompt
system="Always respond with valid JSON only."
```

**Impact:** any API pipeline using `assistant-prefill` on Opus 4.6 must migrate to explicit instructions in the system prompt or few-shot examples.

## The `effort` Parameter (API)

The `effort` parameter replaces `budget_tokens` on Opus 4.6 for controlling reasoning depth.

```python
output_config={"effort": "medium"}  # low|medium|high|max
```

`budget_tokens` remains functional on Opus 4.5 but is deprecated on 4.6. Migrate to `effort` for new pipelines.

## Summary of Opus 4.6 / 4.7 Changes

| Feature | Status |
|---------|--------|
| `assistant-prefill` | Removed (4.6+) |
| `budget_tokens` | Deprecated (replaced by `effort`) |
| Fast Mode | New (`speed: "fast"`) |
| Adaptive Thinking | New (replaces opt-in thinking) |
| Opus 4.7 (`claude-opus-4-7`) | Most powerful model; `xhigh` effort only available here |
| 1M context utilization | Fixed in v2.1.117 for Opus 4.7 |
