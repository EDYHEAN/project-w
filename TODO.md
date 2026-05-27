# MyFrenchTool — Next Steps

> Mis à jour à chaque session de travail.

## 🔥 Priorité haute

- [ ] **Affiliés restants**
  - ~~Brevo~~ ✅ accepté — vrai lien en prod
  - ~~Lemlist~~ ⏳ en attente PartnerStack
  - ~~Yousign~~ ⏳ candidature Affilae envoyée (100€/abonnement annuel)
  - ~~Qonto~~ ⏳ candidature Affilae envoyée
  - ~~Shine~~ ⏳ candidature Affilae envoyée
  - ~~Crisp~~ 📨 message de contact envoyé
  - ~~Scaleway~~ 📨 message contact sales envoyé
  - OVHcloud : programme affilié à trouver sur ovhcloud.com
  - Livestorm : programme affilié à trouver sur livestorm.co
  - Indy : parrainage depuis compte client
  - Pennylane : parrainage depuis compte client
  - Mistral AI : pas de programme connu

- [ ] **⚠️ Bannière cookies + politique RGPD** — Vercel Analytics + cookies affiliés tiers (PartnerStack, Affilae) nécessitent consentement
  - Bannière cookie simple (accept/refuse)
  - Page politique de cookies
  - Mettre à jour les mentions légales

- [ ] **Newsletter Brevo — setup complet**
  - Connecter le form (`handleSubmit` dans `Newsletter.tsx`) à l'API Brevo
  - Créer template mail hebdo (1 outil à la une, 1-2 news, 1 bon plan)
  - Définir routine éditoriale : fréquence, format, process de rédaction
  - Prévoir segment mailing affilié (offres partenaires aux abonnés)

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

- [ ] **Page "Soumettre un outil"** (`/submit`) — à remettre quand prêt
- [ ] **Page Contact** (`/contact`) — form de contact (lien grisé en attendant)
- [ ] **Page About** — sélection, positionnement 100% français, modèle affilié
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
- [x] **Google Search Console** — propriété vérifiée, sitemap soumis (24 pages), indexation HP demandée
- [x] **PartnerStack** — profil réseau créé, candidatures Brevo + Lemlist envoyées
- [x] **Affilae** — compte créé + RIB configuré, candidatures Yousign + Qonto + Shine
- [x] **Brevo affilié** — accepté, vrai lien en prod (`https://get.brevo.com/l2qmecqaww8b`)
- [x] **Vercel Analytics** — installé et actif
- [x] **Newsletter redesign** — section dark full-width, layout 2 colonnes, copy outils/updates
- [x] **Hero decoration** — outils français réels (Mistral, Brevo, Qonto, Penpot) au lieu de Notion/Figma
- [x] **Accent French blue** — violet → #0052CC partout, tricolor footer, mentions légales clean
- [x] **Mentions légales** — MyFrenchTool, SIRET, email pro, Brevo comme prestataire newsletter
- [x] **Footer** — clean, liens morts grisés (Contact, Blog), "Fait maison, en France."
