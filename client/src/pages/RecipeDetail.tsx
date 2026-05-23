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
    <div>
      <Link to="/">← Zpět na recepty</Link>

      <h1>{recipe.title}</h1>

      {recipe.description && <p>{recipe.description}</p>}

      {recipe.rating !== undefined && <p>Hodnocení: {recipe.rating}</p>}

      {recipe.recipeCategoryId && (
        <p>Kategorie ID: {recipe.recipeCategoryId}</p>
      )}

      <div>
        <Link to={`/recipe/${recipe.id}/edit`}>Upravit recept</Link>

        <button type="button" onClick={handleDelete}>
          Smazat recept
        </button>
      </div>
    </div>
  );
}

export default RecipeDetail;
