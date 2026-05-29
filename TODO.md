# MyFrenchTool — Next Steps

> Mis à jour à chaque session de travail.

## 🔥 Priorité haute

- [ ] **Plus d'outils** — objectif 40+ outils 100% français (actuellement 16)
  - Ajouter dans `src/data/tools.ts` + logo (picto SVG > PNG) dans `public/logos/` + screenshot OG
  - Chaque nouvel outil = potentiel contenu SEO + candidature affilié

- [ ] **Affiliés restants**
  - ~~Brevo~~ ✅ accepté
  - ~~Lemlist~~ ✅ accepté — 25% / 12 mois
  - ~~Crisp~~ ✅ accepté — payout PayPal
  - ~~Indy~~ ✅ accepté — 4 liens par intent (compta, création, fact. élec., compte pro)
  - ~~Yousign~~ 🟡 en discussion Affilae
  - ~~Qonto~~ ⏳ candidature Affilae envoyée
  - ~~Shine~~ ⏳ candidature Affilae envoyée
  - ~~Pennylane~~ ⏳ candidature Affilae envoyée
  - ~~Livestorm~~ ⏳ candidature PartnerStack envoyée
  - ~~Plezi~~ 📨 relancé via Adeline — 40% récurrents an 1
  - ~~Scaleway~~ 📨 message contact sales envoyé
  - ~~Talkspirit~~ 📨 message form de contact envoyé
  - Slite : programme via Sovrn/VigLink (50% commission) — **à postuler**
  - OVHcloud : 🚫 abandonné
  - Mistral AI / Penpot : pas de programme affilié

- [ ] **Email deliverability — à retester**
  - DNS complet : DKIM ✅ DMARC ✅ SPF ✅
  - Cause probable = domaine récent → se règle avec le temps

## 📈 Priorité moyenne

- [ ] **Newsletter Brevo — suite**
  - Créer template mail hebdo (1 outil à la une, 1-2 news, 1 bon plan)
  - Définir routine éditoriale : fréquence, format, process de rédaction

- [ ] **Pages outil enrichies** — transformer en vraies landing pages
  - Prix détaillés, pros/cons, screenshot hero, témoignages

- [ ] **Domaine myfrenchtool.fr** — acheter avec SIRET micro-entreprise
  - SIRET : 878 661 941 00020

- [ ] **Filtres** par pricing (Gratuit / Freemium / Payant) sur les pages catégorie

- [ ] **Screenshots manquants** — Brevo, Talkspirit, OVHcloud, Plezi

## 💡 Priorité basse

- [ ] **Page About** — sélection, positionnement 100% français, modèle affilié
- [ ] **Blog — suite**
  - Collab Lamia (Lemlist) : 1 article/mois centré lemlist
  - Routine articles autonome ✅ — Claude Code Routines, chaque mardi 8h00

## ✅ Fait

- [x] Init Next.js + TypeScript + Tailwind + Framer Motion
- [x] Structure de données TypeScript (outils + catégories)
- [x] Homepage : hero animé + catégories + featured tools + newsletter
- [x] Pages catégorie générées statiquement (SSG)
- [x] Pages détail outil avec CTA affilié + outils similaires
- [x] Navbar glassmorphism + Footer
- [x] Design Apple/Linear cohérent, micro-animations Framer Motion
- [x] **Pivot MyFrenchTool** — 16 outils 100% français, logo coq, branding complet
- [x] **Domaine myfrenchtool.com** acheté + connecté sur Vercel
- [x] **Compteur d'outils réactif** — `tools.length` partout dans le hero
- [x] **FeaturedTools carousel** + **SearchModal** ⌘K + **Cal Sans** wordmark
- [x] **Vrais logos** pour les 16 outils — 0 placeholder
- [x] **SEO technique** — sitemap.xml dynamique, robots.txt, metadata + metaDescription par outil
- [x] **Google Search Console** — propriété vérifiée, sitemap soumis
- [x] **JSON-LD schema** — SoftwareApplication + BreadcrumbList + Article blog
- [x] **Newsletter** — connecté à Brevo, welcome email, unsubscribe, DNS complet
- [x] **Email pro** — `johan@myfrenchtool.com` via Brevo SMTP + forwarding Namecheap
- [x] **Blog** — MDX, listing + article pages, barre de progression, outils liés, CTA affilié
- [x] **Article 1** — lemlist vs Instantly vs Apollo
- [x] **Article 2** — Brevo vs Mailchimp
- [x] **Article 3** — Indy vs Pennylane (comparatif par statut)
- [x] **Article 4** — Crisp vs Zendesk vs Freshdesk
- [x] **Scroll-spy ToC** — H2 uniquement, sticky desktop, barre bleue active
- [x] **Triple audience** — principe Google + lecteurs + LLMs dans CLAUDE.md
- [x] **Liens internes articles** — première mention par section H2 uniquement
- [x] **Bannière cookies RGPD** — ConsentManager, Vercel Analytics conditionnel
- [x] **Mobile responsive** — burger menu, SmartSearch masqué, scroll lock
- [x] **Brevo affilié** ✅ + **Lemlist affilié** ✅ + **Crisp affilié** ✅ + **Indy affilié** ✅
- [x] **scroll-behavior smooth supprimé** — navigation instantanée
- [x] **HomeScrollReset** — HP toujours en top scroll via useLayoutEffect
- [x] **Dashboard affiliés** ✅ — `/dashboard` privé, noindex, password gate (DASHBOARD_PASSWORD)
- [x] **SiteChrome** ✅ — Navbar/Footer absents sur /dashboard
- [x] **Tracking clics CTA** ✅ — onClick fire-and-forget → Vercel KV (Upstash Redis, Frankfurt)
- [x] **Upstash Redis** ✅ — Free plan connecté, env vars auto-injectées par Vercel
