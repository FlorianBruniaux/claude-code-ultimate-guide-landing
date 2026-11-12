# Contrat d'intégration du système portfolio

Référence : `florian-portfolio@376d69b7`. Ce fichier sert aux sessions qui migrent une page ou un composant du guide. Les classes ci-dessous existent déjà dans `src/styles/portfolio-system.css`, `src/styles/components.css` et `src/styles/global.css`. Ne pas modifier ces trois fichiers, ni `Header.astro`, `Footer.astro`, `Layout.astro`, `starlight-overrides.css` : signaler le besoin à la session principale.

## Jetons

Utiliser uniquement les variables, jamais une couleur en dur pour un rôle qui en a une :

- surfaces : `--bg-primary` (fond de bande), `--bg-secondary`, `--bg-tertiary`, `--surface-elevated` (carte) ;
- texte : `--text-primary`, `--text-secondary`, `--text-muted` ;
- lien et focus : `--accent`, `--accent-hover` ;
- action principale : `--action`, `--action-hover`, `--action-ink` ;
- bordures : `--border` ; rayons : `--radius-control` (6 px), `--border-radius-lg` (8 px carte) ;
- polices : `--font-display` (Barlow Condensed, h1 à h3 déjà global), `--font-sans`, `--font-mono`.

Les couleurs sémantiques d'état (succès, alerte, danger, catégories de données) restent permises si elles ont un sens. Les remplacer seulement si elles imitent l'accent orange.

## Composition de page

- Intro de page : `<section class="page-hero">` (charcoal hachuré, filet orange 3 px). Une page dont l'intro n'utilise pas `.page-hero` doit l'adopter ou poser `band band-ink band-hero section-wallpaper` sur sa section d'intro.
- Bandes : une `<section>` de contenu porte `band` plus une surface : `band-base` (ivoire), `band-paper section-wallpaper` (papier hachuré, un chapitre sur deux au plus), `band-ink section-wallpaper` (charcoal), `band-accent section-wallpaper` (orange, une seule par page, pour l'appel à l'action ou l'offre). Les jetons sont redéclarés par la bande : ne pas forcer de couleur dans les enfants.
- `.section--alt` est déjà converti en papier hachuré.
- Label de chapitre : `import ChapterLabel from '<chemin>/components/global/ChapterLabel.astro'` puis `<ChapterLabel number="01" label="Libellé" />` au-dessus du h2 d'une section principale. Réservé aux 3 à 6 grands chapitres d'une page, pas aux sous-sections.
- Eyebrow / kicker : mono, majuscules, couleur `--accent`, tiret de 28 px avant (`.section-kicker` l'a déjà).

## Cartes

- Ajouter `brand-card` à une carte statique, `brand-card brand-interactive-card` à une carte cliquable (lien entier) ou qui contient une action principale.
- Supprimer tout `transform: translateY(...)` au survol, toute ombre douce (`box-shadow: var(--shadow-md)` ou rgba floue) et tout `transition: all`. Le survol du portfolio est géré par `.brand-interactive-card` : ligne intérieure + ombre dure 4 px, et remplissage orange avec texte encre en thème clair.
- Rayon des cartes : `var(--border-radius-lg)`. Pas de `border-radius: 12px` ou plus, pas de pilule `999px` sauf badge de compteur.
- Les liens dans une carte restent soulignés (règle globale déjà active pour les liens de prose).

## Actions

- `<a class="btn btn-primary">` : une seule par groupe, l'action prioritaire.
- `<a class="btn btn-secondary">` : action autonome visible au repos.
- `<a class="btn btn-quiet">` : renvoi discret, souligné.
- `<a href>` pour naviguer ou télécharger, `<button>` pour agir sur la page. Cibles de 44 px au moins.
- Supprimer les redéfinitions locales de `.btn`, `.btn-primary`, `.btn-secondary` : le style commun doit s'appliquer.
- Les commandes de type onglet, filtre ou bascule gardent leur famille mais suivent : bordure `--border`, rayon `--radius-control`, état actif = fond `--text-primary` et texte `--bg-primary` (comme `.brand-filter` du portfolio), focus `outline: 2px solid var(--accent); outline-offset: 3px`.

## Liens

Liens de prose soulignés au repos, trait 2 px au survol, couleur `--accent`. Les listes de liens (navigation, « voir aussi ») peuvent rester non soulignées au repos mais doivent souligner au survol et au focus.

## À ne pas toucher

Contenu, textes, URL, ancres, `id`, attributs ARIA, scripts et données. Le travail est visuel. Garder les tests existants verts.

## Vérification attendue par page

Capture plein écran en clair et en sombre à 1440 px, plus mobile 390 px en clair, avec les scripts du dossier `outils/`. Aucun débordement horizontal. Survol d'une carte et d'un bouton observé.
