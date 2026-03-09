---
title: TodoWrite vs Tasks API
subtitle: L'ancien et le nouveau système de gestion des tâches
cardNumber: M07
category: Méthodologie
difficulty: intermediate
guideVersion: 3.32.1
order: 107
---

## Comparaison directe

| Critère | TodoWrite (legacy) | Tasks API (v2.1.16+) |
|---------|-------------------|---------------------|
| **Persistance** | Session uniquement | Disque (`~/.claude/tasks/`) |
| **Multi-session** | Perdu à la fermeture | Survit aux redémarrages |
| **Dépendances** | Ordre manuel | `blockedBy` natif |
| **Coordination** | Agent unique | Multi-agents, broadcast |
| **Statuts** | pending / completed | 4 statuts + métadonnées |
| **Résumé context** | Perdu au `/compact` | Intact après compaction |

## Quand rester sur TodoWrite

TodoWrite reste pertinent pour les cas simples : une liste linéaire qui se boucle en moins de dix minutes, sans dépendances complexes, dans une seule session continue. Le setup Tasks API représente un investissement qui ne vaut le coût que si le projet s'étend dans le temps.

## Quand migrer vers Tasks API

```
Travail sur plusieurs sessions    → Tasks API obligatoire
Dépendances entre tâches          → blockedBy natif
Multi-terminal ou multi-agents    → broadcast en temps réel
Reprise après /compact            → persistance garantie
```

## Activer et désactiver

```bash
# Tasks API est activée par défaut depuis v2.1.19
claude

# Forcer le retour à TodoWrite (rare)
CLAUDE_CODE_ENABLE_TASKS=false claude

# Vérifier la configuration actuelle
env | grep CLAUDE_CODE_ENABLE_TASKS
```

## Migrer une liste TodoWrite existante

Voici la transformation type d'une liste plate vers une hiérarchie Tasks API.

**Avant (TodoWrite) :**
```
- [ ] Ajouter l'authentification utilisateur
- [ ] Hacher les mots de passe
- [ ] Écrire les tests
```

**Après (Tasks API) :**
```bash
export CLAUDE_CODE_TASK_LIST_ID="mon-projet-auth"
# Puis dans Claude :
# TaskCreate parent + enfants avec blockedBy
```

## Mettre à jour CLAUDE.md

Quand vous migrez, mettez à jour vos instructions projet pour que Claude utilise automatiquement le bon système. Préciser l'ID de liste attendu dans CLAUDE.md évite les oublis entre sessions.

## Note sur l'avenir de TodoWrite

TodoWrite continuera à fonctionner, mais la direction d'Anthropic est clairement vers Tasks API. Les nouvelles fonctionnalités de coordination multi-agents sont exclusivement construites sur Tasks API. Migrer maintenant évite une refonte forcée plus tard, sur des projets plus grands.

## Flag de migration automatique

Depuis la v2.1.19, le flag `--task-manage` active automatiquement Tasks API pour toute opération impliquant plus de trois étapes ou deux répertoires distincts. Pratique pour forcer la bonne habitude sans y penser.
