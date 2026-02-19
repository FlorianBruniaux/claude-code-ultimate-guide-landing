import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'
import { docsLoader } from '@astrojs/starlight/loaders'
import { docsSchema } from '@astrojs/starlight/schema'

const questions = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/questions' }),
  schema: z.object({
    id: z.string().regex(/^\d{2}-\d{3}$/),
    category_id: z.number().min(1).max(15),
    difficulty: z.enum(['junior', 'intermediate', 'senior', 'power']),
    profiles: z.array(z.enum(['junior', 'senior', 'power', 'pm'])),
    correct: z.enum(['a', 'b', 'c', 'd']),
    options: z.object({
      a: z.string(),
      b: z.string(),
      c: z.string(),
      d: z.string(),
    }),
    doc_reference: z.object({
      file: z.string(),
      section: z.string(),
      anchor: z.string().optional(),
      line: z.string().optional(),
    }).optional(),
    official_doc: z.string().url().optional(),
  }),
})

const docs = defineCollection({
  loader: docsLoader(),
  schema: docsSchema(),
})

export const collections = { questions, docs }
