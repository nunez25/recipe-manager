import { api } from "@/lib/api";
import type { SavedRecipe, NewRecipe, RecipePatch } from "./recipes.types";

// ---------------------------------------------------------------------------
// Your saved recipes, on json-server. The half we are allowed to write to.
//
// Four functions, four HTTP verbs. Note what they are NOT: they are not React.
// They know nothing about hooks or components. Arguments in, promises out.
// ---------------------------------------------------------------------------

// WORKED EXAMPLE — read.
export const getRecipes = async (): Promise<SavedRecipe[]> =>
  (await api.get<SavedRecipe[]>("/recipes")).data;

// WORKED EXAMPLE — delete.
export const deleteRecipe = async (id: number): Promise<{ id: number }> => {
  await api.delete(`/recipes/${id}`);
  return { id };
};

export const createRecipe = async (recipe: NewRecipe): Promise<SavedRecipe> => {
  return (await api.post<SavedRecipe>("/recipes", recipe)).data;
};

export const updateRecipe = async ({ id, ...patch }: RecipePatch): Promise<SavedRecipe> => {
  return (await api.patch<SavedRecipe>(`/recipes/${id}`, patch)).data;
};
