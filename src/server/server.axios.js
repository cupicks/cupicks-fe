import axios from "axios";
import { isExpired } from "react-jwt";

const serverAxios = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
});

/** refreshToken과 accessToken를 삭제 */
const removeBothToken = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

const getTokensObj = () => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  return {
    accessToken: accessToken,
    refreshToken: refreshToken,
    isExpiredAccessTkn: isExpired(accessToken),
    isExpiredRefreshTkn: isExpired(refreshToken),
  };
};

/** @param { Request } req */
const requestHandler = async (req) => {
  const { accessToken, isExpiredAccessTkn, refreshToken, isExpiredRefreshTkn } =
    getTokensObj();

  // 토큰 만료
  if (refreshToken && isExpiredRefreshTkn) {
    // console.log("로그아웃 상태");
    removeBothToken();
  } else if (refreshToken !== null) {
    // 토큰이 만료되지 않음
    // console.log("로그인 상태");

    if (!accessToken || isExpiredAccessTkn) {
      console.log("액세스 토큰이 만료되었습니다.");

      try {
        const response = await serverAxios.get(
          `/auth/token?refreshToken=${refreshToken}`,
        );
        const newAccessToken = response.data.accessToken;

        localStorage.setItem("accessToken", newAccessToken);
        req.headers.Authorization = `Bearer ${newAccessToken}`;

        // console.log("액세스 토큰이 재발행 되었습니다.");
        return req;
      } catch (error) {
        console.log(error);
        removeBothToken();

        return req;
      }
    } else {
      // console.log("액세스 토큰이 만료되지 않았습니다.");
      return null;
    }
  }
};

requestHandler();

serverAxios.interceptors.request.use((request) => requestHandler(request));

export default serverAxios;
