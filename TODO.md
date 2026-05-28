# MyFrenchTool — Next Steps

> Mis à jour à chaque session de travail.

## 🔥 Priorité haute

- [ ] **Affiliés restants**
  - ~~Brevo~~ ✅ accepté — vrai lien en prod
  - ~~Lemlist~~ ✅ accepté — lien prod live (`https://get.lemlist.com/49y3f5w9pa24`), 25% / 12 mois
  - ~~Yousign~~ 🟡 en discussion Affilae — ont demandé comment on met en avant, répondu
  - ~~Qonto~~ ⏳ candidature Affilae envoyée
  - ~~Shine~~ ⏳ candidature Affilae envoyée
  - ~~Indy~~ ⏳ candidature Affilae envoyée (jusqu'à 345€/lead)
  - ~~Pennylane~~ ⏳ candidature Affilae envoyée
  - ~~Livestorm~~ ⏳ candidature PartnerStack envoyée
  - ~~Plezi~~ 📨 message form de contact envoyé (40% récurrents an 1)
  - ~~Crisp~~ 🟡 onboarding en cours — fiche + logo officiel mis à jour, infos perso envoyées à Chrysan, en attente confirmation
  - ~~Scaleway~~ 📨 message contact sales envoyé
  - ~~Talkspirit~~ 📨 message form de contact envoyé
  - ~~OVHcloud~~ 🚫 abandonné (trop complexe, demande n° TVA)
  - Mistral AI : pas de programme connu
  - Penpot : open-source, pas de programme affilié
  - Slite : programme via Sovrn/VigLink (50% commission) — à postuler

- [ ] **⚠️ Bannière cookies + politique RGPD** — Vercel Analytics + cookies affiliés tiers (PartnerStack, Affilae) nécessitent consentement
  - Bannière cookie simple (accept/refuse)
  - Page politique de cookies
  - Mettre à jour les mentions légales

- [ ] **Email deliverability — à retester**
  - SPF ajouté sur Namecheap ✅ (`v=spf1 include:sendinblue.com ~all`)
  - Template simplifié ✅ : plus de hero card, plus de bouton stylé, lien texte simple
  - DNS complet : DKIM ✅ DMARC ✅ SPF ✅ brevo-code ✅
  - vinyl-run a le même DNS et tombe en inbox → diff = âge domaine + contenu
  - Si toujours spam après test : cause = réputation domaine récent → se règle avec le temps (envois réguliers)

- [ ] **Newsletter Brevo — suite**
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
  - ⏳ Brief en cours avec Lamia (Lemlist) — angle choisi : "lemlist vs Instantly vs Apollo : ce que les comparatifs ne te disent pas" → à transformer en article + newsletter dès réception

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
- [x] **PartnerStack** — profil réseau ACCEPTÉ, candidatures Lemlist + Livestorm envoyées
- [x] **Affilae** — compte créé + RIB configuré, candidatures Yousign + Qonto + Shine + Indy + Pennylane
- [x] **Brevo affilié** — accepté, vrai lien en prod (`https://get.brevo.com/l2qmecqaww8b`)
- [x] **Vercel Analytics** — installé et actif
- [x] **Newsletter redesign** — section dark full-width, layout 2 colonnes, dot grid animé avec cercles effaceurs
- [x] **Hero decoration** — outils français réels (Mistral, Brevo, Qonto, Penpot) au lieu de Notion/Figma
- [x] **Accent French blue** — violet → #0052CC partout, tricolor footer, mentions légales clean
- [x] **Mentions légales** — MyFrenchTool, SIRET, email pro, Brevo comme prestataire newsletter
- [x] **Footer** — clean, liens morts grisés (Contact, Blog), "Fait maison, en France."
- [x] **Newsletter form** — connecté à Brevo (`/api/subscribe`), contact ajouté à la liste, welcome email envoyé
- [x] **Welcome email** — design coq + carte outils français, logo PNG email-logo.png, textContent, sujet sans emoji
- [x] **Unsubscribe endpoint** — `/api/unsubscribe?email=...` retire le contact de la liste Brevo
- [x] **JSON-LD schema** — `SoftwareApplication` + `BreadcrumbList` sur toutes les pages outil (rich results Google)
- [x] **Email pro** — `johan@myfrenchtool.com` configuré dans Gmail via Brevo SMTP, forwarding Namecheap, signature HTML
- [x] **Lemlist affilié** — accepté PartnerStack, 25% / 12 mois, lien prod live
- [x] **Crisp logo** — mis à jour avec assets officiels (SVG coloré fourni par Chrysan)
