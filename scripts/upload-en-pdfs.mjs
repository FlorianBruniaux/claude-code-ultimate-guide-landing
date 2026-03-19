/**
 * upload-en-pdfs.mjs
 *
 * Phase 5: Hash + copy 57 EN PDFs to portfolio public dir, then generate CARD_HASHES_EN map.
 * Also creates EN ZIP bundles per series.
 *
 * Usage: node scripts/upload-en-pdfs.mjs
 */

import { readFileSync, writeFileSync, copyFileSync, readdirSync, mkdirSync, existsSync } from 'fs'
import { join, dirname, basename } from 'path'
import { fileURLToPath } from 'url'
import { createHash } from 'crypto'
import { execSync } from 'child_process'

const __dirname = dirname(fileURLToPath(import.meta.url))
const LANDING_ROOT = join(__dirname, '..')
const GUIDE_ROOT = join(__dirname, '../../claude-code-ultimate-guide')
const PORTFOLIO_ROOT = join(__dirname, '../../florian-portfolio')

const EN_QMD_DIR = join(GUIDE_ROOT, 'whitepapers/recap-cards/en')
const EN_PDF_DIR = EN_QMD_DIR  // PDFs are in the same dir as QMDs
const DEST_DIR = join(PORTFOLIO_ROOT, 'public/guides/recap-cards')

const VERSION = 'v1.0.0'

// ── Step 1: Build card-number → landing slug map (from QMD frontmatter) ──
//   Also map QMD filename → landing slug for PDF lookup

function getField(fmBlock, key) {
  const re = new RegExp(`^${key}:\\s*(.+?)\\s*$`, 'm')
  const m = fmBlock.match(re)
  if (!m) return ''
  return m[1].trim().replace(/^["'](.*)["']$/, '$1')
}

// Landing slug from card-number: T01 → look at which .md file has cardNumber: T01
// We can derive it: series prefix lowercase + number = matches the md file slug
// But easier: scan landing MD files and build the map
const LANDING_MD_DIR = join(LANDING_ROOT, 'src/content/cheatsheets')
const mdFiles = readdirSync(LANDING_MD_DIR).filter(f => f.endsWith('.md'))

const cardNumToSlug = {}
for (const f of mdFiles) {
  const content = readFileSync(join(LANDING_MD_DIR, f), 'utf-8')
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!match) continue
  const cardNum = getField(match[1], 'cardNumber')
  if (cardNum) cardNumToSlug[cardNum] = f.replace(/\.md$/, '')
}

// ── Step 2: Build QMD filename → card-number map ──
const qmdFiles = readdirSync(EN_QMD_DIR).filter(f => f.endsWith('.qmd'))
const qmdToCardNum = {}
for (const f of qmdFiles) {
  const content = readFileSync(join(EN_QMD_DIR, f), 'utf-8')
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!match) continue
  const cardNum = getField(match[1], 'card-number')
  if (cardNum) qmdToCardNum[f] = cardNum
}

// ── Step 3: Hash + copy each EN PDF ──
const hashMap = {}
let copied = 0
let missing = 0

for (const qmdFile of qmdFiles) {
  const cardNum = qmdToCardNum[qmdFile]
  if (!cardNum) { console.warn(`No card-number for ${qmdFile}`); continue }

  const slug = cardNumToSlug[cardNum]
  if (!slug) { console.warn(`No landing slug for card ${cardNum}`); continue }

  // Find the PDF (same name as QMD but .pdf)
  const pdfName = qmdFile.replace(/\.qmd$/, '.pdf')
  const pdfPath = join(EN_PDF_DIR, pdfName)

  if (!existsSync(pdfPath)) {
    console.warn(`Missing EN PDF: ${pdfName}`)
    missing++
    continue
  }

  // Compute SHA256 hash, take first 12 chars
  const buf = readFileSync(pdfPath)
  const hash = createHash('sha256').update(buf).digest('hex').slice(0, 12)

  // Destination filename
  const destFilename = `${slug}.en.${VERSION}.${hash}.pdf`
  const destPath = join(DEST_DIR, destFilename)

  copyFileSync(pdfPath, destPath)
  hashMap[slug] = destFilename
  copied++
  console.log(`  ${slug} → ${destFilename}`)
}

console.log(`\nCopied ${copied} EN PDFs (${missing} missing).\n`)

// ── Step 4: Create EN ZIP bundles per series ──
const series = {
  T: { name: 'technique', slugs: [] },
  M: { name: 'methodologie', slugs: [] },
  C: { name: 'conception', slugs: [] },
}

for (const [slug, filename] of Object.entries(hashMap)) {
  const seriesId = slug[0].toUpperCase()
  if (series[seriesId]) series[seriesId].slugs.push(filename)
}

const zipHashes = {}

for (const [sid, { name, slugs }] of Object.entries(series)) {
  if (slugs.length === 0) continue

  // Compute hash of all PDF content combined for deterministic ZIP naming
  const combined = slugs.sort().map(f => readFileSync(join(DEST_DIR, f))).join('')
  const zipHash = createHash('sha256').update(combined).digest('hex').slice(0, 12)
  const zipName = `recap-cards-${name}.en.${VERSION}.${zipHash}.zip`
  const zipPath = join(DEST_DIR, zipName)

  const files = slugs.map(f => f).join(' ')
  execSync(`cd "${DEST_DIR}" && zip -j "${zipPath}" ${files}`, { stdio: 'pipe' })

  zipHashes[sid] = zipName
  console.log(`  ZIP ${sid}: ${zipName} (${slugs.length} files)`)
}

// ── Step 5: Output TypeScript code to paste into recap-cards-data.ts ──
const output = `
/** Map: card ID (slug) → hashed EN PDF filename on Vercel */
export const CARD_HASHES_EN: Record<string, string> = {
  // ── Conception (C) ──────────────────────────────────────────────────────────
${Object.entries(hashMap).filter(([k]) => k.startsWith('c')).map(([k, v]) => `  '${k}': '${v}',`).join('\n')}
  // ── Méthodologie (M) ────────────────────────────────────────────────────────
${Object.entries(hashMap).filter(([k]) => k.startsWith('m')).map(([k, v]) => `  '${k}': '${v}',`).join('\n')}
  // ── Technique (T) ───────────────────────────────────────────────────────────
${Object.entries(hashMap).filter(([k]) => k.startsWith('t')).map(([k, v]) => `  '${k}': '${v}',`).join('\n')}
}

// EN ZIP hashes (for hashedZipEn field in RECAP_SERIES):
${Object.entries(zipHashes).map(([sid, zip]) => `// ${sid}: '${zip}'`).join('\n')}
`

const outputFile = join(LANDING_ROOT, 'scripts/en-hashes-output.ts')
writeFileSync(outputFile, output.trim())
console.log(`\nHash map written to: ${outputFile}`)
console.log('Paste CARD_HASHES_EN into src/data/recap-cards-data.ts')
