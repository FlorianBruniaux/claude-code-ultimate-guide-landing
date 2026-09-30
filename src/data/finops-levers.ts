export const FINOPS_HUB_URL = '/guide/ai-finops/'
export const FINOPS_SNAPSHOT_URL = '/guide/llm-market-snapshot/'

export type RegimeId = 'subscription' | 'api' | 'capacity'

export interface FinopsRegime {
  id: RegimeId
  title: string
  /** Short label used in lever pills and in the "Acts on" line. */
  short: string
  unit: string
  examples: string
  moves: string
}

export interface FinopsLever {
  id: string
  name: string
  /** Regimes the lever acts on (solid edge). */
  regimes: RegimeId[]
  /** Regimes it acts on only for part of the offers (dashed edge). */
  partialRegimes?: RegimeId[]
  limit: string
  href: string
}

export const FINOPS_REGIMES: FinopsRegime[] = [
  {
    id: 'subscription',
    title: 'Subscription quota',
    short: 'Subscription',
    unit: 'A share of an allowance not published in tokens',
    examples: 'Claude Pro, Max, Team · ChatGPT Plus, Pro · Cursor · Copilot',
    moves: 'Plan multipliers, 5-hour and weekly windows, model weighting, which clients may use the seat',
  },
  {
    id: 'api',
    title: 'Metered API tokens',
    short: 'API',
    unit: 'Price per 1M input, cached input, and output tokens',
    examples: 'Anthropic, OpenAI, Google, DeepSeek, Mistral, xAI, hosts and gateways',
    moves: 'List price, cache multipliers, batch and off-peak discounts, regional premiums, tokenizer changes',
  },
  {
    id: 'capacity',
    title: 'Owned or rented capacity',
    short: 'Capacity',
    unit: 'GPU-hours divided by useful work at your utilization',
    examples: 'Local machines, rented GPUs, self-hosted open-weight models',
    moves: 'Hardware and rental prices, model fit, utilization, operating staff',
  },
]

export const FINOPS_LEVERS: FinopsLever[] = [
  { id: 'route-by-complexity', name: 'Route by task complexity', regimes: ['api', 'subscription'], limit: 'A task that needs the strongest model stays expensive; a wrong route costs a retry', href: '/guide/ai-unit-economics/#route-by-complexity' },
  { id: 'prompt-caching', name: 'Prompt caching', regimes: ['api'], limit: 'Any change in the cached prefix invalidates it; context-rewriting proxies can break it', href: `${FINOPS_HUB_URL}#3-lever-map` },
  { id: 'batch-processing', name: 'Batch processing', regimes: ['api'], limit: 'Processed asynchronously within a 24-hour window, so not for an interactive loop', href: '/guide/architecture/#message-batches-api' },
  { id: 'off-peak-pricing', name: 'Off-peak pricing', regimes: ['api'], partialRegimes: ['subscription'], limit: 'Among providers checked, only DeepSeek (API) and Z.AI (coding plan) publish it', href: `${FINOPS_SNAPSHOT_URL}#2-api-prices` },
  { id: 'tool-output-compression', name: 'Tool output compression', regimes: ['api', 'subscription'], limit: 'A lossy filter can drop the line the agent needed and trigger a rerun', href: '/guide/context-engineering-tools/#3-output-compression-cli--tool-output' },
  { id: 'read-delegation', name: 'Read delegation', regimes: ['api', 'subscription'], limit: "The worker model's tokens are still billed", href: '/guide/context-engineering-tools/#shunt-delegation-not-compression' },
  { id: 'sub-agent-isolation', name: 'Sub-agent isolation and iteration caps', regimes: ['api', 'subscription'], limit: 'Poorly scoped sub-agents repeat work in parallel', href: '/guide/ai-unit-economics/#isolate-heavy-work-in-sub-agents' },
  { id: 'provider-portability', name: 'Provider portability', regimes: ['api'], limit: 'Models are not interchangeable: tool schemas and caching differ', href: '/guide/api-gateway/' },
  { id: 'plan-portfolio', name: 'Plan portfolio', regimes: ['subscription'], limit: 'Quotas stay revocable and are not guaranteed in tokens', href: '/guide/subscription-strategy/' },
  { id: 'local-or-rented-inference', name: 'Local or rented inference', regimes: ['capacity'], limit: 'Only open-weight models that fit the hardware; idle hardware still costs money', href: '/guide/local-vs-cloud-inference/' },
]

export function countEdges(levers: FinopsLever[] = FINOPS_LEVERS): { solid: number; dashed: number } {
  return {
    solid: levers.reduce((sum, lever) => sum + lever.regimes.length, 0),
    dashed: levers.reduce((sum, lever) => sum + (lever.partialRegimes?.length ?? 0), 0),
  }
}

/** Number of levers with a full (solid) edge to each regime. */
export function countLeversByRegime(levers: FinopsLever[] = FINOPS_LEVERS): Record<RegimeId, number> {
  const counts: Record<RegimeId, number> = { subscription: 0, api: 0, capacity: 0 }
  for (const lever of levers) {
    for (const id of lever.regimes) counts[id] += 1
  }
  return counts
}
