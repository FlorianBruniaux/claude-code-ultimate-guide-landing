import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'
import { docsLoader } from '@astrojs/starlight/loaders'
import { docsSchema } from '@astrojs/starlight/schema'

const questions = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/questions' }),
  schema: z.object({
    id: z.string().regex(/^\d{2}-\d{3}$/),
    category_id: z.number().min(1).max(17),
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
  // datePublished is a custom extension: docsSchema() has no such field, and
  // it's injected per-file at sync time from the guide repo's own git history
  // (see scripts/prepare-guide-content.mjs, getGitDates) since guide content
  // is gitignored here and has no git history of its own in this repo.
  schema: docsSchema({
    extend: z.object({
      datePublished: z.string().optional(),
      // Populated from real GSC top-query data per page, not guessed.
      // See the content_brief-driven pass tracked as a follow-up to this sync.
      keywords: z.array(z.string()).optional(),
    }),
  }),
})

const cheatsheets = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/cheatsheets' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    cardNumber: z.string(),
    category: z.string(),
    difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
    guideVersion: z.string().optional(),
    datePublished: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
    dateModified: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
    order: z.number(),
  }),
})

export const collections = { questions, docs, cheatsheets }
