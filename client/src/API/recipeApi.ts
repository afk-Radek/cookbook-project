export type Recipe = {
  id: string;
  title: string;
  preparationTime: number;
  numberOfIngredients: number;
  rating?: number;
  description: string;
  preparationSteps: string;
  note?: string;
  recipeCategoryId: string;
};

export type RecipeCreateDto = Omit<Recipe, "id">;

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
    const errorBody = await response.text();
    console.error("API error:", response.status, errorBody);
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

export function createRecipe(recipe: RecipeCreateDto): Promise<Recipe> {
  return request<Recipe>("/recipe/create", {
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

export function updateRecipe(recipe: Recipe): Promise<Recipe> {
  return request<Recipe>("/recipe/update", {
    method: "POST",
    body: JSON.stringify(recipe),
  });
}
