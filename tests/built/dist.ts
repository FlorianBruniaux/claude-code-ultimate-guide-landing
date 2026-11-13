// Helpers for tests that read the built site in dist/ (run `pnpm build` first).
import { existsSync, readFileSync } from 'node:fs'
import { join, resolve } from 'node:path'

export const DIST = resolve(process.env.DIST_DIR ?? 'dist')
export const hasDist = existsSync(join(DIST, 'index.html'))

/** HTML of a built route such as `/guide/` or `/404.html`, or null when absent. */
export function page(route: string): string | null {
  const clean = route.split('#', 1)[0]
  const file = clean.endsWith('.html') ? join(DIST, clean) : join(DIST, clean, 'index.html')
  return existsSync(file) ? readFileSync(file, 'utf8') : null
}

/** Every `id` attribute of a built page, entity-decoded. */
export function ids(html: string): Set<string> {
  return new Set(
    [...html.matchAll(/\sid="([^"]*)"/g)].map((m) =>
      m[1].replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>'),
    ),
  )
}
