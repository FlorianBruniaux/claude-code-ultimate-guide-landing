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
          label: 'Core Guides',
          // Dynamic items: only flat .md files in guide/ (no subdirectories, no index).
          // autogenerate.exclude is unreliable for subdirectory groups in Starlight 0.37.x.
          items: getCoreGuideItems(),
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
        if (item.url === 'https://cc.bruniaux.com/') {
          return { ...item, priority: 1.0, changefreq: 'weekly' }
        }
        if (item.url.includes('/quiz/')) {
          return { ...item, priority: 0.9, changefreq: 'monthly' }
        }
        if (
          item.url.includes('/learning/') ||
          item.url.includes('/security/')
        ) {
          return { ...item, priority: 0.85, changefreq: 'weekly' }
        }
        if (
          item.url.includes('/cheatsheet/') ||
          item.url.includes('/examples/') ||
          item.url.includes('/faq/') ||
          item.url.includes('/compare/') ||
          item.url.includes('/releases/')
        ) {
          return { ...item, priority: 0.8, changefreq: 'monthly' }
        }
        if (item.url.includes('/guide/')) {
          return { ...item, priority: 0.85, changefreq: 'weekly' }
        }
        return { ...item, priority: 0.7, changefreq: 'monthly' }
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
