# MyFrenchTool — Next Steps

> Mis à jour à chaque session de travail.

## 🔥 Priorité haute

- [ ] **Vraies URLs affiliées** — s'inscrire aux programmes français
  - ~~Brevo~~ ✅ candidature envoyée sur PartnerStack (en attente review)
  - ~~Lemlist~~ ✅ candidature envoyée sur PartnerStack (en attente review)
  - Crisp : programme affilié → crisp.chat/affiliates
  - Scaleway : programme partenaire → scaleway.com/fr/partenaires
  - Qonto : programme partenaire → qonto.com (parrainage depuis compte client)
  - Pennylane : programme affilié → pennylane.com (parrainage depuis compte client)
  - Yousign : programme partenaire → yousign.com
  - Mistral AI : API reseller / affilié → console.mistral.ai

- [ ] **Connecter la newsletter à Brevo** (français, remplace beehiiv)
  - Créer compte Brevo gratuit (300 emails/jour)
  - Récupérer l'embed form ou l'API
  - Remplacer le `handleSubmit` dans `src/components/home/Newsletter.tsx`

## 📈 Priorité moyenne

- [ ] **SEO** — indispensable pour le trafic organique
  - ~~`sitemap.xml` dynamique~~ ✅ live sur /sitemap.xml, soumis à Google Search Console
  - ~~Metadata dynamiques par page outil et catégorie~~ ✅ title, description, og:image
  - ~~`robots.txt`~~ ✅ live
  - Google Search Console ✅ propriété vérifiée, sitemap soumis, indexation HP demandée
  - Mots-clés cibles : "alternative française à X", "logiciel français pour Y"

- [ ] **Plus d'outils** — objectif 40+ outils 100% français
  - Ajouter dans `src/data/tools.ts` + logo (picto SVG > PNG) dans `public/logos/` + screenshot OG

- [ ] **Domaine myfrenchtool.fr** — acheter quand SIRET micro-entreprise dispo
  - Johan a une micro-entreprise design existante, récupérer le SIRET
  - Acheter sur Namecheap avec le SIRET

- [ ] **Filtres** par pricing (Gratuit / Freemium / Payant) sur les pages catégorie

- [ ] **Screenshots manquants** — Brevo, Talkspirit, OVHcloud, Plezi (sites bloquaient le scraping)

## 💡 Priorité basse

- [ ] Page **"Soumettre un outil"** — laisser la communauté proposer des outils
- [ ] **Page About** — expliquer la sélection, le positionnement 100% français, le modèle affilié
- [ ] **Blog** — articles SEO "meilleur outil français pour X"

## ✅ Fait

- [x] Init Next.js + TypeScript + Tailwind + Framer Motion
- [x] Structure de données TypeScript (outils + catégories)
- [x] Homepage : hero animé + catégories + featured tools + newsletter
- [x] Pages catégorie générées statiquement (SSG)
- [x] Pages détail outil avec CTA affilié + outils similaires
- [x] Navbar glassmorphism + Footer
- [x] Design Apple/Linear cohérent, micro-animations Framer Motion
- [x] **Pivot MyFrenchTool** — 16 outils 100% français, logo coq, branding complet
- [x] **Domaine myfrenchtool.com** acheté + connecté sur Vercel (live sur www.myfrenchtool.com)
- [x] **Compteur d'outils réactif** — `tools.length` partout dans le hero
- [x] **Navbar** h-72px, coq +15%, menu text-[13-15px]
- [x] **FeaturedTools carousel** — arrows hover, screenshots OG réels
- [x] **Lazy load AllTools** + bouton "Voir plus"
- [x] **SearchModal** ⌘K + dropdown catégories navbar
- [x] **Cal Sans** wordmark bold, thème 100% light
- [x] **Vrais logos** pour les 16 outils — 0 placeholder, picto préféré au wordmark
- [x] **Hero copy** — "Parce que l'excellence n'a pas besoin d'un accent américain..."
- [x] **Right-click context menu** sur logo outil → téléchargement auto du logo
- [x] **Suppression lien "Site officiel"** — tout le trafic sortant passe par affiliateUrl
- [x] **bypassPermissions** configuré dans `.claude/settings.json`
- [x] **SEO technique** — sitemap.xml dynamique, robots.txt, metadata par page outil + catégorie
- [x] **Google Search Console** — propriété vérifiée (TXT DNS), sitemap soumis (24 pages)
- [x] **PartnerStack réseau** — profil créé (Éditeur + Affilié), candidatures Brevo + Lemlist envoyées
