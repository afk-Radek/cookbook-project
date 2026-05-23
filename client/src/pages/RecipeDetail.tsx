import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRecipe, Recipe } from "../API/recipeApi";

function RecipeDetail() {
  const { id } = useParams<{ id: string }>();

  const [recipe, setRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    async function loadRecipe() {
      if (!id) return;

      try {
        const data = await getRecipe(id);
        setRecipe(data);
      } catch (error) {
        console.error(error);
      }
    }

    loadRecipe();
  }, [id]);

  if (!recipe) {
    return <p>Načítám recept...</p>;
  }

  return (
    <div>
      <h1>{recipe.name}</h1>

      {recipe.description && <p>{recipe.description}</p>}

      {recipe.rating && <p>Hodnocení: {recipe.rating}</p>}

      {recipe.recipeCategoryId && (
        <p>Kategorie ID: {recipe.recipeCategoryId}</p>
      )}
    </div>
  );
}

export default RecipeDetail;
