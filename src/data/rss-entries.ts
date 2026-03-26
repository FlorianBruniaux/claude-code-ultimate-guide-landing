/**
 * Guide RSS entries — maintained manually alongside guide releases.
 *
 * Updated via:
 * - /release command (auto-drafts an entry from CHANGELOG)
 * - Post-push hook reminder (for new pages, cards, whitepapers outside releases)
 *
 * Date format: "Mar 19, 2026" (same as releases.ts)
 * Link: absolute URL on cc.bruniaux.com
 */

export type RssEntryType =
  | 'guide_release'   // new guide version (e.g. v3.38.0)
  | 'new_page'        // new page added to the site
  | 'new_cheatcard'   // new recap card(s)
  | 'new_whitepaper'  // new whitepaper / ebook
  | 'new_section'     // major new section in the guide

export interface RssEntry {
  type: RssEntryType
  title: string
  date: string         // "Mar 19, 2026"
  description: string  // 1-3 sentences, no HTML
  link: string         // absolute URL on cc.bruniaux.com
}

export const rssEntries: RssEntry[] = [
  {
    type: 'guide_release',
    title: 'Claude Code v2.1.84',
    date: 'Mar 26, 2026',
    description: 'PowerShell tool for Windows (opt-in preview), TaskCreated hook, WorktreeCreate hook with HTTP support, and global system-prompt caching now working when ToolSearch is enabled. Deep links open in your preferred terminal, MCP tool descriptions capped at 2KB, and an idle-return prompt appears after 75+ minutes to suggest /clear.',
    link: 'https://cc.bruniaux.com/releases/#v2.1.84',
  },
  {
    type: 'guide_release',
    title: 'Claude Code v2.1.83',
    date: 'Mar 25, 2026',
    description: 'managed-settings.d/ drop-in directory for policy fragments, CwdChanged and FileChanged hook events for reactive environment management, transcript search in Ctrl+O mode, and CLAUDE_CODE_SUBPROCESS_ENV_SCRUB=1 for credential scrubbing. Security fix: --mcp-config flag was bypassing allowedMcpServers/deniedMcpServers managed policy.',
    link: 'https://cc.bruniaux.com/releases/#v2.1.83',
  },
  {
    type: 'guide_release',
    title: 'Claude Code Ultimate Guide v3.37.5',
    date: 'Mar 23, 2026',
    description: 'Five documentation gaps filled from CC releases 2.1.77-2.1.81: StopFailure hook, rate_limits statusline field, ${CLAUDE_PLUGIN_DATA} plugin storage, --bare CI mode, and sandbox.filesystem settings (allowWrite/denyRead/allowRead). Threat database updated to v2.9.0.',
    link: 'https://cc.bruniaux.com/releases/',
  },
  {
    type: 'guide_release',
    title: 'Claude Code Ultimate Guide v3.37.4',
    date: 'Mar 23, 2026',
    description: 'Four new resource evaluations: Harman JiTTesting Meta paper (4/5, integrated), Caliber config quality tool (3/5, integrated), Larridin AI-native teams (4/5), Anthropic weekly watch March 16-23. New guide sections on JiTTesting methodology and Configuration Quality tooling. CC releases tracking updated to v2.1.81.',
    link: 'https://cc.bruniaux.com/releases/',
  },
  {
    type: 'guide_release',
    title: 'Claude Code Ultimate Guide v3.37.1',
    date: 'Mar 19, 2026',
    description: 'RSS feed added for release tracking. New resource evaluations, skills updates, and threat-db v2.8.0.',
    link: 'https://cc.bruniaux.com/releases/',
  },
]
