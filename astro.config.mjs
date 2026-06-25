import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import partytown from '@astrojs/partytown'
import { remarkGuideLinks } from './plugins/remark-guide-links.mjs'
import { readdirSync, existsSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Per-page lastmod dates for key landing pages.
// Guide pages (140+) are omitted, they rebuild together and all share the build date.
const PAGE_DATES = {
  'https://cc.bruniaux.com/': '2026-06-19',
  'https://cc.bruniaux.com/cheatsheet/': '2026-05-03',
  'https://cc.bruniaux.com/faq/': '2026-06-08',
  'https://cc.bruniaux.com/releases/': '2026-06-25',
  'https://cc.bruniaux.com/examples/': '2026-06-08',
  'https://cc.bruniaux.com/quiz/': '2026-06-08',
  'https://cc.bruniaux.com/security/': '2026-06-18',
  'https://cc.bruniaux.com/ecosystem/': '2026-03-13',
  'https://cc.bruniaux.com/methodologies/': '2026-04-01',
  'https://cc.bruniaux.com/learning/': '2026-04-15',
  'https://cc.bruniaux.com/team-metrics/': '2026-05-01',
  'https://cc.bruniaux.com/context-engineering/': '2026-05-15',
}

/**
 * Generate sidebar items for "Core Guides" by reading only the flat .md files
 * in src/content/docs/guide/ — excludes index.md and subdirectories.
 * Falls back to empty array if content hasn't been generated yet.
 */
function getCoreGuideItems() {
  const guideDir = resolve(__dirname, 'src/content/docs/guide')
  if (!existsSync(guideDir)) return []
  return readdirSync(guideDir)
    .filter(f => f.endsWith('.md') && f !== 'index.md')
    .sort()
    .map(f => ({ slug: `guide/${f.replace('.md', '')}` }))
}

export default defineConfig({
  site: 'https://cc.bruniaux.com',
  trailingSlash: 'always',

  redirects: {
    // Security section path change
    '/guide/security/security-hardening/': '/guide/security-hardening/',
    '/guide/security/data-privacy/': '/guide/data-privacy/',

    // Architecture path change
    '/guide/core/architecture/': '/guide/architecture/',

    // Workflow pages moved from /guide/{slug}/ to /guide/workflows/{slug}/
    '/guide/code-review/': '/guide/workflows/code-review/',
    '/guide/github-actions/': '/guide/workflows/github-actions/',
    '/guide/exploration-workflow/': '/guide/workflows/exploration-workflow/',
    '/guide/task-management/': '/guide/workflows/task-management/',
    '/guide/plan-pipeline/': '/guide/workflows/plan-pipeline/',
    '/guide/agent-teams-quick-start/': '/guide/workflows/agent-teams-quick-start/',
    '/guide/iterative-refinement/': '/guide/workflows/iterative-refinement/',
    '/guide/tdd-with-claude/': '/guide/workflows/tdd-with-claude/',
    '/guide/dual-instance-planning/': '/guide/workflows/dual-instance-planning/',
    '/guide/search-tools-cheatsheet/': '/guide/workflows/search-tools-mastery/',
    '/guide/search-tools-mastery/': '/guide/workflows/search-tools-mastery/',

    // Example files linked as guide pages → redirect to examples or parent section
    '/guide/git-worktree/': '/examples/',
    '/guide/git-worktree-status/': '/examples/',
    '/guide/git-worktree-remove/': '/examples/',
    '/guide/git-worktree-clean/': '/examples/',
    '/guide/tdd-workflow/': '/guide/workflows/tdd-with-claude/',
    '/guide/database-branch-setup/': '/guide/workflows/',

    // Supplementary docs not published as standalone pages → nearest section
    '/guide/audit-prompt/': '/guide/adoption-approaches/',
    '/guide/015-everything-claude-code-github-repo/': '/guide/ultimate-guide/11-ai-ecosystem/',
    '/guide/ultimate-guide/09-advanced-patterns/workflows/': '/guide/ultimate-guide/09-advanced-patterns/',
    '/guide/anthropic-2026-agentic-coding-trends/': '/guide/ultimate-guide/09-advanced-patterns/',
    '/guide/06-development-workflows/': '/guide/ultimate-guide/09-advanced-patterns/',
    '/guide/agents-md-empirical-study-2602-11988/': '/guide/ultimate-guide/09-advanced-patterns/',

    // Short command aliases → cheatsheet
    '/undo/': '/cheatsheet/',
    '/tui/': '/cheatsheet/',
    '/clear/': '/cheatsheet/',

    // Old URL formats
    '/quiz.html': '/quiz/',
    '/changelog/': '/releases/',

    // Cannibalisation fix: /guide/claude-code-releases/ → /releases/ (canonical winner)
    '/guide/claude-code-releases/': '/releases/',

    // Missing workflow pages (not yet in redirect list)
    '/guide/event-driven-agents/': '/guide/workflows/event-driven-agents/',
    '/guide/spec-first/': '/guide/workflows/spec-first/',
    '/guide/changelog-fragments/': '/guide/workflows/changelog-fragments/',

    // Old ecosystem URL structure
    '/guide/ecosystem/context-engineering-tools/': '/guide/context-engineering-tools/',

    // Old numbered URL structure (pre-Starlight migration)
    '/guide/02-core-loop/': '/guide/ultimate-guide/02-core-workflow/',
    '/guide/04-agents/': '/guide/ultimate-guide/04-agents/',
    '/guide/04-architecture-internals/': '/guide/architecture/',
    '/guide/06-hooks/': '/guide/ultimate-guide/07-hooks/',
    '/guide/07-advanced/': '/guide/ultimate-guide/09-advanced-patterns/',

    // Non-existent role pages → roles section
    '/guide/security-auditor/': '/roles/',
    '/guide/security-patcher/': '/roles/',

    // Non-existent guide pages → nearest relevant section
    '/guide/watch-list/': '/guide/',
    '/guide/security-checklist/': '/guide/security-hardening/',
    '/guide/README/': '/guide/',

    // Short alias without trailing slash (GitHub Pages static: no auto-redirect to trailing slash)
    '/undo': '/cheatsheet/',
    '/tui': '/cheatsheet/',
    '/clear': '/cheatsheet/',
    '/focus': '/cheatsheet/',
    '/focus/': '/cheatsheet/',

    // /ultrareview is a deprecated slash-command alias → releases page
    '/ultrareview': '/releases/',

    // 404 fixes (GSC batch inspection, 2026-06-25)
    '/guide/team-knowledge-infrastructure/': '/guide/team-knowledge-base/',
    '/guide/claude-md-best-practices/': '/claude-md-best-practices/',

    // Cannibalization fixes: guide sub-pages vs standalone landing pages
    '/guide/ai-roles/': '/roles/',
    '/guide/context-engineering/': '/context-engineering/',
    '/guide/ai-ecosystem/': '/ecosystem/',
  },

  integrations: [
    starlight({
      title: 'Claude Code Guide',
      description: 'The Ultimate Claude Code Guide — comprehensive documentation for Claude Code power users.',
      disable404Route: true,
      customCss: [
        './src/styles/global.css',
        './src/styles/components.css',
        './src/styles/starlight-overrides.css',
      ],
      components: {
        Head: './src/components/starlight/Head.astro',
        Header: './src/components/starlight/Header.astro',
        Footer: './src/components/starlight/Footer.astro',
      },
      head: [
        {
          // Sync our localStorage 'theme' key with Starlight's 'starlight-theme' key
          // so both systems respect the user's dark/light preference.
          tag: 'script',
          attrs: {},
          content: `(function(){var t=localStorage.getItem('theme')||'dark';document.documentElement.setAttribute('data-theme',t);localStorage.setItem('starlight-theme',t);})();`,
        },
      ],
      sidebar: [
        {
          label: 'Ultimate Guide',
          autogenerate: { directory: 'guide/ultimate-guide' },
        },
        {
          label: 'Core Reference',
          items: [
            { slug: 'guide/cheatsheet' },
            { slug: 'guide/architecture' },
            { slug: 'guide/methodologies' },
            { slug: 'guide/visual-reference' },
            { slug: 'guide/claude-code-releases' },
            { slug: 'guide/known-issues' },
          ],
        },
        {
          label: 'Security',
          items: [
            { slug: 'guide/security-hardening' },
            { slug: 'guide/sandbox-isolation' },
            { slug: 'guide/sandbox-native' },
            { slug: 'guide/production-safety' },
            { slug: 'guide/data-privacy' },
          ],
        },
        {
          label: 'Ecosystem',
          items: [
            { slug: 'guide/ai-ecosystem' },
            { slug: 'guide/mcp-servers-ecosystem' },
            { slug: 'guide/third-party-tools' },
            { slug: 'guide/remarkable-ai' },
          ],
        },
        {
          label: 'Roles & Adoption',
          items: [
            { slug: 'guide/ai-roles' },
            { slug: 'guide/adoption-approaches' },
            { slug: 'guide/learning-with-ai' },
            { slug: 'guide/agent-evaluation' },
          ],
        },
        {
          label: 'Operations',
          items: [
            { slug: 'guide/devops-sre' },
            { slug: 'guide/observability' },
            { slug: 'guide/ai-traceability' },
          ],
        },
        {
          label: 'Workflows',
          autogenerate: { directory: 'guide/workflows' },
        },
      ],
    }),
    tailwind({ applyBaseStyles: false }),
    sitemap({
      serialize(item) {
        if (item.url.includes('/sitemap/')) return undefined
        if (item.url.includes('/ultimate-guidefr/')) return undefined

        const normalizedUrl = item.url.endsWith('/') ? item.url : item.url + '/'
        const lastmod = PAGE_DATES[normalizedUrl] ?? new Date().toISOString().split('T')[0]

        if (item.url === 'https://cc.bruniaux.com/') {
          return { ...item, priority: 1.0, changefreq: 'weekly', lastmod }
        }
        if (item.url.includes('/quiz/')) {
          return { ...item, priority: 0.9, changefreq: 'monthly', lastmod }
        }
        if (
          item.url.includes('/learning/') ||
          item.url.includes('/security/') ||
          item.url.includes('/diagrams/')
        ) {
          return { ...item, priority: 0.85, changefreq: 'weekly', lastmod }
        }
        if (
          item.url.includes('/cheatsheet/') ||
          item.url.includes('/examples/') ||
          item.url.includes('/faq/') ||
          item.url.includes('/compare/') ||
          item.url.includes('/releases/')
        ) {
          return { ...item, priority: 0.8, changefreq: 'monthly', lastmod }
        }
        if (item.url.includes('/guide/')) {
          return { ...item, priority: 0.85, changefreq: 'weekly', lastmod }
        }
        return { ...item, priority: 0.7, changefreq: 'monthly', lastmod }
      },
    }),
    partytown({
      config: {
        forward: ['dataLayer.push'],
      },
    }),
  ],

  markdown: {
    remarkPlugins: [remarkGuideLinks],
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
    },
  },
})
