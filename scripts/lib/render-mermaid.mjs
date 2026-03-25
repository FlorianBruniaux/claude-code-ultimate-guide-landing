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

/**
 * Render a mermaid code string to SVG using mmdc CLI.
 *
 * @param {string} mermaidCode - Raw mermaid diagram code
 * @param {string} diagramId   - Unique identifier (used for temp files + SVG IDs)
 * @param {string} theme       - Mermaid theme: 'neutral' (light) or 'dark'
 * @returns {string|null}      - SVG string or null on failure
 */
export function renderSVG(mermaidCode, diagramId, theme = 'neutral') {
  if (!mmdcAvailable) return null

  const safeId = diagramId.replace(/[^a-z0-9]/gi, '-')
  const tmpIn  = resolve(os.tmpdir(), `mermaid-${safeId}.mmd`)
  const tmpOut = resolve(os.tmpdir(), `mermaid-${safeId}.svg`)

  try {
    writeFileSync(tmpIn, mermaidCode, 'utf-8')

    execSync(
      `npx mmdc -i "${tmpIn}" -o "${tmpOut}" -t ${theme} -b transparent`,
      { stdio: 'pipe', timeout: 30000 }
    )

    if (!existsSync(tmpOut)) return null

    let svg = readFileSync(tmpOut, 'utf-8')

    // Remove XML prolog if present
    svg = svg.replace(/<\?xml[^>]*\?>\s*/g, '')

    // Make SVG IDs unique per diagram to prevent CSS selector conflicts
    svg = svg.replace(/id="my-svg"/g, `id="${safeId}"`)
    svg = svg.replace(/#my-svg\b/g, `#${safeId}`)

    // Add class to root <svg> element for styling
    svg = svg.replace(/<svg\s/, `<svg class="diagram-svg" `)

    return svg
  } catch (err) {
    console.warn(`[mermaid] WARNING: mmdc failed for ${diagramId}: ${err.message}`)
    return null
  }
}