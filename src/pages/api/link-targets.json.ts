import { EXAMPLES } from '../../data/examples-data'
import { DIAGRAM_GUIDE_URLS } from '../../data/diagrams-guide-urls'
import { exampleLinks } from '../../utils/example-links'

// Dynamic controls share their destinations with the public link checker.
export function GET() {
  const urls = [
    ...Object.values(DIAGRAM_GUIDE_URLS).flat(),
    ...Object.values(EXAMPLES).flatMap((category) => category.files.flatMap((file) => {
      const links = exampleLinks(file.path)
      return links.raw ? [links.github, links.raw] : [links.github]
    })),
  ]
  return new Response(JSON.stringify({ urls: [...new Set(urls)] }), {
    headers: { 'Content-Type': 'application/json' },
  })
}
