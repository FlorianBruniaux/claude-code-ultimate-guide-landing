import { EXAMPLES, type ExampleFile, type ExamplesData } from '../data/examples-data.ts'

export function examplePageSlug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim().replace(/\s+/g, '-').replace(/-+/g, '-')
}

export function getExamplePages(): (ExampleFile & { categoryKey: string })[] {
  const categories: ExamplesData = EXAMPLES
  const examples = Object.entries(categories).flatMap(([categoryKey, category]) =>
    category.files.map(file => ({ ...file, categoryKey }))
  )
  const recommended = examples.filter(example => example.favorite)
  const others = examples.filter(example => !example.favorite && example.name.length < 30)
  return [...recommended, ...others.slice(0, Math.max(0, 50 - recommended.length))]
}
