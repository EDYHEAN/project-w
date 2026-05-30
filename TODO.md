# MyFrenchTool — Next Steps

> Mis à jour à chaque session de travail.

## 🔥 Priorité haute

- [ ] **Plus d'outils** — objectif 40+ outils 100% français (actuellement 26)
  - Ajouter dans `src/data/tools.ts` + logo icône SVG dans `public/logos/`
  - Focus : outils IA français (très recherchés en ce moment)

- [ ] **Affiliés restants**
  - ~~Brevo~~ ✅ PartnerStack
  - ~~Lemlist~~ ✅ PartnerStack — 25% / 12 mois
  - ~~Crisp~~ ✅ Native — payout PayPal
  - ~~Indy~~ ✅ Affilae — 4 liens par intent
  - Yousign 🟡 en discussion Affilae
  - Qonto ⏳ candidature Affilae
  - Shine ⏳ candidature Affilae
  - Pennylane ⏳ candidature Affilae
  - Livestorm ⏳ candidature PartnerStack
  - Plezi 📨 relancé via Adeline — 40% récurrents an 1
  - Scaleway 📨 message contact sales
  - Talkspirit 📨 message form de contact
  - Slite : Sovrn/VigLink (50% commission) — **à postuler**
  - 10 nouveaux outils : vérifier s'ils ont des programmes affiliés (Dust, Photoroom, Aircall, Kameleoon, Axeptio, PayFit, Alan, Clever Cloud, Dougs, Finary)

- [ ] **Dashboard — graphe timeline clics**
  - Frise chrono clics globaux + par outil
  - Filtres : 24h / 7j / 30j / Mois / Année / All time
  - Nécessite de stocker les timestamps dans Vercel KV (Redis sorted sets)

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
