import assert from 'node:assert/strict'
import test from 'node:test'
import { readFileSync } from 'node:fs'

import { SECURITY_HISTORICAL_ANCHORS, SECURITY_ROUTES } from './security-page.ts'

const route = (name: string) => readFileSync(new URL(`../pages/security/${name === 'index' ? '' : `${name}/`}index.astro`, import.meta.url), 'utf8')

test('threats route owns every approved intelligence section', () => {
  const source = route('threats')
  for (const id of ['attack-techniques', 'agentsec-intelligence', 'active-campaigns', 'threat-database', 'security-sources']) {
    assert.match(source, new RegExp(`id=["']${id}["']`))
  }
})

test('CVE route exposes search, safe-version status, remediation, and sources', () => {
  const source = route('cves')
  const catalog = readFileSync(new URL('../components/security/SecurityCveCatalog.astro', import.meta.url), 'utf8')
  assert.match(source, /SecurityCveCatalog/)
  assert.match(catalog, /fixedInLabel/)
  assert.match(catalog, /mitigation/)
  assert.match(source, /SecuritySourceList/)
})

test('sandbox route states the protection boundary and three failure modes', () => {
  const source = route('sandbox')
  assert.match(source, /what.*does not protect/is)
  assert.equal((source.match(/data-sandbox-failure/g) ?? []).length, 3)
  assert.match(source, /SecurityCodeExample/)
})

test('hardening route exposes three paths and the full checklist', () => {
  const source = route('hardening')
  for (const label of ['5 minutes', '30 minutes', 'Team controls']) assert.match(source, new RegExp(label, 'i'))
  assert.match(source, /mode="full"/)
  assert.match(source, /TerminalPlayground/)
})

test('Security hub keeps every historical fragment as a teaser', () => {
  const source = route('index')
  for (const id of SECURITY_HISTORICAL_ANCHORS) assert.match(source, new RegExp(`id=["']${id}["']`))
})

test('Security hub links to all four task routes without embedding full catalogues', () => {
  const source = route('index')
  for (const item of SECURITY_ROUTES.filter((item) => item.id !== 'hub')) assert.match(source, new RegExp(item.href.replaceAll('/', '\\/')))
  assert.doesNotMatch(source, /data-security-cve-record/)
  assert.doesNotMatch(source, /data-security-threat-record/)
})
