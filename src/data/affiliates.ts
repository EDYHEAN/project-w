export type AffiliateStatus = "active" | "pending" | "applied" | "refused" | "none";

export type AffiliateEntry = {
  status: AffiliateStatus;
  platform?: string;
  commission?: string;
  note?: string;
};

export const affiliates: Record<string, AffiliateEntry> = {
  brevo: {
    status: "active",
    platform: "Native",
  },
  lemlist: {
    status: "active",
    platform: "Native",
    commission: "25% / 12 mois",
  },
  crisp: {
    status: "active",
    platform: "Native",
    note: "Payout PayPal",
  },
  indy: {
    status: "active",
    platform: "Affilae",
    commission: "+10€/insc · +70€/société · +250€/abo Société",
  },
  yousign: {
    status: "pending",
    platform: "Affilae",
    note: "En discussion — demandé méthodes de mise en avant",
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
    commission: "40% récurrents an 1",
    note: "Relancé via Adeline (welcome workflow)",
  },
  scaleway: {
    status: "applied",
    platform: "Direct",
    note: "Message contact sales envoyé",
  },
  talkspirit: {
    status: "applied",
    platform: "Direct",
    note: "Message form de contact envoyé",
  },
  slite: {
    status: "none",
    platform: "Sovrn/VigLink",
    commission: "50%",
    note: "À postuler",
  },
  ovhcloud: {
    status: "refused",
    note: "Trop complexe — demande n° TVA",
  },
  mistral: {
    status: "none",
    note: "Pas de programme affilié connu",
  },
  penpot: {
    status: "none",
    note: "Open-source, pas de programme affilié",
  },
};
