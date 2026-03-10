/**
 * Role Personality Quiz Data
 * 12 questions × 4 options → scoring weights → top 3 role recommendations
 *
 * Scoring: each option distributes points to 2–4 roles (1–3 pts each).
 * Normalization: score / maxPossible per role → percentage.
 */

export interface RoleQuizOption {
  text: string
  scores: Partial<Record<string, number>> // roleId → points (1–3)
}

export interface RoleQuizQuestion {
  id: number
  dimension: string
  question: string
  options: [RoleQuizOption, RoleQuizOption, RoleQuizOption, RoleQuizOption]
}

export interface RoleResultExplanation {
  roleId: string
  explanation: string
}

export const ROLE_QUIZ_QUESTIONS: RoleQuizQuestion[] = [
  {
    id: 1,
    dimension: 'ship-vs-research',
    question: 'Which outcome gives you the most satisfaction at the end of a work week?',
    options: [
      {
        text: 'Shipped something users can interact with today',
        scores: { 'ai-engineer': 3, 'founding-ai-engineer': 2, 'ai-agent-engineer': 2 },
      },
      {
        text: 'Understood deeply how a model or algorithm actually works',
        scores: { 'llm-engineer': 3, 'ml-engineer': 2, 'ai-safety-eval-engineer': 2 },
      },
      {
        text: 'Built infrastructure that will accelerate the whole team',
        scores: { 'platform-engineer': 3, 'harness-engineer': 2, 'ai-architect': 2 },
      },
      {
        text: 'Defined what should be built and convinced stakeholders',
        scores: { 'ai-product-manager': 3, 'ai-architect': 1, 'founding-ai-engineer': 1 },
      },
    ],
  },
  {
    id: 2,
    dimension: 'breadth-vs-depth',
    question: 'How do you prefer to develop your expertise?',
    options: [
      {
        text: 'Go broad: pick up many domains and connect the dots',
        scores: { 'ai-engineer': 3, 'founding-ai-engineer': 2, 'ai-agent-engineer': 1 },
      },
      {
        text: 'Go deep: master one area completely',
        scores: { 'llm-engineer': 3, 'ml-engineer': 3, 'ai-safety-eval-engineer': 1 },
      },
      {
        text: 'Build foundations: deep enough that others rely on what you create',
        scores: { 'ai-architect': 3, 'platform-engineer': 2, 'harness-engineer': 2 },
      },
      {
        text: 'Synthesize: understand enough of each domain to make good calls',
        scores: { 'ai-product-manager': 3, 'context-engineer': 2, 'prompt-engineer': 2 },
      },
    ],
  },
  {
    id: 3,
    dimension: 'systems-vs-features',
    question: 'Which type of problem excites you most?',
    options: [
      {
        text: 'Making AI produce better outputs for a specific use case',
        scores: { 'prompt-engineer': 3, 'context-engineer': 2, 'llm-engineer': 1 },
      },
      {
        text: 'Building systems that give AI the right context and memory',
        scores: { 'context-engineer': 3, 'harness-engineer': 2, 'ai-agent-engineer': 1 },
      },
      {
        text: 'Shipping end-to-end AI-powered applications',
        scores: { 'ai-engineer': 3, 'ai-agent-engineer': 2, 'founding-ai-engineer': 2 },
      },
      {
        text: 'Designing the platform that all AI teams build on',
        scores: { 'platform-engineer': 3, 'ai-architect': 3, 'harness-engineer': 1 },
      },
    ],
  },
  {
    id: 4,
    dimension: 'determinism-tolerance',
    question: 'AI systems produce different outputs for the same input. How do you feel about that?',
    options: [
      {
        text: 'I embrace it and design agents that plan around it',
        scores: { 'ai-agent-engineer': 3, 'founding-ai-engineer': 1 },
      },
      {
        text: 'I accept it and build evals to measure and control quality',
        scores: { 'ai-safety-eval-engineer': 3, 'ai-product-manager': 2, 'llm-engineer': 2 },
      },
      {
        text: 'I contain it. I build architectural constraints so variance stays bounded',
        scores: { 'harness-engineer': 3, 'platform-engineer': 2, 'context-engineer': 1 },
      },
      {
        text: 'I minimize it. I prefer deterministic systems when possible',
        scores: { 'ml-engineer': 3, 'platform-engineer': 1, 'context-engineer': 2 },
      },
    ],
  },
  {
    id: 5,
    dimension: 'communication-style',
    question: 'In a cross-functional meeting, which role do you naturally take?',
    options: [
      {
        text: 'Translating between technical and product, bridging both worlds',
        scores: { 'ai-product-manager': 3, 'founding-ai-engineer': 2, 'ai-agent-engineer': 1 },
      },
      {
        text: 'Diving into implementation details with engineers',
        scores: { 'llm-engineer': 3, 'ml-engineer': 2, 'harness-engineer': 1 },
      },
      {
        text: 'Defining architecture and driving technical decisions',
        scores: { 'ai-architect': 3, 'platform-engineer': 2, 'harness-engineer': 1 },
      },
      {
        text: 'Explaining what AI can and cannot do to the team',
        scores: { 'prompt-engineer': 3, 'context-engineer': 2, 'ai-safety-eval-engineer': 1 },
      },
    ],
  },
  {
    id: 6,
    dimension: 'risk-posture',
    question: 'When facing a risky technical decision with incomplete information, what do you do?',
    options: [
      {
        text: 'Ship a prototype fast, learn from real usage',
        scores: { 'founding-ai-engineer': 3, 'ai-engineer': 2, 'ai-agent-engineer': 1 },
      },
      {
        text: 'Build safeguards first (constraints, monitors, rollback) then ship',
        scores: { 'harness-engineer': 3, 'platform-engineer': 2, 'ai-safety-eval-engineer': 2 },
      },
      {
        text: 'Research thoroughly, understand the risk before acting',
        scores: { 'llm-engineer': 3, 'ml-engineer': 2, 'ai-safety-eval-engineer': 1 },
      },
      {
        text: 'Align stakeholders and document trade-offs before committing',
        scores: { 'ai-architect': 3, 'ai-product-manager': 2 },
      },
    ],
  },
  {
    id: 7,
    dimension: 'ownership-scope',
    question: 'What scope of ownership feels most natural to you?',
    options: [
      {
        text: 'Everything: code, product, roadmap, customer calls',
        scores: { 'founding-ai-engineer': 3, 'ai-product-manager': 1 },
      },
      {
        text: 'A critical system: deep ownership of a platform or infrastructure layer',
        scores: { 'platform-engineer': 3, 'harness-engineer': 2, 'llm-engineer': 1 },
      },
      {
        text: 'A feature stream: end-to-end on a product area, across teams',
        scores: { 'ai-engineer': 3, 'context-engineer': 2, 'ai-agent-engineer': 2 },
      },
      {
        text: 'The architecture: set standards and patterns the whole org follows',
        scores: { 'ai-architect': 3, 'platform-engineer': 1, 'harness-engineer': 1 },
      },
    ],
  },
  {
    id: 8,
    dimension: 'data-orientation',
    question: 'What is your relationship with data?',
    options: [
      {
        text: 'I live in it: training sets, feature distributions, model metrics',
        scores: { 'ml-engineer': 3, 'llm-engineer': 2, 'ai-safety-eval-engineer': 1 },
      },
      {
        text: 'I shape it: curating context, prompts, and knowledge bases',
        scores: { 'context-engineer': 3, 'prompt-engineer': 2, 'llm-engineer': 1 },
      },
      {
        text: 'I measure with it: structured evals that prove system quality',
        scores: { 'ai-safety-eval-engineer': 3, 'ai-product-manager': 2, 'ai-engineer': 1 },
      },
      {
        text: 'I orchestrate around it. Data is an input; I focus on the system',
        scores: { 'ai-engineer': 3, 'platform-engineer': 2, 'founding-ai-engineer': 2, 'ai-agent-engineer': 1 },
      },
    ],
  },
  {
    id: 9,
    dimension: 'writing-vs-building',
    question: 'On a typical day, which activity would you prefer?',
    options: [
      {
        text: 'Writing and testing prompts, iterating until outputs are reliable',
        scores: { 'prompt-engineer': 3, 'context-engineer': 1, 'ai-safety-eval-engineer': 1 },
      },
      {
        text: 'Designing retrieval pipelines and knowledge architectures',
        scores: { 'context-engineer': 3, 'llm-engineer': 2, 'harness-engineer': 1 },
      },
      {
        text: 'Coding features, debugging APIs, reviewing pull requests',
        scores: { 'ai-engineer': 3, 'ai-agent-engineer': 2, 'founding-ai-engineer': 2 },
      },
      {
        text: 'Building infra: CI/CD, monitoring, auto-scaling, cost dashboards',
        scores: { 'platform-engineer': 3, 'ml-engineer': 2, 'harness-engineer': 2 },
      },
    ],
  },
  {
    id: 10,
    dimension: 'debugging-mindset',
    question: 'When something breaks unexpectedly in production, what do you do first?',
    options: [
      {
        text: 'Trace every step to understand exactly where and why it failed',
        scores: { 'harness-engineer': 3, 'ai-safety-eval-engineer': 2, 'ml-engineer': 1 },
      },
      {
        text: 'Form a quick hypothesis and run a targeted test to validate it',
        scores: { 'ai-engineer': 3, 'founding-ai-engineer': 2, 'ai-agent-engineer': 2 },
      },
      {
        text: 'Reproduce it reliably first, then isolate variables methodically',
        scores: { 'ml-engineer': 3, 'llm-engineer': 2, 'platform-engineer': 1 },
      },
      {
        text: 'Understand user impact, then communicate while you investigate',
        scores: { 'ai-product-manager': 3, 'context-engineer': 2, 'ai-architect': 1 },
      },
    ],
  },
  {
    id: 11,
    dimension: 'stage-preference',
    question: 'Which work environment energizes you most?',
    options: [
      {
        text: 'Zero to one: building something from scratch with no blueprint',
        scores: { 'founding-ai-engineer': 3, 'ai-engineer': 2, 'ai-agent-engineer': 1 },
      },
      {
        text: 'Growth phase: take what works and make it reliable at scale',
        scores: { 'platform-engineer': 3, 'ai-architect': 2, 'ml-engineer': 1 },
      },
      {
        text: 'Mature systems: establish governance, standards, long-term stability',
        scores: { 'ai-architect': 3, 'harness-engineer': 2, 'platform-engineer': 1 },
      },
      {
        text: 'Research-adjacent: always pushing what AI can actually do',
        scores: { 'llm-engineer': 3, 'ml-engineer': 2, 'ai-safety-eval-engineer': 2 },
      },
    ],
  },
  {
    id: 12,
    dimension: 'quality-definition',
    question: 'When you think "this AI system is high quality," what do you mean?',
    options: [
      {
        text: 'It is safe: no harmful outputs, adversarially tested, behavior audited',
        scores: { 'ai-safety-eval-engineer': 3, 'harness-engineer': 2, 'platform-engineer': 1 },
      },
      {
        text: 'It ships reliably: monitored, measurable, iterating on real feedback',
        scores: { 'ai-engineer': 3, 'founding-ai-engineer': 2, 'ai-product-manager': 1 },
      },
      {
        text: 'It scales cleanly: no single point of failure, cost under control',
        scores: { 'platform-engineer': 3, 'ai-architect': 2, 'ml-engineer': 1 },
      },
      {
        text: 'Users love it: solves the right problem, the right way',
        scores: { 'ai-product-manager': 3, 'prompt-engineer': 2, 'context-engineer': 2 },
      },
    ],
  },
]

export const ROLE_EXPLANATIONS: RoleResultExplanation[] = [
  {
    roleId: 'prompt-engineer',
    explanation:
      'You think in instructions and outputs. Your goal is to get the best from existing models through precise, reliable prompts, with the patience to iterate systematically until quality is consistent.',
  },
  {
    roleId: 'context-engineer',
    explanation:
      'You believe AI is only as good as the context it receives. You design knowledge architectures, retrieval systems, and context pipelines that give models exactly what they need, when they need it.',
  },
  {
    roleId: 'ai-engineer',
    explanation:
      'You ship AI-powered products end to end. Broad enough to own the full stack, pragmatic enough to move fast. You bridge model capabilities and real user value without getting lost in the model layer.',
  },
  {
    roleId: 'llm-engineer',
    explanation:
      'You want to go deep on how models actually work. Fine-tuning, evals, training infrastructure: you want mastery of the model layer itself, not just the API surface everyone else uses.',
  },
  {
    roleId: 'ai-agent-engineer',
    explanation:
      'You design autonomous systems that plan, reason, and execute multi-step tasks. Non-determinism is not a problem you avoid; it is the core engineering challenge you are here to solve.',
  },
  {
    roleId: 'founding-ai-engineer',
    explanation:
      'You want to own everything: architecture, product, roadmap, customer relationships. You thrive in early-stage environments where there is no playbook and every decision is yours to make.',
  },
  {
    roleId: 'ai-architect',
    explanation:
      'You think in systems and standards. You want to set the technical vision, make the hard trade-offs, and define the reference architectures that entire organizations build on for years.',
  },
  {
    roleId: 'platform-engineer',
    explanation:
      'You build the infrastructure that makes AI development reliable and consistent for everyone else. If other teams\' productivity depends on your work, that is exactly the kind of leverage you want.',
  },
  {
    roleId: 'harness-engineer',
    explanation:
      'You see AI agents as systems that need control structures, not just guardrails. You build the architectural constraints (watchdogs, linters, entropy detection) that keep autonomous behavior within safe bounds.',
  },
  {
    roleId: 'ai-product-manager',
    explanation:
      'You bridge product and AI, owning quality in systems that are inherently non-deterministic. You define what should be built, translate between stakeholders, and drive the product decisions no one else can.',
  },
  {
    roleId: 'ai-safety-eval-engineer',
    explanation:
      'You believe AI systems must be proven safe before they ship at scale. You build eval pipelines, red-team models, and create the measurement frameworks that the entire organization relies on to trust its AI.',
  },
  {
    roleId: 'ml-engineer',
    explanation:
      'You work with training data, model architectures, and ML pipelines. You want to understand AI at the mathematical and empirical level, not just consuming APIs but shaping the models themselves.',
  },
]

/**
 * Compute max possible score for each role across all questions.
 * Used for normalization: percentage = rawScore / maxPossible * 100
 */
export function computeMaxPossible(): Record<string, number> {
  const maxPossible: Record<string, number> = {}

  for (const question of ROLE_QUIZ_QUESTIONS) {
    const maxPerRole: Record<string, number> = {}
    for (const option of question.options) {
      for (const [roleId, pts] of Object.entries(option.scores)) {
        if (!maxPerRole[roleId] || pts > maxPerRole[roleId]) {
          maxPerRole[roleId] = pts
        }
      }
    }
    for (const [roleId, pts] of Object.entries(maxPerRole)) {
      maxPossible[roleId] = (maxPossible[roleId] ?? 0) + pts
    }
  }

  return maxPossible
}
