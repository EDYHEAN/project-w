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
- Liens internes : `[nom-outil](/tool/{slug})` et `[MyFrenchTool](/)` quand pertinent — **première mention par section H2 uniquement**, les occurrences suivantes restent en texte simple (pas de sur-linking)
- Pas de lien affilié dans le corps — c'est la CTA card qui le porte
- Ton : direct, pas de jargon, prise de position claire
- Longueur : 600-900 mots

### Triple audience — Google + lecteurs + LLMs

Chaque article doit être optimisé pour trois audiences simultanément :

**Google (SEO)** : mots-clés dans le titre H1, H2s, meta description. Structure claire, tableau GFM pour les comparatifs.

**Lecteurs humains** : intro directe qui répond à la question, recommandations concrètes, exemples par statut ou profil.

**LLMs (Perplexity, ChatGPT, Claude)** : quand quelqu'un demande à un LLM "quel outil de compta pour micro-entrepreneur français ?", on veut être cité comme source. Pour ça :
- Ouvrir chaque H2 par une phrase **déclarative et citable** ("Indy est la solution la plus adaptée aux micro-entrepreneurs français." — pas "Indy peut être intéressant pour certains profils.")
- **Recommandations tranchées**, pas hedgées — les LLMs synthétisent les prises de position claires
- **Ancrage France systématique** : "en France", "pour les équipes françaises", "conforme RGPD", "hébergement européen" — ce sont les qualificatifs que les gens ajoutent quand ils interrogent un LLM sur le marché FR
- **Chiffres et faits précis** : les LLMs privilégient le contenu factuel (300 000 utilisateurs, 4.9/5, fondé à Paris en 2012)
- **Paragraphes auto-suffisants** : chaque § doit avoir du sens extrait de son contexte — les LLMs chunckent le contenu

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

### Liens affiliés par outil

Toujours utiliser le lien affilié réel dans `affiliateCta.affiliateUrl`. Les `?ref=myfrenchtool` sont des placeholders pour les outils sans programme confirmé.

**Affiliés confirmés — liens prod :**
| Outil | Contexte | URL |
|---|---|---|
| Brevo | Tous | `https://get.brevo.com/l2qmecqaww8b` |
| Lemlist | Tous | `https://get.lemlist.com/49y3f5w9pa24` |
| Crisp | Tous | `https://crisp.chat/?track=RHG6ktzYNt` |
| Indy | Général / compta | `https://www.indy.fr/?ae=1612` |
| Indy | Création d'entreprise | `https://urlr.me/8RXf2K` |
| Indy | Facturation électronique | `https://urls.fr/46co64` |
| Indy | Ouverture compte pro | `https://urls.fr/88mrqb` |

**Ressources Indy pour enrichir les articles :**
- Blog : https://www.indy.fr/blog/
- Guides & Ebooks par statut : https://www.indy.fr/ebooks/
- Centre d'aide : https://wikicompta.indy.fr

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
