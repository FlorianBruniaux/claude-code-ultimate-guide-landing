/**
 * render-mermaid.mjs
 *
 * Shared helper for rendering Mermaid diagrams to SVG using mmdc CLI.
 * Used by both build-diagrams-data.mjs and prepare-guide-content.mjs.
 */

import { readFileSync, writeFileSync, existsSync } from 'fs'
import { execSync } from 'child_process'
import { resolve } from 'path'
import os from 'os'

// Check if mmdc is available once, at import time
let mmdcAvailable = false
try {
  execSync('npx --no-install mmdc --version', { stdio: 'pipe' })
  mmdcAvailable = true
} catch {
  try {
    execSync('npx mmdc --version', { stdio: 'pipe', timeout: 30000 })
    mmdcAvailable = true
  } catch {
    // mmdc not available — callers will fall back gracefully
  }
}

export { mmdcAvailable }

// Mermaid reuses marker, node and accessibility IDs across rendered SVGs.
// Rewrite references by syntax, never by a global '#id' replacement (hex colours
// and visible/quoted text can contain the same characters).
const SVG_TAG = /<(?:[^"'<>]|"[^"]*"|'[^']*')*>/g
const QUOTED_OR_COMMENT = /"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\/\*[\s\S]*?\*\//g

function rewriteURLs(value, ids) {
  return value.replace(/"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\/\*[\s\S]*?\*\/|url\(\s*(["']?)#([^\s)'";]+)\1\s*\)/gi,
    (match, quote, id) => id && ids.has(id) ? match.replace(`#${id}`, `#${ids.get(id)}`) : match)
}

function rewriteSelector(selector, ids) {
  return selector.replace(new RegExp(`${QUOTED_OR_COMMENT.source}|#((?:\\\\[0-9a-f]{1,6}\\s?|\\\\[^\\r\\n]|[\\w-])+)`, 'gi'),
    (match, token) => {
      if (!token) return match
      const id = token.replace(/\\([0-9a-f]{1,6}\s?|[^\r\n])/gi, (_, escaped) =>
        /^[0-9a-f]/i.test(escaped) ? String.fromCodePoint(parseInt(escaped.trim(), 16)) : escaped)
      return ids.has(id) ? `#${ids.get(id).replace(/[^\w-]/g, character => `\\${character}`)}` : match
    })
}

function rewriteCSS(css, ids) {
  let output = '', start = 0
  const tokens = new RegExp(`${QUOTED_OR_COMMENT.source}|[{}]`, 'g')
  for (const token of css.matchAll(tokens)) {
    if (token[0] !== '{' && token[0] !== '}') continue
    const section = css.slice(start, token.index)
    output += token[0] === '{' && !section.trimStart().startsWith('@')
      ? rewriteSelector(section, ids) : section
    output += token[0]
    start = token.index + 1
  }
  return rewriteURLs(output + css.slice(start), ids)
}

export function namespaceSVGIds(svg, prefix) {
  const ids = new Map()
  for (const [tag] of svg.matchAll(SVG_TAG)) {
    if (!/^<[\w:]/.test(tag)) continue
    for (const match of tag.matchAll(/\sid\s*=\s*(["'])(.*?)\1/g)) {
      ids.set(match[2], `${prefix}-${match[2]}`)
    }
  }
  const rewritten = svg.replace(SVG_TAG, tag => {
    if (!/^<[\w:]/.test(tag)) return tag
    return tag.replace(/(\s)([\w:-]+)(\s*=\s*)(["'])(.*?)\4/g,
      (attribute, space, name, equals, quote, value) => {
        let updated = value
        if (name === 'id') updated = ids.get(value) ?? value
        else if (name === 'href' || name === 'xlink:href') {
          if (value.startsWith('#') && ids.has(value.slice(1))) updated = `#${ids.get(value.slice(1))}`
        } else if (name === 'aria-labelledby' || name === 'aria-describedby') {
          updated = value.replace(/\S+/g, id => ids.get(id) ?? id)
        } else if (/^(?:style|fill|stroke|filter|clip-path|mask|marker(?:-start|-mid|-end)?|cursor|color-profile)$/.test(name)) {
          updated = rewriteURLs(value, ids)
        }
        return `${space}${name}${equals}${quote}${updated}${quote}`
      })
  })
  return rewritten.replace(/(<style\b[^>]*>)([\s\S]*?)(<\/style>)/gi,
    (_, open, css, close) => open + rewriteCSS(css, ids) + close)
}

/**
 * Render a mermaid code string to SVG using mmdc CLI.
 *
 * @param {string} mermaidCode - Raw mermaid diagram code
 * @param {string} diagramId   - Unique identifier (used for temp files + SVG IDs)
 * @param {string} theme       - Mermaid theme: 'neutral' (light) or 'dark'
 * @param {number} timeoutMs - Maximum CLI execution time
 * @returns {string|null}      - SVG string or null on failure
 */
export function renderSVG(mermaidCode, diagramId, theme = 'neutral', timeoutMs = 30000) {
  if (!mmdcAvailable) return null

  const safeId = diagramId.replace(/[^a-z0-9]/gi, '-')
  const tmpIn  = resolve(os.tmpdir(), `mermaid-${safeId}.mmd`)
  const tmpOut = resolve(os.tmpdir(), `mermaid-${safeId}.svg`)

  try {
    writeFileSync(tmpIn, mermaidCode, 'utf-8')

    execSync(
      `npx mmdc -i "${tmpIn}" -o "${tmpOut}" -t ${theme} -b transparent`,
      { stdio: 'pipe', timeout: timeoutMs }
    )

    if (!existsSync(tmpOut)) return null

    let svg = readFileSync(tmpOut, 'utf-8')

    // Remove XML prolog if present
    svg = svg.replace(/<\?xml[^>]*\?>\s*/g, '')

    // Namespace every ID and its local references, including both theme variants.
    svg = namespaceSVGIds(svg, `diagram-${safeId}-${theme}`)

    // Add class to root <svg> element for styling
    svg = svg.replace(/<svg\s/, `<svg class="diagram-svg" `)

    return svg
  } catch (err) {
    console.warn(`[mermaid] WARNING: mmdc failed for ${diagramId}: ${err.message}`)
    return null
  }
}