#!/usr/bin/env bash
set -euo pipefail

# The guide is a separate repository; its exact reviewed revision is required.
: "${GUIDE_COMMIT_SHA:?Set GUIDE_COMMIT_SHA to the reviewed 40-character guide commit SHA}"
if [[ ! "$GUIDE_COMMIT_SHA" =~ ^[0-9a-f]{40}$ ]]; then
  echo "GUIDE_COMMIT_SHA must be a full 40-character commit SHA" >&2
  exit 1
fi

if [[ "$(node -p 'process.versions.node.split(".")[0]')" != 22 ]]; then
  echo "Vercel project must use Node.js 22, matching the Pages build" >&2
  exit 1
fi
pnpm_cmd=(npx --yes pnpm@9)
if [[ "$("${pnpm_cmd[@]}" --version)" != 9.* ]]; then
  echo "Vercel build must use pnpm 9, matching the Pages build" >&2
  exit 1
fi

guide_root="$(cd .. && pwd)/claude-code-ultimate-guide"
if [[ -e "$guide_root" ]]; then
  echo "Guide path already exists: $guide_root. Refusing an unverified checkout." >&2
  exit 1
fi

if [[ "${1:-}" == "--preflight" ]]; then
  echo "Build preflight passed for guide $GUIDE_COMMIT_SHA"
  exit 0
fi
if [[ $# -ne 0 ]]; then
  echo "Usage: bash scripts/build-vercel.sh [--preflight]" >&2
  exit 1
fi

# The content scripts otherwise accept missing Chromium and publish diagram fallbacks.
diagram_check="$(mktemp -d)"
trap 'rm -rf "$diagram_check"' EXIT
printf 'graph TD; A-->B\n' > "$diagram_check/check.mmd"
"${pnpm_cmd[@]}" exec mmdc -i "$diagram_check/check.mmd" -o "$diagram_check/check.svg" > /dev/null
test -s "$diagram_check/check.svg"

git init -q "$guide_root"
git -C "$guide_root" remote add origin https://github.com/FlorianBruniaux/claude-code-ultimate-guide.git
git -C "$guide_root" fetch --depth 1 origin "$GUIDE_COMMIT_SHA"
git -C "$guide_root" checkout --quiet --detach FETCH_HEAD
actual_guide_sha="$(git -C "$guide_root" rev-parse HEAD)"
if [[ "$actual_guide_sha" != "$GUIDE_COMMIT_SHA" ]]; then
  echo "Guide changed: expected $GUIDE_COMMIT_SHA, fetched $actual_guide_sha" >&2
  exit 1
fi

landing_sha="${VERCEL_GIT_COMMIT_SHA:-$(git rev-parse HEAD)}"
echo "Building landing $landing_sha with guide $actual_guide_sha"

"${pnpm_cmd[@]}" check:agentsec-feed
"${pnpm_cmd[@]}" test
"${pnpm_cmd[@]}" test:links

# Use the same guide stats as the Pages build. Failure cannot silently alter OG metadata.
export GUIDE_LINES="$(wc -l < "$guide_root/guide/ultimate-guide.md" | tr -d '[:space:]')"
guide_stats="$(curl --fail --silent --show-error --retry 2 \
  https://api.github.com/repos/FlorianBruniaux/claude-code-ultimate-guide)"
export GUIDE_STARS="$(node -e 'const x=JSON.parse(process.argv[1]); if (!Number.isInteger(x.stargazers_count)) process.exit(1); process.stdout.write(String(x.stargazers_count))' "$guide_stats")"

"${pnpm_cmd[@]}" build
"${pnpm_cmd[@]}" check:links
"${pnpm_cmd[@]}" check:built-seo
python3 "$guide_root/scripts/check-public-paths.py" --dist dist
