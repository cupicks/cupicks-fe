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
import RecipeEdit from "../pages/RecipeEdit";

const Router = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [loggedIn, setLoggedIn] = useState(false);

  const pathname = location.pathname;
  const refreshToken = localStorage.getItem("refreshToken");

  const caseNoLoggedIn = [
    "/sign-in",
    "/sign-up",
    "/sign-up/complete",
    "/resetPassword",
  ];
  const caseYesLoggedIn = [
    "/recipe/create",
    "/mypage",
    "/profile/edit",
    "/recipe/:recipeId/edit",
  ];
  let pathNeedLoggedIn = false;

  // 로그인이 필요없는 페이지 구분
  caseYesLoggedIn.map((currCase) => {
    if (currCase === pathname) {
      pathNeedLoggedIn = true;
      return;
    }
  });

  useEffect(() => {
    // 로그인 확인(refreshToken 유무)
    if (refreshToken) {
      !loggedIn ? setLoggedIn(true) : "";
    } else {
      if (loggedIn) {
        setLoggedIn(false);
        navigate("/sign-in");
      }
    }
  }, [pathname]);

  useEffect(() => {
    // 리디렉션: 로그인 필요한 페이지에서 토큰이 만료 되었을 때 작동
    if (pathNeedLoggedIn) {
      if (loggedIn && !refreshToken) {
        navigate("/sign-in", {
          state: { message: "자동으로 \n 로그아웃 되었습니다." },
        });
      }
    }
  }, [loggedIn]);

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/recipe" element={<Recipe loggedIn={loggedIn} />} />
      <Route path="/recipe/:recipeId/comment" element={<Comments />} />
      <Route path="/recipe/:recipeId/detail" element={<RecipeDetail />} />
      <Route path="/sign-up/complete" element={<RegisterComplete />} />

      {!loggedIn && (
        <>
          <Route path="/sign-in" element={<Login />} />
          <Route path="/sign-up" element={<Register />} />
          <Route path="/resetPassword" element={<ResetPassword />} />

          {caseYesLoggedIn.map((path, idx) => (
            <Route
              key={"routePathLogin" + idx}
              path={path}
              timer={30000}
              element={
                <NotFound
                  timer={30000}
                  message={
                    "로그인 후에 사용가능한 기능이에요!\n로그인하고 이용해볼까요?"
                  }
                />
              }
            />
          ))}
        </>
      )}

      {loggedIn && (
        <>
          <Route path="/recipe/create" element={<RecipeCreate />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/profile/edit" element={<ProfileEdit />} />
          <Route path="/recipe/:recipeId/edit" element={<RecipeEdit />} />
        </>
      )}

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
