import axios from "axios";
import { isExpired } from "react-jwt";

const serverAxios = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
});

/** @param { Request } req */

const requestHandler = async (req) => {
  const accessToken = localStorage.getItem("accessToken");
  const isExpiredAccessTkn = isExpired(accessToken);

  const refreshToken = localStorage.getItem("refreshToken");
  const isExpiredRefreshTkn = isExpired(refreshToken);

  // 토큰 만료 로직 => 이슈에 정리
  // https://github.com/cupicks/cupicks-fe/issues/117
  if (isExpiredRefreshTkn) {
    // console.log("로그아웃 상태");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  } else {
    // console.log("로그인 상태");

    if (isExpiredAccessTkn) {
      // console.log("액세스 토큰이 만료되었습니다.");

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
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("accessToken");

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
