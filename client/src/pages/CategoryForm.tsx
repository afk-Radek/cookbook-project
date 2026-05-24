import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Category, listCategories } from "../API/categoryApi";
import {
  createCategory,
  getCategory,
  updateCategory,
} from "../API/categoryApi";

function CategoryForm() {
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  const isEditMode = Boolean(id);

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  useEffect(() => {
    async function loadCategory() {
      if (!id) return;

      try {
        const category = await getCategory(id);

        setName(category.name);
        setDesc(category.desc ?? "");
      } catch (error) {
        console.error(error);
      }
    }

    loadCategory();
  }, [id]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      if (isEditMode && id) {
        await updateCategory({
          id,
          name,
          desc,
        });

        navigate("/categories");
        return;
      }

      await createCategory({
        name,
        desc,
      });

      navigate("/categories");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <h1>{isEditMode ? "Upravit kategorii" : "Vytvořit kategorii"}</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Název kategorie</label>

          <input value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div>
          <label>Popis</label>

          <textarea value={desc} onChange={(e) => setDesc(e.target.value)} />
        </div>

        <button type="submit">
          {isEditMode ? "Uložit změny" : "Vytvořit kategorii"}
        </button>
      </form>
    </div>
  );
}

export default CategoryForm;
