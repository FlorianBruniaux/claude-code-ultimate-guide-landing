---
title: Fast Mode & API Breaking Changes
subtitle: Le mode rapide et les changements API majeurs à connaître
cardNumber: T21
category: Technique
difficulty: intermediate
guideVersion: 3.32.1
order: 21
---

## Fast Mode

Fast Mode produit des réponses **2.5x plus rapides** en échange d'un coût 6x supérieur. Le modèle sous-jacent reste Opus 4.6, pas un modèle différent : c'est une allocation de ressources prioritaire, pas une simplification du raisonnement.

| Paramètre | Standard | Fast Mode |
|-----------|----------|-----------|
| Modèle | Opus 4.6 | Opus 4.6 |
| Vitesse | Référence | 2.5x plus rapide |
| Prix input | $5/MTok | $30/MTok |
| Prix output | $25/MTok | $150/MTok |

**En CLI :** `/fast` active le mode pour la session courante.

## Quand Utiliser Fast Mode

Fast Mode est rentable quand le temps de réponse a une valeur métier directe : démo en direct, paire de programmation intensive, génération de code mécanique en boucle rapide. Ce n'est pas un remplacement de Sonnet pour les tâches simples, Sonnet reste 10x moins cher.

**Pertinent :**
- Génération de boilerplate répétitif en session interactive
- Reformatage ou conversion de code à grande échelle
- Contexte de démo où la latence visible impacte l'expérience

**Non pertinent :**
- Tâches de fond ou asynchrones (la vitesse ne compte pas)
- Tâches simples couvrable par Sonnet ou Haiku
- Budgets API serrés

## Fast Mode via API (Opus 4.6)

```python
response = client.messages.create(
    model="claude-opus-4-6",
    speed="fast",
    extra_headers={
        "anthropic-beta": "fast-mode-2026-02-01"
    },
    messages=[{"role": "user", "content": "..."}]
)
```

Le header beta est obligatoire. Sans lui, le paramètre `speed` est ignoré silencieusement.

## Breaking Change : `assistant-prefill` Supprimé

Opus 4.6 a retiré le support de l'**assistant prefill** : la technique qui permettait de pré-remplir la réponse de Claude pour guider son format de sortie.

```python
# Avant (ne fonctionne plus sur Opus 4.6)
messages=[
    {"role": "user", "content": "Réponds en JSON"},
    {"role": "assistant", "content": "{"}  # prefill
]

# Après — utiliser le system prompt
system="Always respond with valid JSON only."
```

**Impact :** tout pipeline API utilisant `assistant-prefill` sur Opus 4.6 doit migrer vers des instructions explicites dans le system prompt ou des exemples few-shot.

## Paramètre `effort` (API)

Le paramètre `effort` remplace `budget_tokens` sur Opus 4.6 pour contrôler la profondeur de raisonnement.

```python
output_config={"effort": "medium"}  # low|medium|high|max
```

`budget_tokens` reste fonctionnel sur Opus 4.5 mais est déprécié sur 4.6. Migrer vers `effort` pour les nouveaux pipelines.

## Résumé des Changements Opus 4.6

| Fonctionnalité | Statut |
|---------------|--------|
| `assistant-prefill` | Supprimé |
| `budget_tokens` | Déprécié (remplacé par `effort`) |
| Fast Mode | Nouveau (`speed: "fast"`) |
| Adaptive Thinking | Nouveau (remplace thinking opt-in) |
