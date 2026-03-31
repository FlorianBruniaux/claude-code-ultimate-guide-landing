/**
 * Whitepapers & Ebooks data
 * 11 whitepapers, FR + EN, PDF + EPUB
 *
 * PDFs hosted on Vercel (florian.bruniaux.com/guides/).
 * Hashed filenames prevent brute-force discovery — the API (portfolio) validates
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

const V = 'v3.34.1'

export const WHITEPAPERS: Whitepaper[] = [
  {
    num: '00',
    titleEn: 'Introduction & Fundamentals',
    titleFr: 'Introduction & Fondamentaux',
    subtitle: 'From zero to productive in a day — the complete Claude Code primer.',
    audience: 'Everyone',
    pages: 32,
    tags: ['foundations', 'setup', 'beginner'],
    gated: false,
    badge: 'Open',
    formats: ['pdf', 'epub'],
    hashedFileFr: `00-introduction-serie.fr.${V}.259336ab82f3.pdf`,
    hashedFileEn: `00-series-introduction.en.${V}.3e37cf3e1495.pdf`,
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
    hashedFileFr: `01-prompts-efficaces.fr.${V}.2d4856102628.pdf`,
    hashedFileEn: `01-effective-prompts.en.${V}.4f2430b99b03.pdf`,
    slugFr: '01-prompts-efficaces',
    slugEn: '01-effective-prompts',
  },
  {
    num: '02',
    titleEn: 'Customization & Configuration',
    titleFr: 'Personnalisation & Configuration',
    subtitle: 'CLAUDE.md, hooks, MCP, and settings — the full configuration system.',
    audience: 'Intermediate–Advanced',
    pages: 44,
    tags: ['config', 'hooks', 'mcp', 'claude.md'],
    gated: true,
    formats: ['pdf', 'epub'],
    hashedFileFr: `02-personnalisation.fr.${V}.5d8eafb99c38.pdf`,
    hashedFileEn: `02-customization.en.${V}.b03e3cd5232c.pdf`,
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
    hashedFileFr: `03-securite.fr.${V}.8e56bb81bb3e.pdf`,
    hashedFileEn: `03-security.en.${V}.b1bb8c9d739a.pdf`,
    slugFr: '03-securite',
    slugEn: '03-security',
  },
  {
    num: '04',
    titleEn: 'Internal Architecture',
    titleFr: 'Architecture Interne',
    subtitle: 'How Claude Code works under the hood — tool loop, context, and pipeline.',
    audience: 'Senior developers',
    pages: 44,
    tags: ['architecture', 'internals', 'advanced'],
    gated: true,
    comingSoon: true,
    formats: ['pdf', 'epub'],
    hashedFileFr: '',
    hashedFileEn: '',
    slugFr: '04-architecture',
    slugEn: '04-architecture',
  },
  {
    num: '05',
    titleEn: 'Team Adoption',
    titleFr: 'Adoption en Équipe',
    subtitle: 'Rollout playbook — from pilot to org-wide adoption with metrics.',
    audience: 'Tech leads & managers',
    pages: 52,
    tags: ['team', 'adoption', 'management', 'rollout'],
    gated: true,
    formats: ['pdf', 'epub'],
    hashedFileFr: `05-equipe.fr.${V}.03736ba9500e.pdf`,
    hashedFileEn: `05-team.en.${V}.0c2ef348b7c7.pdf`,
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
    comingSoon: true,
    formats: ['pdf', 'epub'],
    hashedFileFr: '',
    hashedFileEn: '',
    slugFr: '06-privacy',
    slugEn: '06-privacy',
  },
  {
    num: '07',
    titleEn: 'Condensed Reference Guide',
    titleFr: 'Guide de Référence Condensé',
    subtitle: 'Dense cheat book — every command, flag, and pattern in one place.',
    audience: 'All levels',
    pages: 80,
    tags: ['reference', 'commands', 'cheatsheet', 'dense'],
    gated: true,
    badge: 'Popular',
    formats: ['pdf', 'epub'],
    hashedFileFr: `07-guide-reference.fr.${V}.7393c6199e3e.pdf`,
    hashedFileEn: `07-reference-guide.en.${V}.9cfe2b521803.pdf`,
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
    hashedFileFr: `08-agent-teams.fr.${V}.8ba00540dba0.pdf`,
    hashedFileEn: `08-agent-teams.en.${V}.ac659226da71.pdf`,
    slugFr: '08-agent-teams',
    slugEn: '08-agent-teams',
  },
  {
    num: '09',
    titleEn: 'Learning with AI (UVAL)',
    titleFr: "Apprendre avec l'IA (UVAL)",
    subtitle: 'The UVAL method — using AI as a personalized learning accelerator.',
    audience: 'Learners & coaches',
    pages: 40,
    tags: ['learning', 'uval', 'pedagogy', 'ai-tutor'],
    gated: true,
    comingSoon: true,
    formats: ['pdf', 'epub'],
    hashedFileFr: '',
    hashedFileEn: '',
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
    comingSoon: true,
    formats: ['pdf', 'epub'],
    hashedFileFr: '',
    hashedFileEn: '',
    slugFr: '10-budget-ia',
    slugEn: '10-ai-budget',
  },
]

export const TOTAL_PAGES = WHITEPAPERS.reduce((sum, wp) => sum + wp.pages, 0)
export const FREE_WPS = WHITEPAPERS.filter(wp => !wp.gated)
export const GATED_WPS = WHITEPAPERS.filter(wp => wp.gated)

/** Base URL for hashed PDFs on Vercel (overridable via PUBLIC_PDF_BASE env var) */
export const PDF_BASE_URL = import.meta.env.PUBLIC_PDF_BASE ?? 'https://florian.bruniaux.com/guides'
