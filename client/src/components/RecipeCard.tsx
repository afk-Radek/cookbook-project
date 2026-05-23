import { Link } from "react-router-dom";
import { Recipe } from "../API/recipeApi";

type RecipeCardProps = {
  recipe: Recipe;
};

function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <div
      style={{
        border: "1px solid lightgray",
        padding: "16px",
        marginBottom: "16px",
        borderRadius: "8px",
      }}
    >
      <h2>{recipe.name}</h2>

      {recipe.description && <p>{recipe.description}</p>}

      {recipe.rating && <p>Hodnocení: {recipe.rating}</p>}

      <Link to={`/recipe/${recipe.id}`}>Detail receptu</Link>
    </div>
  );
}

export default RecipeCard;
