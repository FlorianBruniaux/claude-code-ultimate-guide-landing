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
  pages: number        // approximate FR or shared page count
  pagesEn?: number     // set when the EN render differs materially
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

const V = 'v3.41.3'
const WP12_V = 'v3.43.0'

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
    hashedFileFr: `00-introduction-serie.fr.${V}.208ea9e31697.pdf`,
    hashedFileEn: `00-series-introduction.en.${V}.04daa1ac2d77.pdf`,
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
    hashedFileFr: `01-prompts-efficaces.fr.${V}.c4d08dc7bf4b.pdf`,
    hashedFileEn: `01-effective-prompts.en.${V}.353277e65139.pdf`,
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
    hashedFileFr: `02-personnalisation.fr.${V}.0de833e04345.pdf`,
    hashedFileEn: `02-customization.en.${V}.44368224e147.pdf`,
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
    hashedFileFr: `03-securite.fr.${V}.e29813b8da53.pdf`,
    hashedFileEn: `03-security.en.${V}.da11b37bbf17.pdf`,
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
    hashedFileFr: `04-architecture.fr.${V}.696cc502ee5b.pdf`,
    hashedFileEn: `04-architecture.en.${V}.1c5069f23b98.pdf`,
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
    hashedFileFr: `05-equipe.fr.${V}.2a32b5b28e41.pdf`,
    hashedFileEn: `05-team.en.${V}.4d5774d7cbfe.pdf`,
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
    hashedFileFr: `06-privacy.fr.${V}.3d40e978be52.pdf`,
    hashedFileEn: `06-privacy.en.${V}.3ea3711abda1.pdf`,
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
    hashedFileFr: `07-guide-reference.fr.${V}.c4b8d7734c16.pdf`,
    hashedFileEn: `07-reference-guide.en.${V}.bf1a057f6e7c.pdf`,
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
    hashedFileFr: `08-agent-teams.fr.${V}.00b7de3a7bb3.pdf`,
    hashedFileEn: `08-agent-teams.en.${V}.2f714fc7c3b0.pdf`,
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
    hashedFileFr: `09-apprendre-avec-ia.fr.${V}.f19ac95dc0a3.pdf`,
    hashedFileEn: `09-learning-with-ai.en.${V}.6f1c91845b6c.pdf`,
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
    hashedFileFr: `10-budget-ia.fr.${V}.864158868a08.pdf`,
    hashedFileEn: `10-ai-budget.en.${V}.b83bfcd90ddc.pdf`,
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
    hashedFileFr: `11-team-metrics.fr.${V}.e930d3b35da9.pdf`,
    hashedFileEn: `11-team-metrics.en.${V}.4936dfee09fc.pdf`,
    slugFr: '11-team-metrics',
    slugEn: '11-team-metrics',
  },
  {
    num: '12',
    titleEn: 'Software Engineering in the Age of Autonomous Agents',
    titleFr: "L'Ingénierie Logicielle à l'Ère des Agents Autonomes",
    subtitle: 'Harnesses, agentic CI/CD, and honest productivity measurement.',
    audience: 'Tech leads & staff engineers',
    pages: 42,
    pagesEn: 33,
    tags: ['agents', 'harness', 'loop', 'graph', 'cicd', 'productivity'],
    gated: true,
    badge: 'New',
    formats: ['pdf', 'epub'],
    hashedFileFr: `12-agent-engineering.fr.${WP12_V}.062baeca347e.pdf`,
    hashedFileEn: `12-agent-engineering.en.${WP12_V}.031291a32c35.pdf`,
    slugFr: '12-agent-engineering',
    slugEn: '12-agent-engineering',
  },
]

export const TOTAL_PAGES = WHITEPAPERS.reduce((sum, wp) => sum + wp.pages, 0)
export const FREE_WPS = WHITEPAPERS.filter(wp => !wp.gated)
export const GATED_WPS = WHITEPAPERS.filter(wp => wp.gated)

/** Base URL for hashed PDFs on Vercel (overridable via PUBLIC_PDF_BASE env var) */
const publicPdfBase = (import.meta as ImportMeta & { env?: Record<string, string> }).env?.PUBLIC_PDF_BASE
export const PDF_BASE_URL = publicPdfBase ?? 'https://florian.bruniaux.com/guides'
