import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import RecipeCreate from "../pages/RecipeCreate";
import RecipeDetail from "../pages/RecipeDetail";
import Register from "../pages/register";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/recipe/create" element={<RecipeCreate />} />
        <Route path="/recipe/detail/:recipeId" element={<RecipeDetail />} />
        <Route path="/signIn" element={<Login />} />
        <Route path="/signUp" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
