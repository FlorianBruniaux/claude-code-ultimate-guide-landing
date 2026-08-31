import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const pagePath = new URL('./index.astro', import.meta.url)
const terminalPath = new URL('../../components/mcp/McpTerminal.astro', import.meta.url)

function readPage(): string {
  return readFileSync(pagePath, 'utf8')
}

function readTerminal(): string {
  return readFileSync(terminalPath, 'utf8')
}

test('the MCP route loads public product data and declares its page contract', () => {
  const source = readPage()

  assert.match(source, /import Layout from ['"]\.\.\/\.\.\/layouts\/Layout\.astro['"]/)
  assert.match(source, /import \{ loadMcpProductData \} from ['"]\.\.\/\.\.\/utils\/mcp-product-data['"]/)
  assert.match(source, /const mcp = loadMcpProductData\(\)/)
  assert.match(source, /<Layout[\s\S]*?jsonLd=/)
  assert.match(source, /<McpTerminal command=\{mcp\.installCommand\}/)
})

test('the page exposes every decision-making section in semantic HTML', () => {
  const source = readPage()

  for (const id of [
    'first-query',
    'capabilities',
    'compatibility',
    'privacy',
    'npm-stats',
    'faq',
    'sources',
  ]) {
    assert.match(source, new RegExp(`aria-labelledby=["']${id}["']`), `missing section ${id}`)
    assert.match(source, new RegExp(`id=["']${id}["']`), `missing heading ${id}`)
  }

  assert.match(source, /href="\/guide\/claude-code-guide-mcp\/"/)
  assert.match(source, /Claude Code/)
  assert.match(source, /Codex/)
})

test('npm figures are dated, scoped, and explicitly not user activity', () => {
  const source = readPage()

  assert.match(source, /mcp\.downloads\.sinceLaunch\.(start|end)/)
  assert.match(source, /mcp\.downloads\.last30Days\.(start|end)/)
  assert.match(source, /mcp\.downloads\.last7Days\.(start|end)/)
  assert.match(source, /npm downloads do not measure users, active installations, sessions, or tool executions/i)
  assert.doesNotMatch(source, /\bactive users?\b(?![^<]*do not measure)/i)
})

test('structured data only describes visible software and FAQ content', () => {
  const source = readPage()

  assert.match(source, /['"]@type['"]:\s*['"]SoftwareApplication['"]/)
  assert.match(source, /['"]@type['"]:\s*['"]FAQPage['"]/)
  assert.match(source, /What does the MCP server expose\?/)
  assert.match(source, /Does it send my prompts or code anywhere\?/)
  assert.match(source, /Can I use it with Claude Code and Codex\?/)
})

test('the terminal remains readable without JavaScript and enhances copy accessibly', () => {
  const source = readTerminal()

  assert.match(source, /<code[^>]*>\{command\}<\/code>/)
  assert.match(source, /data-copy-command/)
  assert.match(source, /aria-live="polite"/)
  assert.match(source, /navigator\.clipboard\.writeText/)
  assert.match(source, /Copy failed/)
  assert.match(source, /overflow-x:\s*auto/)
  assert.match(source, /word-break:\s*normal/)
})
