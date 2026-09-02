import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const headerSource = readFileSync(new URL('./Header.astro', import.meta.url), 'utf8')

test('desktop navigation does not retain the full-height mobile drawer hit area', () => {
  assert.match(
    headerSource,
    /@media \(min-width: 64rem\) \{\s*\.primary-navigation \{[^}]*\bheight:\s*auto;/,
  )
})
