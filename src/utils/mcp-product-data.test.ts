import assert from 'node:assert/strict'
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import test from 'node:test'

import { loadMcpProductData } from './mcp-product-data.ts'

const PUBLIC_RUNTIME_PATH = 'machine-readable/mcp-public-runtime.json'
const NPM_STATS_PATH = 'machine-readable/mcp-stats.json'

const validRuntime = {
  schema_version: 1,
  snapshot_at: '2026-08-31T15:30:00Z',
  package: {
    name: 'claude-code-ultimate-guide-mcp',
    npm_version: '1.2.10',
  },
  server_info: {
    name: 'claude-code-guide',
    version: '1.2.0',
  },
  capabilities: {
    tools: ['guide_search', 'guide_get'],
    resources: ['guide://index'],
    prompts: ['find-guidance'],
  },
  counts: {
    tools: 2,
    resources: 1,
    prompts: 1,
  },
}

const validStats = {
  schema_version: 1,
  snapshot_at: '2026-08-31T15:06:00Z',
  package: 'claude-code-ultimate-guide-mcp',
  public_version: '1.2.10',
  downloads: {
    since_launch: {
      start: '2026-02-28',
      end: '2026-08-30',
      count: 8590,
    },
    last_30_days: {
      start: '2026-08-01',
      end: '2026-08-30',
      count: 5252,
    },
    last_7_days: {
      start: '2026-08-24',
      end: '2026-08-30',
      count: 125,
    },
  },
}

function createGuideFixture(options: {
  runtime?: unknown
  stats?: unknown
  runtimeRaw?: string
  statsPath?: string
} = {}) {
  const guideRoot = mkdtempSync(join(tmpdir(), 'mcp-product-data-'))
  const runtimePath = resolve(guideRoot, PUBLIC_RUNTIME_PATH)
  const statsPath = resolve(guideRoot, options.statsPath ?? NPM_STATS_PATH)

  mkdirSync(resolve(runtimePath, '..'), { recursive: true })
  mkdirSync(resolve(statsPath, '..'), { recursive: true })

  if (options.runtimeRaw !== undefined) {
    writeFileSync(runtimePath, options.runtimeRaw)
  } else if (options.runtime !== null) {
    writeFileSync(runtimePath, JSON.stringify(options.runtime ?? validRuntime))
  }

  if (options.stats !== null) {
    writeFileSync(statsPath, JSON.stringify(options.stats ?? validStats))
  }

  return guideRoot
}

function withGuideFixture(
  options: Parameters<typeof createGuideFixture>[0],
  assertion: (guideRoot: string) => void,
) {
  const guideRoot = createGuideFixture(options)
  try {
    assertion(guideRoot)
  } finally {
    rmSync(guideRoot, { recursive: true, force: true })
  }
}

test('loads one page model from the public runtime and dated npm evidence', () => {
  withGuideFixture({}, (guideRoot) => {
    assert.deepEqual(loadMcpProductData(guideRoot), {
      packageName: 'claude-code-ultimate-guide-mcp',
      publicVersion: '1.2.10',
      installCommand: 'npx -y claude-code-ultimate-guide-mcp@1.2.10',
      snapshotAt: '2026-08-31T15:30:00Z',
      serverName: 'claude-code-guide',
      serverVersion: '1.2.0',
      capabilities: {
        tools: ['guide_search', 'guide_get'],
        resources: ['guide://index'],
        prompts: ['find-guidance'],
      },
      counts: {
        tools: 2,
        resources: 1,
        prompts: 1,
      },
      downloads: {
        sinceLaunch: {
          start: '2026-02-28',
          end: '2026-08-30',
          count: 8590,
        },
        last30Days: {
          start: '2026-08-01',
          end: '2026-08-30',
          count: 5252,
        },
        last7Days: {
          start: '2026-08-24',
          end: '2026-08-30',
          count: 125,
        },
      },
      npmSnapshotAt: '2026-08-31T15:06:00Z',
      npmSource: 'npm downloads API',
      methodology:
        'npm downloads are package download events, not users, active installations, sessions, or tool executions.',
    })
  })
})

test('fails with the missing public evidence path', () => {
  withGuideFixture({ runtime: null }, (guideRoot) => {
    assert.throws(
      () => loadMcpProductData(guideRoot),
      new RegExp(`Missing MCP public evidence: .*${PUBLIC_RUNTIME_PATH}`),
    )
  })
})

test('fails when public runtime JSON cannot be parsed', () => {
  withGuideFixture({ runtimeRaw: '{not-json' }, (guideRoot) => {
    assert.throws(
      () => loadMcpProductData(guideRoot),
      new RegExp(`Invalid JSON in MCP public evidence: .*${PUBLIC_RUNTIME_PATH}`),
    )
  })
})

test('fails closed on an unsupported public runtime schema', () => {
  withGuideFixture(
    { runtime: { ...validRuntime, schema_version: 2 } },
    (guideRoot) => {
      assert.throws(
        () => loadMcpProductData(guideRoot),
        /Invalid MCP public runtime: schema_version must be 1/,
      )
    },
  )
})

test('fails when a declared capability count differs from its list', () => {
  withGuideFixture(
    {
      runtime: {
        ...validRuntime,
        counts: { ...validRuntime.counts, tools: 17 },
      },
    },
    (guideRoot) => {
      assert.throws(
        () => loadMcpProductData(guideRoot),
        /Invalid MCP public runtime: counts\.tools is 17 but capabilities\.tools has 2 entries/,
      )
    },
  )
})

test('fails when an npm download period has no explicit end date', () => {
  const stats = structuredClone(validStats)
  delete (stats.downloads.last_30_days as { end?: string }).end

  withGuideFixture({ stats }, (guideRoot) => {
    assert.throws(
      () => loadMcpProductData(guideRoot),
      /Invalid MCP npm statistics: downloads\.last_30_days\.end must be a YYYY-MM-DD date/,
    )
  })
})

test('fails when npm package identity contradicts the public runtime', () => {
  withGuideFixture(
    { stats: { ...validStats, public_version: '1.2.9' } },
    (guideRoot) => {
      assert.throws(
        () => loadMcpProductData(guideRoot),
        /Contradictory MCP evidence: runtime npm version 1\.2\.10 differs from statistics public version 1\.2\.9/,
      )
    },
  )
})

test('rejects a runtime package other than the canonical MCP package', () => {
  withGuideFixture(
    {
      runtime: {
        ...validRuntime,
        package: { ...validRuntime.package, name: 'lookalike-guide-mcp' },
      },
    },
    (guideRoot) => {
      assert.throws(
        () => loadMcpProductData(guideRoot),
        /Invalid MCP public runtime: package\.name must be claude-code-ultimate-guide-mcp/,
      )
    },
  )
})

test('rejects two agreeing artifacts that name the wrong package', () => {
  withGuideFixture(
    {
      runtime: {
        ...validRuntime,
        package: { ...validRuntime.package, name: 'lookalike-guide-mcp' },
      },
      stats: { ...validStats, package: 'lookalike-guide-mcp' },
    },
    (guideRoot) => {
      assert.throws(
        () => loadMcpProductData(guideRoot),
        /Invalid MCP public runtime: package\.name must be claude-code-ultimate-guide-mcp/,
      )
    },
  )
})

for (const invalidVersion of ['1.2', 'v1.2.10', '01.2.10']) {
  test(`rejects invalid runtime npm SemVer ${invalidVersion}`, () => {
    withGuideFixture(
      {
        runtime: {
          ...validRuntime,
          package: { ...validRuntime.package, npm_version: invalidVersion },
        },
      },
      (guideRoot) => {
        assert.throws(
          () => loadMcpProductData(guideRoot),
          /Invalid MCP public runtime: package\.npm_version must be a SemVer version/,
        )
      },
    )
  })
}

test('rejects an invalid server handshake SemVer', () => {
  withGuideFixture(
    {
      runtime: {
        ...validRuntime,
        server_info: { ...validRuntime.server_info, version: '1.2.0 latest' },
      },
    },
    (guideRoot) => {
      assert.throws(
        () => loadMcpProductData(guideRoot),
        /Invalid MCP public runtime: server_info\.version must be a SemVer version/,
      )
    },
  )
})

test('rejects an invalid npm statistics public SemVer before comparing artifacts', () => {
  withGuideFixture(
    { stats: { ...validStats, public_version: 'latest' } },
    (guideRoot) => {
      assert.throws(
        () => loadMcpProductData(guideRoot),
        /Invalid MCP npm statistics: public_version must be a SemVer version/,
      )
    },
  )
})

test('rejects an impossible public runtime calendar timestamp', () => {
  withGuideFixture(
    { runtime: { ...validRuntime, snapshot_at: '2026-02-30T15:30:00Z' } },
    (guideRoot) => {
      assert.throws(
        () => loadMcpProductData(guideRoot),
        /Invalid MCP public runtime: snapshot_at must be an ISO 8601 UTC timestamp/,
      )
    },
  )
})

test('rejects an impossible npm statistics calendar timestamp', () => {
  withGuideFixture(
    { stats: { ...validStats, snapshot_at: '2026-13-01T15:06:00Z' } },
    (guideRoot) => {
      assert.throws(
        () => loadMcpProductData(guideRoot),
        /Invalid MCP npm statistics: snapshot_at must be an ISO 8601 UTC timestamp/,
      )
    },
  )
})

for (const capability of ['tools', 'resources', 'prompts'] as const) {
  test(`rejects duplicate ${capability} in the public capability snapshot`, () => {
    const duplicate = validRuntime.capabilities[capability][0]
    withGuideFixture(
      {
        runtime: {
          ...validRuntime,
          capabilities: {
            ...validRuntime.capabilities,
            [capability]: [duplicate, duplicate],
          },
          counts: { ...validRuntime.counts, [capability]: 2 },
        },
      },
      (guideRoot) => {
        assert.throws(
          () => loadMcpProductData(guideRoot),
          new RegExp(
            `Invalid MCP public runtime: capabilities\\.${capability} must not contain duplicate entries`,
          ),
        )
      },
    )
  })
}

test('reads npm statistics only from the canonical machine-readable path', () => {
  withGuideFixture(
    { statsPath: 'mcp-server/data/mcp-stats.json' },
    (guideRoot) => {
      assert.throws(
        () => loadMcpProductData(guideRoot),
        new RegExp(`Missing MCP public evidence: .*${NPM_STATS_PATH}`),
      )
    },
  )
})
