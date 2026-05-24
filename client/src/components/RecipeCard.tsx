import { Link } from "react-router-dom";
import { Recipe } from "../API/recipeApi";

type RecipeCardProps = {
  recipe: Recipe;
};

function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <article className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-zinc-900">{recipe.title}</h2>

        {recipe.description && (
          <p className="mt-2 line-clamp-3 text-zinc-600">
            {recipe.description}
          </p>
        )}
      </div>

      <div className="mb-5 flex flex-wrap gap-3 text-sm text-zinc-500">
        <span>{recipe.preparationTime} min</span>
        <span>{recipe.numberOfIngredients} ingrediencí</span>

        {recipe.rating !== undefined && <span>⭐ {recipe.rating}</span>}
      </div>

      <Link
        to={`/recipe/${recipe.id}`}
        className="inline-flex rounded-xl bg-orange-500 px-4 py-2 font-medium text-white hover:bg-orange-600"
      >
        Detail receptu
      </Link>
    </article>
  );
}

export default RecipeCard;
