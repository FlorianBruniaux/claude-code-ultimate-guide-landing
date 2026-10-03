// Checks that a deployed site serves every /_astro/ asset its pages reference,
// plus an optional list of assets carried over from earlier builds.
//
// Usage: node scripts/check-deployed-assets.mjs <base-url> [--carried <file>] <path>...
import { readFileSync } from 'node:fs'

const args = process.argv.slice(2)
const base = args.shift()
let carriedFile
const paths = []
while (args.length) {
  const arg = args.shift()
  if (arg === '--carried') carriedFile = args.shift()
  else paths.push(arg)
}
if (!base || paths.length === 0) {
  console.error('Usage: check-deployed-assets.mjs <base-url> [--carried <file>] <path>...')
  process.exit(2)
}

const attempts = Number(process.env.CHECK_ATTEMPTS ?? 3)
const delayMs = Number(process.env.CHECK_DELAY_MS ?? 10000)
const sleep = (ms) => new Promise((done) => setTimeout(done, ms))

async function status(url) {
  let last
  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      const response = await fetch(url, { cache: 'no-store' })
      last = response.status
      if (last === 200) return last
    } catch (error) {
      last = error.cause?.code ?? error.message
    }
    if (attempt < attempts) await sleep(delayMs)
  }
  return last
}

const assets = new Set()
const failures = []

for (const path of paths) {
  const url = new URL(path, base)
  const response = await fetch(url, { cache: 'no-store' }).catch((error) => error)
  if (!(response instanceof Response) || response.status !== 200) {
    failures.push(`${url}: page returned ${response.status ?? response.message}`)
    continue
  }
  const html = await response.text()
  for (const match of html.matchAll(/(?:href|src)="(\/_astro\/[^"#?]+)"/g)) assets.add(match[1])
}

if (carriedFile) {
  const carried = readFileSync(carriedFile, 'utf8').split('\n').map((line) => line.trim()).filter(Boolean)
  for (const name of carried) assets.add(`/_astro/${name}`)
  console.log(`Checking ${carried.length} assets carried over from earlier builds.`)
}

for (const asset of [...assets].sort()) {
  const code = await status(new URL(asset, base))
  if (code !== 200) failures.push(`${asset}: ${code}`)
}

if (failures.length) {
  console.error(`Deployed asset check failed (${failures.length}):\n${failures.join('\n')}`)
  process.exit(1)
}
console.log(`Deployed asset check passed: ${paths.length} pages, ${assets.size} assets.`)
