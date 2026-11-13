/**
 * Heading ids exactly as Astro renders them for Starlight pages.
 *
 * Astro's rehype-collect-headings gives each heading the github-slugger slug of
 * its text content, deduplicated per page (`-1`, `-2`...), and drops one
 * trailing hyphen. Search entries and links that point into a guide page must
 * use the same rule, or they land on the top of the page (CX-01).
 *
 * github-slugger is resolved through Astro's own markdown package so the
 * version always matches the one that renders the pages.
 */
import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'
import { pathToFileURL } from 'node:url'

// pnpm layout: astro's dependencies are its siblings in the virtual store.
// createRequire only needs a file path, so package `exports` maps do not apply.
const requireFromRoot = createRequire(new URL('../../package.json', import.meta.url))
const astroDir = dirname(requireFromRoot.resolve('astro/package.json'))
const markdownDir = join(astroDir, '..', '@astrojs', 'markdown-remark')
const sluggerPath = createRequire(join(markdownDir, 'package.json')).resolve('github-slugger')
const { default: GithubSlugger } = await import(pathToFileURL(sluggerPath).href)

/** Visible text of a Markdown heading: inline code, links, emphasis and HTML reduced to their text. */
export function headingText(markdown) {
  // Code spans are literal: `<claude-code-hint />` keeps its angle brackets.
  return markdown
    .replace(/\s+#+\s*$/, '') // closing ATX hashes
    .split(/(`+[^`]*`+)/)
    .map((part, i) => (i % 2 === 1 ? part.replace(/^`+|`+$/g, '') : inlineText(part)))
    .join('')
    .trim()
}

function inlineText(markdown) {
  return markdown
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1') // images keep their alt text
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // links keep their label
    .replace(/<[^>]+>/g, '') // inline HTML tags
    .replace(/(\*\*|__)(.+?)\1/g, '$2') // bold
    .replace(/(^|[^\w*])[*_]([^*_]+)[*_](?=[^\w*]|$)/g, '$1$2') // italic
    .replace(/~~(.+?)~~/g, '$1')
    .replace(/\\([\\`*_{}[\]()#+\-.!|<>~])/g, '$1') // Markdown escapes
    .replace(/&amp;/g, '&')
}

// Same suffix as plugins/remark-heading-ids.mjs: `### Title {#custom-id}`.
const CUSTOM_ID = /\s*\{#([A-Za-z0-9][\w-]*)\}\s*$/

/** Heading text without a `{#custom-id}` suffix. */
export function stripCustomId(markdownHeading) {
  return markdownHeading.replace(CUSTOM_ID, '')
}

/** A per-page slugger: call it on every heading of the page, in document order. */
export function createHeadingSlugger() {
  const slugger = new GithubSlugger()
  return (markdownHeading) => {
    // An explicit id is kept by Astro and never goes through the slugger.
    const custom = markdownHeading.match(CUSTOM_ID)
    if (custom) return custom[1]
    // Astro turns `{` into `${` in plain text before slugging; both are removed by the slugger.
    let slug = slugger.slug(headingText(markdownHeading))
    if (slug.endsWith('-')) slug = slug.slice(0, -1)
    return slug
  }
}

/**
 * Every id a generated Markdown page will expose: heading ids in document
 * order, plus explicit `id="..."` attributes of raw HTML (chapter spans).
 */
export function headingIds(markdown) {
  const slug = createHeadingSlugger()
  const ids = new Set()
  let fenceMarker = ''
  const body = markdown.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '')
  for (const line of body.split(/\r?\n/)) {
    const fence = line.match(/^ {0,3}(`{3,}|~{3,})(.*)$/)
    if (fence) {
      if (!fenceMarker) fenceMarker = fence[1]
      else if (fence[1][0] === fenceMarker[0] && fence[1].length >= fenceMarker.length && fence[2].trim() === '') fenceMarker = ''
      continue
    }
    if (fenceMarker) continue
    const heading = line.match(/^ {0,3}#{1,6}\s+(.+?)\s*$/)
    if (heading) ids.add(slug(heading[1]))
    for (const m of line.matchAll(/\sid="([^"]+)"/g)) ids.add(m[1])
  }
  return ids
}
