import assert from 'node:assert/strict'
import { after, test } from 'node:test'
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { Window } from 'happy-dom'

// Substitute only the slow external renderer. All SVG post-processing stays real.
const workspace = mkdtempSync(join(tmpdir(), 'mermaid-svg-test-'))
const originalPath = process.env.PATH
const fixture = `<svg id="my-svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-labelledby="chart-title chart-desc" aria-describedby="chart-desc">
<title id="chart-title">A diagram #node url(#node)</title><desc id="chart-desc">Diagram description</desc>
<style>#my-svg{fill:#fff;color:#abc}#my-svg #node,#fff{stroke:#fff;clip-path:url("#clip")}#my-svg #note\\:1{fill:url(#gradient)}@media (prefers-reduced-motion:reduce){#node{animation:none}}#node::after{content:"#node url(#node)"}</style>
<defs><marker id="arrow"><path d="M0 0 L3 3"/></marker><clipPath id="clip"><rect width="10" height="10"/></clipPath><linearGradient id="gradient"/><g id="symbol"/></defs>
<g id="node" data-id="node" data-note="#node url(#node)" marker-end="url(#arrow)" style="clip-path: url('#clip'); fill: #fff" aria-labelledby="chart-title chart-desc"><use href="#symbol"/><use xlink:href="#symbol"/></g>
<g id='note:1'/><g id="fff"/><a href="https://example.com/#node">External #node</a><a href="#outside">Outside</a><text>#node url(#node)</text>
</svg>`
const fixturePath = join(workspace, 'fixture.svg')
writeFileSync(fixturePath, fixture)
writeFileSync(join(workspace, 'npx'), `#!${process.execPath}
const fs = require('node:fs')
const args = process.argv.slice(2)
if (args.includes('--version')) process.exit(0)
fs.writeFileSync(args[args.indexOf('-o') + 1], fs.readFileSync(${JSON.stringify(fixturePath)}))
`, { mode: 0o755 })
process.env.PATH = `${workspace}:${originalPath}`
const { renderSVG } = await import('./render-mermaid.mjs')
after(() => {
  process.env.PATH = originalPath
  rmSync(workspace, { recursive: true, force: true })
})

function rendered(id = 'page-0', theme = 'neutral') {
  const svg = renderSVG('graph TD; A-->B', id, theme)
  assert.ok(svg, 'the renderer returns its processed SVG')
  return svg
}

function documentFor(markup) {
  const window = new Window()
  return new window.DOMParser().parseFromString(`<test>${markup}</test>`, "application/xml")
}

test('two diagrams in both themes have unique IDs in the same document', () => {
  const document = documentFor([
    rendered('page-0', 'neutral'), rendered('page-0', 'dark'),
    rendered('page-1', 'neutral'), rendered('page-1', 'dark'),
  ].join(''))
  const ids = [...document.querySelectorAll('[id]')].map(element => element.id)
  assert.equal(new Set(ids).size, ids.length)
})

test('all local fragment and ARIA references still point inside their SVG', () => {
  const document = documentFor(rendered())
  const svg = document.querySelector('svg')
  const titleId = svg.querySelector('title').id
  const descriptionId = svg.querySelector('desc').id
  assert.equal(svg.getAttribute('aria-labelledby'), `${titleId} ${descriptionId}`)
  assert.equal(svg.getAttribute('aria-describedby'), descriptionId)
  const node = svg.querySelector('[data-id="node"]')
  const symbolId = svg.querySelector('defs > g').id
  assert.equal(node.querySelector('use').getAttribute('href'), `#${symbolId}`)
  assert.equal(node.querySelectorAll('use')[1].getAttribute('xlink:href'), `#${symbolId}`)
  assert.equal(node.getAttribute('marker-end'), `url(#${svg.querySelector('marker').id})`)
  assert.equal(node.getAttribute('style'), `clip-path: url('#${svg.querySelector('clipPath').id}'); fill: #fff`)
  assert.notEqual(titleId, 'chart-title')
})

test('CSS ID selectors and url references follow the renamed nodes', () => {
  const document = documentFor(rendered())
  const svg = document.querySelector('svg')
  const css = svg.querySelector('style').textContent
  const nodeId = svg.querySelector('[data-id="node"]').id
  const noteId = [...svg.querySelectorAll('g')].find(element => element.id.endsWith('note:1')).id
  assert.ok(css.includes(`#${svg.id} #${nodeId},`))
  assert.ok(css.includes(`#${noteId.replace(':', '\\:')}`))
  assert.ok(css.includes(`clip-path:url("#${svg.querySelector('clipPath').id}")`))
  assert.ok(css.includes(`fill:url(#${svg.querySelector('linearGradient').id})`))
  assert.ok(css.includes(`{#${nodeId}{animation:none}}`))
  assert.ok(css.includes('fill:#fff;color:#abc'))
  assert.ok(css.includes('stroke:#fff;'))
  assert.ok(css.includes('content:"#node url(#node)"'))
})

test('visible text, data attributes and external references remain unchanged', () => {
  const document = documentFor(rendered())
  assert.equal(document.querySelector('title').textContent, 'A diagram #node url(#node)')
  assert.equal(document.querySelector('text').textContent, '#node url(#node)')
  const node = document.querySelector('[data-id="node"]')
  assert.equal(node.getAttribute('data-id'), 'node')
  assert.equal(node.getAttribute('data-note'), '#node url(#node)')
  assert.equal(document.querySelector('a').getAttribute('href'), 'https://example.com/#node')
  assert.equal(document.querySelectorAll('a')[1].getAttribute('href'), '#outside')
})
