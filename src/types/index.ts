export type Category = {
  slug: string;
  name: string;
  description: string;
  icon: string;
  color: string;
};

export type Tool = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  tags: string[];
  website: string;
  affiliateUrl: string;
  logo: string;
  screenshots?: string[];
  features?: { title: string; description: string }[];
  rating: number;
  pricing: "free" | "freemium" | "paid";
  featured: boolean;
};
