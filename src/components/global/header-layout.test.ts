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

test('desktop Sponsor shares the primary navigation alignment track', () => {
  assert.match(
    headerSource,
    /@media \(min-width: 64rem\) \{[\s\S]*?\.header-support-action-navigation \{[^}]*\balign-self:\s*flex-start;/,
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

test('Sponsor uses a quiet borderless navigation treatment', () => {
  const supportActionRule = headerSource.match(
    /a\.header-support-action\.header-support-action-navigation \{([^}]*)\}/,
  )

  assert.ok(supportActionRule, 'Sponsor action must declare its base visual treatment')
  assert.match(supportActionRule[1], /\bborder:\s*0;/)
  assert.match(supportActionRule[1], /\bbackground:\s*transparent;/)
})

test('mobile Sponsor follows the drawer navigation alignment', () => {
  const supportActionRule = headerSource.match(
    /a\.header-support-action\.header-support-action-navigation \{([^}]*)\}/,
  )

  assert.ok(supportActionRule, 'Sponsor action must declare its mobile alignment')
  assert.match(supportActionRule[1], /\bjustify-content:\s*space-between;/)
})

test('Sponsor stays muted beside the primary navigation links', () => {
  const componentStyle = headerSource.match(/<style>([\s\S]*?)<\/style>/)

  assert.ok(componentStyle, 'Header must expose its component styles')

  const window = new Window()
  const style = window.document.createElement('style')
  style.textContent = `
    :root {
      --accent: #c2410c;
      --text-muted: #6b6053;
    }
    a:not([class*="btn"]):not([class*="text-white"]) {
      color: var(--accent);
    }
    ${componentStyle[1]}
  `
  window.document.head.append(style)

  const sponsor = window.document.createElement('a')
  sponsor.className = 'header-support-action header-support-action-navigation'
  window.document.body.append(sponsor)

  assert.equal(window.getComputedStyle(sponsor).color, '#6b6053')
})
