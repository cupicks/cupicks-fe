import { Route, Routes } from "react-router-dom";

import Comments from "../pages/Comments";
import Login from "../pages/Login";
import Mypage from "../pages/Mypage";
import Recipe from "../pages/Recipe";
import RecipeCreate from "../pages/RecipeCreate";
import RecipeDetail from "../pages/RecipeDetail";
import Register from "../pages/Register";
import ProfileEdit from "../pages/ProfileEdit";

const Router = () => {
  return (
    <Routes>
      <Route path="/signIn" element={<Login />} />
      <Route path="/recipe" element={<Recipe />} />
      <Route path="/recipe/comment/:recipeId" element={<Comments />} />
      <Route path="/recipe/create" element={<RecipeCreate />} />
      <Route path="/recipe/detail/:recipeId" element={<RecipeDetail />} />
      <Route path="/signUp" element={<Register />} />
      <Route path="/mypage" element={<Mypage />} />
      <Route path="/profile/:userId/edit" element={<ProfileEdit />} />
    </Routes>
  );
};

export default Router;
