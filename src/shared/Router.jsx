import { Route, Routes } from "react-router-dom";

import Comments from "../pages/Comments";
import Login from "../pages/Login";
import Logout from "../pages/Logout";
import Landing from "../pages/Landing";
import Mypage from "../pages/Mypage";
import Recipe from "../pages/Recipe";
import RecipeCreate from "../pages/RecipeCreate";
import RecipeDetail from "../pages/RecipeDetail";
import Register from "../pages/Register";
import ProfileEdit from "../pages/ProfileEdit";
import NotFound from "../pages/NotFound";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/signIn" element={<Login />} />
      <Route path="/recipe" element={<Recipe />} />
      <Route path="/recipe/comment/:recipeId" element={<Comments />} />
      <Route path="/recipe/create" element={<RecipeCreate />} />
      <Route path="/recipe/detail/:recipeId" element={<RecipeDetail />} />
      <Route path="/signUp" element={<Register />} />
      <Route path="/mypage" element={<Mypage />} />
      <Route path="/profile/:userId/edit" element={<ProfileEdit />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
