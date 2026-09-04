import { readdirSync, readFileSync } from 'node:fs'
import { extname, join, relative } from 'node:path'
import { LATEST_CLAUDE_CODE_RELEASE_DATE_ISO } from '../../src/data/seo-editorial-contract.mjs'

const SITE_ORIGIN = 'https://cc.bruniaux.com'
const LEGACY_RELEASE_URL = `${SITE_ORIGIN}/guide/claude-code-releases/`
const TEXT_ARTIFACT_EXTENSIONS = new Set([
  '.css',
  '.html',
  '.js',
  '.json',
  '.map',
  '.svg',
  '.txt',
  '.webmanifest',
  '.xml',
])

export const AUDITED_ROUTES = [
  '/guide/agent-harness/',
  '/guide/architecture/',
  '/guide/data-privacy/',
  '/guide/hooks-events-reference/',
  '/guide/third-party-tools/',
  '/releases/',
  '/glossary/',
  '/context-engineering/',
]

function attribute(tag, name) {
  const match = tag.match(new RegExp(`\\b${name}\\s*=\\s*(["'])([\\s\\S]*?)\\1`, 'i'))
  return match?.[2]
}

function renderedText(value) {
  return value
    .replace(/<[^>]*>/g, '')
    .replace(/&#(x[\da-f]+|\d+);/gi, (_, entity) => String.fromCodePoint(entity.startsWith('x')
      ? Number.parseInt(entity.slice(1), 16)
      : Number.parseInt(entity, 10)))
    .replace(/&(amp|apos|gt|lt|quot);/gi, (_, entity) => ({
      amp: '&',
      apos: "'",
      gt: '>',
      lt: '<',
      quot: '"',
    })[entity.toLowerCase()])
    .replace(/\s+/g, ' ')
    .trim()
}

function canonicalHref(html) {
  const canonicalTag = html.match(/<link\b[^>]*>/gi)?.find((tag) => {
    const rel = attribute(tag, 'rel')
    return rel?.split(/\s+/).some((value) => value.toLowerCase() === 'canonical')
  })

  return canonicalTag ? attribute(canonicalTag, 'href') : undefined
}

function metaDescription(html) {
  const descriptionTag = html.match(/<meta\b[^>]*>/gi)?.find((tag) => attribute(tag, 'name')?.toLowerCase() === 'description')
  return descriptionTag ? attribute(descriptionTag, 'content') : undefined
}

function title(html) {
  return html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1]
}

function inspectRenderedDocument(html, route) {
  const inertDepth = { script: 0, style: 0, template: 0 }
  let h1Count = 0
  let isRedirectDocument = false
  let legacyReleaseHref = false

  for (const match of html.matchAll(/<!--[\s\S]*?-->|<\/?[a-zA-Z][^>]*>/g)) {
    const tag = match[0]
    if (tag.startsWith('<!--')) continue

    const tagMatch = tag.match(/^<\s*(\/?)\s*([a-zA-Z][\w:-]*)/)
    if (!tagMatch) continue
    const closing = tagMatch[1] === '/'
    const name = tagMatch[2].toLowerCase()

    if (Object.hasOwn(inertDepth, name)) {
      inertDepth[name] = Math.max(0, inertDepth[name] + (closing ? -1 : 1))
      continue
    }
    if (Object.values(inertDepth).some((depth) => depth > 0) || closing) continue

    if (name === 'h1') {
      h1Count++
    }

    if (name === 'meta' && attribute(tag, 'http-equiv')?.toLowerCase() === 'refresh') isRedirectDocument = true

    if (name === 'a') {
      const href = attribute(tag, 'href')
      if (!href) continue
      try {
        if (new URL(href, `${SITE_ORIGIN}${route}`).pathname === '/guide/claude-code-releases/') {
          legacyReleaseHref = true
        }
      }
      catch {
        // Invalid hrefs are outside this SEO contract.
      }
    }
  }

  return { h1Count, isRedirectDocument, legacyReleaseHref }
}

function walkFiles(root) {
  const files = []
  const entries = readdirSync(root, { withFileTypes: true }).sort((left, right) => left.name.localeCompare(right.name))

  for (const entry of entries) {
    const path = join(root, entry.name)
    if (entry.isDirectory()) files.push(...walkFiles(path))
    else if (entry.isFile()) files.push(path)
  }

  return files
}

function pagePath(distDir, route) {
  return join(distDir, route.replace(/^\/+/, ''), 'index.html')
}

function sitemapFiles(distDir) {
  return walkFiles(distDir).filter((path) => /(?:^|\/)sitemap-(?:index|\d+)\.xml$/.test(path))
}

function textArtifactFiles(distDir) {
  return walkFiles(distDir).filter((path) => TEXT_ARTIFACT_EXTENSIONS.has(extname(path).toLowerCase()))
}

function htmlRoute(distDir, path) {
  const relativePath = relative(distDir, path).replaceAll('\\', '/')
  if (relativePath === 'index.html') return '/'
  if (relativePath.endsWith('/index.html')) return `/${relativePath.slice(0, -'index.html'.length)}`
  return `/${relativePath}`
}

function sitemapCalendarDate(value) {
  const match = value.match(/^(\d{4}-\d{2}-\d{2})(?:T00:00:00\.000Z)?$/)
  return match?.[1] ?? value
}

export function checkBuiltSeo({ distDir, routes = AUDITED_ROUTES }) {
  const failures = []
  const auditedPagePaths = new Set()

  for (const route of routes) {
    const path = pagePath(distDir, route)
    auditedPagePaths.add(path)
    let html

    try {
      html = readFileSync(path, 'utf8')
    }
    catch {
      failures.push(`${route}: missing rendered page at ${relative(distDir, path)}`)
      continue
    }

    const { h1Count } = inspectRenderedDocument(html, route)
    if (h1Count !== 1) failures.push(`${route}: expected exactly one rendered H1, found ${h1Count}`)

    const expectedCanonical = `${SITE_ORIGIN}${route}`
    const actualCanonical = canonicalHref(html)
    if (actualCanonical !== expectedCanonical) {
      failures.push(`${route}: expected HTTPS self-canonical ${expectedCanonical}, found ${actualCanonical ?? 'none'}`)
    }

    const pageTitle = renderedText(title(html) ?? '')
    if (pageTitle.length < 30 || pageTitle.length > 60) {
      failures.push(`${route}: title length ${pageTitle.length} is outside 30-60 characters`)
    }

    const description = renderedText(metaDescription(html) ?? '')
    if (description.length < 50 || description.length > 160) {
      failures.push(`${route}: description length ${description.length} is outside 50-160 characters`)
    }
  }

  const sitemaps = sitemapFiles(distDir)
  const sitemapContents = sitemaps.map((path) => ({ path, xml: readFileSync(path, 'utf8') }))
  const releaseEntries = sitemapContents.reduce(
    (count, { xml }) => count + (xml.match(/<loc>\s*https:\/\/cc\.bruniaux\.com\/releases\/\s*<\/loc>/g)?.length ?? 0),
    0,
  )
  if (releaseEntries !== 1) failures.push(`sitemap: expected exactly one /releases/ entry, found ${releaseEntries}`)

  const releaseLastmods = sitemapContents.flatMap(({ xml }) => (
    Array.from(xml.matchAll(/<url>\s*([\s\S]*?)\s*<\/url>/g))
      .filter(([, entry]) => /<loc>\s*https:\/\/cc\.bruniaux\.com\/releases\/\s*<\/loc>/.test(entry))
      .map(([, entry]) => entry.match(/<lastmod>\s*([^<]+?)\s*<\/lastmod>/)?.[1] ?? 'none')
  ))
  if (releaseLastmods.length === 1 && sitemapCalendarDate(releaseLastmods[0]) !== LATEST_CLAUDE_CODE_RELEASE_DATE_ISO) {
    failures.push(`sitemap: expected /releases/ lastmod ${LATEST_CLAUDE_CODE_RELEASE_DATE_ISO}, found ${releaseLastmods[0]}`)
  }

  for (const { path, xml } of sitemapContents) {
    if (xml.includes(LEGACY_RELEASE_URL)) {
      failures.push(`sitemap: legacy release URL appears in ${relative(distDir, path)}`)
    }
  }

  for (const path of walkFiles(distDir).filter((candidate) => extname(candidate).toLowerCase() === '.html')) {
    const route = htmlRoute(distDir, path)
    const document = inspectRenderedDocument(readFileSync(path, 'utf8'), route)

    if (!auditedPagePaths.has(path) && route.startsWith('/guide/') && !document.isRedirectDocument && document.h1Count !== 1) {
      failures.push(`${route}: expected exactly one rendered H1, found ${document.h1Count}`)
    }

    if (route !== '/guide/claude-code-releases/' && document.legacyReleaseHref) {
      failures.push(`${route}: rendered href targets legacy release route`)
    }
  }

  for (const path of textArtifactFiles(distDir)) {
    if (readFileSync(path, 'utf8').includes('http://cc.bruniaux.com')) {
      failures.push(`artifact: insecure internal URL appears in ${relative(distDir, path)}`)
    }
  }

  return failures
}
