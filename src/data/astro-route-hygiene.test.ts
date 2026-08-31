import assert from 'node:assert/strict'
import { readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import test from 'node:test'

function collectTestRoutes(directory: URL): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const url = new URL(`${entry.name}${entry.isDirectory() ? '/' : ''}`, directory)
    if (entry.isDirectory()) return collectTestRoutes(url)
    return entry.name.includes('.test.') ? [fileURLToPath(url)] : []
  })
}

test('Astro page directories contain no test files that become public routes', () => {
  const pages = new URL('../pages/', import.meta.url)
  assert.deepEqual(collectTestRoutes(pages), [])
})
