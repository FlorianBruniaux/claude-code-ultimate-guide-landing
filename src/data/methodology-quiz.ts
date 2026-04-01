/**
 * Methodology Quiz Data
 * 12 questions × 4 options → scoring weights → top 3 stack recommendations
 *
 * Scoring: each option distributes points to 2–4 stacks (1–3 pts each).
 * Normalization: score / maxPossible per stack → percentage.
 *
 * Stacks (not individual methodologies): predefined combos of 2-3 methods
 * that work together coherently.
 */

export interface MQOption {
  text: string
  scores: Partial<Record<string, number>> // stackId → points (1–3)
}

export interface MQQuestion {
  id: number
  dimension: string
  question: string
  options: [MQOption, MQOption, MQOption, MQOption]
}

export interface StackExplanation {
  stackId: string
  title: string
  icon: string
  methodologies: string[]
  description: string
  quickStart: string
  guideLink: string
}

export const MQ_QUESTIONS: MQQuestion[] = [
  {
    id: 1,
    dimension: 'team-shape',
    question: 'How many people touch the codebase you work on most?',
    options: [
      {
        text: 'Just me, I own the whole thing',
        scores: { 'solo-mvp': 3, 'power-solo': 3, 'plan-moderate': 1 },
      },
      {
        text: 'A small team (2–5 devs), we know each other\'s code',
        scores: { 'solo-mvp': 2, 'team-greenfield': 2, 'plan-moderate': 2 },
      },
      {
        text: 'A cross-functional team (5–10) with distinct areas',
        scores: { 'team-greenfield': 3, 'microservices': 2, 'brownfield-saas': 1 },
      },
      {
        text: 'Multiple teams (10+), I rarely see the full picture',
        scores: { 'enterprise-gov': 2, 'microservices': 2, 'brownfield-saas': 2 },
      },
    ],
  },
  {
    id: 2,
    dimension: 'project-stage',
    question: 'What best describes the project you spend most time on?',
    options: [
      {
        text: 'Greenfield, building from scratch, no legacy constraints',
        scores: { 'solo-mvp': 3, 'team-greenfield': 3, 'plan-moderate': 1 },
      },
      {
        text: 'Growing, a working product that needs new features fast',
        scores: { 'brownfield-saas': 2, 'plan-moderate': 2, 'power-solo': 2 },
      },
      {
        text: 'Mature, 100+ features, stability and regressions are the real enemy',
        scores: { 'brownfield-saas': 3, 'enterprise-gov': 2, 'microservices': 1 },
      },
      {
        text: 'Experimental, prototyping ideas, most code gets thrown away',
        scores: { 'power-solo': 3, 'llm-native': 2, 'solo-mvp': 1 },
      },
    ],
  },
  {
    id: 3,
    dimension: 'spec-vs-code',
    question: 'Before writing code for a complex feature, what do you do first?',
    options: [
      {
        text: 'Write a spec or design doc, I want a contract before implementation',
        scores: { 'plan-moderate': 3, 'team-greenfield': 2, 'enterprise-gov': 2 },
      },
      {
        text: 'Write a failing test, the test IS my spec',
        scores: { 'solo-mvp': 3, 'power-solo': 2, 'microservices': 1 },
      },
      {
        text: 'Sketch the API contract or interface first, then build behind it',
        scores: { 'microservices': 3, 'enterprise-gov': 1, 'llm-native': 1 },
      },
      {
        text: 'Start coding and let the design emerge through iteration',
        scores: { 'power-solo': 3, 'llm-native': 2 },
      },
    ],
  },
  {
    id: 4,
    dimension: 'governance-need',
    question: 'How much structure do you want around AI-generated code?',
    options: [
      {
        text: 'Minimal, I review the output myself and move on',
        scores: { 'power-solo': 3, 'solo-mvp': 2 },
      },
      {
        text: 'Light, a spec file and tests are enough guardrails',
        scores: { 'solo-mvp': 2, 'plan-moderate': 3, 'team-greenfield': 1 },
      },
      {
        text: 'Moderate, I want acceptance criteria and behavior specs before coding starts',
        scores: { 'team-greenfield': 3, 'brownfield-saas': 2, 'microservices': 1 },
      },
      {
        text: 'Heavy, constitution files, agent roles, approval gates',
        scores: { 'enterprise-gov': 3, 'llm-native': 1, 'brownfield-saas': 1 },
      },
    ],
  },
  {
    id: 5,
    dimension: 'api-contracts',
    question: 'How do different parts of your system communicate?',
    options: [
      {
        text: 'It\'s one app, no service boundaries to worry about',
        scores: { 'solo-mvp': 2, 'power-solo': 2, 'plan-moderate': 2 },
      },
      {
        text: 'A few internal APIs, but contracts are informal',
        scores: { 'team-greenfield': 2, 'brownfield-saas': 2, 'plan-moderate': 1 },
      },
      {
        text: 'Microservices with explicit API contracts (OpenAPI, gRPC, etc.)',
        scores: { 'microservices': 3, 'enterprise-gov': 2, 'brownfield-saas': 1 },
      },
      {
        text: 'AI agents calling other AI agents or external LLM APIs',
        scores: { 'llm-native': 3, 'microservices': 1, 'enterprise-gov': 1 },
      },
    ],
  },
  {
    id: 6,
    dimension: 'iteration-speed',
    question: 'How often do you ship changes to production?',
    options: [
      {
        text: 'Multiple times a day, fast, autonomous, no ceremony',
        scores: { 'power-solo': 3, 'solo-mvp': 2, 'llm-native': 1 },
      },
      {
        text: 'A few times a week, with code review',
        scores: { 'team-greenfield': 2, 'plan-moderate': 2, 'brownfield-saas': 1 },
      },
      {
        text: 'Weekly or biweekly, with formal QA',
        scores: { 'brownfield-saas': 3, 'microservices': 2, 'enterprise-gov': 1 },
      },
      {
        text: 'Longer cycles, release trains or approval gates',
        scores: { 'enterprise-gov': 3, 'microservices': 1, 'brownfield-saas': 1 },
      },
    ],
  },
  {
    id: 7,
    dimension: 'stakeholder-involvement',
    question: 'Who decides what "done" looks like for a feature?',
    options: [
      {
        text: 'Me, I define requirements and acceptance criteria myself',
        scores: { 'solo-mvp': 3, 'power-solo': 3 },
      },
      {
        text: 'The dev team, we discuss and agree on scope internally',
        scores: { 'plan-moderate': 2, 'team-greenfield': 2, 'microservices': 1 },
      },
      {
        text: 'Dev + product/business, we write user stories together',
        scores: { 'team-greenfield': 3, 'brownfield-saas': 2, 'enterprise-gov': 1 },
      },
      {
        text: 'Three Amigos (business, dev, test), formal acceptance before coding starts',
        scores: { 'enterprise-gov': 3, 'brownfield-saas': 2, 'team-greenfield': 1 },
      },
    ],
  },
  {
    id: 8,
    dimension: 'session-style',
    question: 'What does a typical Claude Code session look like for you?',
    options: [
      {
        text: 'Short bursts: fix a bug, add a small feature, 15–30 minutes',
        scores: { 'solo-mvp': 2, 'plan-moderate': 1, 'brownfield-saas': 2 },
      },
      {
        text: 'Focused sessions: one feature at a time, 1–2 hours with plan mode',
        scores: { 'plan-moderate': 3, 'team-greenfield': 2, 'solo-mvp': 1 },
      },
      {
        text: 'Long autonomous runs: set up context, let Claude work through a big task',
        scores: { 'power-solo': 3, 'llm-native': 2, 'enterprise-gov': 1 },
      },
      {
        text: 'Multi-agent sessions: I orchestrate sub-agents for different parts',
        scores: { 'llm-native': 3, 'enterprise-gov': 2, 'power-solo': 1 },
      },
    ],
  },
  {
    id: 9,
    dimension: 'test-maturity',
    question: 'What is the current state of tests in your project?',
    options: [
      {
        text: 'Almost none, I rely on manual testing and careful code review',
        scores: { 'power-solo': 2, 'solo-mvp': 2, 'plan-moderate': 1 },
      },
      {
        text: 'Some unit tests on critical paths, but coverage is patchy',
        scores: { 'solo-mvp': 2, 'brownfield-saas': 2, 'plan-moderate': 2 },
      },
      {
        text: 'Good coverage: unit + integration, CI runs on every PR',
        scores: { 'team-greenfield': 2, 'microservices': 2, 'brownfield-saas': 2, 'enterprise-gov': 1 },
      },
      {
        text: 'Comprehensive: unit, integration, e2e, and eval suites for AI outputs',
        scores: { 'enterprise-gov': 2, 'llm-native': 3, 'microservices': 2 },
      },
    ],
  },
  {
    id: 10,
    dimension: 'pain-point',
    question: 'What slows you down the most right now?',
    options: [
      {
        text: 'Regressions, changes in one place break things elsewhere',
        scores: { 'brownfield-saas': 3, 'microservices': 2, 'team-greenfield': 1 },
      },
      {
        text: 'Context rot, Claude loses track of what we\'re building in long sessions',
        scores: { 'power-solo': 3, 'plan-moderate': 2, 'llm-native': 1 },
      },
      {
        text: 'Unclear requirements, I build the wrong thing, then have to redo it',
        scores: { 'team-greenfield': 3, 'enterprise-gov': 2, 'plan-moderate': 1 },
      },
      {
        text: 'No traceability, hard to know which spec led to which code',
        scores: { 'enterprise-gov': 3, 'brownfield-saas': 1, 'microservices': 1 },
      },
    ],
  },
  {
    id: 11,
    dimension: 'setup-tolerance',
    question: 'How much initial setup are you willing to invest before writing code?',
    options: [
      {
        text: 'Zero, just CLAUDE.md and go',
        scores: { 'power-solo': 3, 'solo-mvp': 1 },
      },
      {
        text: 'Light, a spec file and a test harness, 30 minutes max',
        scores: { 'solo-mvp': 3, 'plan-moderate': 2, 'brownfield-saas': 1 },
      },
      {
        text: 'Moderate, spec kit setup, BDD framework, CI pipeline, half a day',
        scores: { 'team-greenfield': 3, 'microservices': 2, 'brownfield-saas': 1 },
      },
      {
        text: 'Heavy, constitution, agent roles, contract infrastructure, whatever it takes',
        scores: { 'enterprise-gov': 3, 'llm-native': 2 },
      },
    ],
  },
  {
    id: 12,
    dimension: 'codebase-scale',
    question: 'How large is the codebase you work with?',
    options: [
      {
        text: 'Small, under 10 files, one person can hold it all in their head',
        scores: { 'solo-mvp': 3, 'power-solo': 2 },
      },
      {
        text: 'Medium, 10–50 files, sectioned but manageable',
        scores: { 'plan-moderate': 3, 'solo-mvp': 1, 'team-greenfield': 1 },
      },
      {
        text: 'Large, 50+ files, needs domain-specific context loading',
        scores: { 'team-greenfield': 2, 'brownfield-saas': 3, 'microservices': 2 },
      },
      {
        text: 'Massive, multiple repos, service boundaries, 100K+ LoC',
        scores: { 'enterprise-gov': 3, 'microservices': 2, 'llm-native': 1 },
      },
    ],
  },
]

export const STACK_EXPLANATIONS: StackExplanation[] = [
  {
    stackId: 'solo-mvp',
    title: 'Solo MVP Builder',
    icon: '🚀',
    methodologies: ['SDD', 'TDD'],
    description:
      'Minimal overhead, maximum quality. Write a short spec in CLAUDE.md, then TDD your way to a working MVP. The spec prevents scope creep; the tests prevent regressions. Natural fit for solo developers who want to ship fast without cutting corners.',
    quickStart:
      'Create a CLAUDE.md with your feature spec, then: "Write failing tests for this spec, then implement until they pass."',
    guideLink: '/guide/methodologies/#combination-patterns',
  },
  {
    stackId: 'team-greenfield',
    title: 'Team Greenfield',
    icon: '🏗️',
    methodologies: ['Spec Kit', 'TDD', 'BDD'],
    description:
      'Governance meets collaboration. Spec Kit gives you a constitution and structured requirements. BDD scenarios let product and dev speak the same language. TDD ensures every behavior is tested. The investment pays off from day one on team projects.',
    quickStart:
      'Run /speckit.constitution to set guardrails, write Given/When/Then scenarios with your PM, then TDD each scenario.',
    guideLink: '/guide/methodologies/#combination-patterns',
  },
  {
    stackId: 'microservices',
    title: 'API Contract Stack',
    icon: '🔗',
    methodologies: ['CDD', 'Specmatic', 'TDD'],
    description:
      'Contract-first, parallel development. Define your OpenAPI specs before writing a line of code. Specmatic auto-generates tests and stubs from those contracts, so teams can develop independently without integration surprises. TDD handles the implementation behind each contract.',
    quickStart:
      'Write your OpenAPI spec first, run Specmatic to generate contract tests and stubs, then TDD the implementation behind each endpoint.',
    guideLink: '/guide/methodologies/#sdd-tools-reference',
  },
  {
    stackId: 'brownfield-saas',
    title: 'Existing Product Evolution',
    icon: '🔄',
    methodologies: ['OpenSpec', 'BDD', 'JiTTesting'],
    description:
      'Evolve without breaking. OpenSpec tracks what exists and what is changing, so specs never drift from reality. BDD scenarios document expected behavior for stakeholders. JiTTesting catches regressions at PR time without growing your test suite forever.',
    quickStart:
      'Set up OpenSpec to capture current specs, write BDD scenarios for the feature you are changing, and add a pre-merge prompt: "Generate tests that catch regressions in this diff."',
    guideLink: '/guide/methodologies/#combination-patterns',
  },
  {
    stackId: 'enterprise-gov',
    title: 'Enterprise Governance',
    icon: '🏛️',
    methodologies: ['BMAD', 'Spec Kit', 'Specmatic'],
    description:
      'Full governance for high-complexity projects. BMAD provides the constitution and multi-agent orchestration. Spec Kit structures requirements across teams. Specmatic enforces API contracts between services. High setup cost, but traceability and compliance are real. Note: BMAD requires stable requirements — it becomes a liability when specs change frequently mid-project.',
    quickStart:
      'Start with BMAD constitution.md, define agent roles for your workflow, set up Spec Kit for requirements, and Specmatic for API contract testing.',
    guideLink: '/guide/methodologies/#combination-patterns',
  },
  {
    stackId: 'llm-native',
    title: 'AI Product Builder',
    icon: '🤖',
    methodologies: ['Eval-Driven', 'Multi-Agent'],
    description:
      'TDD for AI outputs. When your product surfaces LLM responses to users, traditional tests are not enough. Eval-driven development gives you measurable quality gates for non-deterministic outputs. Multi-agent orchestration lets you build systems where specialized agents collaborate on complex tasks.',
    quickStart:
      'Define eval criteria for your AI outputs (accuracy, safety, format), build an eval harness, then iterate until evals pass consistently.',
    guideLink: '/guide/methodologies/#the-15-methodologies',
  },
  {
    stackId: 'power-solo',
    title: 'Power User Loop',
    icon: '⚡',
    methodologies: ['TDD', 'Ralph Loop', 'Iterative Loops'],
    description:
      'Autonomous iteration for experienced Claude users. TDD anchors quality. The Ralph Loop spawns fresh contexts per task so context rot never accumulates. Iterative loops let Claude converge autonomously on complex work. Minimal ceremony, maximum throughput.',
    quickStart:
      'Set up a CLAUDE.md with your test command, use fresh context per task (git + progress files), and prompt: "Keep iterating until all tests pass and lint is clean."',
    guideLink: '/guide/methodologies/#the-15-methodologies',
  },
  {
    stackId: 'plan-moderate',
    title: 'Structured Planner',
    icon: '📋',
    methodologies: ['Plan-First', 'SDD', 'Context Engineering'],
    description:
      'Think before you code, but do not over-engineer. Plan Mode forces exploration before execution. SDD captures the plan as a spec. Context Engineering ensures Claude has exactly the right information at each step. The sweet spot between ad-hoc coding and heavy governance.',
    quickStart:
      'Start every complex task in Plan Mode (Shift+Tab), validate the plan, write the spec in CLAUDE.md, then execute with progressive context loading.',
    guideLink: '/guide/methodologies/#the-15-methodologies',
  },
]

/**
 * Compute max possible score for each stack across all questions.
 * Used for normalization: percentage = rawScore / maxPossible * 100
 */
export function computeStackMaxPossible(): Record<string, number> {
  const maxPossible: Record<string, number> = {}

  for (const question of MQ_QUESTIONS) {
    const maxPerStack: Record<string, number> = {}
    for (const option of question.options) {
      for (const [stackId, pts] of Object.entries(option.scores)) {
        if (pts === undefined) continue
        if (!maxPerStack[stackId] || pts > maxPerStack[stackId]) {
          maxPerStack[stackId] = pts
        }
      }
    }
    for (const [stackId, pts] of Object.entries(maxPerStack)) {
      maxPossible[stackId] = (maxPossible[stackId] ?? 0) + pts
    }
  }

  return maxPossible
}
