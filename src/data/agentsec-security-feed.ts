import rawFeed from './agentsec-security-feed.v1.json' with { type: 'json' }

type JsonRecord = Record<string, unknown>

export interface AgentSecSource {
  id: string
  title: string
  publisher: string
  url: string
  source_type: string
  status: string
  reviewed_date: string
  published_date?: string
}

export interface AgentSecEvent {
  id: string
  event_type: string
  title: string
  summary: string
  date: string
  date_kind: 'occurred' | 'disclosed' | 'updated'
  ecosystems: string[]
  status: string
  confidence: string
  source_ids: string[]
  related: {
    campaign_ids: string[]
    cve_ids: string[]
    technique_ids: string[]
  }
  detector_coverage: {
    status: string
    detector_ids: string[]
    summary: string
  }
}

export interface AgentSecDetector {
  id: string
  version: string
  description: string
  campaign_ids: string[]
  supported_inputs: string[]
  source_references: string[]
  technique_ids: string[]
  limitations: string[]
  not_scanned: string[]
  remediation_url: string
}

export interface AgentSecFeed {
  schema_version: '1'
  content_license: 'CC-BY-SA-4.0'
  agentsec: {
    name: string
    version: string
    status: 'alpha'
    repository_url: string
    documentation_url: string
    installation_url: string
    scan_command: string
  }
  database: {
    version: string
    updated: string
    record_counts: {
      attack_techniques: number
      campaigns: number
      cves: number
      malicious_skill_records: number
    }
  }
  landing_metrics: {
    critical_risk_skills: number
    exposed_servers: number
    flawed_skills_percent: number
    malicious_payloads: number
    skills_scanned: number
  }
  intelligence: {
    schema_version: string
    updated: string
    sources: AgentSecSource[]
    events: AgentSecEvent[]
  }
  detectors: AgentSecDetector[]
}

export interface AgentSecEventCard extends AgentSecEvent {
  dateLabel: string
  coverageStatus: string
  sources: AgentSecSource[]
}

export interface AgentSecSecurityView {
  databaseLabel: string
  databaseUpdatedLabel: string
  stats: Array<{
    id: string
    label: string
    value: number
    suffix?: string
    prefix?: string
    decimals?: number
  }>
  events: AgentSecEventCard[]
  detectors: AgentSecDetector[]
}

function record(value: unknown, label: string): JsonRecord {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) {
    throw new TypeError(`${label} must be an object`)
  }
  return value as JsonRecord
}

function string(value: unknown, label: string): string {
  if (typeof value !== 'string' || value.length === 0) {
    throw new TypeError(`${label} must be a non-empty string`)
  }
  return value
}

function number(value: unknown, label: string): number {
  if (typeof value !== 'number' || !Number.isFinite(value) || value < 0) {
    throw new TypeError(`${label} must be a non-negative number`)
  }
  return value
}

function strings(value: unknown, label: string): string[] {
  if (!Array.isArray(value) || !value.every((item) => typeof item === 'string')) {
    throw new TypeError(`${label} must be an array of strings`)
  }
  return [...value]
}

function source(value: unknown): AgentSecSource {
  const item = record(value, 'intelligence source')
  const parsed: AgentSecSource = {
    id: string(item.id, 'source id'),
    title: string(item.title, 'source title'),
    publisher: string(item.publisher, 'source publisher'),
    url: string(item.url, 'source url'),
    source_type: string(item.source_type, 'source type'),
    status: string(item.status, 'source status'),
    reviewed_date: string(item.reviewed_date, 'source reviewed date'),
  }
  if (item.published_date !== undefined) {
    parsed.published_date = string(item.published_date, 'source published date')
  }
  return parsed
}

function event(value: unknown): AgentSecEvent {
  const item = record(value, 'intelligence event')
  const related = record(item.related, 'event related ids')
  const coverage = record(item.detector_coverage, 'event detector coverage')
  const dateKind = string(item.date_kind, 'event date kind')
  if (!['occurred', 'disclosed', 'updated'].includes(dateKind)) {
    throw new TypeError('event date kind is unsupported')
  }
  return {
    id: string(item.id, 'event id'),
    event_type: string(item.event_type, 'event type'),
    title: string(item.title, 'event title'),
    summary: string(item.summary, 'event summary'),
    date: string(item.date, 'event date'),
    date_kind: dateKind as AgentSecEvent['date_kind'],
    ecosystems: strings(item.ecosystems, 'event ecosystems'),
    status: string(item.status, 'event status'),
    confidence: string(item.confidence, 'event confidence'),
    source_ids: strings(item.source_ids, 'event source ids'),
    related: {
      campaign_ids: strings(related.campaign_ids, 'event campaign ids'),
      cve_ids: strings(related.cve_ids, 'event cve ids'),
      technique_ids: strings(related.technique_ids, 'event technique ids'),
    },
    detector_coverage: {
      status: string(coverage.status, 'coverage status'),
      detector_ids: strings(coverage.detector_ids, 'coverage detector ids'),
      summary: string(coverage.summary, 'coverage summary'),
    },
  }
}

function detector(value: unknown): AgentSecDetector {
  const item = record(value, 'detector')
  return {
    id: string(item.id, 'detector id'),
    version: string(item.version, 'detector version'),
    description: string(item.description, 'detector description'),
    campaign_ids: strings(item.campaign_ids, 'detector campaign ids'),
    supported_inputs: strings(item.supported_inputs, 'detector supported inputs'),
    source_references: strings(item.source_references, 'detector source references'),
    technique_ids: strings(item.technique_ids, 'detector technique ids'),
    limitations: strings(item.limitations, 'detector limitations'),
    not_scanned: strings(item.not_scanned, 'detector not scanned capabilities'),
    remediation_url: string(item.remediation_url, 'detector remediation url'),
  }
}

export function parseAgentSecFeed(value: unknown): AgentSecFeed {
  const feed = record(value, 'feed')
  const agentsec = record(feed.agentsec, 'agentsec')
  const database = record(feed.database, 'database')
  const counts = record(database.record_counts, 'database record counts')
  const metrics = record(feed.landing_metrics, 'landing metrics')
  const intelligence = record(feed.intelligence, 'intelligence')
  if (!Array.isArray(intelligence.sources) || !Array.isArray(intelligence.events)) {
    throw new TypeError('intelligence sources and events must be arrays')
  }
  if (!Array.isArray(feed.detectors)) {
    throw new TypeError('detectors must be an array')
  }
  if (feed.schema_version !== '1') throw new TypeError('unsupported feed schema version')
  if (feed.content_license !== 'CC-BY-SA-4.0') throw new TypeError('unsupported feed license')
  if (agentsec.status !== 'alpha') throw new TypeError('unsupported AgentSec status')

  return {
    schema_version: '1',
    content_license: 'CC-BY-SA-4.0',
    agentsec: {
      name: string(agentsec.name, 'AgentSec name'),
      version: string(agentsec.version, 'AgentSec version'),
      status: 'alpha',
      repository_url: string(agentsec.repository_url, 'AgentSec repository url'),
      documentation_url: string(agentsec.documentation_url, 'AgentSec documentation url'),
      installation_url: string(agentsec.installation_url, 'AgentSec installation url'),
      scan_command: string(agentsec.scan_command, 'AgentSec scan command'),
    },
    database: {
      version: string(database.version, 'database version'),
      updated: string(database.updated, 'database updated date'),
      record_counts: {
        attack_techniques: number(counts.attack_techniques, 'attack technique count'),
        campaigns: number(counts.campaigns, 'campaign count'),
        cves: number(counts.cves, 'cve count'),
        malicious_skill_records: number(
          counts.malicious_skill_records,
          'malicious skill record count',
        ),
      },
    },
    landing_metrics: {
      critical_risk_skills: number(metrics.critical_risk_skills, 'critical risk skill count'),
      exposed_servers: number(metrics.exposed_servers, 'exposed server count'),
      flawed_skills_percent: number(metrics.flawed_skills_percent, 'flawed skill percentage'),
      malicious_payloads: number(metrics.malicious_payloads, 'malicious payload count'),
      skills_scanned: number(metrics.skills_scanned, 'scanned skill count'),
    },
    intelligence: {
      schema_version: string(intelligence.schema_version, 'intelligence schema version'),
      updated: string(intelligence.updated, 'intelligence updated date'),
      sources: intelligence.sources.map(source),
      events: intelligence.events.map(event),
    },
    detectors: feed.detectors.map(detector),
  }
}

function formatDate(value: string): string {
  const date = new Date(`${value}T00:00:00Z`)
  if (Number.isNaN(date.valueOf())) throw new TypeError(`invalid feed date ${value}`)
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date)
}

export function buildAgentSecSecurityView(feed: AgentSecFeed): AgentSecSecurityView {
  const sources = new Map(feed.intelligence.sources.map((item) => [item.id, item]))
  const events = feed.intelligence.events.map((item) => ({
    ...item,
    dateLabel: formatDate(item.date),
    coverageStatus: item.detector_coverage.status,
    sources: item.source_ids.map((sourceId) => {
      const match = sources.get(sourceId)
      if (!match) throw new TypeError(`unresolved source id ${sourceId}`)
      return match
    }),
  }))
  const detectors = [...feed.detectors].sort((left, right) => left.id.localeCompare(right.id))
  if (detectors.length === 0) throw new TypeError('feed has no detector')
  return {
    databaseLabel: `Threat DB v${feed.database.version}`,
    databaseUpdatedLabel: formatDate(feed.database.updated),
    stats: [
      { id: 'skills-scanned', label: 'Skills Scanned', value: feed.landing_metrics.skills_scanned },
      {
        id: 'flawed-skills',
        label: 'Have Flaws',
        value: feed.landing_metrics.flawed_skills_percent,
        suffix: '%',
        decimals: 2,
      },
      {
        id: 'critical-risk-skills',
        label: 'Critical-Risk',
        value: feed.landing_metrics.critical_risk_skills,
      },
      {
        id: 'malicious-payloads',
        label: 'Malicious Payloads',
        value: feed.landing_metrics.malicious_payloads,
      },
      {
        id: 'cves-tracked',
        label: 'CVEs Tracked',
        value: feed.database.record_counts.cves,
      },
      {
        id: 'exposed-servers',
        label: 'Exposed Servers',
        value: feed.landing_metrics.exposed_servers,
        prefix: '~',
      },
    ],
    events,
    detectors,
  }
}

export const AGENTSEC_FEED = parseAgentSecFeed(rawFeed)
export const AGENTSEC_SECURITY_VIEW = buildAgentSecSecurityView(AGENTSEC_FEED)
