import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { parseArgs } from 'node:util'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const options = parseArgs({
  options: {
    'landing-root': { type: 'string', default: ROOT },
    'guide-root': {
      type: 'string',
      default: resolve(ROOT, '../claude-code-ultimate-guide'),
    },
  },
}).values

const landingPath = resolve(
  options['landing-root'],
  'src/data/agentsec-security-feed.v1.json',
)
const guidePath = resolve(
  options['guide-root'],
  'machine-readable/agentsec-security-feed.v1.json',
)

function read(path, label) {
  try {
    return readFileSync(path)
  } catch {
    throw new Error(`cannot read ${label}: ${path}`)
  }
}

function validate(raw) {
  let feed
  try {
    feed = JSON.parse(raw.toString('utf8'))
  } catch {
    throw new Error('landing feed is not valid JSON')
  }
  if (feed?.schema_version !== '1') {
    throw new Error('landing feed has an unsupported schema version')
  }
  if (feed?.content_license !== 'CC-BY-SA-4.0') {
    throw new Error('landing feed has an unsupported content license')
  }
}

try {
  const landing = read(landingPath, 'landing feed')
  const guide = read(guidePath, 'guide feed')
  validate(landing)
  if (!landing.equals(guide)) {
    throw new Error('landing feed differs from guide mirror')
  }
  const digest = createHash('sha256').update(landing).digest('hex')
  console.log(`AgentSec feed mirrors match sha256=${digest}`)
} catch (error) {
  console.error(`error: ${error.message}`)
  process.exitCode = 1
}
