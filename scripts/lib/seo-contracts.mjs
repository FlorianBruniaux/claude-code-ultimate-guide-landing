import { readdirSync, readFileSync } from 'node:fs'
import { extname, join, relative } from 'node:path'

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

function renderedHtml(html) {
  return html
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<(script|style|template)\b[^>]*>[\s\S]*?<\/\1\s*>/gi, '')
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

export function checkBuiltSeo({ distDir, routes = AUDITED_ROUTES }) {
  const failures = []

  for (const route of routes) {
    const path = pagePath(distDir, route)
    let html

    try {
      html = readFileSync(path, 'utf8')
    }
    catch {
      failures.push(`${route}: missing rendered page at ${relative(distDir, path)}`)
      continue
    }

    const h1Count = renderedHtml(html).match(/<h1(?:\s|>)/gi)?.length ?? 0
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

  for (const { path, xml } of sitemapContents) {
    if (xml.includes(LEGACY_RELEASE_URL)) {
      failures.push(`sitemap: legacy release URL appears in ${relative(distDir, path)}`)
    }
  }

  for (const path of textArtifactFiles(distDir)) {
    if (readFileSync(path, 'utf8').includes('http://cc.bruniaux.com')) {
      failures.push(`artifact: insecure internal URL appears in ${relative(distDir, path)}`)
    }
  }

  return failures
}
