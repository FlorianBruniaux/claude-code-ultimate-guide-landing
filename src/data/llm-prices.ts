/**
 * LLM API price table (USD per 1M tokens, standard tier) and a pure cost function.
 * Prices read 2026-09-30, except dated additions recorded in each row note.
 * Vendor sources are listed in `sourceUrl`.
 * Cache writes are excluded. When a vendor publishes no cached-input price,
 * every input token is billed at the full input price (upper bound).
 */

export const PRICES_READ_DATE = '2026-09-30'

export type PriceTier = 'standard' | 'peak' | 'off-peak'

export interface LlmPrice {
  id: string
  vendor: string
  model: string
  tier: PriceTier
  /** USD per 1M input tokens */
  input: number
  /** USD per 1M cached input tokens, null when the vendor does not publish it */
  cachedInput: number | null
  /** USD per 1M output tokens */
  output: number
  sourceUrl: string
  /** Dated pricing condition, displayed beside the row. */
  note?: string
}

export interface Scenario {
  /** millions of input tokens per day */
  inputMTokPerDay: number
  /** share of input tokens served from cache, 0 to 100 */
  cacheHitPercent: number
  /** millions of output tokens per day */
  outputMTokPerDay: number
  workingDaysPerMonth: number
}

export interface PricedRow {
  price: LlmPrice
  /** true when no cached price is published and all input is billed in full */
  upperBound: boolean
  perDay: number
  perMonth: number
}

export const DEFAULT_SCENARIO: Scenario = {
  inputMTokPerDay: 20,
  cacheHitPercent: 80,
  outputMTokPerDay: 0.4,
  workingDaysPerMonth: 21,
}

const DEEPSEEK_URL = 'https://api-docs.deepseek.com/quick_start/pricing/'
const ANTHROPIC_URL = 'https://platform.claude.com/docs/en/about-claude/pricing'

export const LLM_PRICES: LlmPrice[] = [
  { id: 'gpt-6-astra', vendor: 'OpenAI', model: 'GPT-6 Astra', tier: 'standard', input: 10, cachedInput: 1, output: 50, sourceUrl: 'https://developers.openai.com/api/docs/models/gpt-6-astra' },
  { id: 'claude-fable-5-1', vendor: 'Anthropic', model: 'Claude Fable 5.1', tier: 'standard', input: 10, cachedInput: 0.25, output: 50, sourceUrl: ANTHROPIC_URL },
  { id: 'claude-opus-5-5', vendor: 'Anthropic', model: 'Claude Opus 5.5', tier: 'standard', input: 4, cachedInput: 0.2, output: 20, sourceUrl: ANTHROPIC_URL },
  { id: 'grok-4-7', vendor: 'xAI', model: 'Grok 4.7', tier: 'standard', input: 2, cachedInput: null, output: 6, sourceUrl: 'https://docs.x.ai/developers/grok-4-7' },
  { id: 'kimi-k3', vendor: 'Moonshot', model: 'Kimi K3', tier: 'standard', input: 3, cachedInput: 0.3, output: 15, sourceUrl: 'https://platform.kimi.ai/docs/pricing/chat' },
  { id: 'gpt-6-sol', vendor: 'OpenAI', model: 'GPT-6.1 Sol', tier: 'standard', input: 2, cachedInput: 0.2, output: 10, sourceUrl: 'https://developers.openai.com/api/docs/models/gpt-6-sol' },
  { id: 'claude-sonnet-5-5', vendor: 'Anthropic', model: 'Claude Sonnet 5.5', tier: 'standard', input: 2, cachedInput: 0.2, output: 10, sourceUrl: ANTHROPIC_URL },
  { id: 'glm-5-3', vendor: 'Z.AI', model: 'GLM-5.3', tier: 'standard', input: 1.4, cachedInput: 0.26, output: 4.4, sourceUrl: 'https://docs.z.ai/guides/overview/pricing' },
  { id: 'mistral-large-4', vendor: 'Mistral', model: 'Mistral Large 4', tier: 'standard', input: 0.68, cachedInput: 0.07, output: 2.09, sourceUrl: 'https://docs.mistral.ai/inference/pricing', note: 'Read 2026-10-06, 50% sale; no end date found. Original input/cache/output: $1.36 / $0.14 / $4.18 per 1M. Regional charges excluded; their interaction with the sale is unverified.' },
  { id: 'devstral-2', vendor: 'Mistral', model: 'Devstral 2', tier: 'standard', input: 0.4, cachedInput: null, output: 2, sourceUrl: 'https://mistral.ai/news/mistral-vibe-2-0' },
  { id: 'deepseek-v4-pro-peak', vendor: 'DeepSeek', model: 'deepseek-v4-pro', tier: 'peak', input: 1.32, cachedInput: 0.044, output: 3.96, sourceUrl: DEEPSEEK_URL },
  { id: 'deepseek-v4-pro-off-peak', vendor: 'DeepSeek', model: 'deepseek-v4-pro', tier: 'off-peak', input: 0.66, cachedInput: 0.022, output: 1.98, sourceUrl: DEEPSEEK_URL },
  { id: 'groq-gpt-oss-120b', vendor: 'Groq', model: 'GPT-OSS 120B', tier: 'standard', input: 0.15, cachedInput: 0.075, output: 0.6, sourceUrl: 'https://console.groq.com/docs/model/openai/gpt-oss-120b' },
  { id: 'deepseek-flash-peak', vendor: 'DeepSeek', model: 'deepseek-flash', tier: 'peak', input: 0.3, cachedInput: 0.006, output: 1.2, sourceUrl: DEEPSEEK_URL },
  { id: 'deepseek-flash-off-peak', vendor: 'DeepSeek', model: 'deepseek-flash', tier: 'off-peak', input: 0.15, cachedInput: 0.003, output: 0.6, sourceUrl: DEEPSEEK_URL },
  { id: 'gpt-6-luna', vendor: 'OpenAI', model: 'GPT-6 Luna', tier: 'standard', input: 0.1, cachedInput: 0.01, output: 0.5, sourceUrl: 'https://developers.openai.com/api/docs/models/gpt-6-luna' },
]

function nonNegative(value: number): number {
  return Number.isFinite(value) && value > 0 ? value : 0
}

/** Cost in USD for one day of usage, cache writes excluded. */
export function dailyCost(price: LlmPrice, scenario: Scenario): number {
  const input = nonNegative(scenario.inputMTokPerDay)
  const output = nonNegative(scenario.outputMTokPerDay)
  const cacheShare = Math.min(100, nonNegative(scenario.cacheHitPercent)) / 100
  const inputCost =
    price.cachedInput === null
      ? input * price.input
      : input * (1 - cacheShare) * price.input + input * cacheShare * price.cachedInput
  return inputCost + output * price.output
}

export function priceRows(
  scenario: Scenario,
  options: { includeOffPeak?: boolean; prices?: LlmPrice[] } = {},
): PricedRow[] {
  const { includeOffPeak = true, prices = LLM_PRICES } = options
  const days = nonNegative(scenario.workingDaysPerMonth)
  return prices
    .filter((price) => includeOffPeak || price.tier !== 'off-peak')
    .map((price) => {
      const perDay = dailyCost(price, scenario)
      return { price, upperBound: price.cachedInput === null, perDay, perMonth: perDay * days }
    })
    .sort((a, b) => b.perDay - a.perDay)
}

export function tierLabel(tier: PriceTier): string {
  return tier === 'peak' ? 'peak' : tier === 'off-peak' ? 'off-peak' : ''
}

export function formatUsd(value: number): string {
  return '$' + value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}
