---
title: Modèles & Thinking Modes
subtitle: Choisir le bon modèle et le bon niveau de réflexion
cardNumber: T18
category: Technique
difficulty: beginner
guideVersion: 3.32.1
order: 18
---

## Les Trois Modèles

| Modèle | Prix input/1M | Idéal pour |
|--------|--------------|------------|
| **Haiku 4.5** | $0.80 | Tâches mécaniques, CI/CD |
| **Sonnet 4.6** | $3.00 | Développement quotidien (défaut) |
| **Opus 4.6** | $5.00 | Architecture, sécurité, audit |

Sonnet est le point de départ naturel, couvrant 80% des cas d'usage. Haiku divise le coût par 4 sur les tâches répétitives (génération de tests, renommage massif). Opus entre en jeu uniquement quand le raisonnement profond change réellement la qualité du résultat.

## Changer de Modèle

```bash
# Via commande slash
/model

# Via flag au démarrage
claude --model haiku "Fix this typo in README.md"
claude --model opus "Design the auth system"
```

## Table de Décision Rapide

| Tâche | Modèle | Effort |
|-------|--------|--------|
| Renommage, formatage | Haiku | low |
| Génération de tests | Haiku | low |
| Feature standard | Sonnet | medium |
| Refactorisation de module | Sonnet | high |
| Architecture système | Opus | high |
| Audit sécurité critique | Opus | max |

## Thinking Modes (Opus 4.6)

Opus 4.6 utilise l'**Adaptive Thinking** : le modèle alloue dynamiquement son budget de calcul selon la complexité de la requête. Le paramètre `effort` contrôle cette profondeur.

**Niveaux d'effort** :

- **low** : zéro preamble, opérations combinées, tâches mécaniques
- **medium** : pattern défini, scope borné, une seule préoccupation
- **high** : décisions de design, edge cases, multiple préoccupations
- **max** : raisonnement cross-système, décisions irréversibles (Opus 4.6 uniquement)

## Contrôler le Thinking

```
Alt+T          Activer/désactiver (session courante)
/config        Persistant entre sessions
/model + ←/→  Slider effort low|medium|high
```

Les keywords `ultrathink`, `think hard` n'ont plus d'effet fonctionnel depuis v2.0.67. Le thinking adaptatif est actif par défaut sur Opus 4.6.

## Règle d'Or

**Commencer avec Sonnet.** Monter à Opus uniquement si la tâche implique des décisions irréversibles, du raisonnement multi-système, ou un audit critique. Descendre à Haiku pour tout ce qui est mécanique et prévisible. La plupart des sessions n'ont jamais besoin d'Opus.

## Pattern Multi-Agent

```yaml
# planner.md — exploration, lecture seule
model: opus
tools: Read, Grep, Glob

# implementer.md — exécution mécanique
model: haiku
tools: Write, Edit, Bash
```

Assigner les modèles selon le **rôle**, pas l'importance perçue.
