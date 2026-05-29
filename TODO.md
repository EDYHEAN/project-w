# MyFrenchTool — Next Steps

> Mis à jour à chaque session de travail.

## 🔥 Priorité haute

- [ ] **Dashboard affiliés** — page privée `/dashboard` avec :
  - Statut par affilié (actif ✅ / en attente ⏳ / refusé 🚫)
  - Tracking de clics par outil (stockage côté serveur ou Vercel KV)
  - Vue d'ensemble candidatures + liens prod actifs

- [ ] **Affiliés restants**
  - ~~Brevo~~ ✅ accepté — lien prod : `https://get.brevo.com/l2qmecqaww8b`
  - ~~Lemlist~~ ✅ accepté — lien prod : `https://get.lemlist.com/49y3f5w9pa24`, 25% / 12 mois
  - ~~Crisp~~ ✅ accepté — lien prod : `https://crisp.chat/?track=RHG6ktzYNt`, payout PayPal
  - ~~Indy~~ ✅ accepté — lien prod : `https://www.indy.fr/?ae=1612` (+10€/inscription, +70€/création société, +250€/Société)
  - ~~Yousign~~ 🟡 en discussion Affilae — ont demandé comment on met en avant, répondu
  - ~~Qonto~~ ⏳ candidature Affilae envoyée
  - ~~Shine~~ ⏳ candidature Affilae envoyée
  - ~~Pennylane~~ ⏳ candidature Affilae envoyée
  - ~~Livestorm~~ ⏳ candidature PartnerStack envoyée
  - ~~Plezi~~ 📨 message form de contact envoyé + mail Adeline (bienvenue workflow) — relancé affiliation
  - ~~Scaleway~~ 📨 message contact sales envoyé
  - ~~Talkspirit~~ 📨 message form de contact envoyé
  - ~~OVHcloud~~ 🚫 abandonné (trop complexe, demande n° TVA)
  - Mistral AI : pas de programme connu
  - Penpot : open-source, pas de programme affilié
  - Slite : programme via Sovrn/VigLink (50% commission) — à postuler

- [ ] **Email deliverability — à retester**
  - DNS complet : DKIM ✅ DMARC ✅ SPF ✅ brevo-code ✅
  - Cause probable = domaine récent → se règle avec le temps

- [ ] **Newsletter Brevo — suite**
  - Créer template mail hebdo (1 outil à la une, 1-2 news, 1 bon plan)
  - Définir routine éditoriale : fréquence, format, process de rédaction

## 📈 Priorité moyenne

- [ ] **Plus d'outils** — objectif 40+ outils 100% français
  - Ajouter dans `src/data/tools.ts` + logo (picto SVG > PNG) dans `public/logos/` + screenshot OG

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
- [x] **Domaine myfrenchtool.com** acheté + connecté sur Vercel (live sur www.myfrenchtool.com)
- [x] **Compteur d'outils réactif** — `tools.length` partout dans le hero
- [x] **FeaturedTools carousel** + **SearchModal** ⌘K + **Cal Sans** wordmark
- [x] **Vrais logos** pour les 16 outils — 0 placeholder, picto préféré au wordmark
- [x] **SEO technique** — sitemap.xml dynamique, robots.txt, metadata + metaDescription par outil
- [x] **Google Search Console** — propriété vérifiée, sitemap soumis, indexation HP demandée
- [x] **JSON-LD schema** — SoftwareApplication + BreadcrumbList sur pages outil, Article sur pages blog
- [x] **Newsletter** — connecté à Brevo, welcome email, unsubscribe, DNS complet
- [x] **Email pro** — `johan@myfrenchtool.com` via Brevo SMTP + forwarding Namecheap
- [x] **Blog** — MDX, listing + article pages, barre de progression, outils liés, CTA affilié
- [x] **Article 1** — lemlist vs Instantly vs Apollo (réécrit angle lemlist-first)
- [x] **Article 2** — Brevo vs Mailchimp
- [x] **Article 3** — Indy vs Pennylane (comparatif par statut, chiffres 300k + notes stores)
- [x] **Article 4** — Crisp vs Zendesk vs Freshdesk
- [x] **Scroll-spy ToC** sur articles blog — H2 uniquement, sticky desktop, barre bleue active
- [x] **Triple audience** — principe Google + lecteurs + LLMs documenté dans CLAUDE.md
- [x] **Liens internes articles** — première mention par section H2 uniquement
- [x] **Bannière cookies RGPD** — ConsentManager, Vercel Analytics conditionnel, `/politique-cookies`
- [x] **Mobile responsive** — burger menu, SmartSearch masqué mobile, H1 no-orphan, scroll lock
- [x] **Brevo affilié** ✅ + **Lemlist affilié** ✅ + **Crisp affilié** ✅ + **Indy affilié** ✅
- [x] **scroll-behavior smooth supprimé** — navigation instantanée sans animation visible
- [x] **HomeScrollReset** — HP toujours en top scroll via useLayoutEffect
