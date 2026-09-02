import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

function source(path: string) {
  return readFileSync(new URL(path, import.meta.url), 'utf8')
}

const homepageMcp = source('../components/landing/McpProof.astro')
const homepageContent = source('./homepage-content.ts')
const searchIndex = source('./search-index.ts')
const htmlSitemap = source('../pages/sitemap/index.astro')
type IntentNavigationItem = { site_path: string }
type IntentNavigationGroup = { items: IntentNavigationItem[] }
const intentNavigation = JSON.parse(source('./intent-navigation.json')) as { groups: IntentNavigationGroup[] }
const footer = source('../components/global/Footer.astro')
const astroConfig = source('../../astro.config.mjs')

test('the homepage MCP proof leads to the dedicated product page', () => {
  assert.match(homepageMcp, /href="\/mcp\/"/)
  assert.match(homepageMcp, /View MCP setup|Explore the MCP|MCP setup/)
  assert.match(homepageMcp, /github\.com\/FlorianBruniaux\/claude-code-ultimate-guide\/tree\/main\/mcp-server/)
  assert.match(homepageMcp, /loadMcpProductData/)
  assert.match(homepageMcp, /\{mcp\.installCommand\}/)
  assert.doesNotMatch(homepageMcp, /> npx -y claude-code-ultimate-guide-mcp<\/code>/)
})

test('the resource catalog exposes the MCP product route', () => {
  assert.match(homepageContent, /title: 'MCP Server'[\s\S]*href: '\/mcp\/'/)
})

test('Cmd+K includes one landing entry for the MCP product', () => {
  assert.match(searchIndex, /id: 'page-mcp'/)
  assert.match(searchIndex, /url: '\/mcp\/'/)
  assert.match(searchIndex, /claude code ultimate guide mcp/i)
})

test('navigation and the HTML sitemap expose the MCP product separately from the choice guide', async () => {
  const { navigationSections } = await import('./header-navigation.ts')
  const buildLinks = navigationSections
    .find((section) => section.id === 'build')
    ?.groups.flatMap((group) => group.links)

  assert.ok(buildLinks?.some((link) => link.href === '/mcp/' && link.label === 'Claude Code Guide MCP Server'))
  assert.ok(buildLinks?.some((link) => link.href === '/mcp-or-cli/' && link.label === 'MCP or CLI?'))
  assert.match(htmlSitemap, /intent-navigation\.json/)
  const sitemapPaths = intentNavigation.groups.flatMap(group => group.items.map(item => item.site_path))
  assert.ok(sitemapPaths.includes('/mcp/'))
  assert.ok(sitemapPaths.includes('/mcp-or-cli/'))
})

test('the XML sitemap gives the MCP page stable product metadata', () => {
  assert.match(astroConfig, /'https:\/\/cc\.bruniaux\.com\/mcp\/': '2026-08-31'/)
  assert.match(
    astroConfig,
    /normalizedUrl === 'https:\/\/cc\.bruniaux\.com\/mcp\/'[\s\S]*priority: 0\.9[\s\S]*changefreq: 'monthly'/,
  )
})

test('the full and compact footers link to the MCP product page', () => {
  assert.match(footer, /\{ href: '\/mcp\/', label: 'MCP Server' \}/)
  assert.match(footer, /<a href="\/mcp\/">MCP<\/a>/)
})
