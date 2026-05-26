import Link from "next/link";
import { categories } from "@/data/categories";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] mt-24">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 font-semibold mb-4">
              <img src="/main-logo/rooster.svg" alt="" className="w-4 h-4" />
              <span style={{ fontFamily: '"Cal Sans", sans-serif', fontWeight: 700 }}>myfrenchtool</span>
            </Link>
            <p className="text-sm text-[var(--muted-foreground)] leading-relaxed max-w-sm">
              Les meilleurs outils, sélectionnés et testés. Trouvez votre stack
              idéale et économisez des heures de recherche.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4">Catégories</h3>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/category/${cat.slug}`}
                    className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4">À propos</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/mentions-legales"
                  className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                >
                  Mentions légales
                </Link>
              </li>
              <li>
                <a
                  href="mailto:johan@myfrenchtool.com"
                  className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[var(--border)] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--muted-foreground)]">
            © 2026 MyFrenchTool. Tous droits réservés.
          </p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1" aria-hidden>
              <span className="w-2 h-2 rounded-full bg-[#0052CC]" />
              <span className="w-2 h-2 rounded-full bg-[var(--border)]" />
              <span className="w-2 h-2 rounded-full bg-[#EF4135]" />
            </div>
            <span className="text-xs text-[var(--muted-foreground)]">·</span>
            <p className="text-xs text-[var(--muted-foreground)]">
              Fait en France, pour la France
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
