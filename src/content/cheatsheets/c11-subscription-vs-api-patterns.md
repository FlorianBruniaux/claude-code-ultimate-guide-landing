---
title: "Subscription vs API: Cost Patterns"
subtitle: "Understanding when each billing model is advantageous"
cardNumber: C11
category: Design
difficulty: intermediate
guideVersion: 3.32.1
order: 211
---

## Two fundamentally different models

**Subscription:** you pay a fixed monthly amount and consume within a token budget limit. The cost is predictable, but the budget is capped and the limits are deliberately opaque.

**API:** per-token billing, no cap. The cost is proportional to usage. Ideal for irregular or very high usage, but without protection against overruns.

The practical distinction: subscription favors solo developers with regular daily usage, API favors teams, CI/CD pipelines, and high-volume use cases.

## How subscription limits work

Subscriptions use a hybrid model: a 5-hour rolling window and a weekly cap. Both apply simultaneously. Billing is announced in "messages" but actually corresponds to tokens, making limits difficult to anticipate.

**Critical point: the Opus/Sonnet ratio.** Opus consumes 8 to 10 times more quota than Sonnet for equivalent work. A Max 20x user who uses Opus intensively can exhaust their weekly quota in 24 to 40 hours of real work, despite a premium subscription.

## Strategies by plan

| Plan | Recommendation |
|------|---------------|
| Pro | Sonnet only, batch sessions, avoid context bloat |
| Max 5x | Sonnet by default, Opus for architecture and complex debug |
| Max 20x | More Opus freedom, but monitor weekly consumption |
| API | Haiku for mechanical tasks, Sonnet for dev, Opus for audit |

## The OpusPlan pattern for saving

On a limited budget, the most effective pattern is to use Opus for planning (where reasoning quality matters), then Sonnet or Haiku for mechanical execution.

```bash
# Phase 1: planning (Opus)
claude --model opus
"Analyze the architecture and propose a migration plan"

# Phase 2: execution (Sonnet/Haiku)
claude --model sonnet
"Implement the plan according to the defined specs"
```

This pattern is automated via `/model opusplan`.

## Consumption monitoring

```bash
/usage             # Cost, token counts + per-model breakdown (v2.1.118)
/cost              # *(alias for /usage since v2.1.118)*
/stats             # *(alias for /usage since v2.1.118)*
/status            # Model + context + summarized cost

# Community tool for cross-session history
ccusage            # Overview all periods
ccusage --today    # Today's cost
ccusage --month    # Monthly cost
ccusage --model-breakdown  # By model
```

Anthropic does not provide real-time metrics in the interface. `ccusage` fills this gap.

**Default effort = high on Pro and Max plans (v2.1.117):** Claude now runs at `high` effort by default on paid subscriptions, which means more thorough reasoning per request. This can increase token consumption compared to earlier versions. On CI pipelines or budget-sensitive workflows, set `CLAUDE_EFFORT=low` explicitly.

**Bedrock users (v2.1.122):** set `ANTHROPIC_BEDROCK_SERVICE_TIER` in your environment or `env` block in `settings.json` to control service tier routing when using AWS Bedrock as the API backend.

## When API wins

Subscription hits its limits in three cases: teams where multiple developers consume simultaneously, CI/CD pipelines with a high PR volume, and projects with long daily sessions that exhaust the budget before the end of the week. In these contexts, API billing (with Haiku for mechanical tasks) often ends up cheaper than expected, especially with a progressive escalation strategy.

## Typical API costs (order of magnitude)

| Session type | Sonnet | Opus |
|---|---|---|
| Bug fix / PR review | ~$0.23 | ~$0.38 |
| Module refactoring | ~$0.75 | ~$1.25 |
| CI/CD review per PR (Haiku) | ~$0.02 | N/A |
