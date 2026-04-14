export type Locale = "cs" | "en";

export type LocalizedText = {
  cs: string;
  en: string;
};

export type MenuItem = {
  id: string;
  name: string;
  description: LocalizedText;
  price: number;
  image: string | null;
  weight?: string;
  categoryId: string;
  position: number;
  allergens?: number[];
  group?: string;
};

export type MenuCategory = {
  id: string;
  name: string;
  hurl: string;
  items: MenuItem[];
  note?: LocalizedText;
};

export type MenuData = {
  restaurant: {
    name: string;
    phone: string;
    email: string;
    address: string;
    currency: string;
    primaryColor: string;
    hero: string;
  };
  categories: MenuCategory[];
};
