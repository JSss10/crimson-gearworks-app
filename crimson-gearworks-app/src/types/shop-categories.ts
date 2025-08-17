export type Category = "ALL" | "HEADS" | "CHESTS" | "WAISTS" | "LEGS" | "WEAPONS";
export type ConcreteCategory = Exclude<Category, "ALL">;

export interface Part {
  id: string;
  sku: string;
  name: string;
  category: ConcreteCategory | null;
  image?: string;
  href?: string;
}

export const CATEGORIES: ConcreteCategory[] = [
  "HEADS",
  "CHESTS",
  "WAISTS",
  "LEGS",
  "WEAPONS",
];