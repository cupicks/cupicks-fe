import { Route, Routes, BrowserRouter } from "react-router-dom";

import Login from "../pages/Login";
import Recipe from "../pages/Recipe";
// import RecipeCreate from "../pages/RecipeCreate";
import RecipeDetail from "../pages/RecipeDetail";
import Register from "../pages/register";
import RegisterEdit from "../pages/RegisterEdit";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/recipe" element={<Recipe />} />
        {/* <Route path="/recipe/create" element={<RecipeCreate />} /> */}
        <Route path="/recipe/detail/:recipeId" element={<RecipeDetail />} />
        <Route path="/signIn" element={<Login />} />
        <Route path="/signUp" element={<Register />} />
        <Route path="/signedit/:userId" element={<RegisterEdit />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
