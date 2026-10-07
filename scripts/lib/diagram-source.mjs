const SOURCE_BASE = 'https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/main/guide/diagrams/'

/** Extract each diagram together with its source URL, independent of its position. */
export function extractDiagramBlocks(content, sourceFilename) {
  const body = content.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '')
  const blocks = []
  const sectionRegex = /### (.+?)\n\n([\s\S]*?)```mermaid\n([\s\S]*?)```([\s\S]*?)(?=\n---|\n### |$)/g
  for (const match of body.matchAll(sectionRegex)) {
    const afterMermaid = match[4]
    const source = afterMermaid.match(/>\s*\*\*Source\*\*:\s*(.+?)(?:\n|$)/)?.[1]?.trim()
    const target = source?.match(/\[[^\]]+\]\(([^)\s]+)\)/)?.[1]
    if (!target) throw new Error(`${sourceFilename}: ${match[1]} needs a Source link`)
    const guideUrl = new URL(target, SOURCE_BASE + sourceFilename)
    if (guideUrl.protocol !== 'https:') throw new Error(`${sourceFilename}: Source must use HTTPS`)
    blocks.push({
      title: match[1].trim(),
      description: match[2].trim(),
      mermaidCode: match[3].trim(),
      asciiFallback: afterMermaid.match(/<details>[\s\S]*?```(?:text|plaintext)?\n([\s\S]*?)```\n[\s\S]*?<\/details>/)?.[1]?.trim() ?? '',
      sourceRef: source.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/\*\*/g, ''),
      guideUrl: guideUrl.href,
    })
  }
  const expected = [...body.matchAll(/^```mermaid\s*$/gm)].length
  if (blocks.length !== expected) throw new Error(`${sourceFilename}: extracted ${blocks.length}/${expected} diagrams`)
  if (blocks.some(block => !block.asciiFallback)) throw new Error(`${sourceFilename}: each diagram needs an ASCII fallback`)
  return blocks
}
