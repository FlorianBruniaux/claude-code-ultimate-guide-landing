/**
 * build-reference-fs.mjs
 *
 * Generates public/reference-fs.json: the preloaded virtual filesystem for
 * the cheatsheet page's CLI/settings-reference terminal experiment. Splits
 * a handful of dense reference docs (cheatsheet.md, settings-reference.md,
 * hooks-events-reference.md, tools-reference.md — ~2600 lines combined) by
 * H2 heading into one file per section, so grep/find can answer "where is
 * X documented" across docs a visitor would otherwise search by hand.
 *
 * Run: node scripts/build-reference-fs.mjs
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const GUIDE_REPO = resolve(process.env.GUIDE_REPO_PATH ?? resolve(ROOT, '../claude-code-ultimate-guide'))
const OUT_PATH = resolve(ROOT, 'public/reference-fs.json')

const CWD = '/home/user'

// doc slug -> path relative to GUIDE_REPO
const SOURCE_DOCS = {
  cheatsheet: 'guide/cheatsheet.md',
  'settings-reference': 'guide/core/settings-reference.md',
  'hooks-events-reference': 'guide/core/hooks-events-reference.md',
  'tools-reference': 'guide/core/tools-reference.md',
}

mkdirSync(dirname(OUT_PATH), { recursive: true })

function writeStub(reason) {
  console.warn(`[build-reference-fs] WARNING: ${reason}`)
  writeFileSync(
    OUT_PATH,
    JSON.stringify({
      version: 'stub',
      generatedAt: new Date().toISOString(),
      byteSize: 0,
      cwd: CWD,
      files: { [`${CWD}/README.md`]: 'Reference corpus unavailable in this build (guide repo not found).' },
    }),
    'utf-8'
  )
}

if (!existsSync(GUIDE_REPO)) {
  writeStub(`guide repo not found at ${GUIDE_REPO}`)
  process.exit(0)
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[`*_~[\](){}|\\]/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

/** Split a markdown doc into one chunk per H2 section (## heading). */
function splitByH2(content) {
  const lines = content.split('\n')
  const sections = []
  let current = { heading: null, lines: [] }
  let inFence = false

  for (const line of lines) {
    if (/^(```|~~~)/.test(line.trim())) inFence = !inFence
    if (!inFence && /^## /.test(line)) {
      if (current.heading) sections.push(current)
      current = { heading: line.replace(/^## /, '').trim(), lines: [line] }
    } else {
      current.lines.push(line)
    }
  }
  if (current.heading) sections.push(current)
  return sections
}

const files = {}
let sectionCount = 0
let docCount = 0

for (const [slug, relPath] of Object.entries(SOURCE_DOCS)) {
  const absPath = resolve(GUIDE_REPO, relPath)
  if (!existsSync(absPath)) continue
  const content = readFileSync(absPath, 'utf-8')
  const sections = splitByH2(content)
  for (const section of sections) {
    const fileSlug = slugify(section.heading) || 'section'
    const virtualPath = `${CWD}/${slug}/${fileSlug}.md`
    files[virtualPath] = section.lines.join('\n')
    sectionCount++
  }
  docCount++
}

if (sectionCount === 0) {
  writeStub(`no sections extracted from ${Object.keys(SOURCE_DOCS).join(', ')}`)
  process.exit(0)
}

files[`${CWD}/README.md`] = `# CLI & settings reference explorer

${sectionCount} reference sections from ${docCount} guide docs (cheatsheet, settings reference, hooks events, tools reference), split one file per heading.

Try:

  grep -rl "sandbox" .
  ls hooks-events-reference/
  cat cheatsheet/cli-flags-quick-reference.md

Full docs: https://cc.bruniaux.com/guide/cheatsheet/
`

const byteSize = Buffer.byteLength(JSON.stringify(files), 'utf-8')

const payload = {
  version: new Date().toISOString().slice(0, 10),
  generatedAt: new Date().toISOString(),
  byteSize,
  cwd: CWD,
  files,
}

writeFileSync(OUT_PATH, JSON.stringify(payload), 'utf-8')

console.log(`[build-reference-fs] ✓ ${sectionCount} sections from ${docCount} docs, ${(byteSize / 1024).toFixed(1)} KB raw → ${OUT_PATH}`)
