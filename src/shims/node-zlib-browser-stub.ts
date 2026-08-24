/**
 * Browser stub for `node:zlib`.
 *
 * just-bash's coreutils bundle (`just-bash/browser`) statically imports
 * `gunzipSync`/`gzipSync`/`constants` from `node:zlib` at module top level
 * to implement its `gzip`/`gunzip`/`zcat` commands, even though the
 * package's own docs describe those commands as browser-unsupported (see
 * "Browser Support" in the just-bash README). Vite/Rollup can't bundle a
 * real Node built-in for the client, so the build fails outright unless
 * `node:zlib` resolves to something.
 *
 * This site's bash playground never exposes gzip/gunzip/zcat to visitors
 * (not in the suggested commands, not part of the demo's value prop), so a
 * throwing stub is enough to satisfy the bundler without pulling in a real
 * zlib polyfill (pako, browserify-zlib) for a feature nobody uses here.
 * Aliased in astro.config.mjs via `vite.resolve.alias`.
 */

export const constants = {
  Z_BEST_COMPRESSION: 9,
  Z_BEST_SPEED: 1,
  Z_DEFAULT_COMPRESSION: -1,
}

function unsupported(): never {
  throw new Error('gzip/gunzip/zcat are not available in this browser demo')
}

export function gunzipSync(): never {
  return unsupported()
}

export function gzipSync(): never {
  return unsupported()
}

export default { constants, gunzipSync, gzipSync }
