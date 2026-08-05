# Vendored code (just-bash terminal UI)

Source: https://github.com/vercel-labs/just-bash, path `examples/website/app/components/`.
Local clone used to copy from: `/Users/florianbruniaux/Sites/divers-test/just-bash`.

## Why vendored instead of imported

The `just-bash` npm package (`packages/just-bash`) ships only the bash
interpreter, not a terminal UI: `Bash` from `just-bash/browser` gives you a
programmatic shell, no DOM rendering. The visual terminal (`lite-terminal/`)
and the input-handling glue (`terminal-parts/input-handler.ts`) live only in
the demo site under `examples/website/`, which is **not published to npm**
and has no dependency relationship to this project.

## Licensing status: unresolved, tracked before production push

`packages/just-bash/LICENSE` is Apache-2.0 and covers the *package*. There is
no LICENSE file anywhere under `examples/` or at the repo root, so the code
copied below has no explicit license grant. This was a known, accepted risk
at design time: build and test locally, open a GitHub issue asking for
clarification, and resolve one way or another before this lands on
production.

Issue to open: https://github.com/vercel-labs/just-bash/issues/new
Suggested title: "Clarify license for examples/website (lite-terminal, terminal-parts)"

## Files copied verbatim (5 files, ~1750 lines)

- `lite-terminal/LiteTerminal.ts`
- `lite-terminal/ansi-parser.ts`
- `lite-terminal/input-handler.ts` (low-level DOM keyboard/touch handler,
  not to be confused with the sibling `../input-handler.ts` in this
  directory, which is the bash-aware fork described below)
- `lite-terminal/types.ts`
- `lite-terminal/index.ts`
- `markdown.ts` (from `terminal-parts/markdown.ts`), small ANSI markdown
  formatter, copied verbatim. Has one pre-existing unused constant (`DIM`)
  in upstream; left as-is rather than "fixing" vendored code.

No functional changes to any of the six files above. Copied as-is.

## Forked with deviations

`../input-handler.ts` (this directory's parent) is a fork of
`terminal-parts/input-handler.ts`, with:

- No `@vercel/analytics` `track()` call. This site doesn't use Vercel
  Analytics and has no reason to phone home to it.
- No `agent`/`about`/`install`/`github` custom commands. Those existed to
  power the official demo's AI agent. This POC has no LLM behind the
  terminal by design (see the brainstorming spec: it's a real shell over a
  real template corpus, not a Claude Code simulator).
- `HISTORY_KEY` renamed to `cc-guide-bash-playground-history` to avoid a
  sessionStorage collision if a visitor has both this site and the upstream
  demo open.

## Not vendored

- `terminal-parts/agent-command.ts`, `terminal-parts/commands.ts`: the
  agent/about/install/github commands, out of scope.
- `terminal-parts/constants.ts`'s `ASCII_ART`: dropped. The welcome banner
  here is a plain two-line message instead (see `boot.ts`), simpler and
  legible at any terminal width without a 43-column breakpoint.
- `Terminal.tsx` itself (React wrapper): not needed. This project has no
  React dependency; `boot.ts` mounts `LiteTerminal` directly from a vanilla
  `<script>`, same pattern as `src/scripts/search.ts`.

## Resyncing

If just-bash publishes a proper license for `examples/`, or ships a
terminal UI as part of the npm package, re-evaluate whether vendoring is
still the right call. To pull a fresh copy of the verbatim files, diff
against `examples/website/app/components/lite-terminal/` and
`examples/website/app/components/terminal-parts/markdown.ts` at whatever
commit is current, and re-apply the deviations listed above by hand. There
is no automated sync.
