/**
 * AI Roles & Career Paths data
 * Source: guide/ai-roles.md
 * Last synced: March 2026
 *
 * To update: edit guide/ai-roles.md first, then sync this file manually.
 */

export type RoleStatus = 'Established' | 'Growing' | 'Emerging'

export interface SalaryRange {
  entry: string
  mid: string
  senior: string
  note?: string
}

export interface RoleEntry {
  id: string
  title: string
  status: RoleStatus
  mission: string
  skills: string[]
  entryPaths: string[]
  salary: SalaryRange | null
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

export const ROLES_META = {
  count: 16,
  updated: 'March 2026',
  salaryMarket: 'US market · ±30%',
  sourceUrl: 'https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/main/guide/ai-roles.md',
} as const

export const ROLES: RoleEntry[] = [
  {
    id: 'prompt-engineer',
    title: 'Prompt Engineer',
    status: 'Established',
    mission: 'Craft and optimize instructions sent to AI models for reliable, high-quality outputs.',
    skills: ['LLM behavior & failure modes', 'Systematic A/B testing', 'Prompt versioning'],
    entryPaths: ['Technical writer', 'QA engineer', 'Domain expert (law, medicine, finance)'],
    salary: {
      entry: '$80K–$110K',
      mid: '$110K–$150K',
      senior: '$150K–$180K',
      note: 'Shrinking standalone market',
    },
    guideAnchor: '2-prompt-engineer',
    landingUrl: '/guide/ai-roles/',
  },
  {
    id: 'context-engineer',
    title: 'Context Engineer',
    status: 'Growing',
    mission: 'Design systems that give AI models the right information, at the right time, in the right format.',
    skills: ['RAG & vector databases', 'Context window management', 'Knowledge base architecture'],
    entryPaths: ['Data engineer', 'Backend engineer', 'ML engineer'],
    salary: {
      entry: '$100K–$140K',
      mid: '$140K–$180K',
      senior: '$180K–$230K',
    },
    guideAnchor: '3-context-engineer',
    landingUrl: '/guide/ai-ecosystem/',
  },
  {
    id: 'ai-engineer',
    title: 'AI Engineer',
    status: 'Growing',
    mission: 'Build end-to-end AI-powered applications — from LLM integration to production monitoring.',
    skills: ['LLM APIs (Anthropic, OpenAI, Gemini)', 'Eval design & measurement', 'MLOps basics'],
    entryPaths: ['Software engineer', 'Backend engineer', 'Data engineer'],
    salary: {
      entry: '$120K–$160K',
      mid: '$160K–$220K',
      senior: '$220K–$300K',
    },
    guideAnchor: '4-ai-engineer',
    landingUrl: '/guide/',
    highlight: true,
  },
  {
    id: 'llm-engineer',
    title: 'LLM Engineer',
    status: 'Growing',
    mission: 'Deep specialization in LLM integration, fine-tuning, and evaluation infrastructure.',
    skills: ['Python + PyTorch/JAX', 'Fine-tuning & RLHF', 'Evaluation framework design'],
    entryPaths: ['ML engineer', 'AI researcher', 'Data scientist'],
    salary: {
      entry: '$130K–$170K',
      mid: '$170K–$250K',
      senior: '$250K–$350K',
      note: 'Lab-level roles higher',
    },
    guideAnchor: '5-llm-engineer',
    landingUrl: '/guide/agent-evaluation/',
  },
  {
    id: 'ai-agent-engineer',
    title: 'AI Agent Engineer',
    status: 'Growing',
    mission: 'Design and build autonomous agent systems that plan, reason, and execute multi-step tasks.',
    skills: ['Agent frameworks (LangChain, AutoGen)', 'Observability & tracing', 'Guardrails & safety mechanisms'],
    entryPaths: ['AI engineer', 'Backend engineer', 'Software engineer'],
    salary: {
      entry: '$130K–$170K',
      mid: '$170K–$240K',
      senior: '$240K–$320K',
    },
    guideAnchor: '6-ai-agent-engineer',
    landingUrl: '/guide/architecture/',
    highlight: true,
  },
  {
    id: 'founding-ai-engineer',
    title: 'Founding AI Engineer',
    status: 'Growing',
    mission: 'Build the AI core of an early-stage company end-to-end, from architecture to customer interaction.',
    skills: ['Full-stack ownership', 'AI tools fluency (Claude Code, Cursor)', 'Product + technical judgment'],
    entryPaths: ['Mid-level engineer wanting more ownership', 'Side-project builder'],
    salary: {
      entry: '$100K–$150K + equity',
      mid: '—',
      senior: '—',
      note: 'Equity makes total comp wide-ranging',
    },
    guideAnchor: '7-founding-ai-engineer',
    landingUrl: '/guide/adoption-approaches/',
  },
  {
    id: 'ai-architect',
    title: 'AI Architect',
    status: 'Established',
    mission: 'Design enterprise AI systems — technology choices, reference architectures, governance standards.',
    skills: ['Cloud AI services (AWS/Azure/GCP)', 'Security & compliance (GDPR, AI Act)', 'Distributed systems design'],
    entryPaths: ['Senior AI engineer → Staff → Architect', 'Cloud architect + AI upskill'],
    salary: {
      entry: '—',
      mid: '$180K–$260K',
      senior: '$260K–$380K',
    },
    guideAnchor: '8-ai-architect',
    landingUrl: '/guide/architecture/',
  },
  {
    id: 'platform-engineer',
    title: 'Platform Engineer',
    status: 'Established',
    mission: 'Build the internal platform that makes AI development reliable, secure, and consistent across teams.',
    skills: ['LLM gateway products (LiteLLM, Portkey)', 'MLOps & model versioning', 'Cost control & observability'],
    entryPaths: ['DevOps/SRE engineer', 'Backend engineer', 'Infrastructure engineer'],
    salary: {
      entry: '$110K–$150K',
      mid: '$150K–$210K',
      senior: '$210K–$280K',
    },
    guideAnchor: '9-platform-engineer-ai-context',
    landingUrl: '/guide/devops-sre/',
  },
  {
    id: 'harness-engineer',
    title: 'Harness Engineer',
    status: 'Emerging',
    mission: 'Build the infrastructure that keeps AI agents under control — architectural constraints, context systems, and entropy management.',
    skills: ['Architectural linters & static analysis', 'LLM orchestration & watchdogs', 'Entropy detection patterns'],
    entryPaths: ['Staff/principal engineer', 'Platform engineer', 'AI architect'],
    salary: null,
    guideAnchor: '10-harness-engineer',
    landingUrl: '/guide/production-safety/',
    highlight: true,
  },
  {
    id: 'ai-product-manager',
    title: 'AI Product Manager',
    status: 'Growing',
    mission: 'Own AI-powered products — requirements, quality tradeoffs, UX of non-deterministic systems.',
    skills: ['Eval design & probabilistic thinking', 'LLM API familiarity', 'AI UX patterns'],
    entryPaths: ['Traditional PM', 'Technical PM', 'QA or data analyst'],
    salary: {
      entry: '$130K–$170K',
      mid: '$170K–$230K',
      senior: '$230K–$350K',
      note: 'FAANG premium significant',
    },
    guideAnchor: '11-ai-product-manager',
    landingUrl: '/guide/ai-ecosystem/',
  },
  {
    id: 'ai-safety-eval-engineer',
    title: 'AI Safety & Eval Engineer',
    status: 'Growing',
    mission: 'Ensure AI systems behave safely and reliably — build eval pipelines, red-team models, implement guardrails.',
    skills: ['Evaluation framework design', 'Red-teaming & adversarial testing', 'Risk reporting & governance'],
    entryPaths: ['ML engineer', 'Security engineer', 'Research engineer'],
    salary: {
      entry: '$140K–$180K',
      mid: '$180K–$250K',
      senior: '$250K–$400K',
      note: 'Lab compensation highest',
    },
    guideAnchor: '12-ai-safety--eval-engineer',
    landingUrl: '/guide/agent-evaluation/',
  },
  {
    id: 'ml-engineer',
    title: 'ML Engineer',
    status: 'Established',
    mission: 'Develop, train, deploy, and maintain machine learning models — the most traditional AI engineering role.',
    skills: ['Python + PyTorch/TensorFlow', 'Data pipelines (Spark, Airflow, dbt)', 'Cloud ML platforms (SageMaker, Vertex)'],
    entryPaths: ['Data scientist', 'Software engineer + ML upskill', 'Research scientist'],
    salary: {
      entry: '$100K–$140K',
      mid: '$140K–$200K',
      senior: '$200K–$280K',
    },
    guideAnchor: '13-ml-engineer',
    landingUrl: '/guide/methodologies/',
  },
  {
    id: 'mlops-engineer',
    title: 'MLOps Engineer',
    status: 'Established',
    mission: 'Own the operational layer that keeps models reliable in production — CI/CD pipelines, drift monitoring, and deployment infrastructure.',
    skills: ['MLflow / Weights & Biases', 'Model drift monitoring', 'Kubernetes & infrastructure as code'],
    entryPaths: ['DevOps/platform engineer', 'ML engineer (infra-minded)', 'Data engineer'],
    salary: {
      entry: '$110K–$150K',
      mid: '$150K–$200K',
      senior: '$200K–$270K',
      note: 'High demand in enterprises deploying at scale',
    },
    guideAnchor: '14-mlops-engineer',
    landingUrl: '/guide/devops-sre/',
  },
  {
    id: 'ai-developer-advocate',
    title: 'AI Developer Advocate',
    status: 'Growing',
    mission: 'Bridge an AI platform and the developers who use it — build demos, create tutorials, represent developer needs to the product team.',
    skills: ['Technical content creation', 'Community building', 'Deep platform/API fluency'],
    entryPaths: ['Software engineer with public presence', 'Technical writer with engineering background', 'Early AI community builder'],
    salary: {
      entry: '$120K–$160K',
      mid: '$160K–$220K',
      senior: '$220K–$300K',
      note: 'Active hiring at AI platforms',
    },
    guideAnchor: '15-ai-developer-advocate',
    landingUrl: '/guide/ai-ecosystem/',
    highlight: true,
  },
  {
    id: 'ai-orchestration-engineer',
    title: 'AI Orchestration Engineer',
    status: 'Emerging',
    mission: 'Connect AI capabilities to existing enterprise systems, data sources, and business processes through reliable automation workflows.',
    skills: ['Orchestration platforms (n8n, LangChain)', 'API integration (REST, webhooks)', 'Observability & tracing (LangSmith, Langfuse)'],
    entryPaths: ['Integration engineer', 'Backend engineer + automation experience', 'DevOps engineer adding AI tooling'],
    salary: {
      entry: '$100K–$140K',
      mid: '$140K–$190K',
      senior: '$190K–$260K',
      note: 'Emerging — title varies across companies',
    },
    guideAnchor: '16-ai-orchestration-engineer',
    landingUrl: '/guide/architecture/',
  },
]

export const DECISION_MATRIX: DecisionRow[] = [
  { background: 'Software engineer (3+ years)', role: 'AI Engineer', timeline: '3–6 months upskill', roleId: 'ai-engineer' },
  { background: 'Software engineer at early startup', role: 'Founding AI Engineer', timeline: 'Now, if opportunity exists', roleId: 'founding-ai-engineer' },
  { background: 'Backend engineer, infra-minded', role: 'Platform Engineer (AI)', timeline: '6–12 months', roleId: 'platform-engineer' },
  { background: 'Senior engineer who thinks in systems', role: 'AI Architect or Harness Engineer', timeline: '1–2 years accumulation', roleId: 'ai-architect' },
  { background: 'Engineer who likes research & rigor', role: 'LLM Engineer or AI Safety/Eval', timeline: '+ ML foundations needed', roleId: 'llm-engineer' },
  { background: 'Non-technical, works with AI daily', role: 'Prompt → Context Engineer', timeline: '6–18 months', roleId: 'context-engineer' },
  { background: 'PM who wants to stay PM', role: 'AI Product Manager', timeline: '3–6 months upskill', roleId: 'ai-product-manager' },
  { background: 'Engineer obsessed with reliability & archi', role: 'Harness Engineer', timeline: "Pioneers' territory", roleId: 'harness-engineer' },
  { background: 'DevOps/platform engineer, wants to work with models', role: 'MLOps Engineer', timeline: '3–6 months upskill', roleId: 'mlops-engineer' },
  { background: 'Engineer with public presence & community instincts', role: 'AI Developer Advocate', timeline: '6–12 months', roleId: 'ai-developer-advocate' },
  { background: 'Integration or automation engineer adding AI', role: 'AI Orchestration Engineer', timeline: '3–6 months', roleId: 'ai-orchestration-engineer' },
]

export const STATUS_CONFIG: Record<RoleStatus, { label: string; color: string }> = {
  Established: { label: 'Established', color: '#22c55e' },
  Growing: { label: 'Growing', color: '#d4520a' },
  Emerging: { label: 'Emerging', color: '#3b82f6' },
}