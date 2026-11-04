import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { Window } from 'happy-dom'

const styles = readFileSync(new URL('./starlight-overrides.css', import.meta.url), 'utf8')

test('guide splash content keeps the Starlight reading-width constraint', () => {
  const window = new Window()
  const { document } = window

  document.head.innerHTML = `
    <style>${styles}</style>
    <style>html:not([data-has-sidebar]) { --sl-content-width: 67.5rem; }</style>
  `
  document.body.innerHTML = `
    <main>
      <div class="main-pane">
        <div class="content-panel">
          <div class="sl-container">
            <div class="sl-markdown-content">Guide portal</div>
          </div>
        </div>
      </div>
    </main>
  `

  const container = document.querySelector('.sl-container')
  assert.ok(container)

  assert.equal(window.getComputedStyle(container).maxWidth, '1080px')
})

test('the portalled footer paints above the fixed guide side panels', () => {
  assert.match(styles, /\.sl-footer-portal \{[^}]*\bposition:\s*relative;[^}]*\bz-index:\s*1;/)
})

test('desktop sidebar groups hide the native summary triangle outside the mobile query', () => {
  const start = styles.lastIndexOf('Tailwind Preflight puts summary back')
  const desktop = styles.slice(start, styles.indexOf('/* ──', start))
  assert.match(desktop, /#starlight__sidebar summary::marker,\s*#starlight__sidebar summary::-webkit-details-marker \{[^}]*display:\s*none;/)
  assert.doesNotMatch(desktop, /@media/)
})

test('a folded "On this page" panel gives its width back to the article', () => {
  assert.match(styles, /html\[data-toc-collapsed\] \.right-sidebar-container \{[^}]*\bwidth:\s*3\.5rem;/)
  assert.match(styles, /html\[data-toc-collapsed\]\[data-has-sidebar\]\[data-has-toc\] \.main-pane \{[^}]*\bwidth:\s*calc\(100% - 3\.5rem\);/)
  assert.match(styles, /html\[data-toc-collapsed\] \.guide-toc-panel \{[^}]*display:\s*none;/)
})

test('the folded rail keeps its reopen button on screen', () => {
  // .right-sidebar is fixed and viewport-wide: without a rail width the
  // centred button sits past the right edge of the window.
  assert.match(styles, /html\[data-toc-collapsed\] \.right-sidebar-panel \.sl-container \{[^}]*\bwidth:\s*3\.5rem;/)
})

test('focus outline lists only the current section subsections', () => {
  assert.match(styles, /\.guide-toc\[data-outline='focus'\] \.guide-toc-sublist \{[^}]*display:\s*none;/)
  assert.match(styles, /\.guide-toc\[data-outline='focus'\] \.guide-toc-item:has\(\[aria-current='true'\]\) > \.guide-toc-sublist \{[^}]*display:\s*block;/)
})
