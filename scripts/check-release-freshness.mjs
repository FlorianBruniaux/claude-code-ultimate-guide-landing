// Checks that the deployed /releases/ page announces the latest version in
// src/data/releases.ts, and optionally that deploy.yml succeeded recently.
// Run it from outside GitHub Actions too: an Actions outage stops the deploy
// smoke step as well.
//
// Usage: node scripts/check-release-freshness.mjs <base-url> [--max-deploy-age-hours <n>]
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

import { checkReleasePage, expectedLatestVersion, lastSuccessAgeHours } from './lib/release-freshness.mjs'

const args = process.argv.slice(2)
const base = args.shift()
let maxDeployAgeHours
while (args.length) {
  const arg = args.shift()
  if (arg === '--max-deploy-age-hours') maxDeployAgeHours = Number(args.shift())
}
if (!base) {
  console.error('Usage: check-release-freshness.mjs <base-url> [--max-deploy-age-hours <n>]')
  process.exit(2)
}

const failures = []
const version = expectedLatestVersion(readFileSync(resolve(process.cwd(), 'src/data/releases.ts'), 'utf8'))

const attempts = Number(process.env.CHECK_ATTEMPTS ?? 3)
const delayMs = Number(process.env.CHECK_DELAY_MS ?? 10000)
let pageFailures = []
for (let attempt = 1; attempt <= attempts; attempt++) {
  // Pages serves HTML from a CDN cache for up to 10 minutes; a unique query
  // string asks for a fresh copy.
  const url = new URL('/releases/', base)
  url.searchParams.set('fresh', `${Date.now()}-${attempt}`)
  const response = await fetch(url, { headers: { 'cache-control': 'no-cache' } }).catch((error) => error)
  pageFailures = response instanceof Response && response.ok
    ? checkReleasePage(await response.text(), version)
    : [`/releases/ returned ${response.status ?? response.message}`]
  if (pageFailures.length === 0 || attempt === attempts) break
  await new Promise((done) => setTimeout(done, delayMs))
}
failures.push(...pageFailures)

if (Number.isFinite(maxDeployAgeHours)) {
  const url = 'https://api.github.com/repos/FlorianBruniaux/claude-code-ultimate-guide-landing/actions/workflows/deploy.yml/runs?status=success&per_page=1'
  const response = await fetch(url, { headers: { accept: 'application/vnd.github+json' } }).catch((error) => error)
  if (!(response instanceof Response) || !response.ok) {
    failures.push(`GitHub API returned ${response.status ?? response.message}`)
  }
  else {
    const age = lastSuccessAgeHours(await response.json())
    if (age > maxDeployAgeHours) failures.push(`last successful deploy is ${age.toFixed(1)} h old (limit ${maxDeployAgeHours} h)`)
  }
}

if (failures.length) {
  console.error(`Release freshness check failed:\n${failures.join('\n')}`)
  process.exit(1)
}
console.log(`Release freshness check passed: ${base} announces ${version}.`)
