import type { APIRoute } from 'astro'
import { SEARCH_INDEX } from '../data/search-index'

// Static endpoint: the Cmd+K search index as a single cacheable JSON asset.
// Keeps the ~940 KB payload out of every page's HTML (crawl budget + TTFB).
export const GET: APIRoute = () => {
  return new Response(JSON.stringify(SEARCH_INDEX), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  })
}
