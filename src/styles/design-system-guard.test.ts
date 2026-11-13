import assert from 'node:assert/strict'
import { readdirSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import test from 'node:test'

// Garde-fou du design system (voir .claude/rules/design-system.md).
// Plafonds relevés le 13/11/2026 : un motif ne doit jamais augmenter.
// Quand un nettoyage le fait baisser, abaisser le plafond ici.

const SRC = new URL('../', import.meta.url)

function collect(directory: URL): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const url = new URL(`${entry.name}${entry.isDirectory() ? '/' : ''}`, directory)
    if (entry.isDirectory()) return entry.name === 'content' ? [] : collect(url)
    return /\.(astro|css)$/.test(entry.name) ? [fileURLToPath(url)] : []
  })
}

const files = collect(SRC).map((path) => ({
  path: path.slice(fileURLToPath(SRC).length),
  lines: readFileSync(path, 'utf8').split('\n'),
}))

function matches(pattern: RegExp, only?: RegExp) {
  return files
    .filter((file) => !only || only.test(file.path))
    .flatMap((file) =>
      file.lines.flatMap((line, index) => (pattern.test(line) ? [`${file.path}:${index + 1}`] : [])),
    )
}

const RATCHETS: Array<{ name: string; pattern: RegExp; max: number }> = [
  { name: 'carte qui se soulève (translateY négatif)', pattern: /translateY\(-/, max: 20 },
  { name: 'transition: all', pattern: /transition:\s*all/, max: 11 },
  { name: 'rayon de 12 px ou plus', pattern: /border-radius:\s*(1[2-9]|[2-9]\d)px/, max: 10 },
  { name: 'ombre douce --shadow-md/lg', pattern: /shadow-(md|lg)/, max: 17 },
  { name: 'ancien accent indigo, violet, cyan ou bleu', pattern: /#(6366f1|8b5cf6|06b6d4|3b82f6)/i, max: 12 },
]

for (const { name, pattern, max } of RATCHETS) {
  test(`design system : « ${name} » ne dépasse pas ${max} occurrences`, () => {
    const found = matches(pattern)
    assert.ok(
      found.length <= max,
      `${found.length} occurrences pour ${max} permises. Utiliser les classes du système ` +
        `(brand-card, brand-interactive-card, jetons) plutôt que d'en ajouter :\n${found.join('\n')}`,
    )
  })
}

test('design system : aucune page ni composant ne redéfinit .btn, .btn-primary ou .btn-secondary', () => {
  const found = matches(/^\s*\.btn(-primary|-secondary)?\s*[{,]/, /\.astro$/)
  assert.deepEqual(found, [], 'Supprimer la redéfinition locale : le style commun de components.css doit s\'appliquer.')
})
