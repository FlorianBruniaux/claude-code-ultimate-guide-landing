import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

import { resolveLastmod, withLastmod } from './sitemap-lastmod.mjs'

const pageDates = { 'https://cc.bruniaux.com/faq/': '2026-10-31' }
const guideDates = new Map([['/guide/architecture/', '2026-10-28']])

test('uses the declared landing page date first, then the guide source date', () => {
  assert.equal(resolveLastmod('https://cc.bruniaux.com/faq/', pageDates, guideDates), '2026-10-31')
  assert.equal(resolveLastmod('https://cc.bruniaux.com/guide/architecture/', pageDates, guideDates), '2026-10-28')
})

test('does not stamp an undated page with the build date', () => {
  assert.equal(resolveLastmod('https://cc.bruniaux.com/glossary/agent/', pageDates, guideDates), undefined)
})

test('omits the lastmod key when no date is known', () => {
  assert.deepEqual(withLastmod({ url: 'x', priority: 0.7 }, undefined), { url: 'x', priority: 0.7 })
  assert.deepEqual(withLastmod({ url: 'x' }, '2026-10-31'), { url: 'x', lastmod: '2026-10-31' })
})

test('dates the FAQ on its October 31 content change', () => {
  const config = readFileSync(new URL('../../astro.config.mjs', import.meta.url), 'utf8')
  assert.match(config, /'https:\/\/cc\.bruniaux\.com\/faq\/': '2026-10-31'/)
  assert.doesNotMatch(config, /new Date\(\)\.toISOString\(\)/)
})

test('dates a whole section from its shared source date, after exact page dates', () => {
  const sectionDates = { '/roles/': '2026-08-31' }
  assert.equal(resolveLastmod('https://cc.bruniaux.com/roles/ai-engineer/', pageDates, guideDates, sectionDates), '2026-08-31')
  assert.equal(resolveLastmod('https://cc.bruniaux.com/roles/', pageDates, guideDates, sectionDates), '2026-08-31')
  assert.equal(resolveLastmod('https://cc.bruniaux.com/faq/', pageDates, guideDates, sectionDates), '2026-10-31')
  assert.equal(resolveLastmod('https://cc.bruniaux.com/rolesx/', pageDates, guideDates, sectionDates), undefined)
})

test('role pages share the date their own pages declare as dateModified', async () => {
  const { ROLES_META } = await import('./ai-roles.ts')
  const { SECTION_DATES } = await import('./roles-dates.mjs')
  assert.equal(SECTION_DATES['/roles/'], ROLES_META.modifiedDate)
  const config = readFileSync(new URL('../../astro.config.mjs', import.meta.url), 'utf8')
  assert.match(config, /resolveLastmod\(normalizedUrl, PAGE_DATES, GUIDE_DATES, SECTION_DATES\)/)
})
