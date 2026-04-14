"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import type { Locale, MenuData } from "@/data/types";
import { t } from "@/i18n/strings";
import { allergenName } from "@/i18n/allergens";
import AllergenTags from "./AllergenTags";
import CategoryNav from "./CategoryNav";
import MenuItemCard from "./MenuItemCard";

const STORAGE_KEY = "mrburger-locale";

type Props = { data: MenuData };

export default function MenuApp({ data }: Props) {
  const { restaurant, categories } = data;
  const [locale, setLocale] = useState<Locale>("cs");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "cs" || stored === "en") {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLocale(stored);
      }
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const switchLocale = (next: Locale) => {
    setLocale(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {}
  };

  const usedAllergens = useMemo(() => {
    const set = new Set<number>();
    for (const cat of categories) {
      for (const item of cat.items) {
        item.allergens?.forEach((n) => set.add(n));
      }
    }
    return Array.from(set).sort((a, b) => a - b);
  }, [categories]);

  return (
    <>
      <header className="relative h-[52vh] min-h-[320px] w-full overflow-hidden">
        <Image
          src={restaurant.hero}
          alt={restaurant.name}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-background" />

        <div className="relative z-10 mx-auto flex h-full max-w-5xl flex-col justify-end gap-3 px-5 pb-8">
          <div className="flex items-end justify-between gap-4">
            <div className="flex flex-col items-start gap-3">
              <span className="rounded-full bg-brand px-3 py-1 text-xs font-bold uppercase tracking-wider text-black">
                {t("menuBadge", locale)}
              </span>
              <h1 className="text-4xl font-extrabold leading-none text-white sm:text-6xl">
                {restaurant.name}
              </h1>
            </div>
            <div
              className="flex shrink-0 gap-1 rounded-full border border-white/30 bg-black/60 p-1 backdrop-blur-md"
              role="group"
              aria-label="Language"
            >
              {(["cs", "en"] as const).map((code) => {
                const isActive = locale === code;
                return (
                  <button
                    key={code}
                    type="button"
                    onClick={() => switchLocale(code)}
                    aria-pressed={isActive}
                    className={`min-w-[44px] rounded-full px-3 py-2 text-xs font-bold uppercase transition-colors ${
                      isActive
                        ? "bg-brand text-black"
                        : "text-white/80 hover:text-white"
                    }`}
                    style={{ touchAction: "manipulation" }}
                  >
                    {code}
                  </button>
                );
              })}
            </div>
          </div>
          <p className="max-w-xl text-sm text-white/85 sm:text-base">
            {t("heroSubtitle", locale)}
          </p>
        </div>
      </header>

      <CategoryNav
        categories={categories.map(({ hurl, name }) => ({ hurl, name }))}
      />

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 pb-24 pt-8 sm:px-6">
        {categories.map((cat) => {
          const hasAnyImage = cat.items.some((i) => i.image);
          const isSpeciality = cat.hurl === "mrburger-speciality";
          return (
            <section
              key={cat.id}
              id={`cat-${cat.hurl}`}
              className="scroll-mt-20 pt-6"
            >
              <h2 className="mb-5 text-2xl font-extrabold sm:text-3xl">
                {cat.name}
              </h2>
              {isSpeciality ? (
                <div className="grid gap-5">
                  {cat.items.map((item) => (
                    <article
                      key={item.id}
                      className="relative overflow-hidden rounded-2xl border border-brand/40 bg-gradient-to-br from-brand/15 via-card to-card"
                    >
                      <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brand/20 blur-3xl" />
                      <div className="relative grid gap-0 sm:grid-cols-[280px_1fr]">
                        {item.image && (
                          <div className="relative aspect-[4/3] w-full sm:aspect-auto sm:h-full">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              sizes="(min-width: 640px) 280px, 100vw"
                              className="object-cover"
                            />
                          </div>
                        )}
                        <div className="flex flex-col justify-between gap-4 p-6 sm:p-8">
                          <div>
                            <span className="mb-3 inline-block rounded-full bg-brand px-3 py-1 text-xs font-bold uppercase tracking-wider text-black">
                              {t("specialityBadge", locale)}
                            </span>
                            <h3 className="text-2xl font-extrabold sm:text-3xl">
                              {item.name}
                              <AllergenTags
                                allergens={item.allergens}
                                locale={locale}
                              />
                            </h3>
                            {item.description[locale] && (
                              <p className="mt-2 text-sm leading-relaxed text-foreground/80 sm:text-base">
                                {item.description[locale]}
                              </p>
                            )}
                          </div>
                          <span className="self-start rounded-full bg-brand px-4 py-2 text-base font-extrabold text-black">
                            {item.price} {restaurant.currency}
                          </span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              ) : hasAnyImage ? (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {cat.items.map((item) => (
                    <MenuItemCard
                      key={item.id}
                      item={item}
                      currency={restaurant.currency}
                      locale={locale}
                    />
                  ))}
                </div>
              ) : (
                <ul className="divide-y divide-card-border overflow-hidden rounded-2xl border border-card-border bg-card">
                  {cat.items.flatMap((item, i) => {
                    const prev = cat.items[i - 1];
                    const showHeader =
                      item.group && item.group !== prev?.group;
                    const rows = [];
                    if (showHeader) {
                      rows.push(
                        <li
                          key={`hdr-${cat.id}-${item.group}`}
                          className="bg-background/40 px-5 py-2 text-xs font-bold uppercase tracking-wider text-brand"
                        >
                          {item.group}
                        </li>,
                      );
                    }
                    rows.push(
                      <li
                        key={item.id}
                        className="flex items-center justify-between gap-4 px-5 py-4"
                      >
                        <div className="min-w-0">
                          <div className="font-semibold">
                            {item.name}
                            <AllergenTags
                              allergens={item.allergens}
                              locale={locale}
                            />
                          </div>
                          {item.description[locale] && (
                            <div className="mt-0.5 text-sm text-muted">
                              {item.description[locale]}
                            </div>
                          )}
                        </div>
                        <span className="shrink-0 rounded-full bg-brand/15 px-3 py-1 text-sm font-bold text-brand">
                          {item.price} {restaurant.currency}
                        </span>
                      </li>,
                    );
                    return rows;
                  })}
                </ul>
              )}
              {cat.note?.[locale] && (
                <p className="mt-4 text-sm italic text-muted">
                  {cat.note[locale]}
                </p>
              )}
            </section>
          );
        })}
      </main>

      <footer className="border-t border-card-border bg-card/40">
        <div className="mx-auto max-w-5xl px-5 py-10 text-sm text-muted">
          <div className="mb-4 text-xl font-extrabold text-foreground">
            {restaurant.name}
          </div>
          <div className="grid gap-2 sm:grid-cols-3">
            <div>
              <div className="font-semibold text-foreground/80">
                {t("address", locale)}
              </div>
              <div>{restaurant.address}</div>
            </div>
            <div>
              <div className="font-semibold text-foreground/80">
                {t("phone", locale)}
              </div>
              <a
                href={`tel:${restaurant.phone}`}
                className="text-brand hover:underline"
              >
                {restaurant.phone}
              </a>
            </div>
            <div>
              <div className="font-semibold text-foreground/80">
                {t("email", locale)}
              </div>
              <a
                href={`mailto:${restaurant.email}`}
                className="text-brand hover:underline"
              >
                {restaurant.email}
              </a>
            </div>
          </div>
          {usedAllergens.length > 0 && (
            <div className="mt-8 border-t border-card-border pt-6">
              <div className="mb-2 font-semibold text-foreground/80">
                {t("allergensTitle", locale)}
              </div>
              <div className="mb-3 text-xs text-muted/80">
                {t("allergensNote", locale)}
              </div>
              <ul className="grid gap-x-6 gap-y-1 text-xs text-muted sm:grid-cols-2 lg:grid-cols-3">
                {usedAllergens.map((n) => (
                  <li key={n}>
                    <span className="font-bold text-foreground/80">{n}</span>{" "}
                    – {allergenName(n, locale)}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="mt-6 text-xs text-muted/70">
            © {new Date().getFullYear()} {restaurant.name}. {t("pricesNote", locale)}
          </div>
        </div>
      </footer>
    </>
  );
}
