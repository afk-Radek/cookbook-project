export type Category = {
  id: string;
  name: string;
  desc?: string;
};

export type CategoryCreateDto = {
  name: string;
  desc?: string;
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
    const errorBody = await response.text();
    console.error("API error:", response.status, errorBody);
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

export function createCategory(category: CategoryCreateDto): Promise<Category> {
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
