---
title: Config Multi-Machine & Backup
subtitle: Synchroniser sa configuration Claude Code entre plusieurs postes
cardNumber: T10
category: Technique
difficulty: intermediate
guideVersion: 3.32.1
order: 10
---

## Ce qui reste local vs ce qui se partage

| Local uniquement | Partageable |
|-----------------|-------------|
| `settings.local.json` | `agents/`, `commands/` |
| Clés API, tokens | `hooks/`, `rules/`, `skills/` |
| Historique de sessions | `settings.template.json` |
| `.env` avec secrets | CLAUDE.md (conventions équipe) |

**Règle d'or** : ne jamais committer de clés API ou credentials. Utiliser des fichiers template avec des placeholders `${VAR_NAME}` pour les valeurs sensibles.

## Stratégie Git + symlinks (recommandée)

Approche inspirée par Martin Ratinaud (504 sessions testées) et brianlovin/claude-config.

```bash
# 1. Créer un repo privé pour la config globale
mkdir ~/claude-config-backup && cd ~/claude-config-backup
git init

# 2. Créer des symlinks (les changements sont automatiques)
ln -s ~/.claude/agents   ./agents
ln -s ~/.claude/commands ./commands
ln -s ~/.claude/hooks    ./hooks
ln -s ~/.claude/skills   ./skills

# 3. Template sans secrets
cp ~/.claude/settings.json ./settings.template.json
# Remplacer les valeurs par ${ANTHROPIC_API_KEY} etc.

# 4. .gitignore strict
echo "settings.json\nmcp.json\nprojects/" > .gitignore

git remote add origin git@github.com:you/claude-config-private.git
git push -u origin main
```

## Synchronisation entre machines

```bash
# Machine source (après modification)
cd ~/claude-config-backup
git add agents/ commands/ hooks/ skills/
git commit -m "Update hooks: add auto-format"
git push

# Machine cible
cd ~/claude-config-backup
git pull
# Les symlinks propagent automatiquement vers ~/.claude/
```

## `settings.local.json` pour les overrides machine

Chaque machine peut avoir ses propres préférences sans toucher à la configuration partagée. Ce fichier prend le dessus sur `settings.json` et ne se committe jamais.

```json
{
  "permissions": {
    "allow": ["Bash(brew *)", "Bash(docker *)"]
  },
  "env": {
    "ANTHROPIC_BASE_URL": "http://localhost:8080"
  }
}
```

## Alternative : cloud sync par symlink

```bash
# Déplacer ~/.claude vers Dropbox/iCloud
mv ~/.claude ~/Dropbox/claude-config
ln -s ~/Dropbox/claude-config ~/.claude
# Synchronisation automatique entre machines
```

Avantage : zéro effort de maintenance. Inconvénient : pas d'historique de versions, risque de conflits de synchronisation si les deux machines sont actives simultanément.

## Backup automatique avec cron

```bash
# Backup quotidien à 2h du matin
0 2 * * * tar -czf ~/claude-backups/config-$(date +%F).tar.gz \
  ~/.claude/agents ~/.claude/commands \
  ~/.claude/hooks ~/.claude/settings.json
```
