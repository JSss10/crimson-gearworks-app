export type Category = "ALL" | "HEADS" | "CHESTS" | "ARMS" | "LEGS" | "WEAPONS";

export type ConcreteCategory = Exclude<Category, "ALL">;

export interface Part {
  id: string;
  sku: string;
  name: string;
  category: ConcreteCategory;
  image?: string;
}

export const CATEGORIES: ConcreteCategory[] = [
  "HEADS",
  "CHESTS",
  "ARMS",
  "LEGS",
  "WEAPONS",
];