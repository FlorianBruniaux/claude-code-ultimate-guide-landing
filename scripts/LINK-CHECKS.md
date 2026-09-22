# Link checks

Run from the landing repository root, with the guide repository beside it:

```sh
pnpm test:links
pnpm build
pnpm check:links
```

The offline check reads every built HTML page, internal JavaScript `href` literals,
SVG links, diagram targets, the search index, quiz source paths, and the example
catalogue's view/download links. Internal routes must exist in `dist`. Links into
the two project repositories must exist with the exact filename case. Raw GitHub
URLs must point to files, never directories. It does not validate heading anchors
or execute arbitrary JavaScript.

Dynamic example and diagram destinations are exposed by `/api/link-targets.json`
from the same data and URL builder used by their controls. Extend this endpoint
when adding controls whose targets cannot be found in the rendered HTML or script
literals. Missing datasets fail the inventory.

After deployment, the scheduled workflow crawls every sitemap page, linked local
HTML page, script and interactive dataset, then checks external destinations:

```sh
python3 scripts/check-links.py --site https://cc.bruniaux.com --external --report link-check
```

For external checks of a local build, add `--external` to the offline command.
HEAD failures are retried with GET. HTTP 404/410 is reported as broken. Refused,
throttled, asynchronous and failed requests remain unverified. GitHub repository
paths can be verified against complete public Git trees; they are never presented
as HTTP 200 responses.

Reports contain the complete target inventory and referring pages in JSON and a
Markdown findings list. Exit codes: 0 for the requested checks passing, 1 for
broken targets, 2 for an incomplete inventory or unverified HTTP responses.
Without `--external`, external targets are explicitly marked `not-checked`.
