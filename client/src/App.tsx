import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout";

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
          {/* Recipe routes */}
          <Route index element={<RecipeList />} />

          <Route path="recipe/create" element={<RecipeForm />} />

          <Route path="recipe/:id" element={<RecipeDetail />} />

          <Route path="recipe/:id/edit" element={<RecipeForm />} />

          {/* Category routes */}
          <Route path="categories" element={<CategoryList />} />

          <Route path="categories/create" element={<CategoryForm />} />

          <Route path="categories/:id/edit" element={<CategoryForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
