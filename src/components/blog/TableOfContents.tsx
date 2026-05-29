"use client";

import { useState, useEffect } from "react";

type Heading = { id: string; text: string; level: number };

export default function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const els = Array.from(document.querySelectorAll(".prose h2, .prose h3"));
    const items: Heading[] = els.map((el) => {
      if (!el.id) {
        el.id = (el.textContent ?? "")
          .toLowerCase()
          .normalize("NFD")
          .replace(/[̀-ͯ]/g, "")
          .replace(/[^a-z0-9\s]/g, "")
          .replace(/\s+/g, "-")
          .trim();
      }
      return { id: el.id, text: el.textContent ?? "", level: el.tagName === "H2" ? 2 : 3 };
    });
    setHeadings(items);
  }, []);

  useEffect(() => {
    if (headings.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-80px 0% -65% 0%", threshold: 0 }
    );
    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 2) return null;

  return (
    <nav className="hidden lg:block">
      <div className="sticky top-[100px]">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)] mb-3">
          Dans cet article
        </p>
        <ul className="space-y-1.5 border-l border-[var(--border)]">
          {headings.map(({ id, text, level }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={`block text-[13px] leading-snug transition-colors duration-150 pl-3 ${
                  level === 3 ? "pl-5" : ""
                } ${
                  activeId === id
                    ? "text-[var(--foreground)] font-medium border-l-2 border-[var(--accent)] -ml-px"
                    : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                }`}
              >
                {text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
