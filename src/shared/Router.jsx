import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import Comments from "../pages/Comments";
import Login from "../pages/Login";
import Landing from "../pages/Landing";
import Mypage from "../pages/Mypage";
import Recipe from "../pages/Recipe";
import RecipeCreate from "../pages/RecipeCreate";
import RecipeDetail from "../pages/RecipeDetail";
import Register from "../pages/Register";
import RegisterComplete from "../pages/RegisterComplete";
import ResetPassword from "../pages/ResetPassword";
import ProfileEdit from "../pages/ProfileEdit";
import NotFound from "../pages/NotFound";

import TokenService from "../server/token.service";

const Router = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(()=>{
    if(localStorage.getItem('accessToken')){
      setLoggedIn(true)
    } else {
      setLoggedIn(false)
    }
  }, [])

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/recipe" element={<Recipe />} />
      <Route path="/recipe/:recipeId/comment" element={<Comments />} />
      <Route path="/recipe/:recipeId/detail" element={<RecipeDetail />} />

      {!loggedIn && 
        <>
          <Route path="/sign-in" element={<Login />} />
          <Route path="/sign-up" element={<Register />} />
          <Route path="/sign-up/complete" element={<RegisterComplete />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
        </>
      }

      {loggedIn &&
        <>
          <Route path="/recipe/create" element={<RecipeCreate />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/profile/edit" element={<ProfileEdit />} />
        </>
      }

      <Route path="*" element={<NotFound />} />
    
    </Routes>
  );
};

export default Router;
