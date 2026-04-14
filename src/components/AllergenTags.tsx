import type { Locale } from "@/data/types";
import { allergenName } from "@/i18n/allergens";

type Props = {
  allergens: number[] | undefined;
  locale: Locale;
};

export default function AllergenTags({ allergens, locale }: Props) {
  if (!allergens || allergens.length === 0) return null;
  const title = allergens
    .map((n) => `${n} – ${allergenName(n, locale)}`)
    .join(", ");
  return (
    <sup
      title={title}
      className="ml-1 text-[0.65rem] font-medium text-muted/80"
    >
      {allergens.join(",")}
    </sup>
  );
}
