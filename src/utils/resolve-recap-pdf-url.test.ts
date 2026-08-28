import assert from 'node:assert/strict'
import test from 'node:test'

import { resolveRecapPdfUrl } from './resolve-recap-pdf-url.ts'

const baseUrl = 'https://florian.bruniaux.com/guides/recap-cards'

test('keeps a locally hosted recap PDF path on the landing origin', () => {
  assert.equal(
    resolveRecapPdfUrl('/cheatsheets/pdf/c14-agent-harness-map.en.pdf', baseUrl),
    '/cheatsheets/pdf/c14-agent-harness-map.en.pdf',
  )
})

test('prefixes a legacy hashed filename with the recap-card host', () => {
  assert.equal(
    resolveRecapPdfUrl('c01-trust-calibration.en.v1.0.0.11886ecf11cf.pdf', baseUrl),
    `${baseUrl}/c01-trust-calibration.en.v1.0.0.11886ecf11cf.pdf`,
  )
})

test('returns null when a card has no PDF', () => {
  assert.equal(resolveRecapPdfUrl(undefined, baseUrl), null)
})
