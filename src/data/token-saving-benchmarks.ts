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

export type BenchmarkId =
  | 'dasein'
  | 'stet'
  | 'marmelab'
  | 'jetbrains-rtk'
  | 'jetbrains-caveman'
  | 'thol'
  | 'tura'
  | 'codepointer'

export interface Benchmark {
  id: BenchmarkId
  name: string
  publisher: string
  date: string
  url: string
  method: string
  /** Commercial interest of the publisher in the comparison, stated plainly. */
  interest: string
  /**
   * Tool made by the publisher, as named in MEASUREMENTS. Its rows in this benchmark are the
   * project's own benchmark: shown in its catalogue entry, never counted as third-party results.
   */
  makerOf?: string
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
    makerOf: 'Parsec',
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
    method: '86 SkillsBench tasks, 425 billed trials, Harbor 0.18, Claude Code 2.1.201 headless, rtk 0.43.0, claude-sonnet-5, low and high effort, per-task medians with a Wilcoxon test. RTK AI Labs published a response on 2026-08-07 that questions the one-run-per-task design and reports -4.8% on 13 dev tasks (p = 0.305).',
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
    date: 'Claude Code 2.1.206 campaign, results committed 2026-07-18',
    url: 'https://pi-infected.github.io/token-harness-optimizer-leaderboard/',
    method: 'Headless Claude Code 2.1.206 with claude-sonnet-4-6, 17 tasks, 10 runs per task and tool. The headline keeps the 7 tasks where the tool-free control used at least 200,000 tokens (70 runs per tool) and reports the ratio of end-to-end USD with bootstrap 95% intervals.',
    makerOf: 'Tokenade',
    interest: 'Maintained by the author of Tokenade, which tops the table. The page says so.',
    quality: { paired: true, successMeasured: true, cacheSeparated: null, dollarCost: true, versionsNamed: true, moreThan10Tasks: true, repeated: true, codePublished: true },
  },
  {
    id: 'tura',
    name: 'Token-saving plugins: measure cost per completed task',
    publisher: 'Yohji Sakamoto, maintainer of the Tura coding agent',
    date: '2026-07-19, data updated 2026-08-15',
    url: 'https://github.com/Tura-AI/benchmark/tree/main/blog_data/token-saving-plugin-eza',
    method: 'One task (rewrite the Rust eza tool in Python, 52 assertions), Codex CLI 0.144.1 with gpt-5.6-sol at high reasoning, 2 runs per arm against matched baseline runs. Cost is modeled from token counts at list prices, not billed.',
    interest: 'Published by the maintainer of Tura, a coding agent that competes with the harnesses these plugins extend. The author says so and calls the post not an independent review.',
    quality: { paired: true, successMeasured: true, cacheSeparated: true, dollarCost: true, versionsNamed: true, moreThan10Tasks: false, repeated: true, codePublished: true },
  },
  {
    id: 'codepointer',
    name: 'Cutting LLM token costs with rtk, headroom, and caveman',
    publisher: 'Codepointer (Yongkyun)',
    date: '2026-06-18',
    url: 'https://codepointer.dev/p/cutting-llm-token-costs-with-rtk',
    method: "Counterfactual replay of 500 sessions sampled from the author's own Claude Code history (614M tokens, $926.31 at list prices). Headroom was applied to the recorded payloads; RTK and Caveman at their published per-stream rates. No live runs, task success not measured.",
    interest: 'No relationship with the three projects stated.',
    quality: { paired: false, successMeasured: false, cacheSeparated: true, dollarCost: true, versionsNamed: null, moreThan10Tasks: true, repeated: false, codePublished: null },
  },
]

/** Short labels for chips and inline references. */
export const BENCHMARK_SHORT: Record<BenchmarkId, string> = {
  dasein: 'Dasein Labs',
  stet: 'Stet.sh',
  marmelab: 'Marmelab',
  'jetbrains-rtk': 'JetBrains (RTK)',
  'jetbrains-caveman': 'JetBrains (Caveman)',
  thol: 'THOL',
  tura: 'Tura',
  codepointer: 'Codepointer',
}

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
  { tool: 'Tokenade', benchmark: 'thol', metric: 'End-to-end cost, 7 long tasks', values: [-38.9], unit: 'cost', note: "The benchmark author's own tool. 95% interval: 22.3% to 53.2% cheaper." },
  { tool: 'Edgee', benchmark: 'thol', metric: 'End-to-end cost, 7 long tasks', values: [-14.7], unit: 'cost', note: 'Interval 37.1% cheaper to 11.1% more expensive. THOL flags no token accounting for this tool.' },
  { tool: 'Caveman', benchmark: 'thol', metric: 'End-to-end cost, 7 long tasks', values: [-13.6], unit: 'cost', note: 'Interval 30.2% cheaper to 3.6% more expensive.' },
  { tool: 'claude-token-efficient', benchmark: 'thol', metric: 'End-to-end cost, 7 long tasks', values: [-11.6], unit: 'cost', note: 'Interval 24.2% cheaper to 1.4% more expensive.' },
  { tool: 'code-review-graph', benchmark: 'thol', metric: 'End-to-end cost, 7 long tasks', values: [-8.5], unit: 'cost', note: 'THOL reports that the agent never used the tool, so the gap is not a tool effect.' },
  { tool: 'CodeGraph', benchmark: 'thol', metric: 'End-to-end cost, 7 long tasks', values: [-7.6], unit: 'cost', note: 'Interval 21.6% cheaper to 8.7% more expensive. Opt-in tool.' },
  { tool: 'squeez', benchmark: 'thol', metric: 'End-to-end cost, 7 long tasks', values: [-6.9], unit: 'cost', note: 'Interval 26.1% cheaper to 18.4% more expensive.' },
  { tool: 'Ponytail', benchmark: 'thol', metric: 'End-to-end cost, 7 long tasks', values: [-3.5], unit: 'cost', note: 'Interval 18.1% cheaper to 12.4% more expensive.' },
  { tool: 'Graphify', benchmark: 'thol', metric: 'End-to-end cost, 7 long tasks', values: [-3.3], unit: 'cost', note: 'THOL reports that the agent never used the tool, so the gap is not a tool effect.' },
  { tool: 'RTK', benchmark: 'thol', metric: 'End-to-end cost, 7 long tasks', values: [7.1], unit: 'cost', note: 'Interval 7.2% cheaper to 26.0% more expensive.' },
  { tool: 'lean-ctx', benchmark: 'thol', metric: 'End-to-end cost, 7 long tasks', values: [10.3], unit: 'cost', note: 'Interval 12.6% cheaper to 46.4% more expensive.' },
  { tool: 'Headroom', benchmark: 'thol', metric: 'End-to-end cost, 7 long tasks', values: [52.8], unit: 'cost', note: 'Interval 10.2% to 120.2% more expensive, entirely above zero.' },
  { tool: 'Ponytail', benchmark: 'tura', metric: 'Modeled cost, one task, 2 runs', values: [-8.9], unit: 'cost', note: 'Score 80.8% vs 78.9% baseline. The two runs spread by 51.7% of their mean.' },
  { tool: 'Caveman', benchmark: 'tura', metric: 'Modeled cost, one task, 2 runs', values: [-3.9], unit: 'cost', note: 'Score 86.5% vs 78.9% baseline.' },
  { tool: 'RTK', benchmark: 'tura', metric: 'Modeled cost, one task, 2 runs', values: [7.2], unit: 'cost', note: 'Score 76.9% vs 78.9% baseline, 44% more agent rounds. The author says the data do not identify a plugin effect.' },
  { tool: 'Headroom', benchmark: 'codepointer', metric: 'Share of replayed spend saved', values: [-2.8], unit: 'cost', note: 'Replay, not a live run. Median 54% cut on the grep and diff output it touches.' },
  { tool: 'RTK', benchmark: 'codepointer', metric: 'Share of replayed spend saved', values: [-0.5], unit: 'cost', note: 'Replay, not a live run. 33% to 99% cut on the shell output it recognizes.' },
  { tool: 'Caveman', benchmark: 'codepointer', metric: 'Share of replayed spend saved', values: [-0.4], unit: 'cost', note: 'Replay, not a live run.' },
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
    claim: '50% fewer (median)',
    claimDenominator: "output tokens on 10 dev questions against an 'Answer concisely.' control, skill only. The earlier 65% (v1.9.1 release notes) is no longer in the README",
    claimSource: 'https://github.com/JuliusBrussee/caveman',
    measured: '8.5% fewer',
    measuredDenominator: 'output tokens, 82 paired coding tasks, forced activation',
    benchmark: 'jetbrains-caveman',
    sameDenominator: true,
  },
  {
    tool: 'RTK',
    claim: 'up to 90% fewer',
    claimDenominator: 'bash output the agent reads, per the README, which adds that this is not the same as cutting the bill by 90%. The repository description says 60-90% of LLM token consumption on common dev commands',
    claimSource: 'https://github.com/rtk-ai/rtk/blob/develop/README.md',
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
    claim: '20% fewer',
    claimDenominator: "tokens for coding agents, per the repository description (its README's four seeded scenarios show 21% to 57%)",
    claimSource: 'https://github.com/headroomlabs-ai/headroom',
    measured: '44% more expensive',
    measuredDenominator: 'total cost, 100 SWE-bench tasks',
    benchmark: 'dasein',
    sameDenominator: false,
  },
  {
    tool: 'Context Mode',
    claim: '98% reduction',
    claimDenominator: "bytes of raw tool output kept out of the context window, on the vendor's scenarios",
    claimSource: 'https://github.com/mksglu/context-mode',
    measured: '72% then 33% more expensive',
    measuredDenominator: 'workload cost, two runs',
    benchmark: 'stet',
    sameDenominator: false,
  },
  {
    tool: 'CodeGraph',
    claim: '44% cheaper',
    claimDenominator: 'cost on 7 repos, one architecture question each, Opus 4.8, median of 4 runs',
    claimSource: 'https://github.com/colbymchenry/codegraph',
    measured: '7.6% cheaper, interval crosses zero',
    measuredDenominator: 'end-to-end cost, 7 long tasks, 70 runs',
    benchmark: 'thol',
    sameDenominator: true,
  },
  {
    tool: 'lean-ctx',
    claim: '99.4% saving',
    claimDenominator: 'input-side cost on a replayed 72-turn session, not a live task',
    claimSource: 'https://github.com/yvgude/lean-ctx',
    measured: '10.3% more expensive, interval crosses zero',
    measuredDenominator: 'end-to-end cost, 7 long tasks, 70 runs',
    benchmark: 'thol',
    sameDenominator: false,
  },
  {
    tool: 'Edgee',
    claim: 'up to 70% off',
    claimDenominator: 'the token bill, combining routing, compression and visibility; no measurement stated',
    claimSource: 'https://github.com/edgee-ai/edgee',
    measured: '14.7% cheaper, interval crosses zero',
    measuredDenominator: 'end-to-end cost, 7 long tasks, 70 runs',
    benchmark: 'thol',
    sameDenominator: true,
  },
]

/** Where tool-result tokens come from in one measured workload (Marmelab, 9 baseline instances). */
export const TOOL_TOKEN_SHARE = [
  { tool: 'Read', sharePct: 90.6, tokensPerCall: 958 },
  { tool: 'Bash', sharePct: 6.4, tokensPerCall: 77 },
  { tool: 'Edit, Write, other', sharePct: 3.0, tokensPerCall: 50 },
]

export type CostBasis = 'billed' | 'estimated' | 'tokens only' | 'not applicable'

export interface Paper {
  id: string
  title: string
  authors: string
  date: string
  /** Finding as stated in the abstract, with its denominator. */
  finding: string
  costBasis: CostBasis
  /** True when the authors publish one of the compared methods or tools. */
  authorsPublishMethod: boolean
}

/** arXiv preprints read at their abstract pages on 2026-09-30. Not peer-reviewed unless stated. */
export const PAPERS: Paper[] = [
  { id: '2607.12161', title: 'Token Reduction Is Not Cost Reduction', authors: 'Weinberger, Hozez', date: '2026-07-13, v5 2026-08-12', finding: 'The largest compression setup cut delivered tool-output tokens by 38.4% and raised billed cost by 6.8%. Token reduction and cost reduction correlated weakly (Pearson r = 0.15).', costBasis: 'billed', authorsPublishMethod: false },
  { id: '2609.32961', title: 'Beyond Token Savings: A Systematic Study of Context Compression in LLM Agents', authors: 'Satish, Sinha, Kawada, Yadwadkar', date: '2026-09-26', finding: 'Nearly 35,000 agent runs on SWE-bench Verified and Terminal-Bench. On Terminal-Bench with Qwen, policies using about one third of the tokens took 20% to 80% longer than the uncompressed agent.', costBasis: 'estimated', authorsPublishMethod: false },
  { id: '2606.24083', title: 'CAVEWOMAN: How LLMs Behave Under Linguistic Input and Output Compression', authors: 'Adeyemi, Rossi, Dernoncourt', date: '2026-06-23', finding: 'Output compression cut realized cost 1.4x to 2.4x per model on most API models. Input compression raised net cost (about 1.15x on the five-benchmark mean). Single generations, not an agent loop.', costBasis: 'billed', authorsPublishMethod: false },
  { id: '2601.06007', title: "Don't Break the Cache: Prompt Caching for Long-Horizon Agentic Tasks", authors: 'Lumer, Nizar, Jangiti et al.', date: '2026-01-09, v2 2026-01-31', finding: 'Prompt caching reduced API costs by 41% to 80% and time to first token by 13% to 31% across providers, over 500 agent sessions.', costBasis: 'billed', authorsPublishMethod: false },
  { id: '2608.00101', title: 'Agentic Coding in the Wild: GitHub Copilot Traces at Production Scale', authors: 'Liu, Qiu, Goiri, Fonseca, Bianchini, Choukse', date: '2026-07-30', finding: 'June 2026 traces (3.2M users, 13M sessions, 761M LLM calls): cache hit rates average 90% within a turn and fall to 55% across turn boundaries.', costBasis: 'not applicable', authorsPublishMethod: false },
  { id: '2608.25399', title: 'Can your AI agent be cheaper? Task specifications and token spend', authors: 'Smekal', date: '2026-08-26', finding: 'Across 2,700 runs with Kimi K3, reducing a full task specification to a bare user story raised token spend by 29.7%.', costBasis: 'tokens only', authorsPublishMethod: false },
  { id: '2607.10569', title: 'When Does Restricting a Coding Agent to execute_code Help?', authors: 'Yang, Yu, Desell', date: '2026-07-12', finding: 'A code-only tool set was cheaper than or tied with the cheapest tool-rich arm in three of four cells; on SWE-bench with Claude it was 14.4% costlier, not significant. Pass rates tied.', costBasis: 'billed', authorsPublishMethod: false },
  { id: '2608.16370', title: 'What Does Context Compression Cost an Agent?', authors: 'Liu', date: '2026-08-17', finding: 'Completion stayed flat (80% to 85%, p = 1.0) while retrieval calls rose from 21.0 to 63.9 (p = .002): compression moved work into extra tool calls.', costBasis: 'not applicable', authorsPublishMethod: false },
  { id: '2601.14470', title: 'Tokenomics: Quantifying Where Tokens Are Used in Agentic Software Engineering', authors: 'Salim, Latendresse, Khatoonabadi, Shihab', date: '2026-01-20', finding: 'On 30 ChatDev tasks with GPT-5, the code review stage used 59.4% of tokens; input tokens were 53.9% of the total.', costBasis: 'tokens only', authorsPublishMethod: false },
  { id: '2509.23586', title: 'Reducing Cost of LLM Agents with Trajectory Reduction (AgentDiet)', authors: 'Xiao, Gao, Peng, Xiong', date: '2025-09-28, v2 2026-03-15', finding: 'Input tokens fell 39.9% to 59.7% and total computational cost 21.1% to 35.9% at the same agent performance.', costBasis: 'estimated', authorsPublishMethod: true },
  { id: '2607.02911', title: 'CoACT: Action-Preserving Observation Compression for Coding Agents', authors: 'Chen, Zhu, Zhang, Li', date: '2026-07-03', finding: 'Average total token consumption fell 33.0% on SWE-bench Verified with success close to the uncompressed agent. No dollar figure.', costBasis: 'tokens only', authorsPublishMethod: true },
  { id: '2601.16746', title: 'SWE-Pruner: Self-Adaptive Context Pruning for Coding Agents', authors: 'Wang, Shi, Yang et al.', date: '2026-01-23, v4 2026-05-07', finding: '23% to 54% token reduction on agent tasks such as SWE-bench Verified, with success rates the authors report as equal or better.', costBasis: 'tokens only', authorsPublishMethod: true },
  { id: '2607.01916', title: "ContextSniper: AntTrail's Token-Efficient Code Memory", authors: 'Luk, Najafi, Jia, Yang et al.', date: '2026-07-02, v6 2026-09-14', finding: 'For OpenClaw on SWE-bench Lite, total tokens fell 51.5% and logged cost 36.4%; resolution rates differ by one task out of 50.', costBasis: 'estimated', authorsPublishMethod: true },
  { id: '2609.22114', title: 'An Empirical Cost Attribution of Context-Compression Gateways in Multi-Turn Coding Agents', authors: 'Chen, Shi', date: 'v1 listed as 2026-08-19', finding: 'Content compression saved about 2% of the cache-priced prefix per turn; the authors say their single-shot benchmark must not be cited as a cost-saving argument.', costBasis: 'estimated', authorsPublishMethod: true },
  { id: '2608.24188', title: 'Paritok-4B: Intent-Conditioned Context Compression for Coding Agents', authors: 'Shi, Chen', date: '2026-08-25', finding: 'Compressed agent context to 25.7% of its size while retaining 86.5% of uncompressed single-shot solve quality on 300 SWE-bench Lite instances.', costBasis: 'estimated', authorsPublishMethod: true },
]
