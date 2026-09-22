const BASE = 'https://github.com/FlorianBruniaux/claude-code-ultimate-guide'

export function exampleLinks(path: string) {
  const directory = path.endsWith('/')
  return {
    github: `${BASE}/${directory ? 'tree' : 'blob'}/main/examples/${path}`,
    raw: directory ? null : `https://raw.githubusercontent.com/FlorianBruniaux/claude-code-ultimate-guide/main/examples/${path}`,
  }
}
