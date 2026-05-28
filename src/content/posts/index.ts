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
};

export const posts: Post[] = [
  {
    slug: "lemlist-vs-instantly-vs-apollo",
    title: "lemlist vs Instantly vs Apollo : ce que les comparatifs ne te disent pas",
    description: "Prix, canaux, templates — tout le monde compare les mêmes critères. Voilà ce qu'ils oublient toujours : l'hébergement de tes données et le RGPD.",
    date: "2026-05-28",
    image: "/blog/lemlist-vs-instantly-vs-apollo.jpg",
    imageAlt: "Personne travaillant sur un MacBook Pro dans un espace de coworking",
    tags: ["cold-email", "rgpd", "comparatif"],
    readingTime: 6,
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
