interface GitHubStats {
  stars: number
  forks: number
  updatedAt: string
}

export async function fetchGitHubStats(): Promise<GitHubStats> {
  try {
    const res = await fetch(
      'https://api.github.com/repos/FlorianBruniaux/claude-code-ultimate-guide',
      {
        headers: {
          Accept: 'application/vnd.github.v3+json',
          ...(import.meta.env.GITHUB_TOKEN
            ? { Authorization: `Bearer ${import.meta.env.GITHUB_TOKEN}` }
            : {}),
        },
      },
    )
    if (!res.ok) throw new Error(`GitHub API ${res.status}`)
    const data = await res.json()
    return {
      stars: data.stargazers_count ?? 0,
      forks: data.forks_count ?? 0,
      updatedAt: data.pushed_at ?? new Date().toISOString(),
    }
  } catch {
    return { stars: 101, forks: 0, updatedAt: new Date().toISOString() }
  }
}
