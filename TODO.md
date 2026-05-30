# MyFrenchTool — Next Steps

> Mis à jour à chaque session de travail.

## 🔥 Priorité haute

- [ ] **Plus d'outils** — objectif 40+ outils 100% français (actuellement 26)
  - Ajouter dans `src/data/tools.ts` + logo icône SVG dans `public/logos/`
  - Focus : outils IA français (très recherchés en ce moment)

- [ ] **Affiliés restants**
  - ~~Brevo~~ ✅ PartnerStack — https://get.brevo.com/l2qmecqaww8b
  - ~~Lemlist~~ ✅ PartnerStack — 25% / 12 mois — https://get.lemlist.com/49y3f5w9pa24
  - ~~Crisp~~ ✅ Native — payout PayPal — https://crisp.chat/?track=RHG6ktzYNt
  - ~~Indy~~ ✅ Affilae — 4 liens : https://www.indy.fr/?ae=1612 / https://urlr.me/8RXf2K / https://urls.fr/46co64 / https://urls.fr/88mrqb
  - Yousign 🟡 en discussion Affilae
  - Qonto ⏳ candidature Affilae
  - Shine ⏳ candidature Affilae
  - Pennylane ⏳ candidature Affilae
  - PayFit ⏳ candidature Affilae
  - Livestorm ⏳ candidature PartnerStack
  - Aircall ⏳ candidature PartnerStack
  - Dust ⏳ form partner envoyé (programme pas encore lancé)
  - Mistral ⏳ form partner envoyé
  - Photoroom ⏳ Awin merchant 121800 — zone US, confirmation FR en attente (Sacha Sultan)
  - Plezi 📨 relancé via Adeline — 40% récurrents an 1
  - Scaleway 📨 message contact sales
  - Talkspirit 📨 message form de contact
  - Slite : Sovrn/VigLink (50% commission) — **à postuler**
  - Alan ❌ unavailable (parrainage membres)
  - Dougs ❌ unavailable (parrainage clients)
  - Clever Cloud ❌ unavailable (intégrateurs only)
  - Kameleoon ⏳ applied — form direct
  - Axeptio ⏳ applied — mail alexis.nabucet@axeptio.eu
  - Finary ⏳ applied — mail hello@finary.com

## 📈 Priorité moyenne

- [ ] **Email deliverability — à retester**
  - DNS complet : DKIM ✅ DMARC ✅ SPF ✅
  - Cause probable = domaine récent → se règle avec le temps

- [ ] **Newsletter Brevo — suite**
  - Créer template mail hebdo (1 outil à la une, 1-2 news, 1 bon plan)
  - Définir routine éditoriale : fréquence, format, process de rédaction

- [ ] **Pages outil enrichies** — transformer en vraies landing pages
  - Prix détaillés, pros/cons, screenshot hero, témoignages

- [ ] **Domaine myfrenchtool.fr** — acheter avec SIRET micro-entreprise
  - SIRET : 878 661 941 00020

- [ ] **Filtres** par pricing (Gratuit / Freemium / Payant) sur les pages catégorie

- [ ] **Screenshots manquants** — Brevo, Talkspirit, OVHcloud, Plezi + 10 nouveaux outils

## 💡 Priorité basse

- [ ] **Smart Search — LLM fallback avec budget cap**
  - Créer `/api/search` : appel LLM (Mistral cheap ou Haiku) pour interpréter la requête → retourne 3 slugs
  - Budget cap dans Vercel KV : clé `search_budget:YYYY-MM` en centimes, si > 500 → retourne `{ fallback: true }` sans appel LLM
  - Reset automatique chaque mois (clé inclut l'année-mois)
  - SmartSearch.tsx : interroge `/api/search` en premier, bascule silencieusement sur INTENT_MAP + Fuse si `fallback: true` ou erreur
  - Afficher le spend mensuel dans le dashboard
  - À faire quand le site a du trafic (coût actuel = ~0)

- [ ] **Page About** — sélection, positionnement 100% français, modèle affilié
- [ ] **Blog — suite**
  - Collab Lamia (Lemlist) : 1 article/mois centré lemlist
  - Routine articles autonome ✅ — Claude Code Routines, chaque mardi 8h00

## ✅ Fait

- [x] Init Next.js + TypeScript + Tailwind + Framer Motion
- [x] Homepage : hero animé + catégories + featured tools + newsletter
- [x] Pages catégorie + pages détail outil
- [x] Navbar glassmorphism + Footer
- [x] **Pivot MyFrenchTool** — logo coq, branding complet
- [x] **Domaine myfrenchtool.com** acheté + connecté sur Vercel
- [x] **SEO technique** — sitemap.xml, robots.txt, metadata, JSON-LD
- [x] **Google Search Console** — propriété vérifiée, sitemap soumis
- [x] **Newsletter** — Brevo, welcome email, DNS complet
- [x] **Email pro** — `johan@myfrenchtool.com` via Brevo SMTP
- [x] **Blog** — MDX, listing + articles, scroll-spy ToC, triple audience
- [x] **4 articles live** — lemlist, Brevo, Indy vs Pennylane, Crisp vs Zendesk
- [x] **Bannière cookies RGPD** — ConsentManager, Vercel Analytics conditionnel
- [x] **Mobile responsive** — burger menu, scroll lock
- [x] **Brevo** ✅ + **Lemlist** ✅ + **Crisp** ✅ + **Indy** ✅ affiliés actifs
- [x] **Dashboard affiliés** — `/dashboard` privé, password gate, noindex
- [x] **SiteChrome** — Navbar/Footer absents sur /dashboard
- [x] **Tracking clics CTA** — onClick fire-and-forget → Vercel KV (Upstash Redis, Frankfurt)
- [x] **Admin exclusion tracking** — sessionStorage guard sur le CTA
- [x] **+10 outils** — 26 outils au total (Dust, Photoroom, Aircall, Kameleoon, Axeptio, PayFit, Alan, Clever Cloud, Dougs, Finary)
- [x] **Logos icônes isolés** — Alan (panda), Axeptio (tick), Finary (F), Kameleoon, Dougs (cercle)
- [x] **Posture SEO/affiliation** — documentée en mémoire, appliquée par défaut
- [x] **Dashboard — frise timeline clics** — AreaChart Recharts, 5 périodes, sélecteur outil
- [x] **Smart Search amélioré** — INTENT_MAP étendu, word-boundary regex, Fuse threshold assoupli
- [x] **Dust, Mistral, Photoroom, PayFit, Aircall** — candidatures affiliés envoyées
- [x] **Awin** — compte publisher créé (Johan Trigeard)
