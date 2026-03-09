---
title: Mode Non-Interactif & Headless
subtitle: 'Utiliser Claude Code sans interaction humaine : scripts, CI, pipes'
cardNumber: T02
category: Technique
difficulty: intermediate
guideVersion: 3.32.1
order: 2
---

## Flag de base : `-p`

Le flag `-p` (ou `--print`) active le mode non-interactif. Claude retourne la réponse dans le terminal et quitte immédiatement sans attendre de saisie utilisateur.

```bash
# Prompt direct
claude -p "Analyse ce fichier et liste les bugs"

# Avec pipe stdin (le contenu devient l'entrée)
git diff | claude -p "Explique ces changements"
cat error.log | claude -p "Identifie la cause racine"
```

## Formats de sortie

`--output-format` contrôle la structure de la réponse, ce qui est essentiel pour l'intégration dans des scripts.

| Format | Usage |
|--------|-------|
| `text` | Lisible, défaut |
| `json` | Parseable par `jq` |
| `stream-json` | Streaming temps réel |

```bash
# Sortie JSON pour parsing automatique
git status --short | claude -p "Catégorise les changements" \
  --output-format json | jq '.categories'

# Stream JSON pour longues opérations
cat rapport.txt | claude -p "Résume" --output-format stream-json
```

## `--no-stream` et contrôle de flux

Par défaut, Claude Code streame la réponse caractère par caractère. `--no-stream` attend la réponse complète avant d'afficher quoi que ce soit, ce qui simplifie les pipes avec des outils qui attendent une entrée complète.

```bash
claude -p "Génère un rapport" --no-stream > rapport.md
```

## Usage en CI/CD

Dans un container isolé, `--dangerously-skip-permissions` supprime toutes les demandes de confirmation. À réserver exclusivement aux environnements sandboxés où Claude ne peut pas accéder à des ressources sensibles.

```bash
# GitHub Actions (container isolé)
claude -p "Lance les tests et corrige les échecs" \
  --dangerously-skip-permissions \
  --output-format json
```

## Patterns courants

```bash
# Analyse de logs automatique
tail -n 200 app.log | claude -p "Alertes critiques uniquement" \
  --output-format json

# Revue de PR (intégration package.json)
git diff main...HEAD | claude -p "Revue sécurité, format JSON" \
  --output-format json > review.json
```

## Interactif vs Non-Interactif

| Aspect | Interactif | Non-Interactif (`-p`) |
|--------|------------|----------------------|
| Sortie | Stream UI | stdout brut |
| Permissions | Demande | Auto ou skip |
| Usage | Développement | CI, scripts, pipes |
| Session | Persistante | Unique, sans état |

**Bonne pratique** : limiter la taille du pipe pour éviter de dépasser la fenêtre de contexte. Filtrer avec `head`, `grep` ou `--name-only` avant d'envoyer à Claude.
