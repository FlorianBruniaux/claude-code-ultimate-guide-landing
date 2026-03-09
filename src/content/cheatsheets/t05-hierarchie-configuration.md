---
title: Hiérarchie de Configuration
subtitle: Où configurer quoi — de global à local
cardNumber: T05
category: Technique
difficulty: beginner
guideVersion: 3.32.1
order: 5
---

## Niveaux de Configuration

| Niveau | Fichier | Scope | Git |
|--------|---------|-------|-----|
| Global user | `~/.claude/settings.json` | Tous projets | Non |
| Global rules | `~/.claude/CLAUDE.md` | Tous projets | Non |
| Projet partagé | `.claude/settings.json` | Équipe | Oui |
| Projet local | `.claude/settings.local.json` | Perso | Non |
| Projet rules | `CLAUDE.md` (racine) | Équipe | Oui |
| Sous-dossier | `sous-dossier/CLAUDE.md` | Dossier | Oui |

## Résolution des Conflits

```
~/.claude/CLAUDE.md          (1 - base globale)
↓ + merge
./CLAUDE.md                  (2 - règles projet)
↓ + merge
sous-dossier/CLAUDE.md       (3 - règles locales)
↓ + merge
@import explicite             (4 - import inline)
```

Les règles du niveau inférieur **complètent** et ne remplacent pas les niveaux supérieurs.

## settings.json — Structure

```json
{
  "model": "claude-opus-4-5",
  "permissions": {
    "allow": ["Bash(git *)"],
    "deny": ["Bash(rm -rf*)"]
  },
  "env": {
    "ANTHROPIC_LOG": "error"
  }
}
```

## CLAUDE.md — Bonnes Pratiques

```markdown
# Conventions Projet

## Stack
- TypeScript strict mode
- pnpm (pas npm)
- Tests: Vitest

## Règles
- Toujours vérifier les types avant de modifier
- Commit en anglais
- Ne jamais modifier package-lock.json
```

## Ce qui Va Où

**Global CLAUDE.md** — Préférences personnelles, style de code, conventions universelles.

**Projet CLAUDE.md** — Architecture, stack, conventions équipe, commandes de build/test.

**settings.json projet** — Permissions d'outils, modèle par défaut, variables d'env de dev.

**settings.local.json** — Overrides perso qui ne doivent pas affecter l'équipe.

## .gitignore Obligatoire

```
# Dans .gitignore du projet
.claude/settings.local.json
```
