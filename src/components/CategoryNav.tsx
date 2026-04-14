"use client";

import { useEffect, useRef, useState } from "react";
import type { MenuCategory } from "@/data/types";

type Props = {
  categories: Pick<MenuCategory, "hurl" | "name">[];
};

export default function CategoryNav({ categories }: Props) {
  const [active, setActive] = useState<string>(categories[0]?.hurl ?? "");
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sections = categories
      .map((c) => document.getElementById(`cat-${c.hurl}`))
      .filter((el): el is HTMLElement => Boolean(el));

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          const id = visible[0].target.id.replace(/^cat-/, "");
          setActive(id);
        }
      },
      {
        rootMargin: "-35% 0px -55% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [categories]);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const btn = nav.querySelector<HTMLAnchorElement>(
      `[data-hurl="${active}"]`,
    );
    if (btn) {
      btn.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [active]);

  return (
    <nav className="sticky top-0 z-30 border-b border-card-border bg-background/90 backdrop-blur-md">
      <div
        ref={navRef}
        className="no-scrollbar mx-auto flex max-w-5xl gap-2 overflow-x-auto px-4 py-3 sm:gap-2.5 sm:px-6"
      >
        {categories.map((c) => {
          const isActive = c.hurl === active;
          return (
            <a
              key={c.hurl}
              href={`#cat-${c.hurl}`}
              data-hurl={c.hurl}
              className={`shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                isActive
                  ? "bg-brand text-black"
                  : "border border-card-border bg-card text-foreground/80 hover:text-foreground"
              }`}
              style={{ touchAction: "manipulation" }}
            >
              {c.name}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
