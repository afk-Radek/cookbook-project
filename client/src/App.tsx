import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout";

import Home from "./pages/Home";
import RecipeList from "./pages/RecipeList";
import RecipeDetail from "./pages/RecipeDetail";
import RecipeForm from "./pages/RecipeForm";

import CategoryList from "./pages/CategoryList";
import CategoryForm from "./pages/CategoryForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          <Route path="recipe" element={<RecipeList />} />
          <Route path="recipe/create" element={<RecipeForm />} />
          <Route path="recipe/:id" element={<RecipeDetail />} />
          <Route path="recipe/:id/edit" element={<RecipeForm />} />

          <Route path="recipeCategory" element={<CategoryList />} />
          <Route path="recipeCategory/create" element={<CategoryForm />} />
          <Route path="recipeCategory/:id/edit" element={<CategoryForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
