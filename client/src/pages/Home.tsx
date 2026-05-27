import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Category, listCategories } from "../API/categoryApi";

function Home() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await listCategories();
        setCategories(data.itemList);
      } catch (error) {
        console.error(error);
      }
    }

    loadCategories();
  }, []);

  return (
    <div className="mx-auto max-w-4xl py-20 text-center">
      <h1 className="text-5xl font-bold text-zinc-900">Cookbook</h1>

      <p className="mt-4 text-lg text-zinc-600">
        Tvoje digitální kuchařka na jednom místě.{" "}
      </p>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/recipe?recipeCategoryId=${category.id}`}
            className="rounded-2xl border border-orange-100 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <h2 className="text-2xl font-bold text-zinc-900">
              {category.name}
            </h2>

            {category.desc && (
              <p className="mt-2 text-zinc-600">{category.desc}</p>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
