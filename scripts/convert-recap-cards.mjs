/**
 * convert-recap-cards.mjs
 *
 * Converts QMD recap cards from the guide repo → MD content collection:
 *   1. Parses frontmatter YAML from each .qmd file
 *   2. Derives a clean slug from card-number + filename
 *   3. Writes .md files to src/content/cheatsheets/
 *   4. Copies matching PDFs to public/cheatsheets/pdf/
 *
 * Run: node scripts/convert-recap-cards.mjs
 */

import { readFileSync, writeFileSync, mkdirSync, copyFileSync, existsSync, readdirSync } from 'fs'
import { resolve, dirname, basename } from 'path'
import { fileURLToPath } from 'url'
import yaml from 'js-yaml'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const GUIDE_REPO = resolve(ROOT, '../claude-code-ultimate-guide')
const CARDS_DIR = resolve(GUIDE_REPO, 'whitepapers/recap-cards/fr')
const OUT_MD = resolve(ROOT, 'src/content/cheatsheets')
const OUT_PDF = resolve(ROOT, 'public/cheatsheets/pdf')

if (!existsSync(CARDS_DIR)) {
  console.error(`[convert-recap-cards] ERROR: Cards directory not found at ${CARDS_DIR}`)
  process.exit(1)
}

mkdirSync(OUT_MD, { recursive: true })
mkdirSync(OUT_PDF, { recursive: true })

/**
 * Remove diacritics and normalize a string to a clean URL slug.
 */
function normalizeSlug(str) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

/**
 * Derive a slug from the card-number and QMD filename stem.
 * Legacy files (e.g. 01-commandes-essentielles) use the card-number prefix.
 * Standard files (e.g. c01-trust-calibration) use the stem directly.
 */
function deriveSlug(stem, cardNumber) {
  const prefix = cardNumber.toLowerCase() // e.g. "t01", "m02"
  if (/^[cmt]\d{2}-/.test(stem)) {
    // Standard file: c01-trust-calibration → just normalize it
    return normalizeSlug(stem)
  }
  // Legacy file: 01-commandes-essentielles → strip leading digits, prepend card prefix
  const namePart = stem.replace(/^\d+-/, '')
  return normalizeSlug(`${prefix}-${namePart}`)
}

/**
 * Compute sort order from card-number.
 * T-series: 1-99, M-series: 101-199, C-series: 201-299
 */
function deriveOrder(cardNumber) {
  const series = cardNumber[0].toUpperCase()
  const num = parseInt(cardNumber.slice(1), 10)
  const bases = { T: 0, M: 100, C: 200 }
  return (bases[series] ?? 0) + num
}

const qmdFiles = readdirSync(CARDS_DIR).filter(f => f.endsWith('.qmd')).sort()
let converted = 0
let skipped = 0

for (const filename of qmdFiles) {
  const filepath = resolve(CARDS_DIR, filename)
  const raw = readFileSync(filepath, 'utf-8')

  // Split frontmatter from body
  const fmMatch = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/)
  if (!fmMatch) {
    console.warn(`[convert-recap-cards] SKIP: no frontmatter in ${filename}`)
    skipped++
    continue
  }

  const fmRaw = fmMatch[1]
  const body = fmMatch[2].trim()

  let fm
  try {
    fm = yaml.load(fmRaw)
  } catch (e) {
    console.warn(`[convert-recap-cards] SKIP: YAML parse error in ${filename}: ${e.message}`)
    skipped++
    continue
  }

  const cardNumber = fm['card-number']
  if (!cardNumber) {
    console.warn(`[convert-recap-cards] SKIP: missing card-number in ${filename}`)
    skipped++
    continue
  }

  const stem = basename(filename, '.qmd')
  const slug = deriveSlug(stem, cardNumber)
  const order = deriveOrder(cardNumber)

  // Clean frontmatter for the MD content collection
  const cleanFm = {
    title: fm.title,
    subtitle: fm.subtitle,
    cardNumber: String(cardNumber),
    category: fm.category,
    difficulty: fm.difficulty,
    guideVersion: fm['guide-version'] || fm.version || '3.32.1',
    order,
  }

  const mdContent = `---\n${yaml.dump(cleanFm, { lineWidth: -1 })}---\n\n${body}\n`
  writeFileSync(resolve(OUT_MD, `${slug}.md`), mdContent, 'utf-8')

  // Copy PDF if available
  const pdfSrc = resolve(CARDS_DIR, `${stem}.pdf`)
  if (existsSync(pdfSrc)) {
    copyFileSync(pdfSrc, resolve(OUT_PDF, `${slug}.pdf`))
  }

  console.log(`[convert-recap-cards] ✓ ${slug} (${cardNumber})`)
  converted++
}

console.log(`\n[convert-recap-cards] Done: ${converted} converted, ${skipped} skipped`)
