import Image from "next/image";
import type { Locale, MenuItem } from "@/data/types";
import AllergenTags from "./AllergenTags";

type Props = {
  item: MenuItem;
  currency: string;
  locale: Locale;
};

export default function MenuItemCard({ item, currency, locale }: Props) {
  const description = item.description[locale];
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-card-border bg-card transition-colors hover:border-brand/60">
      {item.image && (
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/40">
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-bold leading-tight">
            {item.name}
            <AllergenTags allergens={item.allergens} locale={locale} />
          </h3>
          <span className="shrink-0 rounded-full bg-brand/15 px-3 py-1 text-sm font-bold text-brand">
            {item.price} {currency}
          </span>
        </div>
        {description && (
          <p className="text-sm leading-relaxed text-muted">{description}</p>
        )}
      </div>
    </article>
  );
}
