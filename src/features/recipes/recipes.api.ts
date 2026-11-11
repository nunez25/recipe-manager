import type { SavedRecipe, NewRecipe, RecipePatch } from "./recipes.types";

const KEY = "saved-recipes";

const isSavedRecipe = (value: unknown): value is SavedRecipe => {
  if (typeof value !== "object" || value === null) return false;
  const recipe = value as Record<string, unknown>;

  return (
    typeof recipe.id === "string" &&
    typeof recipe.mealId === "string" &&
    typeof recipe.title === "string" &&
    typeof recipe.category === "string" &&
    typeof recipe.thumb === "string" &&
    Array.isArray(recipe.ingredients) &&
    recipe.ingredients.every((ingredient) => typeof ingredient === "string") &&
    typeof recipe.time === "number" &&
    typeof recipe.notes === "string" &&
    typeof recipe.favorite === "boolean"
  );
};

const read = (): SavedRecipe[] => {
  const stored = localStorage.getItem(KEY);
  if (stored === null) return [];

  try {
    const parsed: unknown = JSON.parse(stored);
    if (Array.isArray(parsed) && parsed.every(isSavedRecipe)) return parsed;
    console.warn("Saved recipes storage has an invalid shape; resetting it.");
  } catch (error) {
    if (!(error instanceof SyntaxError)) throw error;
    console.warn("Saved recipes storage is invalid JSON; resetting it.");
  }

  localStorage.removeItem(KEY);
  return [];
};

const write = (rows: SavedRecipe[]) => localStorage.setItem(KEY, JSON.stringify(rows));

export const getRecipes = async (): Promise<SavedRecipe[]> => read();

export const createRecipe = async (recipe: NewRecipe): Promise<SavedRecipe> => {
  const row: SavedRecipe = { ...recipe, id: crypto.randomUUID() };
  write([...read(), row]);
  return row;
};

export const updateRecipe = async ({ id, ...patch }: RecipePatch): Promise<SavedRecipe> => {
  const rows = read();
  if (!rows.some((recipe) => recipe.id === id)) {
    throw new Error(`Saved recipe ${id} was not found.`);
  }

  const updated = rows.map((recipe) => (recipe.id === id ? { ...recipe, ...patch } : recipe));
  const row = updated.find((recipe) => recipe.id === id);
  if (!row) throw new Error(`Saved recipe ${id} could not be updated.`);

  write(updated);
  return row;
};

export const deleteRecipe = async (id: string): Promise<{ id: string }> => {
  write(read().filter((r) => r.id !== id));
  return { id };
};