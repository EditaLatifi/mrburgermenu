import type { Locale } from "@/data/types";

const allergenNames: Record<number, Record<Locale, string>> = {
  1: { cs: "Lepek", en: "Gluten" },
  2: { cs: "Korýši", en: "Crustaceans" },
  3: { cs: "Vejce", en: "Eggs" },
  4: { cs: "Ryby", en: "Fish" },
  5: { cs: "Arašídy", en: "Peanuts" },
  6: { cs: "Sója", en: "Soy" },
  7: { cs: "Mléko", en: "Milk" },
  8: { cs: "Skořápkové plody", en: "Nuts" },
  9: { cs: "Celer", en: "Celery" },
  10: { cs: "Hořčice", en: "Mustard" },
  11: { cs: "Sezam", en: "Sesame" },
  12: { cs: "Oxid siřičitý", en: "Sulphites" },
  13: { cs: "Vlčí bob", en: "Lupin" },
  14: { cs: "Měkkýši", en: "Molluscs" },
};

export function allergenName(num: number, locale: Locale): string {
  return allergenNames[num]?.[locale] ?? String(num);
}

export const allergenList = Object.keys(allergenNames)
  .map(Number)
  .sort((a, b) => a - b);
