const summaries: Record<string, string> = {
  stop_reason: 'Messages API field explaining why generation stopped, including completion, tool use, and limits. Separate from the Agent SDK max_turns option.',
  max_turns: 'Agent SDK limit on agentic turns. Reaching it returns a turn-limit error; it is separate from the Messages API stop_reason field.',
}
const sentenceSegmenter = new Intl.Segmenter('en', { granularity: 'sentence' })

export function getGlossaryDescription(term: { term: string; definition: string }): string {
  const definition = (summaries[term.term] ?? term.definition).replaceAll('`', '')
  const prefix = `${term.term}: `
  const description = `${prefix}${definition}`
  if (description.length <= 160) return description

  const firstSentence = sentenceSegmenter.segment(definition)[Symbol.iterator]().next().value?.segment.trimEnd()
  if (firstSentence && prefix.length + firstSentence.length <= 160) {
    return `${prefix}${firstSentence}`
  }

  return `${description.slice(0, 157).replace(/\s+\S*$/, '').trimEnd()}...`
}
