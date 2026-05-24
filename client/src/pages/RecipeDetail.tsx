import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteRecipe, getRecipe, Recipe } from "../API/recipeApi";

function RecipeDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function handleDelete() {
    if (!recipe) return;

    const confirmed = window.confirm("Opravdu chceš smazat recept?");
    if (!confirmed) return;

    try {
      await deleteRecipe(recipe.id);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    async function loadRecipe() {
      if (!id) {
        setError("Chybí ID receptu.");
        setLoading(false);
        return;
      }

      try {
        const data = await getRecipe(id);
        setRecipe(data);
      } catch (error) {
        console.error(error);
        setError("Recept se nepodařilo načíst.");
      } finally {
        setLoading(false);
      }
    }

    loadRecipe();
  }, [id]);

  if (loading) {
    return <p>Načítám recept...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!recipe) {
    return <p>Recept nebyl nalezen.</p>;
  }

  return (
    <div className="mx-auto max-w-4xl">
      <Link
        to="/"
        className="mb-6 inline-flex items-center gap-2 text-zinc-600 hover:text-orange-600"
      >
        ← Zpět na recepty
      </Link>

      <div className="rounded-3xl bg-white p-8 shadow-sm">
        <div className="mb-8 flex flex-col justify-between gap-6 md:flex-row md:items-start">
          <div>
            <h1 className="text-4xl font-bold text-zinc-900">{recipe.title}</h1>

            {recipe.description && (
              <p className="mt-4 text-lg text-zinc-600">{recipe.description}</p>
            )}
          </div>

          <div className="flex gap-3">
            <Link
              to={`/recipe/${recipe.id}/edit`}
              className="rounded-xl bg-zinc-900 px-4 py-2 text-white hover:bg-zinc-800"
            >
              ✏️ Upravit
            </Link>

            <button
              type="button"
              onClick={handleDelete}
              className="rounded-xl bg-red-500 px-4 py-2 text-white hover:bg-red-600"
            >
              🗑️ Smazat
            </button>
          </div>
        </div>

        <div className="mb-8 flex flex-wrap gap-4">
          <div className="rounded-2xl bg-orange-100 px-4 py-3 text-orange-700">
            ⏱️ {recipe.preparationTime} min
          </div>

          <div className="rounded-2xl bg-orange-100 px-4 py-3 text-orange-700">
            📋 {recipe.numberOfIngredients} ingrediencí
          </div>

          {recipe.rating !== undefined && (
            <div className="rounded-2xl bg-yellow-100 px-4 py-3 text-yellow-700">
              ⭐ {recipe.rating}/5
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="mb-3 text-2xl font-semibold text-zinc-900">
              Postup přípravy
            </h2>

            <div className="rounded-2xl bg-zinc-50 p-6 leading-8 text-zinc-700">
              {recipe.preparationSteps}
            </div>
          </div>

          {recipe.note && (
            <div>
              <h2 className="mb-3 text-2xl font-semibold text-zinc-900">
                Poznámka
              </h2>

              <div className="rounded-2xl bg-orange-50 p-6 text-zinc-700">
                {recipe.note}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RecipeDetail;
