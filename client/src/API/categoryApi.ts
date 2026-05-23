export type Category = {
  id: string;
  name: string;
};

export type CategoryListResponse = {
  itemList: Category[];
};

async function request<T>(url: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error("API request failed");
  }

  return response.json() as Promise<T>;
}

export function listCategories(): Promise<CategoryListResponse> {
  return request<CategoryListResponse>("/recipeCategory/list");
}

export function getCategory(id: string): Promise<Category> {
  return request<Category>(`/recipeCategory/get?id=${id}`);
}

export function createCategory(
  category: Omit<Category, "id">,
): Promise<Category> {
  return request<Category>("/recipeCategory/create", {
    method: "POST",
    body: JSON.stringify(category),
  });
}

export function updateCategory(category: Category): Promise<Category> {
  return request<Category>("/recipeCategory/update", {
    method: "POST",
    body: JSON.stringify(category),
  });
}

export function deleteCategory(id: string): Promise<void> {
  return request<void>("/recipeCategory/delete", {
    method: "POST",
    body: JSON.stringify({ id }),
  });
}
