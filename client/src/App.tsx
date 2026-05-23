import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout";
import RecipeList from "./pages/RecipeList";
import RecipeDetail from "./pages/RecipeDetail";
import RecipeForm from "./pages/RecipeForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<RecipeList />} />
          <Route path="recipe/create" element={<RecipeForm />} />
          <Route path="recipe/:id" element={<RecipeDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
