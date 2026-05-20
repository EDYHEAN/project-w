@AGENTS.md

## Règles projet

### Logos
Quand un nouvel outil est ajouté à `src/data/tools.ts`, toujours fetcher son logo officiel dans `public/logos/` :
1. Essayer `https://cdn.simpleicons.org/{slug}` en premier
2. Sinon `https://api.iconify.design/logos:{slug}.svg`
3. En dernier recours : créer un SVG placeholder avec lettre + couleur de marque officielle

Le fichier logo doit être nommé exactement comme le champ `logo` dans `tools.ts` (ex: `/logos/notion.svg` → `public/logos/notion.svg`).
