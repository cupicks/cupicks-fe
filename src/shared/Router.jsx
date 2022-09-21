import { useState, useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

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

const Router = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [loggedIn, setLoggedIn] = useState(false);

  const pathname = location.pathname;
  const refreshToken = localStorage.getItem("refreshToken");

  console.log(pathname);

  useEffect(() => {
    if (pathname !== "/" && pathname !== "/sigin-in") {
      if (!refreshToken) {
        // navigate("/sign-in");
        // test
        loggedIn ? setLoggedIn(false) : "";

        console.log(loggedIn);
      } else {
        setLoggedIn(true);

        console.log(loggedIn);
      }
    }
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/recipe" element={<Recipe />} />
      <Route path="/recipe/:recipeId/comment" element={<Comments />} />
      <Route path="/recipe/:recipeId/detail" element={<RecipeDetail />} />

      {!loggedIn ? (
        <>
          <Route path="/sign-in" element={<Login />} />
          <Route path="/sign-up" element={<Register />} />
          <Route path="/sign-up/complete" element={<RegisterComplete />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
        </>
      ) : (
        <Route
          path="*"
          element={<NotFound message={"로그아웃이 필요한 페이지입니다."} />}
        />
      )}

      {loggedIn ? (
        <>
          <Route path="/recipe/create" element={<RecipeCreate />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/profile/edit" element={<ProfileEdit />} />
        </>
      ) : (
        <Route
          path="*"
          element={<NotFound message={"로그인이 필요한 페이지입니다."} />}
        />
      )}

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
