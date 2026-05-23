# MyFrenchTool — Next Steps

> Mis à jour à chaque session de travail.

## 🔥 Priorité haute

- [ ] **Connecter le domaine `myfrenchtool.com` sur Vercel**
  - Vercel → Settings → Domains → ajouter myfrenchtool.com
  - Mettre à jour les DNS sur Namecheap selon les instructions Vercel

- [ ] **Vraies URLs affiliées** — s'inscrire aux programmes français
  - Brevo : programme affilié → brevo.com/fr/programme-partenaires
  - Qonto : programme partenaire → qonto.com
  - Pennylane : programme affilié → pennylane.com
  - Lemlist : programme affilié → lemlist.com/affiliate
  - Mistral AI : API reseller / affilié → console.mistral.ai
  - Scaleway : programme partenaire → scaleway.com/fr/partenaires
  - Crisp : programme affilié → crisp.chat/affiliates
  - Yousign : programme partenaire → yousign.com

- [ ] **Connecter la newsletter à Brevo** (français, remplace beehiiv)
  - Créer compte Brevo gratuit (300 emails/jour)
  - Récupérer l'embed form ou l'API
  - Remplacer le `handleSubmit` dans `src/components/home/Newsletter.tsx`

## 📈 Priorité moyenne

- [ ] **SEO** — indispensable pour le trafic organique
  - `sitemap.xml` dynamique (`src/app/sitemap.ts`)
  - Metadata dynamiques par page outil et catégorie (title, description, og:image)
  - `robots.txt`
  - Mots-clés cibles : "alternative française à X", "logiciel français pour Y"

- [ ] **Plus d'outils** — objectif 40+ outils 100% français
  - Ajouter dans `src/data/tools.ts` + logo dans `public/logos/` + screenshot OG

- [ ] **Domaine myfrenchtool.fr** — acheter quand SIRET micro-entreprise dispo
  - Johan a une micro-entreprise design existante, récupérer le SIRET
  - Acheter sur Namecheap avec le SIRET

- [ ] **Filtres** par pricing (Gratuit / Freemium / Payant) sur les pages catégorie

## 💡 Priorité basse

- [ ] Page **"Soumettre un outil"** — laisser la communauté proposer des outils
- [ ] **Page About** — expliquer la sélection, le positionnement 100% français, le modèle affilié
- [ ] **Blog** — articles SEO "meilleur outil français pour X"
- [ ] **Screenshots manquants** — Brevo, Talkspirit, OVHcloud, Plezi (sites bloquaient le scraping)

## ✅ Fait

- [x] Init Next.js + TypeScript + Tailwind + Framer Motion
- [x] Structure de données TypeScript (outils + catégories)
- [x] Homepage : hero animé + catégories + featured tools + newsletter
- [x] Pages catégorie générées statiquement (SSG)
- [x] Pages détail outil avec CTA affilié + outils similaires
- [x] Navbar glassmorphism + Footer
- [x] Design Apple/Linear cohérent, micro-animations Framer Motion
- [x] Logos SVG + screenshots OG pour les 16 outils français
- [x] **Pivot MyFrenchTool** — 16 outils 100% français, logo coq, branding complet
- [x] **Domaine myfrenchtool.com** acheté sur Namecheap
- [x] **Compteur d'outils réactif** — `tools.length` partout dans le hero
- [x] **Hero copy** — "À un outil de la réussite." + copy myfrenchtool + RGPD
- [x] **Navbar** h-72px, coq +15%, menu text-[13-15px]
- [x] **FeaturedTools carousel** — arrows hover, screenshots OG réels
- [x] **Lazy load AllTools** + bouton "Voir plus"
- [x] **SearchModal** ⌘K + dropdown catégories navbar
- [x] **Cal Sans** wordmark bold, thème 100% light
