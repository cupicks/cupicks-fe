import React, { useState, useEffect, lazy, Suspense } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Badge from "../pages/Badge";

const Comments = lazy(() => import("../pages/Comments"));
const Login = lazy(() => import("../pages/Login"));
const Landing = lazy(() => import("../pages/Landing"));
const Mypage = lazy(() => import("../pages/Mypage"));
const Recipe = lazy(() => import("../pages/Recipe"));
const RecipeCreate = lazy(() => import("../pages/RecipeCreate"));
const RecipeDetail = lazy(() => import("../pages/RecipeDetail"));
const Register = lazy(() => import("../pages/Register"));
const RegisterComplete = lazy(() => import("../pages/RegisterComplete"));
const ResetPassword = lazy(() => import("../pages/ResetPassword"));
const ProfileEdit = lazy(() => import("../pages/ProfileEdit"));
const NotFound = lazy(() => import("../pages/NotFound"));
const RecipeEdit = lazy(() => import("../pages/RecipeEdit"));

const Router = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [loggedIn, setLoggedIn] = useState(false);

  /*** 서버 다운 ***/
  const [serverDown, setServerDown] = useState(false);
  if (serverDown) {
    return (
      <Routes>
        <Route path="*" element={<Error />} />
      </Routes>
    );
  }

  const pathname = location.pathname;
  const refreshToken = localStorage.getItem("refreshToken");
  const accessToken = localStorage.getItem("accessToken");

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
    "/recipe/create/guest",
    "/badge",
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
        navigate("/sign-in", {
          state: { message: "자동으로 \n 로그아웃 되었습니다." },
        });
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
  }, [pathname]);

  return (
    <>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/recipe" element={<Recipe loggedIn={loggedIn} />} />
          <Route path="/recipe/:recipeId/comment" element={<Comments />} />
          <Route path="/recipe/:recipeId/detail" element={<RecipeDetail />} />
          <Route path="/sign-up/complete" element={<RegisterComplete />} />

          {/* 뷰 */}
          <Route path="/badge" element={<Badge />} />

          {!loggedIn && (
            <>
              <Route path="/sign-in" element={<Login />} />
              <Route path="/sign-up" element={<Register />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/confirm-password" element={<ResetPassword />} />

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
      </Suspense>
    </>
  );
};

export default Router;
