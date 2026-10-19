import { readdirSync, readFileSync } from 'node:fs'
import { join, relative } from 'node:path'

// Sitemap lastmod for generated guide pages. prepare-guide-content.mjs writes
// each page's source git date as `lastUpdated`; the sitemap reads it back here
// so guide URLs stop sharing the build date.

function slugSegment(segment) {
  return segment.toLowerCase().replace(/[^\p{L}\p{N}\s_-]/gu, '').replace(/\s/g, '-')
}

export function guideRouteFromFile(relativePath) {
  const segments = relativePath.replaceAll('\\', '/').replace(/\.mdx?$/, '').split('/')
  if (segments.at(-1) === 'index') segments.pop()
  return `/${segments.map(slugSegment).join('/')}/`
}

function frontmatterLastUpdated(source) {
  const block = source.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1]
  return block?.match(/^lastUpdated:\s*["']?(\d{4}-\d{2}-\d{2})["']?\s*$/m)?.[1]
}

function markdownFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) return markdownFiles(path)
    return /\.mdx?$/.test(entry.name) ? [path] : []
  })
}

export function readGuideLastmods(docsDir) {
  const dates = new Map()
  let files
  try {
    files = markdownFiles(join(docsDir, 'guide'))
  }
  catch {
    return dates
  }
  for (const file of files) {
    const date = frontmatterLastUpdated(readFileSync(file, 'utf8'))
    if (date) dates.set(guideRouteFromFile(relative(docsDir, file)), date)
  }
  return dates
}
