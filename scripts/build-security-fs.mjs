/**
 * build-security-fs.mjs
 *
 * Generates public/security-fs.json: the preloaded virtual filesystem for
 * the security page's threat-database terminal experiment. Converts the
 * guide repo's threat-db.yaml (YAML, 3100+ lines) to a single JSON file so
 * `jq` can query it directly — the whole point of this placement versus
 * /examples is that the corpus is structured data worth querying, not
 * prose worth grepping.
 *
 * Run: node scripts/build-security-fs.mjs
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import yaml from 'js-yaml'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const GUIDE_REPO = resolve(process.env.GUIDE_REPO_PATH ?? resolve(ROOT, '../claude-code-ultimate-guide'))
const SRC = resolve(GUIDE_REPO, 'examples/commands/resources/threat-db.yaml')
const OUT_PATH = resolve(ROOT, 'public/security-fs.json')

const CWD = '/home/user'

mkdirSync(dirname(OUT_PATH), { recursive: true })

if (!existsSync(SRC)) {
  throw new Error(`threat-db.yaml not found at ${SRC}`)
}

const doc = yaml.load(readFileSync(SRC, 'utf-8'))

const files = {
  [`${CWD}/threat-db.json`]: JSON.stringify(doc, null, 2),
  [`${CWD}/README.md`]: `# Threat database explorer

Live query of the guide's threat intelligence database (v${doc.version}, updated ${doc.updated}):
${doc.cve_database?.length ?? 0} CVEs, ${doc.campaigns?.length ?? 0} campaigns, ${doc.attack_techniques?.length ?? 0} attack techniques.

This is real jq over real JSON, not a static table. Try:

  jq '.cve_database[] | select(.severity=="critical")' threat-db.json
  jq -r '.campaigns[].name' threat-db.json
  jq '.minimum_safe_versions["claude-code"]' threat-db.json

Full source: https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/main/examples/commands/resources/threat-db.yaml
`,
}

const byteSize = Buffer.byteLength(JSON.stringify(files), 'utf-8')

const payload = {
  version: doc.version,
  generatedAt: new Date().toISOString(),
  byteSize,
  cwd: CWD,
  files,
}

writeFileSync(OUT_PATH, JSON.stringify(payload), 'utf-8')

console.log(`[build-security-fs] ✓ threat-db v${doc.version}, ${(byteSize / 1024).toFixed(1)} KB raw → ${OUT_PATH}`)
