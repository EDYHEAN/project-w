export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  image: string;
  imageAlt: string;
  tags: string[];
  readingTime: number;
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
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
