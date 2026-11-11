import type { Recipe } from "@/features/meals/meals.types";

export interface SavedRecipe extends Recipe {
  id: number;
}

export type NewRecipe = Recipe;

export type RecipePatch = { id: number } & Partial<Omit<SavedRecipe, "id">>;
