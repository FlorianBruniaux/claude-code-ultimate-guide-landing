import rss from '@astrojs/rss'
import type { APIRoute } from 'astro'
import { releases } from '../data/releases'
import { rssEntries, type RssEntry } from '../data/rss-entries'

// Parse "Mar 19, 2026" → Date
function parseReleaseDate(dateStr: string): Date {
  const d = new Date(dateStr)
  return isNaN(d.getTime()) ? new Date() : d
}

const TYPE_LABELS: Record<RssEntry['type'], string> = {
  guide_release:  'Guide Release',
  new_page:       'New Page',
  new_cheatcard:  'New Recap Card',
  new_whitepaper: 'New Ebook',
  new_section:    'New Section',
}

export const GET: APIRoute = async (context) => {
  // CC releases → RSS items (last 20)
  const ccItems = releases.slice(0, 20).map((release) => ({
    title: `Claude Code ${release.version}`,
    pubDate: parseReleaseDate(release.date),
    description: [
      '<ul>',
      ...release.highlights.map((h) => `<li>${h}</li>`),
      '</ul>',
      ...(release.breaking?.length
        ? [`<p><strong>Breaking changes:</strong></p><ul>`, ...release.breaking.map((b) => `<li>${b}</li>`), `</ul>`]
        : []),
    ].join(''),
    link: `https://cc.bruniaux.com/releases/#${release.version}`,
  }))

  // Guide entries → RSS items
  const guideItems = rssEntries.map((entry) => ({
    title: `[${TYPE_LABELS[entry.type]}] ${entry.title}`,
    pubDate: parseReleaseDate(entry.date),
    description: `<p>${entry.description}</p>`,
    link: entry.link,
  }))

  // Merge and sort by date descending, cap at 50
  const allItems = [...ccItems, ...guideItems]
    .sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime())
    .slice(0, 50)

  return rss({
    title: 'Claude Code Ultimate Guide — Updates',
    description: 'New content, CLI releases, ebooks, recap cards, and guide updates from cc.bruniaux.com.',
    site: context.site!,
    items: allItems,
    customData: `<language>en-us</language>`,
  })
}
