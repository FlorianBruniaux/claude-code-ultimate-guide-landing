/**
 * build-terminal-fs.mjs
 *
 * Generates public/terminal-fs.json: the preloaded virtual filesystem for
 * the bash playground on /examples. Reads a curated subset of the guide
 * repo's examples/ folder (agents, commands, config, hooks) — not skills,
 * which alone weigh ~455 KB raw and would push the payload well past this
 * POC's ~60-70 KB gzip target.
 *
 * Loaded in full at terminal-mount time (see fs-payload.ts), not lazily
 * per file: just-bash's InMemoryFs.stat() materializes lazy entries to
 * compute size, and grep batches 50 concurrent fetches — a lazy filesystem
 * would turn a single `grep -r` into dozens of network requests.
 *
 * Run: node scripts/build-terminal-fs.mjs
 * Same pattern as scripts/prepare-guide-content.mjs — graceful fallback if
 * the guide repo isn't cloned alongside this one.
 */

import { readFileSync, writeFileSync, existsSync, readdirSync, statSync, mkdirSync } from 'fs'
import { resolve, dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const GUIDE_REPO = resolve(process.env.GUIDE_REPO_PATH ?? resolve(ROOT, '../claude-code-ultimate-guide'))
const EXAMPLES_DIR = resolve(GUIDE_REPO, 'examples')
const OUT_PATH = resolve(ROOT, 'public/terminal-fs.json')

const CWD = '/home/user'
// agents/commands/config/hooks only — skills alone are ~455 KB raw, too
// heavy for a POC whose point is proving the mechanism, not maximum coverage.
const CURATED_DIRS = ['agents', 'commands', 'config', 'hooks']
// Outliers that dominate their category's size without adding browsing
// value here. threat-db.yaml is reference data, not a config template.
// hooks/bm25-routing is a self-contained side-project (routing engine +
// skills-corpus + evals), not a hook example, and matches none of the
// PreToolUse/Bash( searches this demo is built to showcase. Paths are
// relative to EXAMPLES_DIR; directory prefixes match everything under them.
const EXCLUDE_PATHS = ['commands/resources/threat-db.yaml']
const EXCLUDE_PREFIXES = ['hooks/bm25-routing/']

mkdirSync(dirname(OUT_PATH), { recursive: true })

function writeStub(reason) {
  console.warn(`[build-terminal-fs] WARNING: ${reason}`)
  console.warn('[build-terminal-fs] Writing a minimal stub payload instead.')
  writeFileSync(
    OUT_PATH,
    JSON.stringify({
      version: 'stub',
      generatedAt: new Date().toISOString(),
      byteSize: 0,
      cwd: CWD,
      files: {
        [`${CWD}/README.md`]: 'Template corpus unavailable in this build (guide repo not found).',
      },
    }),
    'utf-8'
  )
}

if (!existsSync(EXAMPLES_DIR)) {
  writeStub(`examples dir not found at ${EXAMPLES_DIR}`)
  process.exit(0)
}

function walk(dir) {
  const out = []
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    const stat = statSync(full)
    if (stat.isDirectory()) {
      out.push(...walk(full))
    } else {
      out.push(full)
    }
  }
  return out
}

const files = {}
let fileCount = 0

for (const sub of CURATED_DIRS) {
  const subDir = resolve(EXAMPLES_DIR, sub)
  if (!existsSync(subDir)) continue
  for (const absPath of walk(subDir)) {
    const relPath = absPath.slice(EXAMPLES_DIR.length + 1) // e.g. "agents/foo.md"
    if (EXCLUDE_PATHS.includes(relPath)) continue
    if (EXCLUDE_PREFIXES.some((prefix) => relPath.startsWith(prefix))) continue
    const virtualPath = `${CWD}/examples/${relPath}`
    files[virtualPath] = readFileSync(absPath, 'utf-8')
    fileCount++
  }
}

if (fileCount === 0) {
  writeStub(`none of ${CURATED_DIRS.join(', ')} found under ${EXAMPLES_DIR}`)
  process.exit(0)
}

// README shown on the visitor's first `ls` — explains what to type. This is
// the single biggest lever against an empty-shell bounce, per the design doc.
files[`${CWD}/README.md`] = `# Claude Code template explorer

A real bash shell, ${fileCount} real templates from the Claude Code Ultimate Guide.

Try:

  cat examples/agents/code-reviewer.md
  grep -rl "PreToolUse" .
  find . -name "*.json"

Everything under examples/ is a real file from:
https://github.com/FlorianBruniaux/claude-code-ultimate-guide/tree/main/examples
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

console.log(`[build-terminal-fs] ✓ ${fileCount} files, ${(byteSize / 1024).toFixed(1)} KB raw → ${OUT_PATH}`)
