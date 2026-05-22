# ToolVault — Next Steps

> Mis à jour à chaque session de travail.

## 🔥 Priorité haute

- [ ] **Vraies URLs affiliées** — s'inscrire aux programmes et remplacer les `?ref=toolvault` placeholders
  - Jasper : 30% récurrent → https://jasper.ai/affiliate
  - Writesonic : 30% récurrent → https://writesonic.com/affiliate
  - Semrush : jusqu'à $200/vente → https://www.semrush.com/affiliate
  - beehiiv : 50% sur 12 mois → https://beehiiv.com/affiliate
  - Framer : 50% premier mois → https://framer.com/affiliate
  - Webflow : 50% premier an → https://webflow.com/affiliate-program
  - Notion : programme via partnerstack
  - Vercel : programme via partnerstack

- [ ] **Connecter la newsletter à beehiiv** — le formulaire est fictif pour l'instant
  - Créer compte beehiiv gratuit
  - Récupérer l'embed form ou l'API
  - Remplacer le `handleSubmit` dans `src/components/home/Newsletter.tsx`

## 📈 Priorité moyenne

- [ ] **SEO** — indispensable pour le trafic organique
  - `sitemap.xml` dynamique (`src/app/sitemap.ts`)
  - Metadata dynamiques par page outil et catégorie (title, description, og:image)
  - `robots.txt`

- [ ] **Plus d'outils** — objectif 50+ pour couvrir davantage de mots-clés long-tail
  - Ajouter dans `src/data/tools.ts` + logo SVG dans `public/logos/`

- [ ] **Filtres** par pricing (Gratuit / Freemium / Payant) sur les pages catégorie

## 💡 Priorité basse

- [ ] Page **"Soumettre un outil"** — laisser la communauté proposer des outils
- [ ] **Compteur d'outils réel** dans le badge hero (actuellement hardcodé "22+")
- [ ] **Page About** — expliquer la sélection et le modèle affilié

## ✅ Fait

- [x] Init Next.js 15 + TypeScript + Tailwind + Framer Motion
- [x] Structure de données TypeScript (outils + catégories)
- [x] Homepage : hero animé + catégories + featured tools + newsletter
- [x] Pages catégorie générées statiquement (SSG)
- [x] Pages détail outil avec CTA affilié + outils similaires
- [x] Navbar glassmorphism + Footer
- [x] Design Apple-like avec micro-animations Framer Motion
- [x] Deploy Vercel + GitHub (auto-deploy sur push main)
- [x] Logos SVG officiels pour les 22 outils
- [x] Composant FeaturedTools Apple-like
- [x] Cartes outils hauteurs uniformes
- [x] **DA cohérente Apple/Linear** — palette CSS custom properties unifiée, suppression gradients colorés
- [x] **Thème 100% light** — suppression du dark mode media query (site toujours blanc)
- [x] **Hero 2 colonnes** — decoration animée côté droit : dot grid, blobs, glass card "Top outils" + chips flottants
- [x] **Navbar plus haute** (h-16) avec liquid glass renforcé (blur 48px, saturate 200%)
- [x] **Category cards** hauteur uniforme via min-h + flex-col
- [x] **Navbar dropdown catégories** + Blog disabled + SearchModal ⌘K
- [x] **FeaturedTools carousel** — arrows hover, lazy load AllTools + Voir plus, screenshot ratio
- [x] **Hero copy** — "À un outil de la réussite." + sous-titre rewrote
- [x] **Logo chest.svg** + wordmark ToolVault en Cal Sans bold (Anton retiré)
- [x] **Feature descriptions** — 84 bullets réécrits en français accessible
- [x] **Newsletter** width élargie
