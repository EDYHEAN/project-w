export type AffiliateCta = {
  toolSlug: string;
  name: string;
  logo: string;
  tagline: string;
  affiliateUrl: string;
  cta: string;
};

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  image: string;
  imageAlt: string;
  tags: string[];
  readingTime: number;
  affiliateCta?: AffiliateCta;
  relatedToolSlugs?: string[];
};

export const posts: Post[] = [
  {
    slug: "crisp-vs-zendesk-vs-freshdesk",
    title: "Crisp vs Zendesk vs Freshdesk : lequel pour une équipe française ?",
    description: "Plan gratuit, RGPD, prix — pourquoi la plupart des équipes françaises choisissent le mauvais outil de support client, et comment choisir selon son profil.",
    date: "2026-05-29",
    image: "/blog/crisp-vs-zendesk-vs-freshdesk.jpg",
    imageAlt: "MacBook Pro et smartphone sur un bureau, espace de travail moderne",
    tags: ["support-client", "rgpd", "comparatif"],
    readingTime: 5,
    relatedToolSlugs: ["crisp", "brevo", "lemlist"],
    affiliateCta: {
      toolSlug: "crisp",
      name: "Crisp",
      logo: "/logos/crisp.svg",
      tagline: "Support client tout-en-un fondé en France. Chat, email, bot, base de connaissances — plan gratuit pour 2 agents, données hébergées en Europe.",
      affiliateUrl: "https://crisp.chat/?track=RHG6ktzYNt",
      cta: "Essayer Crisp gratuitement",
    },
  },
  {
    slug: "indy-vs-pennylane",
    title: "Indy vs Pennylane : lequel choisir selon votre statut ?",
    description: "Micro-entrepreneur, BNC, société — la réponse dépend de ton statut et de ton rapport à la comptabilité, pas des features. On compare les deux.",
    date: "2026-05-29",
    image: "/blog/indy-vs-pennylane.jpg",
    imageAlt: "Smartphone et documents fiscaux sur un bureau",
    tags: ["comptabilité", "finance", "comparatif"],
    readingTime: 5,
    relatedToolSlugs: ["indy", "pennylane", "shine"],
    affiliateCta: {
      toolSlug: "indy",
      name: "Indy",
      logo: "/logos/indy.png",
      tagline: "Comptabilité automatique pour indépendants français. Plan gratuit pour les micro-entrepreneurs, déclarations fiscales incluses.",
      affiliateUrl: "https://www.indy.fr/?ae=1612",
      cta: "Essayer Indy gratuitement",
    },
  },
  {
    slug: "brevo-vs-mailchimp",
    title: "Brevo vs Mailchimp : pourquoi les équipes françaises font le mauvais choix",
    description: "Prix, templates, automation — tout le monde compare les mêmes critères. Ce que personne ne dit : Mailchimp transfère tes données aux États-Unis. Brevo non.",
    date: "2026-05-28",
    image: "/blog/brevo-vs-mailchimp.jpg",
    imageAlt: "Laptop sur table en verre dans un espace de travail moderne",
    tags: ["email-marketing", "rgpd", "comparatif"],
    readingTime: 5,
    relatedToolSlugs: ["brevo", "lemlist", "crisp"],
    affiliateCta: {
      toolSlug: "brevo",
      name: "Brevo",
      logo: "/logos/brevo.svg",
      tagline: "Email, SMS, WhatsApp, CRM — tout en un. Hébergé en Europe, conforme RGPD. Plan gratuit sans limite sur le nombre de contacts.",
      affiliateUrl: "https://get.brevo.com/l2qmecqaww8b",
      cta: "Essayer Brevo gratuitement",
    },
  },
  {
    slug: "lemlist-vs-instantly-vs-apollo",
    title: "Ce que lemlist apporte en plus face à Instantly et Apollo",
    description: "Personnalisation avancée, multicanal natif, hébergement européen — voilà ce que lemlist fait concrètement différemment, et pourquoi ça compte pour le B2B français.",
    date: "2026-05-28",
    image: "/blog/lemlist-vs-instantly-vs-apollo.jpg",
    imageAlt: "Personne travaillant sur un MacBook Pro dans un espace de coworking",
    tags: ["cold-email", "rgpd", "comparatif"],
    readingTime: 6,
    relatedToolSlugs: ["lemlist", "brevo", "crisp"],
    affiliateCta: {
      toolSlug: "lemlist",
      name: "lemlist",
      logo: "/logos/lemlist-icon.webp",
      tagline: "Personnalisation avancée, multicanal, hébergement Europe. L'outil cold email pensé pour les équipes qui vendent en B2B européen.",
      affiliateUrl: "https://get.lemlist.com/49y3f5w9pa24",
      cta: "Essayer lemlist gratuitement",
    },
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
