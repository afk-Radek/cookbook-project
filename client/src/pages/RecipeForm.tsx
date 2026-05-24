import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createRecipe, getRecipe, updateRecipe } from "../API/recipeApi";

function RecipeForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const isEditMode = Boolean(id);

  const [title, setTitle] = useState("");
  const [preparationTime, setPreparationTime] = useState(1);
  const [numberOfIngredients, setNumberOfIngredients] = useState(1);
  const [description, setDescription] = useState("");
  const [preparationSteps, setPreparationSteps] = useState("");
  const [recipeCategoryId, setRecipeCategoryId] = useState("");

  useEffect(() => {
    async function loadRecipe() {
      if (!id) return;

      try {
        const recipe = await getRecipe(id);

        setTitle(recipe.title);
        setPreparationTime(recipe.preparationTime);
        setNumberOfIngredients(recipe.numberOfIngredients);
        setDescription(recipe.description);
        setPreparationSteps(recipe.preparationSteps);
        setRecipeCategoryId(recipe.recipeCategoryId);
      } catch (error) {
        console.error(error);
      }
    }

    loadRecipe();
  }, [id]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      if (isEditMode && id) {
        await updateRecipe({
          id,
          title,
          preparationTime,
          numberOfIngredients,
          description,
          preparationSteps,
          recipeCategoryId,
        });

        navigate(`/recipe/${id}`);
        return;
      }

      await createRecipe({
        title,
        preparationTime,
        numberOfIngredients,
        description,
        preparationSteps,
        recipeCategoryId,
      });

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <h1>{isEditMode ? "Upravit recept" : "Vytvořit recept"}</h1>

      <form onSubmit={handleSubmit}>
        <label>Název receptu</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />

        <label>Čas přípravy</label>
        <input
          type="number"
          value={preparationTime}
          onChange={(e) => setPreparationTime(Number(e.target.value))}
        />

        <label>Počet ingrediencí</label>
        <input
          type="number"
          value={numberOfIngredients}
          onChange={(e) => setNumberOfIngredients(Number(e.target.value))}
        />

        <label>Popis</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label>Postup přípravy</label>
        <textarea
          value={preparationSteps}
          onChange={(e) => setPreparationSteps(e.target.value)}
        />

        <label>ID kategorie</label>
        <input
          value={recipeCategoryId}
          onChange={(e) => setRecipeCategoryId(e.target.value)}
        />

        <button type="submit">
          {isEditMode ? "Uložit změny" : "Vytvořit recept"}
        </button>
      </form>
    </div>
  );
}

export default RecipeForm;
