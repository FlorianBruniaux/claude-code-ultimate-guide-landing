---
title: Settings.json — Structure Complète
subtitle: Toutes les clés de configuration et leur portée
cardNumber: T06
category: Technique
difficulty: intermediate
guideVersion: 3.32.1
order: 6
---

## Hiérarchie des fichiers

```
~/.claude/settings.json         (global, tous les projets)
        ↓ surchargé par
.claude/settings.json           (projet, partagé équipe)
        ↓ surchargé par
.claude/settings.local.json     (machine locale, gitignore)
```

`settings.local.json` prend toujours le dessus. C'est l'endroit idéal pour les overrides personnels sans créer de conflits Git.

## Structure complète

```json
{
  "model": "claude-sonnet-4-5",
  "permissions": {
    "allow": ["Bash(git *)", "Bash(pnpm *)", "Read"],
    "deny":  ["Bash(rm -rf *)", "Write(file_path:*.env*)"],
    "ask":   ["Bash(npm publish)"]
  },
  "env": {
    "NODE_ENV": "development",
    "LOG_LEVEL": "debug"
  },
  "hooks": {
    "PostToolUse": [{
      "matcher": "Edit|Write",
      "hooks": [{ "type": "command",
                  "command": ".claude/hooks/format.sh" }]
    }]
  }
}
```

## Clés disponibles

| Clé | Rôle |
|-----|------|
| `model` | Modèle par défaut |
| `permissions.allow` | Outils auto-approuvés |
| `permissions.deny` | Outils bloqués |
| `permissions.ask` | Outils avec confirmation |
| `env` | Variables d'environnement injectées |
| `hooks` | Scripts déclenchés sur événements |
| `spinnerVerbs` | Mots dans le spinner de chargement |
| `spinnerTipsOverride` | Conseils affichés pendant le traitement |
| `enableAllProjectMcpServers` | Active tous les serveurs MCP du projet |

## Personnalisation du spinner

```json
{
  "spinnerVerbs": {
    "mode": "replace",
    "verbs": ["Cafféination…", "Réflexion…", "Optimisation…"]
  },
  "spinnerTipsOverride": {
    "tips": ["/compact quand le contexte est plein"],
    "excludeDefault": true
  }
}
```

`mode: "add"` étend la liste par défaut plutôt que de la remplacer. Ces clés n'ont aucun impact fonctionnel, uniquement cosmétique.

## Ce qui doit rester en .gitignore

```gitignore
.claude/settings.local.json   # Overrides machine locale
.claude/CLAUDE.md             # Instructions personnelles
.env.local                    # Secrets
```

Les fichiers à committer (`settings.json`, `agents/`, `commands/`, `hooks/`, `rules/`) représentent la configuration d'équipe partagée. Ne jamais inclure de clés API ou de tokens dans ces fichiers.
