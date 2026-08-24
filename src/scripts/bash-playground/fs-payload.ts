/**
 * Loads and filters the preloaded virtual filesystem for the bash playground.
 *
 * The payload is generated at build time by scripts/build-terminal-fs.mjs
 * (public/terminal-fs.json) and fetched once, in full, when the terminal
 * mounts. Deliberately NOT lazy per-file: just-bash's InMemoryFs.stat()
 * materializes lazy entries to compute size, and grep batches 50 concurrent
 * fetches. A single `grep -r` on a lazy filesystem would fan out into
 * dozens of requests to a possibly rate-limited source. See the design doc
 * for the full reasoning.
 */

export interface TerminalFsPayload {
  version: string
  generatedAt: string
  byteSize: number
  cwd: string
  files: Record<string, string>
}

const DEFAULT_URL = '/terminal-fs.json'

/**
 * Fetch and parse the generated payload. Throws on a non-ok response or a
 * network failure; callers decide the fallback behavior (see boot.ts,
 * which falls back to FALLBACK_PAYLOAD and shows a reduced-mode banner).
 */
type FetchLike = (url: string, init?: { signal?: AbortSignal }) => Promise<Response>

export async function loadTerminalFs(
  opts: {
    url?: string
    signal?: AbortSignal
    fetchImpl?: FetchLike
  } = {}
): Promise<TerminalFsPayload> {
  const { url = DEFAULT_URL, signal, fetchImpl = fetch } = opts
  const res = await fetchImpl(url, { signal })
  if (!res.ok) {
    throw new Error(`terminal fs payload fetch failed: ${res.status} ${res.statusText}`)
  }
  return (await res.json()) as TerminalFsPayload
}

/**
 * Return a payload containing only files whose path starts with one of the
 * given prefixes. Used to carve a small subset (e.g. just agents/) for a
 * lighter-weight embed, the homepage teaser planned for phase 2.
 */
export function subsetFs(payload: TerminalFsPayload, prefixes: string[]): TerminalFsPayload {
  const files: Record<string, string> = {}
  for (const [path, content] of Object.entries(payload.files)) {
    if (prefixes.some((prefix) => path.startsWith(prefix))) {
      files[path] = content
    }
  }
  return { ...payload, files }
}

/**
 * Minimal, self-contained payload used when the generated JSON can't be
 * fetched (network failure, rate limit, build produced no file yet). Small
 * enough to inline directly in the bundle, with no network round-trip.
 */
export const FALLBACK_PAYLOAD: TerminalFsPayload = {
  version: 'fallback',
  generatedAt: '',
  byteSize: 0,
  cwd: '/home/user',
  files: {
    '/home/user/README.md': [
      '# Claude Code template explorer (reduced mode)',
      '',
      'The full template corpus could not load. Try:',
      '',
      '  cat examples/config/settings.json',
      '  ls examples/',
      '',
      'Reload the page to retry the full corpus.',
    ].join('\n'),
    '/home/user/examples/config/settings.json': JSON.stringify(
      {
        hooks: {
          PreToolUse: [
            { matcher: 'Bash', hooks: [{ type: 'command', command: 'scripts/security-gate.sh' }] },
          ],
        },
      },
      null,
      2
    ),
  },
}
