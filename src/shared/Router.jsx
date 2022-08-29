import { Route, Routes, BrowserRouter } from "react-router-dom";
import Recipe from "../pages/Recipe";
// import RecipeCreate from "../pages/RecipeCreate";
import RecipeDetail from "../pages/RecipeDetail";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/recipe" element={<Recipe />} />
        {/* <Route path="/recipe/create" element={<RecipeCreate />} /> */}
        <Route path="/recipe/detail/:recipeId" element={<RecipeDetail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
