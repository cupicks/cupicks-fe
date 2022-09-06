import { Route, Routes, BrowserRouter } from "react-router-dom";

import Login from "../pages/Login";
import Mypage from "../pages/Mypage";
import Recipe from "../pages/Recipe";
import RecipeCreate from "../pages/RecipeCreate";
import RecipeDetail from "../pages/RecipeDetail";
import Register from "../pages/Register";
import RegisterEdit from "../pages/RegisterEdit";

import Test from "../components/Test";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/recipe" element={<Recipe />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/recipe/create" element={<RecipeCreate />} />
        <Route path="/recipe/detail/:recipeId" element={<RecipeDetail />} />
        <Route path="/signIn" element={<Login />} />
        <Route path="/signUp" element={<Register />} />
        <Route path="/profile/:userId/edit" element={<RegisterEdit />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
