export function resolveRecapPdfUrl(value: string | undefined, baseUrl: string): string | null {
  if (!value) return null
  return value.startsWith('/') ? value : `${baseUrl}/${value}`
}
