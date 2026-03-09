---
title: 'Permissions : Glob Patterns & Whitelist'
subtitle: Contrôler précisément les outils accessibles avec des patterns glob
cardNumber: T04
category: Technique
difficulty: intermediate
guideVersion: 3.32.1
order: 4
---

## Deux formats de patterns

**Format simple** : correspond au nom d'outil ou à une commande Bash.

```json
"permissions": {
  "allow": ["Bash(git *)", "Bash(pnpm *)", "Read", "Edit"],
  "deny":  ["Bash(rm -rf *)", "Bash(sudo *)", "Bash(npm publish)"]
}
```

**Format tool-qualified** : correspond au chemin du fichier passé en argument à Read, Edit ou Write. Plus précis que le format simple.

```json
"permissions": {
  "deny": [
    "Read(file_path:*.env*)",
    "Edit(file_path:*.pem)",
    "Write(file_path:*.key)",
    "Read(file_path:*credentials*)"
  ]
}
```

## Syntaxe glob

| Pattern | Ce qui correspond |
|---------|-------------------|
| `Bash(git *)` | Toute commande git |
| `Bash(npm test*)` | `npm test`, `npm test:watch` |
| `Read(file_path:*.env*)` | `.env`, `.env.local`, `.env.prod` |
| `Edit(file_path:src/**)` | Tous les fichiers sous `src/` |
| `Write(file_path:*.key)` | Tout fichier `.key` |

## Niveaux progressifs

```json
// Niveau 1 - Lecture seule
{ "autoApproveTools": ["Read", "Grep", "Glob"] }

// Niveau 2 - Git + gestionnaire de paquets
{ "autoApproveTools": ["Read", "Grep", "Glob",
    "Bash(git *)", "Bash(pnpm *)"] }

// Niveau 3 - Développement complet
{ "autoApproveTools": ["Read", "Grep", "Glob",
    "Edit", "Write", "Bash(git *)", "Bash(pnpm *)"] }
```

## Comportements des trois catégories

| Catégorie | Comportement |
|-----------|-------------|
| `allow` | Auto-approuvé, sans demande |
| `deny` | Bloqué complètement |
| `ask` | Demande de confirmation |
| (défaut) | Mode de permission par défaut |

## Limitation connue

`permissions.deny` a une limite documentée : le background indexing peut exposer le contenu de fichiers via des rappels système avant que les checks de permission ne s'appliquent (GitHub #4160). Pour une protection garantie des secrets, stocker ces fichiers en dehors du répertoire projet.

## Où définir les permissions

```
~/.claude/settings.json       (global, tous les projets)
.claude/settings.json         (projet, partagé avec l'équipe)
.claude/settings.local.json   (machine locale, gitignore)
```

**Ordre de priorité** : `settings.local.json` gagne sur `settings.json` qui gagne sur le global. Utiliser `settings.local.json` pour des permissions personnelles sans affecter l'équipe.
