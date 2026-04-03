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

const V = 'v3.38.3'

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
    hashedFileFr: `00-introduction-serie.fr.${V}.0e09c8fcb773.pdf`,
    hashedFileEn: `00-series-introduction.en.${V}.975de2113f56.pdf`,
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
    hashedFileFr: `01-prompts-efficaces.fr.${V}.35d8acb71dd6.pdf`,
    hashedFileEn: `01-effective-prompts.en.${V}.1a5fb293d1a6.pdf`,
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
    hashedFileFr: `02-personnalisation.fr.${V}.97773b8f7954.pdf`,
    hashedFileEn: `02-customization.en.${V}.ee8b75508554.pdf`,
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
    hashedFileFr: `03-securite.fr.${V}.bb184f35c851.pdf`,
    hashedFileEn: `03-security.en.${V}.df156645a43d.pdf`,
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
    hashedFileFr: `05-equipe.fr.${V}.29aa72bec84e.pdf`,
    hashedFileEn: `05-team.en.${V}.371b221e993f.pdf`,
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
    hashedFileFr: `07-guide-reference.fr.${V}.2ddc769b00a2.pdf`,
    hashedFileEn: `07-reference-guide.en.${V}.859d6e35c23d.pdf`,
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
    hashedFileFr: `08-agent-teams.fr.${V}.cad3826229da.pdf`,
    hashedFileEn: `08-agent-teams.en.${V}.b7ec4947929c.pdf`,
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
    formats: ['pdf', 'epub'],
    hashedFileFr: `09-apprendre-avec-ia.fr.${V}.037417d7c846.pdf`,
    hashedFileEn: `09-learning-with-ai.en.${V}.22e7c48689da.pdf`,
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
