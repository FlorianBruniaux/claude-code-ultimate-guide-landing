---
title: 'Context Window : 200K vs 1M'
subtitle: Quand passer à la fenêtre de contexte étendue et à quel coût
cardNumber: T19
category: Technique
difficulty: intermediate
guideVersion: 3.32.1
order: 19
---

## Les Deux Fenêtres

| Paramètre | 200K standard | 1M beta |
|-----------|--------------|---------|
| Disponibilité | Tous les plans | API uniquement, tier 4 |
| Header requis | Aucun | `anthropic-beta: context-1m-2025-08-07` |
| Prix (input Opus) | $5/MTok | $10/MTok |
| Max output | 128K tokens | 128K tokens |

Au-dessus de 200K tokens en entrée, **tous les tokens du contexte** sont facturés au tarif premium, pas seulement l'excédent. C'est un palier de coût, pas une progression linéaire.

## Précision à l'Échelle (MRCR v2)

| Modèle | À 256K | À 1M |
|--------|--------|------|
| Opus 4.6 | 93% | 76% |
| Sonnet 4.5 | n/a | 18.5% |

Opus 4.6 reste utilisable à 1M (76% de précision), mais la dégradation est mesurable. Sonnet s'effondre et n'est pas recommandé au-delà de 200K pour des tâches précises.

## Coût par Session (Approximatif)

| Type de session | Tokens in | Sonnet 4.6 | Opus 4.6 |
|-----------------|-----------|-----------|---------|
| PR review (≤200K) | 50K | ~$0.23 | ~$0.38 |
| Refactorisation (≤200K) | 150K | ~$0.75 | ~$1.25 |
| Analyse service (>200K) | 500K | ~$4.13 | ~$6.88 |

## Quand Utiliser 1M

La règle de la communauté : 200K + RAG par défaut, 1M Opus réservé aux cas où charger tout d'un coup est réellement nécessaire.

**Justifié :**
- Audit complet d'un codebase entier en une seule passe
- Analyse de documentation massive sans possibilité de chunking
- Agent Teams sur une architecture multi-services complexe

**Non justifié :**
- Développement quotidien (même sur de gros projets)
- Tâches avec feedback loop rapide (tests, debug)
- Cas où /compact + sessions séquentielles fonctionnent

## Activation (API)

```python
response = client.messages.create(
    model="claude-opus-4-6",
    extra_headers={
        "anthropic-beta": "context-1m-2025-08-07"
    },
    messages=[...]
)
```

Sans ce header, les requêtes dépassant 200K tokens retournent une erreur même sur les comptes tier 4.

## Pattern Recommandé

Travailler à 200K avec `/compact` proactif (à 70% de contexte) plutôt que d'activer 1M par défaut. Ouvrir une nouvelle session vers 70-75% d'utilisation : la performance est meilleure et le coût reste prévisible.

Pour la RAG sur gros documents, Gemini 1.5 Pro offre 2M de contexte à $3.50/$10.50 par MTok, soit 2-3x moins cher pour du retrieval pur sans besoin du raisonnement Opus.
