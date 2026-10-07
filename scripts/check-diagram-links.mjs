import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'

// Reuse Astro's installed Markdown parser and heading slugger, with no new dependency.
const astroRequire = createRequire(import.meta.resolve('astro'))
const markdownRequire = createRequire(astroRequire.resolve('@astrojs/markdown-remark'))
const { unified } = await import(markdownRequire.resolve('unified'))
const { default: remarkParse } = await import(markdownRequire.resolve('remark-parse'))
const { default: Slugger } = await import(markdownRequire.resolve('github-slugger'))
const { toString } = await import(markdownRequire.resolve('mdast-util-to-string'))
const BASE = 'https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/main/'

/** Validate diagram Markdown and click links against the selected guide checkout. */
export function checkDiagramLinks(guideRoot) {
  const links = new Map()
  const documents = new Map()
  const parse = file => {
    if (!documents.has(file)) {
      const md = readFileSync(resolve(guideRoot, file), 'utf8').replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '')
      documents.set(file, unified().use(remarkParse).parse(md))
    }
    return documents.get(file)
  }
  const walk = (node, visit) => { visit(node); node.children?.forEach(child => walk(child, visit)) }
  for (const name of readdirSync(resolve(guideRoot, 'guide/diagrams')).filter(name => name.endsWith('.md'))) {
    const file = 'guide/diagrams/' + name
    const add = raw => {
      const url = new URL(raw, BASE + file).href
      if (!links.has(url)) links.set(url, new Set())
      links.get(url).add(file)
    }
    walk(parse(file), node => {
      if (node.type === 'link' || node.type === 'definition') add(node.url)
      if (node.type === 'code' && node.lang === 'mermaid') {
        for (const match of node.value.matchAll(/click\s+\S+\s+href\s+"([^"]+)"/g)) add(match[1])
      }
    })
  }
  const anchorCache = new Map()
  const failures = []
  let checked = 0
  let external = 0
  for (const [url, origins] of links) {
    if (!url.startsWith(BASE)) { external++; continue }
    checked++
    const target = new URL(url)
    const file = decodeURIComponent(target.pathname.slice(new URL(BASE).pathname.length))
    if (!existsSync(resolve(guideRoot, file))) {
      failures.push({ url, origins: [...origins], kind: 'missing-file' })
      continue
    }
    if (!target.hash) continue
    if (!anchorCache.has(file)) {
      const slugger = new Slugger()
      const ids = new Set()
      walk(parse(file), node => {
        if (node.type === 'heading') ids.add(slugger.slug(toString(node)))
        if (node.type === 'html') for (const match of node.value.matchAll(/(?:id|name)=["']([^"']+)["']/g)) ids.add(match[1])
      })
      anchorCache.set(file, ids)
    }
    if (!anchorCache.get(file).has(decodeURIComponent(target.hash.slice(1)))) {
      failures.push({ url, origins: [...origins], kind: 'missing-fragment' })
    }
  }
  return { checked, external, failures }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const guideRoot = resolve(process.env.GUIDE_REPO_PATH ?? '../claude-code-ultimate-guide')
  const result = checkDiagramLinks(guideRoot)
  for (const failure of result.failures) console.error(`${failure.kind}: ${failure.url} (${failure.origins.join(', ')})`)
  console.log(`Diagram links: ${result.checked} repository URLs, ${result.failures.length} failures. ${result.external} external URLs need a separate online check.`)
  if (result.failures.length) process.exitCode = 1
}
