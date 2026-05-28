@AGENTS.md

## Routine articles — agent autonome

### Déclenchement
L'agent se réveille automatiquement chaque mardi à 8h03 (CronCreate, session-only). Si la routine n'est pas active, l'utilisateur peut dire **"relance la routine articles"** et l'agent recrée le job avec exactement ce prompt.

L'agent fait un `git pull`, fetche les RSS, propose 5 idées d'articles SEO, puis attend "go article X".

### Flux complet
1. `git pull` sur `main`
2. Fetcher ces flux RSS via WebFetch :
   - https://siecledigital.fr/feed/
   - https://www.blogdumoderateur.com/feed/
   - https://www.frenchweb.fr/feed
   - https://www.maddyness.com/feed/
   - https://www.brevo.com/fr/blog/rss/ (ou feed équivalent)
3. Analyser les articles récents → repérer les angles SEO pertinents pour MyFrenchTool (comparatifs d'outils FR, "alternative RGPD à X", "meilleur outil FR pour Y", "X vs Y France")
4. Proposer **5 idées d'articles** avec pour chacune : titre SEO, mots-clés cibles, angle éditorial (2 lignes)
5. Attendre "go article X" de l'utilisateur
6. Écrire l'article complet en MDX (voir format ci-dessous)
7. Chercher une image Unsplash pertinente : récupérer l'ID CDN depuis la balise `og:image` de `unsplash.com/photos/{slug}` — l'ID complet a **toujours deux parties** `photo-XXXXXXXX-XXXXXXXXXXXX`. Télécharger l'image avec curl vers `public/blog/{slug}.jpg`.
8. Mettre à jour `src/content/posts/index.ts` : ajouter l'entrée en **premier** dans le tableau `posts[]` (le plus récent en tête)
9. Commit + push sur `main`
10. Donner l'URL en prod → attendre validation avant d'envoyer la NL (future étape)

### Format MDX

Fichier : `src/content/posts/{slug}.mdx`

- Intro directe, pas de titre H1 (il est dans la page)
- Sections H2 et H3
- Tableau GFM si comparatif (colonnes : Critère / outil1 / outil2 / outil3)
- Liens internes : `[nom-outil](/tool/{slug})` et `[MyFrenchTool](/)` quand pertinent
- Pas de lien affilié dans le corps — c'est la CTA card qui le porte
- Ton : direct, pas de jargon, prise de position claire
- Longueur : 600-900 mots

### Entrée posts/index.ts

```typescript
{
  slug: "mon-article",
  title: "Titre SEO complet",
  description: "Description meta 150 chars max, reprend le mot-clé principal.",
  date: "YYYY-MM-DD",
  image: "/blog/mon-article.jpg",
  imageAlt: "Description alt de l'image",
  tags: ["tag1", "tag2", "tag3"],
  readingTime: 5, // estimation honnête en minutes
  relatedToolSlugs: ["slug-outil-1", "slug-outil-2"], // outils mentionnés dans l'article, présents dans tools.ts
  affiliateCta: { // seulement si on a un lien affilié pour l'outil principal
    toolSlug: "slug-outil",
    name: "Nom Outil",
    logo: "/logos/logo.svg",
    tagline: "Tagline courte de la CTA card.",
    affiliateUrl: "https://...",
    cta: "Essayer X gratuitement",
  },
}
```

## Règles projet

### TODO.md
Mettre à jour `TODO.md` à la fin de chaque session de travail :
- Cocher les tâches terminées (remplacer `[ ]` par `[x]` et déplacer dans la section ✅ Fait)
- Ajouter les nouvelles tâches identifiées
- Ce fichier est la source de vérité pour les prochaines étapes, accessible depuis n'importe quelle machine via GitHub

### Logos
Quand un nouvel outil est ajouté à `src/data/tools.ts`, toujours fetcher son logo officiel dans `public/logos/` :
1. Essayer `https://cdn.simpleicons.org/{slug}` en premier
2. Sinon `https://api.iconify.design/logos:{slug}.svg`
3. En dernier recours : créer un SVG placeholder avec lettre + couleur de marque officielle

Le fichier logo doit être nommé exactement comme le champ `logo` dans `tools.ts` (ex: `/logos/notion.svg` → `public/logos/notion.svg`).
