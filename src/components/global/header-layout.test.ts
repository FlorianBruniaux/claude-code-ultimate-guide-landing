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

test('an open panel and the current section use separate desktop styles', () => {
  const desktop = headerSource.slice(headerSource.indexOf('@media (min-width: 64rem)'))
  assert.doesNotMatch(desktop, /\.is-active,\s*\.top-level-link\[data-open\]/, 'active and open must not share a rule')
  assert.match(desktop, /\.top-level-link\.is-active::after \{[^}]*opacity:\s*1;/)
  // Portfolio compact header: the open item sits on the elevated surface.
  assert.match(desktop, /\.top-level-link\[data-open\] \{[^}]*background:\s*var\(--bg-tertiary\);/)
  assert.match(desktop, /\.top-level-link\[data-open\]::after \{[^}]*opacity:\s*0;/)
})

test('the direct Guide link sits on the same track as the menu triggers and Sponsor', () => {
  const desktop = headerSource.slice(headerSource.indexOf('@media (min-width: 64rem)'))
  assert.match(desktop, /\.top-level-direct \{[^}]*\balign-self:\s*flex-start;/)
})

test('essential cards read left-aligned, title above description', () => {
  const desktop = headerSource.slice(headerSource.indexOf('@media (min-width: 64rem)'))
  assert.match(desktop, /\.intent-card \{[^}]*\balign-items:\s*flex-start;[^}]*\bjustify-content:\s*flex-start;/)
})

test('PA-01: the panel lists Essentials and Go further before the author projects', () => {
  const essentials = headerSource.indexOf('class="intent-panel-body"')
  const projects = headerSource.indexOf('class="intent-panel-projects"')

  assert.ok(essentials > -1 && projects > -1, 'both blocks must exist')
  assert.ok(essentials < projects, 'projects must come after the Essentials body')
})

test('PA-01: the projects strip closes the panel with a top rule, not a bottom one', () => {
  const rule = headerSource.match(/\.intent-panel-projects \{([^}]*)\}/g)?.at(-1)

  assert.ok(rule, 'desktop rule for the projects block must exist')
  assert.match(rule, /\bborder-top:\s*1px solid var\(--border-light\);/)
  assert.doesNotMatch(rule, /border-bottom/)
})
