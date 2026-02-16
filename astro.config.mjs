import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import partytown from '@astrojs/partytown'

export default defineConfig({
  site: 'https://cc.bruniaux.com',
  trailingSlash: 'always',

  integrations: [
    tailwind(),
    mdx(),
    sitemap({
      serialize(item) {
        if (item.url === 'https://cc.bruniaux.com/') {
          return { ...item, priority: 1.0, changefreq: 'weekly' }
        }
        if (item.url.includes('/quiz/')) {
          return { ...item, priority: 0.9, changefreq: 'monthly' }
        }
        if (item.url.includes('/cheatsheet/') || item.url.includes('/examples/') || item.url.includes('/faq/')) {
          return { ...item, priority: 0.8, changefreq: 'monthly' }
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
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
    },
  },
})
