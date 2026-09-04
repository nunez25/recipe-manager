import { useEffect, useState } from "react";
// TODO: import your components once you build them
import RecipeCard from "./components/RecipeCard";
// import RecipeForm from "./components/RecipeForm";
// import CategoryFilter from "./components/CategoryFilter";
// import RecipeList from "./components/RecipeList";
// import SummaryBar from "./components/SummaryBar";

const STARTER_RECIPES = [
  { id: 1, title: "Chicken Adobo", category: "Dinner", time: 45, favorite: false },
  { id: 2, title: "Beef Tapa", category: "Breakfast", time: 20, favorite: false },
  { id: 3, title: "Pancit Canton", category: "Lunch", time: 25, favorite: false },
  { id: 4, title: "Leche Flan", category: "Dessert", time: 60, favorite: false },
  { id: 5, title: "Tocino Silog", category: "Breakfast", time: 15, favorite: false },
  { id: 6, title: "Kare-Kare", category: "Dinner", time: 90, favorite: false },
];

export default function App() {
  // TODO 1: create the `recipes` state using STARTER_RECIPES as the initial value.
  //         Later, wrap it in the lazy initializer that reads from localStorage.
  const [recipes, setRecipes] = useState(() => {
    const savedRecipes = localStorage.getItem("recipes");

    return savedRecipes
      ? JSON.parse(savedRecipes)
      : STARTER_RECIPES;
  });

  // TODO 2: create the `filter` state, starting as "All".
  //         Later, wrap it in the lazy initializer that reads from localStorage.
  const [filter, setFilter] = useState(() => {
    return localStorage.getItem("recipeFilter") || "All";
  });

  // TODO 3: add useEffect to persist `recipes` to localStorage whenever it changes.
  useEffect(() => {
    localStorage.setItem("recipes", JSON.stringify(recipes));
  }, [recipes]);

  // TODO 4: add useEffect to persist `filter` to localStorage whenever it changes.
  useEffect(() => {
    localStorage.setItem("recipeFilter", filter);
  }, [filter]);

  // TODO 5: add useEffect to update `document.title` with the favorite count.
  //         Example format: `Recipes · 3 ★`
  useEffect(() => {
    const favoriteCount = recipes.filter(
      (recipe) => recipe.favorite
    ).length;

    document.title = `Recipes · ${favoriteCount} ★`;
  }, [recipes]);

  // TODO 6: write handleAdd(recipe) — adds a new recipe with a unique id (Date.now()).
  //         Use the spread operator, NOT .push().
  const handleAdd = (recipe) => {
    const newRecipe = {
      ...recipe,
      id: Date.now(),
      favorite: false,
    };

    setRecipes((currentRecipes) => [
      ...currentRecipes,
      newRecipe,
    ]);
  };

  // TODO 7: write handleToggleFavorite(id) — flips the `favorite` field of the matching recipe.
  //         Use .map() and spread; do NOT mutate the object directly.
  const handleToggleFavorite = (id) => {
    setRecipes((currentRecipes) =>
      currentRecipes.map((recipe) =>
        recipe.id === id
          ? {
              ...recipe,
              favorite: !recipe.favorite,
            }
          : recipe
      )
    );
  };

  // TODO 8: write handleDelete(id) — removes the recipe with that id.
  //         Use .filter().
  const handleDelete = (id) => {
    setRecipes((currentRecipes) =>
      currentRecipes.filter((recipe) => recipe.id !== id)
    );
  };

  // TODO 9: derive `visibleRecipes` in render — if filter === "All" show all,
  //         otherwise filter by category. Do NOT store this in state.
  const visibleRecipes =
    filter === "All"
      ? recipes
      : recipes.filter(
          (recipe) => recipe.category === filter
        );

  return (
    <div className="min-h-screen bg-base-200 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <header className="text-center">
          <h1 className="text-4xl font-bold">Recipe Manager</h1>
          <p className="text-base-content/70 mt-2">
            Your personal collection of favorite dishes
          </p>
        </header>

        {/* TODO: render <RecipeForm onAdd={handleAdd} /> */}

        {/* TODO: render <SummaryBar total={...} favorites={...} /> */}

        {/* TODO: render <CategoryFilter activeFilter={filter} onFilterChange={setFilter} /> */}

        {/* TODO: render <RecipeList recipes={visibleRecipes}
                                    onToggleFavorite={handleToggleFavorite}
                                    onDelete={handleDelete} /> */}

        {/* Recipe Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {visibleRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onToggleFavorite={handleToggleFavorite}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </div>
  );
}