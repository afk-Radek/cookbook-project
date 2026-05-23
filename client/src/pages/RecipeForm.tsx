import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createRecipe } from "../API/recipeApi";

function RecipeForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      await createRecipe({
        name,
        description,
      });

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <h1>Vytvořit recept</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Název receptu</label>

          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>

        <div>
          <label>Popis</label>

          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>

        <button type="submit">Vytvořit recept</button>
      </form>
    </div>
  );
}

export default RecipeForm;
