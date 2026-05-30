export type AffiliateStatus = "active" | "pending" | "applied" | "refused" | "none";

export type AffiliateLink = {
  url: string;
  intent: string;
};

export type AffiliateEntry = {
  status: AffiliateStatus;
  platform?: string;
  note?: string;
  links?: AffiliateLink[];
};

export const affiliates: Record<string, AffiliateEntry> = {
  brevo: {
    status: "active",
    platform: "PartnerStack",
    links: [{ url: "https://get.brevo.com/l2qmecqaww8b", intent: "Général" }],
  },
  lemlist: {
    status: "active",
    platform: "PartnerStack",
    note: "25% / 12 mois",
    links: [{ url: "https://get.lemlist.com/49y3f5w9pa24", intent: "Général" }],
  },
  crisp: {
    status: "active",
    platform: "Native",
    note: "Payout PayPal",
    links: [{ url: "https://crisp.chat/?track=RHG6ktzYNt", intent: "Général" }],
  },
  indy: {
    status: "active",
    platform: "Affilae",
    note: "+10€/insc · +70€/société · +250€/abo Société",
    links: [
      { url: "https://www.indy.fr/?ae=1612", intent: "Compta générale" },
      { url: "https://urlr.me/8RXf2K", intent: "Création entreprise" },
      { url: "https://urls.fr/46co64", intent: "Fact. électronique" },
      { url: "https://urls.fr/88mrqb", intent: "Compte pro" },
    ],
  },
  yousign: {
    status: "pending",
    platform: "Affilae",
    note: "En discussion — méthodes de mise en avant demandées",
  },
  qonto: {
    status: "applied",
    platform: "Affilae",
  },
  shine: {
    status: "applied",
    platform: "Affilae",
  },
  pennylane: {
    status: "applied",
    platform: "Affilae",
  },
  livestorm: {
    status: "applied",
    platform: "PartnerStack",
  },
  plezi: {
    status: "applied",
    platform: "Direct",
    note: "40% récurrents an 1 — relancé via Adeline",
  },
  scaleway: {
    status: "applied",
    platform: "Direct",
    note: "Message contact sales envoyé",
  },
  talkspirit: {
    status: "applied",
    platform: "Direct",
    note: "Form de contact envoyé",
  },
  slite: {
    status: "none",
    platform: "Sovrn/VigLink",
    note: "50% commission — à postuler",
  },
  ovhcloud: {
    status: "refused",
    note: "Trop complexe — demande n° TVA",
  },
  mistral: {
    status: "applied",
    platform: "Direct",
    note: "Form partner envoyé",
  },
  penpot: {
    status: "none",
    note: "Open-source, pas de programme affilié",
  },
  dust: {
    status: "applied",
    platform: "Direct",
    note: "Form partner envoyé — waitlist programme partenaire",
  },
  photoroom: {
    status: "applied",
    platform: "Awin",
    note: "Candidature envoyée — zone US only, mail envoyé à Sacha Sultan pour confirmer couverture FR",
  },
  aircall: {
    status: "none",
    note: "À vérifier — programme affilié non confirmé",
  },
  kameleoon: {
    status: "none",
    note: "À vérifier — programme affilié non confirmé",
  },
  axeptio: {
    status: "none",
    note: "À vérifier — programme affilié non confirmé",
  },
  payfit: {
    status: "none",
    note: "À vérifier — programme affilié non confirmé",
  },
  alan: {
    status: "none",
    note: "À vérifier — programme affilié non confirmé",
  },
  "clever-cloud": {
    status: "none",
    note: "À vérifier — programme affilié non confirmé",
  },
  dougs: {
    status: "none",
    note: "À vérifier — programme affilié non confirmé",
  },
  finary: {
    status: "none",
    note: "À vérifier — programme affilié non confirmé",
  },
};
