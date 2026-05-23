export type Recipe = {
  id: string;
  name: string;
  description?: string;
  recipeCategoryId?: string;
  rating?: number;
};

export type RecipeListResponse = {
  itemList: Recipe[];
};

async function request<T>(url: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error("Chyba při komunikaci s backendem");
  }

  return response.json() as Promise<T>;
}

export function listRecipes(): Promise<RecipeListResponse> {
  return request<RecipeListResponse>("/recipe/list");
}

export function getRecipe(id: string): Promise<Recipe> {
  return request<Recipe>(`/recipe/get?id=${id}`);
}

export function createRecipe(recipe: Omit<Recipe, "id">): Promise<Recipe> {
  return request<Recipe>("/recipe/create", {
    method: "POST",
    body: JSON.stringify(recipe),
  });
}

export function updateRecipe(recipe: Recipe): Promise<Recipe> {
  return request<Recipe>("/recipe/update", {
    method: "POST",
    body: JSON.stringify(recipe),
  });
}

export function deleteRecipe(id: string): Promise<void> {
  return request<void>("/recipe/delete", {
    method: "POST",
    body: JSON.stringify({ id }),
  });
}
