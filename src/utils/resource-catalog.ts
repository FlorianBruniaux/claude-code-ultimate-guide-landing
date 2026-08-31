import type { Whitepaper } from '../data/whitepapers-data.ts'

export const INITIAL_RECAP_CARD_LIMIT = 12

export interface RecapCatalogEntry {
  id: string
  cardNumber: string
  title: string
  subtitle: string
  tags: string[]
  category: string
  directAccess: boolean
}

export interface RecapCatalogState {
  category: string
  query: string
  showAll: boolean
}

export interface RecapCatalogView {
  visibleIds: string[]
  totalMatches: number
  hiddenCount: number
}

export function getRecapCatalogView(
  entries: RecapCatalogEntry[],
  state: RecapCatalogState,
): RecapCatalogView {
  const query = state.query.trim().toLocaleLowerCase('en')
  const matches = entries.filter(entry => {
    const categoryMatches = state.category === 'all'
      || (state.category === 'DirectAccess' ? entry.directAccess : entry.category === state.category)
    if (!categoryMatches) return false

    if (!query) return true
    const searchText = [entry.cardNumber, entry.title, entry.subtitle, ...entry.tags]
      .join(' ')
      .toLocaleLowerCase('en')
    return searchText.includes(query)
  })

  const shouldLimit = state.category === 'all' && !query && !state.showAll
  const visible = shouldLimit ? matches.slice(0, INITIAL_RECAP_CARD_LIMIT) : matches

  return {
    visibleIds: visible.map(entry => entry.id),
    totalMatches: matches.length,
    hiddenCount: matches.length - visible.length,
  }
}

export function getWhitepaperFormatOptions(whitepaper: Whitepaper): Array<'pdf' | 'epub'> {
  return [...new Set(whitepaper.formats)].filter(
    (format): format is 'pdf' | 'epub' => format === 'pdf' || format === 'epub',
  )
}
