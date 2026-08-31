import assert from 'node:assert/strict'
import test from 'node:test'
import { readFileSync } from 'node:fs'

const base = new URL('../components/security/', import.meta.url)
const read = (name: string) => readFileSync(new URL(name, base), 'utf8')

test('SecurityHero reports freshness and never claims browser scanning', () => {
  const source = read('SecurityHero.astro')
  assert.match(source, /databaseUpdatedLabel/)
  assert.doesNotMatch(source, /scan your repository in the browser/i)
})

test('catalogues render records before client enhancement', () => {
  for (const name of ['SecurityCveCatalog.astro', 'SecurityThreatCatalog.astro']) {
    const source = read(name)
    assert.match(source, /data-security-record/)
    assert.match(source, /data-security-empty/)
  }
})

test('quick and full checklist modes share one component', () => {
  const source = read('SecurityChecklist.astro')
  assert.match(source, /'quick' \| 'full'/)
  assert.match(source, /data-checklist-item/)
})
