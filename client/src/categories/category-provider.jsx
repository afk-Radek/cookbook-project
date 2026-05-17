import { createContext, useState, useEffect } from "react";

export const CategoryContext = createContext();

const CategoryProvider = ({ children }) => {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [state, setState] = useState();

  console.log(state);

  const fetchCategories = async () => {
    setState("loading");
    const response = await fetch("/category/list");
    if (response.ok) {
      const data = await response.json();
      setData(data);
      setState("success");
    } else {
      setError(response.statusText);
      setState("error");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreate = async (name, desc) => {
    setState("creating");
    const response = await fetch("/category/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, desc }),
    });

    if (response.ok) {
      const newCategory = await response.json();
      setData((currentData) => {
        currentData.itemList.push(newCategory);
        return { ...currentData };
      });
      setState("success");
    } else {
      setError(response.statusText);
      setState("errorCreating");
    }
  };

  const handleUpdate = async (id, name, desc) => {
    setState("updating_" + id);
    const response = await fetch("/category/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, name, desc }),
    });

    if (response.ok) {
      const newCategory = await response.json();
      setData((currentData) => {
        const itemIndex = currentData.itemList.findIndex(
          (item) => item.id === id
        );
        currentData.itemList[itemIndex] = newCategory;
        return { ...currentData };
      });
      setState("success");
    } else {
      setError(response.statusText);
      setState("errorCreating");
    }
  };

  const handleDelete = async (id) => {
    setState("deleting_" + id);
    const response = await fetch("/category/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (response.ok) {
      await response.json();
      setData((currentData) => {
        const itemIndex = currentData.itemList.findIndex(
          (item) => item.id === id
        );
        currentData.itemList.splice(itemIndex, 1);
        return { ...currentData };
      });
      setState("success");
    } else {
      setError(response.statusText);
      setState("errorDeleting");
    }
  };

  return (
    <CategoryContext.Provider
      value={{
        data,
        state,
        error,
        handlerMap: {
          handleCreate,
          handleUpdate,
          handleDelete,
          fetchCategories,
        },
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryProvider;
