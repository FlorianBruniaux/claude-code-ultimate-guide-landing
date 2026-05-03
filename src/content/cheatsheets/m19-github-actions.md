---
title: "GitHub Actions + Claude Code"
subtitle: "Integrating Claude Code into GitHub CI/CD pipelines"
cardNumber: M19
category: Methodology
difficulty: advanced
guideVersion: 3.32.1
order: 119
---

## Recommended pattern: externalized prompt

The most robust pattern separates review logic from workflow mechanics. The YAML file orchestrates triggers and permissions; the `.github/prompts/code-review.md` file contains the review criteria. Modifying criteria does not require touching the workflow.

```
.github/
├── workflows/
│   └── claude-review.yml    # CI mechanics
└── prompts/
    └── code-review.md       # Criteria, protocols
```

This separation allows iterating on review quality without risking breaking the pipeline.

## Authentication: OAuth vs API Key

| Method | Cost per review | Prerequisites |
|--------|----------------|--------------|
| OAuth token (Max Plan) | ~$0 | Claude GitHub App installed |
| `ANTHROPIC_API_KEY` | $0.05-0.15 (Sonnet) | Anthropic API key |

OAuth via the Claude GitHub App is the preferred solution for teams on a Max plan: zero marginal cost per review, one-click configuration.

## Annotated minimal workflow

```yaml
on:
  pull_request:
    types: [opened, synchronize]
  issue_comment:
    types: [created]

jobs:
  claude-review:
    if: |
      github.event_name == 'pull_request' ||
      contains(github.event.comment.body, '/claude-review')
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - uses: anthropics/claude-code-action@v1
        with:
          claude_code_oauth_token: ${{ secrets.CLAUDE_CODE_OAUTH_TOKEN }}
          model: claude-sonnet-4-6
          prompt_file: .github/prompts/code-review.md
          allowed_tools: Read,Glob,Grep
```

The `fetch-depth: 0` is necessary so Claude has access to the full git history and can compare the branch against main.

## Allowed tools in CI

In CI, limit Claude to read-only tools. `Read`, `Glob` and `Grep` cover all needs of a code review. Adding `Write` or `Bash` creates a risk of accidentally modifying the repository during analysis.

GitHub MCP tools (`mcp__github__get_pull_request_diff`, `mcp__github__submit_pending_pull_request_review`) allow Claude to post inline comments without direct write access to the repository.

## Anti-hallucination protocol

The main problem with automated reviews: Claude invents line numbers or reports issues it has not verified. The mitigation protocol consists of explicitly asking in the prompt to verify before any assertion.

Wording in `code-review.md`:

```markdown
Before reporting any issue, verify it with Read or Grep.
Never cite a line number you have not confirmed.
Structure output: MUST FIX / SHOULD FIX / CAN SKIP.
```

This instruction reduces false positives without complicating the workflow.

## On-demand trigger: `/claude-review`

The `issue_comment` trigger allows any team member to trigger a review on demand by typing `/claude-review` in a PR comment. Useful for complex PRs where an automatic review on open would not have had enough context.

The condition `github.event.issue.pull_request != null` filters ordinary issue comments to activate the agent only on PRs.

## `claude ultrareview` in CI (v2.1.120)

`claude ultrareview` runs a deep multi-pass review of a target file or the current PR. The `--json` flag makes it parseable downstream.

```yaml
- name: Ultra review changed files
  run: |
    claude ultrareview ${{ github.event.pull_request.head.sha }} \
      --json > ultrareview.json
    cat ultrareview.json | jq '.issues[] | select(.severity == "critical")'
```

Combine with the anti-hallucination pattern: `ultrareview` verifies each finding with `Read` or `Grep` before reporting, so false positives are reduced compared to a simple prompt-based review.

## Handling failures

Provide a fallback job that posts a comment if the Claude job fails. Without a fallback, a PR can remain silent for hours if the agent crashes, without the team knowing.

```yaml
- name: Handle review failure
  if: failure()
  uses: actions/github-script@v7
  with:
    script: |
      github.rest.issues.createComment({
        issue_number: context.payload.pull_request.number,
        owner: context.repo.owner,
        repo: context.repo.repo,
        body: '⚠️ Claude review failed — human reviewer needed.'
      });
```
