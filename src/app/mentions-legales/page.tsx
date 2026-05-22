import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales — ToolVault",
  description: "Mentions légales, politique d'affiliation et informations éditeur de ToolVault.",
};

export default function MentionsLegales() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-20">
      <Link
        href="/"
        className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors mb-10 inline-block"
      >
        ← Retour
      </Link>

      <h1 className="text-3xl font-bold tracking-tight mb-2">Mentions légales</h1>
      <p className="text-sm text-[var(--muted-foreground)] mb-12">Dernière mise à jour : mai 2026</p>

      <div className="space-y-10 text-sm leading-relaxed">

        <section>
          <h2 className="font-semibold text-base mb-3">Éditeur du site</h2>
          <div className="space-y-1 text-[var(--muted-foreground)]">
            <p>ToolVault est édité par Johan Trigeard, micro-entrepreneur.</p>
            <p>E-mail : <a href="mailto:johan.trigeard@gmail.com" className="text-[var(--foreground)] hover:underline">johan.trigeard@gmail.com</a></p>
            <p>Activité enregistrée en France.</p>
          </div>
        </section>

        <section>
          <h2 className="font-semibold text-base mb-3">Hébergement</h2>
          <div className="space-y-1 text-[var(--muted-foreground)]">
            <p>Ce site est hébergé par Vercel Inc.</p>
            <p>440 N Barranca Ave #4133, Covina, CA 91723, États-Unis.</p>
            <p><a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-[var(--foreground)] hover:underline">vercel.com</a></p>
          </div>
        </section>

        <section>
          <h2 className="font-semibold text-base mb-3">Liens affiliés</h2>
          <div className="space-y-3 text-[var(--muted-foreground)]">
            <p>
              Certains liens présents sur ToolVault sont des liens affiliés. Cela signifie que si vous cliquez sur un lien et souscrivez à un service, nous pouvons percevoir une commission — sans aucun surcoût pour vous.
            </p>
            <p>
              Ces commissions nous permettent de maintenir le site gratuitement et de continuer à sélectionner et tester des outils. Elles n'influencent pas nos recommandations : nous ne mettons en avant que les outils que nous jugeons réellement utiles.
            </p>
            <p>
              Conformément aux obligations légales et aux recommandations de l'ARPP, nous signalons cette relation commerciale de manière transparente.
            </p>
          </div>
        </section>

        <section>
          <h2 className="font-semibold text-base mb-3">Propriété intellectuelle</h2>
          <p className="text-[var(--muted-foreground)]">
            L'ensemble des contenus de ce site (textes, descriptions, structure) est la propriété de ToolVault, sauf mention contraire. Les logos et marques des outils référencés appartiennent à leurs propriétaires respectifs et sont utilisés à titre informatif uniquement.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-base mb-3">Données personnelles</h2>
          <p className="text-[var(--muted-foreground)]">
            ToolVault ne collecte aucune donnée personnelle directement. Si vous vous inscrivez à la newsletter, votre adresse e-mail est transmise à notre prestataire d'envoi (beehiiv) et traitée conformément à leur politique de confidentialité. Vous pouvez vous désinscrire à tout moment via le lien présent dans chaque email.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-base mb-3">Cookies</h2>
          <p className="text-[var(--muted-foreground)]">
            Ce site n'utilise pas de cookies de tracking ou publicitaires. Des cookies techniques peuvent être déposés par l'hébergeur Vercel pour le bon fonctionnement du site.
          </p>
        </section>

      </div>
    </div>
  );
}
