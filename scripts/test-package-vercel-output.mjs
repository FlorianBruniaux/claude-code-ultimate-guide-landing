import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const temporary = mkdtempSync(join(tmpdir(), 'vercel-output-test-'))
const dist = join(temporary, 'dist')
const output = join(temporary, 'output')

try {
  mkdirSync(join(dist, 'releases'), { recursive: true })
  writeFileSync(join(dist, 'index.html'), '<h1>Home</h1>')
  writeFileSync(join(dist, 'releases/index.html'), '<h1>Releases</h1>')
  writeFileSync(join(dist, 'favicon.svg'), '<svg/>')

  const run = () => execFileSync('node', [join(root, 'scripts/package-vercel-output.mjs'), dist, output])
  run()
  const first = readFileSync(join(output, 'config.json'))
  const config = JSON.parse(first)
  assert.equal(config.version, 3)
  assert.deepEqual(config.routes, [
    { src: '^/guide/claude-code-releases/?$', status: 308, headers: { Location: '/releases/' } },
    { src: '^/$', headers: { 'X-Content-Type-Options': 'nosniff', 'Referrer-Policy': 'strict-origin-when-cross-origin', 'X-Frame-Options': 'DENY' }, dest: '/index.html' },
    { src: '^/releases/?$', headers: { 'X-Content-Type-Options': 'nosniff', 'Referrer-Policy': 'strict-origin-when-cross-origin', 'X-Frame-Options': 'DENY' }, dest: '/releases/index.html' },
    { src: '^/favicon\\.svg$', headers: { 'X-Content-Type-Options': 'nosniff', 'Referrer-Policy': 'strict-origin-when-cross-origin', 'X-Frame-Options': 'DENY' }, continue: true },
    { handle: 'filesystem' },
    { src: '^/(.+)/$', dest: '/$1/index.html' },
  ])
  assert.equal(readFileSync(join(output, 'static/releases/index.html'), 'utf8'), '<h1>Releases</h1>')

  writeFileSync(join(output, 'static/stale.txt'), 'stale')
  run()
  assert.deepEqual(readFileSync(join(output, 'config.json')), first)
  assert.throws(() => readFileSync(join(output, 'static/stale.txt')), { code: 'ENOENT' })
  assert.equal(readFileSync(join(output, 'static/index.html'), 'utf8'), '<h1>Home</h1>')

  console.log('Vercel package routes, bytes, and repeatability passed.')
} finally {
  rmSync(temporary, { recursive: true, force: true })
}
