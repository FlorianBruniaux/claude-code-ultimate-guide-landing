import assert from 'node:assert/strict'
import { execFileSync, spawnSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const config = JSON.parse(readFileSync(resolve(root, 'vercel.json'), 'utf8'))
const build = resolve(root, 'scripts/build-vercel.sh')
const source = readFileSync(build, 'utf8')
execFileSync('bash', ['-n', build])

assert.equal(config.framework, 'astro')
assert.equal(config.outputDirectory, 'dist')
assert.equal(config.trailingSlash, true)
assert.equal(config.installCommand, 'npx --yes pnpm@9 install --frozen-lockfile')
assert.equal(config.buildCommand, 'bash scripts/build-vercel.sh')
assert.deepEqual(config.redirects, [{
  source: '/guide/claude-code-releases/',
  destination: '/releases/',
  statusCode: 308,
}])

for (const path of ['/', '/releases/', '/favicon.svg']) {
  const rule = config.headers.find(({ source }) => source === path)
  assert.ok(rule, `${path}: response-header rule exists`)
  const headers = Object.fromEntries(rule.headers.map(({ key, value }) => [key, value]))
  assert.equal(headers['X-Content-Type-Options'], 'nosniff')
  assert.equal(headers['Referrer-Policy'], 'strict-origin-when-cross-origin')
  assert.equal(headers['X-Frame-Options'], 'DENY')
}

assert.match(source, /GUIDE_COMMIT_SHA/)
assert.match(source, /git -C "\$guide_root" fetch --depth 1 origin "\$GUIDE_COMMIT_SHA"/)
assert.match(source, /process\.versions\.node/)
const invalidSha = spawnSync('bash', [build, '--preflight'], {
  cwd: root,
  encoding: 'utf8',
  env: { ...process.env, GUIDE_COMMIT_SHA: 'not-a-commit' },
})
assert.equal(invalidSha.status, 1)
assert.match(invalidSha.stderr, /GUIDE_COMMIT_SHA must be a full 40-character commit SHA/)

console.log('Vercel config, shell syntax, route/header contract and SHA preflight passed.')
