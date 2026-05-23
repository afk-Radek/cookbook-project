import { useEffect, useState } from "react";
import { listRecipes, Recipe } from "../API/recipeApi";
import RecipeCard from "../components/RecipeCard";
import { Link } from "react-router-dom";

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
      <h1>Cookbook</h1>

      <Link to="/recipe/create">Přidat recept</Link>
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}

export default RecipeList;
