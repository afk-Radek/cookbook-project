import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Category, listCategories } from "../API/categoryApi";
import { createRecipe, getRecipe, updateRecipe } from "../API/recipeApi";

type RecipeFormProps = {
  onSuccess?: () => void;
};

function RecipeForm({ onSuccess }: RecipeFormProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const isEditMode = Boolean(id);

  const [categories, setCategories] = useState<Category[]>([]);

  const [title, setTitle] = useState("");
  const [preparationTime, setPreparationTime] = useState(1);
  const [numberOfIngredients, setNumberOfIngredients] = useState(1);
  const [description, setDescription] = useState("");
  const [preparationSteps, setPreparationSteps] = useState("");
  const [recipeCategoryId, setRecipeCategoryId] = useState("");

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await listCategories();
        setCategories(data.itemList);

        if (!isEditMode && data.itemList.length > 0) {
          setRecipeCategoryId(data.itemList[0].id);
        }
      } catch (error) {
        console.error(error);
      }
    }

    loadCategories();
  }, [isEditMode]);

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

        if (onSuccess) {
          onSuccess();
          return;
        }

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

      if (onSuccess) {
        onSuccess();
        return;
      }

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="mb-1 block font-medium text-zinc-700">
          Název receptu
        </label>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none focus:border-orange-500"
        />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="mb-1 block font-medium text-zinc-700">
            Čas přípravy
          </label>

          <input
            type="number"
            min={1}
            value={preparationTime}
            onChange={(e) => setPreparationTime(Number(e.target.value))}
            className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none focus:border-orange-500"
          />
        </div>

        <div>
          <label className="mb-1 block font-medium text-zinc-700">
            Počet ingrediencí
          </label>

          <input
            type="number"
            min={1}
            value={numberOfIngredients}
            onChange={(e) => setNumberOfIngredients(Number(e.target.value))}
            className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none focus:border-orange-500"
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block font-medium text-zinc-700">
          Kategorie
        </label>

        <select
          value={recipeCategoryId}
          onChange={(e) => setRecipeCategoryId(e.target.value)}
          className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 outline-none focus:border-orange-500"
        >
          <option value="">Vyber kategorii</option>

          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-1 block font-medium text-zinc-700">Popis</label>

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="min-h-24 w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none focus:border-orange-500"
        />
      </div>

      <div>
        <label className="mb-1 block font-medium text-zinc-700">
          Postup přípravy
        </label>

        <textarea
          value={preparationSteps}
          onChange={(e) => setPreparationSteps(e.target.value)}
          className="min-h-36 w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none focus:border-orange-500"
        />
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="rounded-xl border border-zinc-300 px-4 py-2 text-zinc-700 hover:bg-zinc-100"
        >
          Zrušit
        </button>

        <button
          type="submit"
          className="rounded-xl bg-orange-500 px-5 py-2 font-medium text-white hover:bg-orange-600"
        >
          {isEditMode ? "Uložit změny" : "Vytvořit recept"}
        </button>
      </div>
    </form>
  );
}

export default RecipeForm;
