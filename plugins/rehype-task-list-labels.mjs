/**
 * Task-list checkboxes (`- [ ] Install`) render as disabled inputs without a
 * label, which assistive technology announces as "checkbox, unlabelled"
 * (UX-18, 36 on the Quick Start chapter). The item's own text becomes the
 * checkbox label; the checked state is unchanged.
 */
function textOf(node) {
  if (node.type === 'text') return node.value
  if (node.type === 'element' && ['ul', 'ol'].includes(node.tagName)) return ''
  return (node.children ?? []).map(textOf).join('')
}

function walk(node, visit) {
  visit(node)
  for (const child of node.children ?? []) walk(child, visit)
}

export function rehypeTaskListLabels() {
  return (tree) => {
    walk(tree, (node) => {
      if (node.type !== 'element' || node.tagName !== 'li') return
      const box = (node.children ?? []).find((c) => c.type === 'element' && c.tagName === 'input' && c.properties?.type === 'checkbox')
        ?? node.children?.find((c) => c.type === 'element' && c.tagName === 'p')?.children?.find((c) => c.type === 'element' && c.tagName === 'input' && c.properties?.type === 'checkbox')
      if (!box || box.properties.ariaLabel) return
      const label = textOf(node).replace(/\s+/g, ' ').trim()
      if (label) box.properties.ariaLabel = label.length > 120 ? `${label.slice(0, 117)}...` : label
    })
  }
}
