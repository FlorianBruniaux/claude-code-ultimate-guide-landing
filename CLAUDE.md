# Landing Site - Claude Code Ultimate Guide

## URLs

| Environnement | URL |
|---------------|-----|
| **Production** | https://cc.bruniaux.com/ |
| **Custom Domain** | https://claudecode.bruniaux.com (à configurer) |
| **GitHub Repo** | https://github.com/FlorianBruniaux/claude-code-ultimate-guide-landing |

## Configuration Custom Domain

**Domaine cible**: `claudecode.bruniaux.com`

### Étapes de configuration

1. **Créer fichier CNAME** (à la racine du repo):
   ```
   claudecode.bruniaux.com
   ```

2. **Configurer DNS** (chez le registrar de bruniaux.com):
   - Type: `CNAME`
   - Host: `claudecode`
   - Value: `florianbruniaux.github.io`

3. **Activer HTTPS** dans GitHub Pages settings (après propagation DNS)

## Source de vérité

**Ce site est SECONDAIRE**. La source de vérité est le guide principal:
`/Users/florianbruniaux/Sites/perso/claude-code-ultimate-guide/`

**Workflow obligatoire**:
1. Modifier d'abord le guide principal
2. Puis synchroniser ici

Ne JAMAIS modifier les stats ou le contenu ici sans avoir d'abord mis à jour le guide principal.

## Éléments synchronisés depuis le guide

| Élément | Source (guide) | Fichiers landing |
|---------|----------------|------------------|
| Version | `VERSION` | index.html (footer + FAQ) |
| Templates count | `find examples/ -type f` | index.html (title, meta, badges, section), examples.html |
| Quiz questions | questions.json count | quiz.html, index.html |
| Guide lines | `wc -l guide/ultimate-guide.md` | index.html badges |
| Golden Rules | README.md | index.html section |
| FAQ | README.md | index.html (schema + HTML) |
| **Guide search index** | `guide/*.md` headings | `guide-data.js` (45+ entrées) |
| **Claude Code Releases** | `machine-readable/claude-code-releases.yaml` | index.html (banner + #releases section) |
| **AI Ecosystem tools** | `guide/ai-ecosystem.md` | index.html (#ecosystem section) |
| **Voice-to-Text** | `guide/ai-ecosystem.md#7-voice-to-text-wispr-flow` | index.html (#ecosystem card) |

## Valeurs actuelles (à maintenir synchronisées)

| Métrique | Valeur | Source |
|----------|--------|--------|
| Version | `3.28.1` | VERSION file |
| Templates | `175` | Count of examples/ files (excl. README/index) |
| Quiz questions | `274` | questions.json |
| Guide lines | `20,548` | ultimate-guide.md |

## Stack technique (post-migration Astro 5)

Le site a migré de HTML statique vers Astro 5. Les références à `index.html`, `examples.html`, `styles.css` ci-dessous sont **obsolètes** — voir les fichiers Astro dans `src/`.

| Ancien (statique) | Nouveau (Astro) |
|-------------------|-----------------|
| `index.html` | `src/pages/index.astro` + composants landing |
| `examples.html` | `src/pages/examples/index.astro` |
| `quiz.html` | `src/pages/quiz/index.astro` |
| `styles.css` | `src/styles/global.css` + `src/styles/components.css` |
| `search.js` + `guide-data.js` | `src/scripts/search.ts` + `src/data/search-index.ts` |

## Fichiers critiques

- **`src/data/examples-data.ts`**: 88 templates (source of truth pour examples + search)
- **`src/data/releases.ts`**: Changelog Claude Code
- **`src/data/security-data.ts`**: CVEs, campaigns, threats
- **`src/data/search-index.ts`**: Index de recherche (landing entries) — éditer ici pour ajouter des entrées
- **`src/data/guide-search-entries.ts`**: **GÉNÉRÉ** — ne jamais éditer directement
- **`src/components/global/SearchModal.astro`**: Modal Cmd+K

## Vérification avant modification

```bash
# Build complet (inclut rebuild search index)
pnpm build

# Dev local
pnpm dev
```

## Workflow obligatoire avant push sur main

Le contenu guide (`src/content/docs/guide/`) est **gitignored** — généré à chaque build depuis le repo guide voisin.

```bash
# 1. Préparer le contenu guide (lit ../claude-code-ultimate-guide/guide/)
node scripts/prepare-guide-content.mjs

# 2. Build complet pour valider
pnpm build

# 3. Si tout passe → push
git push
```

**Pourquoi** : le CI clone le repo guide et régénère le contenu à chaque deploy. Vérifier en local évite de casser le build en prod.

## Quiz Workflow (Markdown + Frontmatter)

**Source de vérité**: 256 fichiers Markdown dans `questions/`

### Architecture

```
questions/
├── _categories.yaml           # 15 catégories
├── {XX-slug}/
│   └── YYY-question-slug.md  # Frontmatter + question + explanation
scripts/
├── migrate-to-markdown.py     # One-time migration (historique)
└── build-questions.py         # Build: 256 MD → questions.json
questions.json                 # GÉNÉRÉ (ne jamais éditer directement)
```

### Format d'une question

**Fichier**: `questions/01-quick-start/001-recommended-install-method.md`

```markdown
---
id: "01-001"
category_id: 1
difficulty: junior
profiles: [junior, senior, power, pm]
correct: d
options:
  a: "Option A"
  b: "Option B"
  c: "Option C"
  d: "Option D (correct)"
doc_reference:
  file: "guide/ultimate-guide.md"
  section: "1.1 Installation"
  anchor: "#11-installation"
official_doc: "https://code.claude.com/docs/en/setup"
---

Question text here

---

Explanation text here
```

### Workflow de modification

**Option 1: Éditer une question existante**

1. Modifier le fichier `.md` correspondant
2. Rebuild: `python3 scripts/build-questions.py`
3. Commit: `git add questions/ questions.json`

**Option 2: Ajouter une question**

1. Créer fichier dans `questions/{XX-slug}/YYY-new-slug.md`
2. Respecter format frontmatter + body
3. Rebuild: `python3 scripts/build-questions.py`
4. Commit

**Option 3: Modifier catégories**

1. Éditer `questions/_categories.yaml`
2. Rebuild: `python3 scripts/build-questions.py`
3. Commit

### Build validations

Le script `build-questions.py` valide automatiquement:

| Règle | Type |
|-------|------|
| Champs requis présents | Erreur |
| Options = exactement {a, b, c, d} | Erreur |
| `correct` ∈ options | Erreur |
| `difficulty` ∈ {junior, intermediate, senior, power} | Erreur |
| `profiles` ⊂ {junior, senior, power, pm} | Erreur |
| `category_id` cohérent avec répertoire | Erreur |
| ID unique + format `XX-YYY` | Erreur |
| Question et explanation non vides | Erreur |
| Gaps dans IDs séquentiels | Warning |

**Exit code 1** si erreur → CI/CD fail

### CI/CD Pipeline (GitHub Actions)

`.github/workflows/static.yml` exécute:

```yaml
- name: Build questions.json
  run: python3 scripts/build-questions.py
```

**Comportement**:
- Push vers `main` → Build automatique → Deploy
- Build fail → Deploy bloqué
- `questions.json` généré à chaque déploiement

### Avantages du nouveau système

| Aspect | Avant (JSON) | Après (Markdown) |
|--------|--------------|------------------|
| **Lisibilité** | JSON compact, difficile à lire | Markdown + frontmatter, naturel |
| **Édition** | Risque de casser le JSON | Format guidé, validations strictes |
| **Git diffs** | 1 ligne par question | Diff clair par question |
| **Contribution** | Requiert connaissances JSON | Format universel (Markdown) |
| **Structure** | Monolithique (260KB, 6051 lignes) | Modulaire (256 fichiers, organisés par catégorie) |
| **Validation** | Manuelle ou scripts externes | Build-time automatique avec exit codes |

**Note importante**: Ne plus éditer `questions.json` directement. Toujours passer par les fichiers `.md` + rebuild.

## Synchronisation guide-data.js (recherche globale)

Le fichier `guide-data.js` indexe les sections du guide pour la recherche Cmd+K.

**Quand mettre à jour :**
- Nouvelle section majeure ajoutée au guide
- Fichier .md renommé ou supprimé
- Ancre (#section) modifiée

**Ce qui n'impacte PAS :**
- Corrections de typos
- Ajouts de contenu dans sections existantes

**Workflow de mise à jour :**
```bash
# 1. Vérifier les changements dans le guide
./scripts/sync-guide-data.sh

# 2. Éditer guide-data.js manuellement pour ajouter/modifier les entrées
# Format: { id, type: 'guide', title, content (keywords), url }

# 3. Tester localement
python3 -m http.server 8080
# Cmd+K → vérifier les nouveaux résultats
```

**Structure d'une entrée guide-data.js :**
```javascript
{
    id: 'guide-unique-id',
    type: 'guide',
    title: 'Titre affiché dans les résultats',
    content: 'mots-clés séparés par espaces pour le fuzzy search',
    url: GUIDE_BASE + 'fichier.md#ancre'
}
```

## Synchronisation Claude Code Releases

Les releases Claude Code sont affichées dans deux endroits:
1. **Version banner** (après le header) - version actuelle avec lien "What's new →"
2. **Section #releases** - timeline des 5 dernières versions + breaking changes

**Source de vérité:** `machine-readable/claude-code-releases.yaml` dans le guide principal

**Quand mettre à jour :**
- Nouvelle version majeure de Claude Code publiée
- Breaking change annoncé par Anthropic
- Correction d'une date ou feature incorrecte

**Éléments à synchroniser :**

| Élément | Emplacement index.html |
|---------|------------------------|
| Version actuelle | `.cc-version-badge` (ligne ~197) |
| 5 dernières releases | `.releases-timeline` cards |
| Breaking changes | `.breaking-changes` liste |

**Workflow de mise à jour :**
```bash
# 1. Mettre à jour le YAML source dans le guide principal
vim /path/to/guide/machine-readable/claude-code-releases.yaml

# 2. Reporter les changements dans index.html
# - Mettre à jour le badge version si nouvelle release
# - Ajouter/modifier les release cards (garder les 5 plus récentes)
# - Mettre à jour les breaking changes si nouveaux

# 3. Tester localement
python3 -m http.server 8080
# Vérifier le banner et la section #releases
```

**Structure d'une release card :**
```html
<div class="release-card"><!-- ajouter "release-latest" pour la plus récente -->
    <div class="release-header">
        <span class="release-version">vX.Y.Z</span>
        <span class="release-date">Mon D, YYYY</span>
    </div>
    <ul class="release-highlights">
        <li>Feature 1</li>
        <li>Feature 2 avec <code>code</code></li>
    </ul>
</div>
```

**Structure d'un breaking change :**
```html
<li><span class="breaking-badge">Type</span> Description avec <code>code</code></li>
```

## Claude Code Releases Sync Policy

**Source de vérité:** `machine-readable/claude-code-releases.yaml` dans le guide principal

**Règle de sélection (5 releases notables):**
Inclure si AU MOINS UN critère :
1. Feature marquée ⭐ dans le YAML
2. Breaking change présent
3. ≥3 highlights dans le YAML

Exclure si :
- Bugfix-only (1 highlight sans ⭐)
- Fix/patch sans impact utilisateur visible

**Banner version:** Toujours la version actuelle (même bugfix-only)

**Breaking changes priorité:**
1. Security fixes (toujours afficher)
2. OAuth/URL changes (user-facing)
3. Behavior changes
4. Deprecations (peut différer)

**Fréquence sync:** Vérifier YAML hebdomadairement ou lors de nouvelle série (2.2.x, etc.)

## Emplacements des stats dans index.html

### Version (3.8.1)
- Ligne ~837: FAQ text "Current version: X.X.X"
- Ligne ~892: Footer `<p class="version">vX.X.X</p>`

### Templates count (55)
- Ligne ~6: `<title>` tag
- Ligne ~9: meta description
- Ligne ~18-19: og:title, og:description
- Ligne ~27: twitter:description
- Ligne ~188: hero-stats
- Ligne ~204: badge image
- Ligne ~455: section heading
- Ligne ~478: section title (déjà correct)
- Ligne ~722: CTA button (déjà correct)

### Dans examples.html
- Ligne ~6: `<title>` tag
- Ligne ~29: section title

## Search Index Cmd+K — Workflow de mise à jour

### Architecture

```
reference.yaml (guide repo)
        ↓ scripts/build-guide-index.mjs
src/data/guide-search-entries.ts  ← GÉNÉRÉ (130 entrées guide)
        +
src/data/search-index.ts          ← EDITABLE (99 entrées landing)
        ↓ sérialisé au build time
SearchModal.astro → <script id="search-data" type="application/json">
        ↓ chargé côté client
src/scripts/search.ts             ← moteur fuzzy, keyboard nav
```

### Quand rebuilder l'index guide

- Après `git pull` du repo guide (si `reference.yaml` a changé)
- Quand de nouvelles sections/fichiers sont ajoutés au guide
- Jamais nécessaire pour les changements de contenu dans des fichiers existants

### Comment rebuilder

```bash
# Via script npm (recommandé)
pnpm build:search

# Via slash command Claude Code
/sync-search

# Via build complet (inclus automatiquement)
pnpm build
```

### Ajouter des entrées landing manuellement

Editer `src/data/search-index.ts`. Format :

```typescript
{
  id: 'unique-kebab-id',
  title: 'Titre affiché dans les résultats',
  keywords: 'mots clés lowercase séparés par espaces pour le fuzzy match',
  category: 'Section > Sous-section',
  url: '/page/#anchor',
  source: 'landing',
}
```

Sections déjà indexées : pages (9), cheatsheet (18 sections), examples (88 templates), homepage, releases (top 10), security (5).

### Scoring de pertinence

| Score | Condition |
|-------|-----------|
| 100 | Titre exact |
| 90 | Titre commence par la query |
| 80 | Word boundary dans le titre |
| 70 | Titre contient la query |
| 65 | Tous les mots de la query dans le titre |
| 55 | Tous les mots dans les keywords |
| 50 | Query dans les keywords |
| 30/20 | Un mot dans titre/keywords |

Max 15 résultats retournés. Debounce 50ms.

### Slash command disponible

`.claude/commands/sync-search.md` → `/sync-search` dans Claude Code

Exécute le build script, vérifie le résultat, lance un build de validation.