import type { Locale } from "@/data/types";

type UIKey =
  | "menuBadge"
  | "heroSubtitle"
  | "specialityBadge"
  | "address"
  | "phone"
  | "email"
  | "pricesNote"
  | "languageLabel"
  | "allergensTitle"
  | "allergensNote";

const strings: Record<UIKey, Record<Locale, string>> = {
  menuBadge: {
    cs: "Menu",
    en: "Menu",
  },
  heroSubtitle: {
    cs: "Šťavnaté burgery, křupavé chicken a wings. Vše čerstvě připravené v Praze Holešovice.",
    en: "Juicy burgers, crispy chicken and wings. All freshly prepared in Prague Holešovice.",
  },
  specialityBadge: {
    cs: "Speciality",
    en: "Speciality",
  },
  address: {
    cs: "Adresa",
    en: "Address",
  },
  phone: {
    cs: "Telefon",
    en: "Phone",
  },
  email: {
    cs: "E-mail",
    en: "E-mail",
  },
  pricesNote: {
    cs: "Ceny jsou uvedeny v Kč.",
    en: "Prices are in CZK.",
  },
  languageLabel: {
    cs: "Jazyk",
    en: "Language",
  },
  allergensTitle: {
    cs: "Alergeny",
    en: "Allergens",
  },
  allergensNote: {
    cs: "Čísla u pokrmů označují alergeny podle EU značení.",
    en: "Numbers next to items indicate allergens per EU labelling.",
  },
};

export function t(key: UIKey, locale: Locale): string {
  return strings[key][locale];
}
