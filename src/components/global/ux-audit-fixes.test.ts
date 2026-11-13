import assert from 'node:assert/strict'
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import test from 'node:test'

// Garde-fous des corrections de l'audit UX du 13/11/2026
// (docs/ux-audit-2026-11-13/rapport-ux-2026-11-13.md et critique-backlog-v2.md).

const read = (path: string) => readFileSync(new URL(`../../../${path}`, import.meta.url), 'utf8')

test('UX-04: the closed feedback menu is inert, so its links leave the tab order', () => {
  const fab = read('src/components/global/FeedbackFab.astro')
  assert.match(fab, /id="feedback-menu"[^>]*\binert\b/, 'the menu starts inert in the markup')
  assert.match(fab, /function openMenu\(\) \{[\s\S]*?menu\.inert = false/, 'opening removes inert')
  assert.match(fab, /function closeMenu\(\) \{[\s\S]*?menu\.inert = true/, 'closing restores inert')
})

test('UX-03: consulting CTA actions shrink instead of widening the page', () => {
  const cta = read('src/components/global/ConsultingCta.astro')
  const block = cta.match(/\.consulting-cta-actions \{[^}]*\}/)?.[0] ?? ''
  assert.doesNotMatch(block, /flex-shrink:\s*0/)
  assert.match(block, /min-width:\s*0/)
})

test('UX-01: on desktop the footer paints above the fixed guide sidebar, not on the mobile drawer', () => {
  const css = read('src/styles/starlight-overrides.css')
  assert.match(
    css,
    /@media \(min-width: 50rem\) \{\s*\.sl-footer-portal \{\s*z-index: calc\(var\(--sl-z-index-menu\) \+ 1\);/,
  )
})

test('UX-02: the site ships its own 404 page, kept out of search engines', () => {
  assert.ok(existsSync(new URL('../../pages/404.astro', import.meta.url)), 'src/pages/404.astro exists')
  const page = read('src/pages/404.astro')
  assert.match(page, /noIndex=\{true\}/)
  assert.match(page, /href="\/guide\/"/)
  assert.match(page, /href="\/sitemap\/"/)
})

test('UX-07: the guide drawer trigger hides while the search dialog is open', () => {
  const css = read('src/styles/starlight-overrides.css')
  assert.match(css, /body:has\(\.search-modal:not\(\[hidden\]\)\) \.guide-menu-trigger \{[^}]*visibility:\s*hidden/)
})

test('UX-08: the mobile table of contents measures the real bottom of the sticky bars', () => {
  const toc = read('src/components/starlight/MobileTableOfContents.astro')
  assert.match(toc, /getBoundingClientRect\(\)\.bottom/)
  assert.doesNotMatch(toc, /const threshold = navHeight \+ tocHeight \+ 32/)
})

test('UX-11: a deep link jumps to its anchor instead of animating the whole page', () => {
  const css = read('src/styles/global.css')
  const header = read('src/components/global/Header.astro')
  assert.match(css, /html\.is-anchor-loading \{\s*scroll-behavior: auto/)
  assert.match(header, /is-anchor-loading/)
})

test('UX-05: guide pages render Starlight pagination outside the body-level footer portal', () => {
  const footer = read('src/components/starlight/Footer.astro')
  assert.match(footer, /import Pagination from/)
  const paginationAt = footer.indexOf('<Pagination')
  const portalAt = footer.indexOf('<div id="sl-footer-portal"')
  assert.ok(paginationAt > -1 && paginationAt < portalAt, 'Pagination is rendered before, not inside, the portal')
})

test('UX-05: every numbered H1 of the source guide starts its own chapter', () => {
  const prepare = read('scripts/prepare-guide-content.mjs')
  assert.match(prepare, /level === 1 && \/\^\(\\d\+\)\\\.\\s\//)
})

const chaptersDir = new URL('../../content/docs/guide/ultimate-guide/', import.meta.url)
test('UX-05: no generated chapter ends with the opening of the next chapter', { skip: !existsSync(chaptersDir) && 'generated guide content absent' }, () => {
  const files = readdirSync(chaptersDir).filter((f) => /^\d\d-.*\.md$/.test(f)).sort()
  for (const file of files) {
    const num = Number(file.slice(0, 2))
    // Shell comments such as "# 2. Open terminal" inside code fences are not titles.
    const body = readFileSync(new URL(file, chaptersDir), 'utf8').replace(/^(`{3,}|~{3,})[^\n]*\n[\s\S]*?^\1\s*$/gm, '')
    const next = new RegExp(`^#{1,2} ${num + 1}\\. `, 'm')
    if (num >= 1 && num < 11) assert.doesNotMatch(body, next, `${file} contains the title of chapter ${num + 1}`)
  }
})

test('UX-10: guide link card descriptions use the secondary text token', () => {
  const css = read('src/styles/starlight-overrides.css')
  assert.match(css, /\.sl-markdown-content \.sl-link-card \.description \{[^}]*color:\s*var\(--text-secondary\)/)
})

test('UX-10: cheatsheet context zones keep dark text on light fills', () => {
  const page = read('src/pages/cheatsheet/index.astro')
  assert.match(page, /\.context-zone \{[^}]*color:\s*#0a0a0a/)
  assert.match(page, /:global\(:root:not\(\[data-theme='dark'\]\)\) \.dont \{ color: #b42318; \}/)
})

test('UX-12: wide Markdown tables are keyboard focusable', () => {
  // Only regions that really scroll get a tab stop, on guide pages and on site pages.
  const guideHeader = read('src/components/starlight/Header.astro')
  assert.match(guideHeader, /function focusScrollableTables\(\)[\s\S]*?table\.scrollWidth > table\.clientWidth/)
  const layout = read('src/layouts/Layout.astro')
  assert.match(layout, /pre\.scrollWidth > pre\.clientWidth[\s\S]*?pre\.tabIndex = 0/)
})

test('UX-19: the announcement close button is a 44 px target', () => {
  const banner = read('src/components/global/AnnouncementBanner.astro')
  const block = banner.match(/\.ann-close \{[^}]*\}/)?.[0] ?? ''
  assert.match(block, /min-width:\s*44px/)
  assert.match(block, /min-height:\s*44px/)
})

test('AM-06: the keyboard shortcut hint is hidden on touch-only devices', () => {
  const header = read('src/components/global/Header.astro')
  assert.match(header, /@media \(hover: none\)[\s\S]*?\.search-trigger kbd \{\s*display: none/)
})

test('UX-16: search ignores accents in both directions', async () => {
  const { score } = await import('../../scripts/search-model.ts')
  assert.ok(score({ title: 'Guide de sécurité', keywords: '', category: '' }, 'securite') > 0)
  assert.ok(score({ title: 'Security', keywords: 'securite', category: '' }, 'sécurité') > 0)
})

test('UX-17: a failed search index offers a retry and a fallback link', () => {
  const search = read('src/scripts/search.ts')
  assert.match(search, /function retryButton\(\)/)
  assert.match(search, /Search is unavailable right now\.[^']*', retryButton\(\), ' ', sitemapLink\(\)/)
})

test('UX-13: code inside a block keeps the block size instead of shrinking again', () => {
  const css = read('src/styles/starlight-overrides.css')
  assert.match(css, /\.sl-markdown-content pre code \{\s*font-size: inherit;/)
})

test('UX-15: the code copy button stays visible at rest on desktop', () => {
  const css = read('src/styles/starlight-overrides.css')
  assert.match(css, /@media \(hover: hover\) \{\s*\.expressive-code \.frame \.copy button \{\s*opacity: 0\.6;/)
})

test('UX-09: floating buttons shrink to icons on short viewports', () => {
  const fab = read('src/components/global/GuidePageFab.astro')
  assert.match(fab, /@media \(max-width: 480px\), \(max-height: 600px\) \{\s*\.guide-fab-label \{\s*display: none/)
  assert.doesNotMatch(fab, /translateY\(-2px\)/)
  const css = read('src/styles/components.css')
  assert.match(css, /@media \(max-height: 600px\) \{\s*\.feedback-fab-text \{\s*display: none/)
})

test('UX-18: task-list checkboxes are hidden from assistive technologies', () => {
  const guideHeader = read('src/components/starlight/Header.astro')
  assert.match(guideHeader, /\.task-list-item input\[type="checkbox"\][\s\S]*?setAttribute\('aria-hidden', 'true'\)/)
})

test('UX-20: the guide portal uses the site container so its title lines up with the logo', () => {
  const css = read('src/styles/starlight-overrides.css')
  assert.match(css, /html\[data-has-hero\] \.content-panel \.sl-container \{\s*max-width: var\(--max-width\);\s*padding-inline: 1rem;/)
})
