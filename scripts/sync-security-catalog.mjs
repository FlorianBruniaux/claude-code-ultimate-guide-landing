import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseArgs } from 'node:util'
import yaml from 'js-yaml'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const { values } = parseArgs({ options: {
  write: { type: 'boolean', default: false },
  check: { type: 'boolean', default: false },
  'guide-root': { type: 'string', default: process.env.GUIDE_REPO_PATH || resolve(root, '../claude-code-ultimate-guide') },
} })
if (values.write === values.check) throw new Error('Choose --write or --check')

const database = yaml.load(readFileSync(
  resolve(values['guide-root'], 'examples/commands/resources/threat-db.yaml'), 'utf8',
))
const target = resolve(root, 'src/data/security-data.ts')
const before = readFileSync(target, 'utf8')
let candidate = before

function replaceSection(name, next, value) {
  const startMarker = `    ${name}: `
  const endMarker = `    ${next}: `
  const start = candidate.indexOf('\n' + startMarker) + 1
  const end = candidate.indexOf('\n' + endMarker, start) + 1
  if (start === 0 || end === 0 || candidate.indexOf('\n' + startMarker, start) >= 0) {
    throw new Error(`Cannot locate unique catalogue section ${name}`)
  }
  const rendered = Array.isArray(value)
    ? '[\n' + value.map((item) => '        ' + JSON.stringify(item)).join(',\n') + '\n    ]'
    : JSON.stringify(value, null, 4).replace(/\n/g, '\n    ')
  candidate = candidate.slice(0, start) + startMarker + rendered + ',\n' + candidate.slice(end)
}

const fields = ['id', 'component', 'severity', 'description', 'source', 'fixed_in', 'mitigation', 'cvss']
const project = (entries, keys) => entries.map((entry) => Object.fromEntries(
  keys.filter((key) => entry[key] !== undefined).map((key) => [key, entry[key]]),
))
const cves = database.cve_database.map((entry) => {
  for (const key of ['id', 'component', 'severity', 'description', 'source', 'mitigation']) {
    if (typeof entry[key] !== 'string') throw new Error(`Missing ${key} for ${entry.id}`)
  }
  return Object.fromEntries(fields.filter((key) => entry[key] !== undefined).map((key) => [key, entry[key]]))
})
replaceSection('meta', 'stats', {
  version: database.version, updated: database.updated, sources_count: database.sources.length,
})
replaceSection('cve_database', 'campaigns', cves)
replaceSection('malicious_authors', 'malicious_skills', project(database.malicious_authors,
  ['name', 'source', 'risk', 'notes']))
replaceSection('malicious_skills', 'cve_database', project(database.malicious_skills,
  ['name', 'type', 'source', 'risk', 'category', 'platform', 'version', 'notes']))
replaceSection('campaigns', 'attack_techniques', project(database.campaigns,
  ['name', 'source', 'date', 'platform', 'platforms', 'skills_count', 'amos_skills',
    'outlier_skills', 'malware', 'delivery', 'c2_ips', 'c2_ip', 'c2_port', 'targets',
    'categories', 'outliers', 'skills_scanned', 'findings', 'known_malicious_authors',
    'packages', 'package', 'technique']))
replaceSection('attack_techniques', 'scanning_tools', project(database.attack_techniques,
  ['id', 'name', 'description', 'examples', 'campaigns', 'cves', 'mitigation']))
replaceSection('scanning_tools', 'sources', project(database.scanning_tools,
  ['name', 'vendor', 'type', 'command', 'url', 'capabilities', 'limitations']))
replaceSection('sources', 'minimum_safe_versions', database.sources)
const floorStart = candidate.indexOf('    minimum_safe_versions: ')
const floorEnd = candidate.indexOf('\n} as const satisfies SecurityData;', floorStart)
if (floorStart < 0 || floorEnd < 0) throw new Error('Cannot locate version-floor section')
candidate = candidate.slice(0, floorStart) + '    minimum_safe_versions: '
  + JSON.stringify(database.minimum_safe_versions, null, 4).replace(/\n/g, '\n    ')
  + candidate.slice(floorEnd)

if (values.write) writeFileSync(target, candidate)
else if (candidate !== before) {
  console.error('Security catalogue differs from guide compatibility data; run --write.')
  process.exitCode = 1
}
if (!process.exitCode) console.log(`Security catalogue matches: ${cves.length} records, ${database.sources.length} sources.`)
