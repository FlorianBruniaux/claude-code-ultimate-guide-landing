// Keeps hashed /_astro/ assets from recent builds in the deployed site.
// GitHub Pages replaces the whole site on deploy and serves HTML with max-age=600,
// so a cached page can still reference a stylesheet the new build renamed. Serving
// the previous builds' files for a few days keeps those pages styled.
//
// Usage: node scripts/carry-over-assets.mjs <dist/_astro> <carry-dir> <retention-days>
// The carry directory is persisted between runs by actions/cache.
import { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const [assetsDir, carryDir, retentionArg] = process.argv.slice(2)
if (!assetsDir || !carryDir || !retentionArg) {
  console.error('Usage: carry-over-assets.mjs <dist/_astro> <carry-dir> <retention-days>')
  process.exit(2)
}

const now = Number(process.env.CARRY_OVER_NOW ?? Date.now())
const retentionMs = Number(retentionArg) * 24 * 60 * 60 * 1000
const manifestPath = join(carryDir, 'manifest.json')

mkdirSync(carryDir, { recursive: true })

let lastBuilt = {}
try {
  lastBuilt = JSON.parse(readFileSync(manifestPath, 'utf8')).files ?? {}
} catch {
  // Missing or unreadable manifest: start fresh, as on a first deploy.
}

const files = (dir) => readdirSync(dir).filter((name) => name !== 'manifest.json' && statSync(join(dir, name)).isFile())
const current = new Set(files(assetsDir))
const restored = []
let dropped = 0

for (const name of current) {
  lastBuilt[name] = now
  copyFileSync(join(assetsDir, name), join(carryDir, name))
}

for (const [name, builtAt] of Object.entries(lastBuilt)) {
  if (current.has(name)) continue
  const carried = join(carryDir, name)
  if (now - builtAt <= retentionMs && existsSync(carried)) {
    copyFileSync(carried, join(assetsDir, name))
    restored.push(name)
  } else {
    delete lastBuilt[name]
    rmSync(carried, { force: true })
    dropped++
  }
}

// Files the manifest does not know (for example after a corrupt manifest) have no age: drop them.
for (const name of files(carryDir)) {
  if (!(name in lastBuilt)) {
    rmSync(join(carryDir, name), { force: true })
    dropped++
  }
}

writeFileSync(manifestPath, JSON.stringify({ files: lastBuilt }, null, 2))
// The post-deploy check reads this list to prove the carried files are served.
if (process.env.CARRY_OVER_RESTORED_LIST) writeFileSync(process.env.CARRY_OVER_RESTORED_LIST, restored.sort().map((name) => `${name}\n`).join(''))
console.log(`Asset carry-over: ${current.size} current, ${restored.length} restored from earlier builds, ${dropped} dropped.`)
