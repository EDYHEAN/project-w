"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download } from "lucide-react";

type Props = {
  logo: string;
  name: string;
  slug: string;
};

export default function LogoWithContextMenu({ logo, name, slug }: Props) {
  const [ctxMenu, setCtxMenu] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const close = () => setCtxMenu(null);
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setCtxMenu(null); };
    window.addEventListener("click", close);
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("click", close); window.removeEventListener("keydown", onKey); };
  }, []);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setCtxMenu({ x: e.clientX, y: e.clientY });
  };

  const downloadLogo = () => {
    const ext = logo.split(".").pop() || "png";
    const a = document.createElement("a");
    a.href = logo;
    a.download = `logo-${slug}.${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setCtxMenu(null);
  };

  return (
    <>
      <div
        className="w-16 h-16 rounded-2xl bg-[var(--muted)] flex items-center justify-center overflow-hidden shrink-0 cursor-context-menu"
        onContextMenu={handleContextMenu}
      >
        <img
          src={logo}
          alt={name}
          className="w-10 h-10 object-contain"
          onError={(e) => {
            const target = e.currentTarget;
            target.style.display = "none";
            target.parentElement!.innerHTML = `<span class="text-2xl font-bold text-[var(--muted-foreground)]">${name.charAt(0)}</span>`;
          }}
        />
      </div>

      <AnimatePresence>
        {ctxMenu && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            transition={{ duration: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed z-50 rounded-xl border border-[var(--border)] overflow-hidden"
            style={{
              top: ctxMenu.y,
              left: ctxMenu.x,
              background: "rgba(255,255,255,0.96)",
              backdropFilter: "blur(32px)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.10), 0 1px 0 rgba(255,255,255,0.9) inset",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-1.5">
              <button
                onClick={downloadLogo}
                className="flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-sm text-left text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors duration-100"
              >
                <Download className="w-3.5 h-3.5 text-[var(--muted-foreground)] shrink-0" />
                Télécharger le logo de {name}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
