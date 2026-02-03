#!/usr/bin/env python3
"""Add official_doc field to questions where applicable"""

import json
from pathlib import Path

def main():
    repo_root = Path(__file__).parent.parent
    questions_file = repo_root / "questions.json"

    with open(questions_file, 'r', encoding='utf-8') as f:
        data = json.load(f)

    questions = data['questions']

    # Mapping: question topic → official doc URL
    doc_mappings = {
        # Installation & setup
        '01-001': 'https://code.claude.com/docs/en/setup',
        '01-002': 'https://code.claude.com/docs/en/interactive-mode',
        '01-003': 'https://code.claude.com/docs/en/slash-commands',
        '01-004': 'https://code.claude.com/docs/en/interactive-mode',
        '01-010': 'https://code.claude.com/docs/en/interactive-mode',
        '01-014': 'https://code.claude.com/docs/en/how-claude-code-works',

        # Memory & Settings
        '03-001': 'https://code.claude.com/docs/en/memory',
        '03-002': 'https://code.claude.com/docs/en/memory',
        '03-003': 'https://code.claude.com/docs/en/memory',
        '03-007': 'https://code.claude.com/docs/en/memory',
        '03-008': 'https://code.claude.com/docs/en/permissions',
        '03-009': 'https://code.claude.com/docs/en/permissions',
        '03-011': 'https://code.claude.com/docs/en/memory',
        '03-012': 'https://code.claude.com/docs/en/permissions',

        # Agents
        '04-001': 'https://code.claude.com/docs/en/agents',
        '04-002': 'https://code.claude.com/docs/en/agents',
        '04-003': 'https://code.claude.com/docs/en/agents',

        # Skills
        '05-001': 'https://code.claude.com/docs/en/skills',
        '05-002': 'https://code.claude.com/docs/en/skills',

        # Commands
        '06-001': 'https://code.claude.com/docs/en/slash-commands',
        '06-002': 'https://code.claude.com/docs/en/slash-commands',
        '06-003': 'https://code.claude.com/docs/en/slash-commands',
        '06-004': 'https://code.claude.com/docs/en/slash-commands',
        '06-005': 'https://code.claude.com/docs/en/slash-commands',
        '06-006': 'https://code.claude.com/docs/en/slash-commands',

        # Hooks
        '07-001': 'https://code.claude.com/docs/en/hooks',
        '07-002': 'https://code.claude.com/docs/en/hooks',
        '07-003': 'https://code.claude.com/docs/en/hooks',

        # MCP Servers
        '08-001': 'https://code.claude.com/docs/en/mcp-servers',
        '08-002': 'https://code.claude.com/docs/en/mcp-servers',
        '08-003': 'https://code.claude.com/docs/en/mcp-servers',

        # Reference
        '10-013': 'https://code.claude.com/docs/en/setup',
        '10-014': 'https://code.claude.com/docs/en/memory',
    }

    added_count = 0
    for q in questions:
        qid = q['id']
        if qid in doc_mappings:
            q['official_doc'] = doc_mappings[qid]
            added_count += 1

    with open(questions_file, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

    print(f"✅ Added official_doc to {added_count} questions")

if __name__ == "__main__":
    main()
