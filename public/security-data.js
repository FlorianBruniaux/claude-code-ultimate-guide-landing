/**
 * Security threat intelligence data - Converted from threat-db.yaml
 * Source: examples/commands/resources/threat-db.yaml
 * For use in the landing site security section
 */
window.SECURITY_DATA = {
    meta: {
        version: "2.0.0",
        updated: "2026-02-11",
        sources_count: 14
    },
    stats: {
        skills_scanned: 3984,
        flawed_pct: 36.82,
        critical_risk: 534,
        critical_pct: 13.4,
        malicious_payloads: 76,
        cves_tracked: 18,
        malicious_skills: 400,
        exposed_servers: 1000,
        hardcoded_secrets_pct: 10.9,
        still_live: 8
    },
    malicious_authors: [
        { name: "zaycv", source: "Snyk ToxicSkills", risk: "critical", notes: "40+ malicious skills, programmatic malware campaign, clawhub/clawdhub1 typosquats" },
        { name: "Aslaep123", source: "Snyk ToxicSkills", risk: "critical", notes: "Malicious crypto/trading skills, typosquatted exchange tools" },
        { name: "pepe276", source: "Snyk ToxicSkills", risk: "critical", notes: "Unicode-obfuscated instructions, DAN-style jailbreaking for exfiltration" },
        { name: "moonshine-100rze", source: "Snyk ToxicSkills", risk: "critical", notes: "Mixed prompt-injection + exfil; GitHub repo aztr0nutzs/NET_NiNjA.v1.2 hosts additional weaponized skills" }
    ],
    malicious_skills: [
        // Snyk ToxicSkills confirmed
        { name: "clawhud", type: "typosquatting", source: "Snyk ToxicSkills", risk: "critical", notes: "Target: clawhub" },
        { name: "clawhub1", type: "typosquatting", source: "Snyk ToxicSkills", risk: "critical", notes: "Target: clawhub" },
        { name: "clawdhub1", type: "typosquatting", source: "Snyk ToxicSkills", risk: "critical", notes: "Target: clawhub" },
        { name: "polymarket-traiding-bot", type: "malware", source: "Snyk ToxicSkills + Koi AuthTool", risk: "critical", notes: "Typosquatting + credential theft" },

        // ClawHavoc: ClawHub CLI typosquats (29 skills)
        { name: "clawhub", type: "typosquatting", source: "Koi ClawHavoc", risk: "critical", category: "typosquatting", notes: "Target: clawhub-cli" },
        { name: "clawhubb", type: "typosquatting", source: "Koi ClawHavoc", risk: "critical", category: "typosquatting", notes: "Target: clawhub-cli" },
        { name: "clawhubcli", type: "typosquatting", source: "Koi ClawHavoc", risk: "critical", category: "typosquatting", notes: "Target: clawhub-cli" },
        { name: "clawwhub", type: "typosquatting", source: "Koi ClawHavoc", risk: "critical", category: "typosquatting", notes: "Target: clawhub-cli" },
        { name: "cllawhub", type: "typosquatting", source: "Koi ClawHavoc", risk: "critical", category: "typosquatting", notes: "Target: clawhub-cli" },
        { name: "clawhub-6yr3b", type: "typosquatting", source: "Koi ClawHavoc", risk: "critical", category: "typosquatting" },
        { name: "clawhub-c9y4p", type: "typosquatting", source: "Koi ClawHavoc", risk: "critical", category: "typosquatting" },
        { name: "clawhub-d4kxr", type: "typosquatting", source: "Koi ClawHavoc", risk: "critical", category: "typosquatting" },
        { name: "clawhub-f3qcn", type: "typosquatting", source: "Koi ClawHavoc", risk: "critical", category: "typosquatting" },
        { name: "clawhub-gpcrq", type: "typosquatting", source: "Koi ClawHavoc", risk: "critical", category: "typosquatting" },
        { name: "clawhub-gstca", type: "typosquatting", source: "Koi ClawHavoc", risk: "critical", category: "typosquatting" },
        { name: "clawhub-hh1fd", type: "typosquatting", source: "Koi ClawHavoc", risk: "critical", category: "typosquatting" },
        { name: "clawhub-hh2km", type: "typosquatting", source: "Koi ClawHavoc", risk: "critical", category: "typosquatting" },
        { name: "clawhub-hylhq", type: "typosquatting", source: "Koi ClawHavoc", risk: "critical", category: "typosquatting" },
        { name: "clawhub-i7oci", type: "typosquatting", source: "Koi ClawHavoc", risk: "critical", category: "typosquatting" },
        { name: "clawhub-i9zhz", type: "typosquatting", source: "Koi ClawHavoc", risk: "critical", category: "typosquatting" },
        { name: "clawhub-ja7eh", type: "typosquatting", source: "Koi ClawHavoc", risk: "critical", category: "typosquatting" },
        { name: "clawhub-krmvq", type: "typosquatting", source: "Koi ClawHavoc", risk: "critical", category: "typosquatting" },
        { name: "clawhub-oihpl", type: "typosquatting", source: "Koi ClawHavoc", risk: "critical", category: "typosquatting" },
        { name: "clawhub-olgys", type: "typosquatting", source: "Koi ClawHavoc", risk: "critical", category: "typosquatting" },
        { name: "clawhub-osasg", type: "typosquatting", source: "Koi ClawHavoc", risk: "critical", category: "typosquatting" },
        { name: "clawhub-rkvny", type: "typosquatting", source: "Koi ClawHavoc", risk: "critical", category: "typosquatting" },
        { name: "clawhub-sxtsn", type: "typosquatting", source: "Koi ClawHavoc", risk: "critical", category: "typosquatting" },
        { name: "clawhub-tlxx5", type: "typosquatting", source: "Koi ClawHavoc", risk: "critical", category: "typosquatting" },
        { name: "clawhub-uoeym", type: "typosquatting", source: "Koi ClawHavoc", risk: "critical", category: "typosquatting" },
        { name: "clawhub-wixce", type: "typosquatting", source: "Koi ClawHavoc", risk: "critical", category: "typosquatting" },
        { name: "clawhub-wotp2", type: "typosquatting", source: "Koi ClawHavoc", risk: "critical", category: "typosquatting" },

        // ClawHavoc: Crypto tools (111 skills)
        { name: "solana-*", type: "malware", source: "Koi ClawHavoc", risk: "critical", category: "crypto", notes: "33 variants (solana-07bcb through solana-ytzgw), deploys AMOS" },
        { name: "phantom-*", type: "malware", source: "Koi ClawHavoc", risk: "critical", category: "crypto", notes: "29 variants (phantom-0jcvy through phantom-ygmjc), deploys AMOS" },
        { name: "wallet-tracker-*", type: "malware", source: "Koi ClawHavoc", risk: "critical", category: "crypto", notes: "25 variants (wallet-tracker-0ghsk through wallet-tracker-zih4w)" },
        { name: "insider-wallets-finder-*", type: "malware", source: "Koi ClawHavoc", risk: "critical", category: "crypto", notes: "23 variants (insider-wallets-finder-1a7pi through insider-wallets-finder-zzs2p)" },
        { name: "ethereum-gas-tracker-*", type: "malware", source: "Koi ClawHavoc", risk: "critical", category: "crypto", notes: "14 variants" },
        { name: "lost-bitcoin-10li1", type: "malware", source: "Koi ClawHavoc", risk: "critical", category: "crypto" },
        { name: "lost-bitcoin-dbrgt", type: "malware", source: "Koi ClawHavoc", risk: "critical", category: "crypto" },
        { name: "lost-bitcoin-eabml", type: "malware", source: "Koi ClawHavoc", risk: "critical", category: "crypto" },

        // ClawHavoc: YouTube utilities (57 skills)
        { name: "youtube-summarize-*", type: "malware", source: "Koi ClawHavoc", risk: "critical", category: "youtube", notes: "29 variants, deploys AMOS" },
        { name: "youtube-thumbnail-grabber-*", type: "malware", source: "Koi ClawHavoc", risk: "critical", category: "youtube", notes: "13 variants" },
        { name: "youtube-video-downloader-*", type: "malware", source: "Koi ClawHavoc", risk: "critical", category: "youtube", notes: "13 variants" },

        // ClawHavoc: Polymarket bots (34 skills)
        { name: "poly", type: "malware", source: "Koi ClawHavoc", risk: "critical", category: "polymarket" },
        { name: "polym", type: "malware", source: "Koi ClawHavoc", risk: "critical", category: "polymarket" },
        { name: "polymarkets", type: "malware", source: "Koi ClawHavoc", risk: "critical", category: "polymarket" },
        { name: "polytrading", type: "malware", source: "Koi ClawHavoc", risk: "critical", category: "polymarket" },
        { name: "polymarket-*", type: "malware", source: "Koi ClawHavoc", risk: "critical", category: "polymarket", notes: "30 variants (polymarket-25nwy through polymarket-z7lwp)" },

        // ClawHavoc: Auto-updaters (30 skills)
        { name: "amir", type: "malware", source: "Koi ClawHavoc", risk: "critical", category: "updater" },
        { name: "update", type: "malware", source: "Koi ClawHavoc", risk: "critical", category: "updater" },
        { name: "updater", type: "malware", source: "Koi ClawHavoc", risk: "critical", category: "updater" },
        { name: "auto-updater-*", type: "malware", source: "Koi ClawHavoc", risk: "critical", category: "updater", notes: "27 variants (auto-updater-161ks through auto-updater-xsunp)" },

        // ClawHavoc: Finance & social (76 skills)
        { name: "yahoo-finance-*", type: "malware", source: "Koi ClawHavoc", risk: "critical", category: "finance", notes: "24 variants" },
        { name: "x-trends-*", type: "malware", source: "Koi ClawHavoc", risk: "critical", category: "social", notes: "25 variants" },

        // ClawHavoc: Google Workspace (17 skills)
        { name: "google-workspace-*", type: "malware", source: "Koi ClawHavoc", risk: "critical", category: "productivity", notes: "17 variants targeting Gmail/Calendar/Drive" },

        // Koi outliers: AuthTool campaign (3 skills)
        { name: "base-agent", type: "malware", source: "Koi ClawHavoc (AuthTool)", risk: "critical", notes: "Fake auth tool dropping separate payload" },
        { name: "bybit-agent", type: "malware", source: "Koi ClawHavoc (AuthTool)", risk: "critical", notes: "Fake auth tool dropping separate payload" },

        // Koi outliers: Hidden backdoor (2 skills)
        { name: "better-polymarket", type: "backdoor", source: "Koi ClawHavoc", risk: "critical", notes: "Reverse shell to 54.91.154.110:13338 via /bin/bash -i >/dev/tcp/..." },
        { name: "polymarket-all-in-one", type: "backdoor", source: "Koi ClawHavoc", risk: "critical", notes: "Reverse shell to 54.91.154.110:13338" },

        // Koi outliers: Credential exfiltration (1 skill)
        { name: "rankaj", type: "credential-theft", source: "Koi ClawHavoc", risk: "critical", notes: "Reads ~/.clawdbot/.env, POSTs to webhook.site/358866c4-81c6-4c30-9c8c-358db4d04412" },

        // Supply chain: Malicious MCP servers on PyPI (JFrog)
        { name: "mcp-runcmd-server", type: "supply-chain", source: "JFrog", risk: "critical", platform: "pypi", notes: "Reverse shell to 45.115.38.27:4433 before starting MCP server" },
        { name: "mcp-runcommand-server", type: "supply-chain", source: "JFrog", risk: "critical", platform: "pypi", notes: "Reverse shell to 45.115.38.27:4433" },
        { name: "mcp-runcommand-server2", type: "supply-chain", source: "JFrog", risk: "critical", platform: "pypi", notes: "Reverse shell to 45.115.38.27:4433" },

        // Supply chain: Malicious npm MCP package
        { name: "postmark-mcp", type: "supply-chain", source: "Defender's Initiative", risk: "critical", platform: "npm", notes: "Squatter copying official Postmark MCP with hidden backdoor" }
    ],
    cve_database: [
        { id: "CVE-2025-53109", component: "Filesystem MCP Server", severity: "high", description: "Symlink escape to arbitrary filesystem access / potential LPE", source: "Cymulate EscapeRoute", fixed_in: "0.6.3 / 2025.7.1", mitigation: "Update to >= 0.6.3; avoid Filesystem MCP in sensitive environments" },
        { id: "CVE-2025-53110", component: "Filesystem MCP Server", severity: "high", description: "Naive prefix-match directory bypass (startsWith on paths)", source: "Cymulate EscapeRoute", fixed_in: "0.6.3 / 2025.7.1", mitigation: "Update to >= 0.6.3" },
        { id: "CVE-2025-49596", component: "MCP Inspector", severity: "critical", cvss: 9.4, description: "RCE via unauthenticated proxy on 0.0.0.0; drive-by RCE from malicious web page", source: "Recorded Future / SocRadar", fixed_in: "0.14.1", mitigation: "Update to >= 0.14.1; restrict to localhost" },
        { id: "CVE-2025-68143", component: "MCP Git Server (mcp-server-git)", severity: "high", description: "git_init path traversal — arbitrary filesystem path for repo creation", source: "The Hacker News / PointGuard AI", fixed_in: "2025.9.25", mitigation: "Update; restrict Git MCP to trusted repos" },
        { id: "CVE-2025-68144", component: "MCP Git Server (mcp-server-git)", severity: "high", description: "Argument injection in git_diff/git_checkout — shell metacharacters via user-controlled args", source: "The Hacker News / PointGuard AI", fixed_in: "2025.12.18", mitigation: "Update; sanitize all user inputs to git CLI" },
        { id: "CVE-2025-68145", component: "MCP Git Server (mcp-server-git)", severity: "high", description: "--repository path validation bypass — access beyond allowlist", source: "The Hacker News / PointGuard AI", fixed_in: "2025.12.18", mitigation: "Update; enforce strict path validation" },
        { id: "CVE-2025-66416", component: "MCP Python SDK (mcp on PyPI)", severity: "medium", description: "DNS rebinding to local HTTP MCP servers when using FastMCP HTTP/SSE with no auth", source: "Debian Security Tracker", fixed_in: "1.23.0", mitigation: "Update to >= 1.23.0; enable TransportSecuritySettings explicitly" },
        { id: "CVE-2025-64443", component: "MCP Gateway", severity: "medium", description: "DNS rebinding against SSE/streaming listeners — indirect access to MCP servers behind gateway", source: "Blog Gowrishankar", fixed_in: "0.28.0", mitigation: "Update to > 0.27.0" },
        { id: "CVE-2026-25536", component: "MCP TypeScript SDK", severity: "high", description: "Cross-client response data leak when reusing single server+transport across multiple SSE clients", source: "Feedly CVE", fixed_in: "1.26.0", mitigation: "Update to >= 1.26.0; isolate transport instances per client" },
        { id: "CVE-2025-54135", component: "Cursor IDE", severity: "high", cvss: 8.6, description: "CurXecute — RCE via prompt injection writing .cursor/mcp.json", source: "Checkpoint / PropelCode", fixed_in: "1.3.9", mitigation: "Update to Cursor >= 1.3.9; file integrity monitoring on mcp.json" },
        { id: "CVE-2025-54136", component: "Cursor IDE", severity: "high", description: "MCPoison — persistent RCE via trusted config mutation; post-approval changes auto-execute", source: "Checkpoint", fixed_in: "1.3.9", mitigation: "Update to >= 1.3.9; Git hooks + hash verification on mcp.json" },
        { id: "CVE-2025-66032", component: "Claude Code", severity: "high", description: "8 command execution bypasses via blocklist flaws (man --html, sed e modifier, git arg ambiguity, bash variable expansion)", source: "Flatt Security", fixed_in: "1.0.93", mitigation: "Update to Claude Code >= 1.0.93" },
        { id: "CVE-2026-24052", component: "Claude Code WebFetch", severity: "high", description: "SSRF via startsWith() domain validation bypass in WebFetch (trusted-domain prefix attack)", source: "SentinelOne", fixed_in: "1.0.111", mitigation: "Update to Claude Code >= 1.0.111" },
        { id: "ADVISORY-CC-2026-001", component: "Claude Code", severity: "high", description: "Sandbox bypass — commands excluded from sandboxing could bypass Bash permission enforcement (details undisclosed)", source: "Claude Code CHANGELOG v2.1.34", fixed_in: "2.1.34", mitigation: "Update to Claude Code >= 2.1.34" },
        { id: "CVE-2025-53967", component: "Framelink Figma MCP Server (figma-developer-mcp)", severity: "high", cvss: 7.5, description: "Command injection via unsanitized input in fetchWithRetry curl command", source: "Geordie AI / EndorLabs", fixed_in: "0.6.3", mitigation: "Update to >= 0.6.3" },
        { id: "CVE-2025-9611", component: "Microsoft Playwright MCP Server (@playwright/mcp)", severity: "medium", description: "DNS rebinding / Origin-less CSRF — missing Origin validation on local instance", source: "Mondoo / NVD", fixed_in: "0.0.40", mitigation: "Update to >= 0.0.40" },
        { id: "CVE-2025-6515", component: "MCP SSE Transport (oatpp-mcp)", severity: "high", description: "Prompt hijacking via predictable/reused session IDs; attacker replaces tool outputs", source: "JFrog", mitigation: "Use cryptographically secure session IDs (128+ bits entropy)" },
        { id: "CVE-2026-25546", component: "Godot MCP Server (godot-mcp)", severity: "high", description: "Command injection via user-controlled projectPath passed to exec()", source: "Feedly CVE", fixed_in: "0.1.1", mitigation: "Update to >= 0.1.1; sanitize projectPath; avoid exec() with user input" },
        { id: "CVE-2025-54073", component: "mcp-package-docs", severity: "high", description: "Command injection in child_process.exec via unsanitized input", source: "NVD", fixed_in: "0.1.28", mitigation: "Update to >= 0.1.28" }
    ],
    campaigns: [
        {
            name: "ClawHavoc",
            source: "Koi Security",
            date: "2026-02-01",
            platform: "ClawHub / OpenClaw",
            skills_count: 341,
            amos_skills: 335,
            outlier_skills: 6,
            malware: "Atomic Stealer (AMOS) + Windows infostealers",
            delivery: [
                "Fake prerequisites in SKILL.md",
                "Base64-encoded shell snippets from glot.io",
                "Password-protected ZIPs (password: 'openclaw')",
                "Second-stage dropper from raw IP"
            ],
            c2_ips: ["91.92.242.30", "95.92.242.30", "96.92.242.30", "202.161.50.59", "54.91.154.110"],
            targets: [
                "Cryptocurrency wallets (60+ wallets: Exodus, Binance, Electrum, Atomic, Ledger)",
                "Browser data (Chrome, Safari, Firefox, Brave, Edge)",
                "SSH keys and shell history",
                "Telegram sessions",
                "Keychain passwords (macOS)"
            ],
            categories: {
                crypto: 111,
                youtube: 57,
                finance_social: 76,
                polymarket: 34,
                typosquatting: 29,
                auto_updaters: 30,
                google_workspace: 17
            },
            outliers: {
                auth_tool: ["base-agent", "bybit-agent", "polymarket-traiding-bot"],
                reverse_shell: ["better-polymarket", "polymarket-all-in-one"],
                credential_theft: ["rankaj"]
            }
        },
        {
            name: "ToxicSkills",
            source: "Snyk",
            date: "2026-02-05",
            skills_scanned: 3984,
            platforms: ["ClawHub", "skills.sh"],
            findings: {
                total_flawed: 1467,
                flawed_percentage: 36.82,
                critical_risk: 534,
                critical_percentage: 13.4,
                malicious_payloads: 76,
                still_live_at_scan: 8,
                hardcoded_secrets_percentage: 10.9,
                remote_content_fetch_percentage: 17.7,
                remote_prompt_execution_percentage: 2.9
            },
            known_malicious_authors: ["zaycv", "Aslaep123", "pepe276", "moonshine-100rze"]
        },
        {
            name: "PyPI MCP Reverse Shell",
            source: "JFrog",
            date: "2025-12",
            platform: "PyPI",
            packages: ["mcp-runcmd-server", "mcp-runcommand-server", "mcp-runcommand-server2"],
            c2_ip: "45.115.38.27",
            c2_port: 4433,
            technique: "Spawns /bin/sh -i reverse shell before starting MCP server"
        },
        {
            name: "Postmark MCP Squatter",
            source: "Defender's Initiative",
            date: "2025-11",
            platform: "npm",
            package: "postmark-mcp",
            technique: "Copies official Postmark MCP server with hidden backdoor"
        }
    ],
    attack_techniques: [
        {
            id: "T001",
            name: "Tool Poisoning via SKILL.md",
            description: "Hidden instructions in SKILL.md that instruct the agent to run malicious commands",
            examples: ["curl | bash from glot.io scripts", "Password-protected ZIP with embedded malware", "Base64-decoded eval commands"],
            campaigns: ["ClawHavoc", "ToxicSkills"],
            mitigation: "Scan SKILL.md for shell commands; never auto-execute prerequisites"
        },
        {
            id: "T002",
            name: "Memory Poisoning",
            description: "Injection of persistent instructions into SOUL.md, MEMORY.md, CLAUDE.md, AGENTS.md",
            examples: ["Skills targeting SOUL.md/MEMORY.md to inject persistent backdoor instructions", "Cognitive worms that replicate across agent memory files"],
            campaigns: ["ToxicSkills"],
            mitigation: "Treat memory files as config; require code review for changes; monitor diffs"
        },
        {
            id: "T003",
            name: "Rug Pull / Post-Approval Mutation",
            description: "Benign config approved once, then mutated to malicious version that auto-executes",
            examples: ["MCPoison: .cursor/rules/mcp.json approved, then updated with reverse shell", "ClawHub skills updated without changelog to swap in AMOS installer"],
            cves: ["CVE-2025-54136"],
            mitigation: "Hash verification on configs; re-approval on any change"
        },
        {
            id: "T004",
            name: "Confused Deputy via MCP",
            description: "Attacker manipulates MCP session/output; client trusts poisoned response",
            examples: ["oatpp-mcp session ID reuse (CVE-2025-6515)", "Git MCP + Filesystem MCP chain via poisoned README"],
            cves: ["CVE-2025-6515", "CVE-2025-68143", "CVE-2025-68144", "CVE-2025-68145"],
            mitigation: "Cryptographic session IDs; input validation; least-privilege for MCP tools"
        },
        {
            id: "T005",
            name: "DNS Rebinding on Local MCP",
            description: "Malicious website rebinds domain to 127.0.0.1 to access local MCP servers",
            examples: ["MCP Python SDK HTTP/SSE servers (CVE-2025-66416)", "MCP Gateway SSE (CVE-2025-64443)", "Playwright MCP (CVE-2025-9611)"],
            cves: ["CVE-2025-66416", "CVE-2025-64443", "CVE-2025-9611"],
            mitigation: "Use stdio transport; enable DNS rebinding protection; authenticate local servers"
        },
        {
            id: "T006",
            name: "Supply Chain Package Attack",
            description: "Malicious packages published to registries mimicking legitimate MCP servers",
            examples: ["PyPI: mcp-runcmd-server, mcp-runcommand-server (JFrog)", "npm: postmark-mcp squatter"],
            campaigns: ["PyPI MCP Reverse Shell", "Postmark MCP Squatter"],
            mitigation: "Verify package author; check download counts; use SafeDep vet"
        },
        {
            id: "T007",
            name: "Hook-Based Exfiltration",
            description: "Malicious .claude/hooks/ scripts run on agent events with full user privileges",
            examples: ["SessionStart hook that POSTs environment variables", "PostToolUse hook that exfiltrates file paths and content"],
            mitigation: "Review all hooks; forbid auto-running hooks from untrusted repos; maintain hook allowlist"
        },
        {
            id: "T008",
            name: "Credential Theft via Agent",
            description: "Agent instructed to read credential files and send to attacker",
            examples: ["rankaj skill: reads ~/.clawdbot/.env, POSTs to webhook.site", "Base64-encoded curl to send ~/.aws/credentials"],
            campaigns: ["ClawHavoc", "ToxicSkills"],
            mitigation: "Block agent access to .env, .aws, .ssh directories; use pre-execution hooks"
        }
    ],
    scanning_tools: [
        {
            name: "mcp-scan",
            vendor: "Invariant / Snyk",
            type: "cli",
            command: "npx mcp-scan",
            url: "https://github.com/invariantlabs-ai/mcp-scan",
            capabilities: [
                "Scans MCP server configurations for vulnerabilities",
                "Detects known vulnerable MCP servers and versions",
                "Scans SKILL.md for prompt injection, malicious code, secrets",
                "Supports Claude Desktop, Cursor, Windsurf configs",
                "Backed by ToxicSkills taxonomy (90-100% recall, 0% FP on skills.sh top-100)"
            ],
            limitations: [
                "413 error on large configs (~/.claude/ too big)",
                "Unknown MCP config on some VSCode setups",
                "Does not scan .claude/skills/ native Claude Code skills",
                "Requires network access to Snyk vulnerability DB",
                "Cannot detect runtime-only payloads fetched from benign-looking URLs"
            ]
        },
        {
            name: "skills-ref validate",
            vendor: "agentskills.io",
            type: "cli",
            command: "skills-ref validate ./skill-dir",
            url: "https://docs.rs/skills-ref-rs/latest/skills_ref/",
            capabilities: [
                "Validates skill spec compliance (SKILL.md structure, frontmatter, naming)",
                "Parse metadata to JSON (skills-ref read-properties)",
                "Generate agent prompts (skills-ref to-prompt)"
            ],
            limitations: [
                "Spec compliance only — does NOT detect malware or analyze code",
                "Reduces slopsquatting via naming rules but no security scanning"
            ]
        },
        {
            name: "Garak",
            vendor: "NVIDIA",
            type: "cli",
            url: "https://github.com/NVIDIA/garak",
            capabilities: [
                "37+ probe modules for LLM vulnerabilities",
                "Prompt injection detection",
                "Jailbreak testing",
                "Data exfiltration probes"
            ],
            limitations: [
                "LLM-focused, not MCP/skill-specific",
                "Does not parse SKILL.md or MCP configs"
            ]
        },
        {
            name: "MCP Fortress",
            vendor: "mcp-fortress",
            type: "mcp-server + dashboard",
            url: "https://github.com/mcp-fortress/mcp-fortress",
            capabilities: [
                "Scans npm/PyPI dependencies of MCP servers",
                "Queries CVE databases for risk scores",
                "Runtime protection — quarantines suspicious servers",
                "Streaming telemetry dashboard",
                "Can run as MCP server exposing security tools to Claude/Cursor"
            ],
            limitations: [
                "Newer project — smaller detection database than mcp-scan"
            ]
        },
        {
            name: "SafeDep vet MCP",
            vendor: "SafeDep",
            type: "mcp-server",
            url: "https://safedep.io/introducing-vet-mcp-server/",
            capabilities: [
                "Software composition analysis integrated with agents",
                "Detects slopsquatting, vulnerable and malicious packages",
                "Screens package suggestions before pip/npm install"
            ],
            limitations: [
                "Package-focused — does not scan SKILL.md or agent configs"
            ]
        },
        {
            name: "Koi Clawdex",
            vendor: "Koi Security",
            type: "clawhub-skill",
            capabilities: [
                "ClawHub security addon / MCP",
                "Checks skills against Koi malicious skill database",
                "Pre-install and retroactive scan support"
            ],
            limitations: [
                "ClawHub/OpenClaw specific"
            ]
        },
        {
            name: "SAFE-MCP",
            vendor: "SAFE-MCP",
            type: "framework",
            url: "https://www.safemcp.org",
            capabilities: [
                "80+ techniques mapped to ATT&CK for MCP environments",
                "Policy-based blocklists"
            ],
            limitations: []
        }
    ],
    sources: [
        { name: "Snyk ToxicSkills", url: "https://snyk.io/blog/toxicskills-malicious-ai-agent-skills-clawhub/", date: "2026-02-05" },
        { name: "Koi Security ClawHavoc", url: "https://www.koi.ai/blog/clawhavoc-341-malicious-clawedbot-skills-found-by-the-bot-they-were-targeting", date: "2026-02-01" },
        { name: "SafeDep Agent Skills Threat Model", url: "https://safedep.io/agent-skills-threat-model", date: "2026-01" },
        { name: "Cymulate EscapeRoute (CVE-2025-53109/53110)", url: "https://cymulate.com/blog/cve-2025-53109-53110-escaperoute-anthropic/", date: "2025-09" },
        { name: "Checkpoint MCPoison (CVE-2025-54135/54136)", url: "https://research.checkpoint.com/2025/cursor-vulnerability-mcpoison/", date: "2025-10" },
        { name: "JFrog Prompt Hijacking (CVE-2025-6515)", url: "https://jfrog.com/blog/mcp-prompt-hijacking-vulnerability/", date: "2025-10" },
        { name: "JFrog PyPI MCP Reverse Shell", url: "https://research.jfrog.com/post/3-malicious-mcps-pypi-reverse-shell/", date: "2025-12" },
        { name: "Recorded Future MCP Inspector (CVE-2025-49596)", url: "https://www.recordedfuture.com/blog/anthropic-mcp-inspector-cve-2025-49596", date: "2025-07" },
        { name: "Flatt Security - 8 ways to pwn Claude Code", url: "https://flatt.tech/research/posts/pwning-claude-code-in-8-different-ways/", date: "2026-01" },
        { name: "SentinelOne WebFetch SSRF (CVE-2026-24052)", url: "https://www.sentinelone.com/vulnerability-database/cve-2026-24052/", date: "2026-01" },
        { name: "The Hacker News - MCP Git Server Flaws", url: "https://thehackernews.com/2026/01/three-flaws-in-anthropic-mcp-git-server.html", date: "2026-01" },
        { name: "Bitsight TRACE - Exposed MCP Servers", url: "https://www.bitsight.com/blog/exposed-mcp-servers-reveal-new-ai-vulnerabilities", date: "2026-01" },
        { name: "Defender's Initiative - Postmark MCP Squatter", url: "https://defendersinitiative.substack.com/p/npm-not-another-package-malicious", date: "2025-11" },
        { name: "SAFE-MCP Framework", url: "https://www.safemcp.org", date: "2026-01" }
    ],
    minimum_safe_versions: {
        "filesystem-mcp": "0.6.3",
        "mcp-inspector": "0.14.1",
        "mcp-server-git": "2025.12.18",
        "mcp-python-sdk": "1.23.0",
        "mcp-gateway": "0.28.0",
        "figma-developer-mcp": "0.6.3",
        "@playwright/mcp": "0.0.40",
        "mcp-package-docs": "0.1.28",
        "cursor": "1.3.9",
        "claude-code": "2.1.34"
    }
};
