import { useEffect, useState } from "react";
import {
  Category,
  createCategory,
  deleteCategory,
  listCategories,
  updateCategory,
} from "../API/categoryApi";
import Modal from "../components/Modal";

type FormState = {
  id?: string;
  name: string;
  desc: string;
};

function CategoryList() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formState, setFormState] = useState<FormState>({
    name: "",
    desc: "",
  });

  const isEditMode = Boolean(formState.id);

  async function loadCategories() {
    try {
      const data = await listCategories();
      setCategories(data.itemList);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadCategories();
  }, []);

  function openCreateModal() {
    setFormState({
      name: "",
      desc: "",
    });

    setIsModalOpen(true);
  }

  function openEditModal(category: Category) {
    setFormState({
      id: category.id,
      name: category.name,
      desc: category.desc ?? "",
    });

    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      if (isEditMode && formState.id) {
        await updateCategory({
          id: formState.id,
          name: formState.name,
          desc: formState.desc,
        });
      } else {
        await createCategory({
          name: formState.name,
          desc: formState.desc,
        });
      }

      await loadCategories();
      closeModal();
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

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-5xl font-bold text-zinc-900">Kategorie</h1>

          <p className="mt-3 text-lg text-zinc-600">
            Správa kategorií receptů.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateModal}
          className="rounded-2xl bg-orange-500 px-6 py-3 font-medium text-white transition hover:bg-orange-600"
        >
          Přidat kategorii
        </button>
      </div>

      {categories.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-zinc-300 bg-white p-16 text-center">
          <h2 className="text-2xl font-semibold text-zinc-900">
            Zatím nemáš žádné kategorie
          </h2>

          <p className="mt-2 text-zinc-500">Přidej první kategorii receptů.</p>

          <button
            type="button"
            onClick={openCreateModal}
            className="mt-6 rounded-2xl bg-orange-500 px-6 py-3 font-medium text-white hover:bg-orange-600"
          >
            Vytvořit kategorii
          </button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <article
              key={category.id}
              className="rounded-3xl border border-orange-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-zinc-900">
                    {category.name}
                  </h2>

                  {category.desc && (
                    <p className="mt-3 text-zinc-600">{category.desc}</p>
                  )}
                </div>
              </div>

              <div className="mt-8 flex gap-3">
                <button
                  type="button"
                  onClick={() => openEditModal(category)}
                  className="rounded-xl bg-zinc-900 px-4 py-2 text-white transition hover:bg-zinc-800"
                >
                  Upravit
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(category.id)}
                  className="rounded-xl bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
                >
                  Smazat
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      {isModalOpen && (
        <Modal
          title={isEditMode ? "Upravit kategorii" : "Přidat kategorii"}
          onClose={closeModal}
          size="sm"
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block font-medium text-zinc-700">
                Název
              </label>

              <input
                value={formState.name}
                onChange={(event) =>
                  setFormState((current) => ({
                    ...current,
                    name: event.target.value,
                  }))
                }
                className="w-full rounded-2xl border border-zinc-300 px-4 py-3 outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium text-zinc-700">
                Popis
              </label>

              <textarea
                value={formState.desc}
                onChange={(event) =>
                  setFormState((current) => ({
                    ...current,
                    desc: event.target.value,
                  }))
                }
                className="min-h-28 w-full rounded-2xl border border-zinc-300 px-4 py-3 outline-none focus:border-orange-500"
              />
            </div>

            <div className="flex justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={closeModal}
                className="rounded-xl border border-zinc-300 px-4 py-2 text-zinc-700 hover:bg-zinc-100"
              >
                Zrušit
              </button>

              <button
                type="submit"
                className="rounded-xl bg-orange-500 px-5 py-2 font-medium text-white hover:bg-orange-600"
              >
                {isEditMode ? "Uložit změny" : "Vytvořit kategorii"}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

export default CategoryList;
