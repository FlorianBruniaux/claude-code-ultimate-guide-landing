/**
 * MCP vs CLI Quiz Data
 * 6 questions x 4 options -> scoring weights -> 3 recommendations
 *
 * Scoring: each option distributes points to 1-3 results.
 * Normalization: score / maxPossible per result -> percentage.
 *
 * Results: mcp (MCP-First), cli (CLI-First), hybrid (Hybrid Workflow)
 */

export interface MCQOption {
  text: string
  scores: Partial<Record<string, number>>
}

export interface MCQQuestion {
  id: number
  dimension: string
  question: string
  options: [MCQOption, MCQOption, MCQOption, MCQOption]
}

export interface MCQResultDef {
  resultId: string
  title: string
  icon: string
  description: string
  tips: string[]
  guideLink: string
}

export const MCQ_QUESTIONS: MCQQuestion[] = [
  {
    id: 1,
    dimension: 'user-type',
    question: 'Who will use the AI-powered tools you are setting up?',
    options: [
      { text: 'Non-technical users via a chat interface, no terminal access', scores: { mcp: 3, hybrid: 1 } },
      { text: 'Developers on my team, comfortable with CLIs', scores: { cli: 2, hybrid: 1 } },
      { text: 'A mix: technical and non-technical users in the same org', scores: { hybrid: 3, mcp: 1 } },
      { text: 'Just me, solo developer', scores: { cli: 3 } },
    ],
  },
  {
    id: 2,
    dimension: 'auth-model',
    question: 'How do the external services you connect to handle authentication?',
    options: [
      { text: 'OAuth with browser redirects (Google, Slack, Notion, Figma)', scores: { mcp: 3, hybrid: 1 } },
      { text: 'API keys or tokens in environment variables', scores: { cli: 3, hybrid: 1 } },
      { text: 'A mix: some OAuth, some API key', scores: { hybrid: 3, mcp: 1, cli: 1 } },
      { text: 'Mostly local tools: git, file system, test runners', scores: { cli: 3 } },
    ],
  },
  {
    id: 3,
    dimension: 'model-tier',
    question: 'Which AI model typically drives your tools?',
    options: [
      { text: 'Frontier: Claude Opus or Sonnet 4.x', scores: { cli: 3, hybrid: 1 } },
      { text: 'Mid-tier: Haiku, GPT-4.1, Gemini Flash', scores: { hybrid: 2, mcp: 1, cli: 1 } },
      { text: 'Smaller or local: Qwen, Mistral, Ollama', scores: { mcp: 3, hybrid: 1 } },
      { text: 'I switch between models depending on the task', scores: { hybrid: 3, mcp: 1, cli: 1 } },
    ],
  },
  {
    id: 4,
    dimension: 'observability',
    question: 'Does your organization need to track and report on AI tool usage?',
    options: [
      { text: 'Yes: compliance, ROI dashboards, or C-level attribution required', scores: { mcp: 3, hybrid: 1 } },
      { text: 'Nice-to-have but not a hard requirement', scores: { hybrid: 3, mcp: 1, cli: 1 } },
      { text: 'No, it just needs to work', scores: { cli: 3, hybrid: 1 } },
      { text: 'We have separate monitoring, not tied to individual AI calls', scores: { cli: 2, hybrid: 2 } },
    ],
  },
  {
    id: 5,
    dimension: 'cli-landscape',
    question: 'For the external services you use most, are mature CLI tools available?',
    options: [
      { text: 'Yes: gh, glab, kubectl, aws-cli, docker, terraform', scores: { cli: 3, hybrid: 1 } },
      { text: 'Some services have CLIs, others only expose APIs', scores: { hybrid: 3, mcp: 1, cli: 1 } },
      { text: 'Mostly API-only SaaS: Slack, Notion, Salesforce, Linear', scores: { mcp: 3, hybrid: 1 } },
      { text: 'Mostly git, file system, and test runners', scores: { cli: 3 } },
    ],
  },
  {
    id: 6,
    dimension: 'team-scale',
    question: 'How many people need the same tool integrations?',
    options: [
      { text: 'Large team: 10+ people who need consistent access', scores: { mcp: 3, hybrid: 2 } },
      { text: 'Small team: 2 to 5 people', scores: { hybrid: 3, cli: 2, mcp: 1 } },
      { text: 'Just me', scores: { cli: 3, hybrid: 1 } },
      { text: 'Multiple teams with different needs', scores: { hybrid: 3, mcp: 2 } },
    ],
  },
]

export const MCQ_RESULTS: MCQResultDef[] = [
  {
    resultId: 'mcp',
    title: 'MCP-First',
    icon: '🔌',
    description: 'Your context favors MCP servers: OAuth-required services, non-technical users, or enterprise observability requirements. MCP handles auth, provides structured tool interfaces, and enables centralized logging that local CLI calls cannot replicate.',
    tips: [
      'Start with OAuth-required services: Slack, Notion, Google Drive, Figma',
      'Enable lazy loading (v2.1.7+): reduces schema overhead by ~85%',
      'Wrap CLIs in skills for non-technical users who cannot use a terminal',
      'Monitor token cost per session to track which schemas load on demand',
    ],
    guideLink: '/guide/mcp-vs-cli/#mcp-strengths',
  },
  {
    resultId: 'cli',
    title: 'CLI-First',
    icon: '⚡',
    description: 'Your context favors CLI tools: frontier models, developer users, and mature CLIs for your services. A frontier model like Claude Sonnet 4.x drives gh, glab, or kubectl as well as a structured schema would, without the overhead.',
    tips: [
      'Use official CLIs directly: gh for GitHub, glab for GitLab, kubectl, aws-cli',
      'Wrap frequently-used CLI patterns in skills for reproducible workflows',
      'Add MCP only where CLI does not exist: Sentry, Linear, Context7',
      'RTK (Rust Token Killer) filters verbose CLI output before it reaches context',
    ],
    guideLink: '/guide/mcp-vs-cli/#cli-strengths',
  },
  {
    resultId: 'hybrid',
    title: 'Hybrid Workflow',
    icon: '⚖️',
    description: 'Your context calls for both. Route the inner loop through CLI: git, test runners, file ops, deterministic local operations. Route the outer loop through MCP: OAuth services, shared infrastructure, enterprise observability. Skills bridge the two layers.',
    tips: [
      'Inner loop (git, tests, file ops): CLI for speed and determinism',
      'Outer loop (OAuth services, shared infra): MCP Remote for observability',
      'Skills wrap CLIs so non-technical users get transparent access',
      'Match each layer to the tool that fits it, not one answer for both',
    ],
    guideLink: '/guide/mcp-vs-cli/#the-hybrid-is-the-default',
  },
]

export function computeMCQMaxPossible(): Record<string, number> {
  const maxPossible: Record<string, number> = {}

  for (const question of MCQ_QUESTIONS) {
    const maxPerResult: Record<string, number> = {}
    for (const option of question.options) {
      for (const [resultId, pts] of Object.entries(option.scores)) {
        if (pts === undefined) continue
        if (!maxPerResult[resultId] || pts > maxPerResult[resultId]) {
          maxPerResult[resultId] = pts
        }
      }
    }
    for (const [resultId, pts] of Object.entries(maxPerResult)) {
      maxPossible[resultId] = (maxPossible[resultId] ?? 0) + pts
    }
  }

  return maxPossible
}
