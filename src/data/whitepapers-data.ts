/**
 * Whitepapers & Ebooks data
 * 13 whitepapers, FR + EN, PDF + EPUB
 *
 * PDFs hosted on Vercel (florian.bruniaux.com/guides/).
 * Versioned content hashes identify the export and preserve prior downloads.
 * The email API validates filenames against ALLOWED_GUIDES.
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


export const WHITEPAPERS: Whitepaper[] = [
  {
    num: '00',
    titleEn: 'Introduction & Fundamentals',
    titleFr: 'Introduction & Fondamentaux',
    subtitle: 'Installation, first tasks, and the core Claude Code workflow.',
    audience: 'Everyone',
    pages: 20,
    pagesEn: 20,
    tags: ['foundations', 'setup', 'beginner'],
    gated: false,
    badge: 'Open',
    formats: ['pdf', 'epub'],
    hashedFileFr: '00-introduction-serie.fr.v3.44.1.bc8f2dea0e6d.pdf',
    hashedFileEn: '00-series-introduction.en.v3.44.1.8f7a16eeecaf.pdf',
    slugFr: '00-introduction-serie',
    slugEn: '00-series-introduction',
  },
  {
    num: '01',
    titleEn: 'Effective Prompts',
    titleFr: 'Prompts Efficaces',
    subtitle: 'Structured prompts, acceptance criteria, and context for clearer exchanges.',
    audience: 'All developers',
    pages: 43,
    pagesEn: 41,
    tags: ['prompts', 'methodology', 'productivity'],
    gated: true,
    formats: ['pdf', 'epub'],
    hashedFileFr: '01-prompts-efficaces.fr.v3.44.1.d479d38b5e73.pdf',
    hashedFileEn: '01-effective-prompts.en.v3.44.1.e4951ad7e9bc.pdf',
    slugFr: '01-prompts-efficaces',
    slugEn: '01-effective-prompts',
  },
  {
    num: '02',
    titleEn: 'Customization & Configuration',
    titleFr: 'Personnalisation & Configuration',
    subtitle: 'CLAUDE.md, hooks, MCP, and settings: the full configuration system.',
    audience: 'Intermediate–Advanced',
    pages: 46,
    pagesEn: 47,
    tags: ['config', 'hooks', 'mcp', 'claude.md'],
    gated: true,
    formats: ['pdf', 'epub'],
    hashedFileFr: '02-personnalisation.fr.v3.44.1.680094642a48.pdf',
    hashedFileEn: '02-customization.en.v3.44.1.34c233820e2e.pdf',
    slugFr: '02-personnalisation',
    slugEn: '02-customization',
  },
  {
    num: '03',
    titleEn: 'Security in Production',
    titleFr: 'Sécurité en Production',
    subtitle: 'Threat model, sandboxing, and hardening guide for production deployments.',
    audience: 'DevSecOps',
    pages: 45,
    pagesEn: 46,
    tags: ['security', 'production', 'hardening', 'sandbox'],
    gated: true,
    formats: ['pdf', 'epub'],
    hashedFileFr: '03-securite.fr.v3.44.1.652125748514.pdf',
    hashedFileEn: '03-security.en.v3.44.1.c8fe3a1843cf.pdf',
    slugFr: '03-securite',
    slugEn: '03-security',
  },
  {
    num: '04',
    titleEn: 'Internal Architecture',
    titleFr: 'Architecture Interne',
    subtitle: 'How Claude Code works under the hood: tool loop, context, and pipeline.',
    audience: 'Senior developers',
    pages: 38,
    pagesEn: 37,
    tags: ['architecture', 'internals', 'advanced'],
    gated: true,
    formats: ['pdf', 'epub'],
    hashedFileFr: '04-architecture.fr.v3.44.1.e2e91b3bac1f.pdf',
    hashedFileEn: '04-architecture.en.v3.44.1.f248b6ed4253.pdf',
    slugFr: '04-architecture',
    slugEn: '04-architecture',
  },
  {
    num: '05',
    titleEn: 'Team Adoption',
    titleFr: 'Adoption en Équipe',
    subtitle: 'Rollout playbook: from pilot to org-wide adoption with metrics.',
    audience: 'Tech leads & managers',
    pages: 48,
    pagesEn: 44,
    tags: ['team', 'adoption', 'management', 'rollout'],
    gated: true,
    formats: ['pdf', 'epub'],
    hashedFileFr: '05-equipe.fr.v3.44.1.ed954dc94afd.pdf',
    hashedFileEn: '05-team.en.v3.44.1.849e6c3b162e.pdf',
    slugFr: '05-equipe',
    slugEn: '05-team',
  },
  {
    num: '06',
    titleEn: 'Privacy & Compliance',
    titleFr: 'Privacy & Conformité',
    subtitle: 'GDPR, data flows, and compliance checklist for regulated environments.',
    audience: 'Compliance & legal',
    pages: 34,
    pagesEn: 32,
    tags: ['privacy', 'gdpr', 'compliance', 'data'],
    gated: true,
    formats: ['pdf', 'epub'],
    hashedFileFr: '06-privacy.fr.v3.44.1.88762e2fc16f.pdf',
    hashedFileEn: '06-privacy.en.v3.44.1.ecc7466cba22.pdf',
    slugFr: '06-privacy',
    slugEn: '06-privacy',
  },
  {
    num: '07',
    titleEn: 'Condensed Reference Guide',
    titleFr: 'Guide de Référence Condensé',
    subtitle: 'Dense cheat book: every command, flag, and pattern in one place.',
    audience: 'All levels',
    pages: 76,
    pagesEn: 85,
    tags: ['reference', 'commands', 'cheatsheet', 'dense'],
    gated: true,
    badge: 'Popular',
    formats: ['pdf', 'epub'],
    hashedFileFr: '07-guide-reference.fr.v3.44.1.9c9bb07d022b.pdf',
    hashedFileEn: '07-reference-guide.en.v3.44.1.4404334c55a8.pdf',
    slugFr: '07-guide-reference',
    slugEn: '07-reference-guide',
  },
  {
    num: '08',
    titleEn: 'Agent Teams & Sub-Agents',
    titleFr: "Teams d'Agents & Sub-Agents",
    subtitle: 'Orchestration patterns for parallel multi-agent workflows.',
    audience: 'Advanced developers',
    pages: 50,
    pagesEn: 73,
    tags: ['agents', 'multi-agent', 'orchestration', 'parallel'],
    gated: true,
    formats: ['pdf', 'epub'],
    hashedFileFr: '08-agent-teams.fr.v3.44.1.b58d168855b3.pdf',
    hashedFileEn: '08-agent-teams.en.v3.44.1.f189d555e3d2.pdf',
    slugFr: '08-agent-teams',
    slugEn: '08-agent-teams',
  },
  {
    num: '09',
    titleEn: 'Learning with AI (UVAL)',
    titleFr: "Apprendre avec l'IA (UVAL)",
    subtitle: 'The UVAL method: structure AI-assisted practice and check retained understanding.',
    audience: 'Learners & coaches',
    pages: 46,
    pagesEn: 42,
    tags: ['learning', 'uval', 'pedagogy', 'ai-tutor'],
    gated: true,
    formats: ['pdf', 'epub'],
    hashedFileFr: '09-apprendre-avec-ia.fr.v3.44.1.2c752d403a8d.pdf',
    hashedFileEn: '09-learning-with-ai.en.v3.44.1.8d88dca4f318.pdf',
    slugFr: '09-apprendre-avec-ia',
    slugEn: '09-learning-with-ai',
  },
  {
    num: '10',
    titleEn: 'AI Budget & ROI',
    titleFr: 'Budget IA & ROI',
    subtitle: 'Token cost models, ROI calculation, and budget justification templates.',
    audience: 'CTOs & decision-makers',
    pages: 26,
    pagesEn: 26,
    tags: ['roi', 'budget', 'cost', 'management'],
    gated: true,
    formats: ['pdf', 'epub'],
    hashedFileFr: '10-budget-ia.fr.v3.44.1.c55da2054811.pdf',
    hashedFileEn: '10-ai-budget.en.v3.44.1.67986a5cec36.pdf',
    slugFr: '10-budget-ia',
    slugEn: '10-ai-budget',
  },
  {
    num: '11',
    titleEn: 'Team Metrics in the AI Era',
    titleFr: "Piloter une Équipe à l'Ère de l'IA",
    subtitle: 'DORA, SPACE, and accepted delivery outcomes for AI-assisted teams.',
    audience: 'Engineering Managers, Tech Leads, CTOs',
    pages: 37,
    pagesEn: 35,
    tags: ['metrics', 'dora', 'space', 'management', 'team'],
    gated: true,
    badge: 'New',
    formats: ['pdf', 'epub'],
    hashedFileFr: '11-team-metrics.fr.v3.44.1.9b3895c78905.pdf',
    hashedFileEn: '11-team-metrics.en.v3.44.1.6255f0f2b16c.pdf',
    slugFr: '11-team-metrics',
    slugEn: '11-team-metrics',
  },
  {
    num: '12',
    titleEn: 'Software Engineering in the Age of Autonomous Agents',
    titleFr: "L'Ingénierie Logicielle à l'Ère des Agents Autonomes",
    subtitle: 'Harnesses, agentic CI/CD, and honest productivity measurement.',
    audience: 'Tech leads & staff engineers',
    pages: 39,
    pagesEn: 27,
    tags: ['agents', 'harness', 'loop', 'graph', 'cicd', 'productivity'],
    gated: true,
    badge: 'New',
    formats: ['pdf', 'epub'],
    hashedFileFr: '12-agent-engineering.fr.v3.44.1.ac215b399827.pdf',
    hashedFileEn: '12-agent-engineering.en.v3.44.1.fec57a194714.pdf',
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
