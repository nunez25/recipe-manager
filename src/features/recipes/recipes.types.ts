import type { Recipe } from "@/features/meals/meals.types";

export interface SavedRecipe extends Recipe {
  id: string;
}

export type NewRecipe = Recipe;

export type RecipePatch = { id: string } & Partial<Omit<SavedRecipe, "id">>;
