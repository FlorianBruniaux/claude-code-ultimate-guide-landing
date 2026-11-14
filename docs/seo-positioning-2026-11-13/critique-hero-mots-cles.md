# Critique du plan « hero élargi et mots-clés », 13/11/2026

Plan critiqué (v1) :

- une phrase sous le hero avec cinq mots-clés liés : context engineering (`/guide/context-engineering/`), harness engineering (`/guide/agent-harness/`), agent evaluation, AI design patterns (`/guide/ai-design-patterns/`), memory systems (`/guide/memory-systems/`) ;
- la mention « Most of it applies to Codex, Cursor or any coding agent » ;
- une nouvelle meta description ;
- en option, le titre `Claude Code Guide: Context & Harness Engineering | Free`.

Données : Search Console, propriété `sc-domain:bruniaux.com`, du 13/08 au 10/11/2026, export requête × page (4 831 lignes, dont 3 289 sur cc.bruniaux.com). Volumes de recherche hors Search Console : non mesurés.

## Préparation

Score : 55 %, à retravailler avant de coder.

Ce qui tient :

- « Claude Code » reste en tête du H1 et du titre ;
- les pages cibles existent ;
- aucun test ne verrouille le texte du hero ni le titre (`grep` sur `src` et `scripts`), donc pas de casse attendue.

## Bloquants

1. **Trois liens sur cinq visent la mauvaise URL.** `/guide/context-engineering/`, `/guide/memory-systems/` et `/guide/ai-design-patterns/` n'ont aucune ligne Search Console sur 90 jours. Les URL qui apparaissent sont `/context-engineering/` et `/memory-systems/`, et `/guide/context-engineering-tools/` pour les outils. Lier la version guide renforce la page que Google ne montre pas, dans une paire déjà en concurrence. Correction : lier `/context-engineering/` et `/memory-systems/`, vérifier leur canonical, retirer AI design patterns (aucune donnée sur les deux URL) ou le garder sans attente de gain.
2. **La phrase « Most of it applies to Codex, Cursor or any coding agent » n'est pas sourcée.** Le README du guide, source de vérité, dit : « Learn Claude Code, build reliable agents, and scale their use safely. » Les pages cibles sont titrées pour Claude Code. Correction : reprendre la formule du README (« build reliable agents »), ou faire valider la phrase par Florian et l'ajouter d'abord au guide.

## Points majeurs

1. **Le titre de l'accueil ne fera pas ranker les mots-clés génériques.** L'accueil reçoit 1 720 impressions et 49 clics, uniquement sur des requêtes de marque : `claude code ultimate guide` 217 impressions, 27 clics, position 2,6. Les mots-clés génériques se gagnent sur leurs propres pages. En revanche, le titre actuel comme celui proposé omettent « Ultimate », alors que c'est la requête qui rapporte. Proposition : `Claude Code Ultimate Guide: Context & Harness Engineering` (57 caractères).
2. **Le mot-clé « harness engineering » est faible, et le meilleur sujet manque.** La requête exacte pèse environ 6 impressions ; la demande est sur `agent harness` (35 impressions, position 54, plus de nombreuses variantes), et la page s'intitule « Claude Code Agent Harness Engineering ». Ancre proposée : `agent harness engineering`. Le seul sujet hors Claude qui rapporte des clics est absent du plan : `/guide/loop-graph-engineering/`, 195 impressions, 11 clics, positions 8 à 10.
3. **Cinq liens avant les boutons du hero.** Ils ajoutent cinq arrêts de tabulation avant « Start in 15 min » et concurrencent l'action principale. Sur la bande charbon, les liens de prose doivent rester soulignés et contrastés. Correction : mots-clés en texte dans la phrase, liens sur une ligne placée après les boutons.
4. **Aucune mesure de départ.** Sans base, le contrôle à J+28 ne prouvera rien. Base au 10/11 ci-dessous.

| Page | Impressions | Clics |
| --- | --- | --- |
| `/guide/agent-harness/` | 507 | 0 |
| `/guide/loop-graph-engineering/` | 195 | 11 |
| `/guide/agent-evaluation/` | 97 | 0 |
| `/guide/context-engineering-tools/` | 67 | 0 |
| `/context-engineering/` | 29 | 0 |

Ces chiffres ne comptent que les requêtes contenant harness, context engineering, design pattern, memory system, agent eval, loop ou graph engineering.

## Points mineurs

- La nouvelle meta perd les compteurs (templates, quiz, CVE). Sans effet mesuré : sur l'accueil, `claude code 101 quiz answers` ne pèse que 2 impressions.
- UX-06 (« Start in 15 min ») attend une décision dans le même composant : la traiter dans un commit séparé.
- Pas de test prévu. En ajouter un, rouge d'abord : chaque lien du hero vise une page qui existe, et « Claude Code » reste en tête du kicker et du H1.

## Plan consolidé v2

### Ce qui change

- Liens : URL qui rankent (`/context-engineering/`, `/memory-systems/`) au lieu des doublons du guide.
- Phrase non sourcée remplacée par la formule du README.
- Ajout de loop & graph engineering, ancre `agent harness engineering`.
- Liens déplacés après les boutons.
- Titre avec « Ultimate ».
- Base de mesure et contrôle le 11/12/2026.

### Proposition de texte

Tagline secondaire (texte seul) :

> Claude Code in depth, plus the engineering that makes agents reliable: context engineering, agent harnesses, loops and graphs, evaluation and memory.

Ligne de liens, après les boutons :

> Beyond Claude Code: Context engineering · Agent harness engineering · Loop & graph engineering · Agent evaluation · Memory systems

| Ancre | URL |
| --- | --- |
| Context engineering | `/context-engineering/` |
| Agent harness engineering | `/guide/agent-harness/` |
| Loop & graph engineering | `/guide/loop-graph-engineering/` |
| Agent evaluation | `/guide/agent-evaluation/` |
| Memory systems | `/memory-systems/` |

Meta description :

> Claude Code Ultimate Guide: learn Claude Code, then context engineering, agent harnesses, loops and graphs, and agent evaluation. Free and open source.

### Unités de livraison

| Unité | Livre | Bloquée par | Validation |
| --- | --- | --- | --- |
| U01 | Liste ancres et URL validée par Florian, phrase sourcée | Aucune | Chaque URL a des lignes Search Console ou un canonical vérifié |
| U02 | Phrase et ligne de liens dans le hero, test rouge puis vert | U01 | `pnpm test` vert ; rendu 1440 et 390 sans débordement ; tabulation : boutons avant liens |
| U03 | Meta description | U01 | 160 caractères au plus ; `pnpm check:built-seo` vert |
| U04 | Titre avec « Ultimate » | U01 | 60 caractères au plus dans `dist/index.html` |
| U05 | Base de mesure enregistrée et contrôle le 11/12/2026 | Aucune | Fichier de base présent ; rappel daté |

Frontière : U01 et U05.

Hors périmètre : nouvelle section « Beyond Claude Code », groupe de menu, badge ambassadeur (en attente du badge).

### Retour arrière

`git revert` du commit, puis vérifier le titre servi en production :

```bash
curl -s https://cc.bruniaux.com/ | grep -o '<title>[^<]*'
```

### Critères de succès au 11/12/2026

- `claude code ultimate guide` reste en position 3 ou mieux sur l'accueil.
- Les impressions des cinq pages cibles dépassent la base ci-dessus, sur une fenêtre de 28 jours comparable.
