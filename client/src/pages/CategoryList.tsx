import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Category, deleteCategory, listCategories } from "../API/categoryApi";

function CategoryList() {
  const [categories, setCategories] = useState<Category[]>([]);

  async function loadCategories() {
    try {
      const data = await listCategories();
      setCategories(data.itemList);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDelete(id: string) {
    const confirmed = window.confirm("Opravdu chceš smazat kategorii?");

    if (!confirmed) return;

    try {
      await deleteCategory(id);
      await loadCategories();
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <div>
      <h1>Kategorie</h1>

      <Link to="/categories/create">Přidat kategorii</Link>

      {categories.map((category) => (
        <div key={category.id}>
          <h2>{category.name}</h2>

          {category.desc && <p>{category.desc}</p>}

          <Link to={`/categories/${category.id}/edit`}>Upravit</Link>

          <button type="button" onClick={() => handleDelete(category.id)}>
            Smazat
          </button>
        </div>
      ))}
    </div>
  );
}

export default CategoryList;
