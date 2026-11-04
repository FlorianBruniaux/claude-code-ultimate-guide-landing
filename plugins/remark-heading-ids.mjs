/**
 * Supports the `{#custom-id}` heading suffix used in the guide sources
 * (`### Session Pattern Discovery {#session-pattern-discovery}`).
 *
 * Plain Markdown in Astro does not understand that syntax, so the suffix was
 * rendered as heading text and leaked into the page and the "On this page"
 * panel. This plugin removes it from the text and sets it as the heading id.
 * Astro's heading collector keeps an id that is already set.
 */
const SUFFIX = /\s*\{#([A-Za-z0-9][\w-]*)\}\s*$/

function walk(node, visit) {
  visit(node)
  if (Array.isArray(node.children)) for (const child of node.children) walk(child, visit)
}

export function remarkHeadingIds() {
  return (tree) => {
    walk(tree, (node) => {
      if (node.type !== 'heading' || !node.children?.length) return
      const last = node.children[node.children.length - 1]
      if (last.type !== 'text') return
      const match = last.value.match(SUFFIX)
      if (!match) return

      last.value = last.value.slice(0, match.index)
      if (last.value === '') node.children.pop()
      node.data ??= {}
      node.data.hProperties ??= {}
      node.data.hProperties.id = match[1]
    })
  }
}
