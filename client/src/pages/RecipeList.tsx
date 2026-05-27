import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { listRecipes, Recipe } from "../API/recipeApi";
import RecipeCard from "../components/RecipeCard";

function RecipeList() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [searchParams] = useSearchParams();

  const recipeCategoryId = searchParams.get("recipeCategoryId");

  useEffect(() => {
    async function loadRecipes() {
      try {
        const data = await listRecipes();

        const filteredRecipes = recipeCategoryId
          ? data.itemList.filter(
              (recipe) => recipe.recipeCategoryId === recipeCategoryId,
            )
          : data.itemList;

        setRecipes(filteredRecipes);
      } catch (error) {
        console.error(error);
      }
    }

    loadRecipes();
  }, [recipeCategoryId]);

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-zinc-900">Seznam receptů</h1>

          <p className="mt-2 text-zinc-600">
            {recipeCategoryId
              ? "Recepty z vybrané kuchařky."
              : "Tvoje sbírka receptů na jednom místě."}
          </p>
        </div>

        <Link
          to="/recipe/create"
          className="rounded-xl bg-orange-500 px-5 py-3 font-medium text-white hover:bg-orange-600"
        >
          Přidat recept
        </Link>
      </div>

      {recipes.length === 0 ? (
        <div className="rounded-2xl bg-white p-8 text-center text-zinc-600 shadow-sm">
          V této kuchařce zatím nejsou žádné recepty.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
}

export default RecipeList;
