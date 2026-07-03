/**
 * Whitepapers & Ebooks data
 * 13 whitepapers, FR + EN, PDF + EPUB
 *
 * PDFs hosted on Vercel (florian.bruniaux.com/guides/).
 * Hashed filenames prevent brute-force discovery: the API (portfolio) validates
 * filenames server-side against ALLOWED_GUIDES before serving.
 * EPUBs are hosted on the landing (public/ebooks/epub/) as secondary format.
 */

export interface Whitepaper {
  num: string          // "00", "01", ..., "10"
  titleEn: string
  titleFr: string
  subtitle: string     // 1-line hook (EN)
  audience: string
  pages: number        // approximate
  tags: string[]
  gated: boolean       // false = direct download, true = email required
  comingSoon?: boolean // true = not yet released, hashes empty
  badge?: string
  formats: ('pdf' | 'epub')[]
  // Hashed PDF filenames (served from florian.bruniaux.com/guides/)
  hashedFileFr: string
  hashedFileEn: string
  // EPUB slugs (served from landing /ebooks/epub/{lang}/)
  slugFr: string
  slugEn: string
}

const V = 'v3.41.1'

export const WHITEPAPERS: Whitepaper[] = [
  {
    num: '00',
    titleEn: 'Introduction & Fundamentals',
    titleFr: 'Introduction & Fondamentaux',
    subtitle: 'From zero to productive in a day: the complete Claude Code primer.',
    audience: 'Everyone',
    pages: 32,
    tags: ['foundations', 'setup', 'beginner'],
    gated: false,
    badge: 'Open',
    formats: ['pdf', 'epub'],
    hashedFileFr: `00-introduction-serie.fr.${V}.1c3cd1d5fdec.pdf`,
    hashedFileEn: `00-series-introduction.en.${V}.d5b1c41b89ab.pdf`,
    slugFr: '00-introduction-serie',
    slugEn: '00-series-introduction',
  },
  {
    num: '01',
    titleEn: 'Effective Prompts',
    titleFr: 'Prompts Efficaces',
    subtitle: 'Structured prompting patterns that cut back-and-forth by 60%.',
    audience: 'All developers',
    pages: 40,
    tags: ['prompts', 'methodology', 'productivity'],
    gated: true,
    formats: ['pdf', 'epub'],
    hashedFileFr: `01-prompts-efficaces.fr.${V}.ddc4cdd30dba.pdf`,
    hashedFileEn: `01-effective-prompts.en.${V}.ff5aaf344e99.pdf`,
    slugFr: '01-prompts-efficaces',
    slugEn: '01-effective-prompts',
  },
  {
    num: '02',
    titleEn: 'Customization & Configuration',
    titleFr: 'Personnalisation & Configuration',
    subtitle: 'CLAUDE.md, hooks, MCP, and settings: the full configuration system.',
    audience: 'Intermediate–Advanced',
    pages: 44,
    tags: ['config', 'hooks', 'mcp', 'claude.md'],
    gated: true,
    formats: ['pdf', 'epub'],
    hashedFileFr: `02-personnalisation.fr.${V}.e237ac337dfa.pdf`,
    hashedFileEn: `02-customization.en.${V}.33885ada81f3.pdf`,
    slugFr: '02-personnalisation',
    slugEn: '02-customization',
  },
  {
    num: '03',
    titleEn: 'Security in Production',
    titleFr: 'Sécurité en Production',
    subtitle: 'Threat model, sandboxing, and hardening guide for production deployments.',
    audience: 'DevSecOps',
    pages: 48,
    tags: ['security', 'production', 'hardening', 'sandbox'],
    gated: true,
    formats: ['pdf', 'epub'],
    hashedFileFr: `03-securite.fr.${V}.a16fb4bca966.pdf`,
    hashedFileEn: `03-security.en.${V}.890b5c7db809.pdf`,
    slugFr: '03-securite',
    slugEn: '03-security',
  },
  {
    num: '04',
    titleEn: 'Internal Architecture',
    titleFr: 'Architecture Interne',
    subtitle: 'How Claude Code works under the hood: tool loop, context, and pipeline.',
    audience: 'Senior developers',
    pages: 44,
    tags: ['architecture', 'internals', 'advanced'],
    gated: true,
    formats: ['pdf', 'epub'],
    hashedFileFr: `04-architecture.fr.${V}.e9b0c9cbe8c8.pdf`,
    hashedFileEn: `04-architecture.en.${V}.9e9adb4b2146.pdf`,
    slugFr: '04-architecture',
    slugEn: '04-architecture',
  },
  {
    num: '05',
    titleEn: 'Team Adoption',
    titleFr: 'Adoption en Équipe',
    subtitle: 'Rollout playbook: from pilot to org-wide adoption with metrics.',
    audience: 'Tech leads & managers',
    pages: 52,
    tags: ['team', 'adoption', 'management', 'rollout'],
    gated: true,
    formats: ['pdf', 'epub'],
    hashedFileFr: `05-equipe.fr.${V}.e84adbc4db8e.pdf`,
    hashedFileEn: `05-team.en.${V}.990461ca1ab0.pdf`,
    slugFr: '05-equipe',
    slugEn: '05-team',
  },
  {
    num: '06',
    titleEn: 'Privacy & Compliance',
    titleFr: 'Privacy & Conformité',
    subtitle: 'GDPR, data flows, and compliance checklist for regulated environments.',
    audience: 'Compliance & legal',
    pages: 36,
    tags: ['privacy', 'gdpr', 'compliance', 'data'],
    gated: true,
    formats: ['pdf', 'epub'],
    hashedFileFr: `06-privacy.fr.${V}.5a70846678e0.pdf`,
    hashedFileEn: `06-privacy.en.${V}.40cd10465269.pdf`,
    slugFr: '06-privacy',
    slugEn: '06-privacy',
  },
  {
    num: '07',
    titleEn: 'Condensed Reference Guide',
    titleFr: 'Guide de Référence Condensé',
    subtitle: 'Dense cheat book: every command, flag, and pattern in one place.',
    audience: 'All levels',
    pages: 80,
    tags: ['reference', 'commands', 'cheatsheet', 'dense'],
    gated: true,
    badge: 'Popular',
    formats: ['pdf', 'epub'],
    hashedFileFr: `07-guide-reference.fr.${V}.3860a10a124c.pdf`,
    hashedFileEn: `07-reference-guide.en.${V}.38e24fcad308.pdf`,
    slugFr: '07-guide-reference',
    slugEn: '07-reference-guide',
  },
  {
    num: '08',
    titleEn: 'Agent Teams & Sub-Agents',
    titleFr: "Teams d'Agents & Sub-Agents",
    subtitle: 'Orchestration patterns for parallel multi-agent workflows.',
    audience: 'Advanced developers',
    pages: 40,
    tags: ['agents', 'multi-agent', 'orchestration', 'parallel'],
    gated: true,
    formats: ['pdf', 'epub'],
    hashedFileFr: `08-agent-teams.fr.${V}.7da2b0691575.pdf`,
    hashedFileEn: `08-agent-teams.en.${V}.202d282b5bc8.pdf`,
    slugFr: '08-agent-teams',
    slugEn: '08-agent-teams',
  },
  {
    num: '09',
    titleEn: 'Learning with AI (UVAL)',
    titleFr: "Apprendre avec l'IA (UVAL)",
    subtitle: 'The UVAL method: using AI as a personalized learning accelerator.',
    audience: 'Learners & coaches',
    pages: 40,
    tags: ['learning', 'uval', 'pedagogy', 'ai-tutor'],
    gated: true,
    formats: ['pdf', 'epub'],
    hashedFileFr: `09-apprendre-avec-ia.fr.${V}.48b322eaf9dd.pdf`,
    hashedFileEn: `09-learning-with-ai.en.${V}.9dbc0c683180.pdf`,
    slugFr: '09-apprendre-avec-ia',
    slugEn: '09-learning-with-ai',
  },
  {
    num: '10',
    titleEn: 'AI Budget & ROI',
    titleFr: 'Budget IA & ROI',
    subtitle: 'Token cost models, ROI calculation, and budget justification templates.',
    audience: 'CTOs & decision-makers',
    pages: 28,
    tags: ['roi', 'budget', 'cost', 'management'],
    gated: true,
    formats: ['pdf', 'epub'],
    hashedFileFr: `10-budget-ia.fr.${V}.70fb24ae1627.pdf`,
    hashedFileEn: `10-ai-budget.en.${V}.598aeaf70f6d.pdf`,
    slugFr: '10-budget-ia',
    slugEn: '10-ai-budget',
  },
  {
    num: '11',
    titleEn: 'Team Metrics in the AI Era',
    titleFr: "Piloter une Équipe à l'Ère de l'IA",
    subtitle: 'DORA, SPACE, and the metrics that matter when AI writes 70% of your code.',
    audience: 'Engineering Managers, Tech Leads, CTOs',
    pages: 28,
    tags: ['metrics', 'dora', 'space', 'management', 'team'],
    gated: true,
    badge: 'New',
    formats: ['pdf'],
    hashedFileFr: `11-team-metrics.fr.${V}.076f74ef19c1.pdf`,
    hashedFileEn: `11-team-metrics.en.${V}.227432f0a55d.pdf`,
    slugFr: '11-team-metrics',
    slugEn: '11-team-metrics',
  },
  {
    num: '12',
    titleEn: 'Software Engineering in the Age of Autonomous Agents',
    titleFr: "L'Ingénierie Logicielle à l'Ère des Agents Autonomes",
    subtitle: 'Harnesses, agentic CI/CD, and honest productivity measurement.',
    audience: 'Tech leads & staff engineers',
    pages: 38,
    tags: ['agents', 'harness', 'cicd', 'productivity'],
    gated: true,
    badge: 'New',
    formats: ['pdf', 'epub'],
    hashedFileFr: `12-agent-engineering.fr.${V}.e07ebf6d3c0a.pdf`,
    hashedFileEn: `12-agent-engineering.en.${V}.45650a355386.pdf`,
    slugFr: '12-agent-engineering',
    slugEn: '12-agent-engineering',
  },
]

export const TOTAL_PAGES = WHITEPAPERS.reduce((sum, wp) => sum + wp.pages, 0)
export const FREE_WPS = WHITEPAPERS.filter(wp => !wp.gated)
export const GATED_WPS = WHITEPAPERS.filter(wp => wp.gated)

/** Base URL for hashed PDFs on Vercel (overridable via PUBLIC_PDF_BASE env var) */
export const PDF_BASE_URL = import.meta.env.PUBLIC_PDF_BASE ?? 'https://florian.bruniaux.com/guides'
