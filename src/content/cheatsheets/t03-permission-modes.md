---
title: Permission Modes
subtitle: Contrôle des accès outils — du plus sûr au plus permissif
cardNumber: T03
category: Technique
difficulty: beginner
guideVersion: 3.32.1
order: 3
---

## Modes Disponibles

| Mode | Flag | Usage recommandé |
|------|------|-----------------|
| **Default** | _(aucun)_ | Développement quotidien |
| **Auto-accept edits** | `Shift+Tab` | Revues de code |
| **Auto-accept all** | `Shift+Tab x2` | Tâches répétitives connues |
| **Bypass total** | `--dangerously-skip-permissions` | CI/CD headless |

## Whitelist d'Outils

```bash
# Autoriser seulement certains outils
claude --allowedTools "Read,Grep,Glob"

# Bloquer des outils spécifiques
claude --disallowedTools "Bash,Write"

# Combinaisons utiles
claude --allowedTools "Read,Edit,Bash(git*)"
```

## Configuration dans settings.json

```json
{
  "permissions": {
    "allow": [
      "Bash(git log*)",
      "Bash(npm test*)",
      "Read",
      "Edit"
    ],
    "deny": [
      "Bash(rm*)",
      "Bash(sudo*)"
    ]
  }
}
```

## Hiérarchie des Permissions

Les permissions se cumulent et s'héritent dans cet ordre :

1. `~/.claude/settings.json` — global user
2. `.claude/settings.json` — projet (partagé)
3. `.claude/settings.local.json` — projet (local, gitignored)
4. Flags CLI — session uniquement

## Glob Patterns pour Bash

```bash
# Autoriser git seulement
"Bash(git *)"

# Autoriser npm test et build
"Bash(npm test*)", "Bash(npm run build*)"

# Autoriser lecture fichiers
"Bash(cat *)", "Bash(ls *)"
```

## Bonnes Pratiques

**CI/CD** — Toujours utiliser `--dangerously-skip-permissions` avec un environnement sandboxé (Docker, container éphémère). Ne jamais sur une machine de production partagée.

**Projets sensibles** — Restreindre les outils Bash avec des globs précis dans `.claude/settings.json`. Committer ce fichier pour que toute l'équipe utilise les mêmes contraintes.

**Audit** — Les actions de Claude sont loggées dans `~/.claude/logs/`. Vérifiable à tout moment.
