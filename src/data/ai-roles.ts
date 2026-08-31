/**
 * AI roles and career paths data.
 * Canonical source: guide/roles/ai-roles.md
 *
 * Update the guide first, then sync the role entries and modified date here.
 * The displayed count and month are derived from this file.
 */

export type RoleEvidence = 'Role family' | 'Specialization' | 'Capability' | 'Title qualifier'

export interface RoleEntry {
  id: string
  title: string
  evidence: RoleEvidence
  mission: string
  skills: string[]
  entryPaths: string[]
  guideAnchor: string
  landingUrl: string
  highlight?: boolean
}

export interface DecisionRow {
  background: string
  role: string
  timeline: string
  roleId: string
}

export const ROLES: RoleEntry[] = [
  {
    id: 'prompt-engineer',
    title: 'Prompt Engineer',
    evidence: 'Capability',
    mission: 'Design and test instructions for reliable model behavior inside broader product, evaluation, and domain roles.',
    skills: ['LLM behavior and failure modes', 'Systematic A/B testing', 'Prompt versioning'],
    entryPaths: ['Technical writer', 'QA engineer', 'Domain expert'],
    guideAnchor: '2-prompt-engineer',
    landingUrl: '/guide/ai-roles/',
  },
  {
    id: 'context-engineer',
    title: 'Context Engineer',
    evidence: 'Specialization',
    mission: 'Design systems that give models the right information, at the right time, in the right format.',
    skills: ['RAG and retrieval', 'Prompt caching and token budgets', 'Knowledge architecture', 'MCP context servers'],
    entryPaths: ['Data engineer', 'Backend engineer', 'ML engineer'],
    guideAnchor: '3-context-engineer',
    landingUrl: '/guide/ai-ecosystem/',
  },
  {
    id: 'ai-engineer',
    title: 'AI Engineer',
    evidence: 'Role family',
    mission: 'Build end-to-end AI applications, from model integration and evaluation to production monitoring.',
    skills: ['LLM APIs', 'Evaluation design', 'Production engineering'],
    entryPaths: ['Software engineer', 'Backend engineer', 'Data engineer'],
    guideAnchor: '4-ai-engineer',
    landingUrl: '/guide/',
    highlight: true,
  },
  {
    id: 'applied-ai-engineer',
    title: 'Applied AI Engineer',
    evidence: 'Role family',
    mission: 'Turn available models into production behavior for a defined product or workflow.',
    skills: ['Application architecture', 'Context and tool use', 'Evaluation datasets', 'Production instrumentation'],
    entryPaths: ['Software engineer', 'AI engineer', 'Product engineer'],
    guideAnchor: '5-applied-ai-engineer',
    landingUrl: '/guide/ai-roles/',
    highlight: true,
  },
  {
    id: 'llm-engineer',
    title: 'LLM Engineer',
    evidence: 'Specialization',
    mission: 'Specialize in model integration, adaptation, fine-tuning, and evaluation infrastructure.',
    skills: ['Python and PyTorch/JAX', 'Fine-tuning', 'Evaluation framework design'],
    entryPaths: ['ML engineer', 'AI researcher', 'Data scientist'],
    guideAnchor: '6-llm-engineer',
    landingUrl: '/guide/agent-evaluation/',
  },
  {
    id: 'ai-agent-engineer',
    title: 'AI Agent Engineer',
    evidence: 'Role family',
    mission: 'Design agent systems that plan, use tools, and execute multi-step tasks under explicit controls.',
    skills: ['Agent control loops', 'Observability and tracing', 'Guardrails and safety'],
    entryPaths: ['AI engineer', 'Backend engineer', 'Software engineer'],
    guideAnchor: '7-ai-agent-engineer',
    landingUrl: '/guide/architecture/',
    highlight: true,
  },
  {
    id: 'founding-ai-engineer',
    title: 'Founding AI Engineer',
    evidence: 'Title qualifier',
    mission: 'Own the AI core of an early-stage company across architecture, product delivery, and customer feedback.',
    skills: ['Full-stack ownership', 'AI tooling fluency', 'Product and technical judgment'],
    entryPaths: ['Product engineer', 'Senior software engineer', 'Technical founder'],
    guideAnchor: '8-founding-ai-engineer',
    landingUrl: '/guide/adoption-approaches/',
  },
  {
    id: 'ai-architect',
    title: 'AI Architect',
    evidence: 'Role family',
    mission: 'Own system-level decisions for enterprise AI architecture, security, governance, and integration.',
    skills: ['Cloud AI services', 'Security and compliance', 'Distributed systems design'],
    entryPaths: ['Staff AI engineer', 'Cloud architect', 'Enterprise architect'],
    guideAnchor: '9-ai-architect',
    landingUrl: '/guide/architecture/',
  },
  {
    id: 'platform-engineer',
    title: 'AI Platform Engineer',
    evidence: 'Role family',
    mission: 'Build the internal platform that makes AI development reliable, secure, observable, and reusable.',
    skills: ['Model gateways', 'MLOps and versioning', 'Cost control and observability'],
    entryPaths: ['DevOps or SRE engineer', 'Backend engineer', 'Infrastructure engineer'],
    guideAnchor: '10-ai-platform-engineer',
    landingUrl: '/guide/devops-sre/',
  },
  {
    id: 'harness-engineer',
    title: 'Harness Engineer',
    evidence: 'Capability',
    mission: 'Build constraints, feedback loops, and knowledge systems that keep coding agents productive.',
    skills: ['Agent-readable checks', 'Architecture enforcement', 'Anti-entropy systems', 'Knowledge-base design'],
    entryPaths: ['Staff engineer', 'Platform engineer', 'AI architect'],
    guideAnchor: '11-harness-engineer',
    landingUrl: '/guide/production-safety/',
    highlight: true,
  },
  {
    id: 'ai-product-manager',
    title: 'AI Product Manager',
    evidence: 'Role family',
    mission: 'Own AI products, including requirements, evaluation criteria, risk tradeoffs, and non-deterministic UX.',
    skills: ['Evaluation design', 'Probabilistic thinking', 'AI UX patterns'],
    entryPaths: ['Product manager', 'Technical PM', 'QA or data analyst'],
    guideAnchor: '12-ai-product-manager',
    landingUrl: '/guide/ai-ecosystem/',
  },
  {
    id: 'ai-safety-eval-engineer',
    title: 'AI Safety Engineer',
    evidence: 'Role family',
    mission: 'Reduce harmful or unintended model and system behavior through safeguards, testing, and risk controls.',
    skills: ['Safety evaluation', 'Adversarial testing', 'Risk reporting and controls'],
    entryPaths: ['ML engineer', 'Security engineer', 'Research engineer'],
    guideAnchor: '13-ai-safety-engineer',
    landingUrl: '/guide/agent-evaluation/',
  },
  {
    id: 'ml-engineer',
    title: 'ML Engineer',
    evidence: 'Role family',
    mission: 'Develop, train, deploy, and maintain machine-learning models and their production pipelines.',
    skills: ['Python and ML frameworks', 'Data pipelines', 'Cloud ML platforms'],
    entryPaths: ['Data scientist', 'Software engineer', 'Research scientist'],
    guideAnchor: '14-ml-engineer',
    landingUrl: '/guide/methodologies/',
  },
  {
    id: 'mlops-engineer',
    title: 'MLOps Engineer',
    evidence: 'Role family',
    mission: 'Operate model delivery, observability, drift detection, and deployment infrastructure.',
    skills: ['Experiment and model tracking', 'Drift monitoring', 'Kubernetes and infrastructure as code'],
    entryPaths: ['DevOps or platform engineer', 'ML engineer', 'Data engineer'],
    guideAnchor: '15-mlops-engineer',
    landingUrl: '/guide/devops-sre/',
  },
  {
    id: 'ai-developer-advocate',
    title: 'AI Developer Advocate',
    evidence: 'Role family',
    mission: 'Connect an AI platform with developers through demos, education, community work, and product feedback.',
    skills: ['Technical content', 'Community building', 'Platform and API fluency'],
    entryPaths: ['Software engineer', 'Technical writer', 'Developer relations'],
    guideAnchor: '16-ai-developer-advocate',
    landingUrl: '/guide/ai-ecosystem/',
  },
  {
    id: 'ai-orchestration-engineer',
    title: 'AI Orchestration Engineer',
    evidence: 'Specialization',
    mission: 'Connect AI capabilities to enterprise systems, data sources, and operational workflows.',
    skills: ['Workflow orchestration', 'API integration', 'Tracing and reliability'],
    entryPaths: ['Integration engineer', 'Backend engineer', 'DevOps engineer'],
    guideAnchor: '17-ai-orchestration-engineer',
    landingUrl: '/guide/architecture/',
  },
  {
    id: 'spec-engineer',
    title: 'Spec Engineer',
    evidence: 'Capability',
    mission: 'Write testable specifications that agents can use to plan, implement, and validate changes.',
    skills: ['Structured specification writing', 'Agent failure modes', 'Acceptance criteria'],
    entryPaths: ['Technical writer', 'QA engineer', 'Product engineer'],
    guideAnchor: '18-spec-engineer',
    landingUrl: '/guide/ai-roles/',
  },
  {
    id: 'agent-identity-architect',
    title: 'Agent Identity Architect',
    evidence: 'Capability',
    mission: 'Design authentication, delegated authority, permission scoping, and auditability for AI agents.',
    skills: ['IAM and OAuth/OIDC', 'Zero-trust architecture', 'Agent authorization'],
    entryPaths: ['IAM security engineer', 'Platform security engineer', 'Cloud architect'],
    guideAnchor: '19-agent-identity-architect',
    landingUrl: '/guide/ai-roles/',
  },
  {
    id: 'ai-eval-engineer',
    title: 'AI Evaluation Engineer',
    evidence: 'Role family',
    mission: 'Build the continuous measurement layer for AI quality, regressions, and production behavior.',
    skills: ['Experiment design', 'Evaluation pipelines', 'Production telemetry'],
    entryPaths: ['Backend engineer', 'QA engineer', 'ML engineer'],
    guideAnchor: '20-ai-evaluation-engineer',
    landingUrl: '/guide/agent-evaluation/',
  },
  {
    id: 'forward-deployed-engineer',
    title: 'Forward-Deployed Engineer',
    evidence: 'Role family',
    mission: 'Own deployment of an AI system inside a customer environment, from discovery through adoption and handoff.',
    skills: ['Technical discovery', 'Production integration', 'Evaluation and rollout', 'Customer collaboration'],
    entryPaths: ['Solutions engineer', 'Product engineer', 'Applied AI engineer'],
    guideAnchor: '21-forward-deployed-engineer-fde',
    landingUrl: '/guide/ai-roles/',
    highlight: true,
  },
  {
    id: 'ai-security-engineer',
    title: 'AI Security Engineer',
    evidence: 'Role family',
    mission: 'Protect AI applications, models, data paths, agents, and platforms against misuse and attack.',
    skills: ['AI threat modeling', 'Adversarial testing', 'Runtime controls', 'AppSec and IAM integration'],
    entryPaths: ['Application security engineer', 'Cloud security engineer', 'AI red-team engineer'],
    guideAnchor: '22-ai-security-engineer',
    landingUrl: '/guide/ai-roles/',
  },
  {
    id: 'ai-governance-engineer',
    title: 'AI Governance Engineer',
    evidence: 'Role family',
    mission: 'Turn AI policy, risk, and regulatory requirements into operational tooling and evidence.',
    skills: ['AI inventories and lineage', 'Policy automation', 'Control evidence', 'Risk workflows'],
    entryPaths: ['Governance engineer', 'Data platform engineer', 'Risk technology engineer'],
    guideAnchor: '23-ai-governance-engineer',
    landingUrl: '/guide/ai-roles/',
  },
]

export const ROLES_MODIFIED_DATE = '2026-08-31'

export function formatRolesUpdatedDate(isoDate: string): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(isoDate)) {
    throw new Error(`Invalid roles modified date: ${isoDate}`)
  }

  const date = new Date(`${isoDate}T00:00:00Z`)
  if (Number.isNaN(date.getTime())) {
    throw new Error(`Invalid roles modified date: ${isoDate}`)
  }

  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date)
}

export const ROLES_META = {
  count: ROLES.length,
  modifiedDate: ROLES_MODIFIED_DATE,
  updated: formatRolesUpdatedDate(ROLES_MODIFIED_DATE),
  sourceUrl: 'https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/main/guide/roles/ai-roles.md',
} as const

export const DECISION_MATRIX: DecisionRow[] = [
  { background: 'Software or product engineer', role: 'AI Engineer or Applied AI Engineer', timeline: 'Build production AI evidence', roleId: 'ai-engineer' },
  { background: 'Front-end specialist', role: 'Product or Software Engineer with front-end depth', timeline: 'Add backend, eval, and AI integration evidence', roleId: 'applied-ai-engineer' },
  { background: 'Customer-facing product engineer', role: 'Forward-Deployed Engineer', timeline: 'Add discovery and rollout ownership', roleId: 'forward-deployed-engineer' },
  { background: 'Backend or infrastructure engineer', role: 'AI Platform or MLOps Engineer', timeline: 'Add model operations and observability', roleId: 'platform-engineer' },
  { background: 'Senior systems engineer', role: 'AI Architect or Harness capability', timeline: 'Accumulate system-level ownership', roleId: 'ai-architect' },
  { background: 'Engineer focused on model behavior', role: 'LLM, Safety, or Evaluation Engineer', timeline: 'Add ML and evaluation foundations', roleId: 'llm-engineer' },
  { background: 'Product manager', role: 'AI Product Manager', timeline: 'Add evaluation and AI UX practice', roleId: 'ai-product-manager' },
  { background: 'Security engineer', role: 'AI Security Engineer', timeline: 'Extend AppSec, cloud, and IAM into AI systems', roleId: 'ai-security-engineer' },
  { background: 'Risk or governance technologist', role: 'AI Governance Engineer', timeline: 'Build operational controls and evidence', roleId: 'ai-governance-engineer' },
]

export const STATUS_CONFIG: Record<RoleEvidence, { label: string; color: string }> = {
  'Role family': { label: 'Role family', color: '#22c55e' },
  Specialization: { label: 'Specialization', color: '#d4520a' },
  Capability: { label: 'Capability', color: '#3b82f6' },
  'Title qualifier': { label: 'Title qualifier', color: '#7c3aed' },
}
