---
title: Workspace Hygiene & .claudeignore
subtitle: Garder le contexte propre en excluant ce que Claude ne doit pas lire
cardNumber: T09
category: Technique
difficulty: beginner
guideVersion: 3.32.1
order: 9
---

## .claudeignore : même syntaxe que .gitignore

`.claudeignore` se place à la racine du projet et suit exactement la même syntaxe que `.gitignore`. Les patterns qu'il contient indiquent à Claude Code quels fichiers et dossiers exclure de son exploration du contexte.

```gitignore
# Dépendances (lourd, inutile pour Claude)
node_modules/
.pnpm-store/
vendor/

# Secrets (protection essentielle)
.env
.env.*
*.pem
*.key
*credentials*

# Générés automatiquement (bruit pur)
dist/
build/
.next/
coverage/
*.min.js

# Logs verbeux
*.log
logs/
```

## Pourquoi c'est important

Claude Code indexe les fichiers du projet pour fournir du contexte. Sans `.claudeignore`, il peut lire des milliers de fichiers dans `node_modules/` ou des logs de 50 Mo, ce qui dilue la qualité des réponses. Moins de bruit dans le contexte signifie des réponses plus précises et des sessions moins coûteuses en tokens.

## .gitignore vs .claudeignore

| Fichier | Rôle | Scope |
|---------|------|-------|
| `.gitignore` | Exclut du contrôle de version | Git |
| `.claudeignore` | Exclut de l'exploration Claude | Claude Code |

Les deux fichiers coexistent et sont indépendants. On peut vouloir que Git ignore un fichier que Claude doit lire, ou l'inverse.

## Structure recommandée du dossier .claude/

```
.claude/
├── settings.json        # Config équipe (commité)
├── settings.local.json  # Config locale (gitignore)
├── agents/              # Agents personnalisés
├── commands/            # Commandes slash
├── hooks/               # Scripts d'automatisation
├── rules/               # Conventions auto-chargées
└── memories/            # Memories manuelles
```

Les dossiers `agents/`, `commands/`, `hooks/`, `rules/` et `skills/` se committent avec le projet. `settings.local.json` et `CLAUDE.md` (si personnel) restent dans `.gitignore`.

## Checklist workspace propre

- `node_modules/` dans `.claudeignore`
- Fichiers `.env` exclus ou hors du répertoire projet
- Binaires et assets lourds ignorés (`*.png`, `*.pdf`, `dist/`)
- Logs et fichiers générés exclus
- `settings.local.json` dans `.gitignore`
