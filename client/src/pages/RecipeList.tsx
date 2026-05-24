import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listRecipes, Recipe } from "../API/recipeApi";
import RecipeCard from "../components/RecipeCard";

function RecipeList() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    async function loadRecipes() {
      try {
        const data = await listRecipes();
        setRecipes(data.itemList);
      } catch (error) {
        console.error(error);
      }
    }

    loadRecipes();
  }, []);

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-zinc-900">Recepty</h1>
          <p className="mt-2 text-zinc-600">
            Tvoje sbírka receptů na jednom místě.
          </p>
        </div>

        <Link
          to="/recipe/create"
          className="rounded-xl bg-orange-500 px-5 py-3 font-medium text-white hover:bg-orange-600"
        >
          Přidat recept
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}

export default RecipeList;
