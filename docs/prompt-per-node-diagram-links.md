# Prompt — Per-node clickable links dans les diagrammes Mermaid

## Contexte du projet

Landing page : `/Users/florianbruniaux/Sites/perso/claude-code-ultimate-guide-landing`
Guide source : `/Users/florianbruniaux/Sites/perso/claude-code-ultimate-guide`
Stack : Astro 5, SVGs générés au build via `mermaid-cli` (`mmdc`)
Production : https://cc.bruniaux.com/diagrams/

## Ce qui existe déjà

Les diagrammes `/diagrams/` ont une tooltip JS qui s'affiche au hover/click sur un nœud SVG.
**Problème** : tous les nœuds d'un même diagramme pointent vers la même URL (niveau diagramme).

### Fichiers clés
- `src/pages/diagrams/index.astro` — page principale + tooltip JS
- `src/data/diagrams-guide-urls.ts` — mapping actuel (1 URL par diagramme, 40 entrées)
- `src/data/diagrams-data.ts` — **GÉNÉRÉ** par `scripts/build-diagrams-data.mjs`, ne pas éditer
- `scripts/build-diagrams-data.mjs` — build script qui lit les `.md` Mermaid et génère les SVGs

### Sources Mermaid (dans le repo guide voisin)
```
/Users/florianbruniaux/Sites/perso/claude-code-ultimate-guide/guide/diagrams/
├── 01-foundations.md           (4 diagrammes)
├── 02-context-and-sessions.md  (4 diagrammes)
├── 03-configuration-system.md  (4 diagrammes)
├── 04-architecture-internals.md (4 diagrammes)
├── 05-mcp-ecosystem.md         (4 diagrammes)
├── 06-development-workflows.md (4 diagrammes)
├── 07-multi-agent-patterns.md  (5 diagrammes)
├── 08-security-and-production.md (4 diagrammes)
├── 09-cost-and-optimization.md (4 diagrammes)
└── 10-adoption-and-learning.md (3 diagrammes)
```

## Objectif

Rendre chaque **nœud SVG** cliquable vers la section précise du guide qui lui correspond.

## Approche recommandée : directives `click` Mermaid

Mermaid supporte nativement :
```mermaid
click NodeId href "https://..." "Tooltip text"
```
Quand `mmdc` compile ça, le nœud devient un `<a href="...">` dans le SVG.

Le JS existant peut ensuite détecter ce `<a>` et utiliser son `href` :
```js
// Dans la tooltip, utiliser le href natif si disponible
const nativeLink = node.closest('a[href]')
const nodeUrl = nativeLink?.getAttribute('href') ?? diagramUrl
```

## Travail à faire

### Étape 1 — Analyser chaque nœud de chaque diagramme

Pour chacun des 10 fichiers `.md` dans `guide/diagrams/` :
1. Lire le code Mermaid (entre les balises \`\`\`mermaid ... \`\`\`)
2. Extraire les IDs de nœuds et leurs labels (ex: `B[[Layer 1: System Prompt]]`)
3. Identifier la section du guide qui correspond le mieux
4. Construire l'URL GitHub : `https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/main/guide/FICHIER.md#ancre`

Les fichiers du guide à mapper :
- `guide/ultimate-guide.md` (fichier principal, ancres par section)
- `guide/architecture.md`
- `guide/security-hardening.md`
- `guide/sandbox-native.md`
- `guide/production-safety.md`
- `guide/mcp-servers-ecosystem.md`
- `guide/workflows/tdd-with-claude.md`
- `guide/workflows/spec-first.md`
- `guide/workflows/plan-driven.md`
- `guide/workflows/iterative-refinement.md`
- `guide/workflows/agent-teams.md`
- `guide/workflows/dual-instance-planning.md`
- `guide/adoption-approaches.md`
- `guide/learning-with-ai.md`

### Étape 2 — Ajouter les directives `click` dans les sources Mermaid

Pour chaque nœud, ajouter après le bloc de styles dans le code Mermaid :
```
click B href "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/main/guide/ultimate-guide.md#system-prompt" "Layer 1: System Prompt"
```

### Étape 3 — Rebuilder les SVGs

```bash
cd /Users/florianbruniaux/Sites/perso/claude-code-ultimate-guide-landing
node scripts/build-diagrams-data.mjs
```

### Étape 4 — Adapter le JS de la tooltip

Dans `src/pages/diagrams/index.astro`, modifier la fonction `showTooltip` :

```js
svg.addEventListener('mouseover', (e) => {
  const node = (e.target as Element).closest('.node')
  if (node && node !== currentNode) {
    currentNode = node
    // Priorité au href natif Mermaid click, fallback URL du diagramme
    const nativeLink = node.querySelector('a[href]') ?? node.closest('a[href]')
    const nodeUrl = nativeLink?.getAttribute('href') ?? url
    showTooltip(nodeUrl, node)
  }
})
```

### Étape 5 — Commit et push

```bash
git add guide/diagrams/ src/data/diagrams-data.ts
git commit -m "feat: per-node guide links via Mermaid click directives"
git push
```

## Exemple concret — 01-foundations.md, diagramme 1

Nœuds identifiés :
| ID | Label | Section guide cible |
|----|-------|---------------------|
| A | User Message | `#getting-started` |
| B | Layer 1: System Prompt | `#system-prompt` |
| B1 | CLAUDE.md files | `#claudemd-files` |
| C | Layer 2: Context Injection | `#context-injection` |
| C1 | Working directory / Git status | `#context-management` |
| D | Layer 3: Tool Definitions | `#tool-categories` |
| D1 | Glob, Grep, Read, Bash, Task, MCP | `#tool-categories` |
| E | Layer 4: Conversation History | `#conversation-history` |
| F | Claude API | `#how-claude-code-works` |
| G | Claude Response | `#how-claude-code-works` |

Directives à ajouter dans le bloc Mermaid :
```
click B href "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/main/guide/ultimate-guide.md#system-prompt"
click B1 href "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/main/guide/ultimate-guide.md#claudemd-files"
click C href "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/main/guide/ultimate-guide.md#context-management"
click D href "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/main/guide/ultimate-guide.md#tool-categories"
click E href "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/main/guide/ultimate-guide.md#conversation-history"
```

## Notes importantes

- Le `build-diagrams-data.mjs` génère `src/data/diagrams-data.ts` (>800KB) — **ne jamais éditer ce fichier directement**
- Les ancres GitHub sont auto-générées depuis les titres Markdown : `## Section Title` → `#section-title`
- Vérifier les ancres existantes avec : `grep "^#" guide/ultimate-guide.md | head -50`
- Si une ancre n'existe pas, linker vers le fichier sans ancre plutôt qu'une ancre cassée
- Le CI rebuild les SVGs automatiquement depuis les sources `.md` du guide repo

## Commandes utiles

```bash
# Voir tous les nœuds d'un diagramme
grep -E "^\s+[A-Z][A-Z0-9]*[\[\(\{\|]" guide/diagrams/01-foundations.md

# Voir les ancres disponibles dans ultimate-guide.md
grep "^## \|^### " guide/ultimate-guide.md | head -100

# Tester le build local
node scripts/build-diagrams-data.mjs && pnpm build
```
