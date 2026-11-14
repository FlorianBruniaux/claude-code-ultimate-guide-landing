import { readFileSync, statSync } from 'node:fs'
import { resolve, sep } from 'node:path'

// Same root as resolve-doc-link.ts: import.meta.url points into the bundle once Astro builds the page.
const DEFAULT_ROOT = resolve(process.cwd(), '../claude-code-ultimate-guide/examples')
const MAX_BYTES = 200_000

export type ExampleSource = { content: string; skipped?: undefined } | { content?: undefined; skipped: string }

/** Reads a template file from the guide repo at build time. Never throws: a problem returns `skipped`. */
export function readExampleSource(path: string, root: string = DEFAULT_ROOT): ExampleSource {
  if (path.endsWith('/')) return { skipped: 'directory' }
  const base = resolve(root)
  const full = resolve(base, path)
  if (!full.startsWith(base + sep)) return { skipped: 'outside examples root' }
  try {
    const stat = statSync(full)
    if (!stat.isFile()) return { skipped: 'not a file' }
    if (stat.size > MAX_BYTES) return { skipped: 'too large' }
    const buf = readFileSync(full)
    if (buf.includes(0)) return { skipped: 'binary' }
    return { content: buf.toString('utf8') }
  } catch {
    return { skipped: 'missing' }
  }
}
