/**
 * Token-saving tools for coding agents: vendor claims against third-party measurements.
 *
 * Every figure was read at its primary source on 2026-09-30 (README, results file,
 * or the raw HTML of the publisher's page). Sign convention for `costDeltaPct` and
 * `tokenDeltaPct`: negative = cheaper / fewer tokens than the tool-free baseline,
 * positive = more expensive / more tokens. THOL publishes the opposite convention;
 * its figures are converted here.
 *
 * Guide source: guide/ecosystem/context-engineering-tools.md, "Independent benchmarks".
 */

export const BENCHMARKS_READ_ON = '2026-09-30'

export type BenchmarkId = 'dasein' | 'stet' | 'marmelab' | 'jetbrains-rtk' | 'jetbrains-caveman' | 'thol'

export interface Benchmark {
  id: BenchmarkId
  name: string
  publisher: string
  date: string
  url: string
  method: string
  /** Commercial interest of the publisher in the comparison, stated plainly. */
  interest: string
  quality: {
    paired: boolean | null
    successMeasured: boolean | null
    cacheSeparated: boolean | null
    dollarCost: boolean | null
    versionsNamed: boolean | null
    moreThan10Tasks: boolean | null
    repeated: boolean | null
    codePublished: boolean | null
  }
}

export const BENCHMARKS: Benchmark[] = [
  {
    id: 'dasein',
    name: 'Code-Compression Bench',
    publisher: 'Dasein Labs',
    date: '2026-07-04 (Fermat arm 2026-09-21, not paired)',
    url: 'https://github.com/daseinlabs/code-compression-bench',
    method: '100 SWE-bench Verified tasks, headless Claude Code via the Python Agent SDK, claude-sonnet-4-6, official Docker grader, one run per arm, cache-aware cost.',
    interest: 'Sponsored and operated by Dasein Labs, which makes Parsec, one of the arms. The Parsec arm also injects a turn-0 brief and a stop decision, beyond compression.',
    quality: { paired: true, successMeasured: true, cacheSeparated: true, dollarCost: true, versionsNamed: false, moreThan10Tasks: true, repeated: false, codePublished: true },
  },
  {
    id: 'stet',
    name: 'I Tested Six Ways to Save $$$ on 5.6 Sol',
    publisher: 'Stet.sh (author not named)',
    date: '2026-07-20, updated 2026-07-22',
    url: 'https://www.stet.sh/blog/gpt-56-token-saving-modes',
    method: '10 merged changes from one production repo, Codex CLI with GPT-5.6 Sol at medium effort as baseline, 7 arms, 2 repetitions, 140 runs.',
    interest: 'The author builds Stet.sh, the evaluation tool used. No compared tool is theirs.',
    quality: { paired: true, successMeasured: true, cacheSeparated: null, dollarCost: true, versionsNamed: false, moreThan10Tasks: false, repeated: true, codePublished: null },
  },
  {
    id: 'marmelab',
    name: 'Cutting the Coding Agent Bill',
    publisher: 'Marmelab (Erwan Bourlon, Jérôme Piernot)',
    date: '2026-08-27',
    url: 'https://marmelab.com/blog/2026/08/27/which-agent-based-plugin-should-you-use-in-2026.html',
    method: 'Atomic CRM Builder tasks, 1 to 4 tasks per tool, 3 to 4 runs per configuration. Harness, model and tool versions not stated.',
    interest: 'Marmelab builds Atomic CRM Builder, the workload. No compared tool is theirs.',
    quality: { paired: true, successMeasured: false, cacheSeparated: null, dollarCost: true, versionsNamed: false, moreThan10Tasks: false, repeated: true, codePublished: false },
  },
  {
    id: 'jetbrains-rtk',
    name: 'RTK and Claude Code token savings',
    publisher: 'JetBrains AI blog (Denis Shiryaev)',
    date: 'July 2026',
    url: 'https://blog.jetbrains.com/ai/2026/07/rtk-claude-code-token-savings/',
    method: '86 SkillsBench tasks, 425 billed trials, Harbor 0.18, Claude Code 2.1.201 headless, rtk 0.43.0, claude-sonnet-5, low and high effort, per-task medians with a Wilcoxon test.',
    interest: 'No affiliation with RTK stated.',
    quality: { paired: true, successMeasured: true, cacheSeparated: true, dollarCost: true, versionsNamed: true, moreThan10Tasks: true, repeated: true, codePublished: null },
  },
  {
    id: 'jetbrains-caveman',
    name: 'Speaking to AI agents like cavemen saves 65% of tokens. We test.',
    publisher: 'JetBrains AI blog (Denis Shiryaev)',
    date: 'July 2026',
    url: 'https://blog.jetbrains.com/ai/2026/07/speak-to-ai-agents-like-cavemen-tosave-tokens/',
    method: '86 SkillsBench tasks, 82 clean pairs, about 240 billed trials, Harbor 0.17, claude-sonnet-5 at low effort, Caveman forcibly activated (its best case).',
    interest: 'No affiliation with Caveman stated.',
    quality: { paired: true, successMeasured: true, cacheSeparated: null, dollarCost: true, versionsNamed: false, moreThan10Tasks: true, repeated: true, codePublished: null },
  },
  {
    id: 'thol',
    name: 'Token-Harness Optimizer Leaderboard',
    publisher: 'Paul Irolla',
    date: 'Not stated',
    url: 'https://pi-infected.github.io/token-harness-optimizer-leaderboard/',
    method: 'Headless Claude Code with Claude Sonnet, 12 scored tasks, 10 runs per task and tool, end-to-end USD on long sessions (over 200,000 tokens), geometric mean with bootstrap intervals.',
    interest: 'Maintained by the author of Tokenade, which tops the table. The page says so.',
    quality: { paired: true, successMeasured: true, cacheSeparated: null, dollarCost: true, versionsNamed: null, moreThan10Tasks: true, repeated: true, codePublished: true },
  },
]

export interface Measurement {
  tool: string
  benchmark: BenchmarkId
  /** What was measured, in plain words. */
  metric: string
  /** One or more runs; two values = two repetitions (Stet) or two settings (JetBrains RTK). */
  values: number[]
  unit: 'cost' | 'tokens' | 'output tokens'
  note?: string
}

export const MEASUREMENTS: Measurement[] = [
  { tool: 'Parsec', benchmark: 'dasein', metric: 'Total cost', values: [-39], unit: 'cost', note: 'Sponsor arm. 62 resolved tasks vs 57 baseline.' },
  { tool: 'Fermat', benchmark: 'dasein', metric: 'Total cost', values: [-22], unit: 'cost', note: 'Run on 2026-09-21, not paired with the other arms. 55 resolved.' },
  { tool: 'Caveman', benchmark: 'dasein', metric: 'Total cost', values: [-19], unit: 'cost', note: '58 resolved.' },
  { tool: 'Woz', benchmark: 'dasein', metric: 'Total cost', values: [-13], unit: 'cost', note: '55 resolved, wall-clock +23%.' },
  { tool: 'RTK', benchmark: 'dasein', metric: 'Total cost', values: [13], unit: 'cost', note: '54 resolved. Best cache hit rate (97.3%) but 6,131 agent steps vs 5,325.' },
  { tool: 'Headroom', benchmark: 'dasein', metric: 'Total cost', values: [44], unit: 'cost', note: '58 resolved.' },
  { tool: 'Caveman', benchmark: 'stet', metric: 'Workload cost, run 1 then run 2', values: [9, -12], unit: 'cost' },
  { tool: 'Ponytail', benchmark: 'stet', metric: 'Workload cost, run 1 then run 2', values: [20, -2], unit: 'cost', note: 'Tests 1 win, 4 losses, 15 ties.' },
  { tool: 'RTK', benchmark: 'stet', metric: 'Workload cost, run 1 then run 2', values: [13, -9], unit: 'cost' },
  { tool: 'Context Mode', benchmark: 'stet', metric: 'Workload cost, run 1 then run 2', values: [72, 33], unit: 'cost' },
  { tool: 'Switch to GPT-5.6 Terra xhigh', benchmark: 'stet', metric: 'Workload cost, run 1 then run 2', values: [-49, -49], unit: 'cost', note: 'A model change, not a tool: the only repeated cost drop.' },
  { tool: 'Headroom', benchmark: 'marmelab', metric: 'Cost per operation, cache mode then token mode', values: [-4, 32], unit: 'cost', note: 'One task, three runs. The authors call -4% noise.' },
  { tool: 'LSP (code navigation)', benchmark: 'marmelab', metric: 'Cost on the large transformation', values: [-13], unit: 'cost' },
  { tool: 'Graphify', benchmark: 'marmelab', metric: 'Cost on the large transformation', values: [1], unit: 'cost' },
  { tool: 'RTK', benchmark: 'jetbrains-rtk', metric: 'Median cost per task, low effort then high effort', values: [7.6, 0.1], unit: 'cost', note: 'Low effort p=0.004; high effort p=0.99. Quality unchanged.' },
  { tool: 'Caveman', benchmark: 'jetbrains-caveman', metric: 'Output tokens', values: [-8.5], unit: 'output tokens', note: 'Forced activation, so a ceiling. Quality 8 better, 10 worse, 64 equal.' },
  { tool: 'Tokenade', benchmark: 'thol', metric: 'End-to-end cost, long sessions', values: [-38.9], unit: 'cost', note: "The benchmark author's own tool." },
  { tool: 'Headroom', benchmark: 'thol', metric: 'End-to-end cost, long sessions', values: [52.8], unit: 'cost' },
]

export interface ClaimVsMeasured {
  tool: string
  claim: string
  claimDenominator: string
  claimSource: string
  measured: string
  measuredDenominator: string
  benchmark: BenchmarkId
  sameDenominator: boolean
}

export const CLAIMS_VS_MEASURED: ClaimVsMeasured[] = [
  {
    tool: 'Caveman',
    claim: '65% fewer',
    claimDenominator: 'output tokens',
    claimSource: 'https://github.com/JuliusBrussee/caveman',
    measured: '8.5% fewer',
    measuredDenominator: 'output tokens, forced activation',
    benchmark: 'jetbrains-caveman',
    sameDenominator: true,
  },
  {
    tool: 'RTK',
    claim: '60-90% fewer',
    claimDenominator: 'tokens in shell command output',
    claimSource: 'https://github.com/rtk-ai/rtk',
    measured: '7.6% more expensive',
    measuredDenominator: 'median cost per task, low effort',
    benchmark: 'jetbrains-rtk',
    sameDenominator: false,
  },
  {
    tool: 'Ponytail',
    claim: '~20% cheaper',
    claimDenominator: 'cost, 12 tasks, Haiku 4.5, n=4',
    claimSource: 'https://github.com/DietrichGebert/ponytail',
    measured: '+20% then -2%',
    measuredDenominator: 'workload cost, two runs',
    benchmark: 'stet',
    sameDenominator: true,
  },
  {
    tool: 'Headroom',
    claim: '73% to 92% fewer',
    claimDenominator: 'tokens on specific structured content (code search, SRE debugging, GitHub triage)',
    claimSource: 'https://github.com/headroomlabs-ai/headroom',
    measured: '44% more expensive',
    measuredDenominator: 'total cost, 100 SWE-bench tasks',
    benchmark: 'dasein',
    sameDenominator: false,
  },
]

/** Where tool-result tokens come from in one measured workload (Marmelab, 9 baseline instances). */
export const TOOL_TOKEN_SHARE = [
  { tool: 'Read', sharePct: 90.6, tokensPerCall: 958 },
  { tool: 'Bash', sharePct: 6.4, tokensPerCall: 77 },
  { tool: 'Edit, Write, other', sharePct: 3.0, tokensPerCall: 50 },
]
