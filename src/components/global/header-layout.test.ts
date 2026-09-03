import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { Window } from 'happy-dom'

const headerSource = readFileSync(new URL('./Header.astro', import.meta.url), 'utf8')

test('desktop navigation does not retain the full-height mobile drawer hit area', () => {
  assert.match(
    headerSource,
    /@media \(min-width: 64rem\) \{\s*\.primary-navigation \{[^}]*\bheight:\s*auto;/,
  )
})

test('Sponsor remains visible when EasyList generic cosmetic filters are active', () => {
  const classMatch = headerSource.match(
    /headerNavigationActions\.map[\s\S]*?<a\s+[\s\S]*?class="([^"]+)"/,
  )

  assert.ok(classMatch, 'Sponsor action must declare its CSS classes')

  const window = new Window()
  const style = window.document.createElement('style')
  style.textContent = '.sponsor-link { display: none !important; }'
  window.document.head.append(style)

  const sponsor = window.document.createElement('a')
  sponsor.className = classMatch[1]
  sponsor.style.display = 'inline-flex'
  sponsor.textContent = 'Sponsor'
  window.document.body.append(sponsor)

  assert.notEqual(window.getComputedStyle(sponsor).display, 'none')
})
