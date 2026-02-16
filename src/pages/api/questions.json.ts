import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'
import { categories } from '../../utils/categories'

export const GET: APIRoute = async () => {
  const allQuestions = await getCollection('questions')

  const questions = allQuestions
    .map((entry) => {
      const { data, body } = entry

      // Body format: question text \n---\n explanation text
      // The body is raw markdown after the frontmatter
      const parts = body?.split(/\n---\n/) ?? ['', '']
      const questionText = parts[0]?.trim() ?? ''
      const explanation = parts[1]?.trim() ?? ''

      // Reconstruct source_file path from the entry id
      // Entry id from glob loader is like "01-quick-start/001-slug"
      // We need "questions/01-quick-start/001-slug.md"
      const sourceFile = `questions/${entry.id}.md`

      return {
        id: data.id,
        difficulty: data.difficulty,
        profiles: data.profiles,
        category_id: data.category_id,
        question: questionText,
        options: data.options,
        correct: data.correct,
        explanation,
        source_file: sourceFile,
        ...(data.doc_reference ? { doc_reference: data.doc_reference } : {}),
        ...(data.official_doc ? { official_doc: data.official_doc } : {}),
      }
    })
    .sort((a, b) => a.id.localeCompare(b.id))

  const payload = { categories, questions }

  return new Response(JSON.stringify(payload, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
