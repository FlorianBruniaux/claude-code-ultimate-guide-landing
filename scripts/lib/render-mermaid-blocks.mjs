import { renderSVG, mmdcAvailable } from './render-mermaid.mjs'

export function renderMermaidBlocks(content, fileSlug) {
  if (!mmdcAvailable) return content

  let blockIndex = 0
  return content.replace(/^```mermaid\n([\s\S]*?)^```/gm, (match, code) => {
    const id = `${fileSlug}-${blockIndex++}`
    const lightSvg = renderSVG(code.trim(), `${id}-light`, 'neutral')
    const darkSvg  = renderSVG(code.trim(), `${id}-dark`,  'dark')

    if (!lightSvg || !darkSvg) return match

    return `<div class="mermaid-diagram">
<div class="mermaid-light">${lightSvg ?? ''}</div>
<div class="mermaid-dark">${darkSvg ?? ''}</div>
</div>`
  })
}
